const router   = require('express').Router();
const supabase  = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { customer_name, customer_email, customer_phone, address, items } = req.body;
  if (!customer_name || !customer_email || !items?.length)
    return res.status(400).json({ error: 'customer_name, customer_email and items required' });
  const quantities = new Map();
  for (const item of items) {
    const id = String(item?.id || '');
    const qty = Number(item?.qty);
    if (!id || !Number.isInteger(qty) || qty < 1 || qty > 10) {
      return res.status(400).json({ error: 'Invalid cart item' });
    }
    quantities.set(id, (quantities.get(id) || 0) + qty);
  }
  if ([...quantities.values()].some(qty => qty > 10)) {
    return res.status(400).json({ error: 'Maximum quantity is 10 per product' });
  }

  const productIds = [...quantities.keys()];
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('id, name, price, stock')
    .in('id', productIds)
    .eq('active', true);
  if (productError) return res.status(500).json({ error: 'Unable to validate cart' });
  if (!products || products.length !== productIds.length) {
    return res.status(400).json({ error: 'One or more products are unavailable' });
  }

  const verifiedItems = products.map(product => {
    const qty = quantities.get(String(product.id));
    if (Number.isFinite(Number(product.stock)) && qty > Number(product.stock)) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }
    return { id: product.id, name: product.name, price: Number(product.price), qty };
  });

  const subtotal     = verifiedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery_fee = subtotal >= 500 ? 0 : 80;
  const total        = subtotal + delivery_fee;
  const { data: order, error } = await supabase
    .from('orders')
    .insert({ customer_name, customer_email, customer_phone, address, items: verifiedItems, subtotal, delivery_fee, total })
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ orderId: order.id, total: order.total, delivery_fee: order.delivery_fee });
});

router.get('/', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Order not found' });
  res.json(data);
});

router.patch('/:id', verifyAdmin, async (req, res) => {
  const allowed = ['pending','paid','processing','shipped','delivered','cancelled'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const { data, error } = await supabase.from('orders')
    .update({ status: req.body.status }).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
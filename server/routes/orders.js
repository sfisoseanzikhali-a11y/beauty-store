const router   = require('express').Router();
const supabase  = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { customer_name, customer_email, customer_phone, address, items } = req.body;
  if (!customer_name || !customer_email || !items?.length)
    return res.status(400).json({ error: 'customer_name, customer_email and items required' });
  const subtotal     = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery_fee = subtotal >= 500 ? 0 : 80;
  const total        = subtotal + delivery_fee;
  const { data: order, error } = await supabase
    .from('orders')
    .insert({ customer_name, customer_email, customer_phone, address, items, subtotal, delivery_fee, total })
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
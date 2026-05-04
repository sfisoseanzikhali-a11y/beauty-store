const router  = require('express').Router();
const supabase = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  let query = supabase
    .from('products')
    .select('*, categories(name, slug, icon)')
    .eq('active', true)
    .order('created_at', { ascending: false });
  if (req.query.category) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', req.query.category).single();
    if (cat) query = query.eq('category_id', cat.id);
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/categories', async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:slug', async (req, res) => {
  const { data, error } = await supabase
    .from('products').select('*, categories(name, slug, icon)')
    .eq('slug', req.params.slug).eq('active', true).single();
  if (error) return res.status(404).json({ error: 'Product not found' });
  res.json(data);
});

router.post('/', verifyAdmin, async (req, res) => {
  const { name, slug, description, price, category_id, badge, stock } = req.body;
  if (!name || !slug || !price) return res.status(400).json({ error: 'name, slug and price required' });
  const { data, error } = await supabase.from('products')
    .insert({ name, slug, description, price, category_id, badge, stock }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put('/:id', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('products')
    .update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  const { error } = await supabase.from('products').update({ active: false }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

module.exports = router;
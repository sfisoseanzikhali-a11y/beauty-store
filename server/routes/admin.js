const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const supabase = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const { data: admin } = await supabase.from('admins').select('*').eq('email', email.toLowerCase()).single();
  if (!admin || !(await bcrypt.compare(password, admin.password_hash)))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

router.get('/stats', verifyAdmin, async (req, res) => {
  const [{ count: products }, { count: orders }, { data: revenue }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total').eq('status', 'paid'),
  ]);
  const totalRevenue = (revenue || []).reduce((s, o) => s + Number(o.total), 0);
  res.json({ products, orders, totalRevenue: totalRevenue.toFixed(2) });
});

module.exports = router;
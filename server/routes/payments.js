const router  = require('express').Router();
const supabase = require('../config/supabase');

router.get('/initiate/:orderId', async (req, res) => {
  const { data: order } = await supabase.from('orders').select('*').eq('id', req.params.orderId).single();
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ message: 'PayFast coming in next step', orderId: order.id });
});

router.post('/notify', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
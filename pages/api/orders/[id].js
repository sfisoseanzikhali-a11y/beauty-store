import supabase from '../../../lib/supabase'
import { verifyAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  const admin = verifyAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  const { id } = req.query

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
    if (error) return res.status(404).json({ error: 'Order not found' })
    return res.json(data)
  }

  if (req.method === 'PATCH') {
    const allowed = ['pending','paid','processing','shipped','delivered','cancelled']
    if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' })
    const { data, error } = await supabase.from('orders').update({ status: req.body.status }).eq('id', id).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  res.status(405).end()
}

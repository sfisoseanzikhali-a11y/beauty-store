import supabase from '../../../lib/supabase'
import { verifyAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  const admin = verifyAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  const [{ count: products }, { count: orders }, { data: revenue }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total').eq('status', 'paid'),
  ])
  const totalRevenue = (revenue || []).reduce((s, o) => s + Number(o.total), 0)
  res.json({ products, orders, totalRevenue: totalRevenue.toFixed(2) })
}

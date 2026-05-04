import supabase from '../../../lib/supabase'
import { verifyAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  const { slug } = req.query

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('products').select('*, categories(name, slug, icon)').eq('slug', slug).eq('active', true).single()
    if (error) return res.status(404).json({ error: 'Product not found' })
    return res.json(data)
  }

  if (req.method === 'PUT') {
    const admin = verifyAdmin(req)
    if (!admin) return res.status(401).json({ error: 'Unauthorized' })
    const { data, error } = await supabase.from('products').update(req.body).eq('id', slug).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  if (req.method === 'DELETE') {
    const admin = verifyAdmin(req)
    if (!admin) return res.status(401).json({ error: 'Unauthorized' })
    const { error } = await supabase.from('products').update({ active: false }).eq('id', slug)
    if (error) return res.status(500).json({ error: error.message })
    return res.json({ success: true })
  }

  res.status(405).end()
}

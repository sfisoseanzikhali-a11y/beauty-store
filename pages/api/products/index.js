// pages/api/products/index.js
import supabase from '../../../lib/supabase'
import { verifyAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let query = supabase.from('products').select('*, categories(name, slug, icon)').eq('active', true).order('created_at', { ascending: false })
    if (req.query.category) {
      const { data: cat } = await supabase.from('categories').select('id').eq('slug', req.query.category).single()
      if (cat) query = query.eq('category_id', cat.id)
    }
    const { data, error } = await query
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }
  if (req.method === 'POST') {
    const admin = verifyAdmin(req)
    if (!admin) return res.status(401).json({ error: 'Unauthorized' })
    const { name, slug, description, price, category_id, badge, stock } = req.body
    if (!name || !slug || !price) return res.status(400).json({ error: 'name, slug and price required' })
    const { data, error } = await supabase.from('products').insert({ name, slug, description, price, category_id, badge, stock }).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
  }
  res.status(405).end()
}

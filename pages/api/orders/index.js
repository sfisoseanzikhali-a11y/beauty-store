import supabase from '../../../lib/supabase'
import { verifyAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customer_name, customer_email, customer_phone, address, items } = req.body
    if (!customer_name || !customer_email || !items?.length)
      return res.status(400).json({ error: 'customer_name, customer_email and items required' })
    const quantities = new Map()
    for (const item of items) {
      const id = String(item?.id || '')
      const qty = Number(item?.qty)
      if (!id || !Number.isInteger(qty) || qty < 1 || qty > 10) {
        return res.status(400).json({ error: 'Invalid cart item' })
      }
      quantities.set(id, (quantities.get(id) || 0) + qty)
    }
    if ([...quantities.values()].some(qty => qty > 10)) {
      return res.status(400).json({ error: 'Maximum quantity is 10 per product' })
    }

    const productIds = [...quantities.keys()]
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('id, name, price, stock')
      .in('id', productIds)
      .eq('active', true)

    if (productError) return res.status(500).json({ error: 'Unable to validate cart' })
    if (!products || products.length !== productIds.length) {
      return res.status(400).json({ error: 'One or more products are unavailable' })
    }

    const verifiedItems = products.map(product => {
      const qty = quantities.get(String(product.id))
      if (Number.isFinite(Number(product.stock)) && qty > Number(product.stock)) {
        throw new Error(`Insufficient stock for ${product.name}`)
      }
      return { id: product.id, name: product.name, price: Number(product.price), qty }
    })

    const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const delivery_fee = subtotal >= 500 ? 0 : 80
    const total = subtotal + delivery_fee
    const { data: order, error } = await supabase.from('orders')
      .insert({ customer_name, customer_email, customer_phone, address, items: verifiedItems, subtotal, delivery_fee, total })
      .select().single()
    if (error) return res.status(500).json({ error: error.message })

    // WhatsApp notification (non-blocking)
    try {
      const twilio = require('twilio')
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
      const itemLines = items.map(i => `• ${i.name} x${i.qty} — R${(i.price*i.qty).toFixed(2)}`).join('\n')
      await client.messages.create({
        body: `🌸 *New Order #${order.id}*\n👤 ${customer_name}\n📧 ${customer_email}\n📞 ${customer_phone||'N/A'}\n📍 ${address||'N/A'}\n\n*Items:*\n${itemLines}\n\n💰 Total: R${total.toFixed(2)}`,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: process.env.STORE_WHATSAPP_TO
      })
    } catch(e) { console.error('WhatsApp notification failed:', e.message) }

    return res.status(201).json({ orderId: order.id, total: order.total, delivery_fee: order.delivery_fee })
  }

  if (req.method === 'GET') {
    const admin = verifyAdmin(req)
    if (!admin) return res.status(401).json({ error: 'Unauthorized' })
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  res.status(405).end()
}

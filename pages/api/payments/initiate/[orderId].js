import supabase from '../../../../lib/supabase'
import crypto from 'crypto'

function buildPayfastFields({ orderId, amount, customerName, customerEmail, returnUrl, cancelUrl, notifyUrl }) {
  const fields = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: returnUrl, cancel_url: cancelUrl, notify_url: notifyUrl,
    name_first: customerName.split(' ')[0] || customerName,
    name_last: customerName.split(' ').slice(1).join(' ') || '',
    email_address: customerEmail,
    m_payment_id: String(orderId),
    amount: Number(amount).toFixed(2),
    item_name: `Neila Beauty Order #${orderId}`,
  }
  Object.keys(fields).forEach(k => { if (!fields[k]) delete fields[k] })
  const sigStr = Object.entries(fields).map(([k, v]) => `${k}=${encodeURIComponent(String(v)).replace(/%20/g, '+')}`).join('&')
  const withPP = process.env.PAYFAST_PASSPHRASE ? `${sigStr}&passphrase=${encodeURIComponent(process.env.PAYFAST_PASSPHRASE)}` : sigStr
  fields.signature = crypto.createHash('md5').update(withPP).digest('hex')
  const url = process.env.PAYFAST_SANDBOX === 'true' ? 'https://sandbox.payfast.co.za/eng/process' : 'https://www.payfast.co.za/eng/process'
  return { url, fields }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  const { orderId } = req.query
  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()
  if (!order) return res.status(404).json({ error: 'Order not found' })
  const host = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`
  const pf = buildPayfastFields({
    orderId: order.id, amount: order.total,
    customerName: order.customer_name, customerEmail: order.customer_email,
    returnUrl: `${host}/order-success?order=${order.id}`,
    cancelUrl: `${host}/cart`,
    notifyUrl: `${host}/api/payments/notify`,
  })
  res.json(pf)
}

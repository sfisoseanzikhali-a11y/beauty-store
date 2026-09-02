import crypto from 'crypto'
import supabase from '../../../lib/supabase'

export const config = { api: { bodyParser: true } }

function signatureFor(fields) {
  const signatureString = Object.entries(fields)
    .filter(([key, value]) => key !== 'signature' && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value)).replace(/%20/g, '+')}`)
    .join('&')
  const value = process.env.PAYFAST_PASSPHRASE
    ? `${signatureString}&passphrase=${encodeURIComponent(process.env.PAYFAST_PASSPHRASE).replace(/%20/g, '+')}`
    : signatureString
  return crypto.createHash('md5').update(value).digest('hex')
}

function validSignature(fields) {
  const received = String(fields.signature || '')
  const expected = signatureFor(fields)
  if (received.length !== expected.length) return false
  return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected))
}

async function validWithPayFast(fields) {
  const endpoint = process.env.PAYFAST_SANDBOX === 'true'
    ? 'https://sandbox.payfast.co.za/eng/query/validate'
    : 'https://www.payfast.co.za/eng/query/validate'
  const body = Object.entries(fields)
    .filter(([key]) => key !== 'signature')
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value)).replace(/%20/g, '+')}`)
    .join('&')
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(10000),
  })
  return response.ok && (await response.text()).trim() === 'VALID'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const fields = req.body || {}
  if (!validSignature(fields)) return res.status(400).json({ error: 'Invalid signature' })

  const { m_payment_id: orderId, payment_status: status, pf_payment_id: paymentRef } = fields
  if (!orderId) return res.status(400).json({ error: 'Missing order ID' })

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, total, status')
    .eq('id', orderId)
    .single()
  if (error || !order) return res.status(404).json({ error: 'Order not found' })

  const paidAmount = Number(fields.amount_gross)
  if (!Number.isFinite(paidAmount) || Math.abs(paidAmount - Number(order.total)) > 0.01) {
    return res.status(400).json({ error: 'Payment amount mismatch' })
  }

  if (!(await validWithPayFast(fields))) {
    return res.status(400).json({ error: 'PayFast validation failed' })
  }

  if (status === 'COMPLETE' && order.status !== 'paid') {
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'paid', payment_ref: paymentRef })
      .eq('id', orderId)
    if (updateError) return res.status(500).json({ error: 'Unable to update order' })
  }

  return res.status(200).end()
}

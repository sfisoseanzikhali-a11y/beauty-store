import supabase from '../../../lib/supabase'
import crypto from 'crypto'

export const config = { api: { bodyParser: true } }

function validateITN(body) {
  const received = body.signature
  const params = { ...body }
  delete params.signature
  const sigStr = Object.entries(params).filter(([,v]) => v !== '').map(([k, v]) => `${k}=${encodeURIComponent(String(v)).replace(/%20/g, '+')}`).join('&')
  const withPP = process.env.PAYFAST_PASSPHRASE ? `${sigStr}&passphrase=${encodeURIComponent(process.env.PAYFAST_PASSPHRASE)}` : sigStr
  return crypto.createHash('md5').update(withPP).digest('hex') === received
}

export default async function handler(req, res) {
  res.status(200).end()
  if (req.method !== 'POST') return
  if (!validateITN(req.body)) return
  const { m_payment_id: orderId, payment_status, pf_payment_id } = req.body
  if (payment_status !== 'COMPLETE') return
  await supabase.from('orders').update({ status: 'paid', payment_ref: pf_payment_id }).eq('id', orderId)
}

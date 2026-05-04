import jwt from 'jsonwebtoken'

export function verifyAdmin(req) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) return null
    return jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
  } catch {
    return null
  }
}

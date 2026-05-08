const CART_KEY = 'beauty_cart'

export function getCart() {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product) {
  const cart = getCart()
  const ex = cart.find(i => i.id === product.id)
  if (ex) ex.qty = Math.min(ex.qty + 1, 10)
  else cart.push({ ...product, qty: 1 })
  saveCart(cart)
}

export function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id))
}

export function updateQty(id, qty) {
  if (qty < 1) { removeFromCart(id); return }
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (item) { item.qty = Math.min(qty, 10); saveCart(cart) }
}

export function getCartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0)
}

export function getCartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0)
}

export function clearCart() {
  localStorage.removeItem(CART_KEY)
}
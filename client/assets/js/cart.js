const CART_KEY = 'beauty_cart';

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }

function addToCart(product) {
  const cart = getCart();
  const ex = cart.find(i => i.id === product.id);
  if (ex) ex.qty = Math.min(ex.qty + 1, 10);
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
}

function removeFromCart(id) { saveCart(getCart().filter(i => i.id !== id)); }

function updateQty(id, qty) {
  if (qty < 1) { removeFromCart(id); return; }
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) { item.qty = Math.min(qty, 10); saveCart(cart); }
}

function getCartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
function clearCart() { localStorage.removeItem(CART_KEY); updateCartCount(); }

function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const n = getCartCount();
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

function flashAddBtn(btn) {
  const orig = btn.textContent;
  btn.textContent = '✓ Added!';
  btn.style.background = 'var(--rose)';
  btn.style.color = '#fff';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1500);
}

document.addEventListener('DOMContentLoaded', updateCartCount);

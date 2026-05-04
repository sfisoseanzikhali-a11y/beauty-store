document.documentElement.lang = 'en';
document.title = 'Cart \u2014 Neila Beauty Store';

const _preconnect = document.createElement('link');
_preconnect.rel = 'preconnect';
_preconnect.href = 'https://fonts.googleapis.com';
document.head.appendChild(_preconnect);

const _fonts = document.createElement('link');
_fonts.rel = 'stylesheet';
_fonts.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap';
document.head.appendChild(_fonts);

const _style = document.createElement('style');
_style.textContent = `
:root{--rose:#8B1A4A;--rose-hover:#6D1438;--rose-light:#B84B7A;--rose-pale:#F5E6EE;--gold:#C9A96E;--gold-light:#E8D5A8;--ivory:#FAF8F5;--dark:#1A0A0F;--text:#2C1520;--muted:#7A6670;--border:rgba(139,26,74,0.1);}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--text);}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:var(--rose-light);border-radius:3px;}
.marquee-strip{background:var(--rose);padding:10px 0;overflow:hidden;}
.marquee-track{display:flex;animation:scroll-left 28s linear infinite;white-space:nowrap;}
.marquee-track span{display:inline-flex;align-items:center;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.9);padding:0 32px;}
.marquee-track span::after{content:'\u2756';color:var(--gold);margin-left:32px;}
@keyframes scroll-left{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
nav{position:sticky;top:0;z-index:100;background:rgba(250,248,245,0.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 64px;display:flex;align-items:center;justify-content:space-between;height:74px;}
.logo{font-family:'Cormorant Garamond',serif;font-size:27px;font-weight:600;color:var(--rose);text-decoration:none;}
.logo em{font-style:italic;color:var(--gold);}
.nav-links{display:flex;gap:38px;list-style:none;}
.nav-links a{text-decoration:none;color:var(--text);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:400;transition:color .25s;}
.nav-links a:hover{color:var(--rose);}
.nav-right{display:flex;align-items:center;gap:14px;}
.cart-btn{position:relative;text-decoration:none;color:var(--text);font-size:22px;display:flex;align-items:center;}
.cart-count{display:none;position:absolute;top:-7px;right:-8px;background:var(--gold);color:var(--dark);border-radius:50%;width:18px;height:18px;font-size:10px;font-weight:600;align-items:center;justify-content:center;}
.btn-wa{background:var(--rose);color:#fff;text-decoration:none;padding:10px 22px;border-radius:50px;font-size:12px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:all .3s;}
.btn-wa:hover{background:var(--rose-hover);}
.cart-hero{background:linear-gradient(135deg,var(--rose-pale),rgba(250,248,245,0.3));padding:48px 64px 36px;}
.hero-label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;display:block;}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(34px,4vw,52px);font-weight:400;color:var(--dark);}
.hero-title em{font-style:italic;color:var(--rose);}
.breadcrumb{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-top:14px;}
.breadcrumb a{color:var(--rose);text-decoration:none;}
.cart-layout{display:grid;grid-template-columns:1fr 360px;gap:32px;padding:40px 64px 80px;align-items:start;}
.cart-empty{text-align:center;padding:80px 20px;background:#fff;border-radius:24px;border:1px solid var(--border);}
.empty-icon{font-size:64px;display:block;margin-bottom:20px;}
.empty-title{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--dark);margin-bottom:10px;}
.empty-desc{font-size:15px;color:var(--muted);margin-bottom:28px;font-weight:300;}
.btn-shop{background:var(--rose);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:500;transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
.btn-shop:hover{background:var(--rose-hover);transform:translateY(-2px);}
.cart-row{background:#fff;border-radius:20px;border:1px solid var(--border);padding:20px;display:flex;gap:18px;align-items:center;margin-bottom:14px;transition:box-shadow .2s;}
.cart-row:hover{box-shadow:0 8px 24px rgba(139,26,74,0.07);}
.cart-item-img{width:80px;height:80px;border-radius:16px;background:linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9));display:flex;align-items:center;justify-content:center;font-size:38px;flex-shrink:0;}
.cart-item-details{flex:1;}
.cart-item-cat{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:4px;}
.cart-item-name{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:500;color:var(--dark);line-height:1.3;margin-bottom:8px;}
.cart-item-price{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:var(--rose);}
.cart-item-controls{display:flex;align-items:center;gap:12px;}
.qty-ctrl{display:flex;align-items:center;border:1px solid var(--border);border-radius:50px;overflow:hidden;background:var(--ivory);}
.qty-btn{width:34px;height:36px;border:none;background:none;font-size:18px;cursor:pointer;color:var(--text);transition:background .2s;}
.qty-btn:hover{background:var(--rose-pale);}
.qty-num{min-width:28px;text-align:center;font-size:14px;font-weight:500;}
.btn-remove{background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;transition:color .2s;padding:4px;}
.btn-remove:hover{color:var(--rose);}
.summary-panel{background:#fff;border-radius:24px;border:1px solid var(--border);padding:28px;position:sticky;top:96px;}
.summary-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:500;color:var(--dark);margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border);}
.summary-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:14px;}
.summary-row .label{color:var(--muted);}
.summary-row .value{font-weight:500;color:var(--text);}
.summary-row.total{border-top:1px solid var(--border);padding-top:16px;margin-top:8px;margin-bottom:24px;}
.summary-row.total .label{font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--dark);font-weight:500;}
.summary-row.total .value{font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--rose);font-weight:600;}
.free-delivery-bar{background:rgba(74,124,89,0.08);border:1px solid rgba(74,124,89,0.2);border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#4A7C59;text-align:center;font-weight:400;line-height:1.5;}
.free-delivery-bar.achieved{background:rgba(74,124,89,0.12);}
.btn-checkout{width:100%;background:var(--rose);color:#fff;border:none;padding:16px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .3s;display:flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;}
.btn-checkout:hover{background:var(--rose-hover);transform:translateY(-2px);box-shadow:0 12px 30px rgba(139,26,74,0.25);}
.btn-continue{width:100%;background:none;color:var(--rose);border:1.5px solid rgba(139,26,74,0.3);padding:13px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:14px;cursor:pointer;transition:all .2s;margin-top:10px;text-decoration:none;display:flex;align-items:center;justify-content:center;}
.btn-continue:hover{background:var(--rose-pale);}
.secure-badges{display:flex;justify-content:center;gap:16px;margin-top:20px;flex-wrap:wrap;}
.sec-badge{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:5px;}
footer{background:#0F0408;color:rgba(255,255,255,0.6);padding:48px 64px 24px;margin-top:0;}
.foot-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.25);}
.foot-gold{color:var(--gold);}
@media(max-width:900px){
  nav{padding:0 20px;}.nav-links{display:none;}
  .cart-hero{padding:36px 20px 28px;}
  .cart-layout{grid-template-columns:1fr;padding:24px 20px 60px;}
  .summary-panel{position:static;}
  footer{padding:36px 20px 20px;}
}
`;
document.head.appendChild(_style);

document.body.innerHTML = `
<div class="marquee-strip"><div class="marquee-track"><span>Free Delivery on Orders Over R500</span><span>100% Authentic Products</span><span>WhatsApp Support Available</span><span>New Season Arrivals Just Dropped</span><span>Free Delivery on Orders Over R500</span><span>100% Authentic Products</span><span>WhatsApp Support Available</span><span>New Season Arrivals Just Dropped</span></div></div>

<nav>
  <a href="/" class="logo">Neila <em>Beauty</em></a>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/shop.html">Shop</a></li>
    <li><a href="/#combos">Combos</a></li>
    <li><a href="/#contact">Contact</a></li>
  </ul>
  <div class="nav-right">
    <a href="/cart.html" class="cart-btn">\ud83d\uded2<span class="cart-count" id="cartCount"></span></a>
    <a href="https://wa.me/27722937265" class="btn-wa" target="_blank">\ud83d\udcac WhatsApp</a>
  </div>
</nav>

<div class="cart-hero">
  <span class="hero-label">Your Selection</span>
  <h1 class="hero-title">Shopping <em>Cart</em></h1>
  <div class="breadcrumb">
    <a href="/">Home</a><span>\u203a</span><a href="/shop.html">Shop</a><span>\u203a</span><span>Cart</span>
  </div>
</div>

<div class="cart-layout">
  <div class="cart-items-panel" id="cartItems"></div>
  <aside class="summary-panel" id="summaryPanel" style="display:none">
    <div class="summary-title">Order Summary</div>
    <div id="deliveryBar" class="free-delivery-bar"></div>
    <div class="summary-row"><span class="label">Subtotal</span><span class="value" id="subtotalVal">R0.00</span></div>
    <div class="summary-row"><span class="label">Delivery</span><span class="value" id="deliveryVal">R80.00</span></div>
    <div class="summary-row total"><span class="label">Total</span><span class="value" id="totalVal">R0.00</span></div>
    <a href="/checkout.html" class="btn-checkout">Proceed to Checkout \u2192</a>
    <a href="/shop.html" class="btn-continue">\u2190 Continue Shopping</a>
    <div class="secure-badges">
      <span class="sec-badge">\ud83d\udd12 Secure Checkout</span>
      <span class="sec-badge">\u2705 100% Authentic</span>
    </div>
  </aside>
</div>

<footer><div class="foot-bottom"><span>\u00a9 2026 Neila Beauty Store. All rights reserved.</span><span class="foot-gold">You are Beautiful \u2756</span></div></footer>
`;

function renderCart() {
  const cart = getCart();
  const panel = document.getElementById('cartItems');
  const summary = document.getElementById('summaryPanel');

  if (!cart.length) {
    panel.innerHTML = '<div class="cart-empty">'
      + '<span class="empty-icon">\ud83d\uded2</span>'
      + '<div class="empty-title">Your cart is empty</div>'
      + '<p class="empty-desc">Discover our beautiful range of skincare and beauty products.</p>'
      + '<a href="/shop.html" class="btn-shop">Browse Products \u2192</a>'
      + '</div>';
    summary.style.display = 'none';
    return;
  }

  summary.style.display = 'block';
  panel.innerHTML = cart.map(function(item) {
    return '<div class="cart-row" id="row-' + item.id + '">'
      + '<div class="cart-item-img">' + (item.icon || '\u2728') + '</div>'
      + '<div class="cart-item-details">'
      + '<div class="cart-item-cat">Beauty Product</div>'
      + '<div class="cart-item-name">' + item.name + '</div>'
      + '<div class="cart-item-price">R' + (item.price * item.qty).toFixed(2) + '</div>'
      + '</div>'
      + '<div class="cart-item-controls">'
      + '<div class="qty-ctrl">'
      + '<button class="qty-btn" onclick="changeItem(' + item.id + ',' + (item.qty - 1) + ')">\u2212</button>'
      + '<span class="qty-num">' + item.qty + '</span>'
      + '<button class="qty-btn" onclick="changeItem(' + item.id + ',' + (item.qty + 1) + ')">+</button>'
      + '</div>'
      + '<button class="btn-remove" onclick="removeItem(' + item.id + ')" title="Remove">\u2715</button>'
      + '</div></div>';
  }).join('');

  updateSummary(cart);
}

function updateSummary(cart) {
  const sub = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  const del = sub >= 500 ? 0 : 80;
  const tot = sub + del;
  document.getElementById('subtotalVal').textContent = 'R' + sub.toFixed(2);
  document.getElementById('deliveryVal').textContent = del === 0 ? 'FREE' : 'R80.00';
  document.getElementById('totalVal').textContent = 'R' + tot.toFixed(2);
  const bar = document.getElementById('deliveryBar');
  if (del === 0) {
    bar.textContent = '\ud83c\udf89 You qualify for FREE delivery!';
    bar.classList.add('achieved');
  } else {
    bar.textContent = 'Add R' + (500 - sub).toFixed(2) + ' more for FREE delivery';
    bar.classList.remove('achieved');
  }
}

function changeItem(id, qty) { updateQty(id, qty); renderCart(); }
function removeItem(id) { removeFromCart(id); renderCart(); }

renderCart();

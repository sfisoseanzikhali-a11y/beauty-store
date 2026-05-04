document.documentElement.lang = 'en';
document.title = 'Product \u2014 Neila Beauty Store';

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
body{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--text);overflow-x:hidden;}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:var(--rose-light);border-radius:3px;}
.marquee-strip{background:var(--rose);padding:10px 0;overflow:hidden;}
.marquee-track{display:flex;animation:scroll-left 28s linear infinite;white-space:nowrap;}
.marquee-track span{display:inline-flex;align-items:center;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.9);padding:0 32px;}
.marquee-track span::after{content:'\u2756';color:var(--gold);margin-left:32px;}
@keyframes scroll-left{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
nav{position:sticky;top:0;z-index:100;background:rgba(250,248,245,0.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 64px;display:flex;align-items:center;justify-content:space-between;height:74px;transition:box-shadow .3s;}
nav.scrolled{box-shadow:0 6px 40px rgba(139,26,74,0.07);}
.logo{font-family:'Cormorant Garamond',serif;font-size:27px;font-weight:600;color:var(--rose);text-decoration:none;}
.logo em{font-style:italic;color:var(--gold);}
.nav-links{display:flex;gap:38px;list-style:none;}
.nav-links a{text-decoration:none;color:var(--text);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:400;position:relative;transition:color .25s;}
.nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--gold);transition:width .3s;}
.nav-links a:hover{color:var(--rose);}
.nav-links a:hover::after{width:100%;}
.nav-right{display:flex;align-items:center;gap:14px;}
.btn-wa{background:var(--rose);color:#fff;text-decoration:none;padding:10px 22px;border-radius:50px;font-size:12px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
.btn-wa:hover{background:var(--rose-hover);transform:translateY(-1px);}
.cart-btn{position:relative;text-decoration:none;color:var(--text);font-size:22px;display:flex;align-items:center;}
.cart-count{display:none;position:absolute;top:-7px;right:-8px;background:var(--gold);color:var(--dark);border-radius:50%;width:18px;height:18px;font-size:10px;font-weight:600;align-items:center;justify-content:center;}
.breadcrumb{padding:20px 64px;display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);}
.breadcrumb a{color:var(--rose);text-decoration:none;}
.breadcrumb a:hover{text-decoration:underline;}
.product-section{padding:20px 64px 80px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;}
.product-image-panel{position:sticky;top:96px;}
.product-image-main{width:100%;aspect-ratio:1;border-radius:28px;background:linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:120px;position:relative;overflow:hidden;}
.product-image-main .prod-badge{position:absolute;top:20px;left:20px;background:var(--rose);color:#fff;font-size:11px;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:50px;font-weight:500;}
.badge-popular{background:var(--gold)!important;}
.badge-premium{background:var(--dark)!important;}
.badge-bundle{background:#4A7C59!important;}
.product-emoji{transition:transform .5s;display:block;}
.product-image-panel:hover .product-emoji{transform:scale(1.06);}
.prod-cat-label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;display:block;}
.prod-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3vw,42px);font-weight:400;color:var(--dark);line-height:1.15;margin-bottom:16px;}
.prod-rating{display:flex;align-items:center;gap:10px;margin-bottom:20px;}
.stars{color:var(--gold);font-size:14px;letter-spacing:1px;}
.rating-text{font-size:13px;color:var(--muted);}
.prod-price-wrap{display:flex;align-items:baseline;gap:12px;margin-bottom:24px;}
.prod-price{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600;color:var(--rose);}
.delivery-badge{background:rgba(74,124,89,0.1);color:#4A7C59;font-size:12px;padding:4px 12px;border-radius:50px;font-weight:500;border:1px solid rgba(74,124,89,0.2);}
.prod-desc{font-size:15px;color:var(--muted);line-height:1.78;margin-bottom:32px;font-weight:300;padding-bottom:28px;border-bottom:1px solid var(--border);}
.purchase-row{display:flex;gap:14px;align-items:center;margin-bottom:20px;}
.qty-ctrl{display:flex;align-items:center;border:1px solid var(--border);border-radius:50px;overflow:hidden;background:#fff;}
.qty-btn{width:40px;height:48px;border:none;background:none;font-size:20px;cursor:pointer;color:var(--text);transition:background .2s;display:flex;align-items:center;justify-content:center;}
.qty-btn:hover{background:var(--rose-pale);}
.qty-num{min-width:36px;text-align:center;font-size:15px;font-weight:500;color:var(--text);}
.btn-cart-main{flex:1;background:var(--rose);color:#fff;border:none;padding:15px 28px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .3s;display:flex;align-items:center;justify-content:center;gap:10px;}
.btn-cart-main:hover{background:var(--rose-hover);transform:translateY(-2px);box-shadow:0 12px 30px rgba(139,26,74,0.28);}
.btn-cart-main.added{background:#4A7C59;}
.btn-wishlist{width:50px;height:50px;border-radius:50%;border:1.5px solid var(--border);background:#fff;font-size:20px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;color:var(--rose);flex-shrink:0;}
.btn-wishlist:hover,.btn-wishlist.liked{background:var(--rose);color:#fff;border-color:var(--rose);}
.trust-badges{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:28px;}
.trust-badge{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);font-weight:300;}
.trust-badge span:first-child{font-size:16px;}
.prod-tabs{margin-top:32px;}
.tab-headers{display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:20px;}
.tab-btn{background:none;border:none;padding:12px 20px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;color:var(--muted);cursor:pointer;position:relative;letter-spacing:.5px;transition:color .2s;}
.tab-btn.active{color:var(--rose);font-weight:500;}
.tab-btn.active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--rose);}
.tab-content{display:none;font-size:14px;color:var(--muted);line-height:1.78;font-weight:300;}
.tab-content.active{display:block;}
.ingredients-list{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;}
.ingredients-list li{background:var(--rose-pale);color:var(--rose);padding:5px 12px;border-radius:50px;font-size:12px;font-weight:500;}
.how-to-steps{list-style:none;display:flex;flex-direction:column;gap:12px;margin-top:8px;}
.how-to-steps li{display:flex;gap:14px;align-items:flex-start;}
.step-num{width:26px;height:26px;border-radius:50%;background:var(--rose);color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;}
.related-section{padding:60px 64px 80px;background:#FBF7F9;}
.sec-head{text-align:center;margin-bottom:44px;}
.sec-label{display:block;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,3vw,44px);font-weight:400;color:var(--dark);}
.sec-title em{font-style:italic;color:var(--rose);}
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;}
.prod-card{background:#fff;border-radius:22px;overflow:hidden;border:1px solid var(--border);transition:all .4s;cursor:pointer;text-decoration:none;color:inherit;display:block;}
.prod-card:hover{box-shadow:0 20px 46px rgba(139,26,74,0.12);transform:translateY(-7px);}
.prod-img{width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9));font-size:52px;position:relative;}
.prod-body{padding:14px 16px 16px;}
.prod-cat-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:4px;}
.prod-name{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:500;color:var(--dark);line-height:1.3;margin-bottom:10px;min-height:40px;}
.prod-foot{display:flex;justify-content:space-between;align-items:center;}
.prod-price-sm{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:var(--rose);}
.btn-add-sm{background:var(--rose-pale);color:var(--rose);border:none;padding:7px 14px;border-radius:50px;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-add-sm:hover{background:var(--rose);color:#fff;}
.toast{position:fixed;bottom:28px;right:28px;background:var(--dark);color:#fff;padding:14px 22px;border-radius:14px;font-size:14px;font-weight:400;z-index:9999;transform:translateY(80px);opacity:0;transition:all .35s cubic-bezier(.25,.46,.45,.94);display:flex;align-items:center;gap:10px;max-width:320px;}
.toast.show{transform:translateY(0);opacity:1;}
.toast-icon{font-size:18px;}
footer{background:#0F0408;color:rgba(255,255,255,0.6);padding:48px 64px 24px;}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:40px;}
.foot-logo{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:var(--rose);text-decoration:none;display:block;margin-bottom:12px;}
.foot-logo em{font-style:italic;color:var(--gold);}
.foot-desc{font-size:13px;color:rgba(255,255,255,0.38);line-height:1.72;font-weight:300;max-width:270px;}
.foot-col h4{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:500;color:#fff;margin-bottom:16px;}
.foot-col ul{list-style:none;}
.foot-col ul li{margin-bottom:9px;}
.foot-col ul li a{text-decoration:none;color:rgba(255,255,255,0.45);font-size:13px;transition:color .2s;}
.foot-col ul li a:hover{color:var(--gold);}
.foot-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.25);}
.foot-gold{color:var(--gold);}
.loading-state{text-align:center;padding:80px;font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--muted);}
@media(max-width:900px){
  nav{padding:0 20px;}.nav-links{display:none;}
  .breadcrumb,.product-section{padding-left:20px;padding-right:20px;}
  .product-section{grid-template-columns:1fr;gap:32px;}
  .product-image-panel{position:static;}
  .related-section{padding:40px 20px;}
  footer{padding:40px 20px 20px;}
  .foot-grid{grid-template-columns:1fr 1fr;}
  .foot-grid>div:first-child{grid-column:1/-1;}
}
`;
document.head.appendChild(_style);

document.body.innerHTML = `
<div class="marquee-strip"><div class="marquee-track"><span>Free Delivery on Orders Over R500</span><span>100% Authentic Products</span><span>WhatsApp Support Available</span><span>New Season Arrivals Just Dropped</span><span>Free Delivery on Orders Over R500</span><span>100% Authentic Products</span><span>WhatsApp Support Available</span><span>New Season Arrivals Just Dropped</span></div></div>

<nav id="nav">
  <a href="/" class="logo">Neila <em>Beauty</em></a>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/shop.html">Shop</a></li>
    <li><a href="/#combos">Combos</a></li>
    <li><a href="/#contact">Contact</a></li>
  </ul>
  <div class="nav-right">
    <a href="/cart.html" class="cart-btn">\ud83d\uded2<span class="cart-count" id="cartCount"></span></a>
    <a href="https://wa.me/27722937265" class="btn-wa" target="_blank">\ud83d\udcac WhatsApp Us</a>
  </div>
</nav>

<div class="breadcrumb" id="breadcrumb">
  <a href="/">Home</a> <span>\u203a</span>
  <a href="/shop.html">Shop</a> <span>\u203a</span>
  <span id="breadcrumb-name">Loading...</span>
</div>

<div id="main-content">
  <div class="loading-state">Loading product...</div>
</div>

<section class="related-section" id="related-section" style="display:none">
  <div class="sec-head">
    <span class="sec-label">You May Also Like</span>
    <h2 class="sec-title">Related <em>Products</em></h2>
  </div>
  <div class="related-grid" id="related-grid"></div>
</section>

<footer>
  <div class="foot-grid">
    <div><a href="/" class="foot-logo">Neila <em>Beauty</em></a><p class="foot-desc">Premium skincare and beauty products across South Africa. 100% authentic, always.</p></div>
    <div class="foot-col"><h4>Shop</h4><ul><li><a href="/shop.html">All Products</a></li><li><a href="/shop.html?category=face-products">Face Products</a></li><li><a href="/shop.html?category=body-care">Body Care</a></li><li><a href="/shop.html?category=combo-sets">Combo Sets</a></li></ul></div>
    <div class="foot-col"><h4>Help</h4><ul><li><a href="https://wa.me/27722937265" target="_blank">WhatsApp Support</a></li><li><a href="#">Shipping Policy</a></li><li><a href="#">Returns Policy</a></li></ul></div>
    <div class="foot-col"><h4>Connect</h4><ul><li><a href="#">Instagram</a></li><li><a href="#">Facebook</a></li><li><a href="https://wa.me/27722937265" target="_blank">WhatsApp</a></li></ul></div>
  </div>
  <div class="foot-bottom"><span>\u00a9 2026 Neila Beauty Store. All rights reserved.</span><span class="foot-gold">You are Beautiful \u2756</span></div>
</footer>

<div class="toast" id="toast"><span class="toast-icon">\ud83d\uded2</span><span id="toast-msg"></span></div>
`;

const catEmoji = {
  'face-products': '\ud83c\udf38', 'body-care': '\ud83d\udc86', 'hair-products': '\ud83d\udc87',
  'face-body': '\u2728', 'supplements': '\ud83d\udc8a', 'men-products': '\ud83e\uddf4',
  'hair-extensions': '\ud83d\udc69', 'powders': '\ud83d\udc84', 'knuckle-products': '\ud83e\udef2',
  'lips-products': '\ud83d\udc8b', 'combo-sets': '\ud83c\udf81'
};
const badgeClass = { New: '', Popular: 'badge-popular', Premium: 'badge-premium', Bundle: 'badge-bundle' };
let currentProduct = null;
let qty = 1;

const slug = new URLSearchParams(location.search).get('slug');
if (!slug) {
  document.getElementById('main-content').innerHTML = '<div class="loading-state">Product not found. <a href="/shop.html" style="color:var(--rose)">Browse shop \u2192</a></div>';
} else {
  loadProduct(slug);
}

async function loadProduct(slug) {
  const res = await fetch('/api/products/' + slug);
  if (!res.ok) {
    document.getElementById('main-content').innerHTML = '<div class="loading-state">Product not found. <a href="/shop.html" style="color:var(--rose)">Browse shop \u2192</a></div>';
    return;
  }
  currentProduct = await res.json();
  document.title = currentProduct.name + ' \u2014 Neila Beauty Store';
  document.getElementById('breadcrumb-name').textContent = currentProduct.name;
  renderProduct(currentProduct);
  loadRelated(currentProduct);
}

function renderProduct(p) {
  const icon = catEmoji[p.categories && p.categories.slug] || '\u2728';
  const isFree = p.price >= 500;
  const badgeCls = p.badge ? (badgeClass[p.badge] || '') : '';
  document.getElementById('main-content').innerHTML =
    '<div class="product-section">'
    + '<div class="product-image-panel">'
    + '<div class="product-image-main">'
    + (p.badge ? '<div class="prod-badge ' + badgeCls + '">' + p.badge + '</div>' : '')
    + '<span class="product-emoji">' + icon + '</span>'
    + '</div></div>'
    + '<div class="product-info">'
    + '<span class="prod-cat-label">' + ((p.categories && p.categories.name) || 'Beauty') + '</span>'
    + '<h1 class="prod-title">' + p.name + '</h1>'
    + '<div class="prod-rating"><span class="stars">\u2605\u2605\u2605\u2605\u2605</span><span class="rating-text">4.9 \u00b7 127 reviews</span></div>'
    + '<div class="prod-price-wrap">'
    + '<div class="prod-price">R' + Number(p.price).toFixed(2) + '</div>'
    + (isFree ? '<span class="delivery-badge">\u2713 Free Delivery</span>' : '')
    + '</div>'
    + '<p class="prod-desc">' + (p.description || 'Premium beauty product carefully formulated for your skin.') + '</p>'
    + '<div class="trust-badges">'
    + '<div class="trust-badge"><span>\u2705</span><span>100% Authentic</span></div>'
    + '<div class="trust-badge"><span>\ud83d\ude9a</span><span>Fast Delivery</span></div>'
    + '<div class="trust-badge"><span>\ud83d\udd04</span><span>Easy Returns</span></div>'
    + '<div class="trust-badge"><span>\ud83d\udcac</span><span>WhatsApp Support</span></div>'
    + '</div>'
    + '<div class="purchase-row">'
    + '<div class="qty-ctrl">'
    + '<button class="qty-btn" onclick="changeQty(-1)">\u2212</button>'
    + '<span class="qty-num" id="qtyDisplay">1</span>'
    + '<button class="qty-btn" onclick="changeQty(1)">+</button>'
    + '</div>'
    + '<button class="btn-cart-main" id="addBtn" onclick="handleAddToCart()">\ud83d\uded2 Add to Cart</button>'
    + '<button class="btn-wishlist" id="wishBtn" onclick="toggleWish(this)" title="Add to Wishlist">\u2661</button>'
    + '</div>'
    + '<div class="prod-tabs">'
    + '<div class="tab-headers">'
    + '<button class="tab-btn active" onclick="switchTab(this,\'desc\')">Description</button>'
    + '<button class="tab-btn" onclick="switchTab(this,\'how\')">How to Use</button>'
    + '<button class="tab-btn" onclick="switchTab(this,\'ing\')">Key Ingredients</button>'
    + '</div>'
    + '<div class="tab-content active" id="tab-desc">' + (p.description || 'Premium beauty product carefully formulated for your skin.') + '</div>'
    + '<div class="tab-content" id="tab-how">'
    + '<ol class="how-to-steps">'
    + '<li><span class="step-num">1</span><span>Cleanse your skin thoroughly with warm water.</span></li>'
    + '<li><span class="step-num">2</span><span>Apply a small amount to face and/or body as needed.</span></li>'
    + '<li><span class="step-num">3</span><span>Gently massage in circular motions until fully absorbed.</span></li>'
    + '<li><span class="step-num">4</span><span>Use morning and evening for best results. Follow with SPF in the morning.</span></li>'
    + '</ol></div>'
    + '<div class="tab-content" id="tab-ing">'
    + '<ul class="ingredients-list">'
    + '<li>Snail Secretion Filtrate</li><li>Collagen</li><li>Hyaluronic Acid</li>'
    + '<li>Niacinamide</li><li>Alpha Arbutin</li><li>Vitamin C</li><li>Vitamin E</li>'
    + '</ul></div>'
    + '</div></div></div>';
}

async function loadRelated(p) {
  if (!p.category_id) return;
  const res = await fetch('/api/products?category=' + ((p.categories && p.categories.slug) || ''));
  const all = await res.json();
  const related = all.filter(function(r) { return r.id !== p.id; }).slice(0, 4);
  if (!related.length) return;
  document.getElementById('related-section').style.display = 'block';
  document.getElementById('related-grid').innerHTML = related.map(function(r) {
    const rIcon = catEmoji[(r.categories && r.categories.slug)] || '\u2728';
    const rName = (r.categories && r.categories.name) || 'Beauty';
    return '<a class="prod-card" href="/product.html?slug=' + r.slug + '">'
      + '<div class="prod-img">' + rIcon + '</div>'
      + '<div class="prod-body">'
      + '<div class="prod-cat-tag">' + rName + '</div>'
      + '<div class="prod-name">' + r.name + '</div>'
      + '<div class="prod-foot">'
      + '<div class="prod-price-sm">R' + Number(r.price).toFixed(2) + '</div>'
      + '<button class="btn-add-sm" onclick="event.preventDefault();addToCart({id:' + r.id + ',name:' + JSON.stringify(r.name) + ',price:' + r.price + ',icon:\'' + rIcon + '\'});showToast(\'' + r.name.substring(0, 24) + '...\')">Add</button>'
      + '</div></div></a>';
  }).join('');
}

function changeQty(delta) {
  qty = Math.min(Math.max(1, qty + delta), 10);
  document.getElementById('qtyDisplay').textContent = qty;
}

function handleAddToCart() {
  if (!currentProduct) return;
  for (let i = 0; i < qty; i++) {
    addToCart({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, icon: catEmoji[(currentProduct.categories && currentProduct.categories.slug)] || '\u2728' });
  }
  const btn = document.getElementById('addBtn');
  btn.textContent = '\u2713 Added to Cart!';
  btn.classList.add('added');
  setTimeout(function() { btn.innerHTML = '\ud83d\uded2 Add to Cart'; btn.classList.remove('added'); }, 2000);
  showToast(currentProduct.name);
}

function toggleWish(btn) {
  btn.textContent = btn.textContent === '\u2665' ? '\u2661' : '\u2665';
  btn.classList.toggle('liked');
}

function switchTab(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}

function showToast(name) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = name.substring(0, 30) + ' added to cart';
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}

window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

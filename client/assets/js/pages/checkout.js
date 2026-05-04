document.documentElement.lang = 'en';
document.title = 'Checkout \u2014 Beauty Store';

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
:root{--rose:#8B1A4A;--rose-hover:#6D1438;--rose-light:#B84B7A;--rose-pale:#F5E6EE;--gold:#C9A96E;--ivory:#FAF8F5;--dark:#1A0A0F;--text:#2C1520;--muted:#7A6670;--border:rgba(139,26,74,0.1);}
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
.secure-note{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:6px;}
.checkout-steps{display:flex;justify-content:center;align-items:center;gap:0;padding:28px 64px;background:#fff;border-bottom:1px solid var(--border);}
.step{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted);}
.step.active{color:var(--rose);font-weight:500;}
.step.done{color:var(--gold);}
.step-dot{width:28px;height:28px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0;}
.step.active .step-dot{border-color:var(--rose);background:var(--rose);color:#fff;}
.step.done .step-dot{border-color:var(--gold);background:var(--gold);color:#fff;}
.step-line{width:60px;height:1px;background:var(--border);margin:0 8px;}
.checkout-hero{background:linear-gradient(135deg,var(--rose-pale),rgba(250,248,245,0.3));padding:40px 64px 32px;}
.hero-label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:10px;display:block;}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,3.5vw,46px);font-weight:400;color:var(--dark);}
.hero-title em{font-style:italic;color:var(--rose);}
.checkout-layout{display:grid;grid-template-columns:1fr 380px;gap:32px;padding:36px 64px 80px;align-items:start;}
.form-panel{background:#fff;border-radius:24px;border:1px solid var(--border);padding:32px;}
.form-section-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;color:var(--dark);margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;}
.form-group{display:flex;flex-direction:column;gap:6px;}
.form-group.full{grid-column:1/-1;}
label{font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500;}
input,textarea,select{padding:13px 16px;border:1px solid var(--border);border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--text);background:#fff;outline:none;transition:border-color .2s,box-shadow .2s;width:100%;}
input:focus,textarea:focus,select:focus{border-color:var(--rose);box-shadow:0 0 0 3px rgba(139,26,74,0.06);}
textarea{resize:vertical;min-height:80px;}
.delivery-note{background:rgba(74,124,89,0.07);border:1px solid rgba(74,124,89,0.2);border-radius:14px;padding:16px;margin-bottom:28px;font-size:13px;color:#4A7C59;display:flex;align-items:center;gap:10px;}
.payment-options{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;}
.payment-option{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1.5px solid var(--border);border-radius:14px;cursor:pointer;transition:all .2s;}
.payment-option.selected{border-color:var(--rose);background:var(--rose-pale);}
.payment-option input[type=radio]{accent-color:var(--rose);}
.payment-title{font-size:14px;font-weight:500;color:var(--text);}
.payment-desc{font-size:12px;color:var(--muted);margin-top:2px;}
.payment-icons{margin-left:auto;display:flex;gap:6px;font-size:20px;}
.form-error{background:rgba(227,45,45,0.07);border:1px solid rgba(227,45,45,0.2);border-radius:12px;padding:14px 18px;font-size:14px;color:#c0392b;margin-bottom:20px;display:none;}
.summary-panel{background:#fff;border-radius:24px;border:1px solid var(--border);padding:28px;position:sticky;top:96px;}
.summary-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;color:var(--dark);margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);}
.summary-items{margin-bottom:20px;}
.summary-item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(139,26,74,0.06);}
.summary-item:last-child{border-bottom:none;}
.s-img{width:44px;height:44px;border-radius:10px;background:linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9));display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.s-name{font-size:13px;color:var(--text);line-height:1.3;flex:1;}
.s-qty{font-size:11px;color:var(--muted);}
.s-price{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:var(--rose);}
.summary-row{display:flex;justify-content:space-between;font-size:14px;margin-bottom:10px;}
.summary-row .label{color:var(--muted);}
.summary-row .value{font-weight:500;}
.summary-total{display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:14px;margin-top:6px;margin-bottom:24px;}
.summary-total .label{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:500;color:var(--dark);}
.summary-total .value{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:var(--rose);}
.btn-pay{width:100%;background:var(--rose);color:#fff;border:none;padding:17px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .3s;display:flex;align-items:center;justify-content:center;gap:10px;}
.btn-pay:hover{background:var(--rose-hover);box-shadow:0 12px 30px rgba(139,26,74,0.25);}
.btn-pay:disabled{opacity:.6;cursor:not-allowed;transform:none!important;}
.secure-row{display:flex;justify-content:center;gap:14px;margin-top:14px;flex-wrap:wrap;}
.sec-badge{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:4px;}
footer{background:#0F0408;padding:24px 64px;margin-top:0;}
.foot-bottom{display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.25);}
.foot-gold{color:var(--gold);}
.loading-overlay{position:fixed;inset:0;background:rgba(250,248,245,0.9);display:none;align-items:center;justify-content:center;z-index:9999;flex-direction:column;gap:16px;}
.loading-overlay.show{display:flex;}
.spinner{width:48px;height:48px;border:3px solid var(--border);border-top-color:var(--rose);border-radius:50%;animation:spin .8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.loading-text{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--rose);}
@media(max-width:900px){
  nav{padding:0 20px;}.checkout-hero{padding:32px 20px 24px;}
  .checkout-layout{grid-template-columns:1fr;padding:20px 20px 60px;}
  .summary-panel{position:static;order:-1;}
  .checkout-steps{padding:20px;}
  .step-line{width:30px;}
  .form-grid{grid-template-columns:1fr;}
  footer{padding:20px;}
}
`;
document.head.appendChild(_style);

document.body.innerHTML = `
<div class="marquee-strip"><div class="marquee-track"><span>Free Delivery on Orders Over R500</span><span>100% Authentic Products</span><span>Secure Checkout</span><span>Fast Delivery Nationwide</span><span>Free Delivery on Orders Over R500</span><span>100% Authentic Products</span><span>Secure Checkout</span><span>Fast Delivery Nationwide</span></div></div>

<nav>
  <a href="/" class="logo">Beauty <em>Beauty</em></a>
  <div class="secure-note">\ud83d\udd12 Secure Checkout</div>
</nav>

<div class="checkout-steps">
  <div class="step done"><div class="step-dot">\u2713</div>Cart</div>
  <div class="step-line"></div>
  <div class="step active"><div class="step-dot">2</div>Details</div>
  <div class="step-line"></div>
  <div class="step"><div class="step-dot">3</div>Payment</div>
  <div class="step-line"></div>
  <div class="step"><div class="step-dot">4</div>Confirmation</div>
</div>

<div class="checkout-hero">
  <span class="hero-label">Final Step</span>
  <h1 class="hero-title">Complete Your <em>Order</em></h1>
</div>

<div class="checkout-layout">
  <div class="form-panel">
    <div class="form-error" id="formError"></div>
    <div class="form-section-title">\ud83d\udce6 Delivery Details</div>
    <div class="delivery-note">\ud83d\ude9a Free delivery on orders over R500. Standard delivery R80 for smaller orders.</div>
    <div class="form-grid">
      <div class="form-group"><label>Full Name *</label><input type="text" id="fullName" placeholder="e.g. Thandi Mokoena" required></div>
      <div class="form-group"><label>Email Address *</label><input type="email" id="email" placeholder="your@email.com" required></div>
      <div class="form-group"><label>Phone Number</label><input type="tel" id="phone" placeholder="+27 72 123 4567"></div>
      <div class="form-group"><label>City / Town</label><input type="text" id="city" placeholder="e.g. Johannesburg"></div>
      <div class="form-group full"><label>Delivery Address</label><textarea id="address" placeholder="Street address, suburb, postal code"></textarea></div>
      <div class="form-group full"><label>Order Notes (optional)</label><textarea id="notes" placeholder="Any special instructions for your order..." style="min-height:60px;"></textarea></div>
    </div>
    <div class="form-section-title">\ud83d\udcb3 Payment Method</div>
    <div class="payment-options">
      <div class="payment-option selected" onclick="selectPayment(this,'payfast')">
        <input type="radio" name="payment" value="payfast" checked>
        <div>
          <div class="payment-title">PayFast \u2014 Card, EFT &amp; More</div>
          <div class="payment-desc">Pay securely with Visa, Mastercard, EFT, Ozow and more</div>
        </div>
        <div class="payment-icons">\ud83d\udcb3</div>
      </div>
      <div class="payment-option" onclick="selectPayment(this,'whatsapp')">
        <input type="radio" name="payment" value="whatsapp">
        <div>
          <div class="payment-title">WhatsApp Order</div>
          <div class="payment-desc">Send your order via WhatsApp \u2014 we'll confirm and arrange payment</div>
        </div>
        <div class="payment-icons">\ud83d\udcac</div>
      </div>
    </div>
  </div>

  <aside class="summary-panel">
    <div class="summary-title">Your Order</div>
    <div class="summary-items" id="summaryItems"></div>
    <div class="summary-row"><span class="label">Subtotal</span><span class="value" id="subtotalVal">R0.00</span></div>
    <div class="summary-row"><span class="label">Delivery</span><span class="value" id="deliveryVal">R80.00</span></div>
    <div class="summary-total"><span class="label">Total</span><span class="value" id="totalVal">R0.00</span></div>
    <button class="btn-pay" id="payBtn" onclick="submitOrder()">\ud83d\udd12 Place Order &amp; Pay</button>
    <div class="secure-row">
      <span class="sec-badge">\ud83d\udd12 SSL Secured</span>
      <span class="sec-badge">\u2705 Authentic</span>
      <span class="sec-badge">\ud83d\udd04 Easy Returns</span>
    </div>
  </aside>
</div>

<footer><div class="foot-bottom"><span>\u00a9 2026 Beauty Store</span><span class="foot-gold">You are Beautiful \u2756</span></div></footer>

<div class="loading-overlay" id="loadingOverlay">
  <div class="spinner"></div>
  <div class="loading-text">Processing your order...</div>
</div>
`;

let selectedPayment = 'payfast';

function selectPayment(el, method) {
  document.querySelectorAll('.payment-option').forEach(function(o) { o.classList.remove('selected'); });
  el.classList.add('selected');
  el.querySelector('input').checked = true;
  selectedPayment = method;
  document.getElementById('payBtn').textContent = method === 'whatsapp' ? '\ud83d\udcac Send via WhatsApp' : '\ud83d\udd12 Place Order & Pay';
}

function renderSummary() {
  const cart = getCart();
  if (!cart.length) { location.href = '/cart.html'; return; }
  const sub = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  const del = sub >= 500 ? 0 : 80;
  document.getElementById('summaryItems').innerHTML = cart.map(function(i) {
    return '<div class="summary-item">'
      + '<div class="s-img">' + (i.icon || '\u2728') + '</div>'
      + '<div class="s-name">' + i.name + '<div class="s-qty">Qty: ' + i.qty + '</div></div>'
      + '<div class="s-price">R' + (i.price * i.qty).toFixed(2) + '</div>'
      + '</div>';
  }).join('');
  document.getElementById('subtotalVal').textContent = 'R' + sub.toFixed(2);
  document.getElementById('deliveryVal').textContent = del === 0 ? 'FREE' : 'R80.00';
  document.getElementById('totalVal').textContent = 'R' + (sub + del).toFixed(2);
}

async function submitOrder() {
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const errEl = document.getElementById('formError');

  if (!name || !email) {
    errEl.textContent = 'Please enter your name and email address.';
    errEl.style.display = 'block';
    errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  if (selectedPayment === 'whatsapp') {
    const cart = getCart();
    const items = cart.map(function(i) {
      return i.name + ' x' + i.qty + ' = R' + (i.price * i.qty).toFixed(2);
    }).join('%0A');
    const sub = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
    const del = sub >= 500 ? 0 : 80;
    const msg = "Hello Beauty Store! I'd like to place an order:%0A%0AName: " + name
      + '%0AEmail: ' + email + '%0APhone: ' + phone + '%0AAddress: ' + address
      + '%0A%0AItems:%0A' + items + '%0A%0ATotal: R' + (sub + del).toFixed(2);
    window.open('https://wa.me/27722937265?text=' + msg, '_blank');
    clearCart();
    location.href = '/order-success.html?method=whatsapp';
    return;
  }

  document.getElementById('loadingOverlay').classList.add('show');
  document.getElementById('payBtn').disabled = true;

  try {
    const cart = getCart();
    const orderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        address: address + ' ' + document.getElementById('city').value,
        items: cart.map(function(i) { return { id: i.id, name: i.name, price: i.price, qty: i.qty }; })
      })
    });
    const order = await orderRes.json();
    if (!orderRes.ok) throw new Error(order.error || 'Failed to create order');

    const pfRes = await fetch('/api/payments/initiate/' + order.orderId);
    const pf = await pfRes.json();
    if (!pfRes.ok) throw new Error(pf.error || 'Payment initiation failed');

    clearCart();
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = pf.url;
    Object.entries(pf.fields).forEach(function(entry) {
      const inp = document.createElement('input');
      inp.type = 'hidden';
      inp.name = entry[0];
      inp.value = entry[1];
      form.appendChild(inp);
    });
    document.body.appendChild(form);
    form.submit();
  } catch (e) {
    document.getElementById('loadingOverlay').classList.remove('show');
    document.getElementById('payBtn').disabled = false;
    errEl.textContent = 'Something went wrong: ' + e.message + '. Please try again or contact us on WhatsApp.';
    errEl.style.display = 'block';
    errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

renderSummary();

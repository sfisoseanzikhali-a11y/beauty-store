document.documentElement.lang = 'en';
document.title = 'Order Confirmed \u2014 Neila Beauty Store';

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
:root{--rose:#8B1A4A;--rose-hover:#6D1438;--rose-pale:#F5E6EE;--gold:#C9A96E;--ivory:#FAF8F5;--dark:#1A0A0F;--text:#2C1520;--muted:#7A6670;--border:rgba(139,26,74,0.1);}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--text);min-height:100vh;display:flex;flex-direction:column;}
nav{background:rgba(250,248,245,0.95);border-bottom:1px solid var(--border);padding:0 64px;display:flex;align-items:center;height:74px;}
.logo{font-family:'Cormorant Garamond',serif;font-size:27px;font-weight:600;color:var(--rose);text-decoration:none;}
.logo em{font-style:italic;color:var(--gold);}
main{flex:1;display:flex;align-items:center;justify-content:center;padding:60px 20px;}
.success-card{background:#fff;border-radius:32px;border:1px solid var(--border);padding:56px 48px;max-width:560px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(139,26,74,0.06);}
.success-icon{width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#4A7C59,#6BAF7B);display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 28px;animation:pop .5s cubic-bezier(.36,1.56,.64,1) both;}
@keyframes pop{from{transform:scale(0);opacity:0;}to{transform:scale(1);opacity:1;}}
.success-label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;display:block;}
.success-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,5vw,44px);font-weight:400;color:var(--dark);line-height:1.15;margin-bottom:16px;}
.success-title em{font-style:italic;color:var(--rose);}
.success-desc{font-size:15px;color:var(--muted);line-height:1.72;font-weight:300;margin-bottom:32px;}
.order-ref{background:var(--rose-pale);border-radius:14px;padding:16px 20px;margin-bottom:32px;display:inline-flex;align-items:center;gap:10px;font-size:14px;}
.order-ref strong{color:var(--rose);font-family:'Cormorant Garamond',serif;font-size:18px;}
.next-steps{text-align:left;background:#FAF8F5;border-radius:16px;padding:20px 24px;margin-bottom:32px;}
.next-step{display:flex;align-items:flex-start;gap:12px;padding:8px 0;font-size:14px;color:var(--muted);}
.next-step:not(:last-child){border-bottom:1px solid var(--border);}
.next-step-icon{font-size:18px;margin-top:1px;flex-shrink:0;}
.btn-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.btn-primary{background:var(--rose);color:#fff;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:500;transition:all .3s;}
.btn-primary:hover{background:var(--rose-hover);transform:translateY(-2px);}
.btn-outline{color:var(--rose);text-decoration:none;padding:13px 28px;border-radius:50px;font-size:14px;border:1.5px solid rgba(139,26,74,0.3);transition:all .3s;}
.btn-outline:hover{background:var(--rose-pale);}
footer{background:#0F0408;padding:20px 64px;}
.foot-bottom{display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.25);}
.foot-gold{color:var(--gold);}
@media(max-width:600px){nav{padding:0 20px;}.success-card{padding:36px 24px;}.btn-row{flex-direction:column;}footer{padding:20px;}}
`;
document.head.appendChild(_style);

document.body.innerHTML = `
<nav><a href="/" class="logo">Neila <em>Beauty</em></a></nav>
<main>
  <div class="success-card">
    <div class="success-icon">\u2713</div>
    <span class="success-label">Order Confirmed</span>
    <h1 class="success-title">Thank You for Your <em>Order!</em></h1>
    <p class="success-desc" id="successDesc">Your order has been received and we're preparing it with care. You'll receive a confirmation email shortly.</p>
    <div class="order-ref" id="orderRef">
      <span>\ud83d\udccb</span>
      <span>Order <strong id="orderId">#\u2014</strong></span>
    </div>
    <div class="next-steps">
      <div class="next-step"><span class="next-step-icon">\ud83d\udce7</span><span>A confirmation email has been sent to your inbox.</span></div>
      <div class="next-step"><span class="next-step-icon">\ud83d\udce6</span><span>We'll process and pack your order within 1\u20132 business days.</span></div>
      <div class="next-step"><span class="next-step-icon">\ud83d\ude9a</span><span>Delivery typically takes 3\u20135 business days across South Africa.</span></div>
      <div class="next-step"><span class="next-step-icon">\ud83d\udcac</span><span>Questions? Chat with us on WhatsApp anytime.</span></div>
    </div>
    <div class="btn-row">
      <a href="/" class="btn-primary">Continue Shopping \u2192</a>
      <a href="https://wa.me/27722937265" class="btn-outline" target="_blank">\ud83d\udcac WhatsApp Us</a>
    </div>
  </div>
</main>
<footer><div class="foot-bottom"><span>\u00a9 2026 Neila Beauty Store</span><span class="foot-gold">You are Beautiful \u2756</span></div></footer>
`;

const params = new URLSearchParams(location.search);
const id = params.get('order');
const method = params.get('method');
if (id) document.getElementById('orderId').textContent = '#' + id;
if (method === 'whatsapp') {
  document.getElementById('successDesc').textContent = "Your order has been sent via WhatsApp! We'll confirm and arrange payment with you shortly.";
}

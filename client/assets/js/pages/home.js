document.documentElement.lang = 'en';
document.title = 'Beauty Store \u2014 You Are Beautiful';

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
:root {
  --rose: #8B1A4A;
  --rose-hover: #6D1438;
  --rose-light: #B84B7A;
  --rose-pale: #F5E6EE;
  --gold: #C9A96E;
  --gold-light: #E8D5A8;
  --ivory: #FAF8F5;
  --dark: #1A0A0F;
  --text: #2C1520;
  --muted: #7A6670;
  --border: rgba(139,26,74,0.1);
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--text);overflow-x:hidden;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--ivory);}
::-webkit-scrollbar-thumb{background:var(--rose-light);border-radius:3px;}

.marquee-strip{background:var(--rose);padding:10px 0;overflow:hidden;}
.marquee-track{display:flex;gap:0;animation:scroll-left 28s linear infinite;white-space:nowrap;}
.marquee-track span{display:inline-flex;align-items:center;gap:0;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.9);padding:0 32px;}
.marquee-track span::after{content:'\u2756';color:var(--gold);margin-left:32px;}
@keyframes scroll-left{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

nav{position:sticky;top:0;z-index:100;background:rgba(250,248,245,0.93);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 64px;display:flex;align-items:center;justify-content:space-between;height:74px;transition:box-shadow .3s;}
nav.scrolled{box-shadow:0 6px 40px rgba(139,26,74,0.07);}
.logo{font-family:'Cormorant Garamond',serif;font-size:27px;font-weight:600;color:var(--rose);letter-spacing:.5px;text-decoration:none;}
.logo em{font-style:italic;color:var(--gold);}
.nav-links{display:flex;gap:38px;list-style:none;}
.nav-links a{text-decoration:none;color:var(--text);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:400;position:relative;transition:color .25s;}
.nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--gold);transition:width .3s ease;}
.nav-links a:hover{color:var(--rose);}
.nav-links a:hover::after{width:100%;}
.nav-right{display:flex;align-items:center;gap:16px;}
.btn-wa{background:var(--rose);color:#fff;text-decoration:none;padding:10px 22px;border-radius:50px;font-size:12px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
.btn-wa:hover{background:var(--rose-hover);transform:translateY(-1px);box-shadow:0 8px 24px rgba(139,26,74,0.25);}

.hero{min-height:91vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:80px 64px;position:relative;overflow:hidden;}
.hero-gradient{position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 75% 50%,rgba(245,230,238,0.9) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 5% 85%,rgba(201,169,110,0.07) 0%,transparent 55%);pointer-events:none;}

.spk{position:absolute;pointer-events:none;animation:sparkle-float 7s ease-in-out infinite;}
.spk::before{content:'\u2756';color:var(--gold);display:block;}
.spk:nth-child(1){top:14%;left:56%;font-size:13px;opacity:.45;animation-delay:0s;}
.spk:nth-child(2){top:28%;left:82%;font-size:8px;opacity:.3;animation-delay:-2.5s;}
.spk:nth-child(3){top:62%;left:50%;font-size:18px;opacity:.18;animation-delay:-4.5s;}
.spk:nth-child(4){top:44%;left:93%;font-size:10px;opacity:.35;animation-delay:-1.2s;}
.spk:nth-child(5){top:78%;left:74%;font-size:11px;opacity:.28;animation-delay:-3.5s;}
.spk:nth-child(6){top:8%;left:72%;font-size:7px;opacity:.4;animation-delay:-6s;}
@keyframes sparkle-float{0%,100%{transform:translateY(0) rotate(0deg);}33%{transform:translateY(-14px) rotate(120deg);}66%{transform:translateY(7px) rotate(240deg);}}

.hero-content{position:relative;z-index:1;}
.hero-pill{display:inline-flex;align-items:center;gap:8px;background:var(--rose-pale);color:var(--rose);padding:8px 18px;border-radius:50px;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:500;margin-bottom:28px;animation:fade-up .8s ease both;opacity:0;}
.hero-pill::before{content:'\u2756';color:var(--gold);font-size:10px;}
h1.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(52px,5.5vw,88px);font-weight:400;line-height:1.03;color:var(--dark);margin-bottom:22px;animation:fade-up .8s .15s ease both;opacity:0;}
h1.hero-title em{font-style:italic;color:var(--rose);display:block;}
h1.hero-title .gw{color:var(--gold);}
.hero-desc{font-size:16px;color:var(--muted);line-height:1.78;max-width:440px;margin-bottom:40px;font-weight:300;animation:fade-up .8s .3s ease both;opacity:0;}
.hero-ctas{display:flex;gap:14px;align-items:center;animation:fade-up .8s .45s ease both;opacity:0;}
.btn-primary{background:var(--rose);color:#fff;text-decoration:none;padding:15px 34px;border-radius:50px;font-size:14px;font-weight:500;letter-spacing:.3px;transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
.btn-primary:hover{background:var(--rose-hover);transform:translateY(-2px);box-shadow:0 14px 34px rgba(139,26,74,0.3);}
.btn-outline{color:var(--rose);text-decoration:none;padding:14px 34px;border-radius:50px;font-size:14px;font-weight:400;border:1.5px solid rgba(139,26,74,0.4);transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
.btn-outline:hover{background:var(--rose-pale);border-color:var(--rose);transform:translateY(-2px);}
.hero-stats{display:flex;gap:40px;margin-top:52px;padding-top:32px;border-top:1px solid var(--border);animation:fade-up .8s .6s ease both;opacity:0;}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:600;color:var(--rose);line-height:1;}
.stat-l{font-size:11px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-top:4px;}

.hero-visual{position:relative;z-index:1;display:flex;justify-content:center;align-items:center;animation:fade-left 1s .3s ease both;opacity:0;}
.hero-circle{width:min(460px,43vw);height:min(460px,43vw);border-radius:50%;background:radial-gradient(circle at 40% 40%,rgba(245,230,238,0.95),rgba(250,248,245,0.5));border:1px solid rgba(139,26,74,0.08);display:flex;align-items:center;justify-content:center;position:relative;}
.orbit{position:absolute;border-radius:50%;border:1px dashed rgba(201,169,110,0.25);}
.o1{width:108%;height:108%;animation:spin 22s linear infinite;}
.o2{width:122%;height:122%;animation:spin 34s linear infinite reverse;}
.o3{width:136%;height:136%;animation:spin 46s linear infinite;}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
.odot{position:absolute;width:9px;height:9px;border-radius:50%;top:-4.5px;left:50%;transform:translateX(-50%);}
.odot-g{background:var(--gold);}
.odot-r{background:var(--rose-light);bottom:-4.5px;top:auto;}
.odot-s{background:var(--rose-pale);border:1px solid var(--gold);width:7px;height:7px;}
.hero-inner{width:73%;height:73%;border-radius:50%;background:rgba(255,255,255,0.9);border:1px solid rgba(201,169,110,0.15);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:24px;box-shadow:0 20px 60px rgba(139,26,74,0.05);}
.hi-icon{font-size:60px;margin-bottom:14px;animation:pulse-scale 4s ease-in-out infinite;}
@keyframes pulse-scale{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}
.hi-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;color:var(--rose);line-height:1.3;}
.hi-sub{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:6px;}

@keyframes fade-up{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
@keyframes fade-left{from{opacity:0;transform:translateX(36px);}to{opacity:1;transform:translateX(0);}}

.section{padding:84px 64px;}
.section-alt{background:#FBF7F9;}
.sec-head{text-align:center;margin-bottom:56px;}
.sec-label{display:block;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:14px;}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,3.8vw,54px);font-weight:400;color:var(--dark);line-height:1.12;}
.sec-title em{font-style:italic;color:var(--rose);}
.sec-desc{font-size:15px;color:var(--muted);max-width:500px;margin:14px auto 0;line-height:1.72;font-weight:300;}

.reveal{opacity:0;transform:translateY(32px);transition:opacity .65s ease,transform .65s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal.d1{transition-delay:.1s;}.reveal.d2{transition-delay:.2s;}.reveal.d3{transition-delay:.3s;}.reveal.d4{transition-delay:.4s;}

.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:14px;}
.cat-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:26px 14px;text-align:center;cursor:pointer;transition:all .35s cubic-bezier(.25,.46,.45,.94);text-decoration:none;color:inherit;display:flex;flex-direction:column;align-items:center;gap:10px;}
.cat-card:hover{border-color:var(--rose-light);transform:translateY(-6px);box-shadow:0 18px 40px rgba(139,26,74,0.1);background:var(--rose-pale);}
.cat-icon{width:50px;height:50px;border-radius:14px;background:var(--rose-pale);display:flex;align-items:center;justify-content:center;font-size:22px;transition:all .3s;}
.cat-card:hover .cat-icon{background:var(--rose);transform:scale(1.08);}
.cat-nm{font-size:13px;font-weight:400;color:var(--text);line-height:1.3;}
.cat-card:hover .cat-nm{color:var(--rose);}

.prod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:22px;}
.prod-card{background:#fff;border-radius:22px;overflow:hidden;border:1px solid var(--border);transition:all .4s cubic-bezier(.25,.46,.45,.94);}
.prod-card:hover{box-shadow:0 22px 50px rgba(139,26,74,0.12);transform:translateY(-8px);}
.prod-img{width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.8));}
.prod-img-inner{font-size:56px;transition:transform .4s;}
.prod-card:hover .prod-img-inner{transform:scale(1.08);}
.prod-badge{position:absolute;top:12px;left:12px;background:var(--rose);color:#fff;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:50px;font-weight:500;}
.prod-fav{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .2s;cursor:pointer;color:var(--rose);}
.prod-fav:hover{background:var(--rose);color:#fff;}
.prod-body{padding:16px 18px 18px;}
.prod-cat-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:5px;}
.prod-name{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:500;color:var(--dark);line-height:1.35;margin-bottom:12px;}
.prod-foot{display:flex;justify-content:space-between;align-items:center;}
.prod-price{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--rose);}
.btn-add{background:var(--rose-pale);color:var(--rose);border:none;padding:8px 16px;border-radius:50px;font-size:12px;font-weight:500;cursor:pointer;transition:all .22s;font-family:'DM Sans',sans-serif;}
.btn-add:hover{background:var(--rose);color:#fff;}

.combo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px;}
.combo-card{background:#fff;border-radius:24px;padding:28px;border:1px solid var(--border);transition:all .4s;position:relative;overflow:hidden;}
.combo-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--rose),var(--gold));opacity:0;transition:opacity .3s;}
.combo-card:hover{transform:translateY(-6px);box-shadow:0 20px 44px rgba(139,26,74,0.1);}
.combo-card:hover::before{opacity:1;}
.combo-ico{font-size:38px;margin-bottom:16px;}
.combo-name{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:500;color:var(--dark);line-height:1.3;margin-bottom:10px;}
.combo-desc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:22px;font-weight:300;}
.combo-foot{display:flex;justify-content:space-between;align-items:center;}
.combo-price{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;color:var(--rose);}
.combo-tag{font-size:10px;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;font-weight:500;margin-top:2px;}

.why-sec{background:var(--rose);padding:84px 64px;}
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:48px;margin-top:56px;}
.why-item{text-align:center;color:#fff;}
.why-icon{font-size:42px;margin-bottom:18px;display:block;}
.why-title{font-family:'Cormorant Garamond',serif;font-size:23px;font-weight:500;margin-bottom:10px;}
.why-desc{font-size:14px;color:rgba(255,255,255,0.7);line-height:1.68;font-weight:300;}

.test-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;}
.test-card{background:#fff;border-radius:24px;padding:32px;border:1px solid var(--border);}
.stars{color:var(--gold);font-size:14px;margin-bottom:16px;letter-spacing:2px;}
.test-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;color:var(--dark);line-height:1.58;margin-bottom:22px;}
.reviewer{display:flex;align-items:center;gap:12px;}
.rev-av{width:40px;height:40px;border-radius:50%;background:var(--rose-pale);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;color:var(--rose);flex-shrink:0;}
.rev-name{font-size:14px;font-weight:500;color:var(--text);}
.rev-loc{font-size:12px;color:var(--muted);}

.brands-sec{background:#fff;padding:50px 64px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.brands-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:48px;}
.brand-name{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--muted);font-weight:400;letter-spacing:1px;opacity:0.6;transition:opacity .2s;}
.brand-name:hover{opacity:1;color:var(--rose);}

.wa-sec{background:var(--rose-pale);padding:84px 64px;text-align:center;}
.wa-btn{background:#25D366;color:#fff;text-decoration:none;padding:18px 42px;border-radius:50px;font-size:16px;font-weight:500;display:inline-flex;align-items:center;gap:12px;transition:all .3s;margin-top:32px;}
.wa-btn:hover{background:#1DA851;transform:translateY(-3px);box-shadow:0 14px 34px rgba(37,211,102,0.3);}

.nl-sec{background:var(--dark);padding:84px 64px;text-align:center;}
.nl-sec .sec-title{color:#fff;}
.nl-sec .sec-desc{color:rgba(255,255,255,0.45);}
.nl-form{display:flex;gap:12px;max-width:480px;margin:32px auto 0;}
.nl-input{flex:1;padding:16px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.07);color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .3s;}
.nl-input::placeholder{color:rgba(255,255,255,0.3);}
.nl-input:focus{border-color:var(--gold);}
.nl-btn{background:var(--gold);color:var(--dark);border:none;padding:16px 28px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .3s;white-space:nowrap;}
.nl-btn:hover{background:var(--gold-light);transform:translateY(-1px);}

footer{background:#0F0408;color:rgba(255,255,255,0.6);padding:64px 64px 30px;}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:52px;}
.foot-logo{display:block;margin-bottom:16px;}
.foot-desc{font-size:13px;color:rgba(255,255,255,0.38);line-height:1.72;font-weight:300;max-width:270px;}
.foot-col h4{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:500;color:#fff;margin-bottom:20px;}
.foot-col ul{list-style:none;}
.foot-col ul li{margin-bottom:10px;}
.foot-col ul li a{text-decoration:none;color:rgba(255,255,255,0.45);font-size:13px;transition:color .2s;font-weight:300;}
.foot-col ul li a:hover{color:var(--gold);}
.foot-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:rgba(255,255,255,0.25);}
.foot-gold{color:var(--gold);}

@media(max-width:900px){
  nav{padding:0 22px;}
  .nav-links{display:none;}
  .hero{grid-template-columns:1fr;padding:52px 22px;min-height:auto;gap:48px;}
  .hero-visual{order:-1;}
  .hero-circle{width:260px;height:260px;}
  .section,.why-sec,.wa-sec,.nl-sec,.brands-sec{padding:60px 22px;}
  footer{padding:48px 22px 22px;}
  .foot-grid{grid-template-columns:1fr 1fr;}
  .foot-grid>div:first-child{grid-column:1/-1;}
  .hero-stats{flex-wrap:wrap;gap:22px;}
  .nl-form{flex-direction:column;}
  .nl-btn{border-radius:50px;}
}
`;
document.head.appendChild(_style);

document.body.innerHTML = `
<div class="marquee-strip">
  <div class="marquee-track" id="mtrack">
    <span>Free Delivery on Orders Over R500</span>
    <span>100% Authentic Products</span>
    <span>WhatsApp Support Available</span>
    <span>New Season Arrivals Just Dropped</span>
    <span>Combo Sets \u2014 Greater Value</span>
    <span>Trusted by 3,000+ Clients</span>
    <span>Free Delivery on Orders Over R500</span>
    <span>100% Authentic Products</span>
    <span>WhatsApp Support Available</span>
    <span>New Season Arrivals Just Dropped</span>
    <span>Combo Sets \u2014 Greater Value</span>
    <span>Trusted by 3,000+ Clients</span>
  </div>
</div>

<nav id="nav">
  <a href="#" class="logo">Beauty <em>Beauty</em></a>
  <ul class="nav-links">
    <li><a href="#cats">Shop</a></li>
    <li><a href="#arrivals">New Arrivals</a></li>
    <li><a href="#combos">Combos</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="nav-right">
    <a href="https://wa.me/27722937265" class="btn-wa" target="_blank">\ud83d\udcac WhatsApp Us</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-gradient"></div>
  <div class="spk"></div><div class="spk"></div><div class="spk"></div>
  <div class="spk"></div><div class="spk"></div><div class="spk"></div>
  <div class="hero-content">
    <div class="hero-pill">New Season Collection</div>
    <h1 class="hero-title">
      Discover Your<br>
      <em>True Beauty</em><br>
      <span class="gw">Ritual</span>
    </h1>
    <p class="hero-desc">Premium skincare, haircare and body care products curated for every skin type. From brightening serums to nourishing combo sets \u2014 your glow starts here.</p>
    <div class="hero-ctas">
      <a href="#arrivals" class="btn-primary">Shop New Arrivals \u2192</a>
      <a href="#combos" class="btn-outline">View Combo Sets</a>
    </div>
    <div class="hero-stats">
      <div><div class="stat-n">500+</div><div class="stat-l">Products</div></div>
      <div><div class="stat-n">3K+</div><div class="stat-l">Happy Clients</div></div>
      <div><div class="stat-n">100%</div><div class="stat-l">Authentic</div></div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-circle">
      <div class="orbit o1"><div class="odot odot-g"></div></div>
      <div class="orbit o2"><div class="odot odot-r"></div></div>
      <div class="orbit o3"><div class="odot odot-s"></div></div>
      <div class="hero-inner">
        <div class="hi-icon">\u2728</div>
        <div class="hi-title">Glow from<br>Within</div>
        <div class="hi-sub">Beauty Store</div>
      </div>
    </div>
  </div>
</section>

<div class="brands-sec reveal">
  <div class="brands-inner">
    <span class="brand-name">DR.Rashel</span>
    <span class="brand-name">Estelin</span>
    <span class="brand-name">Love JoJo</span>
    <span class="brand-name">Veetgold</span>
    <span class="brand-name">Sadoer</span>
    <span class="brand-name">DR.Davey</span>
    <span class="brand-name">Lumine</span>
    <span class="brand-name">Golden Glow</span>
    <span class="brand-name">DR.Meinaier</span>
  </div>
</div>

<section class="section" id="cats">
  <div class="sec-head reveal">
    <span class="sec-label">Explore Our Range</span>
    <h2 class="sec-title">Shop by <em>Category</em></h2>
    <p class="sec-desc">Everything your beauty routine needs, in one carefully curated place.</p>
  </div>
  <div class="cat-grid">
    <a href="#" class="cat-card reveal d1" target="_blank"><div class="cat-icon">\ud83c\udf38</div><div class="cat-nm">Face Products</div></a>
    <a href="#" class="cat-card reveal d2" target="_blank"><div class="cat-icon">\ud83d\udc86</div><div class="cat-nm">Body Care</div></a>
    <a href="#" class="cat-card reveal d3" target="_blank"><div class="cat-icon">\ud83d\udc87</div><div class="cat-nm">Hair Products</div></a>
    <a href="#" class="cat-card reveal d1" target="_blank"><div class="cat-icon">\u2728</div><div class="cat-nm">Face &amp; Body</div></a>
    <a href="#" class="cat-card reveal d2" target="_blank"><div class="cat-icon">\ud83d\udc8a</div><div class="cat-nm">Supplements</div></a>
    <a href="#" class="cat-card reveal d3" target="_blank"><div class="cat-icon">\ud83e\uddf4</div><div class="cat-nm">Men Products</div></a>
    <a href="#" class="cat-card reveal d1" target="_blank"><div class="cat-icon">\ud83d\udc69</div><div class="cat-nm">Hair Extensions</div></a>
    <a href="#" class="cat-card reveal d2" target="_blank"><div class="cat-icon">\ud83d\udc84</div><div class="cat-nm">Powders</div></a>
    <a href="#" class="cat-card reveal d3" target="_blank"><div class="cat-icon">\ud83e\udef2</div><div class="cat-nm">Knuckle Products</div></a>
    <a href="#" class="cat-card reveal d1" target="_blank"><div class="cat-icon">\ud83d\udc8b</div><div class="cat-nm">Lips Products</div></a>
    <a href="#" class="cat-card reveal d2" target="_blank"><div class="cat-icon">\ud83c\udf81</div><div class="cat-nm">Combo Sets</div></a>
    <a href="#" class="cat-card reveal d3" target="_blank"><div class="cat-icon">\ud83d\udecd\ufe0f</div><div class="cat-nm">All Products</div></a>
  </div>
</section>

<section class="section section-alt" id="arrivals">
  <div class="sec-head reveal">
    <span class="sec-label">Just Landed</span>
    <h2 class="sec-title">New <em>Arrivals</em></h2>
    <p class="sec-desc">Fresh formulas and proven favourites, delivered straight to your doorstep.</p>
  </div>
  <div class="prod-grid" id="pgrid"></div>
</section>

<section class="section" id="combos">
  <div class="sec-head reveal">
    <span class="sec-label">Bundle &amp; Save</span>
    <h2 class="sec-title">Combo <em>Specials</em></h2>
    <p class="sec-desc">Complete routines curated to work in harmony \u2014 at unbeatable value.</p>
  </div>
  <div class="combo-grid" id="cgrid"></div>
</section>

<section class="why-sec" id="about">
  <div class="sec-head reveal">
    <span class="sec-label" style="color:rgba(255,255,255,0.45)">Why Choose Us</span>
    <h2 class="sec-title" style="color:#fff">Beauty You Can <em style="color:var(--gold)">Trust</em></h2>
    <p class="sec-desc" style="color:rgba(255,255,255,0.5)">We go above and beyond to make sure your beauty journey is safe, authentic and effortless.</p>
  </div>
  <div class="why-grid">
    <div class="why-item reveal d1"><span class="why-icon">\ud83d\ude9a</span><div class="why-title">Fast Delivery</div><p class="why-desc">Get your orders delivered quickly across South Africa. Free delivery on all orders over R500.</p></div>
    <div class="why-item reveal d2"><span class="why-icon">\u2705</span><div class="why-title">100% Authentic</div><p class="why-desc">Every product is sourced directly and verified for authenticity. Absolutely zero counterfeits.</p></div>
    <div class="why-item reveal d3"><span class="why-icon">\ud83d\udcac</span><div class="why-title">WhatsApp Support</div><p class="why-desc">Chat with our beauty experts directly on WhatsApp for fast, personalised assistance.</p></div>
    <div class="why-item reveal d4"><span class="why-icon">\ud83d\udd04</span><div class="why-title">Easy Returns</div><p class="why-desc">Not satisfied? Our hassle-free returns policy ensures you shop with complete confidence.</p></div>
  </div>
</section>

<section class="section">
  <div class="sec-head reveal">
    <span class="sec-label">Happy Clients</span>
    <h2 class="sec-title">What Our <em>Clients Say</em></h2>
  </div>
  <div class="test-grid">
    <div class="test-card reveal d1">
      <div class="stars">\u2605\u2605\u2605\u2605\u2605</div>
      <p class="test-text">"The DR.Rashel snail serum completely transformed my skin. My dark spots have faded significantly after just a few weeks of use!"</p>
      <div class="reviewer"><div class="rev-av">TM</div><div><div class="rev-name">Thandi M.</div><div class="rev-loc">Johannesburg, GP</div></div></div>
    </div>
    <div class="test-card reveal d2">
      <div class="stars">\u2605\u2605\u2605\u2605\u2605</div>
      <p class="test-text">"The combo sets are incredible value. I ordered the Estelin sunscreen combo and my skin has never looked better. Super fast delivery too!"</p>
      <div class="reviewer"><div class="rev-av">PN</div><div><div class="rev-name">Precious N.</div><div class="rev-loc">Pretoria, GP</div></div></div>
    </div>
    <div class="test-card reveal d3">
      <div class="stars">\u2605\u2605\u2605\u2605\u2605</div>
      <p class="test-text">"So glad I found Beauty Store! Their WhatsApp support is incredible \u2014 they helped me build the perfect routine for my sensitive skin type."</p>
      <div class="reviewer"><div class="rev-av">LK</div><div><div class="rev-name">Lerato K.</div><div class="rev-loc">Soweto, GP</div></div></div>
    </div>
  </div>
</section>

<section class="wa-sec" id="contact">
  <div class="reveal">
    <span class="sec-label">Get in Touch</span>
    <h2 class="sec-title">Need <em>Beauty Advice?</em></h2>
    <p class="sec-desc" style="margin:14px auto 0;max-width:480px;font-size:15px;color:var(--muted);line-height:1.72;font-weight:300;">Our beauty experts are ready to help you find the perfect products for your skin. Chat with us directly \u2014 we respond fast.</p>
    <a href="https://wa.me/27722937265" class="wa-btn" target="_blank">\ud83d\udcac Chat on WhatsApp Now</a>
  </div>
</section>

<section class="nl-sec">
  <div class="reveal">
    <span class="sec-label" style="color:var(--gold)">Stay in the Loop</span>
    <h2 class="sec-title">Join the <em>Beauty Family</em></h2>
    <p class="sec-desc">Be first to know about new arrivals, exclusive deals and expert beauty tips delivered to your inbox.</p>
    <div class="nl-form">
      <input type="email" class="nl-input" placeholder="Enter your email address">
      <button class="nl-btn">Subscribe \u2756</button>
    </div>
  </div>
</section>

<footer>
  <div class="foot-grid">
    <div>
      <a href="#" class="logo foot-logo">Beauty <em>Beauty</em></a>
      <p class="foot-desc">Your trusted destination for premium skincare, body care and beauty products across South Africa. 100% authentic, always.</p>
    </div>
    <div class="foot-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="#" target="_blank">Face Products</a></li>
        <li><a href="#" target="_blank">Body Care</a></li>
        <li><a href="#" target="_blank">Hair Products</a></li>
        <li><a href="#" target="_blank">Combo Sets</a></li>
        <li><a href="#" target="_blank">Supplements</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h4>Help</h4>
      <ul>
        <li><a href="#" target="_blank">Terms &amp; Conditions</a></li>
        <li><a href="https://wa.me/27722937265" target="_blank">WhatsApp Support</a></li>
        <li><a href="#" target="_blank">My Account</a></li>
        <li><a href="#">Shipping Policy</a></li>
        <li><a href="#">Returns Policy</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">TikTok</a></li>
        <li><a href="https://wa.me/27722937265" target="_blank">WhatsApp</a></li>
      </ul>
    </div>
  </div>
  <div class="foot-bottom">
    <span>\u00a9 2026 Beauty Store. All rights reserved.</span>
    <span class="foot-gold">You are Beautiful \u2756</span>
  </div>
</footer>
`;

const products = [
  {name:'DR.Rashel Snail & Collagen Firming Serum \u2013 50ml',cat:'Face Products',price:'R120',icon:'\ud83e\uddf4',badge:'New'},
  {name:'DR.Rashel Snail Facial Cleanser',cat:'Face Products',price:'R80',icon:'\u2728',badge:'New'},
  {name:'DR.Rashel Snail & Collagen Firming Cream \u2013 50g',cat:'Face Products',price:'R120',icon:'\ud83c\udf3f',badge:'New'},
  {name:'Estelin SPF50 Ceramide & Centella Sunscreen \u2013 60g',cat:'Face Products',price:'R150',icon:'\u2600\ufe0f',badge:'New'},
  {name:'Love JoJo AHA 3Plus Alpha Arbutin Collagen Serum \u2013 50ml',cat:'Face Products',price:'R60',icon:'\ud83d\udca7',badge:null},
  {name:'Love JoJo AHA 3Plus Alpha Arbutin Collagen Lotion \u2013 500ml',cat:'Body Care',price:'R150',icon:'\ud83c\udf38',badge:null},
  {name:'Love JoJo AHA 3Plus Alpha Arbutin Collagen Cream \u2013 120g',cat:'Face Products',price:'R65',icon:'\ud83e\udeb7',badge:null},
  {name:'Aloe Vera Soothing Gel \u2013 250ml',cat:'Face Products',price:'R60',icon:'\ud83c\udf31',badge:null},
  {name:'Love JoJo AHA 3Plus Collagen Facial Wash \u2013 190ml',cat:'Face Products',price:'R50',icon:'\ud83e\udeb9',badge:null},
  {name:'Love JoJo AHA 3Plus Alpha Arbutin Collagen Soap',cat:'Face Products',price:'R50',icon:'\ud83e\uddbc',badge:null},
  {name:'DR.Meinaier AHA Body Serum Vitamin C & E \u2013 500ml',cat:'Body Care',price:'R200',icon:'\ud83d\udcab',badge:'Popular'},
  {name:'HiQuin Cream \u2013 30g',cat:'Face Products',price:'R350',icon:'\u2b50',badge:'Premium'},
];

const combos = [
  {name:'DR.Rashel Niacinamide Brightening Moisturiser + Soap Combo',desc:'A complete brightening duo for a radiant, even-toned complexion that glows.',price:'R150',icon:'\u2728'},
  {name:'Estelin SPF90 Fade Spots Sunscreen + Niacinamide Soap Combo',desc:'Maximum UV protection paired with a brightening cleansing experience.',price:'R150',icon:'\u2600\ufe0f'},
  {name:'Sadoer Turmeric Antioxygen Repair Lotion & Cleanser Combo',desc:'Turmeric-powered antioxidant routine for skin repair and daily radiance.',price:'R95',icon:'\ud83c\udf3f'},
  {name:'Sadoer Vitamin C Brightening Cream & Cleanser Combo',desc:'A powerful Vitamin C brightening system for luminous, even skin tone.',price:'R95',icon:'\ud83c\udf4b'},
  {name:'Estelin Niacinamide Fade Spots Brightening Cream & Soap Combo',desc:'Targeted dark spot fading combined with a thorough niacinamide cleanse.',price:'R200',icon:'\ud83d\udc8e'},
  {name:'DR.Davey Brightening Body Lotion & Knuckle Serum Combo',desc:'Full-body brightening with a specialised concentrated knuckle treatment.',price:'R230',icon:'\ud83e\udd0d'},
];

const pg = document.getElementById('pgrid');
products.forEach(function(p, i) {
  const d = ['d1','d2','d3','d4'][i % 4];
  pg.innerHTML += '<div class="prod-card reveal ' + d + '">'
    + '<div class="prod-img">'
    + (p.badge ? '<div class="prod-badge">' + p.badge + '</div>' : '')
    + '<div class="prod-fav">\u2661</div>'
    + '<div class="prod-img-inner">' + p.icon + '</div>'
    + '</div>'
    + '<div class="prod-body">'
    + '<div class="prod-cat-tag">' + p.cat + '</div>'
    + '<div class="prod-name">' + p.name + '</div>'
    + '<div class="prod-foot">'
    + '<div class="prod-price">' + p.price + '</div>'
    + '<button class="btn-add">Add to Cart</button>'
    + '</div></div></div>';
});

const cg = document.getElementById('cgrid');
combos.forEach(function(c, i) {
  const d = ['d1','d2','d3'][i % 3];
  cg.innerHTML += '<div class="combo-card reveal ' + d + '">'
    + '<div class="combo-ico">' + c.icon + '</div>'
    + '<div class="combo-name">' + c.name + '</div>'
    + '<p class="combo-desc">' + c.desc + '</p>'
    + '<div class="combo-foot">'
    + '<div><div class="combo-price">' + c.price + '</div><div class="combo-tag">Bundle Deal</div></div>'
    + '<button class="btn-add">Add to Cart</button>'
    + '</div></div>';
});

const obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('prod-fav')) {
    e.target.textContent = e.target.textContent === '\u2661' ? '\u2665' : '\u2661';
    e.target.style.color = e.target.textContent === '\u2665' ? 'var(--rose)' : 'inherit';
  }
});

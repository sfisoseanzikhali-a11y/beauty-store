import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const catEmoji = {
  'face-products':'🌸','body-care':'💆','hair-products':'💇',
  'face-body':'✨','supplements':'💊','men-products':'🧴',
  'hair-extensions':'👩','powders':'💄','knuckle-products':'🤲',
  'lips-products':'💋','combo-sets':'🎁'
}

const categories = [
  {name:'Face Products',slug:'face-products',icon:'🌸'},
  {name:'Body Care',slug:'body-care',icon:'💆'},
  {name:'Hair Products',slug:'hair-products',icon:'💇'},
  {name:'Face & Body',slug:'face-body',icon:'✨'},
  {name:'Supplements',slug:'supplements',icon:'💊'},
  {name:'Men Products',slug:'men-products',icon:'🧴'},
  {name:'Hair Extensions',slug:'hair-extensions',icon:'👩'},
  {name:'Powders',slug:'powders',icon:'💄'},
  {name:'Knuckle Products',slug:'knuckle-products',icon:'🤲'},
  {name:'Lips Products',slug:'lips-products',icon:'💋'},
  {name:'Combo Sets',slug:'combo-sets',icon:'🎁'},
]

const sparkles = [
  {top:'14%',left:'56%',size:'13px',op:.45,delay:'0s'},
  {top:'28%',left:'82%',size:'8px',op:.3,delay:'-2.5s'},
  {top:'62%',left:'50%',size:'18px',op:.18,delay:'-4.5s'},
  {top:'44%',left:'93%',size:'10px',op:.35,delay:'-1.2s'},
  {top:'78%',left:'74%',size:'11px',op:.28,delay:'-3.5s'},
  {top:'8%',left:'72%',size:'7px',op:.4,delay:'-6s'},
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [combos, setCombos] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    fetch('/api/products').then(r=>r.json()).then(data => {
      if(Array.isArray(data)) {
        setProducts(data.filter(p => p.categories?.slug !== 'combo-sets').slice(0,12))
        setCombos(data.filter(p => p.categories?.slug === 'combo-sets').slice(0,6))
      }
    })
    const cart = JSON.parse(localStorage.getItem('neila_cart')||'[]')
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }, [])

  function addToCart(p) {
    const cart = JSON.parse(localStorage.getItem('neila_cart')||'[]')
    const ex = cart.find(i=>i.id===p.id)
    if(ex) ex.qty = Math.min(ex.qty+1,10)
    else cart.push({id:p.id,name:p.name,price:p.price,icon:catEmoji[p.categories?.slug]||'✨',qty:1})
    localStorage.setItem('neila_cart', JSON.stringify(cart))
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }

  return (
    <>
      <Head><title>Neila Beauty Store — You Are Beautiful</title></Head>

      {/* MARQUEE */}
      <div style={{background:'var(--rose)',padding:'10px 0',overflow:'hidden'}}>
        <div className="marquee-track">
          {['Free Delivery on Orders Over R500','100% Authentic Products','WhatsApp Support Available','New Season Arrivals Just Dropped','Combo Sets — Greater Value','Trusted by 3,000+ Clients',
            'Free Delivery on Orders Over R500','100% Authentic Products','WhatsApp Support Available','New Season Arrivals Just Dropped','Combo Sets — Greater Value','Trusted by 3,000+ Clients'
          ].map((t,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',fontSize:'11px',letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.9)',padding:'0 32px'}}>
              {t}<span style={{color:'var(--gold)',marginLeft:'32px'}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(250,248,245,0.95)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)',padding:'0 64px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'74px'}}>
        <Link href="/" style={{fontFamily:'Cormorant Garamond, serif',fontSize:'27px',fontWeight:600,color:'var(--rose)',letterSpacing:'.5px'}}>
          Neila <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em>
        </Link>
        <ul style={{display:'flex',gap:'38px',listStyle:'none'}}>
          {[['Shop','/shop'],['New Arrivals','#arrivals'],['Combos','#combos'],['About','#about'],['Contact','#contact']].map(([label,href])=>(
            <li key={label}><Link href={href} className="nav-link">{label}</Link></li>
          ))}
        </ul>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <Link href="/cart" style={{position:'relative',fontSize:'22px',color:'var(--text)'}}>
            🛒
            {cartCount>0 && <span style={{position:'absolute',top:'-7px',right:'-8px',background:'var(--gold)',color:'var(--dark)',borderRadius:'50%',width:'18px',height:'18px',fontSize:'10px',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center'}}>{cartCount}</span>}
          </Link>
          <a href="https://wa.me/27722937265" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp Us</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'91vh',display:'grid',gridTemplateColumns:'1fr 1fr',alignItems:'center',padding:'80px 64px',position:'relative',overflow:'hidden',background:'var(--ivory)'}}>
        {/* Background gradient */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 80% at 75% 50%,rgba(245,230,238,0.9) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 5% 85%,rgba(201,169,110,0.07) 0%,transparent 55%)',pointerEvents:'none'}}/>

        {/* Floating sparkles */}
        {sparkles.map((s,i)=>(
          <span key={i} className="spk" style={{position:'absolute',top:s.top,left:s.left,fontSize:s.size,opacity:s.op,animationDelay:s.delay,color:'var(--gold)',pointerEvents:'none'}}>✦</span>
        ))}

        {/* Left content */}
        <div style={{position:'relative',zIndex:1}}>
          <div className="hero-pill">✦ New Season Collection</div>
          <h1 className="hero-title">
            Discover Your<br/>
            <em style={{fontStyle:'italic',color:'var(--rose)',display:'block'}}>True Beauty</em>
            <span style={{color:'var(--gold)'}}>Ritual</span>
          </h1>
          <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.78,maxWidth:'440px',marginBottom:'40px',fontWeight:300}}>
            Premium skincare, haircare and body care products curated for every skin type. From brightening serums to nourishing combo sets — your glow starts here.
          </p>
          <div style={{display:'flex',gap:'14px',alignItems:'center'}}>
            <Link href="/shop" className="btn-primary">Shop New Arrivals →</Link>
            <Link href="#combos" className="btn-outline">View Combo Sets</Link>
          </div>
          <div style={{display:'flex',gap:'40px',marginTop:'52px',paddingTop:'32px',borderTop:'1px solid var(--border)'}}>
            {[['500+','Products'],['3K+','Happy Clients'],['100%','Authentic']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'34px',fontWeight:600,color:'var(--rose)',lineHeight:1}}>{n}</div>
                <div style={{fontSize:'11px',color:'var(--muted)',letterSpacing:'1.5px',textTransform:'uppercase',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated orbital circle */}
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',zIndex:1}}>
          <div className="hero-circle">
            {/* Orbit 1 */}
            <div className="orbit o1">
              <div style={{position:'absolute',width:'9px',height:'9px',borderRadius:'50%',background:'var(--gold)',top:'-4.5px',left:'50%',transform:'translateX(-50%)'}}/>
            </div>
            {/* Orbit 2 */}
            <div className="orbit o2">
              <div style={{position:'absolute',width:'9px',height:'9px',borderRadius:'50%',background:'var(--rose-light)',bottom:'-4.5px',left:'50%',transform:'translateX(-50%)'}}/>
            </div>
            {/* Orbit 3 */}
            <div className="orbit o3">
              <div style={{position:'absolute',width:'7px',height:'7px',borderRadius:'50%',background:'var(--rose-pale)',border:'1px solid var(--gold)',top:'-3.5px',left:'50%',transform:'translateX(-50%)'}}/>
            </div>
            {/* Inner */}
            <div className="hero-inner">
              <div className="pulse-icon">✨</div>
              <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'22px',fontWeight:500,color:'var(--rose)',lineHeight:1.3}}>Glow from<br/>Within</div>
              <div style={{fontSize:'11px',color:'var(--muted)',letterSpacing:'2px',textTransform:'uppercase',marginTop:'6px'}}>Neila Beauty Store</div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <div style={{background:'#fff',padding:'50px 64px',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'48px'}}>
          {['DR.Rashel','Estelin','Love JoJo','Veetgold','Sadoer','DR.Davey','Lumine','Golden Glow','DR.Meinaier'].map(b=>(
            <span key={b} style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',color:'var(--muted)',opacity:0.6}}>{b}</span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section style={{padding:'84px 64px'}} id="cats">
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'14px'}}>Explore Our Range</span>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'var(--dark)'}}>Shop by <em style={{fontStyle:'italic',color:'var(--rose)'}}>Category</em></h2>
          <p style={{fontSize:'15px',color:'var(--muted)',maxWidth:'500px',margin:'14px auto 0',lineHeight:1.72,fontWeight:300}}>Everything your beauty routine needs, in one carefully curated place.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'14px'}}>
          {categories.map(cat=>(
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="cat-card">
              <div className="cat-icon">{cat.icon}</div>
              <div style={{fontSize:'13px',color:'var(--text)'}}>{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section style={{padding:'84px 64px',background:'#FBF7F9'}} id="arrivals">
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'14px'}}>Just Landed</span>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'var(--dark)'}}>New <em style={{fontStyle:'italic',color:'var(--rose)'}}>Arrivals</em></h2>
          <p style={{fontSize:'15px',color:'var(--muted)',maxWidth:'500px',margin:'14px auto 0',lineHeight:1.72,fontWeight:300}}>Fresh formulas and proven favourites, delivered straight to your doorstep.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'22px'}}>
          {products.map(p=>(
            <div key={p.id} className="prod-card">
              <Link href={`/product?slug=${p.slug}`}>
                <div className="prod-img">
                  {p.badge && <div className="prod-badge">{p.badge}</div>}
                  <span className="prod-emoji">{catEmoji[p.categories?.slug]||'✨'}</span>
                </div>
              </Link>
              <div style={{padding:'16px 18px 18px'}}>
                <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'5px'}}>{p.categories?.name}</div>
                <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'16px',fontWeight:500,color:'var(--dark)',lineHeight:1.35,marginBottom:'12px'}}>{p.name}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'22px',fontWeight:600,color:'var(--rose)'}}>R{Number(p.price).toFixed(2)}</div>
                  <button onClick={()=>addToCart(p)} className="btn-add">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMBOS */}
      <section style={{padding:'84px 64px'}} id="combos">
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'14px'}}>Bundle & Save</span>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'var(--dark)'}}>Combo <em style={{fontStyle:'italic',color:'var(--rose)'}}>Specials</em></h2>
          <p style={{fontSize:'15px',color:'var(--muted)',maxWidth:'500px',margin:'14px auto 0',lineHeight:1.72,fontWeight:300}}>Complete routines curated to work in harmony — at unbeatable value.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'22px'}}>
          {combos.map(p=>(
            <div key={p.id} className="combo-card">
              <div style={{fontSize:'38px',marginBottom:'16px'}}>{catEmoji[p.categories?.slug]||'🎁'}</div>
              <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'19px',fontWeight:500,color:'var(--dark)',lineHeight:1.3,marginBottom:'10px'}}>{p.name}</div>
              <p style={{fontSize:'13px',color:'var(--muted)',lineHeight:1.65,marginBottom:'22px',fontWeight:300}}>{p.description}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'26px',fontWeight:600,color:'var(--rose)'}}>R{Number(p.price).toFixed(2)}</div>
                  <div style={{fontSize:'10px',color:'var(--gold)',letterSpacing:'1.5px',textTransform:'uppercase'}}>Bundle Deal</div>
                </div>
                <button onClick={()=>addToCart(p)} className="btn-add">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={{background:'var(--rose)',padding:'84px 64px'}} id="about">
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',fontWeight:500,marginBottom:'14px'}}>Why Choose Us</span>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'#fff'}}>Beauty You Can <em style={{fontStyle:'italic',color:'var(--gold)'}}>Trust</em></h2>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,0.5)',maxWidth:'500px',margin:'14px auto 0',lineHeight:1.72,fontWeight:300}}>We go above and beyond to make sure your beauty journey is safe, authentic and effortless.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'48px'}}>
          {[['🚚','Fast Delivery','Get your orders delivered quickly across South Africa. Free delivery on all orders over R500.'],
            ['✅','100% Authentic','Every product is sourced directly and verified. Absolutely zero counterfeits.'],
            ['💬','WhatsApp Support','Chat with our beauty experts directly on WhatsApp for fast, personalised assistance.'],
            ['🔄','Easy Returns','Our hassle-free returns policy ensures you shop with complete confidence.']
          ].map(([icon,title,desc])=>(
            <div key={title} style={{textAlign:'center',color:'#fff'}}>
              <span style={{fontSize:'42px',marginBottom:'18px',display:'block'}}>{icon}</span>
              <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'23px',fontWeight:500,marginBottom:'10px'}}>{title}</div>
              <p style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',lineHeight:1.68,fontWeight:300}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'84px 64px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'14px'}}>Happy Clients</span>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'var(--dark)'}}>What Our <em style={{fontStyle:'italic',color:'var(--rose)'}}>Clients Say</em></h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'22px'}}>
          {[['TM','Thandi M.','Johannesburg, GP','"The DR.Rashel snail serum completely transformed my skin. My dark spots have faded significantly after just a few weeks!"'],
            ['PN','Precious N.','Pretoria, GP','"The combo sets are incredible value. My skin has never looked better. Super fast delivery too!"'],
            ['LK','Lerato K.','Soweto, GP','"Their WhatsApp support is incredible — they helped me build the perfect routine for my sensitive skin."']
          ].map(([av,name,loc,text])=>(
            <div key={name} style={{background:'#fff',borderRadius:'24px',padding:'32px',border:'1px solid var(--border)'}}>
              <div style={{color:'var(--gold)',fontSize:'14px',marginBottom:'16px',letterSpacing:'2px'}}>★★★★★</div>
              <p style={{fontFamily:'Cormorant Garamond, serif',fontSize:'18px',fontStyle:'italic',color:'var(--dark)',lineHeight:1.58,marginBottom:'22px'}}>{text}</p>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'var(--rose-pale)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontSize:'13px',color:'var(--rose)'}}>{av}</div>
                <div>
                  <div style={{fontSize:'14px',fontWeight:500}}>{name}</div>
                  <div style={{fontSize:'12px',color:'var(--muted)'}}>{loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section style={{background:'var(--rose-pale)',padding:'84px 64px',textAlign:'center'}} id="contact">
        <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'14px'}}>Get in Touch</span>
        <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'var(--dark)',marginBottom:'14px'}}>Need <em style={{fontStyle:'italic',color:'var(--rose)'}}>Beauty Advice?</em></h2>
        <p style={{fontSize:'15px',color:'var(--muted)',maxWidth:'480px',margin:'0 auto 32px',lineHeight:1.72,fontWeight:300}}>Our beauty experts are ready to help you find the perfect products. Chat with us directly — we respond fast.</p>
        <a href="https://wa.me/27722937265" target="_blank" rel="noreferrer" style={{background:'#25D366',color:'#fff',padding:'18px 42px',borderRadius:'50px',fontSize:'16px',fontWeight:500,display:'inline-flex',alignItems:'center',gap:'12px',transition:'all .3s'}}>💬 Chat on WhatsApp Now</a>
      </section>

      {/* NEWSLETTER */}
      <section style={{background:'var(--dark)',padding:'84px 64px',textAlign:'center'}}>
        <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'14px'}}>Stay in the Loop</span>
        <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,3.8vw,54px)',fontWeight:400,color:'#fff',marginBottom:'14px'}}>Join the <em style={{fontStyle:'italic',color:'var(--rose)'}}>Neila Family</em></h2>
        <p style={{fontSize:'15px',color:'rgba(255,255,255,0.45)',maxWidth:'500px',margin:'0 auto 0',lineHeight:1.72,fontWeight:300}}>Be first to know about new arrivals, exclusive deals and expert beauty tips.</p>
        <div style={{display:'flex',gap:'12px',maxWidth:'480px',margin:'32px auto 0'}}>
          <input type="email" placeholder="Enter your email address" style={{flex:1,padding:'16px 22px',borderRadius:'50px',border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.07)',color:'#fff',fontFamily:'DM Sans, sans-serif',fontSize:'14px',outline:'none'}}/>
          <button style={{background:'var(--gold)',color:'var(--dark)',border:'none',padding:'16px 28px',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'14px',fontWeight:500,cursor:'pointer',whiteSpace:'nowrap'}}>Subscribe ✦</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#0F0408',color:'rgba(255,255,255,0.6)',padding:'64px 64px 30px'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'44px',marginBottom:'52px'}}>
          <div>
            <Link href="/" style={{fontFamily:'Cormorant Garamond, serif',fontSize:'24px',fontWeight:600,color:'var(--rose)',display:'block',marginBottom:'12px'}}>
              Neila <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em>
            </Link>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.38)',lineHeight:1.72,fontWeight:300,maxWidth:'270px'}}>Your trusted destination for premium skincare and beauty products across South Africa. 100% authentic, always.</p>
          </div>
          {[
            ['Shop',[['All Products','/shop'],['Face Products','/shop?category=face-products'],['Body Care','/shop?category=body-care'],['Combo Sets','/shop?category=combo-sets'],['Supplements','/shop?category=supplements']]],
            ['Help',[['WhatsApp Support','https://wa.me/27722937265'],['Shipping Policy','#'],['Returns Policy','#'],['Terms & Conditions','#'],['My Account','/admin/login']]],
            ['Connect',[['Instagram','#'],['Facebook','#'],['TikTok','#'],['WhatsApp','https://wa.me/27722937265']]]
          ].map(([title,links])=>(
            <div key={title}>
              <h4 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'19px',fontWeight:500,color:'#fff',marginBottom:'20px'}}>{title}</h4>
              <ul style={{listStyle:'none'}}>
                {links.map(([label,href])=>(
                  <li key={label} style={{marginBottom:'10px'}}>
                    <Link href={href} style={{color:'rgba(255,255,255,0.45)',fontSize:'13px',fontWeight:300,transition:'color .2s'}}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'24px',display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.25)'}}>
          <span>© 2026 Neila Beauty Store. All rights reserved.</span>
          <span style={{color:'var(--gold)'}}>You are Beautiful ✦</span>
        </div>
      </footer>

      <style jsx global>{`
        /* MARQUEE */
        .marquee-track {
          display: flex;
          animation: scroll-left 28s linear infinite;
          white-space: nowrap;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ORBITS */
        .hero-circle {
          width: min(460px, 43vw);
          height: min(460px, 43vw);
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, rgba(245,230,238,0.95), rgba(250,248,245,0.5));
          border: 1px solid rgba(139,26,74,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(201,169,110,0.25);
        }
        .o1 { width: 108%; height: 108%; animation: spin 22s linear infinite; }
        .o2 { width: 122%; height: 122%; animation: spin 34s linear infinite reverse; }
        .o3 { width: 136%; height: 136%; animation: spin 46s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* SPARKLES */
        .spk { animation: sparkle-float 7s ease-in-out infinite; }
        @keyframes sparkle-float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33%      { transform: translateY(-14px) rotate(120deg); }
          66%      { transform: translateY(7px) rotate(240deg); }
        }

        /* INNER CIRCLE */
        .hero-inner {
          width: 73%; height: 73%;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(201,169,110,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; text-align: center; padding: 24px;
          box-shadow: 0 20px 60px rgba(139,26,74,0.05);
          position: relative; z-index: 1;
        }
        .pulse-icon {
          font-size: 60px;
          margin-bottom: 14px;
          animation: pulse-scale 4s ease-in-out infinite;
        }
        @keyframes pulse-scale {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }

        /* HERO TEXT ANIMATIONS */
        .hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--rose-pale); color: var(--rose);
          padding: 8px 18px; border-radius: 50px;
          font-size: 11px; letter-spacing: 2.5px;
          text-transform: uppercase; font-weight: 500;
          margin-bottom: 28px;
          animation: fade-up 0.8s ease both;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 5.5vw, 88px);
          font-weight: 400; line-height: 1.03;
          color: var(--dark); margin-bottom: 22px;
          animation: fade-up 0.8s 0.15s ease both;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* NAV LINK */
        .nav-link {
          color: var(--text);
          font-size: 12px; letter-spacing: 2px;
          text-transform: uppercase; font-weight: 400;
          position: relative; transition: color .25s;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -3px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width .3s ease;
        }
        .nav-link:hover { color: var(--rose); }
        .nav-link:hover::after { width: 100%; }

        /* WHATSAPP BUTTON */
        .btn-wa {
          background: var(--rose); color: #fff;
          padding: 10px 22px; border-radius: 50px;
          font-size: 12px; font-weight: 500;
          letter-spacing: .8px; text-transform: uppercase;
          transition: all .3s; display: inline-flex;
          align-items: center; gap: 8px;
        }
        .btn-wa:hover {
          background: var(--rose-hover);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(139,26,74,0.25);
        }

        /* BUTTONS */
        .btn-primary {
          background: var(--rose); color: #fff;
          padding: 15px 34px; border-radius: 50px;
          font-size: 14px; font-weight: 500;
          transition: all .3s; display: inline-flex;
          align-items: center; gap: 8px;
        }
        .btn-primary:hover {
          background: var(--rose-hover);
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(139,26,74,0.3);
        }
        .btn-outline {
          color: var(--rose); padding: 14px 34px;
          border-radius: 50px; font-size: 14px; font-weight: 400;
          border: 1.5px solid rgba(139,26,74,0.4);
          transition: all .3s; display: inline-flex;
          align-items: center; gap: 8px;
        }
        .btn-outline:hover {
          background: var(--rose-pale);
          border-color: var(--rose);
          transform: translateY(-2px);
        }
        .btn-add {
          background: var(--rose-pale); color: var(--rose);
          border: none; padding: 8px 16px; border-radius: 50px;
          font-size: 12px; font-weight: 500; cursor: pointer;
          transition: all .22s; font-family: 'DM Sans', sans-serif;
        }
        .btn-add:hover { background: var(--rose); color: #fff; }

        /* PRODUCT CARDS */
        .prod-card {
          background: #fff; border-radius: 22px;
          overflow: hidden; border: 1px solid var(--border);
          transition: all .4s cubic-bezier(.25,.46,.45,.94);
        }
        .prod-card:hover {
          box-shadow: 0 22px 50px rgba(139,26,74,0.12);
          transform: translateY(-8px);
        }
        .prod-img {
          width: 100%; aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, var(--rose-pale), rgba(255,255,255,0.8));
          font-size: 56px; position: relative; overflow: hidden;
        }
        .prod-emoji { transition: transform .4s; display: block; }
        .prod-card:hover .prod-emoji { transform: scale(1.08); }
        .prod-badge {
          position: absolute; top: 12px; left: 12px;
          background: var(--rose); color: #fff;
          font-size: 10px; letter-spacing: 1px;
          text-transform: uppercase; padding: 4px 10px;
          border-radius: 50px; font-weight: 500;
        }

        /* COMBO CARDS */
        .combo-card {
          background: #fff; border-radius: 24px;
          padding: 28px; border: 1px solid var(--border);
          transition: all .4s; position: relative; overflow: hidden;
        }
        .combo-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--rose), var(--gold));
          opacity: 0; transition: opacity .3s;
        }
        .combo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(139,26,74,0.1);
        }
        .combo-card:hover::before { opacity: 1; }

        /* CATEGORY CARDS */
        .cat-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 20px; padding: 26px 14px;
          text-align: center; cursor: pointer;
          transition: all .35s cubic-bezier(.25,.46,.45,.94);
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
        }
        .cat-card:hover {
          border-color: var(--rose-light);
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(139,26,74,0.1);
          background: var(--rose-pale);
        }
        .cat-icon {
          width: 50px; height: 50px; border-radius: 14px;
          background: var(--rose-pale);
          display: flex; align-items: center;
          justify-content: center; font-size: 22px;
          transition: all .3s;
        }
        .cat-card:hover .cat-icon {
          background: var(--rose);
          transform: scale(1.08);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          nav { padding: 0 22px; }
          nav ul { display: none; }
          section, footer { padding-left: 22px !important; padding-right: 22px !important; }
        }
      `}</style>
    </>
  )
}
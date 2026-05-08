import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const catEmoji = {'face-products':'🌸','body-care':'💆','hair-products':'💇','face-body':'✨','supplements':'💊','men-products':'🧴','hair-extensions':'👩','powders':'💄','knuckle-products':'🤲','lips-products':'💋','combo-sets':'🎁'}

export default function Product() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('desc')
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if(!slug) return
    fetch(`/api/products/${slug}`).then(r=>r.json()).then(data => {
      if(data.id) {
        setProduct(data)
        document.title = `${data.name} — Beauty Store`
        fetch(`/api/products?category=${data.categories?.slug||''}`).then(r=>r.json()).then(all => {
          setRelated((Array.isArray(all)?all:[]).filter(p=>p.id!==data.id).slice(0,4))
        })
      }
    })
    const cart = JSON.parse(localStorage.getItem('beauty_cart')||'[]')
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }, [slug])

  function addToCart(p, q=1) {
    const cart = JSON.parse(localStorage.getItem('beauty_cart')||'[]')
    const ex = cart.find(i=>i.id===p.id)
    if(ex) ex.qty = Math.min(ex.qty+q,10)
    else cart.push({id:p.id,name:p.name,price:p.price,icon:catEmoji[p.categories?.slug]||'✨',qty:q})
    localStorage.setItem('beauty_cart', JSON.stringify(cart))
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }

  function handleAddToCart() {
    addToCart(product, qty)
    setAdded(true)
    setToast(true)
    setTimeout(()=>{setAdded(false)},2000)
    setTimeout(()=>{setToast(false)},3000)
  }

  if(!product) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond, serif',fontSize:'22px',color:'var(--muted)'}}>
      Loading product...
    </div>
  )

  const icon = catEmoji[product.categories?.slug]||'✨'

  return (
    <>
      <Head><title>{product.name} — Beauty Store</title></Head>

      {/* MARQUEE */}
      <div style={{background:'var(--rose)',padding:'10px 0',overflow:'hidden'}}>
        <div className="marquee-track">
          {['Free Delivery on Orders Over R500','100% Authentic Products','WhatsApp Support Available','New Season Arrivals Just Dropped','Free Delivery on Orders Over R500','100% Authentic Products','WhatsApp Support Available','New Season Arrivals Just Dropped'].map((t,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',fontSize:'11px',letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.9)',padding:'0 32px'}}>{t}<span style={{color:'var(--gold)',marginLeft:'32px'}}>✦</span></span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(250,248,245,0.95)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)',padding:'0 64px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'74px'}}>
        <Link href="/" style={{fontFamily:'Cormorant Garamond, serif',fontSize:'27px',fontWeight:600,color:'var(--rose)'}}>Beauty <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em></Link>
        <ul style={{display:'flex',gap:'38px',listStyle:'none'}}>
          {[['Home','/'],['Shop','/shop'],['Combos','/#combos'],['Contact','/#contact']].map(([l,h])=>(<li key={l}><Link href={h} className="nav-link">{l}</Link></li>))}
        </ul>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <Link href="/cart" style={{position:'relative',fontSize:'22px',color:'var(--text)'}}>
            🛒{cartCount>0&&<span style={{position:'absolute',top:'-7px',right:'-8px',background:'var(--gold)',color:'var(--dark)',borderRadius:'50%',width:'18px',height:'18px',fontSize:'10px',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center'}}>{cartCount}</span>}
          </Link>
          <a href="https://wa.me/27722937265" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp Us</a>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div style={{padding:'18px 64px',display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'var(--muted)'}}>
        <Link href="/" style={{color:'var(--rose)'}}>Home</Link><span>›</span>
        <Link href="/shop" style={{color:'var(--rose)'}}>Shop</Link><span>›</span>
        <span>{product.name}</span>
      </div>

      {/* PRODUCT */}
      <section style={{padding:'10px 64px 80px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>

        {/* IMAGE */}
        <div style={{position:'sticky',top:'96px'}}>
          <div style={{width:'100%',aspectRatio:'1',borderRadius:'28px',background:'linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9))',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'120px',position:'relative',overflow:'hidden'}}>
            {product.badge&&<div style={{position:'absolute',top:'20px',left:'20px',background:product.badge==='Popular'?'var(--gold)':product.badge==='Premium'?'var(--dark)':'var(--rose)',color:'#fff',fontSize:'11px',letterSpacing:'1px',textTransform:'uppercase',padding:'6px 14px',borderRadius:'50px',fontWeight:500}}>{product.badge}</div>}
            <span style={{display:'block',transition:'transform .5s'}} className="product-emoji">{icon}</span>
          </div>
        </div>

        {/* INFO */}
        <div>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'12px'}}>{product.categories?.name||'Beauty'}</span>
          <h1 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(28px,3vw,42px)',fontWeight:400,color:'var(--dark)',lineHeight:1.15,marginBottom:'16px'}}>{product.name}</h1>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
            <span style={{color:'var(--gold)',fontSize:'14px',letterSpacing:'1px'}}>★★★★★</span>
            <span style={{fontSize:'13px',color:'var(--muted)'}}>4.9 · 127 reviews</span>
          </div>
          <div style={{display:'flex',alignItems:'baseline',gap:'12px',marginBottom:'24px'}}>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'44px',fontWeight:600,color:'var(--rose)'}}>R{Number(product.price).toFixed(2)}</div>
            {product.price>=500&&<span style={{background:'rgba(74,124,89,0.1)',color:'#4A7C59',fontSize:'12px',padding:'4px 12px',borderRadius:'50px',fontWeight:500,border:'1px solid rgba(74,124,89,0.2)'}}>✓ Free Delivery</span>}
          </div>
          <p style={{fontSize:'15px',color:'var(--muted)',lineHeight:1.78,marginBottom:'28px',fontWeight:300,paddingBottom:'24px',borderBottom:'1px solid var(--border)'}}>{product.description||'Premium beauty product carefully formulated for your skin.'}</p>

          {/* Trust badges */}
          <div style={{display:'flex',gap:'16px',flexWrap:'wrap',marginBottom:'28px'}}>
            {[['✅','100% Authentic'],['🚚','Fast Delivery'],['🔄','Easy Returns'],['💬','WhatsApp Support']].map(([icon,label])=>(
              <div key={label} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'var(--muted)',fontWeight:300}}>
                <span style={{fontSize:'16px'}}>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>

          {/* QTY + ADD */}
          <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'20px'}}>
            <div style={{display:'flex',alignItems:'center',border:'1px solid var(--border)',borderRadius:'50px',overflow:'hidden',background:'#fff'}}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{width:'40px',height:'48px',border:'none',background:'none',fontSize:'20px',cursor:'pointer',color:'var(--text)',display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
              <span style={{minWidth:'36px',textAlign:'center',fontSize:'15px',fontWeight:500}}>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(10,q+1))} style={{width:'40px',height:'48px',border:'none',background:'none',fontSize:'20px',cursor:'pointer',color:'var(--text)',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
            </div>
            <button onClick={handleAddToCart} style={{flex:1,background:added?'#4A7C59':'var(--rose)',color:'#fff',border:'none',padding:'15px 28px',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'15px',fontWeight:500,cursor:'pointer',transition:'all .3s',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
              {added?'✓ Added to Cart!':'🛒 Add to Cart'}
            </button>
            <button onClick={()=>setLiked(l=>!l)} style={{width:'50px',height:'50px',borderRadius:'50%',border:'1.5px solid var(--border)',background:liked?'var(--rose)':'#fff',fontSize:'20px',cursor:'pointer',transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center',color:liked?'#fff':'var(--rose)',flexShrink:0}}>
              {liked?'♥':'♡'}
            </button>
          </div>

          {/* TABS */}
          <div style={{marginTop:'28px'}}>
            <div style={{display:'flex',borderBottom:'1px solid var(--border)',marginBottom:'18px'}}>
              {[['desc','Description'],['how','How to Use'],['ing','Ingredients']].map(([id,label])=>(
                <button key={id} onClick={()=>setActiveTab(id)} style={{background:'none',border:'none',padding:'12px 20px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',fontWeight:activeTab===id?500:400,color:activeTab===id?'var(--rose)':'var(--muted)',cursor:'pointer',position:'relative',borderBottom:activeTab===id?'2px solid var(--rose)':'2px solid transparent',marginBottom:'-1px',letterSpacing:'.5px'}}>
                  {label}
                </button>
              ))}
            </div>
            {activeTab==='desc'&&<p style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.78,fontWeight:300}}>{product.description||'Premium beauty product carefully formulated for your skin.'}</p>}
            {activeTab==='how'&&(
              <ol style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'12px'}}>
                {['Cleanse your skin thoroughly with warm water.','Apply a small amount to face and/or body as needed.','Gently massage in circular motions until fully absorbed.','Use morning and evening for best results. Follow with SPF in the morning.'].map((step,i)=>(
                  <li key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',fontSize:'14px',color:'var(--muted)',fontWeight:300}}>
                    <span style={{width:'26px',height:'26px',borderRadius:'50%',background:'var(--rose)',color:'#fff',fontSize:'11px',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px'}}>{i+1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
            {activeTab==='ing'&&(
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {['Snail Secretion Filtrate','Collagen','Hyaluronic Acid','Niacinamide','Alpha Arbutin','Vitamin C','Vitamin E'].map(ing=>(
                  <span key={ing} style={{background:'var(--rose-pale)',color:'var(--rose)',padding:'5px 12px',borderRadius:'50px',fontSize:'12px',fontWeight:500}}>{ing}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length>0&&(
        <section style={{padding:'60px 64px 80px',background:'#FBF7F9'}}>
          <div style={{textAlign:'center',marginBottom:'44px'}}>
            <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'12px'}}>You May Also Like</span>
            <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(30px,3vw,44px)',fontWeight:400,color:'var(--dark)'}}>Related <em style={{fontStyle:'italic',color:'var(--rose)'}}>Products</em></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'20px'}}>
            {related.map(r=>(
              <Link key={r.id} href={`/product?slug=${r.slug}`} style={{background:'#fff',borderRadius:'22px',overflow:'hidden',border:'1px solid var(--border)',transition:'all .4s',display:'block',textDecoration:'none',color:'inherit'}}>
                <div style={{width:'100%',aspectRatio:'1',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9))',fontSize:'52px'}}>{catEmoji[r.categories?.slug]||'✨'}</div>
                <div style={{padding:'14px 16px 16px'}}>
                  <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'4px'}}>{r.categories?.name}</div>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'15px',fontWeight:500,color:'var(--dark)',lineHeight:1.3,marginBottom:'10px',minHeight:'40px'}}>{r.name}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'18px',fontWeight:600,color:'var(--rose)'}}>R{Number(r.price).toFixed(2)}</div>
                    <button onClick={e=>{e.preventDefault();addToCart(r)}} className="btn-add">Add</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer style={{background:'#0F0408',padding:'24px 64px'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.25)'}}>
          <span>© 2026 Beauty Store. All rights reserved.</span>
          <span style={{color:'var(--gold)'}}>You are Beautiful ✦</span>
        </div>
      </footer>

      {/* TOAST */}
      <div style={{position:'fixed',bottom:'28px',right:'28px',background:'var(--dark)',color:'#fff',padding:'14px 22px',borderRadius:'14px',fontSize:'14px',zIndex:9999,transform:toast?'translateY(0)':'translateY(80px)',opacity:toast?1:0,transition:'all .35s cubic-bezier(.25,.46,.45,.94)',display:'flex',alignItems:'center',gap:'10px',maxWidth:'320px'}}>
        🛒 <span>{product.name.substring(0,30)} added to cart</span>
      </div>

      <style jsx global>{`
        .marquee-track{display:flex;animation:scroll-left 28s linear infinite;white-space:nowrap;}
        @keyframes scroll-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .nav-link{color:var(--text);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:400;position:relative;transition:color .25s;text-decoration:none;}
        .nav-link:hover{color:var(--rose);}
        .btn-wa{background:var(--rose);color:#fff;padding:10px 22px;border-radius:50px;font-size:12px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:all .3s;}
        .btn-wa:hover{background:var(--rose-hover);transform:translateY(-1px);}
        .btn-add{background:var(--rose-pale);color:var(--rose);border:none;padding:7px 14px;border-radius:50px;font-size:12px;font-weight:500;cursor:pointer;transition:all .22s;font-family:'DM Sans',sans-serif;}
        .btn-add:hover{background:var(--rose);color:#fff;}
        .product-emoji:hover{transform:scale(1.06);}
        @media(max-width:900px){nav{padding:0 20px;}nav ul{display:none;}section{grid-template-columns:1fr!important;padding:10px 20px 60px!important;}}
      `}</style>
    </>
  )
}

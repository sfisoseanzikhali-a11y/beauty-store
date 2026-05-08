import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('beauty_cart')||'[]'))
  }, [])

  function save(newCart) {
    localStorage.setItem('beauty_cart', JSON.stringify(newCart))
    setCart([...newCart])
  }

  function changeQty(id, qty) {
    if(qty < 1) { save(cart.filter(i=>i.id!==id)); return }
    const c = cart.map(i=>i.id===id?{...i,qty:Math.min(qty,10)}:i)
    save(c)
  }

  function remove(id) { save(cart.filter(i=>i.id!==id)) }

  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0)
  const delivery = subtotal>=500?0:80
  const total = subtotal+delivery

  return (
    <>
      <Head><title>Cart — Beauty Store</title></Head>

      <div style={{background:'var(--rose)',padding:'10px 0',overflow:'hidden'}}>
        <div className="marquee-track">
          {['Free Delivery on Orders Over R500','100% Authentic Products','WhatsApp Support Available','Fast Delivery Nationwide','Free Delivery on Orders Over R500','100% Authentic Products','WhatsApp Support Available','Fast Delivery Nationwide'].map((t,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',fontSize:'11px',letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.9)',padding:'0 32px'}}>{t}<span style={{color:'var(--gold)',marginLeft:'32px'}}>✦</span></span>
          ))}
        </div>
      </div>

      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(250,248,245,0.95)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)',padding:'0 64px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'74px'}}>
        <Link href="/" style={{fontFamily:'Cormorant Garamond, serif',fontSize:'27px',fontWeight:600,color:'var(--rose)'}}>Beauty <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em></Link>
        <ul style={{display:'flex',gap:'38px',listStyle:'none'}}>
          {[['Home','/'],['Shop','/shop']].map(([l,h])=>(<li key={l}><Link href={h} className="nav-link">{l}</Link></li>))}
        </ul>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <Link href="/cart" style={{position:'relative',fontSize:'22px',color:'var(--text)'}}>
            🛒{cart.length>0&&<span style={{position:'absolute',top:'-7px',right:'-8px',background:'var(--gold)',color:'var(--dark)',borderRadius:'50%',width:'18px',height:'18px',fontSize:'10px',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center'}}>{cart.reduce((s,i)=>s+i.qty,0)}</span>}
          </Link>
          <a href="https://wa.me/27722937265" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp</a>
        </div>
      </nav>

      <div style={{background:'linear-gradient(135deg,var(--rose-pale),rgba(250,248,245,0.3))',padding:'40px 64px 30px'}}>
        <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'10px'}}>Your Selection</span>
        <h1 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(34px,4vw,52px)',fontWeight:400,color:'var(--dark)'}}>Shopping <em style={{fontStyle:'italic',color:'var(--rose)'}}>Cart</em></h1>
        <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'var(--muted)',marginTop:'14px'}}>
          <Link href="/" style={{color:'var(--rose)'}}>Home</Link><span>›</span>
          <Link href="/shop" style={{color:'var(--rose)'}}>Shop</Link><span>›</span><span>Cart</span>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:'32px',padding:'40px 64px 80px',alignItems:'start'}}>

        {/* ITEMS */}
        <div>
          {cart.length===0 ? (
            <div style={{textAlign:'center',padding:'80px 20px',background:'#fff',borderRadius:'24px',border:'1px solid var(--border)'}}>
              <div style={{fontSize:'64px',marginBottom:'20px'}}>🛒</div>
              <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'28px',color:'var(--dark)',marginBottom:'10px'}}>Your cart is empty</div>
              <p style={{fontSize:'15px',color:'var(--muted)',marginBottom:'28px',fontWeight:300}}>Discover our beautiful range of skincare and beauty products.</p>
              <Link href="/shop" style={{background:'var(--rose)',color:'#fff',padding:'14px 32px',borderRadius:'50px',fontSize:'14px',fontWeight:500,display:'inline-flex',alignItems:'center',gap:'8px'}}>Browse Products →</Link>
            </div>
          ) : cart.map(item=>(
            <div key={item.id} style={{background:'#fff',borderRadius:'20px',border:'1px solid var(--border)',padding:'20px',display:'flex',gap:'18px',alignItems:'center',marginBottom:'14px',transition:'box-shadow .2s'}}>
              <div style={{width:'80px',height:'80px',borderRadius:'16px',background:'linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'38px',flexShrink:0}}>{item.icon||'✨'}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'4px'}}>Beauty Product</div>
                <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'17px',fontWeight:500,color:'var(--dark)',lineHeight:1.3,marginBottom:'8px'}}>{item.name}</div>
                <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:600,color:'var(--rose)'}}>R{(item.price*item.qty).toFixed(2)}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{display:'flex',alignItems:'center',border:'1px solid var(--border)',borderRadius:'50px',overflow:'hidden',background:'var(--ivory)'}}>
                  <button onClick={()=>changeQty(item.id,item.qty-1)} style={{width:'34px',height:'36px',border:'none',background:'none',fontSize:'18px',cursor:'pointer',color:'var(--text)'}}>−</button>
                  <span style={{minWidth:'28px',textAlign:'center',fontSize:'14px',fontWeight:500}}>{item.qty}</span>
                  <button onClick={()=>changeQty(item.id,item.qty+1)} style={{width:'34px',height:'36px',border:'none',background:'none',fontSize:'18px',cursor:'pointer',color:'var(--text)'}}>+</button>
                </div>
                <button onClick={()=>remove(item.id)} style={{background:'none',border:'none',color:'var(--muted)',fontSize:'18px',cursor:'pointer',padding:'4px',transition:'color .2s'}}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        {cart.length>0&&(
          <aside style={{background:'#fff',borderRadius:'24px',border:'1px solid var(--border)',padding:'28px',position:'sticky',top:'96px'}}>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'24px',fontWeight:500,color:'var(--dark)',marginBottom:'20px',paddingBottom:'14px',borderBottom:'1px solid var(--border)'}}>Order Summary</div>
            <div style={{background:delivery===0?'rgba(74,124,89,0.08)':'var(--rose-pale)',border:`1px solid ${delivery===0?'rgba(74,124,89,0.2)':'var(--border)'}`,borderRadius:'12px',padding:'12px 16px',marginBottom:'18px',fontSize:'13px',color:delivery===0?'#4A7C59':'var(--rose)',textAlign:'center',lineHeight:1.5}}>
              {delivery===0?'🎉 You qualify for FREE delivery!':`Add R${(500-subtotal).toFixed(2)} more for FREE delivery`}
            </div>
            {[['Subtotal',`R${subtotal.toFixed(2)}`],['Delivery',delivery===0?'FREE':'R80.00']].map(([l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:'14px',marginBottom:'12px'}}>
                <span style={{color:'var(--muted)'}}>{l}</span><span style={{fontWeight:500}}>{v}</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--border)',paddingTop:'14px',marginTop:'6px',marginBottom:'24px'}}>
              <span style={{fontFamily:'Cormorant Garamond, serif',fontSize:'18px',fontWeight:500,color:'var(--dark)'}}>Total</span>
              <span style={{fontFamily:'Cormorant Garamond, serif',fontSize:'24px',fontWeight:600,color:'var(--rose)'}}>R{total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" style={{width:'100%',background:'var(--rose)',color:'#fff',padding:'16px',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'15px',fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',transition:'all .3s',textDecoration:'none'}}>
              Proceed to Checkout →
            </Link>
            <Link href="/shop" style={{width:'100%',background:'none',color:'var(--rose)',border:'1.5px solid rgba(139,26,74,0.3)',padding:'13px',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'14px',cursor:'pointer',marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s',textDecoration:'none'}}>
              ← Continue Shopping
            </Link>
            <div style={{display:'flex',justifyContent:'center',gap:'16px',marginTop:'18px',flexWrap:'wrap'}}>
              {['🔒 Secure Checkout','✅ 100% Authentic'].map(t=><span key={t} style={{fontSize:'12px',color:'var(--muted)'}}>{t}</span>)}
            </div>
          </aside>
        )}
      </div>

      <footer style={{background:'#0F0408',padding:'24px 64px'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.25)'}}>
          <span>© 2026 Beauty Store. All rights reserved.</span>
          <span style={{color:'var(--gold)'}}>You are Beautiful ✦</span>
        </div>
      </footer>

      <style jsx global>{`
        .marquee-track{display:flex;animation:scroll-left 28s linear infinite;white-space:nowrap;}
        @keyframes scroll-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .nav-link{color:var(--text);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:400;transition:color .25s;text-decoration:none;}
        .nav-link:hover{color:var(--rose);}
        .btn-wa{background:var(--rose);color:#fff;padding:10px 22px;border-radius:50px;font-size:12px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:all .3s;}
        .btn-wa:hover{background:var(--rose-hover);transform:translateY(-1px);}
        @media(max-width:900px){nav{padding:0 20px;}nav ul{display:none;}.cart-layout{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  )
}

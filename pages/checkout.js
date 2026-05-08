import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Checkout() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [form, setForm] = useState({name:'',email:'',phone:'',city:'',address:'',notes:''})
  const [payment, setPayment] = useState('payfast')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('beauty_cart')||'[]')
    if(!c.length) router.push('/cart')
    setCart(c)
  }, [])

  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0)
  const delivery = subtotal>=500?0:80
  const total = subtotal+delivery

  async function submitOrder() {
    if(!form.name||!form.email) { setError('Please enter your name and email address.'); return }
    if(!/\S+@\S+\.\S+/.test(form.email)) { setError('Please enter a valid email address.'); return }
    setError('')

    if(payment==='whatsapp') {
      const items = cart.map(i=>`${i.name} x${i.qty} = R${(i.price*i.qty).toFixed(2)}`).join('%0A')
      const msg = `Hello Beauty Store! I'd like to place an order:%0A%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AAddress: ${form.address}%0A%0AItems:%0A${items}%0A%0ATotal: R${total.toFixed(2)}`
      window.open(`https://wa.me/27722937265?text=${msg}`, '_blank')
      localStorage.removeItem('beauty_cart')
      router.push('/order-success?method=whatsapp')
      return
    }

    setLoading(true)
    try {
      const orderRes = await fetch('/api/orders', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          customer_name: form.name, customer_email: form.email,
          customer_phone: form.phone, address: `${form.address} ${form.city}`,
          items: cart.map(i=>({id:i.id,name:i.name,price:i.price,qty:i.qty}))
        })
      })
      const order = await orderRes.json()
      if(!orderRes.ok) throw new Error(order.error||'Failed to create order')

      const pfRes = await fetch(`/api/payments/initiate/${order.orderId}`)
      const pf = await pfRes.json()
      if(!pfRes.ok) throw new Error(pf.error||'Payment initiation failed')

      localStorage.removeItem('beauty_cart')
      const form2 = document.createElement('form')
      form2.method='POST'; form2.action=pf.url
      Object.entries(pf.fields).forEach(([k,v])=>{
        const inp=document.createElement('input'); inp.type='hidden'; inp.name=k; inp.value=v
        form2.appendChild(inp)
      })
      document.body.appendChild(form2)
      form2.submit()
    } catch(e) {
      setLoading(false)
      setError('Something went wrong: '+e.message+'. Please try again or contact us on WhatsApp.')
    }
  }

  return (
    <>
      <Head><title>Checkout — Beauty Store</title></Head>

      <div style={{background:'var(--rose)',padding:'10px 0',overflow:'hidden'}}>
        <div className="marquee-track">
          {['Free Delivery on Orders Over R500','100% Authentic Products','Secure Checkout','Fast Delivery Nationwide','Free Delivery on Orders Over R500','100% Authentic Products','Secure Checkout','Fast Delivery Nationwide'].map((t,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',fontSize:'11px',letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.9)',padding:'0 32px'}}>{t}<span style={{color:'var(--gold)',marginLeft:'32px'}}>✦</span></span>
          ))}
        </div>
      </div>

      <nav style={{background:'rgba(250,248,245,0.95)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)',padding:'0 64px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'74px'}}>
        <Link href="/" style={{fontFamily:'Cormorant Garamond, serif',fontSize:'27px',fontWeight:600,color:'var(--rose)'}}>Beauty <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em></Link>
        <div style={{fontSize:'13px',color:'var(--muted)',display:'flex',alignItems:'center',gap:'6px'}}>🔒 Secure Checkout</div>
      </nav>

      {/* STEPS */}
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'0',padding:'20px 64px',background:'#fff',borderBottom:'1px solid var(--border)'}}>
        {[['✓','Cart',true,true],['2','Details',true,false],['3','Payment',false,false],['4','Confirmation',false,false]].map(([num,label,done,past],i)=>(
          <div key={label} style={{display:'flex',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'13px',color:done&&!past?'var(--rose)':past?'var(--gold)':'var(--muted)',fontWeight:done&&!past?500:400}}>
              <div style={{width:'28px',height:'28px',borderRadius:'50%',border:`2px solid ${done&&!past?'var(--rose)':past?'var(--gold)':'var(--border)'}`,background:done&&!past?'var(--rose)':past?'var(--gold)':'transparent',color:done||past?'#fff':'var(--muted)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:600}}>{num}</div>
              {label}
            </div>
            {i<3&&<div style={{width:'60px',height:'1px',background:'var(--border)',margin:'0 8px'}}/>}
          </div>
        ))}
      </div>

      <div style={{background:'linear-gradient(135deg,var(--rose-pale),rgba(250,248,245,0.3))',padding:'36px 64px 28px'}}>
        <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'10px'}}>Final Step</span>
        <h1 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(30px,3.5vw,46px)',fontWeight:400,color:'var(--dark)'}}>Complete Your <em style={{fontStyle:'italic',color:'var(--rose)'}}>Order</em></h1>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:'32px',padding:'36px 64px 80px',alignItems:'start'}}>

        {/* FORM */}
        <div style={{background:'#fff',borderRadius:'24px',border:'1px solid var(--border)',padding:'32px'}}>
          {error&&<div style={{background:'rgba(227,45,45,0.07)',border:'1px solid rgba(227,45,45,0.2)',borderRadius:'12px',padding:'14px 18px',fontSize:'14px',color:'#c0392b',marginBottom:'20px'}}>{error}</div>}

          <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'22px',fontWeight:500,color:'var(--dark)',marginBottom:'16px',paddingBottom:'12px',borderBottom:'1px solid var(--border)'}}>📦 Delivery Details</div>
          <div style={{background:'rgba(74,124,89,0.07)',border:'1px solid rgba(74,124,89,0.2)',borderRadius:'14px',padding:'14px 16px',marginBottom:'24px',fontSize:'13px',color:'#4A7C59',display:'flex',alignItems:'center',gap:'10px'}}>
            🚚 Free delivery on orders over R500. Standard delivery R80 for smaller orders.
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>
            {[['Full Name *','text','name','e.g. Thandi Mokoena'],['Email Address *','email','email','your@email.com'],['Phone Number','tel','phone','+27 72 123 4567'],['City / Town','text','city','e.g. Johannesburg']].map(([label,type,field,ph])=>(
              <div key={field} style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                <label style={{fontSize:'11px',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500}}>{label}</label>
                <input type={type} placeholder={ph} value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} style={{padding:'13px 16px',border:'1px solid var(--border)',borderRadius:'12px',fontFamily:'DM Sans, sans-serif',fontSize:'14px',color:'var(--text)',outline:'none'}}/>
              </div>
            ))}
            <div style={{display:'flex',flexDirection:'column',gap:'6px',gridColumn:'1/-1'}}>
              <label style={{fontSize:'11px',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500}}>Delivery Address</label>
              <textarea placeholder="Street address, suburb, postal code" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} style={{padding:'13px 16px',border:'1px solid var(--border)',borderRadius:'12px',fontFamily:'DM Sans, sans-serif',fontSize:'14px',color:'var(--text)',outline:'none',resize:'vertical',minHeight:'80px'}}/>
            </div>
          </div>

          <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'22px',fontWeight:500,color:'var(--dark)',marginBottom:'16px',paddingBottom:'12px',borderBottom:'1px solid var(--border)'}}>💳 Payment Method</div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[['payfast','PayFast — Card, EFT & More','Pay securely with Visa, Mastercard, EFT, Ozow and more','💳'],['whatsapp','WhatsApp Order',"Send your order via WhatsApp — we'll confirm and arrange payment",'💬']].map(([val,title,desc,icon])=>(
              <div key={val} onClick={()=>setPayment(val)} style={{display:'flex',alignItems:'center',gap:'14px',padding:'16px 18px',border:`1.5px solid ${payment===val?'var(--rose)':'var(--border)'}`,borderRadius:'14px',cursor:'pointer',background:payment===val?'var(--rose-pale)':'transparent',transition:'all .2s'}}>
                <input type="radio" readOnly checked={payment===val} style={{accentColor:'var(--rose)'}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:'14px',fontWeight:500,color:'var(--text)'}}>{title}</div>
                  <div style={{fontSize:'12px',color:'var(--muted)',marginTop:'2px'}}>{desc}</div>
                </div>
                <span style={{fontSize:'20px',marginLeft:'auto'}}>{icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <aside style={{background:'#fff',borderRadius:'24px',border:'1px solid var(--border)',padding:'28px',position:'sticky',top:'20px'}}>
          <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'22px',fontWeight:500,color:'var(--dark)',marginBottom:'18px',paddingBottom:'12px',borderBottom:'1px solid var(--border)'}}>Your Order</div>
          <div style={{marginBottom:'18px'}}>
            {cart.map(i=>(
              <div key={i.id} style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0',borderBottom:'1px solid rgba(139,26,74,0.06)'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{i.icon||'✨'}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'13px',color:'var(--text)',lineHeight:1.3}}>{i.name}</div>
                  <div style={{fontSize:'11px',color:'var(--muted)'}}>Qty: {i.qty}</div>
                </div>
                <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'16px',fontWeight:600,color:'var(--rose)'}}>R{(i.price*i.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          {[['Subtotal',`R${subtotal.toFixed(2)}`],['Delivery',delivery===0?'FREE':'R80.00']].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:'14px',marginBottom:'10px'}}>
              <span style={{color:'var(--muted)'}}>{l}</span><span style={{fontWeight:500}}>{v}</span>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--border)',paddingTop:'14px',marginTop:'6px',marginBottom:'24px'}}>
            <span style={{fontFamily:'Cormorant Garamond, serif',fontSize:'18px',fontWeight:500,color:'var(--dark)'}}>Total</span>
            <span style={{fontFamily:'Cormorant Garamond, serif',fontSize:'24px',fontWeight:600,color:'var(--rose)'}}>R{total.toFixed(2)}</span>
          </div>
          <button onClick={submitOrder} disabled={loading} style={{width:'100%',background:'var(--rose)',color:'#fff',border:'none',padding:'17px',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'15px',fontWeight:500,cursor:loading?'not-allowed':'pointer',transition:'all .3s',opacity:loading?.6:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            {loading?'Processing...':payment==='whatsapp'?'💬 Send via WhatsApp':'🔒 Place Order & Pay'}
          </button>
          <div style={{display:'flex',justifyContent:'center',gap:'14px',marginTop:'14px',flexWrap:'wrap'}}>
            {['🔒 SSL Secured','✅ Authentic','🔄 Easy Returns'].map(t=><span key={t} style={{fontSize:'12px',color:'var(--muted)'}}>{t}</span>)}
          </div>
        </aside>
      </div>

      <footer style={{background:'#0F0408',padding:'24px 64px'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.25)'}}>
          <span>© 2026 Beauty Store</span><span style={{color:'var(--gold)'}}>You are Beautiful ✦</span>
        </div>
      </footer>

      <style jsx global>{`
        .marquee-track{display:flex;animation:scroll-left 28s linear infinite;white-space:nowrap;}
        @keyframes scroll-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @media(max-width:900px){nav{padding:0 20px;}}
      `}</style>
    </>
  )
}

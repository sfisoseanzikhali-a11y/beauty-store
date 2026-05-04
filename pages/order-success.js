import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function OrderSuccess() {
  const { query } = useRouter()
  const isWhatsApp = query.method === 'whatsapp'

  return (
    <>
      <Head><title>Order Confirmed — Neila Beauty Store</title></Head>
      <nav style={{background:'rgba(250,248,245,0.95)',borderBottom:'1px solid var(--border)',padding:'0 64px',display:'flex',alignItems:'center',height:'74px'}}>
        <Link href="/" style={{fontFamily:'Cormorant Garamond, serif',fontSize:'27px',fontWeight:600,color:'var(--rose)'}}>Neila <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em></Link>
      </nav>
      <main style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 20px',minHeight:'calc(100vh - 74px - 60px)'}}>
        <div style={{background:'#fff',borderRadius:'32px',border:'1px solid var(--border)',padding:'56px 48px',maxWidth:'560px',width:'100%',textAlign:'center',boxShadow:'0 20px 60px rgba(139,26,74,0.06)'}}>
          <div className="success-icon">✓</div>
          <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'12px'}}>Order Confirmed</span>
          <h1 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(32px,5vw,44px)',fontWeight:400,color:'var(--dark)',lineHeight:1.15,marginBottom:'16px'}}>
            Thank You for Your <em style={{fontStyle:'italic',color:'var(--rose)'}}>Order!</em>
          </h1>
          <p style={{fontSize:'15px',color:'var(--muted)',lineHeight:1.72,fontWeight:300,marginBottom:'28px'}}>
            {isWhatsApp ? "Your order has been sent via WhatsApp! We'll confirm and arrange payment with you shortly." : 'Your order has been received and we\'re preparing it with care. You\'ll receive a confirmation email shortly.'}
          </p>
          {query.order && (
            <div style={{background:'var(--rose-pale)',borderRadius:'14px',padding:'14px 20px',marginBottom:'28px',display:'inline-flex',alignItems:'center',gap:'10px',fontSize:'14px'}}>
              📋 Order <strong style={{color:'var(--rose)',fontFamily:'Cormorant Garamond, serif',fontSize:'18px'}}>#{query.order}</strong>
            </div>
          )}
          <div style={{textAlign:'left',background:'var(--ivory)',borderRadius:'16px',padding:'20px 24px',marginBottom:'32px'}}>
            {[['📧','A confirmation email has been sent to your inbox.'],['📦',"We'll process and pack your order within 1–2 business days."],['🚚','Delivery typically takes 3–5 business days across South Africa.'],['💬','Questions? Chat with us on WhatsApp anytime.']].map(([icon,text])=>(
              <div key={text} style={{display:'flex',alignItems:'flex-start',gap:'12px',padding:'8px 0',fontSize:'14px',color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:'18px',marginTop:'1px',flexShrink:0}}>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/" style={{background:'var(--rose)',color:'#fff',padding:'14px 28px',borderRadius:'50px',fontSize:'14px',fontWeight:500,display:'inline-flex',alignItems:'center',gap:'8px'}}>Continue Shopping →</Link>
            <a href="https://wa.me/27722937265" target="_blank" rel="noreferrer" style={{color:'var(--rose)',padding:'13px 28px',borderRadius:'50px',fontSize:'14px',border:'1.5px solid rgba(139,26,74,0.3)',display:'inline-flex',alignItems:'center',gap:'8px'}}>💬 WhatsApp Us</a>
          </div>
        </div>
      </main>
      <footer style={{background:'#0F0408',padding:'20px 64px'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.25)'}}>
          <span>© 2026 Neila Beauty Store</span><span style={{color:'var(--gold)'}}>You are Beautiful ✦</span>
        </div>
      </footer>
      <style jsx global>{`
        .success-icon{width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#4A7C59,#6BAF7B);display:flex;align-items:center;justify-content:center;font-size:40px;color:#fff;margin:0 auto 28px;animation:pop .5s cubic-bezier(.36,1.56,.64,1) both;}
        @keyframes pop{from{transform:scale(0);opacity:0;}to{transform:scale(1);opacity:1;}}
      `}</style>
    </>
  )
}

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if(localStorage.getItem('neila_admin_token')) router.push('/admin/dashboard')
  }, [])

  async function login() {
    if(!email||!password) { setError('Please enter email and password.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.error||'Login failed')
      localStorage.setItem('neila_admin_token', data.token)
      router.push('/admin/dashboard')
    } catch(e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Head><title>Admin Login — Neila Beauty</title></Head>
      <div style={{fontFamily:'DM Sans, sans-serif',background:'linear-gradient(135deg,#1A0A0F 0%,#2C0A1A 100%)',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'#fff',borderRadius:'28px',padding:'48px 44px',width:'100%',maxWidth:'420px',boxShadow:'0 30px 80px rgba(0,0,0,0.3)'}}>
          <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'30px',fontWeight:600,color:'var(--rose)',textAlign:'center',marginBottom:'6px'}}>Neila <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em></div>
          <div style={{textAlign:'center',fontSize:'12px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--muted)',marginBottom:'36px'}}>Admin Portal</div>
          {error&&<div style={{background:'rgba(227,45,45,0.07)',border:'1px solid rgba(227,45,45,0.2)',borderRadius:'10px',padding:'12px 14px',fontSize:'13px',color:'#c0392b',marginBottom:'16px'}}>{error}</div>}
          <div style={{marginBottom:'18px'}}>
            <label style={{display:'block',fontSize:'11px',letterSpacing:'.8px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500,marginBottom:'6px'}}>Email Address</label>
            <input type="email" placeholder="admin@neilabeauty.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={{width:'100%',padding:'14px 16px',border:'1.5px solid var(--border)',borderRadius:'12px',fontFamily:'DM Sans, sans-serif',fontSize:'14px',color:'var(--text)',outline:'none',background:'#FAFAFA'}}/>
          </div>
          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block',fontSize:'11px',letterSpacing:'.8px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500,marginBottom:'6px'}}>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={{width:'100%',padding:'14px 16px',border:'1.5px solid var(--border)',borderRadius:'12px',fontFamily:'DM Sans, sans-serif',fontSize:'14px',color:'var(--text)',outline:'none',background:'#FAFAFA'}}/>
          </div>
          <button onClick={login} disabled={loading} style={{width:'100%',background:'var(--rose)',color:'#fff',border:'none',padding:'15px',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'15px',fontWeight:500,cursor:loading?'not-allowed':'pointer',opacity:loading?.7:1,transition:'all .3s'}}>
            {loading?'Signing in...':'Sign In →'}
          </button>
          <div style={{textAlign:'center',marginTop:'20px',fontSize:'13px',color:'var(--muted)'}}>
            <a href="/" style={{color:'var(--rose)'}}>← Back to store</a>
          </div>
        </div>
      </div>
    </>
  )
}

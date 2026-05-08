import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const statusColor = {pending:'#8B5E0A',paid:'#2D6A3F',processing:'#1D4ED8',shipped:'#5B21B6',delivered:'#166534',cancelled:'#991B1B'}
const statusBg = {pending:'rgba(201,169,110,0.12)',paid:'rgba(74,124,89,0.12)',processing:'rgba(59,130,246,0.1)',shipped:'rgba(124,58,237,0.1)',delivered:'rgba(74,124,89,0.15)',cancelled:'rgba(227,45,45,0.08)'}

export default function AdminDashboard() {
  const router = useRouter()
  const [page, setPage] = useState('dashboard')
  const [stats, setStats] = useState({})
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productSearch, setProductSearch] = useState('')
  const [orderSearch, setOrderSearch] = useState('')
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({name:'',slug:'',price:'',category_id:'',badge:'',stock:'100',description:''})

  const token = typeof window!=='undefined' ? localStorage.getItem('beauty_admin_token') : null

  useEffect(() => {
    if(!token) { router.push('/admin/login'); return }
    loadDashboard()
  }, [])

  async function api(path, opts={}) {
    const res = await fetch('/api'+path, {...opts, headers:{'Content-Type':'application/json','Authorization':'Bearer '+token,...(opts.headers||{})}})
    if(res.status===401) { localStorage.removeItem('beauty_admin_token'); router.push('/admin/login') }
    return res.json()
  }

  async function loadDashboard() {
    const [s, o] = await Promise.all([api('/admin/stats'), api('/orders')])
    setStats(s||{})
    setOrders(Array.isArray(o)?o:[])
  }

  async function loadProducts() {
    const [p, c] = await Promise.all([api('/products'), api('/products/categories')])
    setProducts(Array.isArray(p)?p:[])
    setCategories(Array.isArray(c)?c:[])
  }

  async function saveProduct() {
    const body = {...form, price:parseFloat(form.price), category_id:parseInt(form.category_id)||null, stock:parseInt(form.stock)||100, badge:form.badge||null}
    if(!body.name||!body.slug||!body.price) { alert('Name, slug and price are required.'); return }
    if(editId) await api('/products/'+editId, {method:'PUT',body:JSON.stringify(body)})
    else await api('/products', {method:'POST',body:JSON.stringify(body)})
    resetForm(); loadProducts()
  }

  async function deleteProduct(id, name) {
    if(!confirm(`Delete "${name}"?`)) return
    await api('/products/'+id, {method:'DELETE'})
    loadProducts()
  }

  async function updateOrderStatus(id, status) {
    await api('/orders/'+id, {method:'PATCH',body:JSON.stringify({status})})
    setOrders(o=>o.map(x=>x.id===id?{...x,status}:x))
  }

  function editProduct(p) {
    setEditId(p.id)
    setForm({name:p.name,slug:p.slug,price:p.price,category_id:p.category_id||'',badge:p.badge||'',stock:p.stock||100,description:p.description||''})
    window.scrollTo({top:0,behavior:'smooth'})
  }

  function resetForm() {
    setEditId(null)
    setForm({name:'',slug:'',price:'',category_id:'',badge:'',stock:'100',description:''})
  }

  function autoSlug(name) {
    if(!editId) setForm(f=>({...f,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}))
  }

  function switchPage(p) {
    setPage(p)
    if(p==='dashboard') loadDashboard()
    if(p==='products') loadProducts()
    if(p==='orders') {}
  }

  const filteredProducts = products.filter(p=>!productSearch||p.name.toLowerCase().includes(productSearch.toLowerCase()))
  const filteredOrders = orders.filter(o=>!orderSearch||o.customer_name?.toLowerCase().includes(orderSearch.toLowerCase())||o.customer_email?.toLowerCase().includes(orderSearch.toLowerCase()))

  return (
    <>
      <Head><title>Admin — Beauty Store</title></Head>
      <div style={{display:'flex',minHeight:'100vh',fontFamily:'DM Sans, sans-serif'}}>

        {/* SIDEBAR */}
        <aside style={{width:'240px',background:'#1A0A0F',minHeight:'100vh',display:'flex',flexDirection:'column',flexShrink:0,position:'sticky',top:0,height:'100vh'}}>
          <div style={{padding:'28px 24px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'22px',fontWeight:600,color:'var(--rose)'}}>Beauty <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beauty</em></div>
            <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginTop:'4px'}}>Admin Panel</div>
          </div>
          <nav style={{padding:'20px 0',flex:1}}>
            {[['📊','Dashboard','dashboard'],['🛍️','Products','products'],['📦','Orders','orders']].map(([icon,label,key])=>(
              <button key={key} onClick={()=>switchPage(key)} style={{width:'100%',display:'flex',alignItems:'center',gap:'12px',padding:'13px 24px',fontSize:'14px',color:page===key?'#fff':'rgba(255,255,255,0.55)',cursor:'pointer',background:page===key?'rgba(139,26,74,0.2)':'transparent',border:'none',borderLeft:`3px solid ${page===key?'var(--rose)':'transparent'}`,textAlign:'left',fontFamily:'DM Sans, sans-serif',transition:'all .2s'}}>
                <span style={{fontSize:'16px',width:'20px',textAlign:'center'}}>{icon}</span>{label}
              </button>
            ))}
            <a href="/" target="_blank" style={{display:'flex',alignItems:'center',gap:'12px',padding:'13px 24px',fontSize:'14px',color:'rgba(255,255,255,0.55)',borderLeft:'3px solid transparent',textDecoration:'none'}}>
              <span style={{fontSize:'16px',width:'20px',textAlign:'center'}}>🌐</span>View Store
            </a>
          </nav>
          <div style={{padding:'20px 24px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
            <button onClick={()=>{localStorage.removeItem('beauty_admin_token');router.push('/admin/login')}} style={{width:'100%',background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.1)',padding:'11px',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',cursor:'pointer'}}>← Sign Out</button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{flex:1,background:'#F4F2F7',overflow:'hidden'}}>
          <div style={{background:'#fff',borderBottom:'1px solid rgba(0,0,0,0.06)',padding:'0 36px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'24px',fontWeight:500,color:'var(--dark)'}}>{{'dashboard':'Dashboard','products':'Products','orders':'Orders'}[page]}</div>
            <span style={{background:'var(--rose-pale)',color:'var(--rose)',padding:'6px 14px',borderRadius:'50px',fontSize:'12px',fontWeight:500}}>✦ Admin</span>
          </div>

          <div style={{padding:'32px 36px'}}>

            {/* DASHBOARD */}
            {page==='dashboard'&&(
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'20px',marginBottom:'32px'}}>
                  {[['🛍️','Total Products',stats.products||0],['📦','Total Orders',stats.orders||0],['💰','Revenue (Paid)',`R${Number(stats.totalRevenue||0).toLocaleString('en-ZA',{minimumFractionDigits:2})}`],['🚀','Pending Orders',orders.filter(o=>o.status==='pending').length]].map(([icon,label,val])=>(
                    <div key={label} style={{background:'#fff',borderRadius:'18px',padding:'24px',border:'1px solid rgba(0,0,0,0.06)'}}>
                      <span style={{fontSize:'28px',marginBottom:'12px',display:'block'}}>{icon}</span>
                      <div style={{fontSize:'11px',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500,marginBottom:'6px'}}>{label}</div>
                      <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'34px',fontWeight:600,color:'var(--rose)',lineHeight:1}}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:'#fff',borderRadius:'18px',border:'1px solid rgba(0,0,0,0.06)',overflow:'hidden'}}>
                  <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(0,0,0,0.06)',fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)'}}>Recent Orders</div>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['#','Customer','Total','Status','Date'].map(h=><th key={h} style={{background:'#FAFAFA',padding:'12px 16px',textAlign:'left',fontSize:'11px',letterSpacing:'1px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500,borderBottom:'1px solid rgba(0,0,0,0.06)'}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {orders.slice(0,10).map(o=>(
                        <tr key={o.id}><td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}><strong>#{o.id}</strong></td>
                          <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{o.customer_name}<br/><span style={{fontSize:'12px',color:'var(--muted)'}}>{o.customer_email}</span></td>
                          <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}><strong>R{Number(o.total).toFixed(2)}</strong></td>
                          <td style={{padding:'14px 16px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}><span style={{padding:'4px 10px',borderRadius:'50px',fontSize:'11px',fontWeight:500,background:statusBg[o.status]||statusBg.pending,color:statusColor[o.status]||statusColor.pending}}>{o.status}</span></td>
                          <td style={{padding:'14px 16px',fontSize:'12px',color:'var(--muted)',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{new Date(o.created_at).toLocaleDateString('en-ZA')}</td>
                        </tr>
                      ))}
                      {orders.length===0&&<tr><td colSpan={5} style={{textAlign:'center',padding:'48px',color:'var(--muted)'}}>No orders yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* PRODUCTS */}
            {page==='products'&&(
              <>
                <div style={{background:'#fff',borderRadius:'18px',border:'1px solid rgba(0,0,0,0.06)',padding:'28px',marginBottom:'24px'}}>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)',marginBottom:'18px',paddingBottom:'12px',borderBottom:'1px solid var(--border)'}}>{editId?'✏️ Edit Product':'➕ Add New Product'}</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                    {[['Product Name *','text','name'],['Slug (URL) *','text','slug'],['Price (R) *','number','price'],['Stock','number','stock']].map(([label,type,field])=>(
                      <div key={field} style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                        <label style={{fontSize:'11px',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500}}>{label}</label>
                        <input type={type} placeholder={label} value={form[field]} onChange={e=>{setForm(f=>({...f,[field]:e.target.value}));if(field==='name')autoSlug(e.target.value)}} style={{padding:'11px 14px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none'}}/>
                      </div>
                    ))}
                    <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                      <label style={{fontSize:'11px',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500}}>Category</label>
                      <select value={form.category_id} onChange={e=>setForm(f=>({...f,category_id:e.target.value}))} style={{padding:'11px 14px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',background:'#fff'}}>
                        <option value="">Select category</option>
                        {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                      <label style={{fontSize:'11px',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500}}>Badge</label>
                      <select value={form.badge} onChange={e=>setForm(f=>({...f,badge:e.target.value}))} style={{padding:'11px 14px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',background:'#fff'}}>
                        <option value="">None</option>
                        {['New','Popular','Premium','Bundle'].map(b=><option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'6px',gridColumn:'1/-1'}}>
                      <label style={{fontSize:'11px',letterSpacing:'.5px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500}}>Description</label>
                      <textarea placeholder="Product description..." value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} style={{padding:'11px 14px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'10px',marginTop:'16px'}}>
                    <button onClick={saveProduct} style={{background:'var(--rose)',color:'#fff',border:'none',padding:'11px 22px',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',fontWeight:500,cursor:'pointer'}}>💾 {editId?'Update':'Save'} Product</button>
                    {editId&&<button onClick={resetForm} style={{background:'none',color:'var(--muted)',border:'1px solid var(--border)',padding:'11px 22px',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',cursor:'pointer'}}>Cancel</button>}
                  </div>
                </div>
                <div style={{background:'#fff',borderRadius:'18px',border:'1px solid rgba(0,0,0,0.06)',overflow:'hidden'}}>
                  <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(0,0,0,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)'}}>All Products</div>
                    <input placeholder="Search products..." value={productSearch} onChange={e=>setProductSearch(e.target.value)} style={{padding:'9px 14px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',width:'220px'}}/>
                  </div>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['Name','Category','Price','Badge','Stock','Actions'].map(h=><th key={h} style={{background:'#FAFAFA',padding:'12px 16px',textAlign:'left',fontSize:'11px',letterSpacing:'1px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500,borderBottom:'1px solid rgba(0,0,0,0.06)'}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {filteredProducts.map(p=>(
                        <tr key={p.id} style={{cursor:'pointer'}}>
                          <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)',fontWeight:500}}>{p.name}</td>
                          <td style={{padding:'14px 16px',fontSize:'13px',color:'var(--muted)',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{p.categories?.name||'—'}</td>
                          <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>R{Number(p.price).toFixed(2)}</td>
                          <td style={{padding:'14px 16px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{p.badge?<span style={{padding:'4px 10px',borderRadius:'50px',fontSize:'11px',fontWeight:500,background:'rgba(74,124,89,0.12)',color:'#2D6A3F'}}>{p.badge}</span>:'—'}</td>
                          <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{p.stock||100}</td>
                          <td style={{padding:'14px 16px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>
                            <button onClick={()=>editProduct(p)} style={{background:'none',border:'1px solid var(--border)',color:'var(--muted)',padding:'6px 12px',borderRadius:'8px',fontSize:'12px',cursor:'pointer',marginRight:'6px',fontFamily:'DM Sans, sans-serif'}}>✏️ Edit</button>
                            <button onClick={()=>deleteProduct(p.id,p.name)} style={{background:'none',border:'1px solid rgba(227,45,45,0.3)',color:'#c0392b',padding:'6px 12px',borderRadius:'8px',fontSize:'12px',cursor:'pointer',fontFamily:'DM Sans, sans-serif'}}>🗑️ Delete</button>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length===0&&<tr><td colSpan={6} style={{textAlign:'center',padding:'48px',color:'var(--muted)'}}>No products found</td></tr>}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ORDERS */}
            {page==='orders'&&(
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid rgba(0,0,0,0.06)',overflow:'hidden'}}>
                <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(0,0,0,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)'}}>All Orders</div>
                  <input placeholder="Search by name or email..." value={orderSearch} onChange={e=>setOrderSearch(e.target.value)} style={{padding:'9px 14px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',width:'260px'}}/>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['#','Customer','Items','Total','Status','Date'].map(h=><th key={h} style={{background:'#FAFAFA',padding:'12px 16px',textAlign:'left',fontSize:'11px',letterSpacing:'1px',textTransform:'uppercase',color:'var(--muted)',fontWeight:500,borderBottom:'1px solid rgba(0,0,0,0.06)'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredOrders.map(o=>(
                      <tr key={o.id}>
                        <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}><strong>#{o.id}</strong></td>
                        <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{o.customer_name}<br/><span style={{fontSize:'12px',color:'var(--muted)'}}>{o.customer_email}</span></td>
                        <td style={{padding:'14px 16px',fontSize:'12px',color:'var(--muted)',maxWidth:'160px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{(o.items||[]).map(i=>`${i.name} ×${i.qty}`).join(', ')}</td>
                        <td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}><strong>R{Number(o.total).toFixed(2)}</strong></td>
                        <td style={{padding:'14px 16px',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>
                          <select value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)} style={{padding:'5px 8px',border:'1px solid var(--border)',borderRadius:'8px',fontFamily:'DM Sans, sans-serif',fontSize:'12px',outline:'none',background:'#fff',cursor:'pointer'}}>
                            {['pending','paid','processing','shipped','delivered','cancelled'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td style={{padding:'14px 16px',fontSize:'12px',color:'var(--muted)',borderBottom:'1px solid rgba(0,0,0,0.04)'}}>{new Date(o.created_at).toLocaleDateString('en-ZA')}</td>
                      </tr>
                    ))}
                    {filteredOrders.length===0&&<tr><td colSpan={6} style={{textAlign:'center',padding:'48px',color:'var(--muted)'}}>No orders yet</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  )
}

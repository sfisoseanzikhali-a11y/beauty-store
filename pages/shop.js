import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const catEmoji = {'face-products':'🌸','body-care':'💆','hair-products':'💇','face-body':'✨','supplements':'💊','men-products':'🧴','hair-extensions':'👩','powders':'💄','knuckle-products':'🤲','lips-products':'💋','combo-sets':'🎁'}

export default function Shop() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [activeBadge, setActiveBadge] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r=>r.json()),
      fetch('/api/products/categories').then(r=>r.json())
    ]).then(([prods, cats]) => {
      setProducts(Array.isArray(prods) ? prods : [])
      setCategories(Array.isArray(cats) ? cats : [])
    })
    const cart = JSON.parse(localStorage.getItem('beauty_cart')||'[]')
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }, [])

  useEffect(() => {
    if(router.query.category !== undefined) setActiveCategory(router.query.category || '')
  }, [router.query.category])

  useEffect(() => {
    let f = [...products]
    if(activeCategory) f = f.filter(p => p.categories?.slug === activeCategory)
    if(activeBadge) f = f.filter(p => p.badge === activeBadge)
    if(search) f = f.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if(minPrice) f = f.filter(p => p.price >= parseFloat(minPrice))
    if(maxPrice) f = f.filter(p => p.price <= parseFloat(maxPrice))
    if(sort==='price-asc') f.sort((a,b)=>a.price-b.price)
    if(sort==='price-desc') f.sort((a,b)=>b.price-a.price)
    if(sort==='name-asc') f.sort((a,b)=>a.name.localeCompare(b.name))
    setFiltered(f)
    setPage(1)
  }, [products, activeCategory, activeBadge, search, sort, minPrice, maxPrice])

  function addToCart(p) {
    const cart = JSON.parse(localStorage.getItem('beauty_cart')||'[]')
    const ex = cart.find(i=>i.id===p.id)
    if(ex) ex.qty = Math.min(ex.qty+1,10)
    else cart.push({id:p.id,name:p.name,price:p.price,icon:catEmoji[p.categories?.slug]||'✨',qty:1})
    localStorage.setItem('beauty_cart', JSON.stringify(cart))
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }

  const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const activeCat = categories.find(c=>c.slug===activeCategory)

  return (
    <>
      <Head><title>Shop — Beauty Store</title></Head>

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
          {[['Home','/'],['Shop','/shop'],['Combos','/#combos'],['About','/#about'],['Contact','/#contact']].map(([l,h])=>(
            <li key={l}><Link href={h} className="nav-link">{l}</Link></li>
          ))}
        </ul>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <Link href="/cart" style={{position:'relative',fontSize:'22px',color:'var(--text)'}}>
            🛒{cartCount>0&&<span style={{position:'absolute',top:'-7px',right:'-8px',background:'var(--gold)',color:'var(--dark)',borderRadius:'50%',width:'18px',height:'18px',fontSize:'10px',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center'}}>{cartCount}</span>}
          </Link>
          <a href="https://wa.me/27722937265" target="_blank" rel="noreferrer" className="btn-wa">💬 WhatsApp Us</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg,var(--rose-pale),rgba(250,248,245,0.3))',padding:'48px 64px 36px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'120px',top:'20px',fontSize:'80px',color:'rgba(201,169,110,0.06)',pointerEvents:'none'}}>✦</div>
        <span style={{display:'block',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'12px'}}>Our Collection</span>
        <h1 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'clamp(36px,4vw,56px)',fontWeight:400,color:'var(--dark)',lineHeight:1.1,marginBottom:'10px'}}>
          Shop <em style={{fontStyle:'italic',color:'var(--rose)'}}>All Products</em>
        </h1>
        <p style={{fontSize:'15px',color:'var(--muted)',fontWeight:300}}>Premium beauty products curated for every skin type and budget.</p>
        <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'var(--muted)',marginTop:'16px'}}>
          <Link href="/" style={{color:'var(--rose)'}}>Home</Link><span>›</span>
          <span>{activeCat ? activeCat.name : 'All Products'}</span>
        </div>
      </div>

      {/* LAYOUT */}
      <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:'32px',padding:'40px 64px 80px',alignItems:'start'}}>

        {/* SIDEBAR */}
        <aside style={{position:'sticky',top:'96px'}}>
          {/* Categories */}
          <div style={{marginBottom:'28px'}}>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)',marginBottom:'14px',paddingBottom:'10px',borderBottom:'1px solid var(--border)'}}>Categories</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'4px'}}>
              <li>
                <button onClick={()=>{setActiveCategory('');router.push('/shop',undefined,{shallow:true})}} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:'12px',border:`1px solid ${!activeCategory?'var(--rose)':'transparent'}`,background:!activeCategory?'var(--rose)':'transparent',color:!activeCategory?'#fff':'var(--text)',cursor:'pointer',fontSize:'14px',fontFamily:'DM Sans, sans-serif',transition:'all .2s'}}>
                  <span>🛍️ All Products</span>
                  <span style={{fontSize:'11px',background:!activeCategory?'rgba(255,255,255,0.2)':'rgba(139,26,74,0.1)',color:!activeCategory?'#fff':'var(--rose)',padding:'2px 7px',borderRadius:'50px'}}>{products.length}</span>
                </button>
              </li>
              {categories.map(cat=>{
                const count = products.filter(p=>p.category_id===cat.id).length
                const isActive = activeCategory===cat.slug
                return (
                  <li key={cat.id}>
                    <button onClick={()=>{setActiveCategory(cat.slug);router.push(`/shop?category=${cat.slug}`,undefined,{shallow:true})}} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:'12px',border:`1px solid ${isActive?'var(--rose)':'transparent'}`,background:isActive?'var(--rose)':'transparent',color:isActive?'#fff':'var(--text)',cursor:'pointer',fontSize:'14px',fontFamily:'DM Sans, sans-serif',transition:'all .2s'}}>
                      <span>{cat.icon||'🌸'} {cat.name}</span>
                      <span style={{fontSize:'11px',background:isActive?'rgba(255,255,255,0.2)':'rgba(139,26,74,0.1)',color:isActive?'#fff':'var(--rose)',padding:'2px 7px',borderRadius:'50px'}}>{count}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Price */}
          <div style={{marginBottom:'28px'}}>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)',marginBottom:'14px',paddingBottom:'10px',borderBottom:'1px solid var(--border)'}}>Price Range</div>
            <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'10px'}}>
              <input type="number" placeholder="Min R" value={minPrice} onChange={e=>setMinPrice(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none'}}/>
              <span style={{color:'var(--muted)',fontSize:'12px',flexShrink:0}}>to</span>
              <input type="number" placeholder="Max R" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none'}}/>
            </div>
            <button onClick={()=>{}} style={{width:'100%',background:'var(--rose)',color:'#fff',border:'none',padding:'11px',borderRadius:'10px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',fontWeight:500,cursor:'pointer'}}>Apply Filter</button>
          </div>

          {/* Badge */}
          <div>
            <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:500,color:'var(--dark)',marginBottom:'14px',paddingBottom:'10px',borderBottom:'1px solid var(--border)'}}>Filter By</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {[['All',''],['✨ New','New'],['🔥 Popular','Popular'],['⭐ Premium','Premium'],['🎁 Bundle','Bundle']].map(([label,val])=>(
                <button key={val} onClick={()=>setActiveBadge(val)} style={{background:activeBadge===val?'var(--rose)':'#fff',color:activeBadge===val?'#fff':'var(--muted)',border:`1px solid ${activeBadge===val?'var(--rose)':'var(--border)'}`,padding:'6px 14px',borderRadius:'50px',fontSize:'12px',cursor:'pointer',transition:'all .2s',fontFamily:'DM Sans, sans-serif'}}>{label}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main>
          {/* Toolbar */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'28px',flexWrap:'wrap',gap:'14px'}}>
            <div style={{fontSize:'14px',color:'var(--muted)'}}>Showing <strong style={{color:'var(--text)'}}>{filtered.length}</strong> products{activeCat?` in ${activeCat.name}`:''}</div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{position:'relative'}}>
                <span style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'var(--muted)',fontSize:'14px',pointerEvents:'none'}}>🔍</span>
                <input type="text" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} style={{padding:'10px 16px 10px 40px',border:'1px solid var(--border)',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',width:'220px'}}/>
              </div>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:'10px 16px',border:'1px solid var(--border)',borderRadius:'50px',fontFamily:'DM Sans, sans-serif',fontSize:'13px',outline:'none',background:'#fff',cursor:'pointer'}}>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {paged.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 20px',background:'#fff',borderRadius:'24px',border:'1px solid var(--border)'}}>
              <div style={{fontSize:'64px',marginBottom:'20px'}}>🔍</div>
              <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'28px',color:'var(--dark)',marginBottom:'10px'}}>No products found</div>
              <p style={{fontSize:'15px',color:'var(--muted)',fontWeight:300}}>Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'20px'}}>
              {paged.map(p=>(
                <div key={p.id} className="prod-card">
                  <Link href={`/product?slug=${p.slug}`}>
                    <div className="prod-img">
                      {p.badge&&<div style={{position:'absolute',top:'12px',left:'12px',background:p.badge==='Popular'?'var(--gold)':p.badge==='Premium'?'var(--dark)':p.badge==='Bundle'?'#4A7C59':'var(--rose)',color:'#fff',fontSize:'10px',letterSpacing:'1px',textTransform:'uppercase',padding:'4px 10px',borderRadius:'50px',fontWeight:500}}>{p.badge}</div>}
                      <span style={{fontSize:'58px',transition:'transform .4s',display:'block'}}>{catEmoji[p.categories?.slug]||'✨'}</span>
                    </div>
                  </Link>
                  <div style={{padding:'14px 16px 16px'}}>
                    <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--gold)',fontWeight:500,marginBottom:'4px'}}>{p.categories?.name||'Beauty'}</div>
                    <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'15px',fontWeight:500,color:'var(--dark)',lineHeight:1.35,marginBottom:'12px',minHeight:'40px'}}>{p.name}</div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'20px',fontWeight:600,color:'var(--rose)'}}>R{Number(p.price).toFixed(2)}</div>
                      <button onClick={()=>addToCart(p)} className="btn-add">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'48px'}}>
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{width:'40px',height:'40px',borderRadius:'50%',border:'1px solid var(--border)',background:'#fff',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',opacity:page===1?.4:1}}>‹</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setPage(n)} style={{width:'40px',height:'40px',borderRadius:'50%',border:'1px solid var(--border)',background:n===page?'var(--rose)':'#fff',color:n===page?'#fff':'var(--text)',cursor:'pointer',fontSize:'14px',fontFamily:'DM Sans, sans-serif'}}>{n}</button>
              ))}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{width:'40px',height:'40px',borderRadius:'50%',border:'1px solid var(--border)',background:'#fff',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',opacity:page===totalPages?.4:1}}>›</button>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer style={{background:'#0F0408',color:'rgba(255,255,255,0.6)',padding:'48px 64px 24px'}}>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'20px',display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.25)'}}>
          <span>© 2026 Beauty Store. All rights reserved.</span>
          <span style={{color:'var(--gold)'}}>You are Beautiful ✦</span>
        </div>
      </footer>

      <style jsx global>{`
        .marquee-track{display:flex;animation:scroll-left 28s linear infinite;white-space:nowrap;}
        @keyframes scroll-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .nav-link{color:var(--text);font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:400;position:relative;transition:color .25s;text-decoration:none;}
        .nav-link:hover{color:var(--rose);}
        .btn-wa{background:var(--rose);color:#fff;padding:10px 22px;border-radius:50px;font-size:12px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:all .3s;}
        .btn-wa:hover{background:var(--rose-hover);transform:translateY(-1px);}
        .prod-card{background:#fff;border-radius:22px;overflow:hidden;border:1px solid var(--border);transition:all .4s cubic-bezier(.25,.46,.45,.94);}
        .prod-card:hover{box-shadow:0 20px 50px rgba(139,26,74,0.12);transform:translateY(-7px);}
        .prod-img{width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,var(--rose-pale),rgba(255,255,255,0.9));position:relative;overflow:hidden;}
        .prod-img:hover span{transform:scale(1.1);}
        .btn-add{background:var(--rose-pale);color:var(--rose);border:none;padding:7px 14px;border-radius:50px;font-size:12px;font-weight:500;cursor:pointer;transition:all .22s;font-family:'DM Sans',sans-serif;}
        .btn-add:hover{background:var(--rose);color:#fff;}
        @media(max-width:900px){nav{padding:0 20px;}nav ul{display:none;}}
      `}</style>
    </>
  )
}

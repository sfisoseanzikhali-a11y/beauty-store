// scripts/import-products.js v2
// Run with: node scripts/import-products.js

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const BASE_URL = 'https://beautystore.com'

const CAT_MAP = {
  'face-products': 'face-products',
  'facial-body-product': 'face-body',
  'body-care': 'body-care',
  'hair-products': 'hair-products',
  'hair-extensions': 'hair-extensions',
  'knuckle-products': 'knuckle-products',
  'powders': 'powders',
  'supplements': 'supplements',
  'men-products': 'men-products',
  'lips-products': 'lips-products',
  'combo-sets': 'combo-sets',
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

function decodeHtml(str = '') {
  return str
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#038;|&amp;/g, '&').replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '').trim()
}

function cleanSlug(text = '') {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 100)
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,*/*;q=0.9',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function parseProducts(html) {
  const products = []

  // Extract each product entry using anchor tags to product pages
  const entryPattern = /href="(https:\/\/beautystore..com\/product\/[^"]+)"[\s\S]{0,2000}?class="woocommerce-loop-product__title">([^<]+)<\/h2>[\s\S]{0,500}?<span class="woocommerce-Price-amount[\s\S]{0,100}?>([^<]+)<\/bdi>/g

  let match
  while ((match = entryPattern.exec(html)) !== null) {
    const productUrl = match[1]
    const name = decodeHtml(match[2])
    const priceStr = match[3].replace(/[^0-9.]/g, '')
    const price = parseFloat(priceStr) || 0
    const slug = productUrl.replace('https://beautystore.com/product/', '').replace(/\/$/, '')

    // Find image near this product URL
    const block = html.substring(Math.max(0, match.index - 1000), match.index + 500)
    const imgMatch = block.match(/src="(https:\/\/beautystore..com\/wp-content\/uploads\/[^"]+\.(?:webp|jpg|jpeg|png))"/)
    const imageUrl = imgMatch ? imgMatch[1] : null

    // Find category near this product
    const catMatch = block.match(/href="https:\/\/beautystore..com\/product-category\/([^"]+)\/"/)
    let categorySlug = ''
    if (catMatch) {
      const raw = catMatch[1].split('/').pop()
      if (catMatch[1].includes('combo-sets')) categorySlug = 'combo-sets'
      else categorySlug = CAT_MAP[raw] || raw
    }

    products.push({ name, slug, price, imageUrl, categorySlug })
  }

  // Fallback: simpler pattern matching names + prices separately
  if (products.length === 0) {
    const names = [...html.matchAll(/class="woocommerce-loop-product__title">([^<]+)<\/h2>/g)]
    const urls = [...html.matchAll(/href="https:\/\/beautystore..com\/product\/([^"\/]+)\/"/g)]
    const imgs = [...html.matchAll(/src="(https:\/\/beautystore..com\/wp-content\/uploads\/[^"]+\.(?:webp|jpg|jpeg|png))"/g)]
    const prs = [...html.matchAll(/amount"[^>]*><bdi>[^0-9]*([\d.]+)<\/bdi>/g)]

    for (let i = 0; i < names.length; i++) {
      products.push({
        name: decodeHtml(names[i][1]),
        slug: urls[i] ? urls[i][1] : cleanSlug(names[i][1]),
        price: prs[i] ? parseFloat(prs[i][1]) : 0,
        imageUrl: imgs[i] ? imgs[i][1] : null,
        categorySlug: '',
      })
    }
  }

  return products
}

async function main() {
  console.log('🌸 Beauty Store — Product Importer v2')
  console.log('======================================\n')

  const { data: cats } = await supabase.from('categories').select('id, slug')
  const catIdMap = {}
  for (const c of cats || []) catIdMap[c.slug] = c.id
  console.log(`✓ Loaded ${Object.keys(catIdMap).length} categories from Supabase`)

  // First try WooCommerce REST API (no auth needed for public products)
  console.log('\n📡 Trying WooCommerce API...')
  let allProducts = []

  try {
    let page = 1
    let totalPages = 999

    while (page <= totalPages) {
      const url = `${BASE_URL}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
      })

      if (!res.ok) {
        if (page === 1) throw new Error(`API returned ${res.status}`)
        break
      }

      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) break

      const tp = res.headers.get('x-wp-totalpages')
      if (tp) totalPages = parseInt(tp)

      for (const item of data) {
        let catSlug = ''
        if (item.categories?.some(c => c.slug === 'combo-sets')) catSlug = 'combo-sets'
        else if (item.categories?.[0]) catSlug = CAT_MAP[item.categories[0].slug] || item.categories[0].slug

        allProducts.push({
          name: decodeHtml(item.name || ''),
          slug: item.slug || cleanSlug(item.name || ''),
          description: decodeHtml((item.short_description || item.description || '').replace(/<[^>]+>/g, '')).substring(0, 400),
          price: parseFloat(item.price || item.regular_price || 0),
          imageUrl: item.images?.[0]?.src || null,
          categorySlug: catSlug,
        })
      }

      console.log(`  Page ${page}/${totalPages}: ✓ ${allProducts.length} products total`)
      page++
      await sleep(400)
    }

    console.log(`✓ API success! Got ${allProducts.length} products`)

  } catch (e) {
    console.log(`✗ API failed: ${e.message}`)
    console.log('\n📄 Falling back to HTML scraping...\n')

    for (let page = 1; page <= 41; page++) {
      const url = page === 1 ? `${BASE_URL}/shop/` : `${BASE_URL}/shop/page/${page}/`
      process.stdout.write(`Page ${page}/41... `)
      try {
        const html = await fetchPage(url)
        const found = parseProducts(html)
        allProducts.push(...found)
        console.log(`✓ ${found.length} found (total: ${allProducts.length})`)
      } catch (err) {
        console.log(`✗ ${err.message}`)
      }
      await sleep(600)
    }
  }

  // Deduplicate
  const seen = new Set()
  const unique = allProducts.filter(p => {
    if (!p.name || !p.slug || seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })

  console.log(`\n📊 Total scraped: ${allProducts.length}`)
  console.log(`✓ After dedup:   ${unique.length}`)

  // Check existing
  const { data: existing } = await supabase.from('products').select('slug')
  const existingSlugs = new Set((existing || []).map(p => p.slug))
  const toInsert = unique.filter(p => !existingSlugs.has(p.slug))
  console.log(`✓ New products:  ${toInsert.length}\n`)

  if (toInsert.length === 0) {
    console.log('✅ All products already in database!')
    console.log('   Visit http://localhost:3000/shop')
    return
  }

  // Insert in batches of 50
  let inserted = 0, failed = 0
  const BATCH = 50

  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH).map(p => ({
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      price: p.price || 0,
      category_id: catIdMap[p.categorySlug] || null,
      images: p.imageUrl ? [p.imageUrl] : [],
      badge: null,
      stock: 100,
      active: true,
    }))

    const { error } = await supabase.from('products').insert(batch)
    if (error) {
      // Try one by one
      for (const item of batch) {
        const { error: e2 } = await supabase.from('products').insert([item])
        if (e2) { failed++; }
        else inserted++
      }
    } else {
      inserted += batch.length
    }

    process.stdout.write(`Inserting... ${inserted}/${toInsert.length}\r`)
    await sleep(200)
  }

  console.log(`\n✅ Done!  Inserted: ${inserted}  Failed: ${failed}`)
  console.log(`\n🌸 Visit http://localhost:3000/shop to see all your products!`)
}

main().catch(e => { console.error('Error:', e.message); process.exit(1) })

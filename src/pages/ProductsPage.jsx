/**
 * PRODUCTS PAGE — Amazon-style UI
 * Hard-coded products with proper card design
 * Ratings, prices, deal badges, Amazon + Flipkart buttons
 */
import React, { useState, useEffect, useMemo } from 'react'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { fetchAffiliateProducts } from '../utils/db'
import './ProductsPage.css'

// ── Hard-coded products (always show even without Firebase) ──
const DEFAULT_PRODUCTS = [
  // ⚡ Electrical
  { id:'e1', name:'Luminous Zelio+ 1100VA Inverter',      category:'electrical', price:'₹6,200', was:'₹7,800', badge:'Best Seller', rating:4.4, rev:'12k+', tag:'Pure Sine Wave · ISI Mark', deal:'Today only', img:'🔌', amazon:'https://www.amazon.in/s?k=luminous+zelio+1100+inverter&tag=almenso-21',           flip:'https://www.flipkart.com/search?q=luminous+zelio+1100+inverter', visible:true },
  { id:'e2', name:'Luminous 150Ah Tall Tubular Battery',  category:'electrical', price:'₹11,500',was:'₹13,000',badge:'Top Pick',    rating:4.3, rev:'8k+',  tag:'36 Month Warranty',        deal:null,          img:'🔋', amazon:'https://www.amazon.in/s?k=luminous+150ah+tubular+battery&tag=almenso-21',          flip:'https://www.flipkart.com/search?q=luminous+150ah+tubular+battery', visible:true },
  { id:'e3', name:'Polycab 1.5sqmm FR Wire 90m',          category:'electrical', price:'₹1,800', was:'₹2,200', badge:'ISI Certified',rating:4.5, rev:'5k+',  tag:'FR PVC · Fire Resistant',  deal:null,          img:'⚡', amazon:'https://www.amazon.in/s?k=polycab+1.5+sqmm+wire+90m&tag=almenso-21',              flip:'https://www.flipkart.com/search?q=polycab+wire+1.5sqmm', visible:true },
  { id:'e4', name:'Schneider MCB 32A Double Pole',         category:'electrical', price:'₹450',   was:null,     badge:'Quality Brand',rating:4.3, rev:'3k+',  tag:'Double Pole · IS Certified',deal:null,          img:'🔒', amazon:'https://www.amazon.in/s?k=schneider+mcb+32a+double+pole&tag=almenso-21',          flip:null, visible:true },
  { id:'e5', name:'Syska LED 9W Pack of 10',               category:'electrical', price:'₹549',   was:'₹799',  badge:'Save 31%',    rating:4.2, rev:'20k+', tag:'Cool White · 2yr Warranty', deal:'Combo deal',  img:'💡', amazon:'https://www.amazon.in/s?k=syska+led+9w+pack+10&tag=almenso-21',                  flip:'https://www.flipkart.com/search?q=syska+led+9w+pack', visible:true },
  { id:'e6', name:'Havells Crabtree 6A Switch Plate',      category:'electrical', price:'₹380',   was:null,     badge:'Premium',     rating:4.4, rev:'7k+',  tag:'Modular · Shock Proof',     deal:null,          img:'🔘', amazon:'https://www.amazon.in/s?k=havells+crabtree+6a+switch&tag=almenso-21',             flip:null, visible:true },
  // ☀️ Solar
  { id:'s1', name:'UTL Solar Panel 200W Mono PERC',        category:'solar',      price:'₹6,500', was:'₹8,500', badge:'Most Popular', rating:4.3, rev:'2k+',  tag:'25yr Warranty · Tier-1',   deal:'PM Subsidy',  img:'☀️', amazon:'https://www.amazon.in/s?k=solar+panel+200w+mono+perc&tag=almenso-21',            flip:'https://www.flipkart.com/search?q=solar+panel+200w', visible:true },
  { id:'s2', name:'Luminous 40A MPPT Charge Controller',   category:'solar',      price:'₹3,200', was:null,     badge:'Top Pick',    rating:4.2, rev:'1.5k+',tag:'LCD Display · 40A',         deal:null,          img:'🔆', amazon:'https://www.amazon.in/s?k=luminous+40a+mppt+charge+controller&tag=almenso-21',    flip:null, visible:true },
  { id:'s3', name:'Exide 150Ah C10 Tubular Battery',       category:'solar',      price:'₹12,000',was:'₹14,500',badge:'Best Life',   rating:4.4, rev:'6k+',  tag:'5 Year Warranty · C10',    deal:null,          img:'🔋', amazon:'https://www.amazon.in/s?k=exide+150ah+c10+battery&tag=almenso-21',                flip:'https://www.flipkart.com/search?q=exide+150ah+c10', visible:true },
  { id:'s4', name:'UTL Gamma+ 3kVA Solar PCU',             category:'solar',      price:'₹18,500',was:null,     badge:'Grid-Tie',    rating:4.1, rev:'800+', tag:'3kVA · MPPT Inbuilt',       deal:'Free Consult',img:'🔌', amazon:'https://www.amazon.in/s?k=utl+3kva+solar+pcu&tag=almenso-21',                    flip:null, visible:true },
  // 🏠 Interior / General
  { id:'g1', name:'Philips Air Fryer HD9200/90',           category:'interior',   price:'₹5,295', was:'₹7,000', badge:'Most Popular', rating:4.4, rev:'30k+', tag:'4.1L · 90% Less Oil',      deal:null,          img:'🍳', amazon:'https://www.amazon.in/s?k=philips+air+fryer+hd9200&tag=almenso-21',              flip:'https://www.flipkart.com/search?q=philips+air+fryer', visible:true },
  { id:'g2', name:'Amazon Echo Dot 5th Gen',               category:'interior',   price:'₹4,499', was:'₹5,999', badge:'Smart Home',   rating:4.5, rev:'60k+', tag:'Alexa · Improved Bass',    deal:'25% off',     img:'🔵', amazon:'https://www.amazon.in/s?k=amazon+echo+dot+5th+gen&tag=almenso-21',               flip:null, visible:true },
  { id:'g3', name:'Prestige Iris 750W Mixer Grinder',      category:'interior',   price:'₹2,195', was:'₹3,500', badge:'Kitchen Pick', rating:4.3, rev:'25k+', tag:'3 Jars · 5yr Warranty',    deal:null,          img:'🫙', amazon:'https://www.amazon.in/s?k=prestige+iris+mixer+grinder+750w&tag=almenso-21',     flip:'https://www.flipkart.com/search?q=prestige+iris+750w+mixer', visible:true },
  // 🔧 Other
  { id:'t1', name:'boAt Airdopes 141 TWS Earbuds',         category:'other',      price:'₹999',   was:'₹2,499', badge:'Bestseller',   rating:4.0, rev:'100k+',tag:'42hr Battery · IPX4',      deal:'Limited time',img:'🎧', amazon:'https://www.amazon.in/s?k=boat+airdopes+141&tag=almenso-21',                    flip:'https://www.flipkart.com/search?q=boat+airdopes+141', visible:true },
  { id:'t2', name:'Realme Power Bank 20000mAh 33W',        category:'other',      price:'₹1,299', was:'₹1,999', badge:'Fast Charge',  rating:4.2, rev:'25k+', tag:'33W · USB-C · 3 Ports',    deal:null,          img:'🔋', amazon:'https://www.amazon.in/s?k=realme+power+bank+20000mah+33w&tag=almenso-21',       flip:'https://www.flipkart.com/search?q=realme+power+bank+20000mah', visible:true },
  { id:'t3', name:'SanDisk 256GB Pen Drive USB 3.2',       category:'other',      price:'₹999',   was:'₹1,499', badge:'Fast Transfer',rating:4.5, rev:'50k+', tag:'400MB/s Read · Compact',   deal:null,          img:'💾', amazon:'https://www.amazon.in/s?k=sandisk+256gb+usb+3.2+pen+drive&tag=almenso-21',     flip:'https://www.flipkart.com/search?q=sandisk+256gb+pen+drive', visible:true },
]

const CATEGORIES = [
  { id:'all',        label:'🛍️ All',        emoji:'🛍️' },
  { id:'electrical', label:'⚡ Electrical', emoji:'⚡' },
  { id:'solar',      label:'☀️ Solar',      emoji:'☀️' },
  { id:'interior',   label:'🏠 Interior',   emoji:'🏠' },
  { id:'other',      label:'🔧 Other',      emoji:'🔧' },
]

const BADGE_COLOR = {
  'Best Seller':  { bg:'#dc2626', text:'#fff' },
  'Top Pick':     { bg:'#7c3aed', text:'#fff' },
  'Most Popular': { bg:'#0369a1', text:'#fff' },
  'ISI Certified':{ bg:'#059669', text:'#fff' },
  'Bestseller':   { bg:'#dc2626', text:'#fff' },
  'Fast Charge':  { bg:'#ea580c', text:'#fff' },
  'Fast Transfer':{ bg:'#0369a1', text:'#fff' },
  'Grid-Tie':     { bg:'#065f46', text:'#fff' },
  'Best Life':    { bg:'#0369a1', text:'#fff' },
  'Kitchen Pick': { bg:'#b45309', text:'#fff' },
  'Smart Home':   { bg:'#4f46e5', text:'#fff' },
  default:        { bg:'#f59e0b', text:'#fff' },
}

function StarRating({ rating }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  return (
    <div style={{ display:'flex', alignItems:'center', gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize:'0.65rem', color: i <= full ? '#f59e0b' : (i === full+1 && half ? '#f59e0b' : '#d1d5db') }}>
          {i <= full ? '★' : (i === full+1 && half ? '⭐' : '☆')}
        </span>
      ))}
      <span style={{ fontSize:'0.65rem', color:'#64748b', marginLeft:2 }}>{rating} ({rating >= 4.4 ? 'Excellent' : rating >= 4.0 ? 'Very Good' : 'Good'})</span>
    </div>
  )
}

function ProductCard({ p }) {
  const badgeStyle = BADGE_COLOR[p.badge] || BADGE_COLOR.default
  const discount   = p.was
    ? Math.round((1 - parseInt(p.price.replace(/[^0-9]/g,'')) / parseInt(p.was.replace(/[^0-9]/g,''))) * 100)
    : null

  return (
    <div style={{
      background:'#fff', borderRadius:14, border:'1.5px solid #e2e8f0',
      display:'flex', flexDirection:'column', overflow:'hidden',
      transition:'box-shadow 0.2s, transform 0.2s', position:'relative',
      boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'; e.currentTarget.style.transform='translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.06)'; e.currentTarget.style.transform='translateY(0)' }}
    >
      {/* Badge */}
      {p.badge && (
        <div style={{
          position:'absolute', top:10, left:10, zIndex:2,
          background:badgeStyle.bg, color:badgeStyle.text,
          padding:'3px 8px', borderRadius:6,
          fontSize:'0.6rem', fontWeight:900, letterSpacing:'0.02em',
        }}>{p.badge}</div>
      )}

      {/* Discount % */}
      {discount > 0 && (
        <div style={{
          position:'absolute', top:10, right:10, zIndex:2,
          background:'#16a34a', color:'#fff',
          padding:'3px 7px', borderRadius:6,
          fontSize:'0.6rem', fontWeight:900,
        }}>{discount}% OFF</div>
      )}

      {/* Image / Emoji */}
      <div style={{
        background:'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'28px 0', fontSize:'3.2rem', minHeight:110,
      }}>
        {p.img}
      </div>

      {/* Info */}
      <div style={{ padding:'12px 12px 0', flex:1 }}>
        <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#0f172a', lineHeight:1.3, marginBottom:6,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {p.name}
        </div>

        {/* Rating */}
        <StarRating rating={p.rating} />
        <div style={{ fontSize:'0.6rem', color:'#94a3b8', marginBottom:6 }}>{p.rev} reviews</div>

        {/* Price */}
        <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:4 }}>
          <span style={{ fontSize:'1.05rem', fontWeight:900, color:'#dc2626' }}>{p.price}</span>
          {p.was && (
            <span style={{ fontSize:'0.72rem', color:'#94a3b8', textDecoration:'line-through' }}>{p.was}</span>
          )}
        </div>

        {/* Tag / Features */}
        <div style={{ fontSize:'0.62rem', color:'#475569', background:'#f1f5f9',
          borderRadius:5, padding:'3px 7px', marginBottom:6, display:'inline-block' }}>
          {p.tag}
        </div>

        {/* Deal */}
        {p.deal && (
          <div style={{ fontSize:'0.62rem', color:'#b45309', fontWeight:700, background:'#fef3c7',
            borderRadius:5, padding:'3px 7px', marginBottom:6, display:'inline-block', marginLeft:4 }}>
            🔥 {p.deal}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ padding:'10px 12px 12px', display:'flex', gap:7 }}>
        <button
          onClick={() => window.open(p.amazon, '_blank', 'noopener,noreferrer')}
          style={{
            flex:1, background:'linear-gradient(135deg, #f59e0b, #d97706)',
            color:'#fff', border:'none', borderRadius:8,
            padding:'9px 6px', fontSize:'0.72rem', fontWeight:900,
            cursor:'pointer', transition:'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}
        >
          🛒 Amazon
        </button>
        {p.flip && (
          <button
            onClick={() => window.open(p.flip, '_blank', 'noopener,noreferrer')}
            style={{
              flex:1, background:'linear-gradient(135deg, #2874f0, #1a5cd8)',
              color:'#fff', border:'none', borderRadius:8,
              padding:'9px 6px', fontSize:'0.72rem', fontWeight:900,
              cursor:'pointer', transition:'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
          >
            🛍️ Flipkart
          </button>
        )}
      </div>
    </div>
  )
}

// ── Featured section for HomePage ──────────────────────────
export function FeaturedProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchAffiliateProducts()
      .then(data => {
        if (Array.isArray(data) && data.length) {
          const visible = data.filter(p => p.visible !== false).slice(0, 4)
          setProducts(visible.map(p => ({
            id: p.id, name: p.name, category: p.category || 'other',
            price: p.price, was: p.originalPrice || null,
            badge: p.badge || 'Top Pick', rating: p.rating || 4.2,
            rev: p.reviews || '1k+', tag: p.description || '',
            deal: null, img: p.image || '🛍️',
            amazon: p.affiliateLink || '#', flip: p.flipkartLink || null,
          })))
        } else {
          // Fallback to hard-coded featured
          setProducts(DEFAULT_PRODUCTS.filter(p => ['Best Seller','Most Popular','Bestseller'].includes(p.badge)).slice(0, 4))
        }
      })
      .catch(() => {
        setProducts(DEFAULT_PRODUCTS.filter(p => ['Best Seller','Most Popular','Bestseller'].includes(p.badge)).slice(0, 4))
      })
  }, [])

  const featured = products.length
    ? products
    : DEFAULT_PRODUCTS.filter(p => ['Best Seller','Most Popular','Bestseller'].includes(p.badge)).slice(0, 4)
  if (!featured.length) return null
  return (
    <div style={{ background:'#fff', borderRadius:14, padding:20, margin:'20px 0', border:'1.5px solid #e2e8f0' }}>
      <div style={{ textAlign:'center', marginBottom:18 }}>
        <div style={{ fontSize:'1.2rem', fontWeight:900, color:'#0a2342', marginBottom:4 }}>🛒 Best Products This Week</div>
        <div style={{ fontSize:'0.82rem', color:'#64748b' }}>Expert-curated picks — best prices on Amazon & Flipkart</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:12, marginBottom:14 }}>
        {featured.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      <a href="/products" style={{
        display:'block', textAlign:'center', padding:'12px',
        background:'#0a2342', color:'#fff', textDecoration:'none',
        borderRadius:8, fontWeight:700, fontSize:'0.9rem',
      }}>
        View All Products →
      </a>
    </div>
  )
}

// ── Main Products Page ──────────────────────────────────────
export default function ProductsPage() {
  const [adminProducts, setAdminProducts] = useState([])
  const [loaded,        setLoaded]        = useState(false)
  const [category,      setCategory]      = useState('all')
  const [search,        setSearch]        = useState('')

  // Try fetching Admin-added products — fallback to DEFAULT_PRODUCTS if empty
  useEffect(() => {
    fetchAffiliateProducts()
      .then(data => {
        setAdminProducts(Array.isArray(data) && data.length ? data : [])
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  // Admin products override default — agar admin ne kuch add kiya ho toh woh dikhao
  const normalizeAdminProduct = (p) => ({
    id:       p.id,
    name:     p.name,
    category: p.category || 'other',
    price:    p.price,
    was:      p.originalPrice || null,
    badge:    p.badge || null,
    rating:   p.rating || 4.2,
    rev:      p.reviews || '1k+',
    tag:      p.description || '',
    deal:     p.deal || null,
    img:      p.image || '🛍️',
    amazon:   p.affiliateLink || '#',
    flip:     p.flipkartLink || null,
    visible:  p.visible !== false,
  })

  const allProducts = loaded && adminProducts.length
    ? adminProducts.filter(p => p.visible !== false).map(normalizeAdminProduct)
    : DEFAULT_PRODUCTS

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allProducts.filter(p => {
      const matchCat    = category === 'all' || p.category === category
      const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.tag||'').toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [category, search, allProducts])

  const catCounts = useMemo(() => {
    const c = {}
    allProducts.forEach(p => { c[p.category] = (c[p.category] || 0) + 1 })
    return c
  }, [allProducts])

  return (
    <>
      <SEOHead
        title="Best Products — Electrical, Solar & Home | Almenso"
        description="Best electrical, solar, interior products — expertly curated for Uttarakhand. Inverter batteries, solar panels, fans, wiring — Amazon pe best price mein."
        keywords="best inverter battery india, solar panel haldwani, electrical products uttarakhand, luminous inverter, polycab wire"
        canonical="/products"
      />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'12px', background:'#f8fafc', minHeight:'100vh' }}>

        {/* Hero */}
        <div style={{
          background:'linear-gradient(135deg, #0a2342 0%, #1565c0 100%)',
          color:'#fff', padding:'32px 20px', borderRadius:16,
          textAlign:'center', marginBottom:20,
          boxShadow:'0 4px 20px rgba(10,35,66,0.2)',
        }}>
          <div style={{ fontSize:'1.7rem', fontWeight:900, marginBottom:6 }}>🛍️ Best Products for You</div>
          <div style={{ fontSize:'0.9rem', opacity:0.88 }}>
            Electrician · Solar · Home — Amazon & Flipkart se best price mein
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:20, marginTop:14, flexWrap:'wrap' }}>
            {['✅ Verified Products','🚀 Fast Delivery','↩️ Easy Returns','💰 Best Prices'].map(t => (
              <span key={t} style={{ fontSize:'0.75rem', background:'rgba(255,255,255,0.15)', padding:'5px 12px', borderRadius:20 }}>{t}</span>
            ))}
          </div>
        </div>

        <AdSlot slot="top" style={{ marginBottom:16 }} />

        {/* Search */}
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          background:'#fff', border:'2px solid #e2e8f0', borderRadius:12,
          padding:'0 14px', marginBottom:14,
          boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <span style={{ fontSize:'1rem', color:'#94a3b8' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Product dhundho... (inverter, solar panel, wire...)"
            style={{ flex:1, border:'none', outline:'none', padding:'14px 0', fontSize:'0.9rem', background:'transparent', fontFamily:'inherit' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background:'none', border:'none', cursor:'pointer', color:'#94a3b8', fontSize:'1rem' }}>✕</button>
          )}
        </div>

        {/* Category Tabs */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginBottom:18 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              style={{
                flexShrink:0, padding:'8px 16px',
                background: category === cat.id ? '#0a2342' : '#fff',
                color:       category === cat.id ? '#fff'    : '#475569',
                border:`1.5px solid ${category === cat.id ? '#0a2342' : '#e2e8f0'}`,
                borderRadius:10, fontSize:'0.82rem', fontWeight:700,
                cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap',
                boxShadow: category === cat.id ? '0 2px 8px rgba(10,35,66,0.2)' : 'none',
              }}>
              {cat.label}
              {cat.id !== 'all' && (
                <span style={{
                  marginLeft:5, background: category === cat.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: category === cat.id ? '#fff' : '#64748b',
                  padding:'1px 6px', borderRadius:4, fontSize:'0.7rem', fontWeight:700,
                }}>
                  {catCounts[cat.id] || 0}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontSize:'0.78rem', color:'#64748b', marginBottom:14 }}>
          {filtered.length} products · {filtered.filter(p => p.was).length} on sale
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px', background:'#fff', borderRadius:12 }}>
            <div style={{ fontSize:'3rem', marginBottom:12 }}>📭</div>
            <div style={{ fontWeight:900, fontSize:'1.1rem', color:'#0f172a', marginBottom:6 }}>Koi product nahi mila</div>
            <div style={{ fontSize:'0.85rem', color:'#64748b' }}>Doosra search try karo ya category change karo</div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:14 }}>
            {filtered.map((p, i) => (
              <React.Fragment key={p.id}>
                <ProductCard p={p} />
                {(i + 1) % 6 === 0 && (
                  <div style={{ gridColumn:'1 / -1' }}>
                    <AdSlot slot="mid" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <AdSlot slot="bottom" style={{ margin:'20px 0' }} />

        {/* Disclaimer */}
        <div style={{
          background:'#fef3c7', borderLeft:'4px solid #f59e0b',
          borderRadius:8, padding:'12px 16px',
          fontSize:'0.75rem', color:'#92400e', lineHeight:1.5, marginTop:8,
        }}>
          <strong>📌 Affiliate Disclosure:</strong> Ye Amazon aur Flipkart affiliate links hain.
          Jab aap in links se kuch khareedते ho, Almenso ko commission milti hai —
          aapko koi extra charge nahi lagta. Hum sirf trusted products recommend karte hain.
        </div>
      </div>
    </>
  )
}

// ── Reusable widget for tool/blog pages ──────────────────────
export function RelatedProducts({ category = 'electrical', limit = 3 }) {
  const products = DEFAULT_PRODUCTS
    .filter(p => p.category === category)
    .slice(0, limit)

  const fallback = DEFAULT_PRODUCTS.slice(0, limit)
  const show     = products.length ? products : fallback

  return (
    <div style={{
      background:'#fff', borderRadius:12, padding:14,
      border:'1.5px solid #e2e8f0', margin:'16px 0',
    }}>
      <div style={{ fontWeight:900, fontSize:'0.9rem', color:'#0a2342', marginBottom:12 }}>🛒 Recommended Products</div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {show.map(p => (
          <a key={p.id} href={p.amazon} target="_blank" rel="noopener noreferrer sponsored"
            style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', padding:'8px', background:'#f8fafc', borderRadius:8, border:'1px solid #e2e8f0' }}>
            <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{p.img}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#0f172a', lineHeight:1.3,
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
              <div style={{ fontSize:'0.72rem', color:'#dc2626', fontWeight:700 }}>{p.price}</div>
            </div>
            <span style={{ fontSize:'0.85rem', color:'#64748b', flexShrink:0 }}>→</span>
          </a>
        ))}
      </div>
      <div style={{ fontSize:'0.62rem', color:'#94a3b8', marginTop:8 }}>Affiliate links · Commission milti hai hume</div>
    </div>
  )
}

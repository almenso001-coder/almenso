/**
 * AFFILIATE WIDGET v2 — Admin-Controlled Product Recommendations
 * Ab sare products Admin Panel → Affiliate tab se aate hain
 * Koi hardcoded link nahi — Admin panel mein jakar change karo
 */
import React, { memo, useState, useEffect } from 'react'
import { useSettings, DEFAULT_AFFILIATE_PRODUCTS } from '../context/SettingsContext'

/* ── Category to AffiliateWidget category mapping ──────────── */
const TOOL_MAP = {
  electrical:'electrical', solar:'solar', inverter:'electrical', 'home-wiring':'electrical',
  finance:'finance', gst:'finance', emi:'finance', sip:'finance', loan:'finance', tax:'finance',
  health:'health', bmi:'health', bmr:'health', 'ideal-weight':'health',
  image:'design', pdf:'design', text:'writing', generator:'tech',
  calculator:'finance', converter:'tech', construction:'construction',
}

function resolveCategory(toolCategory) {
  if (!toolCategory) return 'electrical'
  const key = toolCategory.toLowerCase().replace(/[_\s]/g, '-')
  return TOOL_MAP[key] || key
}

/* ── Deal Timer ──────────────────────────────────────────── */
function DealTimer() {
  const [secs, setSecs] = useState(3600)
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s > 0 ? s-1 : 3600), 1000)
    return () => clearInterval(t)
  }, [])
  const h = String(Math.floor(secs/3600)).padStart(2,'0')
  const m = String(Math.floor((secs%3600)/60)).padStart(2,'0')
  const s = String(secs%60).padStart(2,'0')
  return <span style={{ fontFamily:'monospace', fontWeight:900 }}>{h}:{m}:{s}</span>
}

/* ── Product Card ─────────────────────────────────────────── */
const ProductCard = memo(function ProductCard({ p }) {
  const [clicked, setClicked] = useState(false)

  const handleClick = (link) => {
    if (!link || link === '#') return
    setClicked(true)
    window.open(link, '_blank', 'noopener')
    try {
      if (window.gtag) window.gtag('event', 'affiliate_click', { item_id: p.id, item_name: p.name })
    } catch {}
    setTimeout(() => setClicked(false), 2000)
  }

  // Support both ProductsPage format (amazon/flip) and AffiliateWidget format (link)
  const amazonLink = p.link || p.amazon || '#'
  const flipLink   = p.flip || null
  const img        = p.img || p.image || '🛍️'
  const rating     = p.rating || '4.0★'
  const reviews    = p.reviews || p.rev || '1k+'

  return (
    <div style={{ background:'#fff', borderRadius:14, border:'1.5px solid #e2e8f0', overflow:'hidden', display:'flex', flexDirection:'column', transition:'box-shadow 0.2s, transform 0.2s' }}
      onMouseOver={e => { e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform='translateY(-2px)' }}
      onMouseOut={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>

      {/* Badge + Image */}
      <div style={{ position:'relative', padding:'20px 16px 12px', textAlign:'center', background:'linear-gradient(135deg,#f8fafc,#f0f9ff)' }}>
        {p.badge && (
          <div style={{ position:'absolute', top:10, left:10, background:'#ff6900', color:'#fff', fontSize:'0.6rem', fontWeight:900, padding:'3px 8px', borderRadius:99, letterSpacing:0.5 }}>
            {p.badge}
          </div>
        )}
        {p.deal && (
          <div style={{ position:'absolute', top:10, right:10, background:'#dc2626', color:'#fff', fontSize:'0.6rem', fontWeight:800, padding:'3px 7px', borderRadius:99 }}>
            🔥 {p.deal}
          </div>
        )}
        <div style={{ fontSize:'2.5rem', marginBottom:4 }}>{img}</div>
        <div style={{ fontSize:'0.55rem', color:'#94a3b8', fontWeight:700 }}>
          {rating} ({reviews})
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'12px 14px', flex:1 }}>
        <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#0f172a', marginBottom:4, lineHeight:1.3 }}>{p.name}</div>
        {p.tag && <div style={{ fontSize:'0.68rem', color:'#64748b', marginBottom:8, background:'#f1f5f9', display:'inline-block', padding:'2px 8px', borderRadius:99 }}>{p.tag}</div>}
        <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
          <span style={{ fontSize:'1rem', fontWeight:900, color:'#0f172a' }}>{p.price}</span>
          {p.was && <span style={{ fontSize:'0.72rem', color:'#94a3b8', textDecoration:'line-through' }}>{p.was}</span>}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ padding:'0 14px 14px', display:'flex', gap:6 }}>
        <button onClick={() => handleClick(amazonLink)}
          style={{ flex:1, background: clicked ? '#10b981' : 'linear-gradient(135deg,#ff9900,#e47911)', color:'#fff', border:'none', borderRadius:8, padding:'9px 4px', fontWeight:900, fontSize:'0.72rem', cursor:'pointer', transition:'all 0.2s' }}>
          {clicked ? '✓ Opened!' : (p.cta || '🛒 Amazon')}
        </button>
        {flipLink && (
          <button onClick={() => handleClick(flipLink)}
            style={{ flex:1, background:'linear-gradient(135deg,#2874f0,#1a5bcc)', color:'#fff', border:'none', borderRadius:8, padding:'9px 4px', fontWeight:900, fontSize:'0.72rem', cursor:'pointer' }}>
            🏪 Flipkart
          </button>
        )}
      </div>
    </div>
  )
})

/* ── Main Widget — Admin se products aate hain ──────────────── */
const AffiliateWidgetV2 = memo(function AffiliateWidgetV2({ toolCategory = 'electrical', maxProducts = 4, showTitle = true }) {
  const { settings } = useSettings()

  // Admin panel se products load karo — fallback to defaults
  let allProds = DEFAULT_AFFILIATE_PRODUCTS
  try {
    if (settings.affiliateProducts) {
      const parsed = JSON.parse(settings.affiliateProducts)
      allProds = { ...DEFAULT_AFFILIATE_PRODUCTS, ...parsed }
    }
  } catch {}

  const category = resolveCategory(toolCategory)
  const products = (allProds[category] || allProds.electrical || [])
    .filter(p => p.visible !== false)
    .slice(0, maxProducts)

  const hasDeal = products.some(p => p.deal)
  if (!products.length) return null

  const categoryLabels = {
    electrical:'⚡ Electrical Products', solar:'☀️ Solar Products', finance:'💰 Finance Tools',
    health:'🏥 Health Devices', design:'🎨 Creator Gear', tech:'💻 Tech Accessories',
    writing:'✍️ Writing Tools', construction:'🏗️ Construction', general:'🏷️ Top Deals'
  }

  return (
    <div style={{ background:'linear-gradient(135deg,#f8fafc,#f0f9ff)', borderRadius:16, padding:20, border:'1.5px solid #e2e8f0' }}>
      {showTitle && (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:8 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:'0.95rem', color:'#0f172a' }}>
              {categoryLabels[category] || '🏷️ Recommended Products'}
            </div>
            <div style={{ fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
              Amazon & Flipkart ke best deals — affiliate links (we earn a small commission)
            </div>
          </div>
          {hasDeal && (
            <div style={{ background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:10, padding:'6px 12px', fontSize:'0.72rem', fontWeight:800, color:'#dc2626', display:'flex', alignItems:'center', gap:6 }}>
              🔥 Deal Khatam Hone Mein: <DealTimer />
            </div>
          )}
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:14 }}>
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>

      <div style={{ marginTop:14, textAlign:'center', fontSize:'0.68rem', color:'#94a3b8' }}>
        * Affiliate links — aap pe extra charge nahi, hamare ko small commission milta hai
      </div>
    </div>
  )
})

export default AffiliateWidgetV2

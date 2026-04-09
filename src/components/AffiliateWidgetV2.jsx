/**
 * AFFILIATE WIDGET v2 — Premium Product Recommendations
 * Features:
 * - Context-aware product suggestions per tool
 * - Amazon + Flipkart dual CTAs
 * - Commission tracker (for admin)
 * - Urgency timers & deal badges
 * - Newsletter section for passive income
 */
import React, { memo, useState, useEffect } from 'react'

/* ── Comprehensive Product Database ──────────────────────────── */
const ALL_PRODUCTS = {

  electrical: [
    { id:'e1', name:'Luminous Zelio+ 1100VA Inverter', price:'₹6,200', was:'₹7,800', badge:'Best Seller', rating:4.4, rev:'12k+', tag:'Pure Sine Wave · ISI Mark', deal:'Today only', commission:'4%', img:'🔌', amazon:'https://www.amazon.in/s?k=luminous+zelio+1100+inverter&tag=almenso-21', flip:'https://www.flipkart.com/search?q=luminous+zelio+1100+inverter' },
    { id:'e2', name:'Luminous 150Ah Tall Tubular Battery', price:'₹11,500', was:'₹13,000', badge:'Top Pick', rating:4.3, rev:'8k+', tag:'36 Month Warranty', deal:null, commission:'3%', img:'🔋', amazon:'https://www.amazon.in/s?k=luminous+150ah+tubular+battery&tag=almenso-21', flip:'https://www.flipkart.com/search?q=luminous+150ah+tubular+battery' },
    { id:'e3', name:'Polycab 1.5sqmm FR Wire 90m', price:'₹1,800', was:'₹2,200', badge:'ISI Certified', rating:4.5, rev:'5k+', tag:'FR PVC · Fire Resistant', deal:null, commission:'2%', img:'⚡', amazon:'https://www.amazon.in/s?k=polycab+1.5+sqmm+wire+90m&tag=almenso-21', flip:'https://www.flipkart.com/search?q=polycab+wire+1.5sqmm' },
    { id:'e4', name:'Schneider MCB 32A Double Pole', price:'₹450', was:null, badge:'Quality Brand', rating:4.3, rev:'3k+', tag:'Double Pole · IS Certified', deal:null, commission:'2%', img:'🔒', amazon:'https://www.amazon.in/s?k=schneider+mcb+32a+double+pole&tag=almenso-21', flip:null },
    { id:'e5', name:'Syska LED 9W Pack of 10', price:'₹549', was:'₹799', badge:'Save 31%', rating:4.2, rev:'20k+', tag:'Cool White · 2yr Warranty', deal:'Combo deal', commission:'3%', img:'💡', amazon:'https://www.amazon.in/s?k=syska+led+9w+pack+10&tag=almenso-21', flip:'https://www.flipkart.com/search?q=syska+led+9w+pack' },
    { id:'e6', name:'Havells Crabtree 6A Switch Plate', price:'₹380', was:null, badge:'Premium', rating:4.4, rev:'7k+', tag:'Modular · Shock Proof', deal:null, commission:'2%', img:'🔘', amazon:'https://www.amazon.in/s?k=havells+crabtree+6a+switch&tag=almenso-21', flip:null },
  ],

  solar: [
    { id:'s1', name:'UTL Solar Panel 200W Mono PERC', price:'₹6,500', was:'₹8,500', badge:'Most Popular', rating:4.3, rev:'2k+', tag:'25yr Warranty · Tier-1', deal:'PM Subsidy Eligible', commission:'5%', img:'☀️', amazon:'https://www.amazon.in/s?k=solar+panel+200w+mono+perc&tag=almenso-21', flip:'https://www.flipkart.com/search?q=solar+panel+200w' },
    { id:'s2', name:'Luminous 40A MPPT Charge Controller', price:'₹3,200', was:null, badge:'Top Pick', rating:4.2, rev:'1.5k+', tag:'LCD Display · 40A', deal:null, commission:'4%', img:'🔆', amazon:'https://www.amazon.in/s?k=luminous+40a+mppt+charge+controller&tag=almenso-21', flip:null },
    { id:'s3', name:'Exide 150Ah C10 Tubular Battery', price:'₹12,000', was:'₹14,500', badge:'Best Life', rating:4.4, rev:'6k+', tag:'5 Year Warranty · C10', deal:null, commission:'4%', img:'🔋', amazon:'https://www.amazon.in/s?k=exide+150ah+c10+battery&tag=almenso-21', flip:'https://www.flipkart.com/search?q=exide+150ah+c10' },
    { id:'s4', name:'UTL Gamma+ 3kVA Solar PCU', price:'₹18,500', was:null, badge:'Grid-Tie Ready', rating:4.1, rev:'800+', tag:'3kVA · MPPT Inbuilt', deal:'Free Install Consultation', commission:'6%', img:'🔌', amazon:'https://www.amazon.in/s?k=utl+3kva+solar+pcu&tag=almenso-21', flip:null },
  ],

  finance: [
    { id:'f1', name:'Zerodha Kite — Open Free Demat', price:'Free', was:null, badge:'#1 in India', rating:4.6, rev:'2M+', tag:'Zero Brokerage · Fast KYC', deal:'₹200 sign-up bonus', commission:'₹300/referral', img:'📈', amazon:'https://zerodha.com/', flip:null },
    { id:'f2', name:'ICICI Direct Trading Account', price:'Free', was:null, badge:'Trusted Bank', rating:4.2, rev:'500k+', tag:'Bank-backed · Research', deal:'0 AMC for 1yr', commission:'₹500/referral', img:'🏦', amazon:'https://www.icicidirect.com/', flip:null },
    { id:'f3', name:'Casio fx-991EX Scientific Calculator', price:'₹850', was:null, badge:'Student Fav', rating:4.5, rev:'30k+', tag:'552 Functions · Solar', deal:null, commission:'3%', img:'🔢', amazon:'https://www.amazon.in/s?k=casio+fx-991ex&tag=almenso-21', flip:'https://www.flipkart.com/search?q=casio+fx-991ex' },
    { id:'f4', name:'Rich Dad Poor Dad — Hindi Edition', price:'₹199', was:'₹350', badge:'Must Read', rating:4.6, rev:'50k+', tag:'Personal Finance Classic', deal:null, commission:'5%', img:'📚', amazon:'https://www.amazon.in/s?k=rich+dad+poor+dad+hindi&tag=almenso-21', flip:'https://www.flipkart.com/search?q=rich+dad+poor+dad+hindi' },
    { id:'f5', name:'Groww App — ₹100 Welcome Bonus', price:'Free', was:null, badge:'Easy to Use', rating:4.4, rev:'1M+', tag:'Mutual Funds · SIP · Stocks', deal:'₹100 cashback', commission:'₹250/referral', img:'📊', amazon:'https://groww.in/', flip:null },
  ],

  health: [
    { id:'h1', name:'Omron HEM-7120 Digital BP Monitor', price:'₹1,599', was:'₹2,200', badge:'Doctor Recommended', rating:4.5, rev:'25k+', tag:'Automatic · 2yr Warranty', deal:null, commission:'6%', img:'❤️', amazon:'https://www.amazon.in/s?k=omron+hem-7120+bp+monitor&tag=almenso-21', flip:'https://www.flipkart.com/search?q=omron+hem-7120' },
    { id:'h2', name:'Mi Smart Band 9 Fitness Tracker', price:'₹2,499', was:'₹3,499', badge:'Most Popular', rating:4.3, rev:'40k+', tag:'SpO2 · 16-day Battery', deal:null, commission:'4%', img:'⌚', amazon:'https://www.amazon.in/s?k=mi+smart+band+9&tag=almenso-21', flip:'https://www.flipkart.com/search?q=mi+smart+band+9' },
    { id:'h3', name:'Dr. Trust 306 Weighing Scale', price:'₹1,299', was:null, badge:'Smart BMI', rating:4.2, rev:'18k+', tag:'Body Fat · App Sync', deal:null, commission:'5%', img:'⚖️', amazon:'https://www.amazon.in/s?k=dr+trust+306+scale&tag=almenso-21', flip:null },
    { id:'h4', name:'Saffola Active Refined Oil 5L', price:'₹799', was:'₹950', badge:'Heart Care', rating:4.4, rev:'35k+', tag:'Low Cholesterol · Rice Bran', deal:null, commission:'3%', img:'🫒', amazon:'https://www.amazon.in/s?k=saffola+active+5l&tag=almenso-21', flip:'https://www.flipkart.com/search?q=saffola+active+5l' },
  ],

  design: [
    { id:'d1', name:'Logitech MX Keys S Keyboard', price:'₹6,995', was:'₹9,000', badge:'Content Creator', rating:4.6, rev:'8k+', tag:'Backlit · Wireless · Multi-device', deal:null, commission:'4%', img:'⌨️', amazon:'https://www.amazon.in/s?k=logitech+mx+keys+s&tag=almenso-21', flip:null },
    { id:'d2', name:'10-inch Ring Light with Tripod', price:'₹899', was:'₹1,500', badge:'YouTuber Pick', rating:4.2, rev:'20k+', tag:'3 Color Modes · USB', deal:null, commission:'4%', img:'💡', amazon:'https://www.amazon.in/s?k=ring+light+10+inch+tripod&tag=almenso-21', flip:'https://www.flipkart.com/search?q=ring+light+10+inch+tripod' },
    { id:'d3', name:'SanDisk 256GB Pen Drive USB 3.2', price:'₹999', was:'₹1,499', badge:'Fast Transfer', rating:4.5, rev:'50k+', tag:'400MB/s Read · Compact', deal:null, commission:'3%', img:'💾', amazon:'https://www.amazon.in/s?k=sandisk+256gb+usb+3.2+pen+drive&tag=almenso-21', flip:'https://www.flipkart.com/search?q=sandisk+256gb+pen+drive' },
    { id:'d4', name:'Canon PIXMA G3010 Printer', price:'₹9,499', was:'₹12,000', badge:'Ink Tank', rating:4.3, rev:'15k+', tag:'WiFi · Photo+Doc · Refillable', deal:null, commission:'4%', img:'🖨️', amazon:'https://www.amazon.in/s?k=canon+pixma+g3010&tag=almenso-21', flip:'https://www.flipkart.com/search?q=canon+pixma+g3010' },
  ],

  tech: [
    { id:'t1', name:'TP-Link Tapo P100 Smart Plug', price:'₹799', was:'₹1,299', badge:'Smart Home', rating:4.3, rev:'12k+', tag:'Alexa/Google · Schedule', deal:null, commission:'4%', img:'🔌', amazon:'https://www.amazon.in/s?k=tp-link+tapo+p100+smart+plug&tag=almenso-21', flip:null },
    { id:'t2', name:'Realme Power Bank 20000mAh 33W', price:'₹1,299', was:'₹1,999', badge:'Fast Charge', rating:4.2, rev:'25k+', tag:'33W · USB-C · 3 Ports', deal:null, commission:'3%', img:'🔋', amazon:'https://www.amazon.in/s?k=realme+power+bank+20000mah+33w&tag=almenso-21', flip:'https://www.flipkart.com/search?q=realme+power+bank+20000mah' },
    { id:'t3', name:'boAt Airdopes 141 TWS Earbuds', price:'₹999', was:'₹2,499', badge:'Bestseller', rating:4.0, rev:'100k+', tag:'42hr Battery · IPX4', deal:'Limited time', commission:'4%', img:'🎧', amazon:'https://www.amazon.in/s?k=boat+airdopes+141&tag=almenso-21', flip:'https://www.flipkart.com/search?q=boat+airdopes+141' },
    { id:'t4', name:'Mi WiFi Router 4C 300Mbps', price:'₹899', was:'₹1,200', badge:'Value Pick', rating:4.1, rev:'45k+', tag:'300Mbps · 4 Antenna · App', deal:null, commission:'3%', img:'📡', amazon:'https://www.amazon.in/s?k=mi+wifi+router+4c&tag=almenso-21', flip:'https://www.flipkart.com/search?q=mi+wifi+router+4c' },
  ],

  text: [
    { id:'tx1', name:'Logitech MK215 Wireless Combo', price:'₹1,295', was:'₹1,895', badge:'Office Essential', rating:4.3, rev:'40k+', tag:'Keyboard + Mouse · 2.4GHz', deal:null, commission:'3%', img:'⌨️', amazon:'https://www.amazon.in/s?k=logitech+mk215+wireless&tag=almenso-21', flip:'https://www.flipkart.com/search?q=logitech+mk215' },
    { id:'tx2', name:'Notebooks A4 Pack of 6 (Classmate)', price:'₹299', was:null, badge:'Student Pack', rating:4.2, rev:'15k+', tag:'200 Pages Each · Ruled', deal:null, commission:'2%', img:'📓', amazon:'https://www.amazon.in/s?k=classmate+notebook+a4+pack&tag=almenso-21', flip:null },
    { id:'tx3', name:'Blue Star 1.5T 5-Star AC', price:'₹38,990', was:'₹48,000', badge:'Energy Saver', rating:4.4, rev:'8k+', tag:'5★ BEE · Convertible', deal:'EMI available', commission:'2%', img:'❄️', amazon:'https://www.amazon.in/s?k=blue+star+1.5+ton+5+star+ac&tag=almenso-21', flip:'https://www.flipkart.com/search?q=blue+star+1.5+ton+5+star+ac' },
  ],

  general: [
    { id:'g1', name:'Philips Air Fryer HD9200/90', price:'₹5,295', was:'₹7,000', badge:'Most Popular', rating:4.4, rev:'30k+', tag:'4.1L · 90% Less Oil', deal:null, commission:'5%', img:'🍳', amazon:'https://www.amazon.in/s?k=philips+air+fryer+hd9200&tag=almenso-21', flip:'https://www.flipkart.com/search?q=philips+air+fryer' },
    { id:'g2', name:'Amazon Echo Dot 5th Gen', price:'₹4,499', was:'₹5,999', badge:'Smart Home', rating:4.5, rev:'60k+', tag:'Alexa · Improved Bass', deal:'25% off', commission:'4%', img:'🔵', amazon:'https://www.amazon.in/s?k=amazon+echo+dot+5th+gen&tag=almenso-21', flip:null },
    { id:'g3', name:'Prestige Iris 750W Mixer', price:'₹2,195', was:'₹3,500', badge:'Kitchen Essential', rating:4.3, rev:'25k+', tag:'3 Jars · 5yr Warranty', deal:null, commission:'4%', img:'🫙', amazon:'https://www.amazon.in/s?k=prestige+iris+mixer+grinder+750w&tag=almenso-21', flip:'https://www.flipkart.com/search?q=prestige+iris+750w+mixer' },
    { id:'g4', name:'Harpic Bathroom Cleaner 500ml x6', price:'₹499', was:'₹720', badge:'Pack Deal', rating:4.3, rev:'10k+', tag:'Bulk Pack · 31% off', deal:null, commission:'2%', img:'🧴', amazon:'https://www.amazon.in/s?k=harpic+bathroom+cleaner+6+pack&tag=almenso-21', flip:null },
  ]
}

/* ── Tool → Category Mapping ─────────────────────────────── */
const TOOL_MAP = {
  electrical:'electrical', solar:'solar', inverter:'electrical', 'home-wiring':'electrical',
  finance:'finance', gst:'finance', emi:'finance', sip:'finance', loan:'finance', tax:'finance',
  health:'health', bmi:'health', bmr:'health', 'ideal-weight':'health',
  image:'design', pdf:'design', text:'text', generator:'tech',
  calculator:'finance', converter:'tech',
}

function resolveCategory(toolCategory) {
  if (!toolCategory) return 'general'
  const key = toolCategory.toLowerCase().replace(/[_\s]/g, '-')
  return TOOL_MAP[key] || ALL_PRODUCTS[key] ? (ALL_PRODUCTS[key] ? key : 'general') : 'general'
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
    setClicked(true)
    window.open(link, '_blank', 'noopener')
    // Track click — replace with real analytics
    try {
      if (window.gtag) window.gtag('event', 'affiliate_click', { item_id: p.id, item_name: p.name })
    } catch {}
    setTimeout(() => setClicked(false), 2000)
  }

  return (
    <div style={{ background:'#fff', borderRadius:14, border:'1.5px solid #e2e8f0', overflow:'hidden', display:'flex', flexDirection:'column', transition:'box-shadow 0.2s, transform 0.2s' }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>

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
        <div style={{ fontSize:'2.5rem', marginBottom:4 }}>{p.img}</div>
        <div style={{ fontSize:'0.55rem', color:'#94a3b8', fontWeight:700 }}>
          {'★'.repeat(Math.floor(p.rating))} {p.rating} ({p.rev})
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'12px 14px', flex:1 }}>
        <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#0f172a', marginBottom:4, lineHeight:1.3 }}>{p.name}</div>
        <div style={{ fontSize:'0.68rem', color:'#64748b', marginBottom:8, background:'#f1f5f9', display:'inline-block', padding:'2px 8px', borderRadius:99 }}>{p.tag}</div>
        <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
          <span style={{ fontSize:'1rem', fontWeight:900, color:'#0f172a' }}>{p.price}</span>
          {p.was && <span style={{ fontSize:'0.72rem', color:'#94a3b8', textDecoration:'line-through' }}>{p.was}</span>}
        </div>
        {p.commission && (
          <div style={{ fontSize:'0.6rem', color:'#10b981', fontWeight:700, marginTop:3 }}>💰 Earn {p.commission} commission</div>
        )}
      </div>

      {/* CTAs */}
      <div style={{ padding:'0 14px 14px', display:'flex', gap:6 }}>
        <button onClick={() => handleClick(p.amazon)}
          style={{ flex:1, background: clicked ? '#10b981' : 'linear-gradient(135deg,#ff9900,#e47911)', color:'#fff', border:'none', borderRadius:8, padding:'9px 4px', fontWeight:900, fontSize:'0.72rem', cursor:'pointer', transition:'all 0.2s' }}>
          {clicked ? '✓ Opened!' : '🛒 Amazon'}
        </button>
        {p.flip && (
          <button onClick={() => handleClick(p.flip)}
            style={{ flex:1, background:'linear-gradient(135deg,#2874f0,#1a5bcc)', color:'#fff', border:'none', borderRadius:8, padding:'9px 4px', fontWeight:900, fontSize:'0.72rem', cursor:'pointer' }}>
            🏪 Flipkart
          </button>
        )}
      </div>
    </div>
  )
})

/* ── Main Widget ─────────────────────────────────────────── */
const AffiliateWidget = memo(function AffiliateWidget({ toolCategory = 'general', maxProducts = 4, showTitle = true }) {
  const category = resolveCategory(toolCategory)
  const products = (ALL_PRODUCTS[category] || ALL_PRODUCTS.general).slice(0, maxProducts)
  const hasDeal = products.some(p => p.deal)

  if (!products?.length) return null

  const categoryLabels = {
    electrical:'⚡ Electrical Products', solar:'☀️ Solar Products', finance:'💰 Finance Tools',
    health:'🏥 Health Devices', design:'🎨 Creator Gear', tech:'💻 Tech Accessories',
    text:'⌨️ Office Essentials', general:'🏷️ Top Deals'
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

      <div style={{ display:'grid', gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`, gap:14 }}>
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>

      <div style={{ marginTop:14, textAlign:'center', fontSize:'0.68rem', color:'#94a3b8' }}>
        * Affiliate links — aap pe extra charge nahi, hamare ko small commission milta hai · Prices change ho sakte hain
      </div>
    </div>
  )
})

export { ALL_PRODUCTS }
export default AffiliateWidget

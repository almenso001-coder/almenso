/**
 * AFFILIATE WIDGET — Context-aware product recommendations
 * Shows products relevant to current tool being used
 * Tracks clicks via GA4
 */
import React, { memo } from 'react'
import './AffiliateWidget.css'

// ── Product Database — Tool-Specific ──────────────────────────
export const AFFILIATE_PRODUCTS = {

  // ⚡ ELECTRICITY / SOLAR — Highest Commission (3–8%)
  electrical: [
    { id:'e1', name:'Luminous Zelio+ 1100 Inverter',  price:'₹6,200',  was:'₹7,800',  badge:'Best Seller', img:'🔌', rating:'4.4★', reviews:'12k+', tag:'1100VA Pure Sine Wave', link:'https://www.amazon.in/s?k=luminous+zelio+1100+inverter&tag=almenso-21',        cta:'Buy on Amazon' },
    { id:'e2', name:'Luminous 150Ah Tubular Battery', price:'₹11,500', was:'₹13,000', badge:'Top Pick',    img:'🔋', rating:'4.3★', reviews:'8k+',  tag:'Tall Tubular · 36mo warranty', link:'https://www.amazon.in/s?k=luminous+150ah+tubular+battery&tag=almenso-21',   cta:'Buy on Amazon' },
    { id:'e3', name:'Havells 1200mm Ceiling Fan',     price:'₹2,400',  was:null,       badge:'Energy Saver',img:'🌀', rating:'4.2★', reviews:'5k+',  tag:'5-Star Rated · BEE Approved', link:'https://www.amazon.in/s?k=havells+1200mm+ceiling+fan&tag=almenso-21',        cta:'Buy on Amazon' },
    { id:'e4', name:'Polycab 1.5sqmm Wire 90m',      price:'₹1,800',  was:'₹2,100',  badge:'Best Value',  img:'⚡', rating:'4.5★', reviews:'3k+',  tag:'FR PVC · ISI Marked',         link:'https://www.amazon.in/s?k=polycab+1.5+sqmm+wire+90m&tag=almenso-21',        cta:'Buy on Amazon' },
    { id:'e5', name:'Syska LED Bulb 9W Pack of 6',   price:'₹349',    was:'₹499',     badge:'Save 30%',   img:'💡', rating:'4.1★', reviews:'15k+', tag:'Energy Saving · 2yr warranty', link:'https://www.amazon.in/s?k=syska+led+bulb+9w+pack+6&tag=almenso-21',         cta:'Buy on Amazon' },
    { id:'e6', name:'Schneider MCB 32A DP',          price:'₹450',    was:null,       badge:null,          img:'🔒', rating:'4.3★', reviews:'2k+',  tag:'Double Pole · ISI Certified', link:'https://www.amazon.in/s?k=schneider+mcb+32a+dp&tag=almenso-21',             cta:'Buy on Amazon' },
  ],

  solar: [
    { id:'s1', name:'UTL Solar Panel 200W',           price:'₹6,500',  was:'₹8,000',  badge:'Most Popular', img:'☀️', rating:'4.3★', reviews:'2k+',  tag:'Mono PERC · 25yr warranty',  link:'https://www.amazon.in/s?k=solar+panel+200w+mono+perc&tag=almenso-21',       cta:'Buy on Amazon' },
    { id:'s2', name:'Luminous 40A MPPT Charge Ctrl', price:'₹3,200',  was:null,       badge:'Top Pick',     img:'🔆', rating:'4.2★', reviews:'1.5k+',tag:'40A MPPT · LCD Display',      link:'https://www.amazon.in/s?k=luminous+40a+mppt+charge+controller&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'s3', name:'Exide 150Ah C10 Battery',       price:'₹12,000', was:'₹14,000', badge:'Best Life',    img:'🔋', rating:'4.4★', reviews:'6k+',  tag:'C10 Rated · 5yr warranty',   link:'https://www.amazon.in/s?k=exide+150ah+c10+battery&tag=almenso-21',          cta:'Buy on Amazon' },
    { id:'s4', name:'UTL Gamma+ 3kVA Solar Inverter',price:'₹18,500', was:null,       badge:'Subsidy Eligible', img:'🔌', rating:'4.1★', reviews:'800+', tag:'3kVA PCU · Grid-Tie Ready', link:'https://www.amazon.in/s?k=utl+3kva+solar+inverter+pcu&tag=almenso-21',     cta:'Buy on Amazon' },
  ],

  // 💰 FINANCE — 1–3% Commission
  finance: [
    { id:'f1', name:'Tally ERP 9 Book (Latest)',     price:'₹499',    was:null,       badge:'Bestseller',  img:'📒', rating:'4.4★', reviews:'3k+',  tag:'GST Filing · Hindi+English', link:'https://www.amazon.in/s?k=tally+erp+9+book+gst&tag=almenso-21',             cta:'Buy on Amazon' },
    { id:'f2', name:'CA Foundation Books Set',       price:'₹1,800',  was:'₹2,400',  badge:'2025 Edition', img:'📚', rating:'4.2★', reviews:'1k+',  tag:'Latest Syllabus · All papers', link:'https://www.amazon.in/s?k=ca+foundation+books+2025&tag=almenso-21',         cta:'Buy on Amazon' },
    { id:'f3', name:'Casio Scientific Calculator',   price:'₹850',    was:null,       badge:'Student Fav', img:'🔢', rating:'4.5★', reviews:'25k+', tag:'fx-991EX · 552 Functions',   link:'https://www.amazon.in/s?k=casio+fx-991ex+scientific+calculator&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'f4', name:'Personal Finance Book (Hindi)', price:'₹299',    was:'₹450',    badge:'Top Rated',   img:'📖', rating:'4.3★', reviews:'2k+',  tag:'Investment · Savings Guide',  link:'https://www.amazon.in/s?k=personal+finance+book+hindi&tag=almenso-21',      cta:'Buy on Amazon' },
  ],

  // 🖼️ IMAGE TOOLS — 2–5% Commission
  design: [
    { id:'d1', name:'Mivi DuoPods Wireless',         price:'₹999',    was:'₹1,499',  badge:'Top Choice',  img:'🎧', rating:'4.1★', reviews:'18k+', tag:'40hr backup · ENC Mic',       link:'https://www.amazon.in/s?k=mivi+duopods+earbuds&tag=almenso-21',             cta:'Buy on Amazon' },
    { id:'d2', name:'Ring Light 10 inch (Selfie)',   price:'₹699',    was:'₹1,200',  badge:'Content Creator',img:'💡', rating:'4.2★', reviews:'12k+',tag:'Adjustable Color · USB',     link:'https://www.amazon.in/s?k=ring+light+10+inch+selfie&tag=almenso-21',        cta:'Buy on Amazon' },
    { id:'d3', name:'SanDisk 128GB Pen Drive',       price:'₹599',    was:'₹799',    badge:'Fast Read',   img:'💾', rating:'4.4★', reviews:'40k+', tag:'USB 3.1 · 130MB/s',          link:'https://www.amazon.in/s?k=sandisk+128gb+pen+drive+usb+3&tag=almenso-21',   cta:'Buy on Amazon' },
    { id:'d4', name:'Canon PIXMA Inkjet Printer',    price:'₹5,999',  was:'₹7,500',  badge:'Best Value',  img:'🖨️', rating:'4.1★', reviews:'8k+',  tag:'WiFi · Photo + Doc',         link:'https://www.amazon.in/s?k=canon+pixma+inkjet+printer+wifi&tag=almenso-21',  cta:'Buy on Amazon' },
  ],

  // 🏥 HEALTH — 3–8% Commission (High value!)
  health: [
    { id:'h1', name:'Omron Digital BP Monitor',     price:'₹1,599',  was:'₹2,000',  badge:'Doctor Recommended', img:'❤️', rating:'4.5★', reviews:'20k+', tag:'Automatic · Irregular Heartbeat', link:'https://www.amazon.in/s?k=omron+digital+blood+pressure+monitor&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'h2', name:'Dr. Trust Weighing Scale',     price:'₹1,299',  was:null,       badge:'Smart Scale',  img:'⚖️', rating:'4.2★', reviews:'15k+', tag:'Body Fat · BMI · App Sync',   link:'https://www.amazon.in/s?k=dr+trust+smart+weighing+scale+bmi&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'h3', name:'Mi Band 8 Fitness Tracker',    price:'₹2,499',  was:'₹3,499',  badge:'Most Popular', img:'⌚', rating:'4.3★', reviews:'30k+', tag:'SpO2 · 16 day battery',       link:'https://www.amazon.in/s?k=mi+band+8+smart+fitness+tracker&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'h4', name:'Protinex Protein Supplement',  price:'₹549',    was:'₹649',    badge:'Nutritionist Pick', img:'💪', rating:'4.1★', reviews:'10k+', tag:'Vanilla 250g · 28g Protein', link:'https://www.amazon.in/s?k=protinex+protein+powder+vanilla&tag=almenso-21', cta:'Buy on Amazon' },
  ],

  // 🔧 TECH/GENERATORS — 2–5% Commission
  tech: [
    { id:'t1', name:'TP-Link Tapo Smart Plug',      price:'₹999',    was:'₹1,299',  badge:'Smart Home',  img:'🔌', rating:'4.3★', reviews:'8k+',  tag:'Voice Control · Energy Monitor', link:'https://www.amazon.in/s?k=tp+link+tapo+smart+plug+wifi&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'t2', name:'Logitech MK215 Wireless Combo',price:'₹1,295',  was:'₹1,795',  badge:'Office Pick', img:'⌨️', rating:'4.3★', reviews:'35k+', tag:'Keyboard + Mouse · 2.4GHz',   link:'https://www.amazon.in/s?k=logitech+mk215+wireless+keyboard+mouse&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'t3', name:'Realme Power Bank 20000mAh',   price:'₹1,299',  was:'₹1,799',  badge:'Fast Charge', img:'🔋', rating:'4.2★', reviews:'22k+', tag:'22.5W · USB-C · Dual Out',   link:'https://www.amazon.in/s?k=realme+power+bank+20000mah+fast+charge&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'t4', name:'YubiKey Security Key',         price:'₹4,199',  was:null,       badge:'Security Pro', img:'🔐', rating:'4.6★', reviews:'5k+',  tag:'FIDO2 · NFC · USB-A',        link:'https://www.amazon.in/s?k=yubikey+security+key+fido2&tag=almenso-21',      cta:'Buy on Amazon' },
  ],

  // 🏗️ CONSTRUCTION — 3–6% Commission
  construction: [
    { id:'c1', name:'Stanley 5m Tape Measure',      price:'₹349',    was:null,       badge:'Professional', img:'📏', rating:'4.4★', reviews:'12k+', tag:'Magnetic · Auto-Lock',        link:'https://www.amazon.in/s?k=stanley+tape+measure+5m&tag=almenso-21',         cta:'Buy on Amazon' },
    { id:'c2', name:'Bosch Drill Machine 500W',     price:'₹2,899',  was:'₹3,500',  badge:'Top Seller',  img:'🔨', rating:'4.3★', reviews:'9k+',  tag:'500W · 10mm Chuck · 2 Speed', link:'https://www.amazon.in/s?k=bosch+gsb+500w+drill+machine&tag=almenso-21',    cta:'Buy on Amazon' },
    { id:'c3', name:'Asian Paints Tractor Emulsion', price:'₹1,250', was:null,       badge:'Best Paint',  img:'🎨', rating:'4.2★', reviews:'4k+',  tag:'1L · Weather Proof · Washable', link:'https://www.amazon.in/s?k=asian+paints+tractor+emulsion+1l&tag=almenso-21', cta:'Buy on Amazon' },
  ],

  // 📝 WRITING/CONTENT — 3–5% Commission
  writing: [
    { id:'w1', name:'Keychron K2 Mechanical Keyboard',price:'₹6,999',was:'₹7,999',  badge:'Writer\'s Choice',img:'⌨️',rating:'4.5★', reviews:'6k+',  tag:'Hot-Swappable · Mac/Win',    link:'https://www.amazon.in/s?k=keychron+k2+mechanical+keyboard&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'w2', name:'Blue Light Blocking Glasses',   price:'₹599',   was:'₹999',    badge:'Eye Protection',img:'👓', rating:'4.1★', reviews:'8k+',  tag:'Anti-Glare · Screen Work',   link:'https://www.amazon.in/s?k=blue+light+blocking+glasses+computer&tag=almenso-21', cta:'Buy on Amazon' },
    { id:'w3', name:'Lamy Safari Fountain Pen',      price:'₹1,299', was:null,       badge:'Premium Write', img:'✒️', rating:'4.4★', reviews:'3k+',  tag:'EF Nib · Blue Cartridge',    link:'https://www.amazon.in/s?k=lamy+safari+fountain+pen&tag=almenso-21',        cta:'Buy on Amazon' },
  ],

  // Default — show electrical products
  default: [],
}

// Map tool paths to product categories
export const TOOL_PRODUCT_MAP = {
  '/tools/bijli':                         'electrical',
  '/tools/bijli-bill-calculator':         'electrical',
  '/tools/electricity-bill-analyzer':     'electrical',
  '/tools/electricity-cost-calculator':   'electrical',
  '/tools/power-consumption-calculator':  'electrical',
  '/tools/power-consumption-planner':     'electrical',
  '/tools/appliance-power-calculator':    'electrical',
  '/tools/inverter-load-planner':         'electrical',
  '/tools/battery-backup-calculator':     'electrical',
  '/tools/wire-size-calculator':          'electrical',
  '/tools/voltage-drop-calculator':       'electrical',
  '/tools/solar-roi':                     'solar',
  '/tools/solar-panel-calculator':        'solar',
  '/tools/gst-calculator':               'finance',
  '/tools/emi-calculator':               'finance',
  '/tools/loan-calculator':              'finance',
  '/tools/profit-margin-calculator':     'finance',
  '/tools/salary-calculator':            'finance',
  '/tools/discount-calculator':          'finance',
  '/tools/image-compressor':             'design',
  '/tools/image-resizer':                'design',
  '/tools/image-format-converter':       'design',
  '/tools/background-remover':           'design',
  '/tools/image-cropper':                'design',
  '/tools/bmi-calculator':              'health',
  '/tools/bmr-calculator':              'health',
  '/tools/ideal-weight-calculator':      'health',
  '/tools/age-calculator':              'health',
  '/tools/password-generator':          'tech',
  '/tools/qr-code-generator':           'tech',
  '/tools/ai-prompt-generator':         'tech',
  '/tools/word-counter':                'writing',
  '/tools/text-case-converter':         'writing',
  '/tools/concrete-calculator':         'construction',
  '/tools/paint-calculator':            'construction',
  '/tools/tile-calculator':             'construction',
  '/tools/flooring-calculator':         'construction',
}

// ── Main Component ────────────────────────────────────────────
const AffiliateWidget = memo(function AffiliateWidget({
  category = 'electrical',
  limit    = 3,
  title    = '🛒 Recommended Products',
  layout   = 'horizontal', // 'horizontal' | 'grid' | 'compact'
  toolPath = null,
}) {
  // Auto-detect category from tool path
  const cat = toolPath ? (TOOL_PRODUCT_MAP[toolPath] || category) : category
  const products = (AFFILIATE_PRODUCTS[cat] || AFFILIATE_PRODUCTS.electrical).slice(0, limit)

  if (!products.length) return null

  const trackClick = (product) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        product_name:     product.name,
        product_category: cat,
        product_id:       product.id,
      })
    }
  }

  return (
    <div className={`afw-wrap afw-${layout}`}>
      <div className="afw-head">
        <div className="afw-title">{title}</div>
        <div className="afw-sub">Expert picks · Trusted brands · Amazon pe best price</div>
      </div>

      <div className="afw-products">
        {products.map(p => (
          <a key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="afw-card"
            onClick={() => trackClick(p)}
            aria-label={`Buy ${p.name} on Amazon`}>

            {p.badge && <span className="afw-badge">{p.badge}</span>}

            <div className="afw-img">{p.img}</div>

            <div className="afw-info">
              <div className="afw-name">{p.name}</div>
              <div className="afw-tag">{p.tag}</div>
              <div className="afw-rating">{p.rating} <span>({p.reviews} reviews)</span></div>
              <div className="afw-price-row">
                <span className="afw-price">{p.price}</span>
                {p.was && <span className="afw-was">{p.was}</span>}
                {p.was && (
                  <span className="afw-save">
                    Save {Math.round((1 - parseInt(p.price.replace(/[^0-9]/g,'')) / parseInt(p.was.replace(/[^0-9]/g,''))) * 100)}%
                  </span>
                )}
              </div>
            </div>

            <div className="afw-cta">
              <span className="afw-btn">
                🛒 {p.cta}
              </span>
              <span className="afw-prime">✓ Amazon Prime</span>
            </div>
          </a>
        ))}
      </div>

      <div className="afw-disclaimer">
        Disclosure: Some links are affiliate links. Aapko koi extra cost nahi hota.
      </div>
    </div>
  )
})

export default AffiliateWidget

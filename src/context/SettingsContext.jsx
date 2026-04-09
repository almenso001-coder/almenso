import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DEFAULT_SETTINGS = {
  // ── Basic Info ────────────────────────────────────────────
  siteName:          'Almenso',
  tagline:           'Haldwani Ka Digital Sahayak',
  phone:             '+919258133689',
  whatsapp:          '919258133689',
  email:             'support@almenso.com',
  address:           'Haldwani, Uttarakhand — 263139',

  // ── Google Analytics 4 ───────────────────────────────────
  ga4MeasurementId:  '',
  searchConsoleCode: '',

  // ── AdSense ───────────────────────────────────────────────
  adsenseClient:     '',
  adsenseSlotTop:    '',
  adsenseSlotMid:    '',
  adsenseSlotBottom: '',

  // ── Service Areas ────────────────────────────────────────
  electricianAreas: 'Haldwani City,Kathgodam,Lalkuan,Banbhoolpura,Nainital Road,Transport Nagar,Indira Nagar,Sheetla Market,Rampur Road,Bareilly Road,Gaujajali,Govind Nagar',
  solarAreas:       'Haldwani,Kathgodam,Nainital,Bhowali,Ramnagar,Rudrapur,Kashipur,Bajpur,Khatima,Sitarganj,Champawat,Almora',
  interiorAreas:    'Haldwani,Nainital,Bhowali,Ramnagar,Bhimtal,Rudrapur,Kashipur,Bazpur,Jaspur,Sitarganj,Khatima,Gadarpur',

  // ── About Page ────────────────────────────────────────────
  aboutHeading:      'Almenso — Haldwani Ka Digital Sahayak',
  aboutTagline:      'Free Tools · Electrician Service · Solar Solutions · Interior Design',
  aboutDesc:         'Almenso ek multi-service platform hai jo Haldwani aur Uttarakhand ke logon ke liye banaya gaya hai. Hum free online tools, electrician service, solar solutions, aur interior design — sab ek jagah provide karte hain.',
  aboutMission:      'Haldwani ke logon ko best digital tools aur trusted local services provide karna — bilkul free ya fair price pe.',
  aboutFeatures:     '✅ 100+ Free Tools (GST, EMI, Bijli Bill)\n✅ Same-Day Electrician Service — Haldwani\n✅ Solar & Battery Solutions — Uttarakhand\n✅ Interior Design — Nainital & USN\n✅ No Login Required for Tools',
  aboutExtra:        '',

  // ── Contact Page ──────────────────────────────────────────
  contactHeading:    'Hamse Baat Karo',
  contactSubtext:    'Electrician booking, solar quote, interior design — ya koi bhi sawaal — WhatsApp karo ya form bharein',
  contactMapUrl:     '',

  // ── Privacy / Terms / Disclaimer ──────────────────────────
  privacyLastUpdated:   'March 2026',
  privacyCustomText:    '',
  termsLastUpdated:     'March 2026',
  termsCustomText:      '',
  disclaimerCustomText: '',

  // ════════════════════════════════════════════════════════
  // ── ELECTRICIAN PAGE ─────────────────────────────────────
  // ════════════════════════════════════════════════════════
  elec_heroTitle:    'Trusted Electrician',
  elec_heroEm:       'Haldwani — Same Day',
  elec_heroSub:      'Home wiring · Inverter install · AC repair · Fan fitting\nFree estimate · No advance · ISI-certified work',
  elec_stat1n:'500+', elec_stat1l:'Jobs Done',
  elec_stat2n:'4.9★', elec_stat2l:'Rating',
  elec_stat3n:'Same Day', elec_stat3l:'Service',
  elec_stat4n:'₹0', elec_stat4l:'Advance',
  elec_trustBadges: '⚡ 1–3 hr response|✅ Free estimate|💯 Warranty on work|🔒 ISI certified',
  elec_reviewsTitle: '500+ Khush Customers',
  elec_reviewCount: '500+',
  elec_services: JSON.stringify([
    { id:'e1', emoji:'🔌', name:'Home Wiring',          price:'₹500+',  description:'Nayi wiring, rewiring, concealed wiring — guaranteed quality.',        available:true },
    { id:'e2', emoji:'🔋', name:'Inverter Installation', price:'₹300+',  description:'Inverter + battery fit karna, existing inverter repair ya replace.',    available:true },
    { id:'e3', emoji:'🔧', name:'Electrical Repair',     price:'₹200+',  description:'Short circuit fix, MCB trip, sparking switch — tez aur safe repair.',   available:true },
    { id:'e4', emoji:'🌀', name:'Fan Installation',       price:'₹150+',  description:'Ceiling fan, exhaust fan, table fan — installation aur balancing.',     available:true },
    { id:'e5', emoji:'❄️', name:'AC Service / Repair',   price:'₹400+',  description:'AC gas filling, service, PCB repair, installation.',                   available:true },
    { id:'e6', emoji:'💡', name:'LED Light Fitting',      price:'₹100+',  description:'LED panel, strip light, downlight — wiring sahit fitting.',             available:true },
    { id:'e7', emoji:'⚡', name:'MCB / DB Box Work',      price:'₹350+',  description:'DB box fitting, MCB replace, ELCB install — safe earthing ke saath.',  available:true },
    { id:'e8', emoji:'☀️', name:'Solar Panel Wiring',    price:'₹800+',  description:'Solar panel + inverter wiring, earthing, battery connection.',          available:true },
  ]),
  elec_reviews: JSON.stringify([
    { name:'Ramesh Tiwari', city:'Haldwani',       stars:5, text:'Wiring ka kaam same day ho gaya — 2 ghante mein electrician aa gaya. Price bhi fair tha. Dobara zaroor bulaunga!', svc:'Home Wiring' },
    { name:'Seema Joshi',   city:'Kathgodam',       stars:5, text:'Inverter installation mein koi problem nahi — professional tarike se kaam kiya. Battery bhi suggest ki best wali.', svc:'Inverter Install' },
    { name:'Anil Rawat',    city:'Transport Nagar', stars:5, text:'Short circuit fix kiya — quickly aur safely. MCB upgrade bhi kiya. Bahut satisfied hoon. Trusted electrician!', svc:'Electrical Repair' },
    { name:'Priya Bisht',   city:'Banbhoolpura',    stars:5, text:'3 fan install karwaye — bilkul sahi balancing ke saath. Koi bhi jhanjhat nahi. Same day service di. Thank you!', svc:'Fan Installation' },
  ]),
  elec_faqs: JSON.stringify([
    { q:'Kya same-day service milti hai?',    a:'Haan! Emergency calls pe 1-3 ghante mein pahunch jaate hain. Normal booking ke liye 3-6 ghante mein.' },
    { q:'Kya free estimate milta hai?',       a:'Chhote kaam ke liye site visit free hai. Bade projects mein pehle estimate diya jaata hai — koi advance nahi.' },
    { q:'Kya warranty milti hai?',            a:'Haan! Wiring aur major work pe warranty di jaati hai — defect hone pe free repair.' },
    { q:'Payment kaise hoti hai?',            a:'Cash, UPI (PhonePe, GPay, Paytm) — koi bhi. Advance nahi lagta chhote kaam pe.' },
    { q:'Service area kahan tak hai?',        a:'Haldwani city, Kathgodam, Lalkuan, Transport Nagar, Indira Nagar, Banbhoolpura aur nearby areas.' },
    { q:'Kya raat ko emergency service hai?', a:'Haan, emergency situations mein after-hours service available hai — WhatsApp karo pehle.' },
  ]),
  elec_guarantees: 'Free estimate — no hidden charges|Same-day response on emergency|ISI certified materials used|Written warranty on major work|No payment before work starts',

  // ════════════════════════════════════════════════════════
  // ── SOLAR PAGE ───────────────────────────────────────────
  // ════════════════════════════════════════════════════════
  solar_heroTitle:  'Bijli Bill 90% Kam Karo',
  solar_heroEm:     'Solar Se Apna Ghar Chalao',
  solar_heroSub:    'PM Surya Ghar subsidy ke saath solar lagao — 40% government subsidy milegi. Free site visit · Expert installation · 25 saal warranty.',
  solar_stat1n:'40%',  solar_stat1l:'Govt Subsidy',
  solar_stat2n:'5–7yr',solar_stat2l:'Payback',
  solar_stat3n:'25yr', solar_stat3l:'Panel Life',
  solar_stat4n:'200+', solar_stat4l:'Installed',
  solar_urgency:    'Is hafte sirf 3 slots available!',
  solar_reviewCount:'200+',
  solar_services: JSON.stringify([
    { emoji:'☀️', name:'Solar Panel System',   from:'₹35,000', was:'₹45,000', badge:'Most Popular', desc:'1kW–10kW rooftop solar — grid-tie ya off-grid. 40% PM subsidy apply karwa denge.' },
    { emoji:'🔋', name:'Inverter + Battery',    from:'₹8,000',  was:null,      badge:null,           desc:'Luminous, Exide, Amaron — installation + old battery exchange bhi milega.' },
    { emoji:'🔌', name:'Solar Inverter Hybrid', from:'₹12,000', was:null,      badge:'New',          desc:'Solar + grid + battery — teeno ka combined power backup system.' },
    { emoji:'🚿', name:'Solar Geyser',          from:'₹15,000', was:'₹19,000', badge:'Save ₹4,000',  desc:'100L–200L solar water heater — garam paani ka bijli bill zero!' },
    { emoji:'🚗', name:'Car Battery',           from:'₹3,500',  was:null,      badge:null,           desc:'All brands — home visit pe check + replacement, koi jhanjhat nahi.' },
    { emoji:'⚡', name:'Solar Wiring & AMC',    from:'₹500',    was:null,      badge:null,           desc:'Existing solar system ka maintenance, wiring repair, panel cleaning.' },
  ]),
  solar_reviews: JSON.stringify([
    { name:'Rajesh Verma',  city:'Haldwani', stars:5, text:'4kW system lagwaya ₹65,000 mein. Bill ₹2,200 se ₹180 ho gaya. Subsidy bhi mili. Best decision!',    service:'Solar Panel 4kW' },
    { name:'Priya Negi',    city:'Nainital', stars:5, text:'Solar geyser lagwaya — garam paani ki tension khatam. Installation ek din mein. Bahut professional.', service:'Solar Geyser' },
    { name:'Suresh Kumar',  city:'Rudrapur', stars:5, text:'Inverter + battery lagwaya ghar mein. Light jaati hai toh ab koi problem nahi. Fair price mila.',     service:'Inverter + Battery' },
    { name:'Anita Bisht',   city:'Ramnagar', stars:5, text:'PM subsidy paperwork mein itni help ki! Ek hafte mein subsidy bhi aayi. Highly recommend karta hoon.', service:'PM Subsidy Help' },
  ]),
  solar_faqs: JSON.stringify([
    { q:'PM Surya Ghar subsidy kitni milti hai?',      a:'Govt 40% tak subsidy deti hai — 1kW ke liye ₹14,588, 2kW ke liye ₹29,176, 3kW ke liye ₹43,764. Hum poora paperwork karwate hain.' },
    { q:'Kitne time mein investment vasool hoti hai?', a:'Typically 5–7 saal mein. Subsidy ke saath aur bhi kam. Baad ke 15–18 saal free bijli milti hai.' },
    { q:'Bijli nahi hogi toh kya hoga?',              a:'Battery backup system mein grid na ho toh bhi bijli milti hai. Grid-tie system mein grid zaroori hai — hybrid best option hai.' },
    { q:'Panel ki life kitni hoti hai?',              a:'Quality solar panels 25 saal tak performance guarantee ke saath aate hain. Degradation sirf 0.5–0.7% per year.' },
    { q:'Kya cloudy days mein bhi kaam karta hai?',   a:'Haan! Diffused sunlight mein bhi 30–50% output milta hai. Uttarakhand mein average 5–6 peak sun hours hain.' },
  ]),
  solar_guarantees: '25 saal panel performance warranty|5 saal inverter warranty|1 saal free AMC|PM Subsidy processing guarantee — nahi mili toh hum responsible',

  // ════════════════════════════════════════════════════════
  // ── INTERIOR PAGE ────────────────────────────────────────
  // ════════════════════════════════════════════════════════
  int_heroTitle:   'Sapno Ka Ghar Banao',
  int_heroEm:      'Budget Mein — Haldwani',
  int_heroSub:     'Modular kitchen, wardrobe, false ceiling, TV panel — free home visit, 3D design, fixed price.',
  int_stat1n:'500+', int_stat1l:'Projects Done',
  int_stat2n:'4.9★', int_stat2l:'Rating',
  int_stat3n:'3yr',  int_stat3l:'Warranty',
  int_stat4n:'₹0',   int_stat4l:'Advance',
  int_reviewCount: '300+',
  int_services: JSON.stringify([
    { emoji:'🍳', name:'Modular Kitchen',     from:'₹80,000', was:'₹1,10,000', badge:'Most Popular', desc:'L-shape, U-shape, straight — laminate, acrylic, PU finish. 3 saal warranty.' },
    { emoji:'📺', name:'TV Panel / Wall',      from:'₹15,000', was:null,        badge:null,           desc:'PVC, wood, wallpaper — living room ka complete transformation.' },
    { emoji:'👕', name:'Wardrobe / Almirah',   from:'₹25,000', was:'₹35,000',   badge:'Save ₹10k',   desc:'Sliding ya hinged, full-height — aapki size aur finish pe customize.' },
    { emoji:'🛏️', name:'Bedroom Interior',    from:'₹40,000', was:null,        badge:null,           desc:'Bed design, storage, false ceiling — poora bedroom ek hi jagah.' },
    { emoji:'🏠', name:'False Ceiling',        from:'₹45/sqft',was:null,        badge:null,           desc:'Gypsum, POP, wooden planks — AC ducting ke saath bhi available.' },
    { emoji:'🎨', name:'Wall Texture / Paint', from:'₹12,000', was:null,        badge:'Trending',     desc:'Texture paint, wallpaper, 3D panel — premium finish at fair price.' },
  ]),
  int_reviews: JSON.stringify([
    { name:'Anjali Rawat', city:'Haldwani', stars:5, text:'Modular kitchen ₹95,000 mein banwaya — quality bilkul premium. Team bahut professional aur on-time. 3 saal warranty bhi mili!', svc:'Modular Kitchen' },
    { name:'Vikas Sharma', city:'Rudrapur', stars:5, text:'TV panel aur wardrobe dono ek saath karwaye. ₹55,000 mein ho gaya. Pehle free home visit aayi — koi pressure nahi tha.', svc:'TV Panel + Wardrobe' },
    { name:'Rekha Negi',   city:'Nainital', stars:5, text:'Bedroom interior aur false ceiling — bilkul dream room ban gaya. Price mein koi surprise nahi aaya. Highly recommend!', svc:'Bedroom Interior' },
    { name:'Ashok Kumar',  city:'Ramnagar', stars:5, text:'Complete 2BHK interior karwaya ₹2.8 lakh mein. Team ne 15 din mein kaam complete kiya. Quality excellent hai!', svc:'Complete Interior' },
  ]),
  int_faqs: JSON.stringify([
    { q:'Free home visit mein kya hota hai?',   a:'Hamare expert aayenge, har room ka measurement lenge, aapki style preference samjhenge aur usi din rough estimate denge. Koi advance nahi lagta.' },
    { q:'Kya price fix hota hai pehle?',        a:'Haan! Ham pehle written quote dete hain. Kaam shuru hone ke baad koi extra charge nahi lagta — guarantee.' },
    { q:'Kitne time mein kaam complete hoga?',  a:'Modular kitchen 7–10 days, full bedroom 10–15 days, complete interior 3–4 weeks. Advance mein schedule share kiya jaata hai.' },
    { q:'3 saal warranty mein kya cover hota?', a:'Manufacturing defects, hardware failures, fitting issues — sab free repair. Material damage (dents, scratches) warranty mein nahi aate.' },
    { q:'Minimum order kitna hoga?',            a:'Minimum ₹15,000 se shuru hota hai — ek TV panel ya texture paint bhi karaaya ja sakta hai.' },
  ]),
  int_guarantees: 'Free home visit — koi advance nahi|3D design preview before work|Fixed price guarantee — no surprise|3 saal manufacturing warranty|15–21 din mein completion',

  // ════════════════════════════════════════════════════════
  // ── HOMEPAGE CONTROLS ────────────────────────────────────
  // ════════════════════════════════════════════════════════

  // Hero Section
  hp_heroChip:       'All-in-One Platform · Haldwani, Uttarakhand',
  hp_heroLine1:      'All-in-One',
  hp_heroLine2:      'Tools & Services',
  hp_heroAccent:     'Platform',
  hp_heroSub:        'Use tools, book services, and solve daily problems instantly — 100+ free calculators, same-day electrician, solar solutions, interior design. No login required.',
  hp_trustBadges:    '✅ No Login Required|⚡ Same Day Service|💯 Free Estimate|🔒 100% Trusted',
  hp_ratingText:     '⭐ 4.9 · 500+ reviews',

  // Stats (pipe separated: icon|num|label)
  hp_stats: '✅|500+|Jobs Done|⭐|4.9★|Avg Rating|🛠️|100+|Free Tools|☀️|200+|Solar Installs',

  // Sections visibility toggles
  hp_showServices:      true,
  hp_showTestimonials:  true,
  hp_showProducts:      true,
  hp_showCtaBand:       true,

  // Services Section heading
  hp_servicesTitle:  'Book a Service — Same Day Response',
  hp_servicesSub:    'Haldwani & Uttarakhand mein trusted professionals',

  // Individual services toggle
  hp_showElectrician: true,
  hp_showSolar:       true,
  hp_showInterior:    true,

  // Service card text customisation
  hp_elec_badge:    'Same Day',
  hp_elec_tagline:  'Haldwani mein ek phone pe expert aata hai',
  hp_elec_price:    '₹150 se shuru',

  hp_solar_badge:   '40% Subsidy',
  hp_solar_tagline: 'PM Surya Ghar subsidy ke saath bill 90% kam karo',
  hp_solar_price:   '₹35,000 se shuru',

  hp_int_badge:     'Free Home Visit',
  hp_int_tagline:   'Budget mein sapno ka ghar — 3 saal warranty',
  hp_int_price:     '₹15,000 se shuru',

  // Testimonials section
  hp_testiTitle:    'Hamare Customers Kya Kehte Hain',
  hp_testiSub:      '500+ verified reviews · Haldwani se Rudrapur tak',
  hp_testiCount:    '500+',
  // JSON array stored as string
  hp_testimonials:  JSON.stringify([
    { id:1, name:'Rakesh Sharma', city:'Haldwani',  rating:5, initials:'RS', color:'#1d4ed8',
      text:'Electrician same day aaya, 3 ghante mein poori wiring ho gayi. Fair price, guaranteed quality. Dobara zaroor lunga!', service:'Electrician Service' },
    { id:2, name:'Priya Negi',    city:'Nainital',  rating:5, initials:'PN', color:'#b45309',
      text:'4kW solar system laga. Bill ₹2,200 se ₹180 ho gaya. PM subsidy paperwork mein poori help ki. Bahut satisfied!', service:'Solar Installation' },
    { id:3, name:'Suresh Bisht',  city:'Rudrapur',  rating:5, initials:'SB', color:'#10b981',
      text:'GST aur EMI calculator daily use karta hoon dukaan ke liye. Free hai, fast hai, koi login nahi — bilkul perfect.', service:'Free Tools' },
    { id:4, name:'Anjali Rawat',  city:'Ramnagar',  rating:5, initials:'AR', color:'#7c3aed',
      text:'₹1.2 lakh mein modular kitchen banwaya — quality aur finish dekh ke khush ho gaye. 15 din mein complete!', service:'Interior Design' },
  ]),

  // CTA Band
  hp_ctaTitle:  'Free Estimate Chahiye?',
  hp_ctaSub:    'Electrician, solar, interior — ya koi bhi sawaal. Same day response guaranteed.',

  // Products Section
  hp_productsTitle: 'Expert-Curated Picks',
  hp_affiliateDisc: 'Disclosure: Some links are affiliate links. Aapko koi extra cost nahi hota.',
}

const SettingsCtx = createContext()

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem('almenso_settings') || '{}') }
    } catch { return DEFAULT_SETTINGS }
  })

  const [toast, setToast] = useState('')

  // Inject AdSense
  useEffect(() => {
    if (!settings.adsenseClient) return
    window.__ADSENSE_CLIENT__ = settings.adsenseClient
    window.__ADSENSE_SLOTS__ = {
      top:    settings.adsenseSlotTop    || '',
      mid:    settings.adsenseSlotMid    || '',
      bottom: settings.adsenseSlotBottom || '',
    }
    const ID = 'adsense-script'
    if (!document.getElementById(ID)) {
      const s = document.createElement('script')
      s.id = ID; s.async = true; s.crossOrigin = 'anonymous'
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsenseClient}`
      document.head.appendChild(s)
    }
  }, [settings.adsenseClient])

  // Inject GA4
  useEffect(() => {
    const gid = settings.ga4MeasurementId
    if (!gid || gid === 'G-XXXXXXXXXX' || !gid.startsWith('G-')) return
    const ID = 'ga4-script'
    if (document.getElementById(ID)) return
    const s = document.createElement('script')
    s.id = ID; s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gid}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', gid)
    window.__ga_track = (path, title) => gtag('event', 'page_view', { page_path: path, page_title: title })
  }, [settings.ga4MeasurementId])

  // Inject Search Console
  useEffect(() => {
    const code = settings.searchConsoleCode
    if (!code) return
    const ID = 'gsc-meta'
    if (document.getElementById(ID)) return
    const m = document.createElement('meta')
    m.id = ID; m.name = 'google-site-verification'; m.content = code
    document.head.appendChild(m)
  }, [settings.searchConsoleCode])

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }, [])

  const saveSettings = useCallback((data) => {
    setSettings(prev => {
      const updated = { ...prev, ...data }
      try { localStorage.setItem('almenso_settings', JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  return (
    <SettingsCtx.Provider value={{ settings, saveSettings, toast, showToast }}>
      {children}
      <div style={{
        position:'fixed', bottom:20, left:'50%',
        transform:`translateX(-50%) translateY(${toast ? '0' : '14px'})`,
        background:'#1e293b', color:'#fff', padding:'10px 22px', borderRadius:99,
        fontSize:'0.82rem', fontWeight:600, opacity: toast ? 1 : 0,
        transition:'all 0.3s', zIndex:9999, whiteSpace:'nowrap',
        pointerEvents:'none', boxShadow:'0 8px 24px rgba(0,0,0,0.2)'
      }}>{toast}</div>
    </SettingsCtx.Provider>
  )
}

export const useSettings = () => useContext(SettingsCtx)

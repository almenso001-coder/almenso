/**
 * ALMENSO HOMEPAGE — Admin Controlled
 * Sab settings Admin Panel → Homepage tab se control hoti hain
 *
 * v3 IMPROVEMENTS:
 * - Tool-first hero: "170+ Free Tools & Calculators — All in One Place"
 * - Hero sub mentions local services for SEO
 * - "Call Now" button in hero CTAs
 * - WhatsApp button tooltip: "Chat for Electrician Service"
 * - Float card: "Call Electrician Now" CTA + improved spacing
 * - Tools section: Popular/Trending labels + category pills
 * - Local SEO section: "Best Electrician in Haldwani" with trust badges
 * - Internal linking block (solar, interior, tools, blog)
 */
import React, { useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import SEOHead    from '../components/SEOHead'
import AdSlot     from '../components/AdSlot'
import { useSettings } from '../context/SettingsContext'
import { initAnalytics } from '../utils/analytics'
import './HomePage.css'

const SERVICES_META = [
  { id:'electrician', emoji:'⚡', path:'/electrician-haldwani',
    points:['Home Wiring & Rewiring','Inverter Install','AC Repair','Fan Fitting','MCB / DB Box'],
    accent:'#dbeafe', accentDark:'#1d4ed8',
    settingKeys:{ show:'hp_showElectrician', badge:'hp_elec_badge', tagline:'hp_elec_tagline', price:'hp_elec_price' },
    title:'Electrician Service' },
  { id:'solar', emoji:'☀️', path:'/solar-solutions',
    points:['1kW–10kW Solar System','Inverter + Battery','Solar Geyser','Car Battery','Free Site Visit'],
    accent:'#fef3c7', accentDark:'#b45309',
    settingKeys:{ show:'hp_showSolar', badge:'hp_solar_badge', tagline:'hp_solar_tagline', price:'hp_solar_price' },
    title:'Solar & Battery' },
  { id:'interior', emoji:'🏠', path:'/interior-design',
    points:['Modular Kitchen','Wardrobe & Almirah','TV Panel','False Ceiling','Wall Texture'],
    accent:'#ede9fe', accentDark:'#7c3aed',
    settingKeys:{ show:'hp_showInterior', badge:'hp_int_badge', tagline:'hp_int_tagline', price:'hp_int_price' },
    title:'Interior Design' },
]

/* ─── SERVICE CARD ────────────────────────────────────────────── */
const ServiceCard = memo(function ServiceCard({ s, onClick }) {
  return (
    <div className="hsc-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="hsc-top" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)` }}>
        <span className="hsc-emoji">{s.emoji}</span>
        <span className="hsc-badge" style={{ background: s.accentDark }}>{s.badge}</span>
      </div>
      <div className="hsc-body">
        <div className="hsc-title">{s.title}</div>
        <div className="hsc-tagline">{s.tagline}</div>
        <ul className="hsc-points">
          {s.points.map(p => <li key={p}><span style={{ color: s.accentDark }}>✓</span> {p}</li>)}
        </ul>
        <div className="hsc-price" style={{ color: s.accentDark }}>{s.price}</div>
      </div>
      <div className="hsc-footer">
        <button className="hsc-cta" style={{ background: s.accentDark }}>
          Book Now — Free Estimate →
        </button>
      </div>
    </div>
  )
})

/* ─── TESTIMONIAL CARD ────────────────────────────────────────── */
const TestiCard = memo(function TestiCard({ t, idx }) {
  return (
    <div className="htesti-card" style={{ animationDelay: `${idx * 80}ms` }}>
      <div className="htesti-quote">"</div>
      <p className="htesti-text">{t.text}</p>
      <div className="htesti-bottom">
        <div className="htesti-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)` }}>
          {t.initials}
        </div>
        <div>
          <div className="htesti-name">{t.name}</div>
          <div className="htesti-meta">📍 {t.city} · {t.service}</div>
        </div>
        <div className="htesti-stars">{'★'.repeat(t.rating)}</div>
      </div>
    </div>
  )
})

/* ─── TOP TOOLS GRID ──────────────────────────────────────────── */
const TopToolsGrid = memo(function TopToolsGrid() {
  const navigate = useNavigate()
  const { settings } = useSettings()

  const featuredIds = Array.isArray(settings.featuredTools) ? settings.featuredTools : []

  const TOOL_MAP = {
    'gst-calculator':             { name:'GST Calculator',          emoji:'🧾', slug:'gst-calculator',             description:'GST calculate karo' },
    'emi-calculator':             { name:'EMI Calculator',           emoji:'🏦', slug:'emi-calculator',             description:'Loan EMI nikalo' },
    'bijli':                      { name:'Bijli Bill Calculator',    emoji:'⚡', slug:'bijli',                      description:'UPCL bill check karo' },
    'solar-roi':                  { name:'Solar ROI Calculator',     emoji:'☀️', slug:'solar-roi',                  description:'Solar savings calculate' },
    'image-compressor':           { name:'Image Compressor',         emoji:'🗜️', slug:'image-compressor',           description:'Image size kam karo' },
    'bmi-calculator':             { name:'BMI Calculator',           emoji:'⚖️', slug:'bmi-calculator',             description:'Health check karo' },
    'password-generator':         { name:'Password Generator',       emoji:'🔐', slug:'password-generator',         description:'Strong password banao' },
    'qr-code-generator':          { name:'QR Code Generator',        emoji:'📱', slug:'qr-code-generator',          description:'QR code banao free' },
    'word-counter':               { name:'Word Counter',             emoji:'📝', slug:'word-counter',               description:'Words count karo' },
    'discount-calculator':        { name:'Discount Calculator',      emoji:'💸', slug:'discount-calculator',        description:'Sale price nikalo' },
    'currency-converter':         { name:'Currency Converter',       emoji:'💱', slug:'currency-converter',         description:'Currency convert karo' },
    'age-calculator':             { name:'Age Calculator',           emoji:'🎂', slug:'age-calculator',             description:'Exact umar nikalo' },
    'temperature-converter':      { name:'Temperature Converter',    emoji:'🌡️', slug:'temperature-converter',      description:'°C °F convert karo' },
    'hashtag-generator':          { name:'Hashtag Generator',        emoji:'#️⃣', slug:'hashtag-generator',          description:'Instagram hashtags' },
    'percentage-calculator':      { name:'Percentage Calculator',    emoji:'📊', slug:'percentage-calculator',      description:'% calculate karo' },
    'json-formatter':             { name:'JSON Formatter',           emoji:'💻', slug:'json-formatter',             description:'JSON format karo' },
    'inverter-load-planner':      { name:'Inverter Load Planner',    emoji:'🔋', slug:'inverter-load-planner',      description:'Battery size plan karo' },
    'instagram-caption-generator':{ name:'Instagram Caption',        emoji:'📸', slug:'instagram-caption-generator',description:'Caption generate karo' },
    'loan-calculator':            { name:'Loan Calculator',          emoji:'💰', slug:'loan-calculator',            description:'Loan EMI calculate' },
    'calorie-calculator':         { name:'Calorie Calculator',       emoji:'🔥', slug:'calorie-calculator',         description:'Daily calories plan karo' },
  }

  let topTools = []
  if (featuredIds.length > 0) {
    topTools = featuredIds.map(id => TOOL_MAP[id]).filter(Boolean).slice(0, 6)
  }
  if (topTools.length === 0) {
    topTools = [
      TOOL_MAP['bijli'], TOOL_MAP['gst-calculator'], TOOL_MAP['emi-calculator'],
      TOOL_MAP['image-compressor'], TOOL_MAP['bmi-calculator'], TOOL_MAP['password-generator'],
    ].filter(Boolean)
  }

  if (topTools.length === 0) return null

  return (
    <div className="hp3-tools-grid">
      {topTools.map(tool => (
        <div
          key={tool.slug}
          className="hp3-tool-card"
          onClick={() => navigate(`/tools/${tool.slug}`)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && navigate(`/tools/${tool.slug}`)}
        >
          <div className="hp3-tool-emoji">{tool.emoji}</div>
          <div className="hp3-tool-name">{tool.name}</div>
          <div className="hp3-tool-desc">{tool.description || tool.category}</div>
          <div className="hp3-tool-arrow">Use Free →</div>
        </div>
      ))}
    </div>
  )
})

/* ─── MAIN ────────────────────────────────────────────────────── */
export default function HomePage() {
  const navigate  = useNavigate()
  const { settings } = useSettings()

  const products = (() => {
    try {
      const parsed = JSON.parse(settings.hp_featuredProducts || '[]')
      return parsed.filter(p => p.visible !== false)
    } catch { return [] }
  })()

  const WA    = settings.whatsapp || '919258133689'
  const PHONE = settings.phone    || '+919258133689'

  const stats = (() => {
    try {
      const parts = (settings.hp_stats || '').split('|')
      const result = []
      for (let i = 0; i + 2 < parts.length; i += 3) {
        result.push({ icon: parts[i], num: parts[i+1], lbl: parts[i+2] })
      }
      return result.length ? result : []
    } catch { return [] }
  })()

  const trustBadges = (settings.hp_trustBadges || '').split('|').filter(Boolean)

  const testimonials = (() => {
    try { return JSON.parse(settings.hp_testimonials || '[]') }
    catch { return [] }
  })()

  const visibleServices = SERVICES_META
    .filter(s => settings[s.settingKeys.show] !== false)
    .map(s => ({
      ...s,
      badge:   settings[s.settingKeys.badge]   || '',
      tagline: settings[s.settingKeys.tagline] || '',
      price:   settings[s.settingKeys.price]   || '',
    }))

  const goTo   = useCallback(path => () => navigate(path), [navigate])
  const openWA = useCallback(() =>
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Almenso se baat karni thi.')}`, '_blank', 'noopener'), [WA])

  return (
    <>
      {/* ── SEO: tool-first title + rich description ── */}
      <SEOHead
        title={`${settings.siteName || 'Almenso'} — 170+ Free Online Tools & Calculators | Electrician Haldwani`}
        description="170+ free online tools — GST calculator, EMI calculator, BMI calculator, image compressor & more. Plus same-day electrician, solar & interior services in Haldwani, Uttarakhand. No login required."
        keywords="free online tools india, gst calculator, emi calculator, bmi calculator, image compressor, electrician haldwani, solar panel uttarakhand, interior design haldwani, almenso"
        image="https://almenso.com/preview.svg"
        canonical="/"
      />

      <div className="hp3-root">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="hp3-hero" aria-label="Hero">
          <div className="hero3-mesh" aria-hidden />
          <div className="hero3-ring hero3-ring-1" aria-hidden />
          <div className="hero3-ring hero3-ring-2" aria-hidden />

          <div className="hero3-inner">
            <div className="hero3-left">
              <div className="hero3-chip">
                <span className="hero3-chip-dot" />
                {settings.hp_heroChip || '170+ Free Tools · Haldwani, Uttarakhand'}
              </div>

              {/* Tool-first headline */}
              <h1 className="hero3-h1">
                <span className="hero3-h1-line1">{settings.hp_heroLine1 || '170+ Free Tools'}</span>
                <span className="hero3-h1-line2">{settings.hp_heroLine2 || '& Calculators'}</span>
                <span className="hero3-h1-accent">{settings.hp_heroAccent || 'All in One Place'}</span>
              </h1>

              {/* Sub: tools-first + services mention for local SEO */}
              <p className="hero3-sub">
                {settings.hp_heroSub ||
                  'GST Calculator, EMI Calculator, BMI, Image Compressor & 165+ more — free, no login. Also: electrician, solar & interior services in Haldwani, Uttarakhand.'}
              </p>

              {stats.length > 0 && (
                <div className="hero3-stats" role="list">
                  {stats.map(s => (
                    <div key={s.lbl} className="hero3-stat" role="listitem">
                      <span className="hero3-stat-num">{s.num}</span>
                      <span className="hero3-stat-lbl">{s.lbl}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs: Use Tools + Book Service + Call Now + WhatsApp */}
              <div className="hero3-ctas">
                <button className="hero3-btn-tools" onClick={goTo('/tools')}>
                  <span>🛠️</span><span>Use Tools Free</span><span className="hero3-btn-arrow">→</span>
                </button>
                {visibleServices.length > 0 && (
                  <button className="hero3-btn-service" onClick={goTo('/services')}>
                    <span>📋</span><span>Book Service</span>
                  </button>
                )}
                {/* NEW: Call Electrician Now */}
                {settings.hp_showElectrician !== false && (
                  <a href={`tel:${PHONE}`} className="hero3-btn-call" aria-label="Call Electrician Now">
                    📞 Call Now
                  </a>
                )}
                {/* WhatsApp with tooltip */}
                <div className="hero3-wa-wrap">
                  <button className="hero3-btn-wa" onClick={openWA} aria-label="WhatsApp for Electrician Service">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                  <span className="hero3-wa-tooltip">Chat for Electrician Service</span>
                </div>
              </div>

              {trustBadges.length > 0 && (
                <div className="hero3-trust">
                  {trustBadges.map(b => <span key={b} className="hero3-trust-badge">{b}</span>)}
                </div>
              )}
            </div>

            {/* RIGHT float card — improved spacing + Call CTA */}
            <div className="hero3-right" aria-hidden>
              <div className="hero3-float-card">
                <div className="hfc-header">
                  <span className="hfc-dot hfc-dot-green" /><span className="hfc-dot hfc-dot-yellow" /><span className="hfc-dot hfc-dot-red" />
                  <span className="hfc-label">Our Services</span>
                </div>
                <div className="hfc-list">
                  {visibleServices.map((s, i) => (
                    <button key={s.path} className="hfc-item" onClick={goTo(s.path)}
                      style={{ animationDelay: `${200 + i * 80}ms` }}>
                      <span className="hfc-item-ico" style={{ background: s.accent, color: s.accentDark }}>{s.emoji}</span>
                      <div className="hfc-item-body">
                        <div className="hfc-item-name">{s.title}</div>
                        <div className="hfc-item-sub">{s.price || 'Free estimate'}</div>
                      </div>
                      <span className="hfc-item-use hfc-item-book" style={{ color: s.accentDark }}>Book →</span>
                    </button>
                  ))}
                  <button key="tools" className="hfc-item" onClick={goTo('/tools')} style={{ animationDelay: '440ms' }}>
                    <span className="hfc-item-ico" style={{ background: '#ecfdf5', color: '#10b981' }}>🛠️</span>
                    <div className="hfc-item-body">
                      <div className="hfc-item-name">Free Tools</div>
                      <div className="hfc-item-sub">170+ tools · No login</div>
                    </div>
                    <span className="hfc-item-use" style={{ color: '#10b981' }}>Use →</span>
                  </button>
                </div>
                <div className="hfc-footer-btns">
                  <button className="hfc-all" onClick={goTo('/services')}>View all services →</button>
                  {settings.hp_showElectrician !== false && (
                    <a href={`tel:${PHONE}`} className="hfc-call-now">📞 Call Electrician Now</a>
                  )}
                </div>
              </div>
              <div className="hero3-pill hero3-pill-1"><span>⭐</span> {settings.hp_ratingText || '4.9 · 500+ reviews'}</div>
              <div className="hero3-pill hero3-pill-2"><span className="hp-live" />Same Day Service</div>
            </div>
          </div>
        </section>

        {/* ── BODY ──────────────────────────────────────────────── */}
        <div className="hp3-body">
          <AdSlot slot="top" />

          {/* ── TOOLS SECTION ── */}
          {settings.hp_showTopTools !== false && (
            <section className="hp3-sec hp3-tools-sec" aria-labelledby="tools-heading">
              <div className="hp3-sec-hd">
                <div>
                  <div className="hp3-eyebrow">⚙️ Free Online Tools</div>
                  <h2 id="tools-heading" className="hp3-sec-h2">
                    {settings.hp_toolsTitle || 'Most Used Tools — Try Instantly'}
                  </h2>
                  <p className="hp3-sec-p">{settings.hp_toolsSub || '170+ tools · No signup · Works on mobile & desktop'}</p>
                </div>
                <button className="hp3-viewall" onClick={goTo('/tools')}>All 170+ Tools <span>→</span></button>
              </div>

              {/* Popular / Trending labels */}
              <div className="hp3-tools-label-row">
                <span className="hp3-tools-label hp3-tools-label--popular">🔥 Popular Tools</span>
                <span className="hp3-tools-label hp3-tools-label--trending">⚡ Trending Now</span>
              </div>

              <TopToolsGrid />

              {/* Category quick-jump pills */}
              <div className="hp3-tool-cats">
                <button className="hp3-tool-cat" onClick={goTo('/tools?category=calculator')}>🧮 Calculators</button>
                <button className="hp3-tool-cat" onClick={goTo('/tools?category=image')}>🖼️ Image Tools</button>
                <button className="hp3-tool-cat" onClick={goTo('/tools?category=converter')}>🔄 Converters</button>
                <button className="hp3-tool-cat" onClick={goTo('/tools?category=text')}>📝 Text Tools</button>
                <button className="hp3-tool-cat" onClick={goTo('/tools?category=finance')}>💰 Finance</button>
                <button className="hp3-tool-cat" onClick={goTo('/tools?category=health')}>🏥 Health</button>
              </div>
            </section>
          )}

          {/* ── SERVICES SECTION ── */}
          {settings.hp_showServices !== false && visibleServices.length > 0 && (
            <section className="hp3-sec" aria-labelledby="services-heading">
              <div className="hp3-sec-hd">
                <div>
                  <div className="hp3-eyebrow">🔧 Local Services — Haldwani</div>
                  <h2 id="services-heading" className="hp3-sec-h2">
                    {settings.hp_servicesTitle || 'Book a Service — Same Day Response'}
                  </h2>
                  <p className="hp3-sec-p">{settings.hp_servicesSub || 'Haldwani & Uttarakhand mein trusted professionals'}</p>
                </div>
                <button className="hp3-viewall" onClick={goTo('/services')}>All Services <span>→</span></button>
              </div>
              <div className="hsc-grid">
                {visibleServices.map(s => <ServiceCard key={s.id} s={s} onClick={goTo(s.path)} />)}
              </div>
              <div className="hp3-contact-bar">
                <div className="hp3-cb-left">
                  <span className="hp3-cb-live" />
                  <span>Available now — <strong>Free estimate, no advance</strong></span>
                </div>
                <div className="hp3-cb-btns">
                  <button className="hp3-cb-wa" onClick={openWA}>💬 WhatsApp Now</button>
                  <a href={`tel:${PHONE}`} className="hp3-cb-call">📞 Call</a>
                </div>
              </div>
            </section>
          )}

          <AdSlot slot="mid" />

          {/* ── TESTIMONIALS ── */}
          {settings.hp_showTestimonials !== false && testimonials.length > 0 && (
            <section className="hp3-sec hp3-testi-sec" aria-labelledby="testi-heading">
              <div className="hp3-sec-hd hp3-sec-hd--center">
                <div className="hp3-eyebrow">⭐ Customer Reviews</div>
                <h2 id="testi-heading" className="hp3-sec-h2">
                  {settings.hp_testiTitle || 'Hamare Customers Kya Kehte Hain'}
                </h2>
                <p className="hp3-sec-p">{settings.hp_testiSub || '500+ verified reviews'}</p>
              </div>
              <div className="htesti-grid">
                {testimonials.map((t, i) => <TestiCard key={t.id} t={t} idx={i} />)}
              </div>
              <div className="hp3-rating-bar">
                <div className="hp3-rb-score">4.9</div>
                <div>
                  <div className="hp3-rb-stars">★★★★★</div>
                  <div className="hp3-rb-count">Based on {settings.hp_testiCount || '500+'} verified reviews</div>
                </div>
                <div className="hp3-rb-brands">
                  {['Google','Facebook','WhatsApp'].map(b => <span key={b} className="hp3-rb-brand">via {b}</span>)}
                </div>
              </div>
            </section>
          )}

          {/* ── CTA BAND ── */}
          {settings.hp_showCtaBand !== false && (
            <section className="hp3-cta-band" aria-label="Contact CTA">
              <div className="hp3-cta-band-inner">
                <div className="hp3-cta-left">
                  <div className="hp3-cta-eye">📞 Abhi Sampark Karo</div>
                  <h2 className="hp3-cta-h2">
                    {settings.hp_ctaTitle || 'Free Estimate Chahiye?'}<br />
                    <em>Hum Yahan Hain!</em>
                  </h2>
                  <p className="hp3-cta-p">{settings.hp_ctaSub}</p>
                  <div className="hp3-cta-btns">
                    <a href={`tel:${PHONE}`} className="hero3-btn-service">📞 {PHONE}</a>
                    <button className="hp3-cta-wa" onClick={openWA}>💬 WhatsApp Karo</button>
                  </div>
                </div>
                <div className="hp3-cta-right">
                  {[
                    ...(settings.hp_showElectrician !== false ? [{ ico:'⚡', name:'Electrician',  sub:`Same-day · ${settings.hp_elec_price||'₹150+'}`,  path:'/electrician-haldwani' }] : []),
                    ...(settings.hp_showSolar       !== false ? [{ ico:'☀️', name:'Solar Quote',  sub:'Free site visit',     path:'/solar-solutions'     }] : []),
                    ...(settings.hp_showInterior    !== false ? [{ ico:'🏠', name:'Interior',     sub:'Free home visit',     path:'/interior-design'     }] : []),
                    { ico:'🛠️', name:'Free Tools', sub:'170+ tools · No login', path:'/tools' },
                  ].map(item => (
                    <button key={item.name} className="hp3-cta-pill" onClick={goTo(item.path)}>
                      <span className="hp3-pill-ico">{item.ico}</span>
                      <div>
                        <div className="hp3-pill-name">{item.name}</div>
                        <div className="hp3-pill-sub">{item.sub}</div>
                      </div>
                      <span className="hp3-pill-arr">›</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── LOCAL SEO SECTION ────────────────────────────────
              "Best Electrician Service in Haldwani"
              Natural keyword coverage + trust items + internal links
          ──────────────────────────────────────────────────────── */}
          {settings.hp_showElectrician !== false && (
            <section className="hp3-sec hp3-local-seo" aria-labelledby="local-seo-heading">
              <div className="hp3-local-inner">

                <div className="hp3-local-left">
                  <div className="hp3-eyebrow">📍 Haldwani, Uttarakhand</div>
                  <h2 id="local-seo-heading" className="hp3-sec-h2 hp3-local-h2">
                    Best Electrician Service in Haldwani
                  </h2>
                  <p className="hp3-local-desc">
                    Almenso provides trusted, same-day electrician services across Haldwani and
                    Uttarakhand. Our verified professionals handle home wiring, inverter installation,
                    AC repair, MCB / DB box fitting, and commercial electrical work — at transparent
                    prices with zero advance payment.
                  </p>

                  <ul className="hp3-local-services">
                    <li><span>⚡</span> Home &amp; Office Wiring / Rewiring</li>
                    <li><span>🔋</span> Inverter &amp; Battery Installation</li>
                    <li><span>❄️</span> AC Installation &amp; Repair</li>
                    <li><span>💡</span> Fan, Light &amp; Fixture Fitting</li>
                    <li><span>🔌</span> MCB / DB Box Work</li>
                    <li><span>☀️</span> Solar Panel Wiring</li>
                  </ul>

                  {/* Trust badges — 500+ jobs, same day, verified, zero advance */}
                  <div className="hp3-local-trust">
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">500+</span>
                      <span className="hp3-trust-lbl">Jobs Done</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">⚡</span>
                      <span className="hp3-trust-lbl">Same Day</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">✓</span>
                      <span className="hp3-trust-lbl">Verified Pros</span>
                    </div>
                    <div className="hp3-trust-item">
                      <span className="hp3-trust-num">₹0</span>
                      <span className="hp3-trust-lbl">Advance</span>
                    </div>
                  </div>

                  <div className="hp3-local-ctas">
                    <button className="hp3-local-book" onClick={goTo('/electrician-haldwani')}>
                      Book Electrician — Free Estimate →
                    </button>
                    <a href={`tel:${PHONE}`} className="hp3-local-call">📞 Call Now</a>
                    <button className="hp3-local-wa" onClick={openWA}>💬 WhatsApp</button>
                  </div>
                </div>

                <div className="hp3-local-right">
                  {/* Service card */}
                  <div className="hp3-local-card">
                    <div className="hp3-lc-head">⚡ Electrician Service — Haldwani</div>
                    <div className="hp3-lc-area">
                      <div className="hp3-lc-area-title">Service Areas</div>
                      <div className="hp3-lc-tags">
                        {['Haldwani','Nainital','Bhimtal','Kaladungi','Ramnagar','Lalkuan'].map(a => (
                          <span key={a} className="hp3-lc-area-tag">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div className="hp3-lc-price">Starting ₹150 · Free site visit</div>
                    <a href={`tel:${PHONE}`} className="hp3-lc-cta">📞 Call Electrician Now</a>
                    <div className="hp3-lc-note">Mon–Sat 9am–8pm · Sun 10am–4pm</div>
                  </div>

                  {/* Internal linking */}
                  <div className="hp3-internal-links">
                    <div className="hp3-il-title">Related Pages</div>
                    <button className="hp3-il-link" onClick={goTo('/solar-solutions')}>☀️ Solar Panel Installation →</button>
                    <button className="hp3-il-link" onClick={goTo('/interior-design')}>🏠 Interior Design Haldwani →</button>
                    <button className="hp3-il-link" onClick={goTo('/tools/bijli')}>⚡ Bijli Bill Calculator →</button>
                    <button className="hp3-il-link" onClick={goTo('/tools/inverter-load-planner')}>🔋 Inverter Load Planner →</button>
                    <button className="hp3-il-link" onClick={goTo('/tools/solar-roi')}>📊 Solar ROI Calculator →</button>
                    <button className="hp3-il-link" onClick={goTo('/blog')}>📖 Read Our Guides →</button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── PRODUCTS ── */}
          {settings.hp_showProducts !== false && (
            <section className="hp3-sec hp3-prods-sec" aria-labelledby="prods-heading">
              <div className="hp3-sec-hd">
                <div>
                  <div className="hp3-eyebrow">🛒 Recommended Products</div>
                  <h2 id="prods-heading" className="hp3-sec-h2">
                    {settings.hp_productsTitle || 'Expert-Curated Picks'}
                  </h2>
                </div>
                <button className="hp3-viewall" onClick={goTo('/products')}>All Products <span>→</span></button>
              </div>
              <div className="hp3-prods-grid">
                {products.map(p => (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer sponsored"
                    className="hp3-prod-card" aria-label={`Buy ${p.name}`}>
                    {p.badge && <span className="hp3-prod-badge">{p.badge}</span>}
                    <div className="hp3-prod-img">
                      {p.image?.startsWith('http')
                        ? <img src={p.image} alt={p.name} loading="lazy" />
                        : <span>{p.image}</span>}
                    </div>
                    <div className="hp3-prod-body">
                      <div className="hp3-prod-name">{p.name}</div>
                      {p.desc && <div className="hp3-prod-desc">{p.desc}</div>}
                      <div className="hp3-prod-stars">★★★★★ <span>4.5</span></div>
                      {p.price && <div className="hp3-prod-price">{p.price}</div>}
                    </div>
                    <div className="hp3-prod-buy">🛒 Buy on Amazon</div>
                  </a>
                ))}
              </div>
              {settings.hp_affiliateDisc && <p className="hp3-disc">{settings.hp_affiliateDisc}</p>}
            </section>
          )}

          <AdSlot slot="bottom" />
        </div>
      </div>
    </>
  )
}

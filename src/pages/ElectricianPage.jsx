import React, { useState, useEffect, useCallback, memo } from 'react'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { saveLeadDB } from '../utils/db'
import { useSettings } from '../context/SettingsContext'
import { LoginModal, getLoggedInUser } from '../components/PhoneLogin'
import './ElectricianPage.css'

function useUrgency() {
  const msgs = [
    '🔴 Aaj sirf 3 slots bache hain — abhi book karo!',
    '⚡ 2 teams busy hain — ek team available hai abhi',
    '🔥 12 log ne aaj book kiya — popular hai yeh service',
    '⏰ Next 2 ghante mein response guaranteed',
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 4000)
    return () => clearInterval(t)
  }, [])
  return msgs[idx]
}

const ReviewCard = memo(function ReviewCard({ r }) {
  return (
    <div className="ep-review">
      <div className="ep-review-top">
        <div className="ep-review-avatar">{r.name.charAt(0)}</div>
        <div className="ep-review-meta">
          <div className="ep-review-name">{r.name}</div>
          <div className="ep-review-city">📍 {r.city}</div>
        </div>
        <div className="ep-review-stars">{'★'.repeat(r.stars)}</div>
      </div>
      <p className="ep-review-text">"{r.text}"</p>
      <div className="ep-review-tag">{r.svc}</div>
    </div>
  )
})

const SvcCard = memo(function SvcCard({ s, onBook }) {
  return (
    <div className="ep-svc-card">
      <div className="ep-svc-top">
        <div className="ep-svc-ico">{s.emoji}</div>
        <div className="ep-svc-info">
          <div className="ep-svc-name">{s.name}</div>
          <div className="ep-svc-price">{s.price}</div>
        </div>
      </div>
      {s.description && <p className="ep-svc-desc">{s.description}</p>}
      <button className="ep-svc-book" onClick={onBook}>Book → {s.price}</button>
    </div>
  )
})

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ep-faq ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ep-faq-q"><span>{q}</span><span className="ep-faq-arr">{open ? '▲' : '▼'}</span></div>
      {open && <div className="ep-faq-a">{a}</div>}
    </div>
  )
}

function BookingForm({ services, areas, WA, PHONE }) {
  const urgency = useUrgency()
  const [form, setForm]           = useState({ name:'', phone:'', area:'', address:'', problem:'' })
  const [status, setStatus]       = useState('idle')
  const [err, setErr]             = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser]           = useState(() => getLoggedInUser())
  const update = useCallback((k, v) => { setForm(p => ({ ...p, [k]: v })); setErr('') }, [])
  const isOutOfArea = form.area && !areas.includes(form.area)

  useEffect(() => {
    if (user) setForm(p => ({ ...p, name: p.name || user.name || '', phone: p.phone || user.phone || '' }))
  }, [user])

  const submit = async () => {
    if (!user)                                         return setShowLogin(true)
    if (!form.name.trim())                             return setErr('Naam daalna zaroori hai')
    if (!form.phone.trim() || form.phone.length < 10) return setErr('Sahi phone number daalo (10 digits)')
    if (!form.area)                                    return setErr('Apna area select karo')
    if (isOutOfArea)                                   return setErr('Is area mein abhi service available nahi')
    if (!form.address.trim())                          return setErr('Ghar ka address daalna zaroori hai')
    if (!form.problem)                                 return setErr('Kaunsa kaam chahiye — select karo')
    setStatus('sending'); setErr('')
    try {
      await saveLeadDB({ ...form, name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(), userId: user?.phoneClean || '', type: 'electrician', status: 'new' })
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service_type: 'electrician', area: form.area })
      const msg = `⚡ Electrician Booking — Almenso\n\n👤 ${form.name}\n📞 ${form.phone}\n📍 Area: ${form.area}\n🏠 ${form.address}\n🔧 Kaam: ${form.problem}`
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
      setStatus('done')
    } catch {
      setStatus('idle'); setErr('Error aaya — please WhatsApp karo directly.')
    }
  }

  if (status === 'done') return (
    <div className="ep-success">
      <div className="ep-success-ico">✅</div>
      <div className="ep-success-title">Booking Confirmed!</div>
      <div className="ep-success-sub">Hamari team 30-60 min mein contact karegi. WhatsApp bhi khul gaya.</div>
      <div className="ep-success-actions">
        <button className="ep-btn-wa" onClick={() => window.open(`https://wa.me/${WA}`, '_blank')}>💬 WhatsApp Track Karo</button>
        <button className="ep-btn-outline" onClick={() => { setStatus('idle'); setForm({ name:'', phone:'', area:'', address:'', problem:'' }) }}>Naya Book Karo</button>
      </div>
    </div>
  )

  return (
    <div className="ep-form-card">
      <LoginModal show={showLogin} title="Booking Ke Liye Login Karo"
        onSuccess={u => { setUser(u); setShowLogin(false); setForm(p => ({ ...p, name: p.name||u.name||'', phone: p.phone||u.phone||'' })) }}
        onClose={() => setShowLogin(false)} />
      <div className="ep-urgency">{urgency}</div>
      <div className="ep-form-head">
        <div className="ep-form-title">⚡ Book Electrician</div>
        <div className="ep-form-sub">Free estimate · Same-day service · Haldwani</div>
      </div>
      {user ? (
        <div className="ep-user-bar">
          <span>✅ Logged in: <strong>{user.name}</strong></span>
          <button className="ep-user-logout" onClick={() => { setUser(null); sessionStorage.removeItem('almenso_user') }}>Logout</button>
        </div>
      ) : (
        <button className="ep-login-cta" onClick={() => setShowLogin(true)}>📱 Mobile Se Login Karo — Fast Booking</button>
      )}
      {err && <div className="ep-err">⚠️ {err}</div>}
      <div className="ep-fields">
        <div className="ep-field"><label>Naam *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Rahul Sharma" disabled={status==='sending'} /></div>
        <div className="ep-field"><label>Mobile *</label><input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" disabled={status==='sending'} /></div>
      </div>
      <div className="ep-field">
        <label>Area / Mohalla *</label>
        <select value={form.area} onChange={e => update('area', e.target.value)} disabled={status==='sending'}>
          <option value="">— Area Select Karo —</option>
          {areas.map(a => <option key={a}>{a}</option>)}
          <option value="Other">📍 Aur koi area</option>
        </select>
        {isOutOfArea && <div className="ep-out-area">😔 Is area mein abhi service nahi — WhatsApp karo direct</div>}
      </div>
      {form.area && !isOutOfArea && (
        <>
          <div className="ep-field"><label>Address *</label><textarea value={form.address} onChange={e => update('address', e.target.value)} placeholder="Gali, near landmark, ghar number" rows={2} disabled={status==='sending'} /></div>
          <div className="ep-field">
            <label>Kaunsa Kaam? *</label>
            <select value={form.problem} onChange={e => update('problem', e.target.value)} disabled={status==='sending'}>
              <option value="">— Service Select Karo —</option>
              {services.filter(s => s.available !== false).map(s => (
                <option key={s.id||s.name} value={s.name}>{s.emoji ? s.emoji+' ' : ''}{s.name}{s.price ? ' — '+s.price : ''}</option>
              ))}
              <option value="Aur koi kaam">🔧 Kuch aur</option>
            </select>
          </div>
          <button className="ep-submit-btn" onClick={submit} disabled={status==='sending'}>
            {status==='sending' ? '⏳ Booking ho rahi hai...' : '⚡ Book Now — Free Estimate'}
          </button>
        </>
      )}
      {!form.area && <button className="ep-submit-btn ep-submit-disabled" disabled>📍 Pehle Area Select Karo</button>}
      <div className="ep-form-divider">ya seedha contact karo</div>
      <div className="ep-contact-row">
        <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Electrician chahiye Haldwani mein.')}`} target="_blank" rel="noopener" className="ep-wa-btn">💬 WhatsApp</a>
        <a href={`tel:${PHONE}`} className="ep-call-btn">📞 Call Now</a>
      </div>
      <div className="ep-form-trust"><span>🔒 100% Safe</span><span>✅ No Advance</span><span>⚡ Same Day</span></div>
    </div>
  )
}

export default function ElectricianPage() {
  const { settings } = useSettings()

  const WA    = settings.whatsapp || '919258133689'
  const PHONE = settings.phone    || '+919258133689'
  const areas = (settings.electricianAreas || '').split(',').map(a => a.trim()).filter(Boolean)

  const services   = (() => { try { return JSON.parse(settings.elec_services || '[]') } catch { return [] } })()
  const reviews    = (() => { try { return JSON.parse(settings.elec_reviews  || '[]') } catch { return [] } })()
  const faqs       = (() => { try { return JSON.parse(settings.elec_faqs    || '[]') } catch { return [] } })()
  const guarantees = (settings.elec_guarantees || '').split('|').filter(Boolean)
  const trustBadges= (settings.elec_trustBadges|| '').split('|').filter(Boolean)

  const BENEFITS = [
    { ico:'⚡', title:'Same-Day Service',   desc:'Emergency call pe 1-3 ghante mein' },
    { ico:'✅', title:'ISI Certified Work', desc:'IS code ke according safe wiring'  },
    { ico:'💯', title:'Free Estimate',      desc:'Pehle estimate, phir kaam shuru'   },
    { ico:'🔒', title:'Warranty',           desc:'Major work pe written warranty'    },
    { ico:'💳', title:'All Payments',       desc:'Cash, UPI, PhonePe, GPay accept'  },
    { ico:'📱', title:'Live Updates',       desc:'WhatsApp pe progress updates'      },
  ]

  const openWA = useCallback(() =>
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Electrician service chahiye Haldwani mein.')}`, '_blank', 'noopener'), [WA])

  return (
    <>
      <SEOHead
        title={`Electrician ${settings.address?.split(',')[0] || 'Haldwani'} — Same Day Service | ${settings.siteName || 'Almenso'}`}
        description="Trusted electrician in Haldwani. Home wiring, inverter install, AC repair, fan fitting — same-day service. Free estimate."
        keywords="electrician haldwani, bijli ka kaam haldwani, electrical repair haldwani, wiring contractor haldwani"
        canonical="/electrician-haldwani"
      />
      <div className="ep-page">
        <div className="ep-hero">
          <div className="ep-hero-blob ep-hero-blob-1" aria-hidden />
          <div className="ep-hero-blob ep-hero-blob-2" aria-hidden />
          <div className="ep-hero-wrap">
            <div className="ep-hero-left">
              <div className="ep-social-proof-badge">
                <div className="ep-spb-stars">★★★★★</div>
                <span>4.9 · {settings.elec_reviewCount || '500+'} Customers</span>
              </div>
              <h1 className="ep-hero-h1">
                {settings.elec_heroTitle || 'Trusted Electrician'}<br />
                <span className="ep-hero-em">{settings.elec_heroEm || 'Haldwani — Same Day'}</span>
              </h1>
              <p className="ep-hero-p" style={{ whiteSpace:'pre-line' }}>{settings.elec_heroSub}</p>
              <div className="ep-trust-row">
                {trustBadges.map(b => <span key={b} className="ep-trust-badge">{b}</span>)}
              </div>
              <div className="ep-hero-ctas">
                <button className="ep-cta-primary" onClick={openWA}>💬 WhatsApp Karo — Free Quote</button>
                <a href={`tel:${PHONE}`} className="ep-cta-call">📞 {PHONE}</a>
              </div>
              <div className="ep-hero-stats">
                <div className="ep-stat"><div className="ep-stat-n">{settings.elec_stat1n||'500+'}</div><div className="ep-stat-l">{settings.elec_stat1l||'Jobs Done'}</div></div>
                <div className="ep-stat-sep" />
                <div className="ep-stat"><div className="ep-stat-n">{settings.elec_stat2n||'4.9★'}</div><div className="ep-stat-l">{settings.elec_stat2l||'Rating'}</div></div>
                <div className="ep-stat-sep" />
                <div className="ep-stat"><div className="ep-stat-n">{settings.elec_stat3n||'Same Day'}</div><div className="ep-stat-l">{settings.elec_stat3l||'Service'}</div></div>
                <div className="ep-stat-sep" />
                <div className="ep-stat"><div className="ep-stat-n">{settings.elec_stat4n||'₹0'}</div><div className="ep-stat-l">{settings.elec_stat4l||'Advance'}</div></div>
              </div>
            </div>
            <div className="ep-hero-right">
              <BookingForm services={services} areas={areas} WA={WA} PHONE={PHONE} />
            </div>
          </div>
        </div>

        <div className="ep-body">
          <AdSlot slot="top" />
          <section className="ep-sec ep-benefits-sec">
            <div className="ep-sec-eye">✅ Kyun Almenso Electrician?</div>
            <h2 className="ep-sec-title">6 Reasons Haldwani Chooses Us</h2>
            <div className="ep-benefits-grid">
              {BENEFITS.map(b => (
                <div key={b.title} className="ep-benefit">
                  <div className="ep-benefit-ico">{b.ico}</div>
                  <div><div className="ep-benefit-title">{b.title}</div><div className="ep-benefit-desc">{b.desc}</div></div>
                </div>
              ))}
            </div>
          </section>
          <section className="ep-sec">
            <div className="ep-sec-eye">🔧 Services & Pricing</div>
            <h2 className="ep-sec-title">Kya Kya Kaam Karte Hain?</h2>
            <p className="ep-sec-sub">Sabse common electrical kaam — transparent pricing ke saath</p>
            <div className="ep-svc-grid">
              {services.filter(s => s.available !== false).map(s => (
                <SvcCard key={s.id||s.name} s={s}
                  onBook={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Namaste! ${s.name} ke liye quote chahiye.`)}`, '_blank')} />
              ))}
            </div>
            <div className="ep-price-note">💡 Final price site visit ke baad confirm hoga. Estimate bilkul free hai.</div>
          </section>
          <AdSlot slot="mid" />
          <section className="ep-sec ep-reviews-sec">
            <div className="ep-sec-eye">⭐ Customer Reviews</div>
            <h2 className="ep-sec-title">{settings.elec_reviewsTitle || '500+ Khush Customers'}</h2>
            <div className="ep-reviews-grid">
              {reviews.map(r => <ReviewCard key={r.name} r={r} />)}
            </div>
            <div className="ep-review-summary">
              <div className="ep-rs-score">4.9</div>
              <div><div className="ep-rs-stars">★★★★★</div><div className="ep-rs-count">{settings.elec_reviewCount || '500+'} verified reviews · Haldwani & Kathgodam</div></div>
            </div>
          </section>
          <section className="ep-sec ep-areas-sec">
            <div className="ep-sec-eye">📍 Service Areas</div>
            <h2 className="ep-sec-title">Haldwani & Nearby Areas</h2>
            <div className="ep-areas-grid">
              {areas.map(a => <div key={a} className="ep-area-chip"><span className="ep-area-dot" />{a}</div>)}
            </div>
          </section>
          <section className="ep-sec">
            <div className="ep-sec-eye">❓ FAQ</div>
            <h2 className="ep-sec-title">Aksar Pooche Jaane Wale Sawaal</h2>
            <div className="ep-faqs">{faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          </section>
          <section className="ep-bottom-cta">
            <div className="ep-bc-inner">
              <div className="ep-bc-left">
                <div className="ep-bc-badge">⚡ Abhi Available</div>
                <h2 className="ep-bc-title">Emergency ya Planned — <span>Hum Hain!</span></h2>
                <p className="ep-bc-sub">Free estimate · Same day service · {settings.elec_reviewCount || '500+'} happy customers</p>
                <div className="ep-bc-btns">
                  <button className="ep-cta-primary" onClick={openWA}>💬 WhatsApp Now</button>
                  <a href={`tel:${PHONE}`} className="ep-cta-call">📞 Call Now</a>
                </div>
              </div>
              <div className="ep-bc-right">
                <div className="ep-guarantee-card">
                  <div className="ep-gc-title">🛡️ Our Guarantees</div>
                  {guarantees.map(g => <div key={g} className="ep-gc-item"><span className="ep-gc-check">✓</span><span>{g}</span></div>)}
                </div>
              </div>
            </div>
          </section>
          <AdSlot slot="bottom" />
        </div>

        <div className="ep-sticky-bar">
          <div className="ep-sticky-inner">
            <div className="ep-sticky-info">
              <div className="ep-sticky-title">⚡ Electrician Haldwani</div>
              <div className="ep-sticky-sub">Free estimate · Same day</div>
            </div>
            <div className="ep-sticky-btns">
              <button className="ep-sticky-wa" onClick={openWA}>💬 WhatsApp</button>
              <a href={`tel:${PHONE}`} className="ep-sticky-call">📞 Call</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

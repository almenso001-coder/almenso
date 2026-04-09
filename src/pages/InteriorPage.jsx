import React, { useState, useCallback, memo } from 'react'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { saveLeadDB } from '../utils/db'
import { useSettings } from '../context/SettingsContext'
import { LoginModal, getLoggedInUser } from '../components/PhoneLogin'
import './InteriorPage.css'

const BUDGET_OPTIONS = ['₹50,000 tak','₹50k–1 Lakh','₹1–2 Lakh','₹2–5 Lakh','₹5 Lakh+']

const PROCESS = [
  { n:'1', t:'Free Home Visit',   d:'Expert aayega, measurements lega, aapki requirements samjhega.',         time:'Within 24 hrs' },
  { n:'2', t:'3D Design Preview', d:'Kaam shuru karne se pehle 3D visualization dekhenge — changes free.',    time:'2–3 days'      },
  { n:'3', t:'Fixed Quote',       d:'Koi hidden charges nahi — ek baar decide hua toh final amount fixed.',   time:'Same day'      },
  { n:'4', t:'Professional Work', d:'Experienced team aayegi — kaam ke dauran ghar clean rakhna hamaari zimmedaari.', time:'7–21 days' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ip-faq ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ip-faq-q"><span>{q}</span><span>{open ? '▲' : '▼'}</span></div>
      {open && <div className="ip-faq-a">{a}</div>}
    </div>
  )
}

const SvcCard = memo(({ s, onQuote }) => (
  <div className="ip-svc-card">
    {s.badge && <span className="ip-svc-badge">{s.badge}</span>}
    <div className="ip-svc-top">
      <span className="ip-svc-ico">{s.emoji}</span>
      <div>
        <div className="ip-svc-name">{s.name}</div>
        <div className="ip-price-row">
          <span className="ip-svc-from">Shuru se {s.from}</span>
          {s.was && <span className="ip-svc-was">{s.was}</span>}
        </div>
      </div>
    </div>
    <p className="ip-svc-desc">{s.desc}</p>
    <button className="ip-svc-cta" onClick={onQuote}>Free Quote →</button>
  </div>
))

function LeadForm({ services, areas, WA, PHONE }) {
  const [form, setForm]       = useState({ name:'', phone:'', address:'', location: areas[0]||'Haldwani', budget:'', requirement:'', note:'' })
  const [status, setStatus]   = useState('idle')
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser]       = useState(() => getLoggedInUser())
  const update = useCallback((k, v) => setForm(p => ({ ...p, [k]: v })), [])

  const submit = async () => {
    if (!user)                                         return setShowLogin(true)
    if (!form.name.trim())                             return setStatus('err_name')
    if (!form.phone.trim() || form.phone.length < 10)  return setStatus('err_phone')
    if (!form.address.trim())                          return setStatus('err_address')
    if (!form.requirement)                             return setStatus('err_req')
    setStatus('sending')
    await saveLeadDB({ ...form, type:'interior', status:'new', createdAt: Date.now() })
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service_type:'interior', location: form.location })
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`🏠 Interior Design Enquiry\n\n👤 ${form.name}\n📞 ${form.phone}\n🏠 ${form.address}\n📍 ${form.location}\n💰 Budget: ${form.budget||'N/A'}\n🔧 ${form.requirement}${form.note ? `\n📝 ${form.note}` : ''}`)}`, '_blank')
    setStatus('done')
  }

  if (status === 'done') return (
    <div className="ip-form-success">
      <div>✅</div>
      <div className="ip-success-title">Home Visit Booked!</div>
      <div className="ip-success-sub">Team 24 ghante mein call karegi.</div>
      <button onClick={() => { setStatus('idle'); setForm({ name:'', phone:'', address:'', location:areas[0]||'Haldwani', budget:'', requirement:'', note:'' }) }}>Dobara Enquiry</button>
    </div>
  )

  const err = { err_name:'Naam daalna zaroori hai', err_phone:'Sahi phone number (10 digits)', err_address:'Ghar ka address zaroori hai', err_req:'Kya chahiye woh select karo' }[status]

  return (
    <div className="ip-form">
      <LoginModal show={showLogin} title="Free Visit Book Karne Ke Liye Login Karo"
        onSuccess={u => { setUser(u); setShowLogin(false); setForm(p => ({...p, name:p.name||u.name||'', phone:p.phone||u.phone||''})) }}
        onClose={() => setShowLogin(false)} />
      <div className="ip-form-urgency"><span className="ip-urgency-dot" /><span>📅 Is hafte 2 free home visit slots baaki hain!</span></div>
      <div className="ip-form-title">🏠 Free Home Visit Book Karo</div>
      <div className="ip-form-sub">Expert aayega · Free estimate · No pressure</div>
      {user ? (
        <div className="ip-logged-in"><span>✅ {user.name}</span><button onClick={() => { setUser(null); sessionStorage.removeItem('almenso_user') }}>Logout</button></div>
      ) : (
        <button className="ip-login-btn" onClick={() => setShowLogin(true)}>📱 Mobile Se Login Karo</button>
      )}
      {err && <div className="ip-err">⚠️ {err}</div>}
      <div className="ip-field"><label>Aapka Naam *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jaise: Anjali Rawat" /></div>
      <div className="ip-field"><label>Mobile Number *</label><input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" /></div>
      <div className="ip-field"><label>Ghar ka Address *</label><textarea value={form.address} onChange={e => update('address', e.target.value)} rows={2} placeholder="Mohalla, near landmark..." style={{resize:'none'}} /></div>
      <div className="ip-field"><label>Location *</label>
        <select value={form.location} onChange={e => update('location', e.target.value)}>
          {areas.map(a => <option key={a}>{a}</option>)}
          <option value="Other">Aur jagah</option>
        </select>
      </div>
      <div className="ip-field"><label>Budget Range</label>
        <select value={form.budget} onChange={e => update('budget', e.target.value)}>
          <option value="">— Select Budget —</option>
          {BUDGET_OPTIONS.map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="ip-field"><label>Kya Chahiye? *</label>
        <select value={form.requirement} onChange={e => update('requirement', e.target.value)}>
          <option value="">— Select Karo —</option>
          {services.map(s => <option key={s.name}>{s.emoji} {s.name}</option>)}
          <option>🏠 Complete Interior</option>
        </select>
      </div>
      <div className="ip-field"><label>Extra Detail (optional)</label><textarea value={form.note} onChange={e => update('note', e.target.value)} rows={2} placeholder="Room size, floor type, color preference..." /></div>
      <button className="ip-submit" onClick={submit} disabled={status === 'sending'}>
        {status === 'sending' ? '⏳ Bhej rahe hain...' : '🏠 Free Home Visit Book Karo'}
      </button>
      <div className="ip-form-divider">ya seedha contact karo</div>
      <div className="ip-form-contact">
        <a href={`tel:${PHONE}`} className="ip-call-btn">📞 Call Karo</a>
        <button className="ip-wa-btn" onClick={() => window.open(`https://wa.me/${WA}`, '_blank')}>💬 WhatsApp</button>
      </div>
      <div className="ip-form-trust">{['✅ Free Home Visit','🔒 No Advance','📐 3D Preview','⭐ 3yr Warranty'].map(t => <span key={t}>{t}</span>)}</div>
    </div>
  )
}

export default function InteriorPage() {
  const { settings } = useSettings()
  const WA    = settings.whatsapp || '919258133689'
  const PHONE = settings.phone    || '+919258133689'
  const areas = (settings.interiorAreas || '').split(',').map(a => a.trim()).filter(Boolean)

  const services   = (() => { try { return JSON.parse(settings.int_services || '[]') } catch { return [] } })()
  const reviews    = (() => { try { return JSON.parse(settings.int_reviews  || '[]') } catch { return [] } })()
  const faqs       = (() => { try { return JSON.parse(settings.int_faqs    || '[]') } catch { return [] } })()
  const guarantees = (settings.int_guarantees || '').split('|').filter(Boolean)

  const waQuote = useCallback(name => () =>
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Namaste! ${name} ke liye free quote chahiye.`)}`, '_blank'), [WA])

  return (
    <>
      <SEOHead
        title={`Interior Design Haldwani — Modular Kitchen, Wardrobe | Free Visit | ${settings.siteName || 'Almenso'}`}
        description="Modular kitchen ₹80k se, wardrobe ₹25k se — Haldwani, Nainital, Rudrapur mein. Free home visit. 3 saal warranty. 150+ projects."
        keywords="interior design haldwani, modular kitchen haldwani, wardrobe haldwani, interior design nainital"
        canonical="/interior-design"
      />
      <div className="ip-page">
        <div className="ip-sticky-bar">
          <span>🏠 Free Home Visit Available — Aaj Book Karo!</span>
          <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Interior design free home visit chahiye!')}`, '_blank')}>Book Now →</button>
        </div>
        <section className="ip-hero">
          <div className="ip-hero-left">
            <div className="ip-hero-eyebrow"><span className="ip-live-dot"/><span>🏠 Nainital & Udham Singh Nagar · {settings.int_reviewCount||'300+'} Projects</span></div>
            <h1 className="ip-hero-h1">
              {settings.int_heroTitle || 'Sapno Ka Ghar Banao'}<br />
              <em className="ip-hero-em">{settings.int_heroEm || 'Budget Mein — Haldwani'}</em>
            </h1>
            <p className="ip-hero-p">{settings.int_heroSub || 'Free home visit, 3D design preview, fixed price quote — koi hidden charge nahi. 3 saal warranty ke saath.'}</p>
            <div className="ip-hero-numbers">
              <div className="ip-num"><span>{settings.int_stat1n||'500+'}</span><small>{settings.int_stat1l||'Projects Done'}</small></div>
              <div className="ip-num-sep"/>
              <div className="ip-num"><span>{settings.int_stat2n||'4.9★'}</span><small>{settings.int_stat2l||'Rating'}</small></div>
              <div className="ip-num-sep"/>
              <div className="ip-num"><span>{settings.int_stat3n||'3yr'}</span><small>{settings.int_stat3l||'Warranty'}</small></div>
              <div className="ip-num-sep"/>
              <div className="ip-num"><span>{settings.int_stat4n||'₹0'}</span><small>{settings.int_stat4l||'Advance'}</small></div>
            </div>
            <div className="ip-hero-ctas">
              <button className="ip-cta-primary" onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Interior design free home visit chahiye.')}`, '_blank')}>🏠 Free Home Visit Book Karo</button>
              <a href={`tel:${PHONE}`} className="ip-cta-secondary">📞 {PHONE}</a>
            </div>
            <div className="ip-hero-proof">
              <div className="ip-proof-avatars">{['A','V','R','A','S'].map((l,i) => <div key={i} className="ip-proof-av" style={{ marginLeft: i ? -8 : 0 }}>{l}</div>)}</div>
              <div className="ip-proof-text"><strong>{settings.int_reviewCount||'300+'} families</strong> ne apna ghar banwaya hai<div className="ip-proof-stars">★★★★★ 4.9/5</div></div>
            </div>
          </div>
          <div className="ip-hero-right"><LeadForm services={services} areas={areas} WA={WA} PHONE={PHONE} /></div>
        </section>

        <div className="ip-body">
          <AdSlot slot="top" />
          <section className="ip-sec">
            <div className="ip-sec-hd"><div className="ip-sec-eye">💰 Transparent Pricing</div><h2 className="ip-sec-title">Services & Starting Prices</h2><p className="ip-sec-sub">Koi hidden charge nahi — pehle fixed quote, phir kaam shuru</p></div>
            <div className="ip-svc-grid">{services.map(s => <SvcCard key={s.name} s={s} onQuote={waQuote(s.name)} />)}</div>
          </section>
          <section className="ip-sec ip-process-sec">
            <div className="ip-sec-hd"><div className="ip-sec-eye">📋 Simple Process</div><h2 className="ip-sec-title">Kaam Kaise Hota Hai — 4 Easy Steps</h2></div>
            <div className="ip-process">
              {PROCESS.map(p => (
                <div key={p.n} className="ip-step">
                  <div className="ip-step-num">{p.n}</div>
                  <div><div className="ip-step-title">{p.t}</div><div className="ip-step-time">{p.time}</div><p className="ip-step-desc">{p.d}</p></div>
                </div>
              ))}
            </div>
          </section>
          <AdSlot slot="mid" />
          <section className="ip-sec">
            <div className="ip-sec-hd">
              <div className="ip-sec-eye">⭐ Customer Reviews</div>
              <h2 className="ip-sec-title">{settings.int_reviewCount||'300+'} Happy Customers</h2>
              <div className="ip-rating-bar"><span className="ip-rating-big">4.9</span><div><div className="ip-rating-stars">★★★★★</div><div className="ip-rating-count">{settings.int_reviewCount||'300+'} verified reviews</div></div></div>
            </div>
            <div className="ip-reviews-grid">
              {reviews.map(r => (
                <div key={r.name} className="ip-review">
                  <div className="ip-review-top">
                    <div className="ip-review-avatar">{r.name.charAt(0)}</div>
                    <div><div className="ip-review-name">{r.name}</div><div className="ip-review-city">📍 {r.city}</div></div>
                    <div className="ip-review-stars">{'★'.repeat(r.stars)}</div>
                  </div>
                  <p className="ip-review-text">"{r.text}"</p>
                  <div className="ip-review-tag">{r.svc}</div>
                </div>
              ))}
            </div>
          </section>
          {guarantees.length > 0 && (
            <section className="ip-guarantee">
              <div className="ip-g-inner">
                <div className="ip-g-ico">🛡️</div>
                <div><div className="ip-g-title">Almenso Interior Guarantee</div><div className="ip-g-points">{guarantees.map(p => <div key={p}><span>✅</span> {p}</div>)}</div></div>
              </div>
            </section>
          )}
          <section className="ip-sec"><h2 className="ip-sec-title">❓ Aksar Pooche Jaate Hain</h2><div className="ip-faqs">{faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div></section>
          <section className="ip-sec"><h2 className="ip-sec-title">📍 Service Areas</h2><div className="ip-areas">{areas.map(a => <span key={a}>📍 {a}</span>)}</div></section>
          <div className="ip-bottom-cta">
            <div className="ip-bcta-urgency">📅 Is hafte 2 free visit slots available!</div>
            <h2 className="ip-bcta-title">Aaj Hi Free Home Visit Book Karo!</h2>
            <p className="ip-bcta-sub">No advance · Free 3D design preview · Fixed price guaranteed</p>
            <div className="ip-bcta-btns">
              <button className="ip-cta-primary ip-cta-lg" onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Interior design free home visit chahiye.')}`, '_blank')}>💬 WhatsApp Pe Book Karo</button>
              <a href={`tel:${PHONE}`} className="ip-cta-secondary ip-cta-lg">📞 Call: {PHONE}</a>
            </div>
          </div>
          <AdSlot slot="bottom" />
        </div>
        <div className="svc-sticky-bar">
          <div className="svc-sticky-inner">
            <div className="svc-sticky-info"><div className="svc-sticky-title">Interior Design — Free Visit</div><div className="svc-sticky-sub">Same day response · No advance</div></div>
            <div className="svc-sticky-btns">
              <button className="svc-sticky-wa" onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Interior Design ke baare mein jaanna chahta hoon.')}`, '_blank', 'noopener')}>💬 WA</button>
              <a href={`tel:${PHONE}`} className="svc-sticky-call">📞 Call</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

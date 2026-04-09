import React, { useState, useCallback, memo } from 'react'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { saveLeadDB } from '../utils/db'
import { useSettings } from '../context/SettingsContext'
import { LoginModal, getLoggedInUser } from '../components/PhoneLogin'
import './SolarPage.css'

const SvcCard = memo(({ s, onQuote }) => (
  <div className="sp-svc-card">
    {s.badge && <span className="sp-svc-badge">{s.badge}</span>}
    <div className="sp-svc-top">
      <span className="sp-svc-ico">{s.emoji}</span>
      <div>
        <div className="sp-svc-name">{s.name}</div>
        <div className="sp-svc-price-row">
          <span className="sp-svc-from">Shuru se {s.from}</span>
          {s.was && <span className="sp-svc-was">{s.was}</span>}
        </div>
      </div>
    </div>
    <p className="sp-svc-desc">{s.desc}</p>
    <button className="sp-svc-cta" onClick={onQuote}>Get Free Quote →</button>
  </div>
))

const ReviewCard = memo(({ r }) => (
  <div className="sp-review">
    <div className="sp-review-top">
      <div className="sp-review-avatar">{r.name.charAt(0)}</div>
      <div><div className="sp-review-name">{r.name}</div><div className="sp-review-city">📍 {r.city}</div></div>
      <div className="sp-review-stars">{'★'.repeat(r.stars)}</div>
    </div>
    <p className="sp-review-text">"{r.text}"</p>
    <div className="sp-review-tag">{r.service}</div>
  </div>
))

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`sp-faq ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="sp-faq-q"><span>{q}</span><span>{open ? '▲' : '▼'}</span></div>
      {open && <div className="sp-faq-a">{a}</div>}
    </div>
  )
}

function LeadForm({ areas, WA, PHONE }) {
  const [form, setForm]       = useState({ name:'', phone:'', address:'', city: areas[0] || 'Haldwani', requirement:'', note:'' })
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
    await saveLeadDB({ ...form, type:'solar', status:'new', createdAt: Date.now() })
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service_type:'solar', city: form.city })
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`☀️ Solar Enquiry\n\n👤 ${form.name}\n📞 ${form.phone}\n🏠 ${form.address}\n📍 ${form.city}\n🔧 ${form.requirement}${form.note ? `\n📝 ${form.note}` : ''}`)}`, '_blank')
    setStatus('done')
  }

  if (status === 'done') return (
    <div className="sp-form-success">
      <div className="sp-success-ico">✅</div>
      <div className="sp-success-title">Quote Request Sent!</div>
      <div className="sp-success-sub">Hamari team 2 ghante mein call karegi.</div>
      <button onClick={() => { setStatus('idle'); setForm({ name:'', phone:'', address:'', city: areas[0]||'Haldwani', requirement:'', note:'' }) }}>Dobara Enquiry Karo</button>
    </div>
  )

  const errMsg = { err_name:'Naam daalna zaroori hai', err_phone:'Sahi phone number daalo', err_address:'Ghar ka address zaroori hai', err_req:'Kya chahiye woh select karo' }[status]

  return (
    <div className="sp-form">
      <LoginModal show={showLogin} title="Quote Ke Liye Login Karo"
        onSuccess={u => { setUser(u); setShowLogin(false); setForm(p => ({...p, name:p.name||u.name||'', phone:p.phone||u.phone||''})) }}
        onClose={() => setShowLogin(false)} />
      <div className="sp-form-urgency"><span className="sp-urgency-dot" /><span>⚡ Is hafte 3 slots baaki hain — aaj hi book karo!</span></div>
      <div className="sp-form-title">☀️ Free Solar Quote Pao</div>
      <div className="sp-form-sub">Site visit free · No advance · Expert team</div>
      {user ? (
        <div className="sp-logged-in"><span>✅ {user.name}</span><button onClick={() => { setUser(null); sessionStorage.removeItem('almenso_user') }}>Logout</button></div>
      ) : (
        <button className="sp-login-btn" onClick={() => setShowLogin(true)}>📱 Mobile Se Login Karo</button>
      )}
      {errMsg && <div className="sp-err">⚠️ {errMsg}</div>}
      <div className="sp-field"><label>Aapka Naam *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jaise: Rajesh Sharma" /></div>
      <div className="sp-field"><label>Mobile Number *</label><input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" /></div>
      <div className="sp-field"><label>Ghar ka Address *</label><textarea value={form.address} onChange={e => update('address', e.target.value)} rows={2} placeholder="Mohalla, near landmark..." style={{resize:'none'}} /></div>
      <div className="sp-field"><label>City *</label>
        <select value={form.city} onChange={e => update('city', e.target.value)}>
          {areas.map(a => <option key={a}>{a}</option>)}
          <option value="Other">Aur koi jagah</option>
        </select>
      </div>
      <div className="sp-field"><label>Kya Chahiye? *</label>
        <select value={form.requirement} onChange={e => update('requirement', e.target.value)}>
          <option value="">— Select Karo —</option>
          <option>☀️ Solar Panel System</option><option>🔌 Inverter</option>
          <option>🔋 Battery</option><option>🚿 Solar Geyser</option>
          <option>🚗 Car Battery</option><option>⚡ Solar Wiring & AMC</option>
        </select>
      </div>
      <div className="sp-field"><label>Extra Detail (optional)</label><textarea value={form.note} onChange={e => update('note', e.target.value)} rows={2} placeholder="Ghar ka size, existing system, budget..." /></div>
      <button className="sp-submit" onClick={submit} disabled={status === 'sending'}>
        {status === 'sending' ? '⏳ Bhej rahe hain...' : '💬 WhatsApp Pe Free Quote Pao'}
      </button>
      <div className="sp-form-divider">ya seedha contact karo</div>
      <div className="sp-form-contact">
        <a href={`tel:${PHONE}`} className="sp-call-btn">📞 Call Karo</a>
        <button className="sp-wa-btn" onClick={() => window.open(`https://wa.me/${WA}`, '_blank')}>💬 WhatsApp</button>
      </div>
      <div className="sp-form-trust">
        {['✅ Free Site Visit','🔒 No Advance','⭐ 200+ Installs','📜 PM Subsidy Help'].map(t => <span key={t}>{t}</span>)}
      </div>
    </div>
  )
}

const PROCESS = [
  { step:'1', title:'Free Site Visit',    desc:'Hamare expert aayenge, roof area aur load dekh ke free assessment karenge.',     time:'Within 24 hrs' },
  { step:'2', title:'Custom Quote',       desc:'Aapke budget aur load ke hisaab se best system suggest karenge — no pressure.',   time:'Same day'      },
  { step:'3', title:'Subsidy Help',       desc:'PM Surya Ghar subsidy ke saare documents hum bharenge — 40% government subsidy.', time:'2–4 weeks'     },
  { step:'4', title:'Professional Setup', desc:'Certified team installation karegi — earthing, wiring, inverter sab ke saath.',  time:'1–2 days'      },
]

export default function SolarPage() {
  const { settings } = useSettings()
  const WA    = settings.whatsapp || '919258133689'
  const PHONE = settings.phone    || '+919258133689'
  const areas = (settings.solarAreas || '').split(',').map(a => a.trim()).filter(Boolean)

  const services   = (() => { try { return JSON.parse(settings.solar_services || '[]') } catch { return [] } })()
  const reviews    = (() => { try { return JSON.parse(settings.solar_reviews  || '[]') } catch { return [] } })()
  const faqs       = (() => { try { return JSON.parse(settings.solar_faqs    || '[]') } catch { return [] } })()
  const guarantees = (settings.solar_guarantees || '').split('|').filter(Boolean)

  const waQuote = useCallback(name => () =>
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Namaste! ${name} ke liye quote chahiye Uttarakhand mein.`)}`, '_blank'), [WA])

  return (
    <>
      <SEOHead
        title={`Solar Panel & Battery Haldwani Uttarakhand | PM Subsidy | ${settings.siteName || 'Almenso'}`}
        description="Solar panel, inverter, battery — Haldwani se Uttarakhand bhar mein. 40% PM Surya Ghar subsidy. Free site visit. 200+ systems installed."
        keywords="solar panel haldwani, solar panel uttarakhand, inverter battery haldwani, pm surya ghar subsidy"
        canonical="/solar-solutions"
      />
      <div className="sp-page">
        <div className="sp-sticky-bar">
          <span>🔥 {settings.solar_urgency || 'Is hafte sirf 3 slots available!'}</span>
          <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Solar quote chahiye!')}`, '_blank')}>Free Quote Pao →</button>
        </div>

        <section className="sp-hero">
          <div className="sp-hero-left">
            <div className="sp-hero-eyebrow"><span className="sp-live-dot" /><span>☀️ Uttarakhand Solar Expert · {settings.solar_reviewCount || '200+'} Systems</span></div>
            <h1 className="sp-hero-h1">
              {settings.solar_heroTitle || 'Bijli Bill 90% Kam Karo'}<br />
              <em className="sp-hero-em">{settings.solar_heroEm || 'Solar Se Apna Ghar Chalao'}</em>
            </h1>
            <p className="sp-hero-p">{settings.solar_heroSub}</p>
            <div className="sp-hero-numbers">
              <div className="sp-num"><span>{settings.solar_stat1n||'40%'}</span><small>{settings.solar_stat1l||'Govt Subsidy'}</small></div>
              <div className="sp-num-sep"/>
              <div className="sp-num"><span>{settings.solar_stat2n||'5–7yr'}</span><small>{settings.solar_stat2l||'Payback'}</small></div>
              <div className="sp-num-sep"/>
              <div className="sp-num"><span>{settings.solar_stat3n||'25yr'}</span><small>{settings.solar_stat3l||'Panel Life'}</small></div>
              <div className="sp-num-sep"/>
              <div className="sp-num"><span>{settings.solar_stat4n||'200+'}</span><small>{settings.solar_stat4l||'Installed'}</small></div>
            </div>
            <div className="sp-hero-ctas">
              <button className="sp-cta-primary" onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Free solar site visit chahiye.')}`, '_blank')}>💬 Free Site Visit Book Karo</button>
              <a href={`tel:${PHONE}`} className="sp-cta-secondary">📞 {PHONE}</a>
            </div>
            <div className="sp-hero-proof">
              <div className="sp-proof-avatars">{['R','P','S','A','V'].map((l,i) => <div key={i} className="sp-proof-av" style={{ marginLeft: i ? -8 : 0 }}>{l}</div>)}</div>
              <div className="sp-proof-text">
                <strong>{settings.solar_reviewCount || '200+'} families</strong> already use solar in Uttarakhand
                <div className="sp-proof-stars">★★★★★ 4.9/5</div>
              </div>
            </div>
          </div>
          <div className="sp-hero-right"><LeadForm areas={areas} WA={WA} PHONE={PHONE} /></div>
        </section>

        <div className="sp-body">
          <AdSlot slot="top" />
          <section className="sp-sec">
            <div className="sp-sec-hd">
              <div className="sp-sec-eye">💰 Transparent Pricing</div>
              <h2 className="sp-sec-title">Hamaari Services & Prices</h2>
              <p className="sp-sec-sub">Koi hidden charge nahi — pehle quote, phir kaam</p>
            </div>
            <div className="sp-svc-grid">{services.map(s => <SvcCard key={s.name} s={s} onQuote={waQuote(s.name)} />)}</div>
          </section>
          <section className="sp-sec sp-process-sec">
            <div className="sp-sec-hd"><div className="sp-sec-eye">📋 Simple Process</div><h2 className="sp-sec-title">Solar Kaise Lagta Hai — 4 Steps</h2></div>
            <div className="sp-process">
              {PROCESS.map((p, i) => (
                <div key={p.step} className="sp-step">
                  <div className="sp-step-num">{p.step}</div>
                  {i < PROCESS.length - 1 && <div className="sp-step-line" />}
                  <div className="sp-step-body"><div className="sp-step-title">{p.title}</div><div className="sp-step-time">{p.time}</div><p className="sp-step-desc">{p.desc}</p></div>
                </div>
              ))}
            </div>
          </section>
          <AdSlot slot="mid" />
          <section className="sp-sec">
            <div className="sp-sec-hd">
              <div className="sp-sec-eye">⭐ Customer Reviews</div>
              <h2 className="sp-sec-title">{settings.solar_reviewCount || '200+'} Happy Customers Kehte Hain</h2>
              <div className="sp-rating-bar"><span className="sp-rating-big">4.9</span><div><div className="sp-rating-stars">★★★★★</div><div className="sp-rating-count">{settings.solar_reviewCount || '200+'} verified reviews</div></div></div>
            </div>
            <div className="sp-reviews-grid">{reviews.map(r => <ReviewCard key={r.name} r={r} />)}</div>
          </section>
          {guarantees.length > 0 && (
            <section className="sp-guarantee">
              <div className="sp-guarantee-inner">
                <div className="sp-g-ico">🛡️</div>
                <div>
                  <div className="sp-g-title">Almenso Solar Guarantee</div>
                  <div className="sp-g-points">{guarantees.map(p => <div key={p}><span>✅</span> {p}</div>)}</div>
                </div>
              </div>
            </section>
          )}
          <section className="sp-sec">
            <div className="sp-sec-hd"><h2 className="sp-sec-title">❓ Aksar Pooche Jaate Hain</h2></div>
            <div className="sp-faqs">{faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          </section>
          <section className="sp-sec">
            <h2 className="sp-sec-title">📍 Service Areas — Uttarakhand</h2>
            <div className="sp-areas">{areas.map(a => <span key={a}>📍 {a}</span>)}</div>
          </section>
          <div className="sp-bottom-cta">
            <div className="sp-bcta-urgency">⚡ {settings.solar_urgency || 'Is hafte 3 slots baaki — aaj book karo!'}</div>
            <h2 className="sp-bcta-title">Free Site Visit Book Karo — Aaj Hi!</h2>
            <p className="sp-bcta-sub">No charge · No pressure · Expert solar advice · PM Subsidy help</p>
            <div className="sp-bcta-btns">
              <button className="sp-cta-primary sp-cta-lg" onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Solar free site visit chahiye.')}`, '_blank')}>💬 WhatsApp Pe Book Karo</button>
              <a href={`tel:${PHONE}`} className="sp-cta-secondary sp-cta-lg">📞 Call: {PHONE}</a>
            </div>
          </div>
          <AdSlot slot="bottom" />
        </div>

        <div className="svc-sticky-bar">
          <div className="svc-sticky-inner">
            <div className="svc-sticky-info"><div className="svc-sticky-title">Solar Quote — Free Visit</div><div className="svc-sticky-sub">Same day response · No advance</div></div>
            <div className="svc-sticky-btns">
              <button className="svc-sticky-wa" onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Solar Quote ke baare mein jaanna chahta hoon.')}`, '_blank', 'noopener')}>💬 WA</button>
              <a href={`tel:${PHONE}`} className="svc-sticky-call">📞 Call</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * SERVICES PROMO PAGE — /services
 * Share this URL to promote all Almenso services
 * WhatsApp pe share karo, visiting card pe dalo, anywhere
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'

const PHONE = '+919258133689'
const WA    = '919258133689'

const SERVICES = [
  {
    icon:  '⚡',
    title: 'Electrician Service',
    sub:   'Haldwani & Surrounding Areas',
    color: '#0a2342',
    bg:    '#eff6ff',
    border:'#bfdbfe',
    points: [
      'Home Wiring & Rewiring — ₹500+',
      'Inverter + Battery Installation — ₹300+',
      'AC Repair & Service — ₹400+',
      'Fan, LED, MCB/DB Box Work',
      'Same-Day Emergency Service',
    ],
    cta:   'Book Electrician',
    path:  '/electrician-haldwani',
    badge: 'Same Day',
  },
  {
    icon:  '☀️',
    title: 'Solar & Battery Solutions',
    sub:   'Poore Uttarakhand Mein',
    color: '#b45309',
    bg:    '#fffbeb',
    border:'#fde68a',
    points: [
      'Solar Panel System 1kW–10kW',
      'Inverter + Battery (Luminous, Exide)',
      'Solar Geyser & Car Battery',
      'PM Surya Ghar Subsidy Help',
      'Free Site Visit',
    ],
    cta:   'Free Solar Quote',
    path:  '/solar-solutions',
    badge: '40% Subsidy',
  },
  {
    icon:  '🏠',
    title: 'Interior Design',
    sub:   'Nainital & Udham Singh Nagar',
    color: '#4f46e5',
    bg:    '#eef2ff',
    border:'#c7d2fe',
    points: [
      'Modular Kitchen — ₹80,000+',
      'Wardrobe & Almirah — ₹25,000+',
      'TV Panel / Feature Wall',
      'False Ceiling & Wall Texture',
      'Free Home Visit & Estimate',
    ],
    cta:   'Book Free Visit',
    path:  '/interior-design',
    badge: 'Free Visit',
  },
]

export default function ServicesPage() {
  const navigate = useNavigate()

  return (
    <>
      <SEOHead
        title="Hamaari Services — Electrician, Solar, Interior | Almenso"
        description="Electrician Haldwani, Solar & Battery Uttarakhand, Interior Design Nainital — trusted services at fair prices. Book karo ya WhatsApp karo."
        keywords="electrician haldwani, solar panel uttarakhand, interior design nainital, services haldwani, almenso services"
        canonical="/services"
      />

      <div style={{ minHeight:'100vh', background:'#f8f9fa' }}>

        {/* ── HERO ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0a2342 0%, #0f8a1f 60%, #059669 100%)',
          padding: '40px 16px 48px',
          textAlign: 'center',
          color: '#fff',
        }}>
          <div style={{ fontSize:'0.75rem', fontWeight:700, background:'rgba(255,255,255,0.15)', display:'inline-block', padding:'4px 14px', borderRadius:99, marginBottom:14 }}>
            📍 Haldwani & Uttarakhand
          </div>
          <h1 style={{ fontSize:'2rem', fontWeight:900, marginBottom:10, lineHeight:1.1, letterSpacing:'-0.03em' }}>
            Trusted Services<br/><span style={{ color:'#fbbf24' }}>Aapke Liye</span>
          </h1>
          <p style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.85)', maxWidth:400, margin:'0 auto 20px', lineHeight:1.6 }}>
            Electrician · Solar · Interior Design — fair price, guaranteed quality, aur real customer support
          </p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Namaste! Almenso services ke baare mein jaanna chahta hoon.')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ padding:'12px 24px', background:'#25d366', color:'#fff', borderRadius:12, fontWeight:800, fontSize:'0.9rem', textDecoration:'none', minHeight:46, display:'flex', alignItems:'center' }}>
              💬 WhatsApp Karo
            </a>
            <a href={`tel:${PHONE}`}
              style={{ padding:'12px 24px', background:'rgba(255,255,255,0.15)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:12, fontWeight:700, fontSize:'0.9rem', textDecoration:'none', minHeight:46, display:'flex', alignItems:'center' }}>
              📞 {PHONE}
            </a>
          </div>
        </div>

        <div style={{ maxWidth:900, margin:'0 auto', padding:'20px 14px 32px' }}>

          <AdSlot slot="top" />

          {/* ── SERVICE CARDS ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, marginTop:16 }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{
                background: s.bg,
                border: `2px solid ${s.border}`,
                borderRadius: 18,
                overflow: 'hidden',
              }}>
                {/* Card header */}
                <div style={{
                  background: s.color,
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:'2rem' }}>{s.icon}</span>
                    <div>
                      <div style={{ color:'#fff', fontWeight:900, fontSize:'1rem' }}>{s.title}</div>
                      <div style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.75rem' }}>{s.sub}</div>
                    </div>
                  </div>
                  <span style={{ background:'#fbbf24', color:'#0a2342', fontSize:'0.65rem', fontWeight:900, padding:'4px 10px', borderRadius:99, whiteSpace:'nowrap' }}>
                    {s.badge}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding:'16px 18px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 12px', marginBottom:16 }}>
                    {s.points.map(p => (
                      <div key={p} style={{ display:'flex', alignItems:'flex-start', gap:6, fontSize:'0.82rem', color:'#334155', lineHeight:1.4 }}>
                        <span style={{ color:s.color, fontWeight:900, flexShrink:0 }}>✓</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex', gap:8 }}>
                    <button
                      onClick={() => navigate(s.path)}
                      style={{ flex:1, padding:'12px', background:s.color, color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'var(--font)', minHeight:44 }}>
                      {s.icon} {s.cta}
                    </button>
                    <a
                      href={`https://wa.me/${WA}?text=${encodeURIComponent(`Namaste! ${s.title} ke baare mein jaanna chahta hoon.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ padding:'12px 16px', background:'#25d366', color:'#fff', borderRadius:10, fontWeight:700, fontSize:'0.82rem', textDecoration:'none', display:'flex', alignItems:'center', gap:4, minHeight:44 }}>
                      💬 WA
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AdSlot slot="mid" style={{ margin:'16px 0' }} />

          {/* ── WHY CHOOSE ── */}
          <div style={{ background:'#fff', borderRadius:16, border:'1.5px solid #e2e8f0', padding:'20px 18px', marginTop:16 }}>
            <h2 style={{ fontSize:'1rem', fontWeight:900, color:'#0f172a', marginBottom:14, textAlign:'center' }}>
              ✅ Kyun Almenso?
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                ['⚡','Same-Day Service','Emergency pe 1-3 ghante mein'],
                ['💰','Fair Pricing','Pehle estimate, phir kaam'],
                ['🔒','Guaranteed Work','Quality aur warranty ke saath'],
                ['📱','WhatsApp Support','Direct contact, koi middleman nahi'],
              ].map(([ico, t, d]) => (
                <div key={t} style={{ background:'#f8fafc', borderRadius:12, padding:'12px', textAlign:'center' }}>
                  <div style={{ fontSize:'1.5rem', marginBottom:5 }}>{ico}</div>
                  <div style={{ fontWeight:800, fontSize:'0.78rem', color:'#0f172a', marginBottom:3 }}>{t}</div>
                  <div style={{ fontSize:'0.68rem', color:'#64748b', lineHeight:1.4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FINAL CTA ── */}
          <div style={{ background:'linear-gradient(135deg, #0a2342, #0f8a1f)', borderRadius:16, padding:'24px 20px', marginTop:16, textAlign:'center', color:'#fff' }}>
            <div style={{ fontSize:'1.1rem', fontWeight:900, marginBottom:6 }}>Abhi Sampark Karo!</div>
            <div style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.8)', marginBottom:18 }}>
              Free estimate · No advance · Trusted service
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                style={{ padding:'13px 28px', background:'#25d366', color:'#fff', borderRadius:12, fontWeight:900, fontSize:'0.9rem', textDecoration:'none', minHeight:46, display:'flex', alignItems:'center' }}>
                💬 WhatsApp Karo
              </a>
              <a href={`tel:${PHONE}`}
                style={{ padding:'13px 28px', background:'rgba(255,255,255,0.15)', border:'1.5px solid rgba(255,255,255,0.3)', color:'#fff', borderRadius:12, fontWeight:800, fontSize:'0.9rem', textDecoration:'none', minHeight:46, display:'flex', alignItems:'center' }}>
                📞 Call Now
              </a>
            </div>
          </div>

          {/* ── TOOLS PROMO ── */}
          <div style={{ background:'#f0fdf4', borderRadius:16, border:'1.5px solid #bbf7d0', padding:'18px', marginTop:16, textAlign:'center' }}>
            <div style={{ fontWeight:900, fontSize:'0.95rem', color:'#14532d', marginBottom:6 }}>🛠️ Free Online Tools Bhi Hain!</div>
            <div style={{ fontSize:'0.8rem', color:'#166534', marginBottom:12 }}>
              GST Calculator, EMI Calculator, Bijli Bill, Image Tools — 100+ free tools, no login!
            </div>
            <button
              onClick={() => navigate('/tools')}
              style={{ padding:'10px 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.85rem', cursor:'pointer', fontFamily:'var(--font)' }}>
              🛠️ Tools Dekho →
            </button>
          </div>

          <AdSlot slot="bottom" style={{ marginTop:16 }} />
        </div>
      </div>
    </>
  )
}

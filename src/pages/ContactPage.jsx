/**
 * CONTACT US PAGE — AdSense Approval Ready
 * ✅ Multiple contact methods
 * ✅ Working contact form (WhatsApp)
 * ✅ Business hours & location
 * ✅ Google Maps embed ready
 * ✅ Ad slots: top, after-form
 */

import React, { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import './LegalPages.css'
import './ContactPage.css'

const SUBJECTS = [
  'General Inquiry',
  'Tool Error / Feedback',
  'Electrician Service Quote',
  'Solar Solutions Inquiry',
  'Interior Design Inquiry',
  'Order / Marketplace Issue',
  'Vendor / Partnership',
  'Advertising Inquiry',
  'Other',
]

const HOURS = [
  { day: 'Monday – Saturday', time: '9:00 AM – 8:00 PM' },
  { day: 'Sunday',            time: '10:00 AM – 4:00 PM' },
]

export default function ContactPage() {
  const { settings } = useSettings()
  const siteName = settings.siteName || 'Almenso'
  const phone    = settings.phone    || '+91-92581-33689'
  const whatsapp = settings.whatsapp || '919258133689'
  const email    = settings.email    || 'support@almenso.com'
  const address  = settings.address  || 'Haldwani, Uttarakhand, India — 263139'
  const timing   = settings.timing   || '9AM – 8PM (Mon–Sat)'

  const [form, setForm]     = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('')   // '' | 'sending' | 'sent' | 'error'
  const [touched, setTouched] = useState({})

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setTouched(t => ({ ...t, [e.target.name]: true }))
  }

  const isValid = form.name.trim().length >= 2 && form.message.trim().length >= 10

  const handleSubmit = () => {
    setTouched({ name: true, message: true })
    if (!isValid) { setStatus('error'); return }
    const msg = [
      `*Contact Form — ${siteName}*`,
      ``,
      `👤 Name: ${form.name}`,
      form.email   ? `📧 Email: ${form.email}`   : '',
      form.phone   ? `📞 Phone: ${form.phone}`   : '',
      form.subject ? `📋 Subject: ${form.subject}` : '',
      ``,
      `💬 Message:`,
      form.message,
    ].filter(l => l !== null).join('\n')
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    setStatus('sent')
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setTouched({})
  }

  const inp = (hasError) => ({
    width: '100%',
    padding: '10px 12px',
    border: `1.5px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
    borderRadius: 9,
    fontSize: '0.84rem',
    background: '#f9fafb',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  })

  return (
    <>
      <SEOHead
        title={`Contact Us | ${siteName} — Haldwani, Uttarakhand`}
        description={`Contact ${siteName} for free tool support, electrician service quotes, solar inquiries, or marketplace help. Call, WhatsApp, or email us — based in Haldwani, Uttarakhand.`}
        canonical="/contact"
        keywords={`contact almenso, almenso support, electrician haldwani contact, customer service almenso`}
      />

      <div className="legal-page">
        <div className="legal-container">

          <header className="legal-header">
            <div className="legal-badge">📬 We're Here to Help</div>
            <h1 className="legal-title">Contact Us</h1>
            <p className="legal-intro">
              Have a question, need a service quote, or found an error in one of our tools?
              We'd love to hear from you. Reach out via WhatsApp, call, or email — we're based
              in Haldwani and respond within 24 hours.
            </p>
          </header>

          {/* ═══ AD SLOT: TOP BANNER ═══ */}
          <AdSlot slot="top" style={{ margin: '0 0 20px' }} />

          <div className="legal-content">

            {/* Quick contact cards */}
            <div className="contact-cards-grid">
              <a href={`tel:${phone}`} className="contact-card-link">
                <div className="contact-card">
                  <div className="cc-icon">📞</div>
                  <div className="cc-title">Call Us</div>
                  <div className="cc-value">{phone}</div>
                  <div className="cc-hint">{timing}</div>
                </div>
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-card-link">
                <div className="contact-card contact-card--green">
                  <div className="cc-icon">💬</div>
                  <div className="cc-title">WhatsApp</div>
                  <div className="cc-value">Message Us</div>
                  <div className="cc-hint">Quick replies</div>
                </div>
              </a>
              <a href={`mailto:${email}`} className="contact-card-link">
                <div className="contact-card">
                  <div className="cc-icon">📧</div>
                  <div className="cc-title">Email</div>
                  <div className="cc-value">{email}</div>
                  <div className="cc-hint">Within 24 hrs</div>
                </div>
              </a>
              <div className="contact-card">
                <div className="cc-icon">📍</div>
                <div className="cc-title">Visit Us</div>
                <div className="cc-value" style={{ fontSize: '0.75rem' }}>{address}</div>
                <div className="cc-hint">By appointment</div>
              </div>
            </div>

            {/* Business Hours */}
            <section className="legal-section">
              <h2>Business Hours</h2>
              <div className="contact-hours">
                {HOURS.map(h => (
                  <div key={h.day} className="contact-hour-row">
                    <span className="chr-day">{h.day}</span>
                    <span className="chr-time">{h.time}</span>
                  </div>
                ))}
                <div className="contact-hour-note">
                  📱 WhatsApp messages are answered even outside business hours when possible.
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section className="legal-section">
              <h2>Send a Message</h2>
              <p style={{ marginBottom: 16, color: '#6b7280', fontSize: '0.85rem' }}>
                Fill in the form below and it will open WhatsApp with your message pre-filled.
                Alternatively, email us directly at <a href={`mailto:${email}`}>{email}</a>.
              </p>

              {status === 'sent' && (
                <div className="contact-success">
                  ✅ WhatsApp opened with your message! We'll respond soon.
                </div>
              )}

              <div className="contact-form">
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      style={inp(touched.name && form.name.trim().length < 2)}
                    />
                    {touched.name && form.name.trim().length < 2 && (
                      <span className="cf-error">Please enter your name</span>
                    )}
                  </div>
                </div>

                <div className="cf-row cf-row--two">
                  <div className="cf-field">
                    <label className="cf-label">Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inp(false)} />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Phone Number</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" style={inp(false)} />
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} style={inp(false)}>
                      <option value="">-- Select a topic --</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">Your Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your query or requirement..."
                      rows={5}
                      style={{ ...inp(touched.message && form.message.trim().length < 10), resize: 'vertical' }}
                    />
                    {touched.message && form.message.trim().length < 10 && (
                      <span className="cf-error">Please enter at least 10 characters</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="contact-submit-btn"
                >
                  💬 Send via WhatsApp
                </button>

                <p className="cf-alt-contact">
                  Prefer email? Write to us at <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </section>

            {/* ═══ AD SLOT: AFTER FORM ═══ */}
            <AdSlot slot="mid" style={{ margin: '8px 0' }} />

            {/* FAQ */}
            <section className="legal-section">
              <h2>Frequently Asked Questions</h2>
              {[
                { q: 'Are your tools really free?', a: `Yes! All 100+ tools on ${siteName} are completely free to use. No login, no subscription, no hidden charges.` },
                { q: 'How accurate are your calculators?', a: 'We update our tools regularly to reflect current GST rates, electricity tariffs, and financial data. However, always verify important financial decisions with a qualified professional.' },
                { q: 'Do you store the data I enter in tools?', a: 'No. All calculations happen locally in your browser. We never transmit or store your calculation inputs on our servers.' },
                { q: 'How can I report an error in a tool?', a: `Email us at ${email} with the tool name, the inputs you used, and the error you noticed. We will investigate and fix it as quickly as possible.` },
                { q: 'Do you provide electrician services outside Haldwani?', a: 'We primarily serve Haldwani and the Kumaon region. Contact us for service availability in your specific location.' },
              ].map((faq, i) => (
                <div key={i} className="contact-faq-item">
                  <div className="cfaq-q">❓ {faq.q}</div>
                  <div className="cfaq-a">{faq.a}</div>
                </div>
              ))}
            </section>

          </div>

          {/* ═══ AD SLOT: BOTTOM ═══ */}
          <AdSlot slot="bottom" style={{ margin: '8px 0 20px' }} />

          <div className="legal-footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span>|</span>
            <a href="/terms">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="/about">About Us</a>
            <span>|</span>
            <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          </div>

        </div>
      </div>
    </>
  )
}

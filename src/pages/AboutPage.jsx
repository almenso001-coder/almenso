/**
 * ABOUT US PAGE — AdSense Approval Ready
 * ✅ Rich original content (required by AdSense)
 * ✅ Clear business identity & mission
 * ✅ Team/story section for trustworthiness
 * ✅ Ad slots: top, mid, bottom
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { useSettings } from '../context/SettingsContext'
import AdSlot from '../components/AdSlot'
import './LegalPages.css'

const STATS = [
  { value: '100+', label: 'Free Tools' },
  { value: '500+', label: 'Happy Customers' },
  { value: '5+',   label: 'Years of Service' },
  { value: '24/7', label: 'Tools Available' },
]

const SERVICES = [
  {
    emoji: '⚡',
    title: 'Electrician Services',
    desc: 'Licensed electrician services in Haldwani & Kumaon region. Wiring, installations, repairs, and electrical safety audits.',
    path: '/electrician-haldwani',
  },
  {
    emoji: '☀️',
    title: 'Solar Solutions',
    desc: 'On-grid and off-grid solar panel installation, battery backup systems, and solar ROI consultation across Uttarakhand.',
    path: '/solar-solutions',
  },
  {
    emoji: '🏠',
    title: 'Interior Design',
    desc: 'Affordable interior design consultation and execution for homes, offices, and shops in Haldwani and Nainital.',
    path: '/interior-design',
  },
  {
    emoji: '🛠️',
    title: 'Free Online Tools',
    desc: '100+ free tools including GST Calculator, EMI Calculator, Electricity Bill Analyzer, Invoice Generator, and more.',
    path: '/tools',
  },
]

const VALUES = [
  { emoji: '🎯', title: 'Accuracy First', desc: 'Our tools are regularly updated to reflect current GST rates, electricity tariffs, and financial data.' },
  { emoji: '🔒', title: 'Privacy Respected', desc: 'Your tool inputs never leave your browser. We process calculations locally — no data stored on our servers.' },
  { emoji: '🌟', title: 'Local First', desc: 'We are a Haldwani-based business serving Uttarakhand. We understand local needs, rates, and challenges.' },
  { emoji: '💡', title: 'Always Improving', desc: 'We listen to feedback and continuously add new tools and features based on what our users actually need.' },
]

export default function AboutPage() {
  const { settings } = useSettings()
  const nav = useNavigate()
  const siteName = settings.siteName || 'Almenso'
  const tagline  = settings.tagline  || 'Free Tools & Services — Haldwani, Uttarakhand'
  const email    = settings.email    || 'support@almenso.com'
  const phone    = settings.phone    || '+91-92581-33689'
  const address  = settings.address  || 'Haldwani, Uttarakhand, India — 263139'
  const founded  = settings.founded  || '2021'

  return (
    <div className="legal-page">
      <SEOHead
        title={`About Us | ${siteName} — Free Tools & Services Haldwani`}
        description={`Learn about ${siteName} — a Haldwani-based platform offering 100+ free online tools (GST, EMI, Bijli Bill), electrician services, solar solutions, and more in Uttarakhand.`}
        canonical="/about"
        keywords={`about almenso, almenso haldwani, free tools india, electrician haldwani, solar uttarakhand`}
      />

      <div className="legal-container">
        {/* Hero */}
        <header className="legal-header about-hero">
          <div className="about-logo-wrap">
            <div className="about-logo-icon">⚡</div>
          </div>
          <h1 className="legal-title">{settings.aboutHeading || `About ${siteName}`}</h1>
          <p className="legal-intro">{settings.aboutTagline || tagline}</p>
          <p className="legal-intro" style={{ marginTop: 8 }}>
            {settings.aboutDesc ||
              `${siteName} is a Haldwani-based digital platform founded in ${founded}, combining free online tools with real local services. We help individuals and businesses across Uttarakhand calculate, plan, and connect — all in one place, without any login required.`}
          </p>
        </header>

        {/* ═══ AD SLOT: TOP BANNER ═══ */}
        <AdSlot slot="top" style={{ margin: '0 0 20px' }} />

        <div className="legal-content">

          {/* Stats */}
          <div className="about-stats">
            {STATS.map(s => (
              <div key={s.label} className="about-stat-item">
                <div className="about-stat-value">{s.value}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <section className="legal-section">
            <h2>Our Story</h2>
            <p>
              {siteName} started as a simple idea: what if local people in Haldwani could access
              reliable calculators and tools in their own language, without advertisements blocking
              every click, and without needing to download anything?
            </p>
            <p>
              Founded in {founded} by a Haldwani-based entrepreneur, we began with a handful of
              tools — a GST calculator and an EMI estimator — built specifically for small business
              owners and families in Uttarakhand. Word spread quickly. Local electricians started
              using our wire size calculator. Shop owners relied on our invoice generator. Students
              used our unit converter for studies.
            </p>
            <p>
              Today, {siteName} offers <strong>100+ free tools</strong>, a local service marketplace,
              and informative blog content — all accessible from any device, no login required.
              We remain a proudly local business, based in Haldwani, serving Kumaon and beyond.
            </p>
            {settings.aboutExtra && <p>{settings.aboutExtra}</p>}
          </section>

          {/* Mission */}
          <section className="legal-section">
            <h2>Our Mission</h2>
            <div className="about-mission-box">
              <div className="about-mission-icon">🎯</div>
              <p>
                {settings.aboutMission ||
                  `To empower individuals and small businesses in Uttarakhand with free, accurate digital tools and trustworthy local services — making modern technology accessible to everyone, regardless of technical knowledge.`}
              </p>
            </div>
          </section>

          {/* Services */}
          <section className="legal-section">
            <h2>What We Offer</h2>
            <div className="about-services-grid">
              {SERVICES.map(s => (
                <div key={s.title} className="about-service-card" onClick={() => nav(s.path)} role="button" tabIndex={0}>
                  <div className="asc-emoji">{s.emoji}</div>
                  <div className="asc-title">{s.title}</div>
                  <div className="asc-desc">{s.desc}</div>
                  <div className="asc-link">Learn More →</div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ AD SLOT: MID ═══ */}
          <AdSlot slot="mid" style={{ margin: '8px 0' }} />

          {/* Values */}
          <section className="legal-section">
            <h2>Our Values</h2>
            <div className="about-values-grid">
              {VALUES.map(v => (
                <div key={v.title} className="about-value-item">
                  <div className="avi-emoji">{v.emoji}</div>
                  <div className="avi-title">{v.title}</div>
                  <div className="avi-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Features from admin */}
          {settings.aboutFeatures && (
            <section className="legal-section">
              <h2>Why Choose {siteName}</h2>
              {settings.aboutFeatures.split('\n').filter(Boolean).map((f, i) => (
                <div key={i} className="about-feature-row">
                  <span className="afr-check">✅</span>
                  <span>{f}</span>
                </div>
              ))}
            </section>
          )}

          {/* Contact */}
          <section className="legal-section">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you — whether it's feedback on our tools, a service inquiry,
              or a partnership opportunity.
            </p>
            <div className="legal-contact-box" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="about-contact-item">
                <span className="aci-ico">📞</span>
                <div>
                  <div className="aci-label">Phone / WhatsApp</div>
                  <a href={`tel:${phone}`} className="aci-val">{phone}</a>
                </div>
              </div>
              <div className="about-contact-item">
                <span className="aci-ico">📧</span>
                <div>
                  <div className="aci-label">Email</div>
                  <a href={`mailto:${email}`} className="aci-val">{email}</a>
                </div>
              </div>
              <div className="about-contact-item" style={{ gridColumn: '1 / -1' }}>
                <span className="aci-ico">📍</span>
                <div>
                  <div className="aci-label">Address</div>
                  <div className="aci-val">{address}</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <button
                onClick={() => nav('/contact')}
                className="about-contact-btn"
              >
                📬 Send Us a Message
              </button>
            </div>
          </section>

          {/* Advertising disclosure */}
          <section className="legal-section">
            <h2>Advertising Disclosure</h2>
            <p>
              {siteName} is a free platform. To keep our tools free for everyone, we display
              advertisements through <strong>Google AdSense</strong> and may include affiliate links.
              Advertisements are clearly labeled and separate from our editorial content.
              We do not endorse or guarantee any advertised product or service.
            </p>
            <p>
              Our tool recommendations and content are editorially independent and are never
              influenced by advertisers. If you have questions about our advertising practices,
              contact us at {email}.
            </p>
          </section>

        </div>

        {/* ═══ AD SLOT: BOTTOM ═══ */}
        <AdSlot slot="bottom" style={{ margin: '8px 0 20px' }} />

        <div className="legal-footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>|</span>
          <a href="/terms">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="/contact">Contact Us</a>
          <span>|</span>
          <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}

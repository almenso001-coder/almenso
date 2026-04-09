/**
 * INTERLINKING WIDGET — Unified Tool ↔ Article ↔ Affiliate
 * 
 * Master config: tool → related blog + affiliate products
 * Shows as sticky sidebar OR inline card depending on context
 * 
 * Usage:
 *   <InterlinkedWidget toolPath="/tools/gst-calculator" />
 *   <InterlinkedWidget articleSlug="bijli-bill-kaise-kam-kare" />
 */
import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── MASTER INTERLINKING MAP ─────────────────────────────────
   tool path → { blog articles, affiliate products, related tools, service }
──────────────────────────────────────────────────────────── */
export const INTERLINK_MAP = {

  // ── ELECTRICITY / BIJLI ──────────────────────────────────
  '/tools/bijli': {
    articles: [
      { slug: 'bijli-bill-kaise-kam-kare', title: 'Bijli Bill Kaise Kam Kare? 10 Tips', emoji: '⚡' },
      { slug: 'solar-panel-uttarakhand-guide', title: 'Solar Panel Lagwao — Complete Guide', emoji: '☀️' },
    ],
    relatedTools: [
      { path: '/tools/electricity-cost-calculator', name: 'Electricity Cost Calculator', emoji: '💡' },
      { path: '/tools/power-consumption-planner', name: 'Power Consumption Planner', emoji: '🏠' },
      { path: '/tools/solar-roi', name: 'Solar ROI Calculator', emoji: '☀️' },
      { path: '/tools/inverter-load-planner', name: 'Inverter Load Planner', emoji: '🔋' },
    ],
    service: { path: '/electrician-haldwani', label: 'Expert Electrician Bulao', emoji: '⚡', color: '#1d4ed8' },
    affCategory: 'electrical',
  },

  '/tools/electricity-cost-calculator': {
    articles: [
      { slug: 'bijli-bill-kaise-kam-kare', title: 'Bijli Bill Kaise Kam Kare?', emoji: '⚡' },
    ],
    relatedTools: [
      { path: '/tools/bijli', name: 'Bijli Bill Analyzer', emoji: '⚡' },
      { path: '/tools/appliance-power-calculator', name: 'Appliance Power Calculator', emoji: '🔌' },
      { path: '/tools/inverter-load-planner', name: 'Inverter Planner', emoji: '🔋' },
    ],
    service: { path: '/electrician-haldwani', label: 'Wiring Expert Bulao', emoji: '⚡', color: '#1d4ed8' },
    affCategory: 'electrical',
  },

  '/tools/solar-roi': {
    articles: [
      { slug: 'solar-panel-uttarakhand-guide', title: 'Solar Panel Uttarakhand Guide', emoji: '☀️' },
      { slug: 'pm-surya-ghar-subsidy', title: 'PM Surya Ghar — 40% Subsidy Kaise Milti Hai', emoji: '🏛️' },
    ],
    relatedTools: [
      { path: '/tools/bijli', name: 'Bijli Bill Analyzer', emoji: '⚡' },
      { path: '/tools/solar-panel-calculator', name: 'Solar Panel Calculator', emoji: '☀️' },
      { path: '/tools/inverter-load-planner', name: 'Inverter Load Planner', emoji: '🔋' },
    ],
    service: { path: '/solar-solutions', label: 'Free Solar Quote Lo', emoji: '☀️', color: '#d97706' },
    affCategory: 'solar',
  },

  '/tools/inverter-load-planner': {
    articles: [
      { slug: 'inverter-battery-selection-guide', title: 'Sahi Inverter Battery Kaise Chunein', emoji: '🔋' },
      { slug: 'bijli-bill-kaise-kam-kare', title: 'Bijli Bill Kaise Kam Kare?', emoji: '⚡' },
    ],
    relatedTools: [
      { path: '/tools/bijli', name: 'Bijli Bill Analyzer', emoji: '⚡' },
      { path: '/tools/battery-backup-calculator', name: 'Battery Backup Calculator', emoji: '🔋' },
      { path: '/tools/electricity-cost-calculator', name: 'Electricity Cost Calculator', emoji: '💡' },
    ],
    service: { path: '/electrician-haldwani', label: 'Inverter Install Karwao', emoji: '🔋', color: '#0f766e' },
    affCategory: 'electrical',
  },

  // ── FINANCE / GST / EMI ──────────────────────────────────
  '/tools/gst-calculator': {
    articles: [
      { slug: 'gst-kya-hoti-hai-chote-business-ke-liye', title: 'GST Kya Hai? Complete Guide', emoji: '🧾' },
      { slug: 'online-business-kaise-shuru-kare', title: 'Online Business Kaise Shuru Karein', emoji: '🛒' },
    ],
    relatedTools: [
      { path: '/tools/emi-calculator', name: 'EMI Calculator', emoji: '🏦' },
      { path: '/tools/profit-margin-calculator', name: 'Profit Margin Calculator', emoji: '📊' },
      { path: '/tools/discount-calculator', name: 'Discount Calculator', emoji: '🏷️' },
      { path: '/tools/percentage-calculator', name: 'Percentage Calculator', emoji: '📈' },
    ],
    affCategory: 'finance',
  },

  '/tools/emi-calculator': {
    articles: [
      { slug: 'home-loan-guide-2025', title: 'Home Loan Guide 2025 — Complete Guide', emoji: '🏠' },
      { slug: 'gst-kya-hoti-hai-chote-business-ke-liye', title: 'GST Guide for Business', emoji: '🧾' },
    ],
    relatedTools: [
      { path: '/tools/loan-calculator', name: 'Loan Calculator', emoji: '💰' },
      { path: '/tools/simple-interest-calculator', name: 'Interest Calculator', emoji: '📊' },
      { path: '/tools/compound-interest-calculator', name: 'Compound Interest', emoji: '📈' },
      { path: '/tools/gst-calculator', name: 'GST Calculator', emoji: '🧾' },
    ],
    affCategory: 'finance',
  },

  '/tools/sip-calculator': {
    articles: [
      { slug: 'mutual-fund-sip-kaise-shuru-kare', title: 'SIP Kaise Shuru Karein — ₹500 Se', emoji: '📈' },
    ],
    relatedTools: [
      { path: '/tools/compound-interest-calculator', name: 'Compound Interest', emoji: '📈' },
      { path: '/tools/investment-return-calculator', name: 'Investment Return', emoji: '💰' },
      { path: '/tools/retirement-calculator', name: 'Retirement Calculator', emoji: '🌴' },
      { path: '/tools/savings-calculator', name: 'Savings Calculator', emoji: '💰' },
    ],
    affCategory: 'finance',
  },

  // ── IMAGE TOOLS ──────────────────────────────────────────
  '/tools/image-compressor': {
    articles: [
      { slug: 'image-optimization-guide', title: 'Image Optimization — Website Fast Karo', emoji: '🖼️' },
    ],
    relatedTools: [
      { path: '/tools/image-resizer', name: 'Image Resizer', emoji: '📐' },
      { path: '/tools/image-format-converter', name: 'Format Converter', emoji: '🔄' },
      { path: '/tools/image-converter', name: 'Image Converter', emoji: '🖼️' },
      { path: '/tools/image-watermark', name: 'Image Watermark', emoji: '🔏' },
    ],
    affCategory: 'design',
  },

  '/tools/image-resizer': {
    articles: [
      { slug: 'image-optimization-guide', title: 'Image Optimization Guide', emoji: '🖼️' },
    ],
    relatedTools: [
      { path: '/tools/image-compressor', name: 'Image Compressor', emoji: '🗜️' },
      { path: '/tools/image-cropper', name: 'Image Cropper', emoji: '✂️' },
      { path: '/tools/image-format-converter', name: 'Format Converter', emoji: '🔄' },
    ],
    affCategory: 'design',
  },

  // ── HEALTH / BMI ──────────────────────────────────────────
  '/tools/bmi-calculator': {
    articles: [
      { slug: 'bmi-healthy-weight-guide', title: 'BMI kya hota hai — Healthy Weight Guide', emoji: '⚖️' },
    ],
    relatedTools: [
      { path: '/tools/bmr-calculator', name: 'BMR Calculator', emoji: '🔥' },
      { path: '/tools/ideal-weight-calculator', name: 'Ideal Weight', emoji: '⚖️' },
      { path: '/tools/calorie-calculator', name: 'Calorie Calculator', emoji: '🥗' },
      { path: '/tools/age-calculator', name: 'Age Calculator', emoji: '🎂' },
    ],
    affCategory: 'health',
  },

  // ── TEXT TOOLS ───────────────────────────────────────────
  '/tools/word-counter': {
    articles: [
      { slug: 'google-adsense-approve-kaise-kare', title: 'AdSense Approve Kaise Karein', emoji: '💰' },
    ],
    relatedTools: [
      { path: '/tools/character-counter', name: 'Character Counter', emoji: '🔤' },
      { path: '/tools/sentence-counter', name: 'Sentence Counter', emoji: '📝' },
      { path: '/tools/paragraph-counter', name: 'Paragraph Counter', emoji: '📑' },
      { path: '/tools/text-case-converter', name: 'Text Case Converter', emoji: '🔡' },
    ],
    affCategory: 'tech',
  },

  // ── QR CODE ──────────────────────────────────────────────
  '/tools/qr-code-generator': {
    articles: [
      { slug: 'upi-qr-code-dukaan-ke-liye', title: 'Dukaan Ke Liye UPI QR Code — Free', emoji: '📱' },
    ],
    relatedTools: [
      { path: '/tools/password-generator', name: 'Password Generator', emoji: '🔐' },
      { path: '/tools/business-name-generator', name: 'Business Name Generator', emoji: '🏢' },
      { path: '/tools/domain-name-generator', name: 'Domain Name Generator', emoji: '🌐' },
    ],
    affCategory: 'tech',
  },

  // ── AGE CALCULATOR ───────────────────────────────────────
  '/tools/age-calculator': {
    articles: [
      { slug: 'age-calculator-uses', title: 'Online Age Calculator Kaise Use Karein', emoji: '🎂' },
    ],
    relatedTools: [
      { path: '/tools/date-duration-calculator', name: 'Date Duration', emoji: '📅' },
      { path: '/tools/bmi-calculator', name: 'BMI Calculator', emoji: '⚖️' },
      { path: '/tools/retirement-calculator', name: 'Retirement Calculator', emoji: '🌴' },
    ],
    affCategory: 'health',
  },

  // ── PASSWORD GENERATOR ───────────────────────────────────
  '/tools/password-generator': {
    articles: [
      { slug: 'password-security-guide', title: 'Strong Password Kaise Banayein', emoji: '🔐' },
    ],
    relatedTools: [
      { path: '/tools/username-generator', name: 'Username Generator', emoji: '👤' },
      { path: '/tools/fake-email-generator', name: 'Fake Email Generator', emoji: '📧' },
      { path: '/tools/qr-code-generator', name: 'QR Code Generator', emoji: '📱' },
    ],
    affCategory: 'tech',
  },
}

/* ── Blog Article → Tool Map ─────────────────────────────── */
export const ARTICLE_TOOL_MAP = {
  'bijli-bill-kaise-kam-kare':              '/tools/bijli',
  'gst-kya-hoti-hai-chote-business-ke-liye': '/tools/gst-calculator',
  'home-loan-guide-2025':                   '/tools/emi-calculator',
  'solar-panel-uttarakhand-guide':          '/tools/solar-roi',
  'inverter-battery-selection-guide':       '/tools/inverter-load-planner',
  'mutual-fund-sip-kaise-shuru-kare':       '/tools/sip-calculator',
  'google-adsense-approve-kaise-kare':      '/tools/word-counter',
  'upi-qr-code-dukaan-ke-liye':            '/tools/qr-code-generator',
  'online-business-kaise-shuru-kare':       '/tools/gst-calculator',
  'bmi-healthy-weight-guide':               '/tools/bmi-calculator',
  'image-optimization-guide':              '/tools/image-compressor',
}

/* ── Inline Tool CTA Card (shown inside blog articles) ────── */
export const ToolCTACard = memo(function ToolCTACard({ path, label, desc, emoji = '🛠️' }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(path)}
      style={{
        background: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
        border: '2px solid #93c5fd',
        borderRadius: 14,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        cursor: 'pointer',
        margin: '20px 0',
        transition: 'all 0.2s',
        textDecoration: 'none',
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
    >
      <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#1e40af', marginBottom: 3 }}>
          🔗 {label}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>{desc}</div>
      </div>
      <div style={{ fontWeight: 900, color: '#1565c0', fontSize: '1.2rem' }}>→</div>
    </div>
  )
})

/* ── Related Articles Card (shown on tool pages) ─────────── */
export const RelatedArticlesCard = memo(function RelatedArticlesCard({ toolPath }) {
  const navigate = useNavigate()
  const config = INTERLINK_MAP[toolPath]
  if (!config?.articles?.length) return null

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1.5px solid #e2e8f0',
      overflow: 'hidden',
      marginBottom: 16,
    }}>
      <div style={{
        background: 'linear-gradient(135deg,#1e3a5f,#1565c0)',
        padding: '12px 18px',
        color: '#fff',
        fontSize: '0.82rem',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        📝 Related Articles
      </div>
      {config.articles.map((a, i) => (
        <div
          key={i}
          onClick={() => navigate(`/blog/${a.slug}`)}
          style={{
            padding: '14px 18px',
            borderBottom: i < config.articles.length - 1 ? '1px solid #f1f5f9' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            transition: 'background 0.15s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseOut={e => e.currentTarget.style.background = '#fff'}
        >
          <span style={{ fontSize: '1.4rem' }}>{a.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{a.title}</div>
            <div style={{ fontSize: '0.7rem', color: '#1565c0', marginTop: 2, fontWeight: 600 }}>Read article →</div>
          </div>
        </div>
      ))}
    </div>
  )
})

/* ── Service CTA Strip (shown on tool pages) ─────────────── */
export const ServiceCTAStrip = memo(function ServiceCTAStrip({ toolPath }) {
  const navigate = useNavigate()
  const config = INTERLINK_MAP[toolPath]
  if (!config?.service) return null
  const s = config.service

  return (
    <div
      onClick={() => navigate(s.path)}
      style={{
        background: `linear-gradient(135deg,${s.color}15,${s.color}25)`,
        border: `2px solid ${s.color}40`,
        borderRadius: 14,
        padding: '16px 20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 16,
      }}
    >
      <span style={{ fontSize: '2rem' }}>{s.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, fontSize: '0.9rem', color: s.color }}>{s.label}</div>
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>Professional service available →</div>
      </div>
      <div style={{ background: s.color, color: '#fff', borderRadius: 8, padding: '6px 14px', fontSize: '0.78rem', fontWeight: 800 }}>
        Book Now
      </div>
    </div>
  )
})

/* ── Related Tools Grid (compact) ────────────────────────── */
export const RelatedToolsGrid = memo(function RelatedToolsGrid({ toolPath, max = 4 }) {
  const navigate = useNavigate()
  const config = INTERLINK_MAP[toolPath]
  if (!config?.relatedTools?.length) return null
  const tools = config.relatedTools.slice(0, max)

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1.5px solid #e2e8f0',
      overflow: 'hidden',
      marginBottom: 16,
    }}>
      <div style={{
        background: '#f8fafc',
        padding: '12px 18px',
        fontSize: '0.78rem',
        fontWeight: 800,
        color: '#334155',
        borderBottom: '1px solid #e2e8f0',
      }}>
        🛠️ Related Tools
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {tools.map((t, i) => (
          <div
            key={t.path}
            onClick={() => navigate(t.path)}
            style={{
              padding: '12px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: i < tools.length - 2 ? '1px solid #f1f5f9' : 'none',
              borderRight: i % 2 === 0 ? '1px solid #f1f5f9' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseOut={e => e.currentTarget.style.background = '#fff'}
          >
            <span style={{ fontSize: '1.1rem' }}>{t.emoji}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', lineHeight: 1.3 }}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

/* ── Main InterlinkedWidget — use on any page ─────────────── */
export default function InterlinkedWidget({ toolPath, articleSlug, compact = false }) {
  const resolvedPath = toolPath || (articleSlug && ARTICLE_TOOL_MAP[articleSlug]) || null

  if (!resolvedPath) return null

  return (
    <div style={{ margin: compact ? '0' : '16px 0' }}>
      <RelatedArticlesCard toolPath={resolvedPath} />
      <ServiceCTAStrip toolPath={resolvedPath} />
      <RelatedToolsGrid toolPath={resolvedPath} />
    </div>
  )
}

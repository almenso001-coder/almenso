import React from 'react'
import { useSettings } from '../context/SettingsContext'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import './ToolShared.css'

export default function DisclaimerPage() {
  const { settings } = useSettings()
  const name  = settings.storeName || 'Almenso'
  const email = settings.email     || 'support@almenso.com'

  const sections = [
    {
      icon: '🛠️', title: 'Tools & Calculators Disclaimer',
      body: `All calculators and tools on ${name} — including GST Calculator, EMI Calculator, Electricity Bill Analyzer, Solar ROI Calculator, and others — provide estimates based on publicly available data and user inputs. Results are for informational and educational purposes only. Actual figures may vary based on your specific circumstances, applicable regulations, and real-time rate changes.`
    },
    {
      icon: '⚡', title: 'Electricity & Tariff Data',
      body: `Electricity tariff rates used in our calculators are sourced from state electricity board notifications (UPCL, UPPCL, MSEDCL, JVVNL, etc.) and updated periodically. However, rates change and may not reflect the most current tariffs. Always verify your bill with your electricity provider. ${name} is not responsible for any discrepancy between calculated and actual electricity bills.`
    },
    {
      icon: '💰', title: 'Financial Calculations (EMI, GST, Loan)',
      body: `EMI, GST, loan interest, and profit margin calculations are mathematical estimates. They do not constitute financial advice. Actual bank EMIs may differ due to processing fees, insurance, prepayment charges, or bank-specific policies. Always consult your bank or a certified financial advisor before making financial decisions.`
    },
    {
      icon: '☀️', title: 'Solar & Energy Tools',
      body: `Solar ROI, payback period, and savings calculations are projections based on assumptions about sunlight hours, electricity rates, and system performance. Actual solar generation varies by location, weather, panel degradation, and installation quality. Get a professional site assessment before investing in solar.`
    },
    {
      icon: '📝', title: 'Blog & Articles',
      body: `Articles and guides on ${name} are written for general informational purposes. They reflect conditions at the time of writing and may become outdated. Content about taxes, legal requirements, financial products, or technical standards should be verified with current official sources or qualified professionals.`
    },
    {
      icon: '🛒', title: 'Product & Service Information',
      body: `Product prices, availability, and specifications listed on ${name} are provided by vendors and may change without notice. ${name} does not guarantee the accuracy of vendor-provided information. Always confirm details with the vendor before placing an order.`
    },
    {
      icon: '🔗', title: 'Third-Party Links & Affiliates',
      body: `${name} may contain links to third-party websites and affiliate products (including Earn/Affiliate section). We do not control or endorse these external sites and are not responsible for their content or practices. Affiliate links help support our free tools. Clicking them does not affect the price you pay.`
    },
    {
      icon: '📢', title: 'Advertising (Google AdSense)',
      body: `This website displays advertisements served by Google AdSense. ${name} is not responsible for the content of these ads. Ad content is determined by Google's algorithms based on user interests and page content. For ad-related concerns, refer to Google's advertising policies.`
    },
    {
      icon: '⚖️', title: 'No Professional Advice',
      body: `Nothing on ${name} constitutes professional financial, legal, medical, electrical, or technical advice. The tools, articles, and calculators are for general guidance only. For important decisions, always consult a qualified professional in the relevant field.`
    },
    {
      icon: '🔄', title: 'Changes & Updates',
      body: `We strive to keep all tools and content accurate and up-to-date. However, information can change rapidly. ${name} reserves the right to modify, update, or remove any content at any time without notice. We are not liable for any actions taken based on outdated information.`
    },
    {
      icon: '📧', title: 'Report an Error',
      body: `Found an error in our tools or articles? We appreciate your feedback. Please email us at ${email} with details of the issue. We will review and correct errors as quickly as possible.`
    },
  ]

  return (
    <>
      <SEOHead
        title={`Disclaimer — ${name}`}
        description={`${name} tools aur articles ke baare mein important disclaimer. Calculators educational purpose ke liye hain — professional advice ke liye qualified experts se sampark karein.`}
        keywords="disclaimer, almenso disclaimer, tool accuracy, calculator disclaimer, financial disclaimer india"
      />
      <div className="tool-page">
        <div className="tp-hero" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #374151 100%)' }}>
          <div className="tp-hero-ico">📜</div>
          <div className="tp-hero-title">Disclaimer</div>
          <div className="tp-hero-sub">Hamari tools aur content ke baare mein important information</div>
        </div>

        <div className="tw-body">
          <AdSlot slot="top" />

          {/* Summary box */}
          <div className="tp-card" style={{ borderLeft: '4px solid #f59e0b', background: '#fffbeb' }}>
            <div className="tp-sec-title" style={{ color: '#b45309' }}>⚠️ Important Notice</div>
            <p style={{ fontSize: '0.87rem', color: '#78350f', lineHeight: 1.8, margin: 0 }}>
              <strong>{name}</strong> ke sare tools aur calculators <strong>educational aur informational purpose</strong> ke liye hain.
              Yeh professional financial, legal, ya technical advice nahi hain.
              Kisi bhi important financial ya legal decision se pehle qualified professional se consult karein.
              Tool results approximate hain — actual values different ho sakti hain.
            </p>
          </div>

          {sections.map((s, i) => (
            <div key={i} className="tp-card">
              <div className="tp-sec-title">{s.icon} {s.title}</div>
              <p style={{ fontSize: '0.87rem', color: '#334155', lineHeight: 1.8, margin: 0 }}>{s.body}</p>
            </div>
          ))}

          <AdSlot slot="mid" />

          {/* Acceptance footer */}
          <div className="tp-card" style={{ background: 'linear-gradient(135deg,#1a1a2e,#374151)', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✅</div>
            <div style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: 8 }}>
              {name} use karne se aap is disclaimer se agree karte hain
            </div>
            <p style={{ fontSize: '0.78rem', opacity: 0.7, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 16px' }}>
              Questions? Email: <strong style={{ color: '#93c5fd' }}>{email}</strong>
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { href: '/privacy-policy', label: '🔒 Privacy Policy' },
                { href: '/terms',          label: '📋 Terms & Conditions' },
                { href: '/contact',        label: '📞 Contact Us' },
              ].map(l => (
                <a key={l.href} href={l.href}
                  style={{ color: '#93c5fd', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <AdSlot slot="bottom" />
        </div>
      </div>
    </>
  )
}

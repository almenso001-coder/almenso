/**
 * TERMS & CONDITIONS PAGE — AdSense Approval Ready
 * ✅ Comprehensive legal coverage
 * ✅ Tools disclaimer (important for AdSense)
 * ✅ Advertising disclosure
 * ✅ Indian law compliant
 * ✅ Ad slots: top, mid, bottom
 */

import React, { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import './LegalPages.css'

const SECTIONS = (siteName, email, address, phone) => [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing and using ${siteName} ("the Website," "our Platform") located at almenso.com, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please discontinue use of our website immediately.\n\nWe reserve the right to modify these Terms at any time. Changes take effect upon posting to this page. Your continued use of the Website after changes constitutes acceptance of the updated Terms. These Terms were last updated on March 21, 2026.`
  },
  {
    id: 'about',
    title: '2. About Our Platform',
    content: `${siteName} (almenso.com) is a multi-purpose platform providing:\n\n• Free online tools including calculators, generators, and utilities (GST Calculator, EMI Calculator, Electricity Bill Analyzer, Solar ROI Calculator, Invoice Generator, Unit Converter, and 100+ more)\n• Local marketplace for products and services in Haldwani, Uttarakhand\n• Electrician, solar, and interior design services\n• Educational blog content\n• Vendor/affiliate listings\n\nWe act as an intermediary platform. We are not the seller or service provider for all listed products and services. Individual vendors and service partners are responsible for their own offerings.`
  },
  {
    id: 'tools-disclaimer',
    title: '3. Free Tools — Important Disclaimer',
    content: `Our free tools are provided "AS IS" for informational and educational purposes only.\n\n• Tool results are estimates based on your inputs and publicly available data\n• Tax rates (GST, etc.), electricity tariffs, and financial figures change frequently — always verify with official government sources or qualified professionals\n• We make no warranty that tool results are accurate, complete, current, or suitable for any specific purpose\n• ${siteName} is NOT liable for any financial, tax, legal, or other decisions made based on our tool outputs\n• The GST Calculator results do not constitute tax advice — consult a Chartered Accountant for official tax guidance\n• The Solar ROI Calculator provides estimates only — actual savings depend on many factors\n• The Electricity Bill Calculator uses approximate tariff rates that may differ from your actual billing\n\nIf you find an error in any tool, please report it to ${email}. We regularly update tools but cannot guarantee real-time accuracy.`
  },
  {
    id: 'advertising',
    title: '4. Advertising on Our Website',
    content: `${siteName} displays advertisements through Google AdSense and may display affiliate links through our Earn/Affiliate program.\n\n• Advertisements are clearly distinguishable from editorial content\n• We do not endorse products or services advertised by third parties through AdSense\n• Affiliate links may be marked with disclosures; clicking affiliate links may result in us earning a commission at no extra cost to you\n• Advertised products and services are the responsibility of the respective advertisers\n• We are not responsible for the content, accuracy, or availability of advertised third-party websites\n\nFor advertising inquiries, contact ${email}.`
  },
  {
    id: 'user-conduct',
    title: '5. User Conduct',
    content: `By using our platform, you agree NOT to:\n\n• Upload, post, or transmit any content that is illegal, harmful, threatening, abusive, defamatory, or obscene\n• Impersonate any person, entity, or ${siteName} representative\n• Upload viruses, malware, or any other harmful code\n• Attempt to gain unauthorized access to any part of our Platform or systems\n• Scrape, crawl, or systematically copy Platform content without written permission\n• Use automated bots or scripts to access our tools or content\n• Use the Platform for any purpose that violates Indian law or applicable regulations\n• Submit false, misleading, or fraudulent information\n• Interfere with the proper functioning of the website or server infrastructure`
  },
  {
    id: 'marketplace',
    title: '6. Marketplace & Orders',
    content: `For orders placed through our marketplace:\n\n• All orders are subject to acceptance and availability\n• Prices are set by individual vendors and may change without notice\n• ${siteName} reserves the right to cancel orders due to pricing errors, stock unavailability, suspected fraud, or violation of these Terms\n• Payments are processed securely through Razorpay (RBI-authorized). We do not store payment card information\n• Order confirmations are sent via WhatsApp and/or email\n• Delivery timelines are estimates provided by vendors and may vary\n\nRefund Policy: Eligible returns must be initiated within 7 days of delivery with items in original, unused condition. Refunds are processed within 5–7 business days. Perishables, digital goods, and customized products are non-refundable unless defective.`
  },
  {
    id: 'intellectual-property',
    title: '7. Intellectual Property',
    content: `The ${siteName} name, logo, website design, source code, tools, and all original content are owned by or licensed to ${siteName} and protected under the Copyright Act, 1957 and Trademarks Act, 1999 of India.\n\nYou may not:\n• Copy, reproduce, or distribute our content without written permission\n• Reverse-engineer, decompile, or create derivative works from our code or tools\n• Use our name, logo, or branding without prior written consent\n\nTo report intellectual property infringement: ${email}`
  },
  {
    id: 'privacy',
    title: '8. Privacy & Data',
    content: `Your use of ${siteName} is also governed by our Privacy Policy (available at almenso.com/privacy-policy), which is incorporated into these Terms by reference.\n\nBy using our website, you consent to our data practices as described in the Privacy Policy, including the use of Google Analytics and Google AdSense advertising cookies.`
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law:\n\n• ${siteName} provides its website, tools, and content on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind\n• We do not warrant that the website will be uninterrupted, error-free, or free of viruses\n• We are not liable for any indirect, incidental, special, consequential, or punitive damages\n• Our maximum liability to you for any claim shall not exceed ₹1,000 (Indian Rupees One Thousand) or the amount you paid us in the preceding 3 months, whichever is less\n• We are not responsible for the actions, content, products, or services of third-party websites linked from our platform`
  },
  {
    id: 'governing-law',
    title: '10. Governing Law & Dispute Resolution',
    content: `These Terms are governed by the laws of India, including the Information Technology Act, 2000, Consumer Protection Act, 2019, and applicable GST laws.\n\nAny disputes arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be subject to the exclusive jurisdiction of courts in Haldwani, Uttarakhand, India.\n\nNothing in these Terms limits your rights as a consumer under the Consumer Protection Act, 2019.`
  },
  {
    id: 'contact',
    title: '11. Contact Us',
    content: `For questions about these Terms or our services:\n\n${siteName}\n📧 ${email}\n📞 ${phone}\n📍 ${address}`
  }
]

export default function TermsPage() {
  const { settings } = useSettings()
  const siteName = settings.siteName || 'Almenso'
  const email    = settings.email    || 'support@almenso.com'
  const address  = settings.address  || 'Haldwani, Uttarakhand, India — 263139'
  const phone    = settings.phone    || '+91-92581-33689'
  const updated  = settings.termsLastUpdated || 'March 21, 2026'

  const [open, setOpen] = useState({})
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))
  const sections = SECTIONS(siteName, email, address, phone)

  return (
    <div className="legal-page">
      <SEOHead
        title={`Terms & Conditions | ${siteName}`}
        description={`Read the Terms and Conditions for using ${siteName} — almenso.com. Covers free tools disclaimer, marketplace rules, advertising, and your rights.`}
        canonical="/terms"
        keywords="terms and conditions almenso, terms of use, user agreement almenso"
      />

      <div className="legal-container">
        <header className="legal-header">
          <div className="legal-badge">📋 Legal Agreement</div>
          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-updated">Last Updated: {updated}</p>
          <p className="legal-intro">
            Please read these Terms carefully before using {siteName}. By accessing our website,
            you agree to be bound by these Terms.
          </p>
        </header>

        {/* ═══ AD SLOT: TOP BANNER ═══ */}
        <AdSlot slot="top" style={{ margin: '0 0 20px' }} />

        <div className="legal-content">
          {/* Quick nav */}
          <div className="legal-toc">
            <div className="legal-toc-title">📑 Contents</div>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="legal-toc-link">{s.title}</a>
            ))}
          </div>

          {sections.map((s, i) => (
            <React.Fragment key={s.id}>
              {/* Mid ad after section 4 */}
              {i === 4 && (
                <AdSlot slot="mid" style={{ margin: '8px 0' }} />
              )}
              <section className="legal-section legal-accordion" id={s.id}>
                <button
                  className={`legal-acc-header ${open[s.id] ? 'open' : ''}`}
                  onClick={() => toggle(s.id)}
                  aria-expanded={!!open[s.id]}
                >
                  <span>{s.title}</span>
                  <span className="legal-acc-icon">{open[s.id] ? '▲' : '▼'}</span>
                </button>
                <div className={`legal-acc-body ${open[s.id] ? 'visible' : ''}`}>
                  {s.content.split('\n').map((line, j) => (
                    line.trim() === '' ? <br key={j} /> :
                    line.startsWith('•') ? (
                      <li key={j} style={{ marginLeft: 16, marginBottom: 4, color: '#374151' }}>{line.slice(1).trim()}</li>
                    ) : (
                      <p key={j}>{line}</p>
                    )
                  ))}
                </div>
              </section>
            </React.Fragment>
          ))}
        </div>

        {/* ═══ AD SLOT: BOTTOM ═══ */}
        <AdSlot slot="bottom" style={{ margin: '8px 0 20px' }} />

        <div className="legal-footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>|</span>
          <a href="/about">About Us</a>
          <span>|</span>
          <a href="/contact">Contact Us</a>
          <span>|</span>
          <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}

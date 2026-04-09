/**
 * PRIVACY POLICY PAGE — AdSense Approval Ready
 * ✅ GDPR compliant
 * ✅ Google Analytics & AdSense disclosure
 * ✅ Cookie consent disclosure
 * ✅ Indian IT Act 2000 compliant
 * ✅ Ad slots: top, mid, bottom
 */

import React from 'react'
import SEOHead from '../components/SEOHead'
import { useSettings } from '../context/SettingsContext'
import AdSlot from '../components/AdSlot'
import './LegalPages.css'

export default function PrivacyPolicy() {
  const { settings } = useSettings()
  const siteName = settings.siteName || 'Almenso'
  const email    = settings.email    || 'support@almenso.com'
  const address  = settings.address  || 'Haldwani, Uttarakhand, India — 263139'
  const phone    = settings.phone    || '+91-92581-33689'
  const updated  = settings.privacyLastUpdated || 'March 21, 2026'

  return (
    <div className="legal-page">
      <SEOHead
        title={`Privacy Policy | ${siteName}`}
        description={`Read how ${siteName} collects, uses, and protects your personal data. GDPR and Indian IT Act compliant privacy policy for almenso.com.`}
        canonical="/privacy-policy"
        keywords="privacy policy almenso, data protection, GDPR, cookie policy"
      />

      <div className="legal-container">
        <header className="legal-header">
          <div className="legal-badge">🔒 Privacy First</div>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: {updated}</p>
          <p className="legal-intro">
            {siteName} is committed to protecting your personal information. This policy explains
            exactly what data we collect, why we collect it, and how it is used — in plain language.
          </p>
        </header>

        {/* ═══ AD SLOT: TOP BANNER ═══ */}
        <AdSlot slot="top" style={{ margin: '0 0 20px' }} />

        <div className="legal-content">

          <section className="legal-section">
            <h2>1. Who We Are</h2>
            <p>
              <strong>{siteName}</strong> ("we," "our," "us") is a local business and e-commerce platform
              based in Haldwani, Uttarakhand, India. We operate <strong>almenso.com</strong> which
              provides free online tools, electrician services, solar solutions, and a local marketplace.
            </p>
            <div className="legal-contact-box">
              <div>📍 {address}</div>
              <div>📞 {phone}</div>
              <div>📧 {email}</div>
            </div>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>

            <h3>2.1 Information You Provide Directly</h3>
            <p>When you use our contact form or WhatsApp us, we may collect:</p>
            <ul>
              <li>Your name and email address</li>
              <li>Phone number (if provided)</li>
              <li>Message content and subject</li>
              <li>Order-related information (if you place an order)</li>
            </ul>
            <p>We do <strong>not</strong> require account registration to use our free tools.</p>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect:</p>
            <ul>
              <li>IP address and approximate geographic location (country/city level)</li>
              <li>Browser type, version, and language preferences</li>
              <li>Operating system and device type (mobile/desktop)</li>
              <li>Pages visited, time spent, and navigation patterns</li>
              <li>Referring URLs and search terms that brought you to our site</li>
              <li>Screen resolution and device characteristics</li>
            </ul>

            <h3>2.3 Free Tools — Your Input Data</h3>
            <p>
              Our calculators and tools (GST Calculator, EMI Calculator, Bijli Bill, Solar ROI, etc.)
              process your inputs <strong>entirely within your browser</strong>. We do <strong>not</strong> transmit
              or store your calculation inputs on our servers. Financial or personal data entered into
              tools stays on your device.
            </p>

            <h3>2.4 Cookies &amp; Local Storage (अपनी डेटा को सुरक्षित रखें)</h3>
            <p>
              हम cookies और browser local storage use करते हैं — यह बिल्कुल safe है:
            </p>
            <ul>
              <li><strong>Essential Cookies (जरूरी):</strong> User preferences, theme, language, settings — website काम करने के लिए जरूरी है</li>
              <li><strong>Analytics Cookies (डेटा):</strong> Google Analytics से समझते हैं कि लोग कहां click करते हैं — completely anonymous है</li>
              <li><strong>Advertising Cookies (विज्ञापन):</strong> Google AdSense से relevant ads दिखाता हूँ — आपका name/email collect नहीं करता</li>
              <li><strong>Functional Cookies (फंक्शन):</strong> Cookie consent record, dark/light mode preference, language choice</li>
            </ul>
            <p>
              <strong>आप control कर सकते हो:</strong> हमारे cookie banner से "Accept" या "Decline" कर सकते हो, या अपने browser settings से disable कर सकते हो।
              Essential cookies disable करने से website properly काम नहीं करेगी।
            </p>
            <p style={{ background: '#fffacd', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <strong>✅ Fully transparent:</strong> हम cookies use करते हैं, लेकिन आपका personal data नहीं बेचते। 
              जो data collect होता है वह सिर्फ website improve करने के लिए है।
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Google AdSense &amp; Advertising</h2>
            <p>
              We use <strong>Google AdSense</strong> to display advertisements on our website.
              Google AdSense uses cookies to show personalized ads based on your interests and
              browsing history across websites.
            </p>
            <ul>
              <li>Google may use the DoubleClick cookie to serve ads across websites you visit</li>
              <li>Third-party vendors use cookies to serve ads based on your prior visits to our site</li>
              <li>
                Opt out of personalized ads:&nbsp;
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                  Google Ad Settings
                </a>
              </li>
              <li>
                Opt out of third-party cookies:&nbsp;
                <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">
                  Network Advertising Initiative
                </a>
              </li>
            </ul>
            <p>
              For more information on how Google uses data from partner sites, see&nbsp;
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                Google's Privacy &amp; Terms
              </a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Google Analytics</h2>
            <p>
              We use Google Analytics to analyze website traffic and user behavior. Google Analytics collects
              anonymous data such as pages visited, session duration, traffic sources, and device types.
              We use this data solely to improve our website.
            </p>
            <p>
              You can prevent Google Analytics from collecting your data by installing the&nbsp;
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          {/* ═══ AD SLOT: MID (between sections) ═══ */}
          <AdSlot slot="mid" style={{ margin: '8px 0' }} />

          <section className="legal-section">
            <h2>5. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process and fulfill orders and service requests</li>
              <li>Send order confirmations via WhatsApp and/or email</li>
              <li>Analyze and improve website performance and user experience</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Detect and prevent fraud and abuse of our services</li>
              <li>Comply with legal obligations under Indian law</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal data to third parties. We do not share your
              personal information with advertisers except as described in Section 3 (Google AdSense).
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Data Sharing &amp; Third Parties</h2>
            <p>We share your information only with trusted service providers:</p>
            <ul>
              <li><strong>Google LLC</strong> — Analytics and advertising (Sections 3 &amp; 4)</li>
              <li><strong>Razorpay</strong> — Secure payment processing (Razorpay's Privacy Policy applies)</li>
              <li><strong>Firebase (Google)</strong> — Database and backend services</li>
              <li><strong>Cloudinary</strong> — Image hosting and optimization</li>
              <li><strong>WhatsApp / Meta</strong> — Order notifications (only when you initiate contact)</li>
              <li><strong>Legal authorities</strong> — When required by Indian law or court order</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Data Retention</h2>
            <ul>
              <li>Contact form messages: up to 12 months</li>
              <li>Order records: 7 years (required by GST/Income Tax law in India)</li>
              <li>Analytics data: 26 months (Google Analytics default retention)</li>
              <li>Cookie data: as per individual cookie expiry (typically 30 days to 2 years)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data we hold</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Opt-out of personalized ads:</strong> Via Google's Ad Settings</li>
              <li><strong>Withdraw consent:</strong> For cookies, via our cookie consent banner</li>
            </ul>
            <p>
              To exercise any right, email us at <strong>{email}</strong>. We respond within 30 days.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our website is not directed at children under 13 years of age. We do not knowingly collect
              personal information from children. If you believe a child under 13 has provided us personal
              information, please contact us at {email} and we will promptly delete such data.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Data Security</h2>
            <p>We protect your data through:</p>
            <ul>
              <li>HTTPS/TLS encryption for all data transmission</li>
              <li>Firebase Security Rules for database access control</li>
              <li>PCI-DSS compliant payment processing via Razorpay</li>
              <li>Regular security reviews and dependency updates</li>
            </ul>
            <p>
              No method of internet transmission is 100% secure. We strive to protect your data
              but cannot guarantee absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify users of significant changes
              by updating the "Last Updated" date at the top of this page. Continued use of our website
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Contact &amp; Grievance Officer</h2>
            <p>
              For privacy-related questions, requests, or grievances under the Indian Information
              Technology Act, 2000, please contact our Grievance Officer:
            </p>
            <div className="legal-contact-box">
              <div><strong>{siteName}</strong> — Grievance Officer</div>
              <div>📧 {email}</div>
              <div>📞 {phone}</div>
              <div>📍 {address}</div>
            </div>
            <p style={{ marginTop: 12, fontSize: '0.82rem', color: '#6b7280' }}>
              We will respond to all privacy-related requests within 30 days as required by applicable law.
            </p>
          </section>

        </div>

        {/* ═══ AD SLOT: BOTTOM ═══ */}
        <AdSlot slot="bottom" style={{ margin: '8px 0 20px' }} />

        <div className="legal-footer-links">
          <a href="/terms">Terms &amp; Conditions</a>
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

import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css'

const PHONE = '+919258133689'
const WA    = '919258133689'

const Footer = memo(function Footer() {
  const nav = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="ft-brand">
          <div className="ft-logo" onClick={() => nav('/')}>
            Almenso<span>.</span>
          </div>
          <p className="ft-tagline">Haldwani Ka Digital Sahayak</p>
          <div className="ft-contact">
            <a href={`tel:${PHONE}`} className="ft-contact-btn">📞 {PHONE}</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="ft-contact-btn ft-wa">💬 WhatsApp</a>
          </div>
        </div>

        {/* Services */}
        <div className="ft-col">
          <div className="ft-col-title">🔧 Services</div>
          <button onClick={() => nav('/electrician-haldwani')}>⚡ Electrician Haldwani</button>
          <button onClick={() => nav('/solar-solutions')}>☀️ Solar & Battery</button>
          <button onClick={() => nav('/interior-design')}>🏠 Interior Design</button>
          <button onClick={() => nav('/products')}>🛒 Products</button>
        </div>

        {/* Top Tools */}
        <div className="ft-col">
          <div className="ft-col-title">🛠️ Popular Tools</div>
          <button onClick={() => nav('/tools/gst-calculator')}>🧾 GST Calculator</button>
          <button onClick={() => nav('/tools/emi-calculator')}>🏦 EMI Calculator</button>
          <button onClick={() => nav('/tools/bijli')}>⚡ Bijli Bill</button>
          <button onClick={() => nav('/tools/image-resizer')}>📐 Image Resizer</button>
          <button onClick={() => nav('/tools')}>→ Sab 100+ Tools</button>
        </div>

        {/* Company */}
        <div className="ft-col">
          <div className="ft-col-title">ℹ️ Company</div>
          <button onClick={() => nav('/about')}>About Us</button>
          <button onClick={() => nav('/blog')}>Blog & Tips</button>
          <button onClick={() => nav('/contact')}>Contact</button>
          <button onClick={() => nav('/privacy-policy')}>Privacy Policy</button>
          <button onClick={() => nav('/terms')}>Terms of Use</button>
          <button onClick={() => nav('/disclaimer')}>Disclaimer</button>
        </div>

      </div>

      <div className="ft-bottom">
        <div>© {new Date().getFullYear()} Almenso. Haldwani, Uttarakhand — 263139</div>
        <div className="ft-bottom-note">* Affiliate links pe purchase karne se hume commission milti hai</div>
      </div>
    </footer>
  )
})

export default Footer

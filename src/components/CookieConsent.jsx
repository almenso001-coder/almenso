/**
 * COOKIE CONSENT BANNER
 * Required for:
 * - Google AdSense approval
 * - GDPR compliance (European visitors)
 * - Indian users (good practice)
 * Shows once, remembers in localStorage
 */
import React, { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'

const KEY = 'almenso_cookie_consent'

const CookieConsent = memo(function CookieConsent() {
  const [show, setShow]     = useState(false)
  const [detail, setDetail] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    // Show only if not already accepted/declined
    try {
      const saved = localStorage.getItem(KEY)
      if (!saved) setTimeout(() => setShow(true), 1500)
    } catch {
      setShow(true)
    }
  }, [])

  const accept = (all = true) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        accepted:  all,
        analytics: all,
        ads:       all,
        date:      new Date().toISOString(),
      }))
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="cc-overlay" role="dialog" aria-label="Cookie Consent">
      <div className="cc-banner">
        {/* Icon + heading */}
        <div className="cc-head">
          <span className="cc-ico">🍪</span>
          <div>
            <div className="cc-title">Hum Cookies Use Karte Hain</div>
            <div className="cc-sub">Better experience ke liye</div>
          </div>
        </div>

        {/* Short explanation */}
        <p className="cc-text">
          Ye website cookies aur similar technologies use karti hai. Iska use hota hai:
          website improve karne ke liye, Google AdSense ads dikhane ke liye, aur
          anonymous analytics ke liye. Koi personal data becha nahi jaata.
        </p>

        {/* Detail toggle */}
        {detail && (
          <div className="cc-detail">
            <div className="cc-detail-row">
              <div>
                <div className="cc-dr-title">✅ Zaroori Cookies</div>
                <div className="cc-dr-desc">Website kaam karne ke liye — disable nahi ho sakti</div>
              </div>
              <span className="cc-toggle cc-toggle-on">Always On</span>
            </div>
            <div className="cc-detail-row">
              <div>
                <div className="cc-dr-title">📊 Analytics Cookies</div>
                <div className="cc-dr-desc">Google Analytics — kaun se pages popular hain, kitna traffic aata hai</div>
              </div>
              <span className="cc-toggle cc-toggle-on">Optional</span>
            </div>
            <div className="cc-detail-row">
              <div>
                <div className="cc-dr-title">💰 Advertising Cookies</div>
                <div className="cc-dr-desc">Google AdSense — relevant ads dikhane ke liye (targeted)</div>
              </div>
              <span className="cc-toggle cc-toggle-on">Optional</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="cc-btns">
          <button className="cc-btn-accept" onClick={() => accept(true)}>
            ✅ Sab Accept Karo
          </button>
          <button className="cc-btn-necessary" onClick={() => accept(false)}>
            Sirf Zaroori
          </button>
          <button className="cc-btn-detail" onClick={() => setDetail(d => !d)}>
            {detail ? '▲ Less' : '▼ Details'}
          </button>
        </div>

        {/* Privacy link */}
        <div className="cc-footer">
          <button className="cc-privacy-link" onClick={() => { nav('/privacy-policy'); setShow(false) }}>
            Privacy Policy padhein →
          </button>
        </div>
      </div>
    </div>
  )
})

export default CookieConsent

// Helper — check if user accepted ads
export function hasAdConsent() {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || 'null')
    return c?.ads === true
  } catch { return false }
}

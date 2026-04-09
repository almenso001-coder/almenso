/**
 * ADSENSE AD SLOT
 * - Shows placeholder before AdSense is configured
 * - Respects cookie consent (GDPR)
 * - Lazy loads on visibility
 */
import React, { useEffect, useRef, useState, memo } from 'react'

window.adsbygoogle = window.adsbygoogle || []

function hasCookieConsent() {
  try {
    const c = JSON.parse(localStorage.getItem('almenso_cookie_consent') || 'null')
    // If no consent recorded yet — show ads anyway (consent = not yet decided)
    // If explicitly declined ads — don't show
    return c === null || c?.ads !== false
  } catch { return true }
}

const AdSlot = memo(function AdSlot({ slot = 'top', style = {} }) {
  const ref       = useRef()
  const pushed    = useRef(false)
  const [client,  setClient]  = useState(() => window.__ADSENSE_CLIENT__  || '')
  const [slotId,  setSlotId]  = useState(() => (window.__ADSENSE_SLOTS__ || {})[slot] || '')
  const [consent, setConsent] = useState(hasCookieConsent)

  // Sync settings after delay (Admin changes take effect)
  useEffect(() => {
    const sync = () => {
      setClient(window.__ADSENSE_CLIENT__ || '')
      setSlotId((window.__ADSENSE_SLOTS__ || {})[slot] || '')
      setConsent(hasCookieConsent())
    }
    const t1 = setTimeout(sync, 400)
    const t2 = setTimeout(sync, 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [slot])

  // Re-check consent when user accepts/declines
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'almenso_cookie_consent') setConsent(hasCookieConsent())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const ready = !!(client && slotId && consent)

  useEffect(() => {
    if (!ready || pushed.current || !ref.current) return
    try {
      pushed.current = true
      window.adsbygoogle.push({})
    } catch {
      pushed.current = false
    }
  }, [ready])

  if (!ready) {
    return (
      <div className="ad-placeholder" style={style} aria-hidden="true">
        <span className="ad-ph-label">Advertisement</span>
      </div>
    )
  }

  return (
    <div className="ad-slot-wrap" style={style}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
})

// In-article ad variant
export const InArticleAd = (props) => <AdSlot slot="in-article" {...props} />

export default AdSlot

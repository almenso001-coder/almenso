/**
 * DOWNLOAD APP / SUBSCRIBE MODAL — Fixed
 * 
 * Rules:
 * 1. Agar PWA already installed hai → kabhi nahi dikhega
 * 2. Subscribe kar diya → dobara kabhi nahi dikhega
 * 3. Play Store link NAHI — sirf PWA install prompt
 * 4. Session mein ek baar dikhta hai, dismiss karo toh 7 din nahi dikhega
 */

import React, { useState, useEffect, memo } from 'react'
import './DownloadAppModal.css'

const DISMISSED_KEY  = 'almenso_modal_dismissed_until'
const SUBSCRIBED_KEY = 'almenso_subscribed'

const DownloadAppModal = memo(function DownloadAppModal() {
  const [show, setShow]           = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [step, setStep]           = useState('main') // 'main' | 'subscribed'

  useEffect(() => {
    // 1. PWA already installed hai? → bilkul mat dikhao
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
    if (standalone) { setIsInstalled(true); return }

    // 2. Subscribe kar chuka hai? → mat dikhao
    if (localStorage.getItem(SUBSCRIBED_KEY)) { setSubscribed(true); return }

    // 3. 7 din ke liye dismiss kiya tha?
    const dismissedUntil = localStorage.getItem(DISMISSED_KEY)
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) return

    // 4. Session mein already dikha chuka?
    if (sessionStorage.getItem('almenso_modal_shown')) return

    // 5. PWA install event capture karo
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // 6. 3 second baad dikhao
    const timer = setTimeout(() => {
      setShow(true)
      sessionStorage.setItem('almenso_modal_shown', '1')
    }, 3000)

    // 7. Agar install ho gaya toh hide karo
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShow(false)
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleClose = () => {
    setShow(false)
    // 7 din ke liye dismiss
    localStorage.setItem(DISMISSED_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000))
  }

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      // Android Chrome — native install prompt
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
        setShow(false)
      }
      setDeferredPrompt(null)
    } else {
      // iOS ya install event nahi aaya — instructions dikhao
      alert('Browser mein:\n\n📱 Android Chrome: Menu (⋮) → "Add to Home Screen"\n\n🍎 iPhone Safari: Share (□↑) → "Add to Home Screen"')
    }
  }

  const handleSubscribe = () => {
    // OneSignal push notification subscribe
    if (window.OneSignal) {
      window.OneSignal.push(() => {
        window.OneSignal.showNativePrompt()
      })
    }
    // Mark as subscribed — dobara nahi dikhega
    localStorage.setItem(SUBSCRIBED_KEY, '1')
    setStep('subscribed')
    // 2 sec baad band karo
    setTimeout(() => setShow(false), 2000)
  }

  // Mat dikhao agar: installed, subscribed, ya show false
  if (!show || isInstalled || subscribed) return null

  // Success step
  if (step === 'subscribed') {
    return (
      <div className="dam-overlay" onClick={handleClose}>
        <div className="dam-modal" onClick={(e) => e.stopPropagation()} style={{ textAlign:'center', padding:'32px 24px' }}>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>🎉</div>
          <div style={{ fontWeight:900, fontSize:'1.1rem', color:'#0f172a', marginBottom:8 }}>
            Subscribe Ho Gaye!
          </div>
          <div style={{ fontSize:'0.85rem', color:'#64748b' }}>
            Naye tools aur updates ki notifications milenge
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dam-overlay" onClick={handleClose}>
      <div className="dam-modal" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="dam-close" onClick={handleClose}>✕</button>

        {/* Icon */}
        <div className="dam-icon">⚡</div>

        {/* Title */}
        <h2 className="dam-title">Almenso App Install Karo!</h2>

        {/* Description */}
        <p className="dam-text">
          Home screen pe add karo — offline kaam kare, super fast load ho, app jaisa experience mile.
        </p>

        {/* Features */}
        <div className="dam-features">
          <div className="dam-feature">
            <span className="dam-feature-icon">📶</span>
            <span>Offline Mode</span>
          </div>
          <div className="dam-feature">
            <span className="dam-feature-icon">⚡</span>
            <span>Super Fast</span>
          </div>
          <div className="dam-feature">
            <span className="dam-feature-icon">🔔</span>
            <span>Updates Alert</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="dam-buttons">
          <button className="dam-btn dam-btn-primary" onClick={handleInstallPWA}>
            📲 Home Screen Pe Add Karo
          </button>
          <button className="dam-btn dam-btn-secondary" onClick={handleSubscribe}>
            🔔 Notifications Subscribe Karo
          </button>
        </div>

        {/* Info */}
        <p className="dam-info">
          Free App · No Play Store · Seedha Browser Se Install
        </p>

      </div>
    </div>
  )
})

export default DownloadAppModal

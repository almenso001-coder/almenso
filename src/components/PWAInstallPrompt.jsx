/**
 * PWA INSTALL PROMPT — Bottom banner
 * 
 * Rules:
 * 1. Already installed → kabhi nahi dikhega
 * 2. Subscribe/install ke baad → dobara nahi dikhega  
 * 3. Play Store link NAHI — sirf native PWA install
 * 4. Dismiss karo → 3 din nahi dikhega
 * 5. 2nd visit ke baad dikhta hai
 */
import React, { useState, useEffect } from 'react'

const DISMISSED_KEY  = 'pwa_prompt_dismissed_until'
const INSTALLED_KEY  = 'pwa_installed'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow]                     = useState(false)
  const [isIOS, setIsIOS]                   = useState(false)
  const [installed, setInstalled]           = useState(false)

  useEffect(() => {
    // 1. Already installed (standalone mode)?
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
    if (isStandalone || localStorage.getItem(INSTALLED_KEY)) {
      setInstalled(true)
      return
    }

    // 2. DownloadAppModal ne already subscribe/dismiss kiya?
    if (localStorage.getItem('almenso_subscribed')) return

    // 3. 3 din ke liye dismiss kiya tha?
    const dismissedUntil = localStorage.getItem(DISMISSED_KEY)
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) return

    // 4. iOS check
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
    setIsIOS(ios)

    // 5. Visit count — 2nd visit ke baad dikhao
    const visits = parseInt(localStorage.getItem('almenso_visit_count') || '0') + 1
    localStorage.setItem('almenso_visit_count', String(visits))

    // 6. Android — beforeinstallprompt capture
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (visits >= 2) {
        setTimeout(() => setShow(true), 5000) // 5 sec delay
      }
    }
    window.addEventListener('beforeinstallprompt', handler)

    // 7. iOS — 2nd visit ke baad manual instructions
    if (ios && visits >= 2) {
      setTimeout(() => setShow(true), 5000)
    }

    // 8. App install ho gaya
    window.addEventListener('appinstalled', () => {
      localStorage.setItem(INSTALLED_KEY, '1')
      setInstalled(true)
      setShow(false)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem(INSTALLED_KEY, '1')
      setInstalled(true)
      setShow(false)
    }
    setDeferredPrompt(null)
  }

  const dismiss = () => {
    setShow(false)
    // 3 din ke liye dismiss
    localStorage.setItem(DISMISSED_KEY, String(Date.now() + 3 * 24 * 60 * 60 * 1000))
  }

  if (!show || installed) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 72,
      left: 12,
      right: 12,
      background: '#0f172a',
      color: '#fff',
      borderRadius: 16,
      padding: '14px 16px',
      zIndex: 500,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      {/* App icon */}
      <div style={{
        width: 46, height: 46, borderRadius: 10,
        background: 'linear-gradient(135deg, #0f8a1f, #059669)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem', flexShrink: 0,
      }}>⚡</div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: 2 }}>
          Almenso App Install Karo
        </div>
        {isIOS ? (
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
            Safari → <strong>Share ↑</strong> → <strong>"Add to Home Screen"</strong>
          </div>
        ) : (
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>
            Fast load · Offline kaam kare · No Play Store
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {!isIOS && deferredPrompt && (
          <button onClick={install} style={{
            background: '#0f8a1f', color: '#fff', border: 'none',
            borderRadius: 8, padding: '8px 14px', fontWeight: 800,
            fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}>
            Install
          </button>
        )}
        <button onClick={dismiss} style={{
          background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none',
          borderRadius: 8, padding: '8px 10px', fontWeight: 600,
          fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit',
        }}>
          ✕
        </button>
      </div>
    </div>
  )
}

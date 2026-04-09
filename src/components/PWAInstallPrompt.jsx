/**
 * PWA INSTALL PROMPT
 * Shows "Add to Home Screen" banner after user visits 2+ times
 * Works on Android Chrome, iOS Safari (manual instructions)
 */
import React, { useState, useEffect } from 'react'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow]                     = useState(false)
  const [isIOS, setIsIOS]                   = useState(false)
  const [isInstalled, setIsInstalled]       = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
    setIsIOS(ios)

    // Visit count — show after 2nd visit
    const visits = parseInt(sessionStorage.getItem('almenso_visits') || '0') + 1
    sessionStorage.setItem('almenso_visits', String(visits))

    // Already dismissed?
    const dismissed = localStorage.getItem('pwa_dismissed')
    if (dismissed) return

    // Android — capture install event
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (visits >= 2) setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // iOS — show manual instructions after 2 visits
    if (ios && visits >= 2) {
      setTimeout(() => setShow(true), 3000)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShow(false)
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('pwa_dismissed', '1')
  }

  if (!show || isInstalled) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 72,  // above MobileNav
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
      animation: 'fadeUp 0.3s ease',
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
            Safari mein <strong>Share</strong> → <strong>"Add to Home Screen"</strong> dabao
          </div>
        ) : (
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>
            Fast load · Offline kaam kare · App jaisa experience
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {!isIOS && (
          <button
            onClick={install}
            style={{
              background: '#0f8a1f', color: '#fff', border: 'none',
              borderRadius: 8, padding: '8px 14px', fontWeight: 800,
              fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--font)',
              whiteSpace: 'nowrap',
            }}>
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          style={{
            background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none',
            borderRadius: 8, padding: '8px 10px', fontWeight: 600,
            fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--font)',
          }}>
          ✕
        </button>
      </div>
    </div>
  )
}

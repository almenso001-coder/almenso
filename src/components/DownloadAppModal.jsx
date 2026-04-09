/**
 * DOWNLOAD APP / SUBSCRIBE MODAL
 * Shows on website open (once per session)
 * Offers to download app + subscribe for updates
 */

import React, { useState, useEffect, memo } from 'react'
import './DownloadAppModal.css'

const DownloadAppModal = memo(function DownloadAppModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Show once per session after 2 seconds
    const sessionKey = 'almenso_download_shown'
    const sessionShown = sessionStorage.getItem(sessionKey)
    
    if (!sessionShown) {
      const timer = setTimeout(() => {
        setShow(true)
        sessionStorage.setItem(sessionKey, 'true')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => setShow(false)

  const handleDownloadApp = () => {
    // Android app link
    window.open('https://play.google.com/store/apps/details?id=com.almenso.app', '_blank')
    handleClose()
  }

  const handleSubscribe = () => {
    // Open subscription/email signup
    window.open('https://almenso.com/subscribe', '_blank')
    handleClose()
  }

  if (!show) return null

  return (
    <div className="dam-overlay" onClick={handleClose}>
      <div className="dam-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="dam-close" onClick={handleClose}>✕</button>

        {/* Icon */}
        <div className="dam-icon">📱</div>

        {/* Title */}
        <h2 className="dam-title">Almenso App Download Karo!</h2>

        {/* Description */}
        <p className="dam-text">
          Mobile pe free tools use karo, offline access pao, aur notifications lao.
        </p>

        {/* Features */}
        <div className="dam-features">
          <div className="dam-feature">
            <span className="dam-feature-icon">✨</span>
            <span>Offline Mode</span>
          </div>
          <div className="dam-feature">
            <span className="dam-feature-icon">⚡</span>
            <span>Super Fast</span>
          </div>
          <div className="dam-feature">
            <span className="dam-feature-icon">📲</span>
            <span>App Experience</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="dam-buttons">
          <button className="dam-btn dam-btn-primary" onClick={handleDownloadApp}>
            📥 Download App
          </button>
          <button className="dam-btn dam-btn-secondary" onClick={handleSubscribe}>
            ✉️ Subscribe Updates
          </button>
        </div>

        {/* Info */}
        <p className="dam-info">
          100% Free • No Ads • No Registration
        </p>
      </div>
    </div>
  )
})

export default DownloadAppModal

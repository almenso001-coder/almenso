/**
 * ShareButton — Web Share API with clipboard fallback
 * Uses navigator.share if available, else copies URL to clipboard
 */
import React, { useState } from 'react'

export default function ShareButton({ title, text, style = {} }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: title || 'Almenso - AI Tools',
      text: text || 'Check out this useful tools website',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      // User cancelled or error — try clipboard fallback
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {}
    }
  }

  return (
    <button
      onClick={handleShare}
      title="Share this page"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        background: copied ? '#10b981' : '#f1f5f9',
        color: copied ? '#fff' : '#374151',
        border: '1.5px solid',
        borderColor: copied ? '#10b981' : '#e2e8f0',
        borderRadius: 8,
        fontSize: '0.82rem',
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.2s',
        ...style,
      }}
    >
      {copied ? '✅ Link Copied!' : '🔗 Share'}
    </button>
  )
}

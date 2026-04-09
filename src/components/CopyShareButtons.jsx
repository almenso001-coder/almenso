/**
 * COPY + SHARE BUTTONS — Reusable component for all tools
 * Usage: <CopyShareButtons text="Result text" waText="WhatsApp message" />
 */
import React, { useState } from 'react'

export default function CopyShareButtons({ text, waText, label = 'Result' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silent fail — clipboard not available
    }
  }

  const handleShare = () => {
    const msg = waText || text
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ display:'flex', gap:8, marginTop:14 }}>
      <button
        onClick={handleCopy}
        style={{
          flex:1, padding:'10px 8px',
          background: copied ? '#dcfce7' : '#f0fdf4',
          border: `1.5px solid ${copied ? '#22c55e' : '#16a34a'}`,
          borderRadius:9, color:'#15803d',
          fontWeight:800, fontSize:'0.78rem',
          cursor:'pointer', fontFamily:'var(--font)',
          transition:'all 0.2s',
        }}>
        {copied ? '✅ Copied!' : `📋 Copy ${label}`}
      </button>
      <button
        onClick={handleShare}
        style={{
          flex:1, padding:'10px 8px',
          background:'#e7fdf0',
          border:'1.5px solid #25d366',
          borderRadius:9, color:'#166534',
          fontWeight:800, fontSize:'0.78rem',
          cursor:'pointer', fontFamily:'var(--font)',
        }}>
        💬 WhatsApp Share
      </button>
    </div>
  )
}

/**
 * WHATSAPP FLOATING BUTTON
 * Draggable on all devices — user can reposition it anywhere
 * Pulse animation to attract attention
 */
import React, { useState, useEffect, useRef, memo } from 'react'
import { useSettings } from '../context/SettingsContext'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY = 'wa_btn_pos'

const WhatsAppButton = memo(function WhatsAppButton() {
  const { settings } = useSettings()
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const [pos, setPos] = useState(null)   // { x, y } from top-left of viewport
  const [dragging, setDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const btnRef = useRef(null)
  const dragStart = useRef(null)

  const SIZE = 54
  const wa = settings.whatsapp || '919258133689'
  const isAdmin = pathname.startsWith('/admin')

  // Show after 2 seconds
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Load saved position or default to bottom-right
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setPos(JSON.parse(saved))
        return
      }
    } catch {}
    // Default: bottom-right above mobile nav
    setPos({
      x: window.innerWidth - SIZE - 16,
      y: window.innerHeight - SIZE - 80,
    })
  }, [])

  // Keep button inside viewport on resize
  useEffect(() => {
    const onResize = () => {
      setPos(p => {
        if (!p) return p
        const x = Math.min(p.x, window.innerWidth - SIZE - 4)
        const y = Math.min(p.y, window.innerHeight - SIZE - 4)
        return { x: Math.max(4, x), y: Math.max(4, y) }
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ── DRAG (mouse) ──────────────────────────────────────────
  const onMouseDown = (e) => {
    e.preventDefault()
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      bx: pos.x,
      by: pos.y,
    }
    setDragging(true)
    setHasDragged(false)
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => {
      const dx = e.clientX - dragStart.current.mx
      const dy = e.clientY - dragStart.current.my
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) setHasDragged(true)
      const x = Math.max(4, Math.min(window.innerWidth  - SIZE - 4, dragStart.current.bx + dx))
      const y = Math.max(4, Math.min(window.innerHeight - SIZE - 4, dragStart.current.by + dy))
      setPos({ x, y })
    }
    const onUp = () => {
      setDragging(false)
      setPos(p => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {} return p })
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging])

  // ── DRAG (touch) ──────────────────────────────────────────
  const onTouchStart = (e) => {
    const t = e.touches[0]
    dragStart.current = {
      mx: t.clientX,
      my: t.clientY,
      bx: pos.x,
      by: pos.y,
    }
    setHasDragged(false)
  }

  const onTouchMove = (e) => {
    e.preventDefault()
    const t = e.touches[0]
    const dx = t.clientX - dragStart.current.mx
    const dy = t.clientY - dragStart.current.my
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) setHasDragged(true)
    const x = Math.max(4, Math.min(window.innerWidth  - SIZE - 4, dragStart.current.bx + dx))
    const y = Math.max(4, Math.min(window.innerHeight - SIZE - 4, dragStart.current.by + dy))
    setPos({ x, y })
  }

  const onTouchEnd = () => {
    setPos(p => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {} return p })
  }

  // ── Click (open WA only if not dragged) ───────────────────
  const getMessage = () => {
    if (pathname.includes('electrician')) return 'Namaste! Mujhe electrician service chahiye Haldwani mein.'
    if (pathname.includes('solar'))       return 'Namaste! Solar panel ya battery ke baare mein jaanna chahta hoon.'
    if (pathname.includes('interior'))    return 'Namaste! Interior design ke liye free home visit chahiye.'
    if (pathname.includes('tools'))       return 'Namaste! Almenso tools ke baare mein kuch poochna tha.'
    return 'Namaste! Almenso se baat karni thi.'
  }

  const handleClick = (e) => {
    if (hasDragged) { e.preventDefault(); return }
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(getMessage())}`, '_blank', 'noopener,noreferrer')
  }

  if (isAdmin || !show || !pos) return null

  return (
    <div
      ref={btnRef}
      aria-label="WhatsApp pe baat karo"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleClick}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: '#25d366',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.6rem',
        boxShadow: '0 4px 16px rgba(37,211,102,0.5)',
        zIndex: 9999,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        animation: dragging ? 'none' : 'waPulse 2.5s infinite',
        transition: dragging ? 'none' : 'box-shadow 0.2s',
        transform: dragging ? 'scale(1.12)' : 'scale(1)',
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <style>{`
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>
    </div>
  )
})

export default WhatsAppButton

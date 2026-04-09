/**
 * SCROLL TO TOP BUTTON
 * Shows after scrolling 400px, smooth scroll back
 */
import React, { useState, useEffect, memo } from 'react'

const ScrollToTop = memo(function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      className="stt-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      title="Upar Jao"
    >
      ↑
    </button>
  )
})

export default ScrollToTop

/**
 * LanguageToggle — Hindi / English switcher button
 * TopNav mein ya footer mein add karo
 *
 * Usage: <LanguageToggle />
 */

import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import './LanguageToggle.css'

export default function LanguageToggle({ className = '' }) {
  const { lang, toggleLang } = useLanguage()
  const isHindi = lang === 'hi'

  return (
    <button
      className={`lang-toggle ${className}`}
      onClick={toggleLang}
      aria-label={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
      title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <span className={`lang-option ${isHindi ? 'active' : ''}`}>अ</span>
      <span className="lang-divider">|</span>
      <span className={`lang-option ${!isHindi ? 'active' : ''}`}>A</span>
    </button>
  )
}

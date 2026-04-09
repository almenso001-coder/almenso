/**
 * ALMENSO — LanguageContext
 * ─────────────────────────
 * • Auto-detects browser language (hi / en)
 * • Saves user preference in localStorage
 * • Sets <html lang="..."> for SEO
 * • Provides useLanguage() and useT() hooks
 *
 * Usage:
 *   const { lang, toggleLang } = useLanguage()
 *   const t = useT()
 *   <h1>{t('home.heroTitle')}</h1>
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, detectBrowserLang, resolveKey } from '../i18n'

const STORAGE_KEY = 'almenso_lang'

const LangCtx = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // 1. User ka saved preference
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'hi' || saved === 'en') return saved
    } catch (e) {
      // localStorage might not be available in some envs
      if (import.meta.env.DEV) console.warn('localStorage access failed:', e)
    }
    // 2. Browser language auto-detect
    return detectBrowserLang()
  })

  // HTML lang attribute set karo — Google ke liye important
  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  const setLanguage = useCallback((newLang) => {
    if (newLang !== 'hi' && newLang !== 'en') return
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch (e) {
      // localStorage might not be available in some envs
      if (import.meta.env.DEV) console.warn('localStorage write failed:', e)
    }
    setLang(newLang)
  }, [])

  const toggleLang = useCallback(() => {
    setLanguage(lang === 'hi' ? 'en' : 'hi')
  }, [lang, setLanguage])

  // Translation function
  const t = useCallback((key, fallback) => {
    const result = resolveKey(translations[lang], key)
    // Agar current lang mein nahi mila, English try karo
    if (result === key && lang !== 'en') {
      const enResult = resolveKey(translations.en, key)
      return enResult !== key ? enResult : (fallback ?? key)
    }
    return result !== key ? result : (fallback ?? key)
  }, [lang])

  return (
    <LangCtx.Provider value={{ lang, setLanguage, toggleLang, t, isHindi: lang === 'hi' }}>
      {children}
    </LangCtx.Provider>
  )
}

// ── Hooks ──────────────────────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useT() {
  const { t } = useLanguage()
  return t
}

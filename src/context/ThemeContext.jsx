/**
 * THEME CONTEXT — Dark / Light mode
 * Persists in localStorage, respects OS preference
 * Toggle via useTheme() hook
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeCtx = createContext({ dark: false, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('almenso_theme')
      if (saved) return saved === 'dark'
      // Respect OS preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch { return false }
  })

  // Apply to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('almenso_theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  // Listen to OS preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('almenso_theme')) setDark(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = useCallback(() => setDark(d => !d), [])

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)

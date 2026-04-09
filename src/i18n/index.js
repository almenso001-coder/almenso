import hi from './hi'
import en from './en'

export const translations = { hi, en }
export const SUPPORTED_LANGS = ['hi', 'en']
export const DEFAULT_LANG = 'hi'

// ── Auto-detect browser language ──────────────────────────────
// Returns 'hi' or 'en' based on browser preference
export function detectBrowserLang() {
  const langs = navigator.languages || [navigator.language || 'en']
  for (const lang of langs) {
    const code = lang.toLowerCase().split('-')[0]
    if (code === 'hi') return 'hi'
    if (code === 'en') return 'en'
  }
  // India mein mostly Hindi users — default hi
  return DEFAULT_LANG
}

// ── Deep key resolver: t('home.heroTitle') ────────────────────
export function resolveKey(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path
}

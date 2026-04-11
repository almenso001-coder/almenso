/**
 * ANALYTICS UTILITY
 * Google Analytics 4 placeholder — production-safe.
 * 
 * HOW TO ACTIVATE:
 * 1. Get your Measurement ID from analytics.google.com (format: G-XXXXXXXXXX)
 * 2. Set it in Admin Panel → Settings → Analytics tab (recommended)
 *    OR paste it below as GA_MEASUREMENT_ID
 * 3. Uncomment the injectGAScript() call in initAnalytics()
 * 
 * Until then, all gtag() calls are no-ops so nothing breaks.
 */

const GA_MEASUREMENT_ID = '' // e.g. 'G-XXXXXXXXXX' — set via Admin Panel

// ── Internal: inject GA script tag once ──────────────────────────────────────
function injectGAScript(measurementId) {
  if (document.querySelector(`script[data-ga="${measurementId}"]`)) return // already injected

  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script1.setAttribute('data-ga', measurementId)
  document.head.appendChild(script1)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    anonymize_ip: true,          // GDPR best-practice
    cookie_flags: 'SameSite=None;Secure',
  })
}

// ── Safe gtag wrapper — silently no-ops if GA not loaded ────────────────────
function gtag(...args) {
  if (typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Call once from main.jsx / App.jsx after mount.
 * Reads measurementId from Admin Panel settings (localStorage) if present,
 * then falls back to the hardcoded GA_MEASUREMENT_ID above.
 */
export function initAnalytics() {
  // Try to read from Admin Panel → Settings
  let id = GA_MEASUREMENT_ID
  try {
    const adminSettings = JSON.parse(localStorage.getItem('almenso_settings') || '{}')
    if (adminSettings.ga_measurement_id) id = adminSettings.ga_measurement_id
  } catch (_) {}

  if (id && id.startsWith('G-')) {
    injectGAScript(id)
  }
  // If no ID → silently skip. App works fine without GA.
}

/**
 * Track a page view (call on route change).
 * Already handled automatically by GA4 for SPAs when using the config above,
 * but call this explicitly if needed.
 */
export function trackPageView(path = window.location.pathname) {
  gtag('event', 'page_view', { page_path: path })
}

/**
 * Track a tool usage event.
 * @param {string} toolId  e.g. 'age-calculator'
 * @param {string} toolName e.g. 'Age Calculator'
 */
export function trackToolUse(toolId, toolName) {
  gtag('event', 'tool_use', {
    event_category: 'Tools',
    event_label: toolName,
    tool_id: toolId,
  })
}

/**
 * Track a CTA click (Read Guide / Use Tool).
 * @param {string} ctaType  'read_guide' | 'use_tool' | 'book_service'
 * @param {string} label    e.g. 'Age Calculator'
 */
export function trackCTA(ctaType, label) {
  gtag('event', 'cta_click', {
    event_category: 'CTA',
    event_label: label,
    cta_type: ctaType,
  })
}

/**
 * Track an AdSense impression (for custom reporting).
 * @param {string} slot  e.g. 'top' | 'mid' | 'bottom'
 */
export function trackAdImpression(slot) {
  gtag('event', 'ad_impression', {
    event_category: 'Ads',
    ad_slot: slot,
  })
}

/**
 * Track a share button click.
 * @param {string} method  'native' | 'copy'
 * @param {string} content  e.g. 'Age Calculator'
 */
export function trackShare(method, content) {
  gtag('event', 'share', {
    method,
    content_type: 'tool',
    item_id: content,
  })
}

export default { initAnalytics, trackPageView, trackToolUse, trackCTA, trackAdImpression, trackShare }

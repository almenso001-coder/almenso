/**
 * PERFORMANCE UTILITIES
 * Web Vitals tracking + lazy image loading
 */

// ── Report Web Vitals to GA4 ─────────────────────────────────
export function reportWebVitals() {
  if (typeof window === 'undefined') return

  // Use PerformanceObserver to track LCP, CLS, FID
  try {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lcp = entries[entries.length - 1]
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'web_vitals', {
          metric_name:  'LCP',
          metric_value: Math.round(lcp.startTime),
          metric_delta: Math.round(lcp.startTime),
        })
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    // Cumulative Layout Shift
    let clsValue = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) clsValue += entry.value
      }
    }).observe({ type: 'layout-shift', buffered: true })

    // Report CLS on page hide
    window.addEventListener('pagehide', () => {
      if (typeof window.gtag === 'function' && clsValue > 0) {
        window.gtag('event', 'web_vitals', {
          metric_name:  'CLS',
          metric_value: Math.round(clsValue * 1000),
        })
      }
    }, { once: true })
  } catch {
    // PerformanceObserver not supported — silent fail
  }
}

// ── Preload critical routes ───────────────────────────────────
export function preloadRoute(importFn) {
  // Call on hover/focus to preload chunk before navigation
  return () => importFn()
}

// ── Image lazy loading with IntersectionObserver ─────────────
export function setupLazyImages() {
  if (!('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            observer.unobserve(img)
          }
        }
      })
    },
    { rootMargin: '50px 0px', threshold: 0.01 }
  )

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img))
}

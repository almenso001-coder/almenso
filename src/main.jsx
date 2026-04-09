import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/responsive.css'
import './styles/responsive-patches.css'

// ── Critical: Ensure root element exists ──────────────────────
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element with id="root" not found in index.html')
}

// ── Mount React App ──────────────────────────────────────────
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// ── PWA Service Worker ────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(reg => {
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing
          if (!newSW) return
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent('sw-updated'))
            }
          })
        })
      })
      .catch(err => {
        if (import.meta.env.DEV) {
          console.warn('SW registration failed:', err)
        }
      })
  })
}

// ── Web Vitals — production only ─────────────────────────────
if (import.meta.env.PROD) {
  import('./utils/performance.js')
    .then(({ reportWebVitals }) => {
      if (typeof reportWebVitals === 'function') {
        reportWebVitals()
      }
    })
    .catch(err => {
      if (import.meta.env.DEV) {
        console.warn('Performance tracking failed:', err)
      }
    })
}

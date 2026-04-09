// ============================================================
// ALMENSO — PWA Utility
// Service Worker registration + Install prompt management
// ============================================================

// ─── Register Service Worker ─────────────────────────────────
export async function registerSW() {
  if (!('serviceWorker' in navigator)) {
    console.info('[PWA] Service Worker not supported')
    return
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing
      newSW?.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available — optional: show update toast
          window.dispatchEvent(new CustomEvent('sw-update-available'))
        }
      })
    })
return reg
  } catch (err) {
    console.error('[PWA] SW registration failed:', err)
  }
}

// ─── Install Prompt Store ────────────────────────────────────
// beforeinstallprompt event ko save karta hai
let deferredPrompt = null
let installListeners = []

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  installListeners.forEach(fn => fn(true))
})

window.addEventListener('appinstalled', () => {
  deferredPrompt = null
  installListeners.forEach(fn => fn(false))
  localStorage.setItem('almenso_pwa_installed', '1')
})

// Subscribe to install prompt availability
export function onInstallReady(callback) {
  installListeners.push(callback)
  // Already available check
  if (deferredPrompt) callback(true)
  return () => { installListeners = installListeners.filter(f => f !== callback) }
}

// Trigger native install prompt
export async function triggerInstall() {
  if (!deferredPrompt) return false
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
deferredPrompt = null
  installListeners.forEach(fn => fn(false))
  return outcome === 'accepted'
}

// Check if already installed (standalone mode)
export function isInstalled() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    localStorage.getItem('almenso_pwa_installed') === '1'
  )
}

// Check if iOS (Safari — different install flow)
export function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
}

export function isInStandaloneMode() {
  return window.navigator.standalone === true
}

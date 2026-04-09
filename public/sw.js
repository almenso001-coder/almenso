// ============================================================
// ALMENSO — Service Worker v20260321
// Strategy: Cache-first for assets, Network-first for pages
// ============================================================

const SW_VERSION   = 'v20260321'
const CACHE_STATIC = `almenso-static-${SW_VERSION}`
const CACHE_PAGES  = `almenso-pages-${SW_VERSION}`
const CACHE_FONTS  = `almenso-fonts-${SW_VERSION}`

// Core files to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/robots.txt',
]

// ── Install ──────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// ── Activate — clean old caches ──────────────────────────────
self.addEventListener('activate', e => {
  const validCaches = [CACHE_STATIC, CACHE_PAGES, CACHE_FONTS]
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => !validCaches.includes(k))
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

// ── Fetch Strategy ───────────────────────────────────────────
self.addEventListener('fetch', e => {
  const { request } = e
  const url = new URL(request.url)

  // Skip: non-GET, cross-origin (except fonts/CDN)
  if (request.method !== 'GET') return

  // Firebase / API calls — always network, never cache
  if (url.hostname.includes('firebase') ||
      url.hostname.includes('firestore') ||
      url.hostname.includes('googleapis') && !url.hostname.includes('fonts')) {
    return // Let browser handle natively
  }

  // Google Fonts — cache-first (font files rarely change)
  if (url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(request, CACHE_FONTS, 60 * 24 * 365))
    return
  }
  if (url.hostname === 'fonts.googleapis.com') {
    e.respondWith(cacheFirst(request, CACHE_FONTS, 60 * 24 * 1))
    return
  }

  // Same-origin only below
  if (url.origin !== location.origin) return

  // HTML pages — network-first (fresh content)
  if (request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(networkFirst(request, CACHE_PAGES))
    return
  }

  // JS/CSS/Images/Icons — cache-first (hashed filenames = safe)
  if (url.pathname.match(/\.(js|css|svg|png|jpg|jpeg|webp|ico|woff2?)$/)) {
    e.respondWith(cacheFirst(request, CACHE_STATIC))
    return
  }

  // Default: network-first
  e.respondWith(networkFirst(request, CACHE_PAGES))
})

// ── Cache-First Strategy ─────────────────────────────────────
async function cacheFirst(request, cacheName, maxAgeMinutes) {
  const cache  = await caches.open(cacheName)
  const cached = await cache.match(request)

  if (cached) {
    // Check age if maxAgeMinutes specified
    if (maxAgeMinutes) {
      const dateHeader = cached.headers.get('date')
      if (dateHeader) {
        const age = (Date.now() - new Date(dateHeader).getTime()) / 60000
        if (age > maxAgeMinutes) {
          // Stale — revalidate in background
          fetch(request).then(r => { if (r.ok) cache.put(request, r.clone()) }).catch(() => {})
        }
      }
    }
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok && response.status < 400) {
      cache.put(request, response.clone())
    }
    return response
  } catch {
    // Offline fallback
    return caches.match('/index.html') ||
           new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
  }
}

// ── Network-First Strategy ───────────────────────────────────
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const response = await fetch(request)
    if (response.ok && response.status < 400) {
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await cache.match(request) || await cache.match('/index.html')
    return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
  }
}

// ── Push Notifications ───────────────────────────────────────
self.addEventListener('push', e => {
  if (!e.data) return
  try {
    const data = e.data.json()
    e.waitUntil(
      self.registration.showNotification(data.title || 'Almenso', {
        body:               data.body || '',
        icon:               '/icon-192.svg',
        badge:              '/icon-96.svg',
        data:               { url: data.url || '/' },
        vibrate:            [200, 100, 200],
        requireInteraction: false,
      })
    )
  } catch {}
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  const url = e.notification.data?.url || '/'
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(location.origin))
      if (existing) { existing.focus(); existing.navigate(url) }
      else clients.openWindow(url)
    })
  )
})

// ── Background Sync (for failed lead submissions) ────────────
self.addEventListener('sync', e => {
  if (e.tag === 'sync-leads') {
    e.waitUntil(syncPendingLeads())
  }
})

async function syncPendingLeads() {
  // Pending leads localStorage se read karke retry karna
  // This runs when connectivity is restored
  try {
    const clients_list = await clients.matchAll()
    clients_list.forEach(client => {
      client.postMessage({ type: 'SYNC_LEADS' })
    })
  } catch {}
}

// ============================================================
// ALMENSO — Firestore Database Utility
// Graceful fallback: Firebase nahi hai → localStorage use karo
// ============================================================
import { getFirestore, isFirebaseConfigured } from './firebase'
import {
  DEFAULT_SETTINGS, DEFAULT_GROCERY,
  DEFAULT_ELECTRICAL, DEFAULT_SERVICES
} from '../data/data'

// ─── Collections ─────────────────────────────────────────────
const COL = {
  settings: 'settings',
  products: 'products',
  services: 'services',
  orders:   'orders',
}

// ─── localStorage fallback keys ──────────────────────────────
const LS = {
  settings: 'almenso_settings',
  products: 'almenso_products',
  services: 'almenso_services',
  orders:   'almenso_orders',
}

// ════════════════════════════════════════════════════════════
// SETTINGS
// ════════════════════════════════════════════════════════════

export async function fetchSettings() {
  if (!isFirebaseConfigured) {
    try { return JSON.parse(localStorage.getItem(LS.settings)) || DEFAULT_SETTINGS }
    catch { return DEFAULT_SETTINGS }
  }
  try {
    const fb = await getFirestore()
    const snap = await fb.getDoc(fb.doc(fb.db, COL.settings, 'store'))
    if (snap.exists()) return { ...DEFAULT_SETTINGS, ...snap.data() }
    // First time — seed defaults to Firestore
    await fb.setDoc(fb.doc(fb.db, COL.settings, 'store'), DEFAULT_SETTINGS)
    return DEFAULT_SETTINGS
  } catch (e) {
    console.warn('[DB] fetchSettings fallback:', e.message)
    try { return JSON.parse(localStorage.getItem(LS.settings)) || DEFAULT_SETTINGS }
    catch { return DEFAULT_SETTINGS }
  }
}

export async function saveSettings(data) {
  // Always save to localStorage as backup
  localStorage.setItem(LS.settings, JSON.stringify(data))
  if (!isFirebaseConfigured) return
  try {
    const fb = await getFirestore()
    await fb.setDoc(fb.doc(fb.db, COL.settings, 'store'), data, { merge: true })
  } catch (e) { console.warn('[DB] saveSettings error:', e.message) }
}

// ════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════

export async function fetchProducts() {
  if (!isFirebaseConfigured) {
    try {
      const saved = JSON.parse(localStorage.getItem(LS.products))
      return saved?.length ? saved : [...DEFAULT_GROCERY, ...DEFAULT_ELECTRICAL]
    } catch { return [...DEFAULT_GROCERY, ...DEFAULT_ELECTRICAL] }
  }
  try {
    const fb = await getFirestore()
    const snap = await fb.getDocs(
      fb.query(fb.collection(fb.db, COL.products), fb.orderBy('createdAt', 'desc'))
    )
    if (snap.empty) {
      // First time — seed default products
      const defaults = [...DEFAULT_GROCERY, ...DEFAULT_ELECTRICAL]
      const batch = fb.writeBatch(fb.db)
      defaults.forEach(p => {
        const ref = fb.doc(fb.db, COL.products, p.id)
        batch.set(ref, { ...p, createdAt: fb.serverTimestamp() })
      })
      await batch.commit()
      return defaults
    }
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.warn('[DB] fetchProducts fallback:', e.message)
    try {
      const saved = JSON.parse(localStorage.getItem(LS.products))
      return saved?.length ? saved : [...DEFAULT_GROCERY, ...DEFAULT_ELECTRICAL]
    } catch { return [...DEFAULT_GROCERY, ...DEFAULT_ELECTRICAL] }
  }
}

export async function addProductDB(product) {
  const p = { ...product, id: 'p' + Date.now(), visible: true }
  if (!isFirebaseConfigured) {
    return p
  }
  try {
    const fb = await getFirestore()
    await fb.setDoc(fb.doc(fb.db, COL.products, p.id), {
      ...p, createdAt: fb.serverTimestamp()
    })
    return p
  } catch (e) {
    console.warn('[DB] addProduct error:', e.message)
    return p
  }
}

export async function updateProductDB(id, data) {
  if (!isFirebaseConfigured) return
  try {
    const fb = await getFirestore()
    await fb.updateDoc(fb.doc(fb.db, COL.products, id), {
      ...data, updatedAt: fb.serverTimestamp()
    })
  } catch (e) { console.warn('[DB] updateProduct error:', e.message) }
}

export async function deleteProductDB(id) {
  if (!isFirebaseConfigured) return
  try {
    const fb = await getFirestore()
    await fb.deleteDoc(fb.doc(fb.db, COL.products, id))
  } catch (e) { console.warn('[DB] deleteProduct error:', e.message) }
}

// ════════════════════════════════════════════════════════════
// SERVICES
// ════════════════════════════════════════════════════════════

export async function fetchServices() {
  if (!isFirebaseConfigured) {
    try {
      const saved = JSON.parse(localStorage.getItem(LS.services))
      return saved?.length ? saved : DEFAULT_SERVICES
    } catch { return DEFAULT_SERVICES }
  }
  try {
    const fb = await getFirestore()
    const snap = await fb.getDocs(
      fb.query(fb.collection(fb.db, COL.services), fb.orderBy('createdAt', 'desc'))
    )
    if (snap.empty) {
      const batch = fb.writeBatch(fb.db)
      DEFAULT_SERVICES.forEach(s => {
        batch.set(fb.doc(fb.db, COL.services, s.id), { ...s, createdAt: fb.serverTimestamp() })
      })
      await batch.commit()
      return DEFAULT_SERVICES
    }
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.warn('[DB] fetchServices fallback:', e.message)
    try {
      const saved = JSON.parse(localStorage.getItem(LS.services))
      return saved?.length ? saved : DEFAULT_SERVICES
    } catch { return DEFAULT_SERVICES }
  }
}

export async function addServiceDB(service) {
  const s = { ...service, id: 's' + Date.now(), available: true }
  if (!isFirebaseConfigured) return s
  try {
    const fb = await getFirestore()
    await fb.setDoc(fb.doc(fb.db, COL.services, s.id), {
      ...s, createdAt: fb.serverTimestamp()
    })
    return s
  } catch (e) { console.warn('[DB] addService error:', e.message); return s }
}

export async function updateServiceDB(id, data) {
  if (!isFirebaseConfigured) return
  try {
    const fb = await getFirestore()
    await fb.updateDoc(fb.doc(fb.db, COL.services, id), {
      ...data, updatedAt: fb.serverTimestamp()
    })
  } catch (e) { console.warn('[DB] updateService error:', e.message) }
}

export async function deleteServiceDB(id) {
  if (!isFirebaseConfigured) return
  try {
    const fb = await getFirestore()
    await fb.deleteDoc(fb.doc(fb.db, COL.services, id))
  } catch (e) { console.warn('[DB] deleteService error:', e.message) }
}

// ════════════════════════════════════════════════════════════
// ────────────────────────────────────────────────────────────
// loadFirebase helper (alias for getFirestore)
// MUST be defined before fetchLocalShops / fetchBlogs / etc.
// ────────────────────────────────────────────────────────────
async function loadFirebase() {
  if (!isFirebaseConfigured) return null
  try { return await getFirestore() } catch { return null }
}

// BLOGS — Firebase collection: blogs
// Fields: id, title, slug, category, content, image,
//         summary, date, tags, readMin, status
// ════════════════════════════════════════════════════════════
const LS_BLOGS = 'almenso_blogs'

export async function fetchBlogs() {
  const fb = await loadFirebase()
  try {
    if (fb) {
      const snap = await fb.getDocs(
        fb.query(fb.collection(fb.db, 'blogs'), fb.orderBy('createdAt', 'desc'))
      )
      if (!snap.empty) {
        const blogs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        localStorage.setItem(LS_BLOGS, JSON.stringify(blogs))
        return blogs
      }
    }
  } catch {}
  try {
    const c = localStorage.getItem(LS_BLOGS)
    if (c) return JSON.parse(c)
  } catch {}
  return []
}

export async function saveBlogDB(blog) {
  const id = blog.id || 'blog_' + Date.now()
  const data = { ...blog, id, updatedAt: Date.now() }
  // localStorage
  try {
    const all = JSON.parse(localStorage.getItem(LS_BLOGS) || '[]')
    const idx = all.findIndex(b => b.id === id)
    if (idx >= 0) all[idx] = data; else all.unshift(data)
    localStorage.setItem(LS_BLOGS, JSON.stringify(all))
  } catch {}
  // Firebase
  try {
    const fb = await loadFirebase()
    if (fb) await fb.setDoc(fb.doc(fb.db, 'blogs', id), { ...data, updatedAt: fb.serverTimestamp() }, { merge: true })
  } catch {}
  return data
}

export async function deleteBlogDB(id) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_BLOGS) || '[]')
    localStorage.setItem(LS_BLOGS, JSON.stringify(all.filter(b => b.id !== id)))
  } catch {}
  try {
    const fb = await loadFirebase()
    if (fb) await fb.deleteDoc(fb.doc(fb.db, 'blogs', id))
  } catch {}
}

// ════════════════════════════════════════════════════════════
// LEADS — Firebase collection: leads
// Types: electrician | solar | interior
// ════════════════════════════════════════════════════════════
const LS_LEADS = 'almenso_leads'

export async function saveLeadDB(lead) {
  const id = 'lead_' + Date.now()
  const data = { ...lead, id, createdAt: Date.now() }
  // localStorage backup
  try {
    const all = JSON.parse(localStorage.getItem(LS_LEADS) || '[]')
    all.unshift(data)
    localStorage.setItem(LS_LEADS, JSON.stringify(all))
  } catch {}
  // Firebase
  try {
    const fb = await loadFirebase()
    if (fb) await fb.setDoc(fb.doc(fb.db, 'leads', id), { ...data, createdAt: fb.serverTimestamp() })
  } catch {}
  return data
}

export async function fetchLeads(type = null) {
  const fb = await loadFirebase()
  try {
    if (fb) {
      let q = fb.collection(fb.db, 'leads')
      q = type
        ? fb.query(q, fb.where('type', '==', type), fb.orderBy('createdAt', 'desc'))
        : fb.query(q, fb.orderBy('createdAt', 'desc'))
      const snap = await fb.getDocs(q)
      if (!snap.empty) return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    }
  } catch {}
  try {
    const all = JSON.parse(localStorage.getItem(LS_LEADS) || '[]')
    return type ? all.filter(l => l.type === type) : all
  } catch {}
  return []
}

export async function updateLeadStatusDB(id, status) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_LEADS) || '[]')
    const updated = all.map(l => l.id === id ? { ...l, status } : l)
    localStorage.setItem(LS_LEADS, JSON.stringify(updated))
  } catch {}
  try {
    const fb = await loadFirebase()
    if (fb) await fb.updateDoc(fb.doc(fb.db, 'leads', id), { status, updatedAt: fb.serverTimestamp() })
  } catch {}
}

// ════════════════════════════════════════════════════════════
// AFFILIATE PRODUCTS — Firebase collection: affiliateProducts
// Fields: id, name, image, price, link, category, badge, visible
// ════════════════════════════════════════════════════════════
const LS_AFF = 'almenso_affiliate_products'

// NOTE: Hardcoded links hata diye — ab Admin Panel → Affiliate tab se control hota hai
// Firebase/localStorage mein admin-saved products aate hain, fallback SettingsContext ke DEFAULT_AFFILIATE_PRODUCTS hain
const DEFAULT_AFF_PRODUCTS = []

export async function fetchAffiliateProducts(category = null) {
  const fb = await loadFirebase()
  try {
    if (fb) {
      let q = fb.collection(fb.db, 'affiliateProducts')
      q = category
        ? fb.query(q, fb.where('category', '==', category), fb.where('visible', '==', true))
        : fb.query(q, fb.orderBy('createdAt', 'desc'))
      const snap = await fb.getDocs(q)
      if (!snap.empty) return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    }
  } catch {}
  try {
    const saved = JSON.parse(localStorage.getItem(LS_AFF))
    if (saved?.length) return category ? saved.filter(p => p.category === category && p.visible) : saved
  } catch {}
  return category ? DEFAULT_AFF_PRODUCTS.filter(p => p.category === category) : DEFAULT_AFF_PRODUCTS
}

export async function saveAffiliateProductDB(product) {
  const id = product.id || 'aff_' + Date.now()
  const data = { ...product, id, updatedAt: Date.now() }
  try {
    const all = JSON.parse(localStorage.getItem(LS_AFF) || '[]')
    const idx = all.findIndex(p => p.id === id)
    if (idx >= 0) all[idx] = data; else all.unshift(data)
    localStorage.setItem(LS_AFF, JSON.stringify(all))
  } catch {}
  try {
    const fb = await loadFirebase()
    if (fb) await fb.setDoc(fb.doc(fb.db, 'affiliateProducts', id), { ...data, updatedAt: fb.serverTimestamp() }, { merge: true })
  } catch {}
  return data
}

export async function deleteAffiliateProductDB(id) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_AFF) || '[]')
    localStorage.setItem(LS_AFF, JSON.stringify(all.filter(p => p.id !== id)))
  } catch {}
  try {
    const fb = await loadFirebase()
    if (fb) await fb.deleteDoc(fb.doc(fb.db, 'affiliateProducts', id))
  } catch {}
}

// ════════════════════════════════════════════════════════════
// USERS / SUBSCRIBERS — Firebase collection: users
// Fields: phone, name, createdAt, lastLogin, notifEnabled
// ════════════════════════════════════════════════════════════
const LS_USERS = 'almenso_users'

export async function saveUserDB(user) {
  const id = 'user_' + user.phone.replace(/[^0-9]/g,'')
  const data = { ...user, id, updatedAt: Date.now() }
  try {
    const all = JSON.parse(localStorage.getItem(LS_USERS) || '{}')
    all[id] = data
    localStorage.setItem(LS_USERS, JSON.stringify(all))
  } catch {}
  try {
    const fb = await loadFirebase()
    if (fb) await fb.setDoc(fb.doc(fb.db, 'users', id), { ...data, updatedAt: fb.serverTimestamp() }, { merge: true })
  } catch {}
  return data
}

export async function fetchUsersDB() {
  const fb = await loadFirebase()
  try {
    if (fb) {
      const snap = await fb.getDocs(fb.query(fb.collection(fb.db, 'users'), fb.orderBy('updatedAt', 'desc')))
      if (!snap.empty) return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    }
  } catch {}
  try {
    const all = JSON.parse(localStorage.getItem(LS_USERS) || '{}')
    return Object.values(all)
  } catch {}
  return []
}

export async function getUserDB(phone) {
  const id = 'user_' + phone.replace(/[^0-9]/g,'')
  try {
    const fb = await loadFirebase()
    if (fb) {
      const snap = await fb.getDoc(fb.doc(fb.db, 'users', id))
      if (snap.exists()) return { id: snap.id, ...snap.data() }
    }
  } catch {}
  try {
    const all = JSON.parse(localStorage.getItem(LS_USERS) || '{}')
    return all[id] || null
  } catch {}
  return null
}

// ════════════════════════════════════════════════════════════
// NOTIFICATIONS — Firebase collection: notifications
// Fields: message, type, sentTo, sentAt, status
// ════════════════════════════════════════════════════════════
const LS_NOTIFS = 'almenso_notifications'

export async function saveNotificationDB(notif) {
  const id = 'notif_' + Date.now()
  const data = { ...notif, id, createdAt: Date.now() }
  try {
    const all = JSON.parse(localStorage.getItem(LS_NOTIFS) || '[]')
    all.unshift(data)
    localStorage.setItem(LS_NOTIFS, JSON.stringify(all.slice(0, 100)))
  } catch {}
  try {
    const fb = await loadFirebase()
    if (fb) await fb.setDoc(fb.doc(fb.db, 'notifications', id), { ...data, createdAt: fb.serverTimestamp() })
  } catch {}
  return data
}

export async function fetchNotificationsDB() {
  const fb = await loadFirebase()
  try {
    if (fb) {
      const snap = await fb.getDocs(fb.query(fb.collection(fb.db, 'notifications'), fb.orderBy('createdAt', 'desc')))
      if (!snap.empty) return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    }
  } catch {}
  try { return JSON.parse(localStorage.getItem(LS_NOTIFS) || '[]') } catch {}
  return []
}

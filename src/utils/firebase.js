// ============================================================
// ALMENSO — Firebase Configuration
// Priority: 1) VITE_ env vars  2) localStorage (Admin se)  3) Placeholder
// ============================================================

function getConfig(key, lsKey, fallback = '') {
  // 1. Vite env variable (production — .env file)
  const envVal = import.meta.env[key]
  if (envVal && !envVal.includes('XXXXXXXXXX') && !envVal.includes('YOUR_')) return envVal
  // 2. Admin panel se localStorage mein save kiya
  try {
    const ls = JSON.parse(localStorage.getItem('almenso_settings') || '{}')
    if (ls[lsKey]) return ls[lsKey]
  } catch {}
  return fallback
}

export const firebaseConfig = {
  apiKey:            getConfig('VITE_FIREBASE_API_KEY',            'firebaseApiKey'),
  authDomain:        getConfig('VITE_FIREBASE_AUTH_DOMAIN',        'firebaseAuthDomain'),
  projectId:         getConfig('VITE_FIREBASE_PROJECT_ID',         'firebaseProjectId'),
  storageBucket:     getConfig('VITE_FIREBASE_STORAGE_BUCKET',     'firebaseStorageBucket'),
  messagingSenderId: getConfig('VITE_FIREBASE_MESSAGING_SENDER_ID','firebaseMessagingSenderId'),
  appId:             getConfig('VITE_FIREBASE_APP_ID',             'firebaseAppId'),
}

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
  firebaseConfig.projectId !== 'YOUR_PROJECT_ID'
)

// ─── Singleton cache ─────────────────────────────────────────
let _app  = null
let _auth = null
let _db   = null

async function getApp() {
  if (_app) return _app
  const { initializeApp, getApps, getApp: _getApp } = await import(
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
  )
  _app = getApps().length ? _getApp() : initializeApp(firebaseConfig)
  return _app
}

export async function getFirebaseAuth() {
  if (_auth) return _auth
  if (!isFirebaseConfigured) return null
  const app = await getApp()
  const {
    getAuth, RecaptchaVerifier, signInWithPhoneNumber,
    GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
  } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js')
  _auth = getAuth(app)
  return { auth: _auth, RecaptchaVerifier, signInWithPhoneNumber,
           GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
}

export async function getFirestore() {
  if (_db) return _db
  if (!isFirebaseConfigured) return null
  const app = await getApp()
  const {
    getFirestore: _getFirestore,
    collection, doc, getDoc, getDocs, setDoc,
    addDoc, updateDoc, deleteDoc, onSnapshot,
    query, orderBy, where, serverTimestamp, writeBatch,
  } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js')
  _db = _getFirestore(app)
  return {
    db: _db, collection, doc, getDoc, getDocs, setDoc,
    addDoc, updateDoc, deleteDoc, onSnapshot,
    query, orderBy, where, serverTimestamp, writeBatch,
  }
}

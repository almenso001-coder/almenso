# 🔥 Firebase Complete Setup — Almenso
## Auth (Phone OTP + Google) + Firestore Database

---

## Step 1 — Project Banao (FREE)

1. **[console.firebase.google.com](https://console.firebase.google.com)**
2. **Add Project** → Name: `almenso` → Continue → Create Project

---

## Step 2 — Web App Add Karo

1. Project Overview → **</>** (Web) icon click karo
2. App nickname: `almenso-web` → **Register app**
3. **firebaseConfig** copy karo

---

## Step 3 — Config Paste Karo

File: `src/utils/firebase.js` mein yeh values replace karo:

```js
export const firebaseConfig = {
  apiKey:            'AIzaSy...',         // ← aapka
  authDomain:        'almenso.firebaseapp.com',
  projectId:         'almenso-xxxxx',
  storageBucket:     'almenso.appspot.com',
  messagingSenderId: '123456789',
  appId:             '1:123:web:abc',
}
```

---

## Step 4 — Authentication Enable Karo

1. Left menu → **Authentication** → **Get started**
2. **Sign-in method** tab:
   - ✅ **Phone** → Enable → Save
   - ✅ **Google** → Enable → Support email select → Save

### Test Numbers (Development):
1. Authentication → Sign-in method → Phone
2. **Phone numbers for testing** → Add:
   - Number: `+91 9999999999`  OTP: `123456`

---

## Step 5 — Firestore Database Banao ⭐ NEW

1. Left menu → **Firestore Database** → **Create database**
2. **Start in test mode** → Next → Location: `asia-south1` (Mumbai) → **Enable**
3. Database ban gayi! ✅

### Security Rules (Production ke liye — baad mein):
Firestore → Rules tab → Replace karo:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Settings: sirf admin padh sakta hai
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Products: sab padh sakte hain, sirf auth write
    match /products/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Services: sab padh sakte hain
    match /services/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Orders: logged in user apna order likh sakta hai
    match /orders/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Step 6 — Domain Authorize Karo (Live hone pe)

1. Authentication → Settings → **Authorized domains**
2. **Add domain** → `almenso.com`

---

## Done! ✅

### Kya-Kya Milta Hai:

| Feature | Firestore mein |
|---------|----------------|
| 📦 Products | Real-time sync — ek device pe add karo, dusre pe instantly dikhega |
| 🔧 Services | Admin se edit → live instantly |
| 🛒 Orders | Real-time — naya order aaya → Admin panel mein turant dikhega |
| ⚙️ Settings | Multi-device sync |
| 👤 Auth | Phone OTP + Google login |

### Free Plan (Spark):
| Feature | Limit |
|---------|-------|
| Firestore reads | 50,000/day |
| Firestore writes | 20,000/day |
| Firestore storage | 1 GB |
| Phone SMS | 10,000/month |
| Google Sign-In | Unlimited |
| **Cost** | **₹0** |

Haldwani ke local store ke liye **years tak free!** 🎉

---

## Admin Panel Status Indicator

Admin panel mein top-right corner mein dikhega:
- 🔥 **Live** — Firebase connected, real-time data
- ⏳ **Connecting** — Firebase load ho raha hai
- 💾 **Local** — Firebase configure nahi, localStorage use ho raha hai

Dono modes mein app kaam karta hai! ✅

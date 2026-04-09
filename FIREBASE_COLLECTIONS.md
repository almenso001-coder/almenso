# FIREBASE SETUP GUIDE — Almenso
# ============================================================
# Collections needed in Firestore
# ============================================================

## Step 1: firebase.js mein keys daalo
# File: src/utils/firebase.js

export const firebaseConfig = {
  apiKey:            'YOUR_ACTUAL_API_KEY',
  authDomain:        'your-project.firebaseapp.com',
  projectId:         'your-project-id',
  storageBucket:     'your-project.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId:             'YOUR_APP_ID',
}

## Step 2: Firebase Console pe yeh collections banao
# console.firebase.google.com → Firestore Database

### Collection: leads
# Automatically ban jaata hai jab user form submit kare
# Fields:
#   - id         (string)  — auto generated
#   - name       (string)  — user ka naam
#   - phone      (string)  — mobile number
#   - type       (string)  — "electrician" | "solar" | "interior"
#   - status     (string)  — "new" | "contacted" | "done"
#   - requirement (string) — kya chahiye
#   - address    (string)  — electrician ke liye
#   - city       (string)  — solar ke liye
#   - location   (string)  — interior ke liye
#   - budget     (string)  — interior ke liye
#   - note       (string)  — optional
#   - createdAt  (timestamp) — auto set

### Collection: services
# Admin panel se manage karo
# Fields:
#   - id          (string)
#   - name        (string)  — service ka naam
#   - price       (string)  — e.g. "₹500+"
#   - description (string)  — detail
#   - emoji       (string)  — e.g. "🔌"
#   - type        (string)  — "electrician" | "solar" | "interior"
#   - available   (boolean) — true/false
#   - createdAt   (timestamp)

### Collection: blogs
# Admin panel se manage karo
# Fields:
#   - id, title, slug, category, summary, content, image, date, status

### Collection: affiliateProducts
# Admin panel se manage karo
# Fields:
#   - id, name, price, image, link, category, badge, visible

## Step 3: Firestore Security Rules (test mode ke baad production ke liye)
# Firebase Console → Firestore → Rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads: anyone can create, only admin can read
    match /leads/{leadId} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
    // Services: anyone can read, only admin can write
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Blogs: anyone can read published, only admin can write
    match /blogs/{blogId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Affiliate Products: anyone can read, only admin can write
    match /affiliateProducts/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Settings: only admin
    match /settings/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}

## Step 4: Default services seed (Admin panel se add karo)
# Admin Panel → Services → + Naya Service
# Type: electrician
# Yeh add karo:
# 1. Home Wiring — ₹500+ — 🔌
# 2. Inverter Installation — ₹300+ — 🔋
# 3. Electrical Repair — ₹200+ — 🔧
# 4. Fan Installation — ₹150+ — 🌀
# 5. AC Service — ₹400+ — ❄️

## Admin Panel URL:
# https://yourdomain.com/admin-panel
# Default login:
#   Email: admin@almenso.com
#   Password: almenso123
# IMPORTANT: Change password after first login!

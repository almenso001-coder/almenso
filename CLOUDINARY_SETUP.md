# 📸 Cloudinary Image Upload — Almenso Setup Guide

## Step 1 — Free Account Banao

1. **[cloudinary.com](https://cloudinary.com)** → "Sign Up for Free"
2. **Cloud Name** dashboard pe dikhega — copy karo ✅

---

## Step 2 — Upload Preset Banao

1. Dashboard → **Settings** (gear icon) → **Upload** tab
2. Scroll down → **Upload Presets** → **Add upload preset**
3. Settings:
   - **Signing Mode:** `Unsigned` ← zaroori hai!
   - **Folder:** `almenso-products`
   - **Incoming Transformations:** `q_auto,f_auto` (auto quality + WebP)
4. **Save** → Preset Name copy karo ✅

---

## Step 3 — Code Mein Daalo

File: `src/utils/cloudinary.js`

```js
// Line 14-15 — apni values paste karo:
export const CLOUDINARY_CLOUD_NAME   = 'your_cloud_name_here'
export const CLOUDINARY_UPLOAD_PRESET = 'your_preset_name_here'
```

---

## Done! ✅

Ab Admin Panel → Products → **+ Add Product** → Photo Upload section dikhega.

### Features:
- 📂 Drag & drop upload
- 📋 URL paste karo (Google Images etc.)
- 🔄 Auto WebP convert + compress
- 📐 Auto resize (400×400 card, 200×200 thumbnail)
- ❌ Remove / change option

### Free Plan Limits:
| Feature | Free |
|---------|------|
| Storage | 25 GB |
| Bandwidth | 25 GB/month |
| Transformations | 25,000/month |
| Products store | Thousands |

Almenso jaise local store ke liye **years tak free**! 🎉

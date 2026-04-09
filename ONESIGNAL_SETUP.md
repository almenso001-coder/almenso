# 🔔 OneSignal Push Notifications — Almenso Setup Guide

## Step 1 — OneSignal Account Banao (FREE)

1. **[onesignal.com](https://onesignal.com)** pe jaao → Sign Up (free hai)
2. Dashboard mein **"New App/Website"** click karo
3. App name likho: `Almenso` → **Next**
4. Platform choose karo: ✅ **Web**

---

## Step 2 — Web Platform Configure Karo

| Field | Value |
|-------|-------|
| **Site Name** | Almenso |
| **Site URL** | `https://almenso.com` (apna domain) |
| **My site is not fully HTTPS** | ❌ (uncheck — HTTPS use karo) |
| **Default Notification Icon URL** | leave empty (favicon use hoga) |

Click **Save** → aapko **App ID** milega.

---

## Step 3 — App ID Code Mein Daalo

File kholao: `src/utils/oneSignal.js`

```js
// Line 12 — yahan apna App ID paste karo:
export const ONESIGNAL_APP_ID = 'PASTE_YOUR_APP_ID_HERE'
//                               ↑ example: 'a1b2c3d4-1234-5678-abcd-ef0123456789'
```

---

## Step 4 — REST API Key Admin Mein Daalo

1. OneSignal Dashboard → **Settings** → **Keys & IDs**
2. **REST API Key** copy karo
3. Almenso Admin panel (`/admin`) → **Settings** tab → **OneSignal REST API Key** field mein paste karo
4. Save karo ✅

---

## Step 5 — Service Worker (Already Done ✅)

File `/public/OneSignalSDKWorker.js` already banaya hua hai project mein.
Yeh automatically kaam karega jab deploy karoge.

---

## Step 6 — Deploy & Test

```bash
npm run build        # Production build banao
# → dist/ folder ko apne hosting pe upload karo
```

Deploy karne ke baad:
- Site visit karo → **4 seconds baad** notification permission prompt dikhega
- Allow karo → OneSignal dashboard mein subscriber count badhega

---

## Step 7 — Notifications Bhejo

**Admin Panel** → **🔔 Notify** tab:

| Feature | Description |
|---------|-------------|
| **Quick Templates** | Ready-made messages — ek click mein send |
| **Custom Notification** | Apna title + message likho |
| **URL Targeting** | Konse page pe le jaaye set karo |
| **Live Preview** | Notification kaisi dikhegi pehle dekho |
| **History** | Bheje gaye sab notifications ka record |

---

## Localhost Testing

`localhost` pe bhi kaam karega (`allowLocalhostAsSecureOrigin: true` already set hai).

> ⚠️ **Note:** Browser mein ek baar permission deny kiya toh browser settings se reset karna padega:
> Chrome → `chrome://settings/content/notifications` → almenso.com → Reset

---

## Free Plan Limits (OneSignal)

| Feature | Free Plan |
|---------|-----------|
| Subscribers | **Unlimited** |
| Notifications/month | **Unlimited** |
| Web Push | ✅ Included |
| Segmentation | Basic |

OneSignal ka free plan production ke liye bilkul sufficient hai! 🎉

# 🔐 Admin Panel — admin.almenso.com Setup Guide

## Aapko kya chahiye
- Netlify pe deploy kiya hua site (almenso.com)
- Domain ka DNS access (GoDaddy/Namecheap/Cloudflare)

---

## STEP 1 — Netlify pe CNAME add karo

1. Netlify Dashboard kholo → aapka site select karo
2. **Domain management** → **Add domain alias**
3. Daalo: `admin.almenso.com`
4. Netlify ek DNS value dega jaise: `almenso.netlify.app`

---

## STEP 2 — DNS mein CNAME record add karo

Apne domain provider (GoDaddy/Namecheap) mein jaao:

| Type  | Name  | Value                  |
|-------|-------|------------------------|
| CNAME | admin | almenso.netlify.app    |

**GoDaddy mein:**
- My Products → DNS → Add Record
- Type: CNAME
- Name: admin
- Value: almenso.netlify.app
- TTL: 1 hour

**Cloudflare mein:**
- DNS → Add record
- Type: CNAME, Name: admin, Target: almenso.netlify.app
- Proxy: OFF (grey cloud)

---

## STEP 3 — Wait karo (5-30 minutes)

DNS propagate hone mein thoda time lagta hai.

Check karo: https://admin.almenso.com

---

## Kaise kaam karta hai?

```
admin.almenso.com   →  Same React app
                       ↓
                    App.jsx checks window.location.hostname
                       ↓
                    "admin." se start hota hai?
                       ↓ YES
                    AdminPage directly load
                    (no /admin path needed)
```

- **admin.almenso.com** → Seedha Admin Panel (customers nahi dekh sakte)
- **almenso.com** → Normal customer shop
- **almenso.com/ab43d21a8** → Backup secret URL (abhi bhi kaam karta hai)

---

## Security Tips

1. Strong password rakhna — Admin → Settings → Change Password
2. Admin URL share mat karna customers ke saath
3. Vendor ko /vendor URL dena — /admin nahi

---

## Vendor Plans Control

Admin Panel → Vendors tab mein har vendor ka:
- **🆓 Basic** — 50 products, no courier, no analytics
- **⭐ Pro** — 200 products, courier access, analytics
- **👑 Premium** — Unlimited sab kuch

Aap fine-tune bhi kar sakte ho — har feature individually ON/OFF

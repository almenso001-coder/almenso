# 🌐 Almenso — i18n Integration Guide
## Hindi + English, Auto-detect Browser Language

---

## 📁 Files jo copy karne hain

```
src/
├── i18n/
│   ├── hi.js              ← Hindi translations (nayi file)
│   ├── en.js              ← English translations (nayi file)
│   └── index.js           ← Export + detectBrowserLang (nayi file)
├── context/
│   └── LanguageContext.jsx ← Core i18n context (nayi file)
├── components/
│   ├── LanguageToggle.jsx  ← Toggle button (nayi file)
│   ├── LanguageToggle.css  ← Toggle styles (nayi file)
│   └── SEOHead.jsx         ← Replace existing SEOHead.jsx
```

---

## STEP 1 — LanguageProvider add karo (App.jsx)

```jsx
// App.jsx mein yeh import add karo
import { LanguageProvider } from './context/LanguageContext'

// Phir SettingsProvider ke andar wrap karo:
function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <LanguageProvider>      {/* ← YEH ADD KARO */}
          <ThemeProvider>
            {/* ... baaki sab same */}
          </ThemeProvider>
        </LanguageProvider>     {/* ← YEH ADD KARO */}
      </SettingsProvider>
    </BrowserRouter>
  )
}
```

---

## STEP 2 — Language toggle button add karo (TopNav.jsx)

```jsx
// TopNav.jsx mein import karo
import LanguageToggle from './LanguageToggle'

// TopNav ke andar, dark mode toggle ke paas add karo:
<LanguageToggle />
```

TopNav.jsx mein approximately yahan add karo (dark mode button ke paas):
```jsx
{/* Existing dark mode button */}
<button onClick={toggleDark}>🌙</button>

{/* Language toggle — yahan add karo */}
<LanguageToggle />
```

---

## STEP 3 — Kisi bhi component mein translate karo

```jsx
// Component ke upar
import { useT } from '../context/LanguageContext'

// Component ke andar
export default function HomePage() {
  const t = useT()

  return (
    <div>
      <h1>{t('home.heroTitle')}</h1>
      <p>{t('home.heroSubtitle')}</p>
      <button>{t('home.heroBtn1')}</button>
    </div>
  )
}
```

---

## STEP 4 — HomePage.jsx example conversion

**BEFORE (hardcoded):**
```jsx
const SERVICES = [
  { title: 'Electrician Service', tagline: 'Haldwani mein ek phone pe...' }
]
```

**AFTER (translated):**
```jsx
import { useT } from '../context/LanguageContext'

export default function HomePage() {
  const t = useT()

  // Dynamic services with translations
  const SERVICES = [
    {
      id: 'electrician',
      emoji: '⚡',
      title:   t('services.electrician.title'),
      badge:   t('services.electrician.badge'),
      tagline: t('services.electrician.tagline'),
      price:   t('services.electrician.price'),
      points:  t('services.electrician.points'),  // returns array
      path: '/electrician-haldwani',
      accent: '#dbeafe', accentDark: '#1d4ed8'
    },
    // ... solar, interior same pattern
  ]
}
```

---

## STEP 5 — SEOHead mein language-aware titles

```jsx
// Kisi bhi page mein
import { useT } from '../context/LanguageContext'

export default function ToolsPage() {
  const t = useT()

  return (
    <>
      <SEOHead
        title={t('seo.tools.title')}
        description={t('seo.tools.description')}
        canonical="https://almenso.com/tools"
      />
      {/* ... page content */}
    </>
  )
}
```

---

## STEP 6 — Tool page titles (CalculatorRouter etc.)

Tools ke titles bhi translate karne chahiye. Pattern:

```jsx
// tools mein useT import karo
const t = useT()

// Tool title
<h1>{t('tools.gst')}</h1>           // "GST Calculator" / "GST कैलकुलेटर"
<button>{t('tools.calculate')}</button> // "Calculate" / "कैलकुलेट करें"
<button>{t('tools.reset')}</button>     // "Reset" / "रीसेट"
```

---

## Translation Keys Reference

| Key | Hindi | English |
|-----|-------|---------|
| `home.heroTitle` | हल्द्वानी का डिजिटल सहायक | Haldwani's Digital Assistant |
| `home.heroBtn1` | टूल्स देखें | Explore Tools |
| `services.electrician.title` | इलेक्ट्रीशियन सर्विस | Electrician Service |
| `tools.calculate` | कैलकुलेट करें | Calculate |
| `tools.reset` | रीसेट | Reset |
| `common.bookNow` | अभी बुक करें | Book Now |
| `common.loading` | लोड हो रहा है... | Loading... |
| `footer.privacy` | प्राइवेसी पॉलिसी | Privacy Policy |

---

## SEO Faida kya milega?

| Cheez | Pehle | Baad mein |
|-------|-------|-----------|
| `<html lang>` | missing | `hi-IN` ya `en-IN` auto |
| `hreflang` | nahi tha | dono versions ke liye add |
| `og:locale` | missing | `hi_IN` / `en_IN` |
| Meta title | Hinglish | Pure Hindi ya pure English |
| Google understanding | confused | clear language signal |

---

## Naye translations kaise add karein?

1. `src/i18n/hi.js` mein Hindi text add karo
2. `src/i18n/en.js` mein English text add karo
3. Component mein `t('new.key')` use karo

Bas itna hi! ✅

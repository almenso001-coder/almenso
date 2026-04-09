import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'
import LanguageToggle from './LanguageToggle'
import './TopNav.css'


// ── Prefetch on hover — preloads chunk before navigation ──────
const PREFETCH_MAP = {
  '/tools':                () => import('../pages/ToolsPage'),
  '/blog':                 () => import('../pages/BlogPage'),
  '/electrician-haldwani': () => import('../pages/ElectricianPage'),
  '/solar-solutions':      () => import('../pages/SolarPage'),
  '/interior-design':      () => import('../pages/InteriorPage'),
  '/products':             () => import('../pages/ProductsPage'),
  '/about':                () => import('../pages/AboutPage'),
  '/contact':              () => import('../pages/ContactPage'),
}
const prefetched = new Set()
function prefetchRoute(path) {
  if (prefetched.has(path) || !PREFETCH_MAP[path]) return
  prefetched.add(path)
  PREFETCH_MAP[path]().catch(() => {})
}

const NAV = [
  { label:'Home',            path:'/',                     ico:'🏠' },
  { label:'Tools',           path:'/tools',                ico:'🛠️' },
  { label:'Blog',            path:'/blog',                 ico:'📝' },
  { label:'Electrician',     path:'/electrician-haldwani', ico:'⚡' },
  { label:'Solar Solutions', path:'/solar-solutions',      ico:'☀️' },
  { label:'Interior Design', path:'/interior-design',      ico:'🏠' },
  { label:'Products',        path:'/products',             ico:'🛒' },
  { label:'Contact',         path:'/contact',              ico:'📞' },
]

// Quick search suggestions
const SEARCH_ITEMS = [
  { label:'GST Calculator',      path:'/tools/gst-calculator'     },
  { label:'EMI Calculator',      path:'/tools/emi-calculator'     },
  { label:'Bijli Bill',          path:'/tools/bijli'              },
  { label:'Solar ROI',           path:'/tools/solar-roi'          },
  { label:'Image Resizer',       path:'/tools/image-resizer'      },
  { label:'Password Generator',  path:'/tools/password-generator' },
  { label:'BMI Calculator',      path:'/tools/bmi-calculator'     },
  { label:'Age Calculator',      path:'/tools/age-calculator'     },
  { label:'Electrician Haldwani',path:'/electrician-haldwani'     },
  { label:'Solar Solutions',     path:'/solar-solutions'          },
  { label:'Interior Design',     path:'/interior-design'          },
  { label:'Word Counter',        path:'/tools/word-counter'       },
  { label:'QR Code Generator',   path:'/tools/qr-code-generator'  },
  { label:'Image Compressor',    path:'/tools/image-compressor'   },
  { label:'Currency Converter',  path:'/tools/currency-converter' },
]

export default function TopNav() {
  const nav        = useNavigate()
  const { pathname } = useLocation()
  const { dark, toggle: toggleDark } = useTheme()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch]   = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setShowSearch(false); setSearch('') }, [pathname])

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false); setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const active = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path)

  const filtered = search.length > 0
    ? SEARCH_ITEMS.filter(s => s.label.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : []

  const goTo = (path) => { nav(path); setShowSearch(false); setSearch('') }

  return (
    <header className={`topnav ${scrolled ? 'scrolled' : ''}`}>
      <div className="tn-bar">
        {/* Logo */}
        <button className="tn-logo" onClick={() => nav('/')}>
          <span className="tn-logo-text">Almenso</span>
          <span className="tn-logo-dot">.</span>
        </button>

        {/* Desktop nav links */}
        <nav className="tn-links" aria-label="Main navigation">
          {NAV.map(item => (
            <button key={item.path}
              className={`tn-link ${active(item.path) ? 'active' : ''}`}
              onMouseEnter={() => prefetchRoute(item.path)}
              onFocus={() => prefetchRoute(item.path)}
              onClick={() => nav(item.path)}
              aria-current={active(item.path) ? 'page' : undefined}>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <button
          className="tn-dark-btn"
          onClick={toggleDark}
          aria-label={dark ? 'Light mode' : 'Dark mode'}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Language toggle — Hindi / English */}
        <LanguageToggle />

        {/* Desktop Search */}
        <div ref={searchRef} className="tn-search-wrap">
          {showSearch ? (
            <div className="tn-search-box">
              <span className="tn-search-ico">🔍</span>
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tools, services dhundho..."
                onKeyDown={e => { if (e.key==='Escape') { setShowSearch(false); setSearch('') } if (e.key==='Enter' && filtered.length) goTo(filtered[0].path) }}
                className="tn-search-input"
              />
              <button onClick={() => { setShowSearch(false); setSearch('') }} className="tn-search-close">✕</button>
              {filtered.length > 0 && (
                <div className="tn-search-results">
                  {filtered.map(s => (
                    <button key={s.path} onClick={() => goTo(s.path)} className="tn-search-item">
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button className="tn-search-btn" onClick={() => setShowSearch(true)} aria-label="Search">
              🔍
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button className={`tn-ham ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`tn-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {NAV.map(item => (
          <button key={item.path}
            className={`tn-drawer-link ${active(item.path) ? 'active' : ''}`}
            onMouseEnter={() => prefetchRoute(item.path)}
            onClick={() => nav(item.path)}>
            <span className="tn-drawer-ico">{item.ico}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <div className="tn-drawer-footer">
          {[['Privacy Policy','/privacy-policy'],['Terms','/terms'],['Disclaimer','/disclaimer']].map(([l,h]) => (
            <button key={h} onClick={() => nav(h)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {open && <div className="tn-overlay" onClick={() => setOpen(false)} aria-hidden />}
    </header>
  )
}

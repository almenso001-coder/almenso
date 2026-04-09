import React, { useCallback, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './MobileNav.css'

const ITEMS = [
  { ico:'🏠', label:'Home',        path:'/'                     },
  { ico:'🛠️', label:'Tools',       path:'/tools'                },
  { ico:'📝', label:'Blog',        path:'/blog'                 },
  { ico:'⚡', label:'Electrician', path:'/electrician-haldwani' },
  { ico:'☀️', label:'Solar',       path:'/solar-solutions'      },
]

// memo: only re-renders when pathname changes (not on parent re-renders)
const MobileNav = memo(function MobileNav() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const active = useCallback(
    (p) => p === '/' ? pathname === '/' : pathname.startsWith(p),
    [pathname]
  )

  const goTo = useCallback((path) => () => nav(path), [nav])

  return (
    <nav className="mobnav" aria-label="Mobile navigation">
      {ITEMS.map(item => (
        <button
          key={item.path}
          className={`mn-btn ${active(item.path) ? 'on' : ''}`}
          onClick={goTo(item.path)}
          aria-current={active(item.path) ? 'page' : undefined}
        >
          <span className="mn-ico">{item.ico}</span>
          <span className="mn-lbl">{item.label}</span>
        </button>
      ))}
    </nav>
  )
})

export default MobileNav

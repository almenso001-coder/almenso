/**
 * HOMEPAGE DESIGN CUSTOMIZATION MANAGER
 * Color Theme + Hero Image + Section Visibility + Reordering + Banners
 */

import React, { useState, useEffect } from 'react'

const LS_KEY = 'almenso_homepage_design'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(LS_KEY)
    return saved ? JSON.parse(saved) : null
  } catch { return null }
}

function saveToStorage(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch {}
}

const DEFAULT_DESIGN = {
  colors: {
    primary: '#0a2342',
    secondary: '#1e40af',
    accent: '#dc2626',
    text: '#1f2937',
    background: '#ffffff'
  },
  hero: {
    imageUrl: '',
    gradientColor1: '#0a2342',
    gradientColor2: '#1e40af',
    textAlign: 'center',
    height: '500px',
    showButton: true,
    buttonStyle: 'solid'
  },
  sections: {
    hero: true,
    stats: true,
    services: true,
    topTools: true,
    testimonials: true,
    products: true,
    blog: true,
    faq: true
  },
  sectionOrder: ['hero', 'stats', 'services', 'topTools', 'testimonials', 'products', 'blog', 'faq'],
  banner: {
    enabled: false,
    text: 'Special Offer - 50% Off on Premium Tools!',
    color: '#dc2626',
    position: 'top',
    link: ''
  }
}

export default function HomepageDesignManager() {
  const [design, setDesign] = useState(DEFAULT_DESIGN)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('colors')
  const [toast, setToast] = useState('')

  useEffect(() => {
    loadDesign()
  }, [])

  const loadDesign = async () => {
    try {
      const saved = loadFromStorage()
      if (saved) setDesign({ ...DEFAULT_DESIGN, ...saved })
      setLoading(false)
    } catch (err) {
      console.error('Error loading design:', err)
      setLoading(false)
    }
  }

  const saveDesign = async () => {
    try {
      saveToStorage(design)
      setToast('✅ Design save ho gya! Refresh karo.')
      setTimeout(() => window.location.reload(), 2000)
    } catch (err) {
      setToast('❌ Error: ' + err.message)
    }
  }

  const updateColor = (colorKey, value) => {
    setDesign({
      ...design,
      colors: { ...design.colors, [colorKey]: value }
    })
  }

  const updateHero = (key, value) => {
    setDesign({
      ...design,
      hero: { ...design.hero, [key]: value }
    })
  }

  const toggleSection = (section) => {
    setDesign({
      ...design,
      sections: { ...design.sections, [section]: !design.sections[section] }
    })
  }

  const updateBanner = (key, value) => {
    setDesign({
      ...design,
      banner: { ...design.banner, [key]: value }
    })
  }

  const reorderSections = (fromIndex, toIndex) => {
    const newOrder = [...design.sectionOrder]
    const [movedItem] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, movedItem)
    setDesign({ ...design, sectionOrder: newOrder })
  }

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>

  return (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <div style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '20px' }}>🎨 Homepage Design Customization</div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['colors', 'hero', 'sections', 'banner', 'order'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: activeTab === tab ? '2px solid #0a2342' : '1px solid #e2e8f0',
              background: activeTab === tab ? '#0a2342' : '#f8fafc',
              color: activeTab === tab ? '#fff' : '#334155',
              fontWeight: activeTab === tab ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab === 'colors' && '🎨 Colors'}
            {tab === 'hero' && '🖼️ Hero'}
            {tab === 'sections' && '📑 Sections'}
            {tab === 'banner' && '📢 Banner'}
            {tab === 'order' && '🔄 Order'}
          </button>
        ))}
      </div>

      {/* ========== COLORS TAB ========== */}
      {activeTab === 'colors' && (
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Color Theme Customization</div>

          {Object.entries(design.colors).map(([colorKey, colorValue]) => (
            <div key={colorKey} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label style={{ fontWeight: 600, minWidth: '120px', textTransform: 'capitalize' }}>{colorKey}:</label>
              <input
                type="color"
                value={colorValue}
                onChange={(e) => updateColor(colorKey, e.target.value)}
                style={{ width: '60px', height: '50px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={colorValue}
                onChange={(e) => updateColor(colorKey, e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontFamily: 'monospace', flex: 1 }}
              />
            </div>
          ))}

          <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
            <strong>Live Preview:</strong>
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px',
              flexWrap: 'wrap'
            }}>
              {Object.entries(design.colors).map(([key, color]) => (
                <div key={key} style={{
                  width: '60px',
                  height: '60px',
                  background: color,
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  textAlign: 'center',
                  padding: '5px'
                }}>
                  {key}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== HERO TAB ========== */}
      {activeTab === 'hero' && (
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Hero Section Customization</div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Hero Image URL:</label>
            <input
              type="text"
              value={design.hero.imageUrl}
              onChange={(e) => updateHero('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Gradient Color 1:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="color"
                  value={design.hero.gradientColor1}
                  onChange={(e) => updateHero('gradientColor1', e.target.value)}
                  style={{ width: '60px', height: '50px', borderRadius: '6px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={design.hero.gradientColor1}
                  onChange={(e) => updateHero('gradientColor1', e.target.value)}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Gradient Color 2:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="color"
                  value={design.hero.gradientColor2}
                  onChange={(e) => updateHero('gradientColor2', e.target.value)}
                  style={{ width: '60px', height: '50px', borderRadius: '6px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={design.hero.gradientColor2}
                  onChange={(e) => updateHero('gradientColor2', e.target.value)}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Text Alignment:</label>
              <select
                value={design.hero.textAlign}
                onChange={(e) => updateHero('textAlign', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Hero Height:</label>
              <input
                type="text"
                value={design.hero.height}
                onChange={(e) => updateHero('height', e.target.value)}
                placeholder="500px"
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Button Style:</label>
              <select
                value={design.hero.buttonStyle}
                onChange={(e) => updateHero('buttonStyle', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
              >
                <option value="solid">Solid</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={design.hero.showButton}
                  onChange={(e) => updateHero('showButton', e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                Show CTA Button
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ========== SECTIONS TAB ========== */}
      {activeTab === 'sections' && (
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Section Visibility</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {Object.entries(design.sections).map(([section, isVisible]) => (
              <label
                key={section}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => toggleSection(section)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                  {section === 'topTools' ? 'Top Tools' : section}
                </span>
              </label>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <strong>ℹ️ Info:</strong> Uncheck to hide any section from your homepage. Changes go live instantly!
          </div>
        </div>
      )}

      {/* ========== BANNER TAB ========== */}
      {activeTab === 'banner' && (
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Custom Banner/Announcement</div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '20px' }}>
            <input
              type="checkbox"
              checked={design.banner.enabled}
              onChange={(e) => updateBanner('enabled', e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 600 }}>Enable Banner</span>
          </label>

          {design.banner.enabled && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Banner Text:</label>
                <input
                  type="text"
                  value={design.banner.text}
                  onChange={(e) => updateBanner('text', e.target.value)}
                  placeholder="Special Offer - 50% Off!"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Banner Color:</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="color"
                      value={design.banner.color}
                      onChange={(e) => updateBanner('color', e.target.value)}
                      style={{ width: '60px', height: '50px', borderRadius: '6px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={design.banner.color}
                      onChange={(e) => updateBanner('color', e.target.value)}
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Position:</label>
                  <select
                    value={design.banner.position}
                    onChange={(e) => updateBanner('position', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Banner Link (Optional):</label>
                <input
                  type="text"
                  value={design.banner.link}
                  onChange={(e) => updateBanner('link', e.target.value)}
                  placeholder="https://example.com"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{
                padding: '15px',
                background: design.banner.color,
                borderRadius: '8px',
                color: '#fff',
                textAlign: 'center',
                fontWeight: 700
              }}>
                {design.banner.text}
              </div>
            </>
          )}
        </div>
      )}

      {/* ========== ORDER TAB ========== */}
      {activeTab === 'order' && (
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Section Order</div>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
            Click on a section and use the arrow buttons to reorder
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {design.sectionOrder.map((section, index) => (
              <div
                key={section}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <span style={{ fontWeight: 600, minWidth: '30px' }}>{index + 1}.</span>
                <span style={{ flex: 1, textTransform: 'capitalize', fontWeight: 600 }}>
                  {section === 'topTools' ? 'Top Tools' : section}
                </span>

                <button
                  onClick={() => index > 0 && reorderSections(index, index - 1)}
                  disabled={index === 0}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    background: index === 0 ? '#f1f5f9' : '#fff',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    opacity: index === 0 ? 0.5 : 1
                  }}
                >
                  ⬆️
                </button>

                <button
                  onClick={() => index < design.sectionOrder.length - 1 && reorderSections(index, index + 1)}
                  disabled={index === design.sectionOrder.length - 1}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    background: index === design.sectionOrder.length - 1 ? '#f1f5f9' : '#fff',
                    cursor: index === design.sectionOrder.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: index === design.sectionOrder.length - 1 ? 0.5 : 1
                  }}
                >
                  ⬇️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SAVE BUTTON */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button
          onClick={saveDesign}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: '#0a2342',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ✅ Save Design
        </button>

        <button
          onClick={loadDesign}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            background: '#fff',
            color: '#334155',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🔄 Reload
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#0a2342',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '8px',
          fontWeight: 700,
          zIndex: 9999
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}

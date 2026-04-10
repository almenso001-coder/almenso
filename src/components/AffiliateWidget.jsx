/**
 * AFFILIATE WIDGET — Context-aware product recommendations
 * Products ab Admin Panel se manage hote hain (SettingsContext ke through)
 */
import React, { memo } from 'react'
import { useSettings, DEFAULT_AFFILIATE_PRODUCTS } from '../context/SettingsContext'
import './AffiliateWidget.css'

// Map tool paths to product categories
export const TOOL_PRODUCT_MAP = {
  '/tools/bijli':                         'electrical',
  '/tools/bijli-bill-calculator':         'electrical',
  '/tools/electricity-bill-analyzer':     'electrical',
  '/tools/electricity-cost-calculator':   'electrical',
  '/tools/power-consumption-calculator':  'electrical',
  '/tools/power-consumption-planner':     'electrical',
  '/tools/appliance-power-calculator':    'electrical',
  '/tools/inverter-load-planner':         'electrical',
  '/tools/battery-backup-calculator':     'electrical',
  '/tools/wire-size-calculator':          'electrical',
  '/tools/voltage-drop-calculator':       'electrical',
  '/tools/solar-roi':                     'solar',
  '/tools/solar-panel-calculator':        'solar',
  '/tools/gst-calculator':               'finance',
  '/tools/emi-calculator':               'finance',
  '/tools/loan-calculator':              'finance',
  '/tools/profit-margin-calculator':     'finance',
  '/tools/salary-calculator':            'finance',
  '/tools/discount-calculator':          'finance',
  '/tools/image-compressor':             'design',
  '/tools/image-resizer':                'design',
  '/tools/image-format-converter':       'design',
  '/tools/background-remover':           'design',
  '/tools/image-cropper':                'design',
  '/tools/bmi-calculator':              'health',
  '/tools/bmr-calculator':              'health',
  '/tools/ideal-weight-calculator':      'health',
  '/tools/age-calculator':              'health',
  '/tools/password-generator':          'tech',
  '/tools/qr-code-generator':           'tech',
  '/tools/ai-prompt-generator':         'tech',
  '/tools/word-counter':                'writing',
  '/tools/text-case-converter':         'writing',
  '/tools/concrete-calculator':         'construction',
  '/tools/paint-calculator':            'construction',
  '/tools/tile-calculator':             'construction',
  '/tools/flooring-calculator':         'construction',
}

// Helper: get affiliate products from settings (with fallback to defaults)
export function useAffiliateProducts() {
  const { settings } = useSettings()
  try {
    if (settings.affiliateProducts) {
      const parsed = JSON.parse(settings.affiliateProducts)
      // Merge: default categories + admin overrides
      return { ...DEFAULT_AFFILIATE_PRODUCTS, ...parsed }
    }
  } catch {}
  return DEFAULT_AFFILIATE_PRODUCTS
}

// ── Main Component ────────────────────────────────────────────
const AffiliateWidget = memo(function AffiliateWidget({
  category = 'electrical',
  limit    = 3,
  title    = '🛒 Recommended Products',
  layout   = 'horizontal', // 'horizontal' | 'grid' | 'compact'
  toolPath = null,
}) {
  const allProducts = useAffiliateProducts()

  // Auto-detect category from tool path
  const cat = toolPath ? (TOOL_PRODUCT_MAP[toolPath] || category) : category
  const products = (allProducts[cat] || allProducts.electrical || [])
    .filter(p => p.visible !== false)
    .slice(0, limit)

  if (!products.length) return null

  const trackClick = (product) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        product_name:     product.name,
        product_category: cat,
        product_id:       product.id,
      })
    }
  }

  return (
    <div className={`afw-wrap afw-${layout}`}>
      <div className="afw-head">
        <div className="afw-title">{title}</div>
        <div className="afw-sub">Expert picks · Trusted brands · Amazon pe best price</div>
      </div>

      <div className="afw-products">
        {products.map(p => (
          <a key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="afw-card"
            onClick={() => trackClick(p)}
            aria-label={`Buy ${p.name} on Amazon`}>

            {p.badge && <span className="afw-badge">{p.badge}</span>}

            <div className="afw-img">{p.img}</div>

            <div className="afw-info">
              <div className="afw-name">{p.name}</div>
              <div className="afw-tag">{p.tag}</div>
              <div className="afw-rating">{p.rating} <span>({p.reviews} reviews)</span></div>
              <div className="afw-price-row">
                <span className="afw-price">{p.price}</span>
                {p.was && <span className="afw-was">{p.was}</span>}
                {p.was && (
                  <span className="afw-save">
                    Save {Math.round((1 - parseInt(p.price.replace(/[^0-9]/g,'')) / parseInt(p.was.replace(/[^0-9]/g,''))) * 100)}%
                  </span>
                )}
              </div>
            </div>

            <div className="afw-cta">
              <span className="afw-btn">
                🛒 {p.cta || 'Buy on Amazon'}
              </span>
              <span className="afw-prime">✓ Amazon Prime</span>
            </div>
          </a>
        ))}
      </div>

      <div className="afw-disclaimer">
        Disclosure: Some links are affiliate links. Aapko koi extra cost nahi hota.
      </div>
    </div>
  )
})

export default AffiliateWidget

// Also export AFFILIATE_PRODUCTS for backward compatibility
export { DEFAULT_AFFILIATE_PRODUCTS as AFFILIATE_PRODUCTS }

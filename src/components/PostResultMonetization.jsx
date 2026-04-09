/**
 * POST-RESULT MONETIZATION
 * Complete 3-step earning flow shown after tool result:
 *   Step 1 → AdSense ad
 *   Step 2 → Affiliate products (image · title · price · Buy Now)
 *   Step 3 → Service CTA ("Get this done for you" + WhatsApp)
 */
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AdSlot from './AdSlot'
import { AFFILIATE_PRODUCTS } from './AffiliateWidget'
import './PostResultMonetization.css'

const WA = '919258133689'

/* ─────────────────────────────────────────────────────────────
   SERVICE CONFIG PRESETS  (used by ToolWrapper)
───────────────────────────────────────────────────────────── */
export const SERVICE_CONFIGS = {
  electrician: {
    icon:  '⚡',
    color: '#1d4ed8',
    label: 'Same Day Service Available',
    title: 'Bijli Ka Kaam Expert Se Karwao',
    sub:   'Ghar baithe electrician bulao — wiring, inverter, fan, AC — sab ek call pe',
    price: '₹150 se shuru',
    path:  '/electrician-haldwani',
    waMsg: 'Namaste! Ghar mein electrician chahiye Haldwani mein.',
    badges: ['✅ Same Day', '💯 Free Estimate', '🔒 Guaranteed Work'],
  },
  solar: {
    icon:  '☀️',
    color: '#d97706',
    label: 'Free Site Visit Available',
    title: 'Solar Expert Se Free Quote Lo',
    sub:   'Calculator ne result diya — ab real system ka free estimate lo, PM subsidy help bhi',
    price: '₹35,000 se shuru · 40% subsidy',
    path:  '/solar-solutions',
    waMsg: 'Namaste! Solar panel install karna hai — free site visit chahiye.',
    badges: ['🆓 Free Site Visit', '40% Govt Subsidy', '25yr Warranty'],
  },
  interior: {
    icon:  '🏠',
    color: '#7c3aed',
    label: 'Free Home Visit Available',
    title: 'Interior Expert Se Banwao',
    sub:   'Budget mein sapno ka ghar — free home visit, 3D design preview, fixed price guarantee',
    price: '₹15,000 se shuru',
    path:  '/interior-design',
    waMsg: 'Namaste! Interior design ke liye free home visit chahiye.',
    badges: ['🆓 Free Home Visit', '3yr Warranty', 'Fixed Quote'],
  },
  inverter: {
    icon:  '🔋',
    color: '#0f766e',
    label: 'Expert Installation',
    title: 'Inverter Sahi Size Ka Install Karwao',
    sub:   'Load calculate ho gaya — ab certified electrician se inverter aur battery install karwao',
    price: '₹300 se shuru',
    path:  '/electrician-haldwani',
    waMsg: 'Namaste! Inverter/battery install karna hai — expert electrician chahiye.',
    badges: ['⚡ Same Day', '💯 Certified', '🔒 Warranty'],
  },
}

/* ─────────────────────────────────────────────────────────────
   AFFILIATE PRODUCT CARD
   image · title · price · Buy Now button
───────────────────────────────────────────────────────────── */
const AffCard = memo(function AffCard({ p }) {
  const track = useCallback(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        product_name:     p.name,
        product_id:       p.id,
        product_category: p.category || 'general',
        source:           'post_result',
      })
    }
  }, [p])

  const savings = p.was
    ? Math.round((1 - parseInt(p.price.replace(/[^0-9]/g,'')) / parseInt(p.was.replace(/[^0-9]/g,''))) * 100)
    : null

  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="prm-card"
      onClick={track}
      aria-label={`Buy ${p.name} on Amazon — ${p.price}`}
    >
      {/* Badge */}
      {p.badge && <span className="prm-card-badge">{p.badge}</span>}

      {/* ── Product Image ── */}
      <div className="prm-card-img">
        {p.img?.startsWith('http')
          ? <img src={p.img} alt={p.name} loading="lazy" width="64" height="64" />
          : <span className="prm-card-emoji">{p.img || '🛒'}</span>
        }
      </div>

      {/* ── Title ── */}
      <div className="prm-card-title">{p.name}</div>

      {/* Tag line */}
      <div className="prm-card-tag">{p.tag}</div>

      {/* Rating */}
      <div className="prm-card-rating">
        <span className="prm-stars">{'★'.repeat(Math.round(parseFloat(p.rating)))}</span>
        <span className="prm-rating-val">{p.rating}</span>
        <span className="prm-rating-count">({p.reviews})</span>
      </div>

      {/* ── Price ── */}
      <div className="prm-card-price-row">
        <span className="prm-price">{p.price}</span>
        {p.was && <span className="prm-was">{p.was}</span>}
        {savings && <span className="prm-save">{savings}% off</span>}
      </div>

      {/* ── Buy Now button ── */}
      <div className="prm-buy-btn">
        🛒 Buy Now
      </div>
    </a>
  )
})

/* ─────────────────────────────────────────────────────────────
   SERVICE CTA — "Get this done for you"
───────────────────────────────────────────────────────────── */
const ServiceCTA = memo(function ServiceCTA({ config }) {
  const nav = useNavigate()

  const handleWA = useCallback(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'service_cta_click', { service: config.title, source: 'post_result' })
    }
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(config.waMsg)}`, '_blank', 'noopener')
  }, [config])

  return (
    <div className="prm-svc" style={{ '--c': config.color }}>
      {/* Glow blob */}
      <div className="prm-svc-blob" aria-hidden />

      <div className="prm-svc-inner">
        {/* Left */}
        <div className="prm-svc-left">
          <div className="prm-svc-icon">{config.icon}</div>
          <div className="prm-svc-copy">
            <div className="prm-svc-label">{config.label}</div>
            <div className="prm-svc-title">
              Khud Nahi Karna — <em>Expert Se Karwao!</em>
            </div>
            <div className="prm-svc-desc">{config.sub}</div>
            <div className="prm-svc-price">{config.price}</div>
            <div className="prm-svc-chips">
              {config.badges.map(b => <span key={b}>{b}</span>)}
            </div>
          </div>
        </div>

        {/* Right — CTAs */}
        <div className="prm-svc-actions">
          <button className="prm-svc-wa-btn" onClick={handleWA}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Pe Book Karo
          </button>
          {config.path && (
            <button className="prm-svc-detail-btn" onClick={() => nav(config.path)}>
              Service Details →
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────────────────────────
   DIVIDER with label
───────────────────────────────────────────────────────────── */
const StepDivider = ({ step, label }) => (
  <div className="prm-divider">
    <span className="prm-divider-step">{step}</span>
    <span className="prm-divider-label">{label}</span>
    <div className="prm-divider-line" />
  </div>
)

/* ─────────────────────────────────────────────────────────────
   MAIN — PostResultMonetization
───────────────────────────────────────────────────────────── */
const PostResultMonetization = memo(function PostResultMonetization({
  show          = false,
  affCategory   = null,
  affLimit      = 3,
  serviceConfig = null,
  adSlotId      = 'mid',
}) {
  if (!show) return null

  const products = affCategory
    ? (AFFILIATE_PRODUCTS[affCategory] || AFFILIATE_PRODUCTS.electrical).slice(0, affLimit)
    : []

  const hasProducts = products.length > 0
  const hasService  = !!serviceConfig

  if (!hasProducts && !hasService) return (
    <div className="prm-ad-only"><AdSlot slot={adSlotId} /></div>
  )

  return (
    <div className="prm-root" role="complementary" aria-label="Recommended products and services">

      {/* ══ STEP 1 — AdSense ══════════════════════════════ */}
      <StepDivider step="Ad" label="Advertisement" />
      <div className="prm-ad-wrap">
        <AdSlot slot={adSlotId} />
      </div>

      {/* ══ STEP 2 — Affiliate Products ══════════════════ */}
      {hasProducts && <>
        <StepDivider step="2" label="Is Tool Se Related Products" />
        <div className="prm-products-section">
          <div className="prm-products-header">
            <div className="prm-ph-left">
              <div className="prm-ph-title">🛒 Recommended Products</div>
              <div className="prm-ph-sub">Expert picks · Amazon pe best price · Fast delivery</div>
            </div>
            <div className="prm-ph-right">
              <span className="prm-amazon-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff9900" aria-hidden>
                  <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.5.13.107.175.013.337-.283.48-.29.14-.64.28-1.066.44-1.745.647-3.75 1.044-5.96 1.185-6.44.41-12.098-1.22-16.44-4.57a.42.42 0 01-.024-.573zM4.7 14.84c.13-.39.42-.65.84-.78l.76-.24c.39-.1.78.02 1.07.34.07.08.33.52.34.52l.73-.04c.24-.01.43.01.62.07.2.06.35.19.44.37.18.38.05.88-.36 1.23l-.29.24c-.37.3-.83.47-1.29.47h-.27c-.5 0-.93-.21-1.17-.56-.24-.35-.28-.79-.12-1.16l-.03-.47zm.73-.39c-.19.06-.33.19-.39.36-.05.19.01.4.17.54l.11.09c.15.12.34.19.54.19h.25c.29 0 .56-.1.77-.28l.18-.15c.13-.11.14-.22.07-.35-.04-.07-.11-.12-.2-.14a.8.8 0 00-.29-.03h-.49l-.12-.13c-.07-.09-.09-.14-.07-.21.01-.04.02-.06.02-.06l-.55.17zM23.6 9.56c.24.32.29.74.13 1.12-.78 1.87-2.56 2.8-5.4 2.78-1.5-.01-2.82-.4-3.97-1.16-.27-.17-.43-.47-.43-.78V9.64c0-.46.44-.74.82-.52.86.5 1.82.75 2.8.75 1.85 0 2.77-.65 2.77-1.94V7.9c0-.82-.54-1.34-1.59-1.54-1.08-.21-2.23-.22-3.32-.04-1.07.18-1.87.65-2.33 1.35-.46.71-.69 1.75-.69 3.1v4.18c0 .46-.37.84-.83.84h-.31c-.46 0-.83-.38-.83-.84V6.96c0-.45.36-.82.82-.82h.2c.31 0 .59.17.73.44l.32.58c.69-.75 1.62-1.24 2.76-1.45 1.3-.24 2.65-.22 3.97.04 2.21.45 3.36 1.66 3.36 3.63v.14c0 .22-.04.44-.11.65l-.13.39zm-6.8 7.04c1.37-.62 2.83-1.34 4.47-1.94.35-.12.72-.14 1.05 0 .5.22.83.72.83 1.28v.15c0 .55-.34 1.04-.84 1.25l-4.47 1.92c-.34.14-.71.15-1.06 0-.5-.2-.84-.69-.84-1.24v-.16c0-.56.34-1.05.86-1.26z"/>
                </svg>
                via Amazon
              </span>
            </div>
          </div>

          <div className="prm-products-grid">
            {products.map(p => <AffCard key={p.id} p={p} />)}
          </div>

          <p className="prm-disclaimer">
            Disclosure: Some links are affiliate links. Aapko koi extra cost nahi hota.
          </p>
        </div>
      </>}

      {/* ══ STEP 3 — Service CTA ══════════════════════════ */}
      {hasService && <>
        <StepDivider step="3" label="Expert Service" />
        <ServiceCTA config={serviceConfig} />
      </>}

    </div>
  )
})

export default PostResultMonetization
export { ServiceCTA }

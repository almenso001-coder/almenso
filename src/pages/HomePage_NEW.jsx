/**
 * ALMENSO HOMEPAGE — RESTRUCTURED UI
 * Clean sections: Hero → TopTools → Services → Affiliate → MoreTools
 * NO logic changes, only UI structure improved
 * All existing functionality preserved
 */
import React, { useState, useEffect, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import ToolCard from '../components/ToolCard'
import { fetchAffiliateProducts } from '../utils/db'
import { useSettings } from '../context/SettingsContext'
import './HomePage.css'

// ════════════════════════════════════════════════════════════
// HERO SECTION COMPONENT
// ════════════════════════════════════════════════════════════
const HeroSection = memo(function HeroSection({ onToolsClick, onElectricianClick }) {
  return (
    <section className="hp-hero">
      <div className="hp-hero-content">
        <h1 className="hp-hero-title">
          Free Online Tools + Electrician Service
        </h1>
        <p className="hp-hero-subtitle">
          Use smart tools or book a trusted electrician near you
        </p>
        
        <div className="hp-hero-buttons">
          <button className="hp-hero-btn hp-hero-btn-primary" onClick={onToolsClick}>
            ⚙️ Use Free Tools
          </button>
          <button className="hp-hero-btn hp-hero-btn-secondary" onClick={onElectricianClick}>
            ⚡ Book Electrician
          </button>
        </div>

        {/* Trust indicators */}
        <div className="hp-hero-trust">
          <span>✅ 1000+ Users</span>
          <span>⭐ 4.8/5 Rating</span>
          <span>🚀 Free Estimates</span>
        </div>
      </div>

      <div className="hp-hero-visual">
        <div className="hp-hero-graphic">
          ⚡ 🔧 ☀️
        </div>
      </div>
    </section>
  )
})

// ════════════════════════════════════════════════════════════
// TOP TOOLS SECTION COMPONENT
// ════════════════════════════════════════════════════════════
const TopToolsSection = memo(function TopToolsSection({ tools, onViewMore }) {
  // Get first 5 tools (or less if not available)
  const topTools = tools.slice(0, 5)

  return (
    <section className="hp-top-tools">
      <div className="hp-section-header">
        <h2>🛠️ Popular Free Tools</h2>
        <p>Use our smart tools instantly - no signup required</p>
      </div>

      <div className="hp-tools-grid">
        {topTools.map(tool => (
          <div key={tool.id} className="hp-tool-wrapper">
            <ToolCard tool={tool} featured={false} />
          </div>
        ))}
      </div>

      {tools.length > 5 && (
        <div className="hp-explore-more">
          <button className="hp-explore-btn" onClick={onViewMore}>
            Explore {tools.length - 5}+ More Tools →
          </button>
        </div>
      )}
    </section>
  )
})

// ════════════════════════════════════════════════════════════
// ELECTRICIAN SERVICE SECTION COMPONENT
// ════════════════════════════════════════════════════════════
const ElectricianServiceSection = memo(function ElectricianServiceSection({ phone, whatsapp }) {
  return (
    <section className="hp-service-section hp-service-electrician">
      <div className="hp-service-container">
        <div className="hp-service-left">
          <div className="hp-service-icon">⚡</div>
          <h2>Need Electrician Service?</h2>
          <p>Book trusted electrician for home & commercial needs</p>

          <div className="hp-service-list">
            <div className="hp-service-item">
              <span className="hp-service-check">✓</span>
              <span>Home Wiring & Rewiring</span>
            </div>
            <div className="hp-service-item">
              <span className="hp-service-check">✓</span>
              <span>Inverter & Battery Installation</span>
            </div>
            <div className="hp-service-item">
              <span className="hp-service-check">✓</span>
              <span>AC & Electrical Repair</span>
            </div>
            <div className="hp-service-item">
              <span className="hp-service-check">✓</span>
              <span>Fan, Light & Switch Fitting</span>
            </div>
            <div className="hp-service-item">
              <span className="hp-service-check">✓</span>
              <span>MCB/DB Box Installation</span>
            </div>
          </div>

          <div className="hp-service-buttons">
            <a href={`tel:${phone}`} className="hp-service-btn hp-service-btn-call">
              📞 Call Now
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hp-service-btn hp-service-btn-whatsapp">
              💬 WhatsApp
            </a>
          </div>

          <p className="hp-service-badge">✨ Free Estimate • Same Day Service</p>
        </div>

        <div className="hp-service-right">
          <div className="hp-service-highlight">
            <div className="hp-highlight-text">
              Trusted by 1000+ Customers in Haldwani
            </div>
            <div className="hp-highlight-rating">⭐⭐⭐⭐⭐ 4.8/5</div>
          </div>
        </div>
      </div>
    </section>
  )
})

// ════════════════════════════════════════════════════════════
// AFFILIATE/RECOMMENDED PRODUCTS SECTION
// ════════════════════════════════════════════════════════════
const AffiliateSection = memo(function AffiliateSection({ products }) {
  return (
    <section className="hp-affiliate">
      <div className="hp-section-header">
        <h2>🛒 Recommended Products</h2>
        <p>Curated products for electrician & home needs</p>
      </div>

      <div className="hp-affiliate-grid">
        {products.slice(0, 3).map(product => (
          <a
            key={product.id}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hp-affiliate-card"
          >
            <div className="hp-affiliate-image">
              {product.image?.startsWith('http') ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span>{product.image || '🛒'}</span>
              )}
            </div>

            <div className="hp-affiliate-info">
              {product.badge && (
                <span className="hp-affiliate-badge">{product.badge}</span>
              )}
              <h3 className="hp-affiliate-name">{product.name}</h3>
              <p className="hp-affiliate-price">{product.price}</p>
            </div>

            <div className="hp-affiliate-arrow">→</div>
          </a>
        ))}
      </div>

      <div className="hp-affiliate-disclaimer">
        * Affiliate links. We earn commission when you buy through these links.
      </div>
    </section>
  )
})

// ════════════════════════════════════════════════════════════
// MORE TOOLS SECTION
// ════════════════════════════════════════════════════════════
const MoreToolsSection = memo(function MoreToolsSection({ toolCount, onViewAllTools }) {
  return (
    <section className="hp-more-tools">
      <div className="hp-more-tools-content">
        <h2>📚 Explore More Tools</h2>
        <p>Access {toolCount}+ free online tools for calculations, conversions, generators, and more</p>
        <button className="hp-more-tools-btn" onClick={onViewAllTools}>
          View All {toolCount} Tools →
        </button>
      </div>
    </section>
  )
})

// ════════════════════════════════════════════════════════════
// MAIN HOMEPAGE COMPONENT
// ════════════════════════════════════════════════════════════
export default function HomePage() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const [products, setProducts] = useState([])
  const [tools, setTools] = useState([])

  const WA = settings.whatsapp || '919258133689'
  const PHONE = settings.phone || '+919258133689'

  // Load affiliate products
  useEffect(() => {
    fetchAffiliateProducts()
      .then(p => setProducts(p.slice(0, 3)))
      .catch(() => {})
  }, [])

  // Load tools from TOOLS_DATABASE (from App.jsx)
  useEffect(() => {
    const allTools = window.__ALMENSO_TOOLS || []
    setTools(allTools)
  }, [])

  // Scroll to tools section
  const scrollToTools = useCallback(() => {
    const elem = document.getElementById('hp-top-tools-section')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Navigate to electrician page
  const goToElectrician = useCallback(() => {
    navigate('/electrician-haldwani')
  }, [navigate])

  // Navigate to all tools
  const goToAllTools = useCallback(() => {
    navigate('/tools')
  }, [navigate])

  return (
    <>
      <SEOHead
        title="Free Online Tools + Electrician Service | Almenso"
        description="Use 174+ free online tools for calculations, conversions, and generators. Or book a trusted electrician for home repairs in Haldwani."
        keywords="free online tools, calculator, converter, electrician service haldwani"
        canonical="/"
      />

      <div className="hp-container">
        {/* HERO SECTION */}
        <HeroSection
          onToolsClick={scrollToTools}
          onElectricianClick={goToElectrician}
        />

        <AdSlot slot="top" />

        {/* TOP TOOLS SECTION */}
        <div id="hp-top-tools-section">
          <TopToolsSection
            tools={tools}
            onViewMore={goToAllTools}
          />
        </div>

        <AdSlot slot="mid" />

        {/* ELECTRICIAN SERVICE SECTION */}
        <ElectricianServiceSection
          phone={PHONE}
          whatsapp={WA}
        />

        {/* AFFILIATE PRODUCTS SECTION */}
        {products.length > 0 && (
          <AffiliateSection products={products} />
        )}

        <AdSlot slot="mid" />

        {/* MORE TOOLS SECTION */}
        <MoreToolsSection
          toolCount={tools.length}
          onViewAllTools={goToAllTools}
        />

        <AdSlot slot="bottom" />
      </div>
    </>
  )
}

/**
 * INDIVIDUAL TOOL PAGE WRAPPER
 * Dynamic page for each tool with SEO, ads, and article interlinking
 */

import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import FAQ from '../components/FAQ'
import { RelatedTools } from '../components/ToolCard'
import { TOOLS_DATABASE } from '../data/toolsDatabase'
import { generateArticle } from '../utils/articleGenerator'
import { generateWebAppSchema, generateBreadcrumbSchema } from '../utils/seoHelpers'
import './ToolPage.css'

export default function ToolPage({ children }) {
  const { toolId } = useParams()
  const navigate = useNavigate()
  
  // Find tool by ID
  const tool = TOOLS_DATABASE.find(t => t.id === toolId)
  
  // If tool not found, redirect to tools directory
  if (!tool) {
    navigate('/tools')
    return null
  }
  
  // Generate article for this tool
  const article = generateArticle(tool)
  
  // Generate schemas
  const webAppSchema = generateWebAppSchema({
    name: tool.name,
    description: tool.description,
    url: `https://almenso.com/tools/${tool.id}`,
    category: tool.category
  })
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: tool.name, url: `/tools/${tool.id}` }
  ])
  
  // Combine schemas
  const schemas = [webAppSchema, breadcrumbSchema]
  
  return (
    <div className="tool-page">
      {/* SEO Head */}
      <SEOHead
        title={tool.seoTitle}
        description={tool.metaDescription}
        keywords={tool.keywords}
        canonical={`/tools/${tool.id}`}
        image={`https://almenso.com/og-images/${tool.id}.jpg`}
        type="WebApplication"
        schema={schemas}
      />
      
      {/* Breadcrumb Navigation */}
      <nav className="tp-breadcrumb">
        <Link to="/" className="tpb-link">Home</Link>
        <span className="tpb-sep">›</span>
        <Link to="/tools" className="tpb-link">Tools</Link>
        <span className="tpb-sep">›</span>
        <span className="tpb-current">{tool.name}</span>
      </nav>
      
      {/* Tool Header */}
      <header className="tp-header">
        <div className="tp-header-content">
          <div className="tph-icon" style={{ background: tool.color }}>
            {tool.icon}
          </div>
          <div className="tph-info">
            <h1 className="tph-title">{tool.name}</h1>
            <p className="tph-description">{tool.description}</p>
            <div className="tph-meta">
              <span className="tph-badge">{formatCategory(tool.category)}</span>
              <span className="tph-badge">Free Forever</span>
              <span className="tph-badge">No Registration</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* AdSense - Top */}
      <AdSlot slot="top" />
      
      {/* Tool Interface */}
      <section className="tp-tool-section">
        <div className="tp-tool-container">
          {children}
        </div>
      </section>
      
      {/* Link to Article */}
      <section className="tp-article-link">
        <div className="tal-card">
          <div className="tal-icon">📖</div>
          <div className="tal-content">
            <h3 className="tal-title">Learn More About {tool.name}</h3>
            <p className="tal-text">
              Read our comprehensive guide with tips, tricks, and best practices
            </p>
            <Link to={`/blog/${article.slug}`} className="tal-button">
              Read Complete Guide →
            </Link>
          </div>
        </div>
      </section>
      
      {/* AdSense - Mid */}
      <AdSlot slot="mid" />
      
      {/* How to Use Section */}
      <section className="tp-how-to">
        <h2 className="tph-title">How to Use {tool.name}</h2>
        <div className="tph-content">
          <ol className="tph-steps">
            {article.howToUseSection.steps.map((step, index) => (
              <li key={index} className="tph-step">
                <span className="tph-step-number">{index + 1}</span>
                <span className="tph-step-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="tp-benefits">
        <h2 className="tpb-title">Benefits of Using {tool.name}</h2>
        <div className="tpb-grid">
          {article.benefitsSection.benefits.slice(0, 6).map((benefit, index) => (
            <div key={index} className="tpb-card">
              <div className="tpb-card-icon">✓</div>
              <h3 className="tpb-card-title">{benefit.title}</h3>
              <p className="tpb-card-text">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQ 
        faqs={article.faqSection.faqs} 
        title={`Frequently Asked Questions - ${tool.name}`}
      />
      
      {/* AdSense - Article */}
      <AdSlot slot="article" />
      
      {/* Related Tools */}
      <RelatedTools 
        toolIds={tool.relatedTools} 
        allTools={TOOLS_DATABASE}
      />
      
      {/* CTA to Full Article */}
      <section className="tp-cta">
        <div className="tpc-content">
          <h2 className="tpc-title">Want to Learn More?</h2>
          <p className="tpc-text">
            Read our detailed {article.wordCount}-word guide with expert tips, common mistakes to avoid, and advanced techniques
          </p>
          <Link to={`/blog/${article.slug}`} className="tpc-button">
            Read Full Article →
          </Link>
        </div>
      </section>
      
      {/* AdSense - Bottom */}
      <AdSlot slot="bottom" />
    </div>
  )
}

/**
 * Format category name
 */
function formatCategory(category) {
  const names = {
    calculator: 'Calculator',
    image: 'Image Tool',
    pdf: 'PDF Tool',
    text: 'Text Tool',
    seo: 'SEO Tool',
    developer: 'Developer Tool',
    'social-media': 'Social Media',
    finance: 'Finance',
    health: 'Health',
    converter: 'Converter',
    utility: 'Utility',
    design: 'Design Tool'
  }
  return names[category] || category
}

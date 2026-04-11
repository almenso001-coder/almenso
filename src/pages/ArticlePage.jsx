/**
 * ARTICLE/BLOG PAGE
 * Auto-generated SEO articles with tool interlinking
 */

import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import Breadcrumb from '../components/Breadcrumb'
import AdSlot, { InArticleAd } from '../components/AdSlot'
import FAQ from '../components/FAQ'
import { RelatedTools, ToolLink } from '../components/ToolCard'
import { TOOLS_DATABASE } from '../data/toolsDatabase'
import { getArticleBySlug } from '../utils/articleGenerator'
import { generateArticleSchema, generateBreadcrumbSchema, calculateReadingTime } from '../utils/seoHelpers'
import ShareButton from '../components/ShareButton'
import { trackCTA, trackPageView } from '../utils/analytics'
import './ArticlePage.css'

// Simple HTML sanitizer (basic version)
const sanitizeHtml = (html) => {
  if (!html) return ''
  const allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img']
  const temp = document.createElement('div')
  temp.innerHTML = html
  
  // Remove script tags and event handlers
  const scripts = temp.querySelectorAll('script')
  scripts.forEach(script => script.remove())
  
  // Remove event handlers
  const allElements = temp.querySelectorAll('*')
  allElements.forEach(el => {
    for (let attr of el.attributes) {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name)
      }
    }
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      el.replaceWith(...el.childNodes)
    }
  })
  
  return temp.innerHTML
}

export default function ArticlePage() {
  const { articleSlug } = useParams()
  const navigate = useNavigate()
  
  // Get article by slug
  const article = getArticleBySlug(articleSlug)
  
  // If article not found, redirect to blog
  if (!article) {
    navigate('/blog')
    return null
  }
  
  // Get the tool this article is about
  const tool = TOOLS_DATABASE.find(t => t.id === article.toolId)
  
  if (!tool) {
    navigate('/blog')
    return null
  }
  
  // Generate schemas
  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.lastUpdated,
    url: `https://almenso.com/blog/${article.slug}`
  })
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: article.title, url: `/blog/${article.slug}` }
  ])
  
  const schemas = [articleSchema, breadcrumbSchema, article.schema]

  // Track article page view
  useEffect(() => {
    trackPageView(`/blog/${article.slug}`)
  }, [article.slug])
  
  return (
    <div className="article-page">
      {/* SEO Head */}
      <SEOHead
        title={article.seoTitle || `${article.title} | Almenso`}
        description={article.metaDescription}
        keywords={article.keywords}
        canonical={`/blog/${article.slug}`}
        image={`https://almenso.com/preview.svg`}
        type="article"
        schema={schemas}
      />
      
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: tool.name },
      ]} />
      
      {/* Article Header */}
      <header className="ap-header">
        <div className="ap-header-content">
          <div className="aph-category">{formatCategory(article.category)}</div>
          <h1 className="aph-title">{article.title}</h1>
          <div className="aph-meta">
            <span className="aph-date">
              📅 {new Date(article.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="aph-reading">⏱️ {article.readTime} min read</span>
            <span className="aph-words">📝 {article.wordCount} words</span>
            <ShareButton
              title={article.title}
              text={article.metaDescription}
              style={{ marginLeft: 'auto' }}
            />
          </div>
        </div>
      </header>
      
      {/* AdSense - Top */}
      <AdSlot slot="top" />
      
      <div className="ap-container">
        <div className="ap-content">
          {/* Link to Tool */}
          <div className="ap-tool-link">
            <Link to={`/tools/${tool.id}`} className="atl-card">
              <div className="atl-icon" style={{ background: tool.color }}>
                {tool.icon}
              </div>
              <div className="atl-content">
                <div className="atl-label">Try the Tool</div>
                <div className="atl-title">{tool.name}</div>
                <div className="atl-desc">{tool.description}</div>
              </div>
              <div className="atl-arrow">🚀 Use Tool</div>
            </Link>
          </div>
          
          {/* Table of Contents */}
          <div className="ap-toc">
            <h2 className="aptoc-title">Table of Contents</h2>
            <ul className="aptoc-list">
              {article.tableOfContents.items.map((item, index) => (
                <li key={index} className="aptoc-item">
                  <a href={`#${item.id}`} className="aptoc-link">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Introduction */}
          <section id="introduction" className="ap-section">
            <h2>{article.introduction.heading}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: sanitizeHtml(article.introduction.content.replace(/\n/g, '<br/><br/>'))  
            }} />
          </section>
          
          {/* InArticle Ad */}
          <InArticleAd />
          
          {/* How to Use */}
          <section id="how-to-use" className="ap-section">
            <h2>{article.howToUseSection.heading}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: sanitizeHtml(article.howToUseSection.content.replace(/\n/g, '<br/><br/>'))  
            }} />
          </section>
          
          {/* Benefits */}
          <section id="benefits" className="ap-section">
            <h2>{article.benefitsSection.heading}</h2>
            <div className="ap-benefits-grid">
              {article.benefitsSection.benefits.map((benefit, index) => (
                <div key={index} className="apb-card">
                  <div className="apb-icon">✓</div>
                  <h3 className="apb-title">{benefit.title}</h3>
                  <p className="apb-text">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* InArticle Ad */}
          <InArticleAd />
          
          {/* Tutorial */}
          <section id="tutorial" className="ap-section">
            <h2>{article.tutorialSection.heading}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: sanitizeHtml(article.tutorialSection.content.replace(/\n/g, '<br/><br/>'))  
            }} />
          </section>
          
          {/* Tips */}
          <section id="tips" className="ap-section">
            <h2>{article.tipsSection.heading}</h2>
            <div className="ap-tips-list">
              {article.tipsSection.tips.map((tip, index) => (
                <div key={index} className="apt-item">
                  <div className="apt-icon">💡</div>
                  <div className="apt-content">
                    <h3 className="apt-title">{tip.title}</h3>
                    <p className="apt-text">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Common Mistakes */}
          <section id="mistakes" className="ap-section">
            <h2>{article.mistakesSection.heading}</h2>
            <div className="ap-mistakes-list">
              {article.mistakesSection.mistakes.map((mistake, index) => (
                <div key={index} className="apm-item">
                  <div className="apm-icon">❌</div>
                  <div className="apm-content">
                    <h3 className="apm-title">{mistake.mistake}</h3>
                    <p className="apm-text"><strong>Solution:</strong> {mistake.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* FAQ */}
          <section id="faqs" className="ap-section">
            <FAQ faqs={article.faqSection.faqs} title="Frequently Asked Questions" />
          </section>
          
          {/* Related Tools */}
          <section id="related" className="ap-section">
            <h2>Related Tools</h2>
            <RelatedTools toolIds={tool.relatedTools} allTools={TOOLS_DATABASE} />
          </section>
          
          {/* Conclusion */}
          <section id="conclusion" className="ap-section">
            <h2>{article.conclusion.heading}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: article.conclusion.content.replace(/\n/g, '<br/><br/>') 
            }} />
          </section>
          
          {/* CTA to Tool */}
          <div className="ap-cta">
            <div className="apc-content">
              <h3 className="apc-title">Ready to Try {tool.name}?</h3>
              <p className="apc-text">Start using the tool now - it's free and requires no registration!</p>
              <Link to={`/tools/${tool.id}`} className="apc-button" onClick={() => trackCTA('use_tool', tool.name)}>
                🚀 Use {tool.name} Now — Free →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <aside className="ap-sidebar">
          {/* Tool Widget */}
          <div className="aps-widget">
            <h3 className="apsw-title">Try the Tool</h3>
            <ToolLink tool={tool} />
          </div>
          
          {/* Related Tools Widget */}
          <div className="aps-widget">
            <h3 className="apsw-title">Related Tools</h3>
            <div className="apsw-list">
              {tool.relatedTools.slice(0, 3).map(toolId => {
                const relatedTool = TOOLS_DATABASE.find(t => t.id === toolId)
                return relatedTool ? <ToolLink key={toolId} tool={relatedTool} /> : null
              })}
            </div>
          </div>
        </aside>
      </div>
      
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
    developer: 'Developer Tool'
  }
  return names[category] || category
}

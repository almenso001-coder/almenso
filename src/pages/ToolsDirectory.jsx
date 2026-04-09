/**
 * TOOLS DIRECTORY PAGE
 * Complete listing of all tools with search, filters, and categories
 */

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { ToolGrid } from '../components/ToolCard'
import { TOOLS_DATABASE, TOOL_CATEGORIES } from '../data/toolsDatabase'
import './ToolsDirectory.css'

export default function ToolsDirectory() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'all')
  const [filteredTools, setFilteredTools] = useState(TOOLS_DATABASE)
  
  // Category counts
  const categoryCounts = Object.keys(TOOL_CATEGORIES).reduce((acc, key) => {
    const category = TOOL_CATEGORIES[key]
    acc[category] = TOOLS_DATABASE.filter(t => t.category === category).length
    return acc
  }, {})
  
  // Filter tools based on search and category
  useEffect(() => {
    let tools = [...TOOLS_DATABASE]
    
    // Filter by category
    if (selectedCategory !== 'all') {
      tools = tools.filter(t => t.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.keywords.some(k => k.toLowerCase().includes(query))
      )
    }
    
    setFilteredTools(tools)
  }, [searchQuery, selectedCategory])
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(location.search)
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    navigate(`/tools?${params.toString()}`)
  }
  
  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    const params = new URLSearchParams(location.search)
    if (value.trim()) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    navigate(`/tools?${params.toString()}`)
  }
  
  return (
    <div className="tools-directory">
      {/* SEO Meta Tags */}
      <SEOHead
        title="All Tools - 50+ Free Online Tools | Almenso"
        description="Browse our complete collection of 50+ free online tools including calculators, image tools, PDF tools, text tools, SEO tools, and developer tools."
        keywords={['online tools directory', 'free tools', 'web tools', 'calculator tools', 'image editor']}
        canonical="/tools"
      />
      
      {/* Page Header */}
      <section className="td-header">
        <div className="td-header-content">
          <h1 className="td-title">All Tools</h1>
          <p className="td-subtitle">
            Browse our complete collection of {TOOLS_DATABASE.length} free online tools
          </p>
        </div>
      </section>
      
      {/* AdSense - Top */}
      <AdSlot slot="top" />
      
      {/* Search & Filter Section */}
      <section className="td-controls">
        <div className="td-controls-inner">
          {/* Search Bar */}
          <div className="td-search">
            <span className="tds-icon">🔍</span>
            <input
              type="text"
              className="tds-input"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button 
                className="tds-clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="td-results">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
          </div>
        </div>
      </section>
      
      {/* Category Tabs */}
      <section className="td-categories">
        <div className="td-categories-scroll">
          <button
            className={`tdc-tab ${selectedCategory === 'all' ? 'tdc-tab-active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            <span className="tdc-icon">📦</span>
            <span className="tdc-name">All Tools</span>
            <span className="tdc-count">{TOOLS_DATABASE.length}</span>
          </button>
          
          {Object.entries(TOOL_CATEGORIES).map(([key, category]) => (
            <button
              key={category}
              className={`tdc-tab ${selectedCategory === category ? 'tdc-tab-active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <span className="tdc-icon">{getCategoryIcon(category)}</span>
              <span className="tdc-name">{formatCategoryName(category)}</span>
              <span className="tdc-count">{categoryCounts[category] || 0}</span>
            </button>
          ))}
        </div>
      </section>
      
      {/* Tools Grid */}
      <section className="td-tools">
        {filteredTools.length > 0 ? (
          <ToolGrid tools={filteredTools} />
        ) : (
          <div className="td-empty">
            <div className="tde-icon">🔍</div>
            <div className="tde-title">No tools found</div>
            <div className="tde-text">
              Try different keywords or browse all tools
            </div>
            <button 
              className="tde-button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
      
      {/* AdSense - Mid */}
      {filteredTools.length > 6 && <AdSlot slot="mid" />}
      
      {/* Quick Links */}
      <section className="td-links">
        <h2 className="tdl-title">Popular Categories</h2>
        <div className="tdl-grid">
          <QuickLink
            icon="🧮"
            title="Calculators"
            description="Financial, mathematical, and scientific calculators"
            link="/tools?category=calculator"
          />
          <QuickLink
            icon="🖼️"
            title="Image Tools"
            description="Compress, resize, convert, and edit images"
            link="/tools?category=image"
          />
          <QuickLink
            icon="📄"
            title="PDF Tools"
            description="Merge, split, compress, and convert PDFs"
            link="/tools?category=pdf"
          />
          <QuickLink
            icon="🔍"
            title="SEO Tools"
            description="Optimize your website for search engines"
            link="/tools?category=seo"
          />
        </div>
      </section>
      
      {/* AdSense - Bottom */}
      <AdSlot slot="bottom" />
    </div>
  )
}

/**
 * Quick Link Card Component
 */
function QuickLink({ icon, title, description, link }) {
  const navigate = useNavigate()
  
  return (
    <div 
      className="quick-link"
      onClick={() => navigate(link)}
    >
      <div className="ql-icon">{icon}</div>
      <div className="ql-content">
        <h3 className="ql-title">{title}</h3>
        <p className="ql-description">{description}</p>
      </div>
      <div className="ql-arrow">→</div>
    </div>
  )
}

/**
 * Get category icon
 */
function getCategoryIcon(category) {
  const icons = {
    calculator: '🧮',
    image: '🖼️',
    pdf: '📄',
    text: '📝',
    seo: '🔍',
    developer: '💻',
    'social-media': '📱',
    finance: '💰',
    health: '🏥',
    converter: '🔄',
    utility: '🛠️',
    design: '🎨'
  }
  return icons[category] || '📦'
}

/**
 * Format category name
 */
function formatCategoryName(category) {
  const names = {
    calculator: 'Calculators',
    image: 'Image Tools',
    pdf: 'PDF Tools',
    text: 'Text Tools',
    seo: 'SEO Tools',
    developer: 'Developer Tools',
    'social-media': 'Social Media',
    finance: 'Finance',
    health: 'Health',
    converter: 'Converters',
    utility: 'Utilities',
    design: 'Design'
  }
  return names[category] || category
}

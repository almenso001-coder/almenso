/**
 * FAQ COMPONENT
 * Accordion-style FAQ with JSON-LD structured data for rich snippets
 */

import React, { useState } from 'react'
import { generateFAQSchema } from '../utils/seoHelpers'
import './FAQ.css'

export default function FAQ({ faqs, title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(null)
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  // Generate FAQ schema for SEO — inject directly to avoid duplicate via SEOHead
  const faqSchema = generateFAQSchema(faqs)
  
  return (
    <section className="faq-section">
      {/* FAQPage JSON-LD for rich snippets — injected inline, no duplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="faq-header">
        <h2 className="faq-title">{title}</h2>
        <p className="faq-subtitle">
          Find answers to common questions about our tools
        </p>
      </div>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </section>
  )
}

/**
 * Individual FAQ Item
 */
function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
      <button 
        className="faq-question"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="faq-q-icon">Q</span>
        <span className="faq-q-text">{faq.question}</span>
        <span className="faq-q-toggle">{isOpen ? '−' : '+'}</span>
      </button>
      
      {isOpen && (
        <div className="faq-answer">
          <span className="faq-a-icon">A</span>
          <div className="faq-a-text">{faq.answer}</div>
        </div>
      )}
    </div>
  )
}

/**
 * Compact FAQ List (for sidebars)
 */
export function CompactFAQ({ faqs }) {
  return (
    <div className="compact-faq">
      {faqs.slice(0, 5).map((faq, index) => (
        <div key={index} className="cfaq-item">
          <div className="cfaq-question">{faq.question}</div>
          <div className="cfaq-answer">{faq.answer}</div>
        </div>
      ))}
    </div>
  )
}

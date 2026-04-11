/**
 * BREADCRUMB COMPONENT
 * Reusable breadcrumb nav with JSON-LD BreadcrumbList schema
 * Usage: <Breadcrumb items={[{label:'Home',href:'/'},{label:'Tools',href:'/tools'},{label:'Tool Name'}]} />
 */

import React from 'react'
import { Link } from 'react-router-dom'
import './Breadcrumb.css'

const SITE_URL = 'https://almenso.com'

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null

  // JSON-LD BreadcrumbList schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={i} className="breadcrumb__item">
                {!isLast && item.href ? (
                  <Link to={item.href} className="breadcrumb__link">
                    {i === 0 && <span className="breadcrumb__home-icon" aria-hidden="true">🏠</span>}
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumb__current" aria-current="page">
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="breadcrumb__sep" aria-hidden="true">›</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

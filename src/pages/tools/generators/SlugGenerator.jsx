import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function SlugGenerator() {
  const [input, setInput] = useState('')
  const [slug, setSlug] = useState('')

  const generate = () => {
    const cleaned = input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')

    setSlug(cleaned)
  }

  return (
    <ToolWrapper
      title="Slug Generator — Create URL-Friendly Slugs"
      description="Generate clean URL slugs from titles and headings for blogs, pages, and SEO-friendly links."
      keywords="slug generator, url slug, seo slug, friendly url"
      emoji="🔗"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Slug Generator"
      tagline="Convert titles into URL-friendly slugs."
      guideSteps={[
        { heading: 'Enter text', text: 'Paste your title or heading.' },
        { heading: 'Generate slug', text: 'Click to convert to a URL-friendly slug.' },
        { heading: 'Copy', text: 'Use in your web URLs or CMS slug fields.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'What is a slug?', a: 'A slug is the part of a URL that identifies a page using readable words, usually separated by hyphens.' },
        { q: 'Why remove special characters?', a: 'Special characters can break links or cause SEO issues; slugs should be simple and safe for URLs.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📝 Slug Builder</div>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label>Title or heading</label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g. How to Build a React App Quickly"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🪓 Generate Slug
          </button>

          {slug && (
            <div style={{ marginTop: 16, padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #cbd5e1' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Result</div>
              <div style={{ fontSize: '0.95rem', wordBreak: 'break-all' }}>{slug}</div>
              <button
                onClick={() => navigator.clipboard.writeText(slug)}
                style={{ marginTop: 10, padding: '10px 14px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
              >
                📋 Copy Slug
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Paste your page title or heading and click "Generate Slug". The tool removes special characters, converts to lowercase, and replaces spaces with hyphens. The result is a clean, SEO-friendly slug you can use in your website URLs.
        </p>

        <h2>Benefits</h2>
        <p>
          Using consistent, readable slugs improves search engine visibility and makes your links easier to share. This generator helps avoid manual mistakes and ensures your slugs follow common web conventions.
        </p>
        <p>
          A clean slug also makes your URLs more user-friendly and prevents issues with special characters or spaces. Use the generated slug in your CMS or routing configuration for a polished result.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I edit the slug after generating?</strong><br />
          A: Yes, you can edit the slug in the output box and copy the modified version.
        </p>
        <p>
          <strong>Q: Should slugs be long?</strong><br />
          A: Keep slugs short but descriptive — aim for 2-6 words that capture the page topic.
        </p>
      </div>
    </ToolWrapper>
  )
}

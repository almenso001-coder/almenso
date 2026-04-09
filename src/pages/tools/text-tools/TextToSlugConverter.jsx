import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function toSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function TextToSlugConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const slug = useMemo(() => toSlug(text), [text])

  const copy = async () => {
    if (!slug) return
    try {
      await navigator.clipboard.writeText(slug)
      setMessage('Slug copied!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  return (
    <ToolWrapper
      title="Text to Slug Converter — Generate URL Friendly Slugs"
      description="Convert any title or phrase into a URL-friendly slug. Great for blog posts, product pages and SEO-friendly URLs."
      keywords="slug generator, text to slug, url slug, seo slug"
      emoji="🔗"
      heroColor="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      toolName="Text to Slug Converter"
      tagline="Title ko URL-friendly slug mein convert karo — SEO aur clean URLs ke liye."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna blog title ya phrase paste karo.' },
        { heading: 'Slug dekho', text: 'Tool automatically URL-friendly slug generate karega.' },
        { heading: 'Copy karo', text: 'Slug ko copy karke apne CMS ya URL field mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya spaces remove ho jaayenge?', a: 'Haan. Spaces ko hyphens (-) se replace kiya jaata hai.' },
        { q: 'Kya special characters remove hote hain?', a: 'Haan. Non-alphanumeric characters remove karke clean slug banaya jaata hai.' },
        { q: 'Kya uppercase letters lowercase mein convert hote hain?', a: 'Haan. Slug mein sab letters lowercase hote hain.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/text-case-converter', emoji: '🔤', name: 'Text Case Converter' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✍️ Text Input</div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Yahan apna text paste karo..."
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🔗 Slug</div>
        <input
          value={slug}
          readOnly
          style={{ width: '100%', padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy Slug</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Slug generator se aap quickly SEO-friendly URL segments bana sakte hain. Clean slugs link sharing aur search ranking dono improve karte hain.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Aapko manually punctuation remove karne ki zaroorat nahi; ye tool aapke title ko automatically safe URL format mein convert kar deta hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

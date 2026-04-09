import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function toTitleCase(str) {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

function toSentenceCase(str) {
  return str
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
}

function toggleCase(str) {
  return str
    .split('')
    .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('')
}

export default function TextCaseConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const readingMin = words ? Math.max(1, Math.ceil(words / 200)) : 0
    return { chars, words, readingMin }
  }, [text])

  const apply = fn => {
    setText(fn(text))
    setMessage('Text converted!')
    setTimeout(() => setMessage(''), 1300)
  }

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard!')
      setTimeout(() => setMessage(''), 1300)
    } catch {}
  }

  return (
    <ToolWrapper
      title="Text Case Converter — Uppercase, Lowercase, Title Case"
      description="Quickly convert your text to uppercase, lowercase, title case, sentence case or toggle case. Perfect for social media, descriptions, and quick formatting."
      keywords="text case converter, uppercase, lowercase, title case, sentence case, toggle case"
      emoji="🔤"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #2563eb 100%)"
      toolName="Text Case Converter"
      tagline="Text ka case ek click mein change karo — copy/paste karne ke liye perfect."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna content paste karo ya type karo.' },
        { heading: 'Case select karo', text: 'Uppercase, lowercase, title case, sentence case ya toggle case choose karo.' },
        { heading: 'Copy karo', text: 'Result copy karke apne document ya post mein paste karo.' },
      ]}
      faqs={[
        { q: 'Title case kya hota hai?', a: 'Title case mein major words capital hote hain, jaise “How To Use This Tool”.' },
        { q: 'Sentence case kya hota hai?', a: 'Sentence case mein har sentence ka pehla letter capital hota hai, baaki lower case.' },
        { q: 'Toggle case kya karta hai?', a: 'Toggle case har character ka case ulta kar deta hai — uppercase ko lowercase aur vice versa.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
        { path: '/tools/remove-duplicate-lines', emoji: '🧹', name: 'Remove Duplicate Lines' },
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

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <button className="tw-calc-btn" onClick={() => apply(s => s.toUpperCase())}>🔠 UPPERCASE</button>
        <button className="tw-calc-btn" onClick={() => apply(s => s.toLowerCase())}>🔡 lowercase</button>
        <button className="tw-calc-btn" onClick={() => apply(toTitleCase)}>🅰️ Title Case</button>
        <button className="tw-calc-btn" onClick={() => apply(toSentenceCase)}>📝 Sentence Case</button>
        <button className="tw-calc-btn" onClick={() => apply(toggleCase)}>🔄 Toggle Case</button>
        <button className="tw-calc-btn" onClick={copy} style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #16a34a' }}>📋 Copy</button>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Characters</span><span className="tw-brow-val">{stats.chars}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Approx. Reading Time</span><span className="tw-brow-val">{stats.readingMin} min</span></div>
        </div>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Case conversion se aap copy/paste text ko instantly format kar sakte hain. Social media posts, titles, descriptions, aur code snippets mein consistent case rakhne se readability aur professionalism dono improve hote hain.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Agar aap copy karte time case mix ho jaata hai, toh ye tool ek click mein aapko clean output deta hai. Ye tool writers, students aur marketers ke liye especially useful hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

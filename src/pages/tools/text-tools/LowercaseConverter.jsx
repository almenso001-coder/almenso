import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function LowercaseConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { chars, words }
  }, [text])

  const apply = () => {
    setText(prev => prev.toLowerCase())
    setMessage('Converted to lowercase!')
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
      title="Lowercase Converter — Convert Text to lowercase"
      description="Convert any text to lowercase quickly. Ideal for formatting usernames, tags, URLs, and uniform content styling."
      keywords="lowercase converter, text to lowercase, format text, lowercase text"
      emoji="🔡"
      heroColor="linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)"
      toolName="Lowercase Converter"
      tagline="Ek click mein text ko lowercase mein badlo."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna content paste karo ya type karo.' },
        { heading: 'Convert karo', text: 'lowercase button press karo.' },
        { heading: 'Copy karo', text: 'Result ko clipboard mein copy karke kahin paste karo.' },
      ]}
      faqs={[
        { q: 'Kya punctuation change hota hai?', a: 'Nahi. Yeh tool sirf alphabetic characters ko lowercase mein convert karta hai.' },
        { q: 'Kya accented letters support hote hain?', a: 'Haan, modern browsers accented characters ko bhi lowercase mein convert kar dete hain.' },
        { q: 'Yeh conversion kahaan useful hai?', a: 'Usernames, tags, file names, aur URL segments mein baseline lowercase preferred hota hai.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/uppercase-converter', emoji: '🔠', name: 'Uppercase Converter' },
        { path: '/tools/text-case-converter', emoji: '🔤', name: 'Text Case Converter' },
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

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={apply}>🔡 Convert to lowercase</button>
        <button className="tw-calc-btn" onClick={copy} style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #16a34a' }}>📋 Copy</button>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Characters</span><span className="tw-brow-val">{stats.chars}</span></div>
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
          Lowercase text consistent look deta hai, aur aapke usernames, tags, ya technical IDs mein errors reduce karta hai. Ye tool quick way hai jab aapko kisi text ko ek standard casing mein lana ho.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Yeh especially useful hai jab aap multiple sources se text copy karte ho — aise data ko normalise karna aasan banata hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

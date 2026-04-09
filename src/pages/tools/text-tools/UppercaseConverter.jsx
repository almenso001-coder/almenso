import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function UppercaseConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { chars, words }
  }, [text])

  const apply = () => {
    setText(prev => prev.toUpperCase())
    setMessage('Converted to uppercase!')
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
      title="Uppercase Converter — Convert Text to UPPERCASE"
      description="Convert any text to uppercase quickly. Great for headings, shout-outs, or matching style guides that require all caps."
      keywords="uppercase converter, text to uppercase, all caps, text formatting"
      emoji="🔠"
      heroColor="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
      toolName="Uppercase Converter"
      tagline="Text ko ek click mein UPPERCASE mein convert karo."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna text paste karo ya type karo.' },
        { heading: 'Convert karo', text: 'UPPERCASE button pe click karo.' },
        { heading: 'Copy karo', text: 'Result ko clipboard mein copy karo aur apne document mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh punctuation ko change karta hai?', a: 'Nahi. Sirf letters ko uppercase banata hai; punctuation same rehta hai.' },
        { q: 'Kya yeh accent letters handle karta hai?', a: 'Modern browsers aksar accent letters ko bhi uppercase mein convert kar dete hain.' },
        { q: 'Yeh tool kaise kaam karta hai?', a: 'Yeh JavaScript ke toUpperCase() method ka use karta hai jo text ke har character ko uppercase mein convert karta hai.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/lowercase-converter', emoji: '🔡', name: 'Lowercase Converter' },
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
        <button className="tw-calc-btn" onClick={apply}>🔠 Convert to UPPERCASE</button>
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
          Uppercase converter aapko quickly headings, calls-to-action, aur form letters ko standardized format mein laane mein madad karta hai. Agar aapko kisi content ko all-caps mein chahiye, toh yeh tool bahut fast hota hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Yeh tool aapki writing workflow ko speed up karta hai — especially jab aapko bar bar case adjust karna ho. Koi manual editing ya extra formatting ki zarurat nahi.
        </p>
      </div>
    </ToolWrapper>
  )
}

import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function countNonSpaceChars(text) {
  return text.replace(/\s/g, '').length
}

export default function CharacterCounter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const total = text.length
    const withoutSpaces = countNonSpaceChars(text)
    const lines = text.split(/\r?\n/).length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { total, withoutSpaces, lines, words }
  }, [text])

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed. Try again.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  const clear = () => {
    setText('')
    setMessage('Cleared!')
    setTimeout(() => setMessage(''), 1400)
  }

  return (
    <ToolWrapper
      title="Character Counter — Spaces & Without Spaces"
      description="Count characters quickly: total count, count without spaces, line count and word count. Great for social media posts, form fields, and text length checks."
      keywords="character counter, text length, count characters, count without spaces, line count"
      emoji="🔢"
      heroColor="linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)"
      toolName="Character Counter"
      tagline="Turant characters count karo — spaces ke saath aur bina spaces ke."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Niche wale area mein apna text paste karo ya type karo.' },
        { heading: 'Character stats dekho', text: 'Total characters aur spaces ke bina count dekhne ke liye scroll karo.' },
        { heading: 'Copy ya clear', text: 'Copy button se text copy karo ya clear button se remove karo.' },
      ]}
      faqs={[
        { q: 'Spaces ko count karna kyun zaroori hai?', a: 'Kayi forms aur platforms mein character count spaces ke sath hota hai. Is tool se aap dono versions dekh sakte hain.' },
        { q: 'Line count kaise hota hai?', a: 'Yeh tool aapke text ko line breaks (\n) se split karke total lines count karta hai.' },
        { q: 'Kya yeh tool emoji bhi count karta hai?', a: 'Haan, emojis ek character ke roop mein count hote hain jo aapke text length mein add ho jaate hain.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
        { path: '/tools/remove-extra-spaces', emoji: '🧼', name: 'Remove Extra Spaces' },
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
        <div className="tp-sec-title">📊 Statistics</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Characters (total)</span><span className="tw-brow-val">{stats.total}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Characters (without spaces)</span><span className="tw-brow-val">{stats.withoutSpaces}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Lines</span><span className="tw-brow-val">{stats.lines}</span></div>
        </div>
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy Text</button>
        <button className="tw-calc-btn" onClick={clear} style={{ background: '#fef3c7', color: '#7c2d12', border: '1.5px solid #f59e0b' }}>🧹 Clear</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Character counting se aapko pata chal jaata hai ki aapka message fit hoga ya nahi. Twitter, SMS, meta tags, form fields aur application submissions mein limit hote hain. Yeh tool fast insight deta hai ki aapko short karna chahiye ya nahi.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Space-free character count aapko true payload size dikhata hai — jo especially programmers, SEO writers aur marketers ke liye useful hota hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

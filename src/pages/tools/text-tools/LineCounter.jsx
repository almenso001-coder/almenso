import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function LineCounter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const lines = text.split(/\r?\n/)
    const nonEmpty = lines.filter(l => l.trim()).length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { lines: lines.length, nonEmpty, words }
  }, [text])

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  return (
    <ToolWrapper
      title="Line Counter — Count All Lines and Non-Empty Lines"
      description="Count the number of lines and non-empty lines in your text. Useful for code, scripts, CSV data, and structured text."
      keywords="line counter, count lines, non-empty lines, text analysis"
      emoji="📏"
      heroColor="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
      toolName="Line Counter"
      tagline="Text mein total lines aur non-empty lines ka count instantly dekho."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna multiline text paste karo.' },
        { heading: 'Lines count dekho', text: 'Tool automatically total aur non-empty lines count karega.' },
        { heading: 'Copy karo', text: 'Agar chaho toh text copy karke kahin aur paste karo.' },
      ]}
      faqs={[
        { q: 'Non-empty lines kya hote hain?', a: 'Non-empty lines woh lines hain jinmein sirf whitespace na ho; matlab usme koi actual character ho.' },
        { q: 'Kya yeh line endings support karta hai?', a: 'Haan. Yeh both Windows (\r\n) aur Unix (\n) line endings support karta hai.' },
        { q: 'Kya yeh code file ke liye useful hai?', a: 'Haan. Code snippets, CSV data, aur scripts mein line count quickly check karne ke liye useful hai.' },
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
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Total lines</span><span className="tw-brow-val">{stats.lines}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Non-empty lines</span><span className="tw-brow-val">{stats.nonEmpty}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
        </div>
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy Text</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Line counter se aap quickly dekh sakte hain ki aapke script ya notes mein kitni lines hain — especially jab aapko file length ya data structure check karna ho.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Non-empty line count aapko help karta hai whitespace-only lines ko ignore karne mein, jo useful hota hai jab aap formatting ya content quality check kar rahe ho.
        </p>
      </div>
    </ToolWrapper>
  )
}

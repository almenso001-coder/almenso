import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const WORDS = [
  'sunny', 'river', 'bright', 'garden', 'future', 'quick', 'spark', 'dream', 'journey', 'pixel',
  'horizon', 'whisper', 'sparkle', 'motion', 'breeze', 'echo', 'roam', 'wild', 'flame', 'river',
  'quiet', 'shimmer', 'golden', 'forest', 'clarity', 'ladder', 'moment', 'canvas', 'patch', 'trail',
]

function randomWords(count) {
  const out = []
  for (let i = 0; i < count; i += 1) {
    const idx = Math.floor(Math.random() * WORDS.length)
    out.push(WORDS[idx])
  }
  return out.join(' ')
}

export default function RandomTextGenerator() {
  const [count, setCount] = useState(20)
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const generated = useMemo(() => randomWords(count), [count])

  const generate = () => {
    setText(generated)
    setMessage('Random text generated!')
    setTimeout(() => setMessage(''), 1400)
  }

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  return (
    <ToolWrapper
      title="Random Text Generator — Generate Quick Placeholder Text"
      description="Generate random placeholder text for testing, design mockups, or lorem ipsum alternatives. Adjust word count to fit your needs."
      keywords="random text generator, placeholder text, lorem ipsum alternative, fake text"
      emoji="🎲"
      heroColor="linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
      toolName="Random Text Generator"
      tagline="Quickly generate filler text for design, testing, or notes."
      guideSteps={[
        { heading: 'Word count select karo', text: 'Kitne words chahiye, vah number set karo.' },
        { heading: 'Generate karo', text: 'Generate button press karke random text dekho.' },
        { heading: 'Copy karo', text: 'Generated text ko copy karke apne project mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh proper sentences banata hai?', a: 'Nahi. Yeh random words ka combination generate karta hai jise placeholder ke roop mein use kiya ja sakta hai.' },
        { q: 'Kya main custom word list use kar sakta hoon?', a: 'Is version mein fixed word list use kiya gaya hai, lekin aap easily custom words add kar sakte ho.' },
        { q: 'Ye kis purpose ke liye best hai?', a: 'Design mockups, layout testing, ya jab aapko quick filler text chahiye ho.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/lorem-ipsum-generator', emoji: '📜', name: 'Lorem Ipsum Generator' },
        { path: '/tools/text-sorter', emoji: '⬆️', name: 'Text Sorter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎯 Settings</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem' }}>
            Word count
            <input
              type="number"
              min={5}
              max={200}
              value={count}
              onChange={e => setCount(Math.max(5, Math.min(200, Number(e.target.value) || 5)))}
              style={{ padding: 8, width: 90, borderRadius: 8, border: '1.5px solid #e5e7eb' }}
            />
          </label>
          <button className="tw-calc-btn" onClick={generate}>🎲 Generate</button>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📄 Generated Text</div>
        <textarea
          value={text}
          readOnly
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
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
          Random text generator se aap design mockups aur templates mein quick filler text dal sakte hain bina Lorem Ipsum search kiye. Ye tool lightweight aur instant hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Aap is text ko testing, placeholders, ya brainstorming ke liye use kar sakte hain jab actual content available na ho.
        </p>
      </div>
    </ToolWrapper>
  )
}

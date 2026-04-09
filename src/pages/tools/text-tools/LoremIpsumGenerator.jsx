import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

function generateLorem(paragraphs) {
  return Array.from({ length: paragraphs }, () => LOREM).join('\n\n')
}

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(2)
  const [text, setText] = useState(generateLorem(paragraphs))
  const [message, setMessage] = useState('')

  const generated = useMemo(() => generateLorem(paragraphs), [paragraphs])

  const generate = () => {
    setText(generated)
    setMessage('Lorem ipsum generated!')
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
      title="Lorem Ipsum Generator — Quick Placeholder Text"
      description="Generate classic lorem ipsum paragraphs for layouts, mockups, and design drafts. Customize how many paragraphs you need."
      keywords="lorem ipsum generator, placeholder text, mockup text, dummy text"
      emoji="📜"
      heroColor="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      toolName="Lorem Ipsum Generator"
      tagline="Classic lorem ipsum placeholder text, instantly generated."
      guideSteps={[
        { heading: 'Paragraph count set karo', text: 'Kitne paragraphs chahiye, number set karo.' },
        { heading: 'Generate karo', text: 'Generate button press karo aur text copy karo.' },
        { heading: 'Paste karo', text: 'Design mockup, prototype, ya content plan mein paste karo.' },
      ]}
      faqs={[
        { q: 'Lorem ipsum kya hai?', a: 'Lorem ipsum ek standard dummy text hai jise printers aur designers industry mein use karte hain.' },
        { q: 'Kya yeh meaningful text hai?', a: 'Nahi. Yeh placeholder text hai jo layout dekhne ke liye use hota hai.' },
        { q: 'Kya main paragraph length change kar sakta hoon?', a: 'Is tool mein paragraphs fixed hain lekin aap paragraph count adjust kar sakte ho.' },
      ]}
            affCategory="finance"
      hasResult={true}
      relatedTools={[
        { path: '/tools/random-text-generator', emoji: '🎲', name: 'Random Text Generator' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎯 Settings</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem' }}>
            Paragraphs
            <input
              type="number"
              min={1}
              max={10}
              value={paragraphs}
              onChange={e => setParagraphs(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
              style={{ padding: 8, width: 90, borderRadius: 8, border: '1.5px solid #e5e7eb' }}
            />
          </label>
          <button className="tw-calc-btn" onClick={generate}>📜 Generate</button>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📄 Output</div>
        <textarea
          value={text}
          readOnly
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy Lorem Ipsum</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Lorem ipsum quick placeholder text provide karta hai jisse aap layout aur typography design kar sakte hain bina real content ke. Yeh designers aur developers ke liye common tool hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Mockups, wireframes, aur design previews mein jab real content available na ho, tab yeh tool aapko fast filler text deta hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

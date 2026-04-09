import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function capitalizeSentences(str) {
  return str
    .split(/(?<=[.?!])\s*/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

export default function CapitalizeText() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const chars = text.length
    return { words, chars }
  }, [text])

  const apply = () => {
    setText(capitalizeSentences(text))
    setMessage('Text capitalized!')
    setTimeout(() => setMessage(''), 1400)
  }

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard!')
      setTimeout(() => setMessage(''), 1400)
    } catch {}
  }

  return (
    <ToolWrapper
      title="Capitalize Text Tool — Capitalize Sentences and Phrases"
      description="Capitalize the first letter of each sentence and make your writing look polished. Great for copy editing and improving readability."
      keywords="capitalize text, sentence capitalization, text correction, formatting tool"
      emoji="🔠"
      heroColor="linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)"
      toolName="Capitalize Text"
      tagline="Har sentence ka pehla character capitalize karo — gentle editing ke liye perfect."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna content paste karo.' },
        { heading: 'Capitalize karo', text: 'Capitalize button click karo taaki har sentence shuru ho capital letter se.' },
        { heading: 'Copy karo', text: 'Edited text ko copy karke apne document ya message mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh tool har word ko capitalize karega?', a: 'Nahi. YEH tool har sentence ke pehle word ko capital karta hai, baki words unchanged rehte hain.' },
        { q: 'Yeh tool kaam kaise karta hai?', a: 'Yeh sentences ko punctuation (., ?, !) se split karke har sentence ke first character ko uppercase banata hai.' },
        { q: 'Kya punctuation remove hota hai?', a: 'Nahi. Punctuation same rahega — sirf first letter capital hoga.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/title-case-converter', emoji: '🅰️', name: 'Title Case Converter' },
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
        <button className="tw-calc-btn" onClick={apply}>✨ Capitalize Sentences</button>
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
          Capitalize Text tool se aap apne writing ko readable aur presentable bana sakte hain, especially jab aapne text copy/paste kiya ho jisme case inconsistent ho. Sirf ek click mein sentences neat ho jaate hain.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Ye tool writers, students, aur professionals ke liye useful hai jo casual writing ko professional tone mein convert karna chahte hain bina manually editing ke.
        </p>
      </div>
    </ToolWrapper>
  )
}

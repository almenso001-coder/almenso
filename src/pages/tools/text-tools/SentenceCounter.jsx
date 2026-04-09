import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function countSentences(text) {
  if (!text) return 0
  const matches = text.match(/[.!?]+/g)
  if (!matches) return 0
  return matches.length
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean)
}

export default function SentenceCounter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const sentences = useMemo(() => splitSentences(text), [text])
  const stats = useMemo(() => ({
    total: sentences.length,
    averageLength: sentences.length ? Math.round(text.length / sentences.length) : 0,
  }), [sentences, text])

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed, try again.')
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
      title="Sentence Counter — Analyze Sentence Length & Structure"
      description="Quickly count sentences in your text. Ideal for writers, editors and students who need to keep track of sentence length and clarity."
      keywords="sentence counter, text analysis, sentence length, readability tool"
      emoji="📄"
      heroColor="linear-gradient(135deg, #9333ea 0%, #a855f7 100%)"
      toolName="Sentence Counter"
      tagline="Sentence clarity ke liye fast sentence count aur average length."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna paragraph paste karo ya type karo.' },
        { heading: 'Sentence count dekho', text: 'Tool automatically sentence count aur average length calculate karta hai.' },
        { heading: 'Need ho to edit karo', text: 'Short aur clear sentences better readability ke liye help karte hain.' },
      ]}
      faqs={[
        { q: 'Sentence count kaise kaam karta hai?', a: 'Tool punctuation marks (., !, ?) ko sentence end markers samajhta hai.' },
        { q: 'Kya abbreviations (e.g. “Dr.”) problem create karte hain?', a: 'Haan, kuch cases mein abbreviations extra sentence count kar sakte hain. Yeh tool common patterns ke saath best effort karta hai.' },
        { q: 'Average sentence length kya batata hai?', a: 'Yeh aapko bataata hai ki kitne characters per sentence hain — readability ke liye ye ek useful metric hai.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/paragraph-counter', emoji: '📑', name: 'Paragraph Counter' },
        { path: '/tools/text-case-converter', emoji: '🔤', name: 'Text Case Converter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✍️ Text Input</div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Yahan ek ya zyada paragraphs paste karo..."
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Sentence Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Total sentences</span><span className="tw-brow-val">{stats.total}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Average length (chars)</span><span className="tw-brow-val">{stats.averageLength}</span></div>
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
          Sentence counter se aap writing ko chhote aur readable sentences mein tod sakte hain. Long sentences readability kam kar deti hain, aur editing mein time lagta hai. Ye tool aapko quickly pata lagata hai ki aap kitna concise likh rahe hain.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Academics, blogs, ads aur social posts mein sentence structure improve karne se engagement badhta hai. Yeh tool aapko data based insight deta hai jisse aap apni writing style refine kar sakein.
        </p>
      </div>
    </ToolWrapper>
  )
}

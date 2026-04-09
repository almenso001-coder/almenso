import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function countParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean).length
}

export default function ParagraphCounter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const paragraphs = countParagraphs(text)
    const lines = text.split(/\r?\n/).length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { paragraphs, lines, words }
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

  const clear = () => {
    setText('')
    setMessage('Cleared!')
    setTimeout(() => setMessage(''), 1400)
  }

  return (
    <ToolWrapper
      title="Paragraph Counter — Count Paragraphs In Text"
      description="Quickly count paragraphs in any text. Useful for blog drafts, essays, and structured writing where paragraphs matter."
      keywords="paragraph counter, paragraph count, writing structure, content analysis"
      emoji="📑"
      heroColor="linear-gradient(135deg, #f97316 0%, #fb923c 100%)"
      toolName="Paragraph Counter"
      tagline="Text ko paragraph-wise analyze karo — structure aur readability track karo."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Apne draft ya notes ko textarea mein paste karo.' },
        { heading: 'Paragraph count dekho', text: 'Tool automatically paragraph aur line count calculate karega.' },
        { heading: 'Edit karo', text: 'Paragraphs ko split ya merge karke structure improve karo.' },
      ]}
      faqs={[
        { q: 'Paragraph kaise count hota hai?', a: 'Yeh tool 2 ya zyada consecutive line breaks ko naya paragraph mana hai.' },
        { q: 'Single line paragraphs count honge?', a: 'Agar text mein naya line break hai, toh woh bhi naya paragraph count hota hai.' },
        { q: 'Kya yeh headings ko alag count karta hai?', a: 'Heading bhi paragraph consider hoti hai jab woh blank line se separated ho.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/sentence-counter', emoji: '📄', name: 'Sentence Counter' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✍️ Text Input</div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Yahan apne text ko paste karo..."
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Paragraph Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Paragraphs</span><span className="tw-brow-val">{stats.paragraphs}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Lines</span><span className="tw-brow-val">{stats.lines}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
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
          Paragraph structure se kisi bhi piece of writing ki readability aur flow improve hoti hai. Ye tool aapko quickly batata hai ki aapke content mein kitne logical blocks hain aur kahaan break lene chahiye.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Blogging, documentation, emails, aur assignments mein clear paragraphing se readers ko samajhne mein aasan hota hai. Is tool se aap editing ko data-driven bana sakte hain.
        </p>
      </div>
    </ToolWrapper>
  )
}

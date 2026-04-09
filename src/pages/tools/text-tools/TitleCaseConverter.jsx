import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function toTitleCase(str) {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

export default function TitleCaseConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { words, chars: text.length }
  }, [text])

  const apply = () => {
    setText(prev => toTitleCase(prev))
    setMessage('Converted to Title Case!')
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
      title="Title Case Converter — Convert Text to Title Case"
      description="Change text to title case fast. Ideal for headings, blog titles, and any place where you want every word capitalized."
      keywords="title case converter, capitalize words, text formatting, headline formatter"
      emoji="🅰️"
      heroColor="linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)"
      toolName="Title Case Converter"
      tagline="Titles aur headings ko professional banana ab aasan hai."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna content daalein.' },
        { heading: 'Convert karo', text: 'Title Case button pe click karke output dekhe.' },
        { heading: 'Copy karo', text: 'Result copy karke apne document mein paste karein.' },
      ]}
      faqs={[
        { q: 'Title case kya hota hai?', a: 'Title case mein har word ka pehla character capital hota hai, baaki lowercase. Yeh headings aur titles ke liye common format hai.' },
        { q: 'Kya articles aur conjunctions bhi capital honge?', a: 'Yeh tool har word ko capital karta hai; jo style guide ke liye strict na ho, unke liye yeh useful hai.' },
        { q: 'Text mein numbers aur symbols affect honge?', a: 'Nahi, numbers aur symbols same rahenge; sirf alphabetic words convert honge.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/text-case-converter', emoji: '🔤', name: 'Text Case Converter' },
        { path: '/tools/capitalize-text', emoji: '🔠', name: 'Capitalize Text' },
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
        <button className="tw-calc-btn" onClick={apply}>🅰️ Convert to Title Case</button>
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
          Title case se headings aur titles professional dikhte hain. Aap kisi bhi headline ko ek click mein format kar sakte hain, jisse presentation aur readability dono better hoti hain.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Ye tool creative writing, blogging, aur marketing copy ke liye bahut useful hai. Agar aap SEO-friendly titles bana rahe hain, toh ye tool time bachata hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

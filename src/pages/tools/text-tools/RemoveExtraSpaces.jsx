import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function normalizeSpaces(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/\s+/g, ' ').trim())
    .join('\n')
}

export default function RemoveExtraSpaces() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const normalized = useMemo(() => normalizeSpaces(text), [text])

  const copy = async () => {
    if (!normalized) return
    try {
      await navigator.clipboard.writeText(normalized)
      setMessage('Copied cleaned text!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  const apply = () => {
    setText(normalized)
    setMessage('Extra spaces removed!')
    setTimeout(() => setMessage(''), 1400)
  }

  return (
    <ToolWrapper
      title="Remove Extra Spaces — Clean Up Spacing in Text"
      description="Remove extra spaces and convert multiple whitespace characters into a single space. Great for cleaning copy pasted text or imported data."
      keywords="remove extra spaces, normalize spacing, trim whitespace, text cleanup"
      emoji="🧼"
      heroColor="linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
      toolName="Remove Extra Spaces"
      tagline="Text ko saaf karo — extra spaces aur irregular spacing remove karo." 
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna content paste karo.' },
        { heading: 'Clean karo', text: 'Extra spaces automatically remove ho jayenge.' },
        { heading: 'Copy karo', text: 'Cleaned text ko copy karke use karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh line breaks remove karta hai?', a: 'Yeh tool line breaks preserve karta hai lekin line ke andar multiple spaces ek single space mein convert karta hai.' },
        { q: 'Kya tabs bhi remove hote hain?', a: 'Haan, tabs ko bhi single space se replace kiya jata hai.' },
        { q: 'Yeh tool kab useful hai?', a: 'Copy/paste text, scraped data, ya imported content mein unwanted spacing ko quickly clean karne ke liye.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/remove-duplicate-lines', emoji: '🧹', name: 'Remove Duplicate Lines' },
        { path: '/tools/text-sorter', emoji: '⬆️', name: 'Text Sorter' },
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
        <div className="tp-sec-title">✅ Preview</div>
        <textarea
          value={normalized}
          readOnly
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={apply}>✅ Apply Cleanup</button>
        <button className="tw-calc-btn" onClick={copy} style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #16a34a' }}>📋 Copy Clean Text</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Extra spaces remove karne se aapka content neat aur consistent dikhta hai. Ye tool copy/paste workflows mein bahut useful hai jab text mein unwanted whitespace add ho jata hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Clean text sahi tarike se search karne, format karne aur upload karne mein help karta hai. Ye tool aapko quickly ek clean version de deta hai bina manual editing ke.
        </p>
      </div>
    </ToolWrapper>
  )
}

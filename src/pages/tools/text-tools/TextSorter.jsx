import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function sortLines(text, direction = 'asc') {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .sort((a, b) => {
      const aKey = a.trim().toLowerCase()
      const bKey = b.trim().toLowerCase()
      if (aKey === bKey) return 0
      return direction === 'asc' ? (aKey < bKey ? -1 : 1) : (aKey > bKey ? -1 : 1)
    })
    .join('\n')
}

export default function TextSorter() {
  const [text, setText] = useState('')
  const [direction, setDirection] = useState('asc')
  const [message, setMessage] = useState('')

  const sorted = useMemo(() => sortLines(text, direction), [text, direction])

  const copy = async () => {
    if (!sorted) return
    try {
      await navigator.clipboard.writeText(sorted)
      setMessage('Copied sorted text!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  const apply = () => {
    setText(sorted)
    setMessage('Text sorted!')
    setTimeout(() => setMessage(''), 1400)
  }

  return (
    <ToolWrapper
      title="Text Sorter — Sort Lines Alphabetically"
      description="Sort lines of text in ascending or descending order. Great for organizing lists, names, tags, or any multiline input."
      keywords="text sorter, sort lines, alphabetical sort, list organizer, sort text"
      emoji="⬆️"
      heroColor="linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
      toolName="Text Sorter"
      tagline="Lines ko alphabetically sort karo — ascending ya descending."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna multiline text paste karo.' },
        { heading: 'Direction choose karo', text: 'Ascending ya descending choose karo.' },
        { heading: 'Apply & Copy', text: 'Sorted output copy karo ya original text replace karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh case sensitive sorting karta hai?', a: 'Nahi. Tool case-insensitive sorting karta hai taaki "Apple" aur "apple" same tarah treat ho.' },
        { q: 'Kya duplicates remove karta hai?', a: 'Nahi. Is tool ka purpose sorting hai — duplicates same rahenge.' },
        { q: 'Kya yeh comma separated values sort karega?', a: 'Agar aap line-by-line data paste karenge, yeh usi hisaab se sort karega. CSV data ke liye line breaks fix karein.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/remove-duplicate-lines', emoji: '🧹', name: 'Remove Duplicate Lines' },
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

      <div className="tp-card" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 700 }}>Sort direction:</span>
        <button
          className="tw-calc-btn"
          style={{ opacity: direction === 'asc' ? 1 : 0.7 }}
          onClick={() => setDirection('asc')}
        >
          Ascending
        </button>
        <button
          className="tw-calc-btn"
          style={{ opacity: direction === 'desc' ? 1 : 0.7 }}
          onClick={() => setDirection('desc')}
        >
          Descending
        </button>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">✅ Sorted Output</div>
        <textarea
          value={sorted}
          readOnly
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={apply}>✅ Apply Sorted Text</button>
        <button className="tw-calc-btn" onClick={copy} style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #16a34a' }}>📋 Copy Sorted</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Sorter se aap list items, tags, ya names ko quickly order mein la sakte hain. Clean output se comparison aur searching easy ho jaata hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Agar aap data import kar rahe ho ya kisi list ko organize karna hai, sorted text se workflow smooth ho jata hai.
        </p>
      </div>
    </ToolWrapper>
  )
}

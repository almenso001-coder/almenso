import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function RemoveDuplicateLines() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const uniqueText = useMemo(() => {
    const lines = text.split(/\r?\n/)
    const seen = new Set()
    return lines.filter(line => {
      const trimmed = line.trim()
      if (!trimmed) return true
      if (seen.has(trimmed)) return false
      seen.add(trimmed)
      return true
    }).join('\n')
  }, [text])

  const copy = async () => {
    if (!uniqueText) return
    try {
      await navigator.clipboard.writeText(uniqueText)
      setMessage('Copied deduped text!')
      setTimeout(() => setMessage(''), 1500)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1500)
    }
  }

  const apply = () => {
    setText(uniqueText)
    setMessage('Duplicate lines removed!')
    setTimeout(() => setMessage(''), 1500)
  }

  return (
    <ToolWrapper
      title="Remove Duplicate Lines — Clean Up Repeated Text"
      description="Automatically remove duplicate lines from your text while keeping the first occurrence. Great for cleaning lists, imports, and data copied from spreadsheets."
      keywords="remove duplicate lines, dedupe text, clean text, remove repeats"
      emoji="🧹"
      heroColor="linear-gradient(135deg, #10b981 0%, #22c55e 100%)"
      toolName="Remove Duplicate Lines"
      tagline="Duplicate lines remove karo aur clean output pao."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna content paste karo.' },
        { heading: 'Remove duplicates', text: 'Tool automatically duplicate lines remove karega jab aap apply karo.' },
        { heading: 'Copy karein', text: 'Naya text copy karke apne file mein paste karein.' },
      ]}
      faqs={[
        { q: 'Duplicate lines kya hote hain?', a: 'Duplicate lines wahi hoti hain jo text mein bar bar repeat ho rahi hoti hain, jaise list items ya imported data.' },
        { q: 'Kya order change hota hai?', a: 'Nahi. Pehle occurrence ko preserve kiya jata hai, aur duplicates remove kiye jate hain.' },
        { q: 'Kya whitespace consider hota hai?', a: 'Yes. Tool trim karke compare karta hai, isliye only whitespace difference wale lines bhi duplicate consider kiye ja sakte hain.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/remove-extra-spaces', emoji: '🧼', name: 'Remove Extra Spaces' },
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

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={apply}>🧹 Remove Duplicate Lines</button>
        <button className="tw-calc-btn" onClick={copy} style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #16a34a' }}>📋 Copy Result</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Yeh tool repetitive list items ya copied data ko quickly clean karta hai. Spreadsheet exports, email lists ya log data jahan duplicate entries aate hain wahan ye bahut useful hota hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Clean text se aapko analysis, sorting aur readability mein help milti hai. Duplicate items hataane ke baad output ready hota hai upload ya share karne ke liye.
        </p>
      </div>
    </ToolWrapper>
  )
}

import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function TextReverser() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const reversed = useMemo(() => text.split('').reverse().join(''), [text])

  const copy = async () => {
    if (!reversed) return
    try {
      await navigator.clipboard.writeText(reversed)
      setMessage('Copied reversed text!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  return (
    <ToolWrapper
      title="Text Reverser — Reverse Your Text Quickly"
      description="Reverse the order of characters in your text. Useful for fun effects, testing, or seeing your text backwards."
      keywords="text reverser, reverse text, backwards text, reverse string"
      emoji="🔁"
      heroColor="linear-gradient(135deg, #fb7185 0%, #f97316 100%)"
      toolName="Text Reverser"
      tagline="Text ko reverse karo — backwards reading ke liye fun & utility."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein apna text daalein.' },
        { heading: 'Reverse dekho', text: 'Output box mein reversed text instant appear hoga.' },
        { heading: 'Copy karo', text: 'Result copy karke kahin paste karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh words ko reverse karta hai?', a: 'Yeh tool characters ko reverse karta hai. Words ki order aur characters dono reverse ho jaate hain.' },
        { q: 'Kya yeh spacing maintain karta hai?', a: 'Haan, original spacing bhi reverse text mein reverse order mein appear hogi.' },
        { q: 'Ye useful kab hota hai?', a: 'Testing, puzzles, ya just fun ke liye reverse text generate karna useful hota hai.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/remove-extra-spaces', emoji: '🧼', name: 'Remove Extra Spaces' },
        { path: '/tools/text-sorter', emoji: '⬆️', name: 'Text Sorter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✍️ Input</div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Yahan apna text paste karo..."
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🔄 Reversed Text</div>
        <textarea
          value={reversed}
          readOnly
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy Reversed</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Text Reverser se aap fast way mein text backwards generate kar sakte hain. Yeh coding practice, puzzles, ya quirky social media posts ke liye useful hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Sometimes aapko boundary cases test karne honge — jaise palindrome check ya UI cases — aur reversed text se reveal hota hai ki aapka logic correctly handle kar raha hai ya nahi.
        </p>
      </div>
    </ToolWrapper>
  )
}

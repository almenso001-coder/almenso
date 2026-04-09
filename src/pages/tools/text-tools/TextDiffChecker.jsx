import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function computeDiff(a, b) {
  const linesA = a.split(/\r?\n/)
  const linesB = b.split(/\r?\n/)
  const length = Math.max(linesA.length, linesB.length)
  const rows = []
  for (let i = 0; i < length; i += 1) {
    const left = (linesA[i] || '').trimEnd()
    const right = (linesB[i] || '').trimEnd()
    const same = left === right
    rows.push({ left, right, same })
  }
  return rows
}

export default function TextDiffChecker() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')

  const diff = useMemo(() => computeDiff(textA, textB), [textA, textB])

  return (
    <ToolWrapper
      title="Text Diff Checker — Compare Two Texts"
      description="Compare two texts line-by-line and see what changed. Useful for reviewing edits, comparing versions, or spotting typos."
      keywords="text diff, compare text, difference checker, text comparison"
      emoji="🧩"
      heroColor="linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
      toolName="Text Diff Checker"
      tagline="Do texts compare karo — changes ko line-by-line highlight karein."
      guideSteps={[
        { heading: 'Text A paste karo', text: 'Pehla text box mein paste ya type karo.' },
        { heading: 'Text B paste karo', text: 'Doosra text box mein paste karo.' },
        { heading: 'Differences dekho', text: 'Tool line-by-line difference highlight karega.' },
      ]}
      faqs={[
        { q: 'Kya yeh exact match check karta hai?', a: 'Haan, yeh line-by-line exact match check karta hai aur differences dikhata hai.' },
        { q: 'Kya yeh word-level diff provide karta hai?', a: 'Is version mein sirf line-level comparison hota hai; word-level comparison future update mein add kiya ja sakta hai.' },
        { q: 'Kya blank lines count hote hain?', a: 'Haan, blank lines ko bhi compare kiya jata hai aur agar mismatch ho toh highlight hoga.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/text-reverser', emoji: '🔁', name: 'Text Reverser' },
        { path: '/tools/remove-extra-spaces', emoji: '🧼', name: 'Remove Extra Spaces' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📥 Text A</div>
        <textarea
          value={textA}
          onChange={e => setTextA(e.target.value)}
          placeholder="Pehla text yahan paste karo..."
          style={{ width: '100%', minHeight: 150, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📥 Text B</div>
        <textarea
          value={textB}
          onChange={e => setTextB(e.target.value)}
          placeholder="Doosra text yahan paste karo..."
          style={{ width: '100%', minHeight: 150, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🔍 Differences</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e5e7eb' }}>Text A</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e5e7eb' }}>Text B</th>
              </tr>
            </thead>
            <tbody>
              {diff.map((row, idx) => (
                <tr key={idx} style={{ background: row.same ? 'transparent' : '#fee2e2' }}>
                  <td style={{ padding: 8, verticalAlign: 'top', borderBottom: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{row.left}</td>
                  <td style={{ padding: 8, verticalAlign: 'top', borderBottom: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Text Diff Checker se aap quickly dekh sakte hain ki do versions mein kya changes hue hain. Yeh writers, editors, aur developers ke liye bahut useful hota hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Ye tool aapko manual comparison se bachata hai aur errors dhoondhne mein fast help karta hai. Aap line-by-line mismatch turant identify kar sakte hain.
        </p>
      </div>
    </ToolWrapper>
  )
}

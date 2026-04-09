import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function textToHTML(text) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)

  return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br />')}</p>`).join('\n')
}

export default function TextToHTMLConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const html = useMemo(() => textToHTML(text), [text])

  const copy = async () => {
    if (!html) return
    try {
      await navigator.clipboard.writeText(html)
      setMessage('Copied HTML!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  return (
    <ToolWrapper
      title="Text to HTML Converter — Convert Plain Text to HTML"
      description="Convert plain text to basic HTML paragraphs and line breaks. Great for quickly formatting copy for web pages and CMS editors."
      keywords="text to html, convert text to html, html formatter, paragraph converter"
      emoji="🧩"
      heroColor="linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)"
      toolName="Text to HTML Converter"
      tagline="Plain text ko HTML paragraphs aur line breaks mein badlo."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Textarea mein plain text paste karo.' },
        { heading: 'HTML dekho', text: 'Tool automatically paragraphs aur breaks add karega.' },
        { heading: 'Copy karo', text: 'HTML output copy karke website ya CMS mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh HTML sanitize karta hai?', a: 'Nahi. Yeh basic conversion karta hai. Agar aapko unsafe HTML sanitize karna hai toh additional tools use karein.' },
        { q: 'Kya yeh inline formatting add karega?', a: 'Nahi. Yeh sirf paragraph aur break tags add karta hai.' },
        { q: 'Kya multiple line breaks preserve hote hain?', a: 'Haan. Double line breaks paragraph create karte hain aur single line breaks <br /> mein convert hote hain.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/html-to-text-converter', emoji: '🧾', name: 'HTML to Text Converter' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✍️ Input</div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Yahan apna plain text paste karo..."
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">🌐 HTML Output</div>
        <textarea
          value={html}
          readOnly
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy HTML</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          Plain text ko HTML mein convert karne se aap easily CMS, blog editors, aur websites ke liye formatted content create kar sakte hain. Yeh tool manual HTML likhne ka time kam karta hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Specially helpful jab aap content copy/paste karte ho aur chahte ho ki formatting simple aur clean rahe — bina tags ko manually add kiye.
        </p>
      </div>
    </ToolWrapper>
  )
}

import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function htmlToText(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.innerText
}

export default function HTMLToTextConverter() {
  const [html, setHtml] = useState('')
  const [message, setMessage] = useState('')

  const text = useMemo(() => htmlToText(html), [html])

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied plain text!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  return (
    <ToolWrapper
      title="HTML to Text Converter — Strip HTML Tags"
      description="Convert HTML markup into plain text by stripping tags and preserving readable content. Perfect for extracting copy from web snippets."
      keywords="html to text, strip html, html stripper, plain text converter"
      emoji="🧾"
      heroColor="linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)"
      toolName="HTML to Text Converter"
      tagline="HTML tags remove karo, aur clean plain text pao."
      guideSteps={[
        { heading: 'HTML paste karo', text: 'Textarea mein apna HTML ya copy kiya hua content paste karo.' },
        { heading: 'Plain text dekho', text: 'Tool automatically tags remove karke plain text dikhata hai.' },
        { heading: 'Copy karo', text: 'Result copy karke apne editor ya document mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya HTML entities convert hoti hain?', a: 'Haan. Browser ke built-in HTML parser entities ko decode karta hai (e.g. &amp; -> &).' },
        { q: 'Kya inline styles ya scripts remove hoti hain?', a: 'Haan. Tool sirf visible text return karta hai; scripts aur style tags ignore ho jaate hain.' },
        { q: 'Kya ye universal HTML ko support karta hai?', a: 'Majority of HTML ko support karta hai, lekin complex proprietary tags ya JavaScript-generated content not supported hota hai.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/text-to-html-converter', emoji: '🧩', name: 'Text to HTML Converter' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🧩 HTML Input</div>
        <textarea
          value={html}
          onChange={e => setHtml(e.target.value)}
          placeholder="Yahan HTML snippet paste karo..."
          style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📄 Plain Text</div>
        <textarea
          value={text}
          readOnly
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#f8fafc', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="tw-calc-btn" onClick={copy}>📋 Copy Text</button>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">✅ Benefits</div>
        <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: '0.9rem' }}>
          HTML to text converter se aap quickly web content se sirf readable text extract kar sakte hain. Yeh copy/paste workflows ko simplify karta hai, especially jab aapko HTML tags hatani ho.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Ideal when you want to repurpose content from web pages, emails or CMS without markup getting in the way.
        </p>
      </div>
    </ToolWrapper>
  )
}

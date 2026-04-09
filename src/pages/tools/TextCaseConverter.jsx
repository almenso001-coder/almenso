import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

function toTitleCase(str) {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

function toSentenceCase(str) {
  return str
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
}

function toggleCase(str) {
  return str
    .split('')
    .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('')
}

export default function TextCaseConverter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const readingMin = words ? Math.max(1, Math.ceil(words / 200)) : 0
    return { chars, words, readingMin }
  }, [text])

  const apply = fn => {
    setText(fn(text))
    setMessage('Text converted!')
    setTimeout(() => setMessage(''), 1300)
  }

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard!')
      setTimeout(() => setMessage(''), 1300)
    } catch {}
  }

  return (
    <ToolWrapper
      title="Text Case Converter — Uppercase, Lowercase, Title Case"
      description="Text ko quickly convert karo — uppercase, lowercase, title/sentence case. Content editing, social media, description writing ke liye handy tool."
      keywords="text case converter, lowercase to uppercase, title case converter, sentence case, text formatting"
      emoji="🔤"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #2563eb 100%)"
      toolName="Text Case Converter"
      tagline="Text ko ek click mein convert karo — clean formatting for copy/paste." 
      guideSteps={[
        { heading: 'Text paste karo', text: 'Text area mein apna content paste karo ya type karo.' },
        { heading: 'Case select karo', text: 'Uppercase, lowercase, title case, sentence case ya toggle use karo.' },
        { heading: 'Copy karo', text: 'Result copy karke apne document ya post mein paste karo.' },
      ]}
      faqs={[
        { q: 'Title case kya hota hai?', a: 'Title case mein har important word capital hota hai — jaise “How To Use This Tool”.' },
        { q: 'Sentence case kya hota hai?', a: 'Sentence case mein har sentence ka pehla letter capital hota hai — baaki lower case.' },
        { q: 'Toggle case kya karta hai?', a: 'Toggle case har character ka case ulta kar deta hai — chahe uppercase ho ya lowercase.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
        { path: '/tools/ai-prompt-generator', emoji: '🧠', name: 'AI Prompt Generator' },
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

      <div className="tp-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <button className="tw-calc-btn" onClick={() => apply(s => s.toUpperCase())}>🔠 UPPERCASE</button>
        <button className="tw-calc-btn" onClick={() => apply(s => s.toLowerCase())}>🔡 lowercase</button>
        <button className="tw-calc-btn" onClick={() => apply(toTitleCase)}>🅰️ Title Case</button>
        <button className="tw-calc-btn" onClick={() => apply(toSentenceCase)}>📝 Sentence Case</button>
        <button className="tw-calc-btn" onClick={() => apply(toggleCase)}>🔄 Toggle Case</button>
        <button className="tw-calc-btn" onClick={copy} style={{ background: '#f0fdf4', color: '#15803d', border: '1.5px solid #16a34a' }}>📋 Copy</button>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Characters</span><span className="tw-brow-val">{stats.chars}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Approx. Reading Time</span><span className="tw-brow-val">{stats.readingMin} min</span></div>
        </div>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #16a34a', borderRadius: 12, padding: 12, color: '#166534', fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Text Formatting Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Text formatting professional aur readable content ke liye zaroori hai. Yeh guide aapko sikhaega ki kaise text ko properly format karein, kya case use kab karein, aur tools ka best use kaise karein.
          </p>

          <h3>1. Understanding Text Cases</h3>
          <p>
            <strong>Uppercase:</strong> Shouting ya headings ke liye. Overuse se aggressive lagta hai.<br />
            <strong>Lowercase:</strong> Casual writing, code. Formal mein avoid karo.<br />
            <strong>Title Case:</strong> Books, articles, headlines. Har important word capital.<br />
            <strong>Sentence Case:</strong> Normal writing. Har sentence ka pehla word capital.
          </p>

          <h3>2. When to Use Each Case</h3>
          <p>
            - <strong>Headlines:</strong> Title Case for SEO aur readability.<br />
            - <strong>Social Media:</strong> Sentence case for natural feel.<br />
            - <strong>Legal Documents:</strong> Sentence case with proper nouns capitalized.<br />
            - <strong>Code:</strong> Lowercase for variables, camelCase for functions.
          </p>

          <h3>3. Grammar Rules</h3>
          <p>
            Title case mein articles (a, an, the), prepositions (in, on, at), conjunctions (and, but, or) lowercase rakho unless pehla word ho. Proper nouns hamesha capital.
          </p>

          <h3>4. Tools aur Automation</h3>
          <p>
            Online tools jaise yeh fast hain. Word processors mein shortcuts use karo: Ctrl+Shift+U for uppercase. For bulk text, scripts ya tools better.
          </p>

          <h3>5. SEO Implications</h3>
          <p>
            Headlines title case se better CTR milta hai. Alt text, meta descriptions mein proper case use karo for accessibility.
          </p>

          <h3>6. Cultural Differences</h3>
          <p>
            English mein sentence case common, German mein nouns capital. Hindi mein proper nouns capital, lekin case sensitivity kam.
          </p>

          <h3>7. Best Practices</h3>
          <ul>
            <li>Consistency rakho document mein.</li>
            <li>Readability pe focus karo.</li>
            <li>Over-formatting avoid karo.</li>
            <li>Proofread after conversion.</li>
          </ul>

          <h3>8. Advanced Formatting</h3>
          <p>
            Markdown: # for headings, **bold**, *italic*. HTML: &lt;strong&gt; for emphasis. CSS: text-transform property.
          </p>

          <h3>9. Common Mistakes</h3>
          <p>
            - All caps for long text: Hard to read.<br />
            - Inconsistent capitalization in titles.<br />
            - Ignoring brand guidelines.
          </p>

          <h3>10. Future Trends</h3>
          <p>
            AI tools auto-format karenge. Voice-to-text mein case correction improve ho raha hai. 2026 mein multimodal content mein text formatting important rahega.
          </p>

          <p>
            Yeh tool basic conversions deta hai. Professional work ke liye style guides follow karo aur practice karo.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

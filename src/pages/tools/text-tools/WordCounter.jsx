import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function countSentences(text) {
  return (text.match(/[.!?]+/g) || []).length
}

function countParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean).length
}

function countLines(text) {
  return text.split(/\r?\n/).length
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const words = countWords(text)
    const sentences = countSentences(text)
    const paragraphs = countParagraphs(text)
    const lines = countLines(text)
    const readingMin = words ? Math.max(1, Math.ceil(words / 200)) : 0
    return { chars, words, sentences, paragraphs, lines, readingMin }
  }, [text])

  const copy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard!')
      setTimeout(() => setMessage(''), 1400)
    } catch {
      setMessage('Copy failed. Please try again.')
      setTimeout(() => setMessage(''), 1400)
    }
  }

  const clear = () => {
    setText('')
    setMessage('Text cleared!')
    setTimeout(() => setMessage(''), 1400)
  }

  return (
    <ToolWrapper
      title="Word Counter — Text Statistics & Readability Stats"
      description="Paste your text to see word count, character count, sentence count, paragraph count, line count and estimated reading time. Perfect for copywriters, students, writers and content creators."
      keywords="word counter, character counter, text statistics, reading time calculator, paragraph counter"
      emoji="📝"
      heroColor="linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)"
      toolName="Word Counter"
      tagline="Fast text insights — words, characters, sentences, paragraphs, lines."
      guideSteps={[
        { heading: 'Text paste karo', text: 'Niche wale box mein apna content paste karo ya yahan type karo.' },
        { heading: 'Stats dekho', text: 'Instantly aapko words, characters, sentences and paragraphs milenge.' },
        { heading: 'Copy / Clear', text: 'Result copy karein ya text clear karein with one click.' },
      ]}
      faqs={[
        { q: 'Word counter kya karta hai?', a: 'Yeh tool aapke text mein words, characters, sentences, paragraphs aur lines count karta hai.' },
        { q: 'Sentences kaise count hote hain?', a: 'Yeh tool full stops (.), question marks (?) aur exclamation marks (!) ko sentences ke signal ke roop mein count karta hai.' },
        { q: 'Reading time kaise calculate hota hai?', a: 'Tool assume karta hai ki average reader 200 words per minute padhta hai, aur uske hisaab se estimate deta hai.' },
      ]}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/text-case-converter', emoji: '🔤', name: 'Text Case Converter' },
        { path: '/tools/remove-duplicate-lines', emoji: '🧹', name: 'Duplicate Line Remover' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✍️ Text Input</div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Yahan apna text paste karo..."
          style={{ width: '100%', minHeight: 170, padding: 12, borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '0.9rem' }}
        />
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📊 Stats</div>
        <div className="tw-breakdown">
          <div className="tw-brow"><span className="tw-brow-label">Words</span><span className="tw-brow-val">{stats.words}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Characters</span><span className="tw-brow-val">{stats.chars}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Sentences</span><span className="tw-brow-val">{stats.sentences}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Paragraphs</span><span className="tw-brow-val">{stats.paragraphs}</span></div>
          <div className="tw-brow"><span className="tw-brow-label">Lines</span><span className="tw-brow-val">{stats.lines}</span></div>
          <div className="tw-brow total"><span className="tw-brow-label">Estimated reading time</span><span className="tw-brow-val">{stats.readingMin} min</span></div>
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
          Word Counter tool se aap turant apna writing workflow speed bada sakte hain. Content writers aur students ke liye word aur character limit track karna zaroori hota hai. Ek glance mein aapko pata chal jaata hai ki kitna text hai, kitni reading time lagegi, aur kaunse sections ko concise banana hai.
        </p>
        <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
          Blog posts, reports, social media captions aur assignments mein proper length maintain karne se readability aur engagement badhti hai. Ye tool aapko smart decisions lene mein help karta hai bina kisi extra software ke.
        </p>
      </div>
    </ToolWrapper>
  )
}

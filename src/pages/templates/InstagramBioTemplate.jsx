import React, { useMemo, useState } from 'react'
import SEOHead from '../../components/SEOHead'
import './InstagramBioTemplate.css'

const CATEGORIES = [
  'Influencer',
  'Business',
  'Fitness',
  'Motivation',
  'Travel',
]

const EMOJI_STYLES = [
  { key: 'minimal', label: 'Minimal' },
  { key: 'fun', label: 'Fun' },
  { key: 'professional', label: 'Professional' },
]

const TEMPLATES = [
  (p) => `${p.emoji} ${p.name} · ${p.category}`,
  (p) => `${p.emoji} ${p.name} — ${p.category} | ${p.keywords}`,
  (p) => `${p.emoji} ${p.name} | ${p.category} | ${p.keywords}`,
  (p) => `${p.emoji} ${p.name} • ${p.category}\n${p.keywords}`,
  (p) => `${p.emoji} ${p.name} | ${p.keywords} | ${p.category}`,
]

function pickEmoji(style) {
  if (style === 'minimal') return '✨'
  if (style === 'fun') return '🔥'
  if (style === 'professional') return '💼'
  return '🌟'
}

export default function InstagramBioTemplate() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [keywords, setKeywords] = useState('')
  const [emojiStyle, setEmojiStyle] = useState(EMOJI_STYLES[0].key)

  const emoji = useMemo(() => pickEmoji(emojiStyle), [emojiStyle])

  const params = useMemo(() => ({ name: name.trim() || 'Your Name', category, keywords: keywords.trim() || 'Your keywords' }), [name, category, keywords])

  const bios = useMemo(() => {
    return TEMPLATES.map((t, idx) => {
      const raw = t({ ...params, emoji })
      const cleaned = raw.replace(/\s{2,}/g, ' ').trim()
      return cleaned
    })
  }, [params, emoji])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const [copiedIndex, setCopiedIndex] = useState(-1)

  const handleCopy = async (idx) => {
    const ok = await copyToClipboard(bios[idx])
    if (ok) {
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(-1), 2400)
    }
  }

  return (
    <div className="igbio-page">
      <SEOHead
        title="Free Instagram Bio Template Generator – Create Stylish Instagram Bios"
        description="Generate stylish Instagram bios instantly with our free Instagram bio template generator. Perfect for influencers, businesses and creators."
      />

      <header className="igbio-hero">
        <h1>Instagram Bio Template Generator</h1>
        <p className="igbio-subtitle">
          Create attention-grabbing Instagram bios in seconds. Fill the fields and get multiple bio ideas instantly.
        </p>
      </header>

      <section className="igbio-tool">
        <div className="igbio-grid">
          <form className="igbio-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name or brand" />
            </div>

            <div className="form-row">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label>Keywords</label>
              <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="fitness, motivation, travel" />
            </div>

            <div className="form-row">
              <label>Emoji Style</label>
              <select value={emojiStyle} onChange={(e) => setEmojiStyle(e.target.value)}>
                {EMOJI_STYLES.map((opt) => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>
          </form>

          <div className="igbio-results">
            <div className="igbio-results-header">
              <h2>Generated Bio Ideas</h2>
              <p>Tap copy to use any bio instantly.</p>
            </div>
            <div className="igbio-cards">
              {bios.map((bio, idx) => (
                <div key={idx} className="igbio-card">
                  <div className="igbio-card-text">{bio}</div>
                  <button
                    className={`igbio-copy ${copiedIndex === idx ? 'copied' : ''}`}
                    onClick={() => handleCopy(idx)}
                  >
                    {copiedIndex === idx ? 'Copied!' : 'Copy Bio'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="igbio-info">
          <h2>How to create a great Instagram bio</h2>
          <p>
            A great Instagram bio is clear, concise, and shows your personality or brand. Use keywords that describe what you do, and choose a style that matches your audience — whether that&apos;s professional, fun, or focused on motivation.
            Keep it short and use emojis to make it readable. This generator creates multiple bio ideas so you can pick the one that feels right.
          </p>

          <h2>Best tips for Instagram bios</h2>
          <p>
            Use a strong first line to grab attention (e.g., “Fitness coach helping you get stronger”). Add a quick summary of what you offer and end with a call to action like “DM for collab” or “Link below”. Keeping your keywords in mind makes your profile easier to find.
          </p>

          <h2>FAQ</h2>
          <h3>Can I copy a bio easily?</h3>
          <p>
            Yes — just click the “Copy Bio” button next to any bio result and paste it into your Instagram profile.
          </p>
          <h3>How many bios can I generate?</h3>
          <p>
            The tool shows at least 5 ready-to-use bios, and you can update the input fields anytime to generate new options instantly.
          </p>
          <h3>Is my data saved?</h3>
          <p>
            No. Everything stays in your browser and is not stored on a server. You can refresh the page to reset the form.
          </p>
        </div>
      </section>
    </div>
  )
}

import React, { useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const TITLE_TEMPLATES = [
  { id: 'howto', label: 'How-To Guide', template: 'How to {topic} in {time} - Complete Guide {year}' },
  { id: 'review', label: 'Product Review', template: '{product} Review {year} - Pros, Cons & Honest Opinion' },
  { id: 'tips', label: 'Tips & Tricks', template: '{number} Best {topic} Tips & Tricks That Actually Work' },
  { id: 'vs', label: 'Comparison', template: '{item1} vs {item2} - Which One Should You Choose? {year}' },
  { id: 'tutorial', label: 'Tutorial', template: '{topic} Tutorial for Beginners - Step by Step Guide' },
  { id: 'myth', label: 'Myth Busting', template: '{topic} Myths Busted - What Really Works?' },
  { id: 'hack', label: 'Life Hack', template: '{topic} Hack That Changed My Life' },
  { id: 'update', label: 'Latest Update', template: '{topic} {year} Update - Everything You Need to Know' },
]

const POWER_WORDS = [
  'Secret', 'Shocking', 'Amazing', 'Unbelievable', 'Insane', 'Crazy', 'Epic', 'Ultimate',
  'Hidden', 'Forbidden', 'Powerful', 'Extreme', 'Intense', 'Mind-Blowing', 'Life-Changing',
  'Revolutionary', 'Breakthrough', 'Game-Changing', 'Incredible', 'Unstoppable', 'Magnetic'
]

export default function YouTubeTitleGenerator() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('howto')
  const [time, setTime] = useState('5 Minutes')
  const [number, setNumber] = useState('10')
  const [product, setProduct] = useState('')
  const [item1, setItem1] = useState('')
  const [item2, setItem2] = useState('')
  const [powerWord, setPowerWord] = useState('')
  const [customPower, setCustomPower] = useState('')
  const [titles, setTitles] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(-1)

  const generateTitles = () => {
    if (!topic.trim()) return

    const selectedTemplate = TITLE_TEMPLATES.find(t => t.id === style)
    if (!selectedTemplate) return

    const pw = customPower.trim() || powerWord || ''
    const year = new Date().getFullYear()

    const generatedTitles = []

    // Generate multiple variations
    for (let i = 0; i < 8; i++) {
      let title = selectedTemplate.template
        .replace('{topic}', topic)
        .replace('{time}', time)
        .replace('{number}', number)
        .replace('{product}', product || topic)
        .replace('{item1}', item1 || topic)
        .replace('{item2}', item2 || topic)
        .replace('{year}', year)

      // Add power word randomly
      if (pw && Math.random() > 0.5) {
        title = `${pw} ${title}`
      }

      // Add emojis randomly
      const emojis = ['🔥', '💯', '🚀', '⚡', '🎯', '💡', '📈', '🎬']
      if (Math.random() > 0.6) {
        title = `${title} ${emojis[Math.floor(Math.random() * emojis.length)]}`
      }

      generatedTitles.push(title)
    }

    setTitles(generatedTitles)
  }

  const copyTitle = async (title, index) => {
    try {
      await navigator.clipboard.writeText(title)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(-1), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const getTemplateFields = () => {
    switch (style) {
      case 'howto':
        return (
          <div className="tw-field">
            <label>⏱️ Time Required</label>
            <select value={time} onChange={e => setTime(e.target.value)}>
              <option>5 Minutes</option>
              <option>10 Minutes</option>
              <option>15 Minutes</option>
              <option>30 Minutes</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
            </select>
          </div>
        )
      case 'tips':
        return (
          <div className="tw-field">
            <label>🔢 Number of Tips</label>
            <select value={number} onChange={e => setNumber(e.target.value)}>
              <option>5</option>
              <option>7</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
            </select>
          </div>
        )
      case 'review':
        return (
          <div className="tw-field">
            <label>📦 Product Name</label>
            <input value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. iPhone 15, MacBook Pro" />
          </div>
        )
      case 'vs':
        return (
          <>
            <div className="tw-field">
              <label>⚖️ Item 1</label>
              <input value={item1} onChange={e => setItem1(e.target.value)} placeholder="e.g. Android" />
            </div>
            <div className="tw-field">
              <label>⚖️ Item 2</label>
              <input value={item2} onChange={e => setItem2(e.target.value)} placeholder="e.g. iOS" />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <ToolWrapper
      title="YouTube Title Generator — Viral Title Banayein"
      description="Click-worthy YouTube titles instantly generate karo. Templates, power words aur emojis se viral titles banao."
      keywords="youtube title generator, viral youtube titles, youtube seo, clickbait titles, youtube thumbnail text"
      emoji="🎬"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #ef4444 100%)"
      toolName="YouTube Title Generator"
      tagline="Viral Titles · Power Words · Click-Worthy Headlines"
      guideSteps={[
        { heading: 'Topic daalo', text: 'Apna video topic ya niche enter karo.' },
        { heading: 'Style choose karo', text: 'How-to, review, tips etc. se template select karo.' },
        { heading: 'Power word add karo', text: 'Secret, Amazing, Shocking etc. se title ko powerful banao.' },
        { heading: 'Titles generate karo', text: '8 different variations milenge — best choose karo.' },
      ]}
      faqs={[
        { q: 'YouTube title kitna lamba hona chahiye?', a: '60 characters se kam ideal. Mobile pe 40-50 characters best perform karte hain.' },
        { q: 'Clickbait titles use karna chahiye?', a: 'Thoda clickbait ok hai lekin content match karna zaroori — warna viewer disappoint hoga.' },
        { q: 'Power words kyun important hain?', a: 'Power words curiosity aur emotion trigger karte hain — CTR 20-30% badha sakte hain.' },
        { q: 'Emoji use karna chahiye?', a: 'Haan, relevant emojis CTR badhate hain lekin zyada mat use karo.' },
      ]}
      relatedBlog={{ slug: 'youtube-thumbnail-best-practices', title: 'YouTube Thumbnail Best Practices', excerpt: 'Thumbnail design tips aur size guides.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/youtube-thumbnail-extractor', emoji: '🎬', name: 'YouTube Thumbnail Extractor' },
        { path: '/tools/content-idea-generator', emoji: '💡', name: 'Content Idea Generator' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎯 Generate YouTube Titles</div>
        <div className="tw-input-group">
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>📝 Video Topic / Niche</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. weight loss, photography, cooking"
            />
          </div>
          <div className="tw-field">
            <label>🎨 Title Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)}>
              {TITLE_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
          {getTemplateFields()}
          <div className="tw-field">
            <label>💪 Power Word (optional)</label>
            <select value={powerWord} onChange={e => setPowerWord(e.target.value)}>
              <option value="">None</option>
              {POWER_WORDS.map(word => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>
          </div>
          <div className="tw-field">
            <label>✏️ Custom Power Word</label>
            <input
              value={customPower}
              onChange={e => setCustomPower(e.target.value)}
              placeholder="e.g. Ultimate, Hidden, Crazy"
            />
          </div>
          <button
            className="tw-calc-btn"
            onClick={generateTitles}
            disabled={!topic.trim()}
            style={{ flex: '1 1 100%' }}
          >
            ⚡ Generate Titles
          </button>
        </div>
      </div>

      {titles.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">📋 Generated Titles ({titles.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {titles.map((title, index) => (
              <div
                key={index}
                style={{
                  padding: 12,
                  border: '1.5px solid #e5e7eb',
                  borderRadius: 8,
                  background: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>
                  {title}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#666', minWidth: 40 }}>
                  {title.length} chars
                </div>
                <button
                  onClick={() => copyTitle(title, index)}
                  style={{
                    padding: '6px 10px',
                    background: copiedIndex === index ? '#16a34a' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {copiedIndex === index ? '✅' : '📋'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 YouTube Title Optimization Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            YouTube title ek chhota sa sentence hai jo aapke video ki fate decide karta hai. Millions of videos mein se sirf title aur thumbnail se viewer decide karta hai ki woh click karega ya nahi. Yeh guide aapko sikhaega ki kaise perfect YouTube titles banayein jo CTR badhayein aur views laayein.
          </p>

          <h3>1. Title Length Matters</h3>
          <p>
            YouTube title ka ideal length 60 characters se kam hona chahiye. Mobile pe 40-50 characters best perform karte hain. Agar title zyada lamba ho toh YouTube use truncate kar deta hai aur "..." add kar deta hai, jo CTR kam kar deta hai.
          </p>
          <p>
            Example: "How to Lose Weight Fast - 5 Minute Daily Routine" (45 chars) vs "How to Lose Weight Fast in Just 5 Minutes Daily Routine That Actually Works" (70+ chars - truncated)
          </p>

          <h3>2. Power Words Use Karo</h3>
          <p>
            Power words curiosity aur emotion trigger karte hain. Yeh words viewer ko compel karte hain ki woh click kare. Examples: Secret, Shocking, Amazing, Unbelievable, Insane, Crazy, Epic, Ultimate, Hidden, Forbidden.
          </p>
          <p>
            Research kehta hai ki power words se CTR 20-30% tak badh sakta hai. Lekin use karo intelligently — content se match karna zaroori hai warna viewer disappoint hoga.
          </p>

          <h3>3. Numbers Add Karo</h3>
          <p>
            Numbers specific aur actionable lagte hain. "10 Tips" better hai "Some Tips" se. People numbers ko prefer karte hain kyunki woh clear expectation set karte hain.
          </p>
          <ul>
            <li>✅ "7 Ways to Save Money"</li>
            <li>✅ "Top 10 Productivity Hacks"</li>
            <li>❌ "Ways to Save Money"</li>
          </ul>

          <h3>4. Question Marks Use Karo</h3>
          <p>
            Questions curiosity create karte hain. "Is This the Best Camera?" better hai "Best Camera Review" se. Questions engage karte hain aur click karwane mein help karte hain.
          </p>

          <h3>5. Emojis Ka Smart Use</h3>
          <p>
            Emojis visual appeal badhate hain aur CTR improve karte hain. Lekin use karo relevant places pe. Har title mein emoji nahi daalna chahiye. 1-2 emojis per title sufficient hain.
          </p>
          <p>
            Popular emojis: 🔥 (trending), 💯 (perfect), 🚀 (growth), ⚡ (fast), 🎯 (target), 💡 (idea)
          </p>

          <h3>6. Keywords Include Karo</h3>
          <p>
            Title mein primary keyword hona chahiye. Yeh SEO ke liye zaroori hai. Keyword naturally place karo — forced lagna nahi chahiye. Secondary keywords bhi add kar sakte hain agar space ho.
          </p>

          <h3>7. Different Title Formats</h3>
          <p>
            Har content type ke liye different title format best hota hai:
          </p>
          <ul>
            <li><strong>How-To:</strong> "How to X in Y Time"</li>
            <li><strong>Review:</strong> "X Review 2026 - Honest Opinion"</li>
            <li><strong>Tips:</strong> "X Best Tips That Work"</li>
            <li><strong>Comparison:</strong> "X vs Y - Which is Better?"</li>
          </ul>

          <h3>8. A/B Testing Karo</h3>
          <p>
            Ek video ke liye multiple titles test karo. YouTube ka end screen aur cards feature use karke different titles try karo. Dekho kaunsa better perform karta hai.
          </p>

          <h3>9. Avoid These Mistakes</h3>
          <ul>
            <li>Clickbait: Promise jo deliver nahi kar sakte</li>
            <li>All caps: SHOCKING NEWS — spam lagta hai</li>
            <li>Too many emojis: 🔥💯🚀⚡🎯 — cluttered lagta hai</li>
            <li>Generic titles: "My Video" — boring</li>
          </ul>

          <h3>10. Title aur Thumbnail Match</h3>
          <p>
            Title aur thumbnail ek saath kaam karte hain. Agar title mein "Shocking Results" likha hai toh thumbnail pe bhi woh reflect hona chahiye. Consistency important hai.
          </p>

          <h3>11. Seasonal Titles</h3>
          <p>
            Festivals aur seasons ka leverage lo. "Diwali Special" ya "Summer Weight Loss" titles better perform karte hain relevant time pe.
          </p>

          <h3>12. Analytics Dekho</h3>
          <p>
            YouTube Analytics mein CTR dekho. Agar kisi title ka CTR low hai toh change karo. Continuous improvement zaroori hai.
          </p>

          <p>
            Yeh tool aapko quick start deta hai. Templates use karo, power words add karo, aur apne style develop karo. Practice se perfect titles banenge. Remember, great title sirf half battle jita hai — content bhi amazing hona chahiye!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}
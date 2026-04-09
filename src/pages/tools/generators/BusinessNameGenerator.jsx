import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const SUFFIXES = ['Hub', 'Works', 'Labs', 'Studio', 'Co', 'Space', 'Box', 'Nest', 'Forge', 'Craft']
const PREFIXES = ['Smart', 'Quick', 'Bright', 'Prime', 'True', 'Neo', 'Fresh', 'Pure', 'Urban', 'Bold']

export default function BusinessNameGenerator() {
  const [keywords, setKeywords] = useState('')
  const [industry, setIndustry] = useState('')
  const [names, setNames] = useState([])

  const generate = () => {
    const base = keywords.trim().split(/\s+/).slice(0, 2).join('')
    const ind = industry.trim().split(/\s+/)[0] || ''
    const results = new Set()

    for (let i = 0; i < 10 && results.size < 6; i++) {
      const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)]
      const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]
      const combo = `${prefix}${base}${ind}${suffix}`.replace(/\s+/g, '')
      results.add(combo)
    }

    setNames(Array.from(results))
  }

  return (
    <ToolWrapper
      title="Business Name Generator — Name Your Startup"
      description="Generate brand-worthy business name ideas instantly. Great for startups, freelancers, and small businesses."
      keywords="business name generator, company name ideas, startup name generator"
      emoji="🏷️"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Business Name Generator"
      tagline="Get creative name ideas for your business in seconds."
      guideSteps={[
        { heading: 'Describe your business', text: 'Add keywords about what you do.' },
        { heading: 'Add industry', text: 'Optional, helps with relevant ideas.' },
        { heading: 'Generate names', text: 'Get a list of brandable names instantly.' },
      ]}
            affCategory="finance"
      hasResult={true}
      faqs={[
        { q: 'Are these names trademarked?', a: 'No. Use the suggestions as inspiration and run a proper trademark and domain check before using.' },
        { q: 'Can I use these for a domain?', a: 'Yes, but first check domain availability as many short names may already be taken.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">💡 Business Name Ideas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Keywords (what your business does)</label>
            <input
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="e.g. coffee, design, travel"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label>Industry (optional)</label>
            <input
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              placeholder="e.g. fashion, tech, food"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🧠 Generate Business Names
          </button>

          {names.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Suggested Names</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {names.map(name => (
                  <button
                    key={name}
                    style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', textAlign: 'left', cursor: 'pointer', background: '#f8fafc' }}
                    onClick={() => navigator.clipboard.writeText(name)}
                  >
                    <div style={{ fontWeight: 700 }}>{name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>Tap to copy</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Enter a few keywords that describe your business and optionally the industry you operate in. Then click "Generate" to get a set of name ideas. Each name combines your keywords with popular startup suffixes and prefixes, giving you brandable options you can test across social media and web domains.
        </p>

        <h2>Benefits</h2>
        <p>
          A strong business name makes you memorable and helps you stand out. This tool gives you fast, creative, and modern name ideas without needing branding expertise. It is especially helpful when you are stuck in a naming rut or when you want to validate multiple concepts quickly.
        </p>
        <p>
          Once you find names you like, check for domain availability and social media handles. A consistent name across platforms helps build trust and makes it easier for customers to find you.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I use these names as-is?</strong><br />
          A: These are just suggestions. Always check for trademark conflicts and domain availability before finalizing a name.
        </p>
        <p>
          <strong>Q: How can I make the name more unique?</strong><br />
          A: Add your location, a niche word, or a personal twist to the suggestions.
        </p>
      </div>
    </ToolWrapper>
  )
}

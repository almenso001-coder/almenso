import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function UsernameGenerator() {
  const [input, setInput] = useState('')
  const [count, setCount] = useState(5)
  const [usernames, setUsernames] = useState([])

  const makeUsername = (parts) => {
    const base = parts.filter(Boolean).join('')
    const suffix = Math.floor(100 + Math.random() * 900)
    return `${base}${suffix}`.toLowerCase().replace(/[^a-z0-9]/g, '')
  }

  const generate = () => {
    const parts = input.split(/\s+/).slice(0, 3)
    if (!parts.length) {
      setUsernames([])
      return
    }
    const results = new Set()
    while (results.size < Math.min(count, 10)) {
      results.add(makeUsername(parts))
    }
    setUsernames(Array.from(results))
  }

  return (
    <ToolWrapper
      title="Username Generator — Unique Username Ideas"
      description="Instant unique username suggestions for social profiles, gaming tags, and online accounts."
      keywords="username generator, social media username, gamer tag, unique username"
      emoji="👤"
      heroColor="linear-gradient(135deg, #334155 0%, #1e293b 100%)"
      toolName="Username Generator"
      tagline="Generate catchy usernames instantly."
      guideSteps={[
        { heading: 'Enter keywords', text: 'Type your name, hobby, or interest.' },
        { heading: 'Choose how many', text: 'Select how many usernames you want.' },
        { heading: 'Generate', text: 'Get a list of ready-to-use username ideas.' },
        { heading: 'Copy and use', text: 'Tap to copy and paste into your profile.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Can I use these usernames anywhere?', a: 'Yes, but availability depends on the platform. Try copying the name and pasting it in the site/app to check.' },
        { q: 'Why are numbers added?', a: 'Numbers help make the username unique and reduce the chance it is already taken.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🔎 Username Ideas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Keywords (name / hobby / interest)</label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g. travel cafe photographer"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label>How many usernames?</label>
            <input
              type="number"
              value={count}
              min={1}
              max={10}
              onChange={e => setCount(Number(e.target.value))}
              style={{ width: 120, padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🎲 Generate Usernames
          </button>

          {usernames.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Suggestions</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {usernames.map(u => (
                  <button
                    key={u}
                    style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', textAlign: 'left', cursor: 'pointer', background: '#f8fafc' }}
                    onClick={() => navigator.clipboard.writeText(u)}
                  >
                    <div style={{ fontWeight: 700 }}>{u}</div>
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
          Enter keywords related to your name, hobby, brand, or interest. This tool mixes your words with random numbers and simple patterns so you get a batch of username ideas in one click. Use the copy buttons to paste the username directly into social media profiles, game accounts, or messaging apps. If a name is already taken, generate again for more unique options.
        </p>

        <h2>Benefits</h2>
        <p>
          A good username helps you stand out online and makes it easy for others to remember you. This generator saves time by giving you ready-made suggestions. It reduces guesswork and helps you avoid generic names like "user123". You can also use it to brainstorm handles for new projects, blogs, streaming channels, or gaming accounts.
        </p>
        <p>
          Try combining nouns and verbs, adding your favorite number, or using a hobby word to make the username more personal. If one style doesn’t fit, generate again until you find one that resonates with your brand and feels easy to type.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I use these suggestions for brand names?</strong><br />
          A: The generator is meant for usernames; for trademarks or business names, do a proper availability and trademark search.
        </p>
        <p>
          <strong>Q: Why are numbers added?</strong><br />
          A: Numbers make the username more unique so it is more likely to be available across platforms.
        </p>
      </div>
    </ToolWrapper>
  )
}

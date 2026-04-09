import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const FIRST_NAMES = ['Aarav', 'Sneha', 'Rohan', 'Maya', 'Kunal', 'Ananya', 'Vikram', 'Isha', 'Arjun', 'Neha', 'Riya', 'Sachin', 'Priya', 'Kabir', 'Aisha']
const LAST_NAMES = ['Sharma', 'Patel', 'Gupta', 'Singh', 'Mehta', 'Malhotra', 'Verma', 'Khan', 'Iyer', 'Nair', 'Desai', 'Joshi', 'Bhatia', 'Reddy', 'Kapoor']

export default function RandomNameGenerator() {
  const [count, setCount] = useState(5)
  const [names, setNames] = useState([])

  const generate = () => {
    const results = new Set()
    while (results.size < Math.min(count, 20)) {
      const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
      const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
      results.add(`${first} ${last}`)
    }
    setNames(Array.from(results))
  }

  return (
    <ToolWrapper
      title="Random Name Generator — Instant Name Ideas"
      description="Generate random names for characters, mock data, testing, and creative projects."
      keywords="random name generator, fake name generator, name ideas, test data"
      emoji="👥"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Random Name Generator"
      tagline="Generate realistic name combinations fast."
      guideSteps={[
        { heading: 'Set how many names', text: 'Choose how many names you need.' },
        { heading: 'Generate names', text: 'Click to instantly create name combinations.' },
        { heading: 'Copy as needed', text: 'Tap a name to copy it to clipboard.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Can I use these names for test data?', a: 'Yes, they are meant for mock data, story writing, and idea generation — not for real identity use.' },
        { q: 'Can I change the name lists?', a: 'This tool uses a built-in list; you can adjust the source code to add more names if you host it yourself.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🧾 Generated Names</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 180px' }}>
            <label>Number of names</label>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>
          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, height: 46, alignSelf: 'flex-end' }}
          >
            🎲 Generate Names
          </button>
        </div>

        {names.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Click a name to copy</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {names.map(n => (
                <button
                  key={n}
                  onClick={() => navigator.clipboard.writeText(n)}
                  style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', textAlign: 'left', cursor: 'pointer', background: '#f8fafc' }}
                >
                  <div style={{ fontWeight: 700 }}>{n}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Choose how many names you want and click "Generate". The tool combines first and last names to produce a set of realistic-sounding name options. Click any name to copy it to your clipboard instantly.
        </p>

        <h2>Benefits</h2>
        <p>
          Random names are useful for testing software, creating fictional characters, seeding databases, or writing stories. This generator gives you quick, varied name combinations without the need to think of them manually.
        </p>
        <p>
          Use the names to populate forms quickly during development, create persona sketches, or generate identity samples for games and fiction. It saves time and keeps your work collection looking diverse.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I use these names for real people?</strong><br />
          A: These are randomly generated and not tied to real identities. If you need real names, use approved datasets or services.
        </p>
        <p>
          <strong>Q: How can I get more varied names?</strong><br />
          A: You can adjust the source lists in the code if you are hosting the tool yourself or use additional name pools for different regions.
        </p>
      </div>
    </ToolWrapper>
  )
}

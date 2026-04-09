import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'mail.com', 'example.com']

export default function FakeEmailGenerator() {
  const [name, setName] = useState('')
  const [count, setCount] = useState(5)
  const [emails, setEmails] = useState([])

  const generate = () => {
    const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
    if (!clean) {
      setEmails([])
      return
    }

    const results = new Set()
    while (results.size < Math.min(count, 12)) {
      const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)]
      const suffix = Math.floor(10 + Math.random() * 90)
      results.add(`${clean}${suffix}@${domain}`)
    }
    setEmails(Array.from(results))
  }

  return (
    <ToolWrapper
      title="Fake Email Generator — Create Test Emails"
      description="Generate realistic dummy email addresses for testing and mock data."
      keywords="fake email generator, dummy email, test email, sample email"
      emoji="📧"
      heroColor="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      toolName="Fake Email Generator"
      tagline="Create placeholder email addresses instantly."
      guideSteps={[
        { heading: 'Enter a base name', text: 'Type a name, keyword, or alias.' },
        { heading: 'Pick how many', text: 'Choose how many email suggestions you need.' },
        { heading: 'Generate', text: 'Copy the emails for testing or demo purposes.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Are these real emails?', a: 'No, these are randomly generated and may not exist. Use them for testing only.' },
        { q: 'Can I use them for signups?', a: 'Do not use them for real accounts as they may not be deliverable and could conflict with actual addresses.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📬 Email Suggestions</div>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label>Base name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. johnsmith, techguru, designer"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label>Count</label>
            <input
              type="number"
              min={1}
              max={12}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              style={{ width: 120, padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🧪 Generate Emails
          </button>

          {emails.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Generated Emails</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {emails.map(email => (
                  <button
                    key={email}
                    onClick={() => navigator.clipboard.writeText(email)}
                    style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', textAlign: 'left', cursor: 'pointer', background: '#f8fafc' }}
                  >
                    <div style={{ fontWeight: 700 }}>{email}</div>
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
          Enter a base name or keyword and click "Generate". The tool creates a list of plausible-looking email addresses by combining the base with random numbers and common domains. Copy the ones you need for testing or demo data.
        </p>

        <h2>Benefits</h2>
        <p>
          Fake emails are useful for testing forms, building mock invoices, or generating sample data without using real user information. This tool quickly gives you multiple options without manual typing.
        </p>
        <p>
          Use these emails to populate demos, automated tests, or sample datasets. They are a quick way to avoid accidental data leaks while still having realistic-looking content.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I use these for real accounts?</strong><br />
          A: These are not guaranteed to exist, so they should only be used for testing and placeholders.
        </p>
        <p>
          <strong>Q: Where can I check if an email is valid?</strong><br />
          A: You can use email verification services, but for mock data, they don’t need to be real.
        </p>
      </div>
    </ToolWrapper>
  )
}

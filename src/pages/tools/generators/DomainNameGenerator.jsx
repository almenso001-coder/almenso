import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const TLDs = ['.com', '.net', '.io', '.co', '.org', '.tech', '.app']
const ADDONS = ['hub', 'space', 'zone', 'world', 'now', 'lab', 'pro', 'shop']

export default function DomainNameGenerator() {
  const [base, setBase] = useState('')
  const [tld, setTld] = useState('.com')
  const [suggestions, setSuggestions] = useState([])

  const generate = () => {
    const clean = base.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
    if (!clean) {
      setSuggestions([])
      return
    }

    const results = new Set()
    ADDONS.forEach(addon => {
      results.add(`${clean}${addon}${tld}`)
      results.add(`${addon}${clean}${tld}`)
    })

    results.add(`${clean}${tld}`)
    setSuggestions(Array.from(results).slice(0, 8))
  }

  return (
    <ToolWrapper
      title="Domain Name Generator — Find Available Domain Ideas"
      description="Generate domain name ideas instantly. Great for startups, blogs, and side projects."
      keywords="domain name generator, domain ideas, domain name suggestions, available domains"
      emoji="🌐"
      heroColor="linear-gradient(135deg, #0e3b5a 0%, #0f172a 100%)"
      toolName="Domain Name Generator"
      tagline="Get domain suggestions in seconds."
      guideSteps={[
        { heading: 'Enter a name idea', text: 'Type keywords or your project title.' },
        { heading: 'Pick a TLD', text: 'Choose common extensions like .com, .io etc.' },
        { heading: 'Generate ideas', text: 'See a list of domain name suggestions.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Are these domains available?', a: 'This tool generates ideas only. Check availability on a domain registrar before buying.' },
        { q: 'What is a TLD?', a: 'TLD stands for Top-Level Domain (like .com, .net, .io). It’s the end of a domain name.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🌐 Domain Suggestions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Base name</label>
            <input
              value={base}
              onChange={e => setBase(e.target.value)}
              placeholder="e.g. travelblog, appsmith, greentech"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label>Choose TLD</label>
            <select
              value={tld}
              onChange={e => setTld(e.target.value)}
              style={{ width: 160, padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            >
              {TLDs.map(ext => (
                <option key={ext} value={ext}>{ext}</option>
              ))}
            </select>
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            🌍 Generate Domain Ideas
          </button>

          {suggestions.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Try these</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {suggestions.map(domain => (
                  <button
                    key={domain}
                    style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', textAlign: 'left', cursor: 'pointer', background: '#f8fafc' }}
                    onClick={() => navigator.clipboard.writeText(domain)}
                  >
                    <div style={{ fontWeight: 700 }}>{domain}</div>
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
          Enter a keyword or brand name idea and select a top-level domain (TLD) like .com, .io, or .net. Click "Generate" to see a list of domain name combinations. Copy any suggestion to quickly check availability on your preferred domain registrar.
        </p>

        <h2>Benefits</h2>
        <p>
          Finding the right domain name is key to building your online presence. This generator saves you time by producing options that are clean, modern, and easy to remember. It helps you explore alternatives without getting stuck on a single idea.
        </p>
        <p>
          A good domain boosts your SEO and makes your site easier to share. Aim for something short, brandable, and easy to spell, and consider reserving multiple extensions to protect your brand.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Can I buy these domains directly here?</strong><br />
          A: No, this tool only suggests ideas. Use a domain registrar like GoDaddy, Namecheap, or Google Domains to purchase.
        </p>
        <p>
          <strong>Q: Should I always choose .com?</strong><br />
          A: .com is the most recognized, but niche TLDs like .app, .tech, or .co can work well depending on your audience.
        </p>
      </div>
    </ToolWrapper>
  )
}

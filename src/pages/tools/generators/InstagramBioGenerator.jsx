import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function InstagramBioGenerator() {
  const [keywords, setKeywords] = useState('')
  const [style, setStyle] = useState('fun')
  const [bio, setBio] = useState('')

  const generate = () => {
    const words = keywords.trim().split(/\s+/).slice(0, 6)
    const base = words.join(' ') || 'life, travel, passion'
    const tone = style === 'fun' ? '✨' : style === 'professional' ? '💼' : '🌿'

    setBio(`${tone} ${base} | Dreamer | Doer\n📍 Based in [Your City]\n👇 Tap to connect`)  
  }

  return (
    <ToolWrapper
      title="Instagram Bio Generator — Write a Better Bio"
      description="Generate Instagram bio ideas that match your personality and help grow your profile."
      keywords="instagram bio generator, instagram bio ideas, social media bio, bio creator"
      emoji="📸"
      heroColor="linear-gradient(135deg, #0b1220 0%, #1e293b 100%)"
      toolName="Instagram Bio Generator"
      tagline="Create a catchy Instagram bio in seconds."
      guideSteps={[
        { heading: 'Enter keywords', text: 'Describe what you do or love.' },
        { heading: 'Pick a style', text: 'Fun, professional, or chill.' },
        { heading: 'Generate', text: 'Copy the bio to your profile.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'Can I use emojis?', a: 'Yes, emojis make bios more engaging. Use them deliberately for emphasis.' },
        { q: 'What is a good bio length?', a: 'Keep it under 150 characters so it stays readable and fits mobile screens.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">✨ Bio Suggestions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Keywords (hobbies, work, vibes)</label>
            <input
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="e.g. travel, food, design"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label>Style</label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              style={{ width: 200, padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            >
              <option value="fun">Fun</option>
              <option value="professional">Professional</option>
              <option value="relaxed">Chill</option>
            </select>
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            📝 Generate Bio
          </button>

          {bio && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Your Bio</div>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={5}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
              />
              <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
                <button
                  onClick={() => navigator.clipboard.writeText(bio)}
                  style={{ padding: '10px 14px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
                >
                  📋 Copy Bio
                </button>
                <button
                  onClick={() => setBio('')}
                  style={{ padding: '10px 14px', background: '#64748b', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
                >
                  🧽 Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tp-card">
        <h2>How to use</h2>
        <p>
          Type a few words that describe your interests, work, or personality. Choose a style that matches the vibe you want to communicate. Click generate and copy the bio into your Instagram profile. You can tweak it further to match your personal tone.
        </p>

        <h2>Benefits</h2>
        <p>
          A sharp bio helps visitors quickly understand who you are and why they should follow you. This tool helps you craft a bio that feels authentic, readable, and aligned with your goals — whether you want to grow a brand, showcase your work, or just stay playful.
        </p>
        <p>
          Regularly updating your bio to reflect new goals, projects, or milestones keeps your profile fresh. Having a compelling bio makes it easier to attract the right audience and makes your profile feel more polished.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: How long should a bio be?</strong><br />
          A: Instagram bios are limited to 150 characters, so keep it short, clear, and focused on what you want people to know about you.
        </p>
        <p>
          <strong>Q: Should I include hashtags?</strong><br />
          A: You can include 1-2 relevant hashtags, but focus on readability. Too many hashtags can make your bio look cluttered.
        </p>
      </div>
    </ToolWrapper>
  )
}

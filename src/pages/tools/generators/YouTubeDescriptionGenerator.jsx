import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function YouTubeDescriptionGenerator() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('friendly')
  const [cta, setCta] = useState('Subscribe for more')
  const [description, setDescription] = useState('')

  const generate = () => {
    const safeTopic = topic.trim() || 'your topic'
    const base = `In this video, I share ${safeTopic} in a way that is easy to follow and action-oriented.`
    const energy = tone === 'friendly' ? '😊' : tone === 'professional' ? '💼' : '🔥'

    setDescription(`🎬 ${base} ${energy}\n\nIn this video you will learn:\n- Key points about ${safeTopic}\n- Practical examples and tips\n- How to apply the ideas immediately\n\n👉 ${cta} and hit the bell icon so you never miss an update.\n\n🔗 Links & resources:\n- Watch next: [Link]\n- Follow me: [Social]\n\n#${safeTopic.replace(/\s+/g, '')} #YouTube #${tone}`)
  }

  return (
    <ToolWrapper
      title="YouTube Description Generator — Write Better Video Descriptions"
      description="Auto-generate YouTube video descriptions with call-to-action, timestamps, and keyword focus."
      keywords="youtube description generator, video description, youtube seo, youtube description template"
      emoji="🎥"
      heroColor="linear-gradient(135deg, #111827 0%, #1f2937 100%)"
      toolName="YouTube Description Generator"
      tagline="Generate optimized descriptions in seconds."
      guideSteps={[
        { heading: 'Enter the topic', text: 'What is your video about?' },
        { heading: 'Pick a tone', text: 'Choose friendly, professional, or exciting.' },
        { heading: 'Generate description', text: 'Copy and paste into your video editor.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q: 'How does this help SEO?', a: 'It adds keyword-rich lines and a clear structure, making your description easier for YouTube to understand.' },
        { q: 'Can I edit the output?', a: 'Yes, feel free to tweak the description to match your voice and details.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📝 Auto Description Builder</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Video topic</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. travel packing tips, quick recipes, productivity hacks"
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label>Tone</label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              style={{ width: 200, padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="exciting">Exciting</option>
            </select>
          </div>

          <div>
            <label>Call to action</label>
            <input
              value={cta}
              onChange={e => setCta(e.target.value)}
              placeholder="Subscribe for more, Like & share, etc."
              style={{ width: '100%', padding: 10, marginTop: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
          </div>

          <button
            onClick={generate}
            style={{ padding: '12px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}
          >
            ✍️ Generate Description
          </button>

          {description && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Your Description</div>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={10}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
              />
              <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
                <button
                  onClick={() => navigator.clipboard.writeText(description)}
                  style={{ padding: '10px 14px', background: '#0f8a1f', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
                >
                  📋 Copy Description
                </button>
                <button
                  onClick={() => setDescription('')}
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
          Provide a clear topic and choose a tone that fits your channel. Add a short call-to-action line to encourage likes, subscribes, or comments. Then click generate — the tool creates a structured description with bullet points, a call-to-action, and suggestion spots for links and resources.
        </p>

        <h2>Benefits</h2>
        <p>
          Using a strong description helps viewers understand what to expect and improves your video’s chances of appearing in search results. A well-formatted description makes it easier for people to find key information and improves watch time. This generator saves time while keeping your content consistent.
        </p>
        <p>
          Customize the generated description with your own links, timestamps, and references to related videos. Tailored descriptions also help your audience connect with your brand and take action.
        </p>

        <h2>FAQ</h2>
        <p>
          <strong>Q: Should I add timestamps?</strong><br />
          A: Yes — add chapter timestamps manually if your video is longer, as they improve navigation and watch time.
        </p>
        <p>
          <strong>Q: Does it add keywords?</strong><br />
          A: The tool adds a simple hashtag based on your topic. For best results, include additional relevant keywords and tags yourself.
        </p>
      </div>
    </ToolWrapper>
  )
}

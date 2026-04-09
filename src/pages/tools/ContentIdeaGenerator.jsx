import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const PLATFORMS = [
  { value: 'blog', label: 'Blog Post', emoji: '📝' },
  { value: 'youtube', label: 'YouTube Video', emoji: '🎥' },
  { value: 'instagram', label: 'Instagram Reel / Post', emoji: '📸' },
  { value: 'tiktok', label: 'TikTok / Shorts', emoji: '🎵' },
  { value: 'linkedin', label: 'LinkedIn Post', emoji: '💼' },
]

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

export default function ContentIdeaGenerator() {
  const [platform, setPlatform] = useState('blog')
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [ideas, setIdeas] = useState([])

  const generateIdeas = () => {
    const base = topic.trim() || 'your niche'
    const forWhom = audience.trim() ? `for ${audience.trim()}` : ''

    const templates = [
      `Top 5 ${base} tips ${forWhom}`,
      `How to ${base} without common mistakes ${forWhom}`,
      `Beginner's guide to ${base} ${forWhom}`,
      `What nobody tells you about ${base} ${forWhom}`,
      `Case study: ${base} that worked ${forWhom}`,
      `Checklist for ${base} success ${forWhom}`,
      `Mistakes to avoid while doing ${base} ${forWhom}`,
      `Quick wins: ${base} in 10 minutes ${forWhom}`,
      `Tools & resources for ${base} ${forWhom}`,
      `Trend alert: ${base} in 2026 ${forWhom}`,
    ]

    const mapped = templates.map(t => t.replace(/\s+/g, ' ').trim())
    setIdeas(shuffle(mapped).slice(0, 8))
  }

  const copyAll = async () => {
    if (!ideas.length) return
    const text = ideas.map((i, idx) => `${idx + 1}. ${i}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      alert('Ideas clipboard me copy ho gayi!')
    } catch {}
  }

  const header = useMemo(() => {
    const plat = PLATFORMS.find(p => p.value === platform)
    return plat ? `${plat.emoji} ${plat.label}` : 'Content Ideas'
  }, [platform])

  return (
    <ToolWrapper
      title="Content Idea Generator — Blog, YouTube, Instagram Content"
      description="Topic ya niche daalo aur instant content ideas generate karo. Blog, video, reel, aur LinkedIn ke liye idea list bannegi." 
      keywords="content idea generator, blog ideas, youtube ideas, instagram reel ideas, content planner 2026"
      emoji="💡"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #d97706 100%)"
      toolName="Content Idea Generator"
      tagline="Topic daalo, 8+ creative content ideas turant milenge" 
      guideSteps={[
        { heading: 'Platform select karo', text: 'Blog, YouTube, Instagram, TikTok ya LinkedIn choose karo.' },
        { heading: 'Topic daalo', text: 'Apne niche ya subject ka short description likho.' },
        { heading: 'Audience specify karo (optional)', text: 'Target audience add karo, jaise "beginners", "small businesses" etc.' },
        { heading: 'Generate karo', text: 'Copy karo aur apne next content plan mein use karo.' },
      ]}
      faqs={[
        { q: 'Kya ye tools idea generate karta hai?', a: 'Haan, ye creative prompts aur headline ideas provide karta hai jise aap customize kar sakte ho.' },
        { q: 'Kitne ideas milte hain?', a: 'Har generate pe 8 ideas milte hain, jo aap copy karke spreadsheet ya note app mein save kar sakte ho.' },
        { q: 'Kya ye SEO friendly ideas deta hai?', a: 'Ye ideas direct SEO data pe based nahi hain, lekin aap inhe keyword-rich banakar SEO friendly bana sakte ho.' },
      ]}
      affCategory="health"
      hasResult={true}
      relatedTools={[
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
        { path: '/tools/ai-prompt-generator', emoji: '🧠', name: 'AI Prompt Generator' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">{header}</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>📌 Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)}>
              {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.emoji} {p.label}</option>)}
            </select>
          </div>
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>🧠 Topic / Niche</label>
            <input value={topic} placeholder="e.g. sustainable living, productivity tips" onChange={e => setTopic(e.target.value)} />
          </div>
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>🎯 Audience (optional)</label>
            <input value={audience} placeholder="e.g. students, freelancers, moms" onChange={e => setAudience(e.target.value)} />
          </div>
          <button className="tw-calc-btn" onClick={generateIdeas}>✨ Generate Ideas</button>
        </div>
      </div>

      {ideas.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">🧾 Ideas List</div>
          <ol style={{ paddingLeft: 18, marginTop: 10, lineHeight: 1.6 }}>
            {ideas.map((idea, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>{idea}</li>
            ))}
          </ol>
          <button className="tw-calc-btn" onClick={copyAll}>📋 Copy All Ideas</button>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">📝 Content Creation Guide</div>
          <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
            <p>
              Content creation 2026 mein bohot competitive ho gaya hai. Har platform pe lakhs creators hain. Lekin good ideas aur consistent posting se aap alag dikhte hain. Yeh guide aapko sikhaega ki kaise niche choose karein, ideas generate karein, aur audience ko engage karein.
            </p>

            <h3>1. Niche Selection</h3>
            <p>
              Apne interest aur expertise pe niche choose karo. Agar aapko finance pasand hai, toh personal finance niche. Check competition — too crowded niche mein hard hai, lekin empty mein audience nahi.
            </p>
            <p>
              Use tools like Google Trends, YouTube search, aur social media analytics to see what's trending. 2026 mein AI, sustainability, aur remote work hot topics hain.
            </p>

            <h3>2. Audience Understanding</h3>
            <p>
              Apne ideal viewer ko define karo: Age, gender, interests, pain points. Example: "25-35 saal ke professionals jo side hustle start karna chahte hain."
            </p>
            <p>
              Use surveys, comments, aur analytics to learn. Content unke problems solve karo, na ki sirf entertain.
            </p>

            <h3>3. Idea Generation Techniques</h3>
            <p>
              - Brainstorming: Topic list banao aur expand karo.<br />
              - Research: Trending topics dekho aur twist do.<br />
              - Audience questions: Comments mein pooche jaane wale questions answer karo.<br />
              - Competitor analysis: Kya kar rahe hain wo, aur better kaise kar sakte ho.
            </p>

            <h3>4. Platform-Specific Strategies</h3>
            <p>
              <strong>YouTube:</strong> Long-form videos, tutorials, reviews. SEO titles aur thumbnails important.<br />
              <strong>Instagram:</strong> Short, visual content. Reels for quick tips, stories for behind-the-scenes.<br />
              <strong>Blog:</strong> In-depth articles, SEO optimized. Backlinks aur internal linking use karo.<br />
              <strong>LinkedIn:</strong> Professional content, networking. Thought leadership posts.
            </p>

            <h3>5. Content Calendar</h3>
            <p>
              Weekly plan banao. Example: Monday - educational, Wednesday - entertaining, Friday - Q&A. Use tools like Trello ya Google Calendar.
            </p>
            <p>
              Batch create karo: Ek din mein saare ideas list karo, phir week mein produce karo.
            </p>

            <h3>6. Quality over Quantity</h3>
            <p>
              Better hai kam lekin quality content. Invest in good lighting, editing, aur research. Consistency zaroori hai, lekin rushed content se brand damage hota hai.
            </p>

            <h3>7. Monetization</h3>
            <p>
              10k followers ke baad monetize karo. YouTube: Ads, sponsorships. Instagram: Brand deals. Blog: Affiliate marketing. Patience rakho.
            </p>

            <h3>8. Analytics aur Improvement</h3>
            <p>
              Track views, engagement, CTR. Kya kaam kar raha hai wo repeat karo. Feedback lo aur improve karo.
            </p>

            <h3>9. Tools for Creators</h3>
            <p>
              Canva for graphics, CapCut for editing, TubeBuddy for YouTube SEO, Later for scheduling. AI tools jaise ChatGPT for script writing.
            </p>

            <h3>10. Mental Health</h3>
            <p>
              Burnout common hai. Breaks lo, hobbies rakho. Content creation passion se karo, na ki sirf money ke liye.
            </p>

            <p>
              Yeh tool ideas deta hai, lekin execution pe focus karo. Start small, consistent raho, aur grow karo.
            </p>
          </div>
        </div>
      )}
    </ToolWrapper>
  )
}

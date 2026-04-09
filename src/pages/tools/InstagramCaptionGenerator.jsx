import React, { useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const CAPTION_TEMPLATES = [
  { id: 'motivation', label: 'Motivational', template: 'Rise above the storm and you will find the sunshine. Keep pushing forward! 💪 #Motivation #NeverGiveUp' },
  { id: 'lifestyle', label: 'Lifestyle', template: 'Living my best life one day at a time. Grateful for the little things that make life beautiful. 🌟 #Lifestyle #Gratitude' },
  { id: 'food', label: 'Food', template: 'Homemade goodness that warms the soul! Nothing beats fresh ingredients and love in every bite. 🍽️ #Foodie #HomeCooking' },
  { id: 'travel', label: 'Travel', template: 'Wanderlust calling! Exploring new places and creating unforgettable memories. Where to next? ✈️ #Travel #Adventure' },
  { id: 'fitness', label: 'Fitness', template: 'Sweat today, shine tomorrow. Every workout brings you closer to your goals. Stay strong! 💪 #Fitness #Workout' },
  { id: 'love', label: 'Love', template: 'Love is not just a feeling, it\'s a choice we make every day. Grateful for you! ❤️ #Love #RelationshipGoals' },
  { id: 'nature', label: 'Nature', template: 'Nature\'s beauty never fails to amaze me. Take a moment to appreciate the world around us. 🌿 #Nature #Peace' },
  { id: 'business', label: 'Business', template: 'Building dreams one step at a time. Hard work pays off! What\'s your entrepreneurial journey? 🚀 #Business #Entrepreneur' },
]

const EMOJIS = [
  '❤️', '💯', '🔥', '✨', '🌟', '💪', '😊', '🎉', '🌈', '⭐', '💫', '🌸', '🌺', '🌻', '🌹',
  '🍀', '🌿', '🍃', '🌊', '🌞', '🌙', '⭐', '🌟', '✨', '💫', '🎈', '🎊', '🎉', '🎂', '🍰'
]

const HASHTAGS = [
  '#Love', '#Instagood', '#PhotoOfTheDay', '#Beautiful', '#Happy', '#Life', '#Fashion', '#Style',
  '#Motivation', '#Inspiration', '#Fitness', '#Workout', '#Foodie', '#Delicious', '#Travel', '#Adventure',
  '#Nature', '#Photography', '#Art', '#Music', '#Dance', '#Fun', '#Smile', '#Friends', '#Family',
  '#Home', '#Garden', '#Sunset', '#Beach', '#Mountain', '#City', '#Street', '#Architecture'
]

export default function InstagramCaptionGenerator() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('motivation')
  const [tone, setTone] = useState('positive')
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [customEmojis, setCustomEmojis] = useState('')
  const [customHashtags, setCustomHashtags] = useState('')
  const [captions, setCaptions] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(-1)

  const generateCaptions = () => {
    if (!topic.trim()) return

    const selectedTemplate = CAPTION_TEMPLATES.find(t => t.id === style)
    if (!selectedTemplate) return

    const generatedCaptions = []

    for (let i = 0; i < 6; i++) {
      let caption = selectedTemplate.template

      // Replace topic placeholder if exists
      if (caption.includes('{topic}')) {
        caption = caption.replace('{topic}', topic)
      }

      // Adjust tone
      if (tone === 'inspirational') {
        caption = caption.replace('Keep pushing', 'Believe in yourself and keep pushing')
      } else if (tone === 'funny') {
        caption = caption.replace('Keep pushing', 'Keep pushing... or just take a nap, your choice')
      } else if (tone === 'romantic') {
        caption = caption.replace('Keep pushing', 'Together we can conquer anything')
      }

      // Add custom content
      if (topic && !caption.includes(topic)) {
        caption = caption.replace('!', ` about ${topic}!`)
      }

      // Add emojis
      if (includeEmojis) {
        const emojiList = customEmojis ? customEmojis.split(',').map(e => e.trim()) : EMOJIS
        const randomEmojis = []
        for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
          randomEmojis.push(emojiList[Math.floor(Math.random() * emojiList.length)])
        }
        caption += ' ' + randomEmojis.join(' ')
      }

      // Add hashtags
      if (includeHashtags) {
        const hashtagList = customHashtags ? customHashtags.split(',').map(h => h.trim()) : HASHTAGS
        const selectedHashtags = []
        const numHashtags = Math.floor(Math.random() * 4) + 3 // 3-6 hashtags
        for (let j = 0; j < numHashtags; j++) {
          const randomTag = hashtagList[Math.floor(Math.random() * hashtagList.length)]
          if (!selectedHashtags.includes(randomTag)) {
            selectedHashtags.push(randomTag)
          }
        }
        caption += '\n\n' + selectedHashtags.join(' ')
      }

      generatedCaptions.push(caption)
    }

    setCaptions(generatedCaptions)
  }

  const copyCaption = async (caption, index) => {
    try {
      await navigator.clipboard.writeText(caption)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(-1), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <ToolWrapper
      title="Instagram Caption Generator — Viral Captions Banayein"
      description="Engaging Instagram captions instantly generate karo. Templates, emojis aur hashtags se perfect captions banao."
      keywords="instagram caption generator, instagram captions, viral captions, instagram hashtags, social media captions"
      emoji="📸"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #8b5cf6 50%, #ec4899 100%)"
      toolName="Instagram Caption Generator"
      tagline="Viral Captions · Emojis · Hashtags — Instagram ke liye perfect"
      guideSteps={[
        { heading: 'Topic ya mood daalo', text: 'Apni post ka topic ya feeling enter karo.' },
        { heading: 'Style aur tone choose karo', text: 'Motivational, food, travel etc. se template select karo.' },
        { heading: 'Emojis aur hashtags add karo', text: 'Engagement badhane ke liye relevant emojis aur hashtags.' },
        { heading: 'Captions generate karo', text: '6 different variations milenge — best choose karo.' },
      ]}
      faqs={[
        { q: 'Instagram caption kitna lamba hona chahiye?', a: '125-150 characters ideal. Pehle 125 characters caption mein show hote hain, baaki "more" pe.' },
        { q: 'Kitne hashtags use karne chahiye?', a: '5-10 hashtags best. Zyada hashtags spam lagte hain aur engagement kam karte hain.' },
        { q: 'Emojis kaise use karein?', a: '2-3 relevant emojis use karo. Caption ke end pe ya important words ke saath.' },
        { q: 'Caption ka tone kaisa hona chahiye?', a: 'Brand ke according. Personal posts mein casual, business posts mein professional.' },
      ]}
      relatedBlog={{ slug: 'instagram-growth-hacks', title: 'Instagram Growth Hacks 2026', excerpt: 'Instagram pe followers badhane ke tips aur strategies.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/content-idea-generator', emoji: '💡', name: 'Content Idea Generator' },
        { path: '/tools/hashtag-generator', emoji: '#️⃣', name: 'Hashtag Generator' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📝 Generate Instagram Captions</div>
        <div className="tw-input-group">
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>📸 Post Topic / Mood</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. morning coffee, workout motivation, travel vibes"
            />
          </div>
          <div className="tw-field">
            <label>🎨 Caption Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)}>
              {CAPTION_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="tw-field">
            <label>🎭 Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)}>
              <option value="positive">Positive</option>
              <option value="inspirational">Inspirational</option>
              <option value="funny">Funny</option>
              <option value="romantic">Romantic</option>
              <option value="motivational">Motivational</option>
            </select>
          </div>
          <div className="tw-field">
            <label>😊 Include Emojis</label>
            <select value={includeEmojis} onChange={e => setIncludeEmojis(e.target.value === 'true')}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="tw-field">
            <label>#️⃣ Include Hashtags</label>
            <select value={includeHashtags} onChange={e => setIncludeHashtags(e.target.value === 'true')}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="tw-field">
            <label>✨ Custom Emojis (comma separated)</label>
            <input
              value={customEmojis}
              onChange={e => setCustomEmojis(e.target.value)}
              placeholder="e.g. 🌟,💫,⭐ (leave empty for random)"
            />
          </div>
          <div className="tw-field">
            <label>🏷️ Custom Hashtags (comma separated)</label>
            <input
              value={customHashtags}
              onChange={e => setCustomHashtags(e.target.value)}
              placeholder="e.g. #Fitness, #Motivation (leave empty for random)"
            />
          </div>
          <button
            className="tw-calc-btn"
            onClick={generateCaptions}
            disabled={!topic.trim()}
            style={{ flex: '1 1 100%' }}
          >
            ✨ Generate Captions
          </button>
        </div>
      </div>

      {captions.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">📋 Generated Captions ({captions.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {captions.map((caption, index) => (
              <div
                key={index}
                style={{
                  padding: 16,
                  border: '1.5px solid #e5e7eb',
                  borderRadius: 12,
                  background: '#fafafa',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#111', whiteSpace: 'pre-line', marginBottom: 12 }}>
                  {caption}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>
                    {caption.length} characters
                  </div>
                  <button
                    onClick={() => copyCaption(caption, index)}
                    style={{
                      padding: '6px 12px',
                      background: copiedIndex === index ? '#16a34a' : '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {copiedIndex === index ? '✅' : '📋 Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Instagram Caption Writing Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Instagram ek visual platform hai jahan caption ka role bohot important hai. Ek achhi caption post ko engaging banati hai aur followers ko comment karne ke liye motivate karti hai. Yeh guide aapko sikhaega ki kaise viral-worthy captions likhein jo engagement badhayein aur brand ko grow karein.
          </p>

          <h3>1. Caption Length Matters</h3>
          <p>
            Instagram captions mein pehle 125 characters hi dikhte hain, baaki "more" pe click karke padhne padte hain. Isliye pehle 125 characters mein sabse important cheez daalna chahiye. Hook ya main message yahan hona chahiye.
          </p>
          <p>
            Research kehta hai ki 125-150 characters ki captions best perform karti hain. Zyada lambi captions mein engagement kam hota hai kyunki log pura nahi padhte.
          </p>

          <h3>2. Start with a Hook</h3>
          <p>
            Caption ka pehla line hook hona chahiye jo reader ka attention grab kare. Question, surprising fact, ya emotional statement se shuru karo.
          </p>
          <ul>
            <li>❌ "Had a great day today"</li>
            <li>✅ "You won't believe what happened to me today! 😱"</li>
          </ul>

          <h3>3. Tell a Story</h3>
          <p>
            Instagram users stories pasand karte hain. Apni post ke peeche ki story share karo. Yeh emotional connection banata hai aur engagement badhata hai.
          </p>
          <p>
            Example: "This coffee mug has been with me through 3 jobs, 2 heartbreaks, and countless late nights. It's not just a mug, it's a survivor! ☕ #CoffeeLover"
          </p>

          <h3>4. Use Emojis Strategically</h3>
          <p>
            Emojis visual appeal badhate hain aur caption ko lively banate hain. Lekin use karo thoughtfully — har line mein emoji mat daalo.
          </p>
          <p>
            Best practices:
            - Related emojis use karo (food post mein food emojis)
            - 2-3 emojis per caption
            - Important words ke saath use karo
            - End pe ya hook mein place karo
          </p>

          <h3>5. Hashtags ka Smart Use</h3>
          <p>
            Hashtags discoverability badhate hain. Instagram algorithm hashtags ko use karke posts ko relevant audience tak pahunchata hai.
          </p>
          <ul>
            <li>5-10 hashtags use karo</li>
            <li>Mix of popular aur niche hashtags</li>
            <li>Relevant hashtags choose karo</li>
            <li>Break hashtags into 2-3 lines for readability</li>
          </ul>

          <h3>6. Call-to-Action Add Karo</h3>
          <p>
            CTA engagement ko 20-30% tak badha sakta hai. Comment, like, share, ya save karne ke liye bolo.
          </p>
          <p>
            Examples:
            - "Double tap if you agree! ❤️"
            - "What's your favorite memory? Comment below 👇"
            - "Tag a friend who needs to see this! 👫"
            - "Save this for later! 💾"
          </p>

          <h3>7. Tone aur Voice</h3>
          <p>
            Apne brand ke according tone decide karo. Personal accounts mein casual, business accounts mein professional tone best hota hai.
          </p>
          <ul>
            <li><strong>Personal:</strong> Casual, friendly, relatable</li>
            <li><strong>Business:</strong> Professional, helpful, authoritative</li>
            <li><strong>Lifestyle:</strong> Inspirational, aspirational</li>
            <li><strong>Food:</strong> Descriptive, mouth-watering</li>
          </ul>

          <h3>8. Questions Pucho</h3>
          <p>
            Questions engagement ko boost karte hain. Readers ko comment karne ke liye encourage karte hain.
          </p>
          <p>
            Good questions:
            - "What's your go-to comfort food? 🍕"
            - "Have you tried this before? 🤔"
            - "What's your biggest fitness goal? 💪"
            - "Where's your dream vacation spot? ✈️"
          </p>

          <h3>9. Line Breaks Use Karo</h3>
          <p>
            Long paragraphs boring lagte hain. Line breaks se caption readable banati hai aur mobile pe acchi dikhti hai.
          </p>
          <p>
            Tip: Instagram mein line break karne ke liye space daalke enter press karo.
          </p>

          <h3>10. Trending Topics Use Karo</h3>
          <p>
            Current trends aur challenges mein participate karo. #ReelsChallenge, #InstaDaily etc. se viral hone ka chance badhta hai.
          </p>

          <h3>11. Test aur Analyze</h3>
          <p>
            Different captions test karo aur dekho kaunsa better perform karta hai. Instagram Insights se engagement metrics check karo.
          </p>

          <h3>12. Avoid These Mistakes</h3>
          <ul>
            <li>Spelling mistakes</li>
            <li>Too many emojis</li>
            <li>Irrelevant hashtags</li>
            <li>Negative tone</li>
            <li>Too salesy (business accounts mein bhi)</li>
          </ul>

          <p>
            Yeh tool aapko quick start deta hai. Templates use karo, apne style develop karo, aur practice karo. Great captions banane ka formula hai: Hook + Story + CTA + Hashtags. Experiment karo aur apne audience ko jaano — yahi success ka raaz hai!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}
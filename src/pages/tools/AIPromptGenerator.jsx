import React, { useMemo, useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const TOOL_TYPES = [
  { value: 'chatgpt', label: 'ChatGPT / OpenAI (Text)', emoji: '🤖' },
  { value: 'midjourney', label: 'Midjourney / Stable Diffusion (Image)', emoji: '🖼️' },
  { value: 'googlebard', label: 'Google Bard (Text)', emoji: '🧠' },
  { value: 'copywriting', label: 'Copywriting / Social Post', emoji: '✍️' },
]

const TONES = ['Friendly', 'Professional', 'Casual', 'Technical', 'Storytelling']
const LENGTHS = ['Short', 'Medium', 'Long']

function toTitleCase(str) {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

export default function AIPromptGenerator() {
  const [type, setType] = useState('chatgpt')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Friendly')
  const [length, setLength] = useState('Medium')
  const [extra, setExtra] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const placeholder = useMemo(() => {
    switch (type) {
      case 'midjourney': return 'e.g. "a futuristic city at sunset, neon lights, cinematic"'
      case 'chatgpt': return 'e.g. "write a product description for a new budget phone"'
      case 'googlebard': return 'e.g. "explain blockchain in simple Hindi"'
      case 'copywriting': return 'e.g. "Instagram caption for fitness reel"'
      default: return ''
    }
  }, [type])

  const buildPrompt = () => {
    const cleanTopic = topic.trim() || 'your topic'
    const baseTone = tone ? `Tone: ${tone}.` : ''
    const baseLength = length ? `Length: ${length}.` : ''
    const extras = extra.trim() ? `Additional notes: ${extra.trim()}.` : ''

    switch (type) {
      case 'midjourney':
        return `Create a high quality, detailed image of ${cleanTopic} in an ${tone.toLowerCase()} style. Include rich textures, lighting, and composition. ${extras}`
      case 'copywriting':
        return `Write a ${length.toLowerCase()} social media post about ${cleanTopic}. ${baseTone} ${extras}`
      case 'googlebard':
        return `You are a helpful assistant. ${baseTone} ${baseLength} Provide a clear response about ${cleanTopic}. ${extras}`
      case 'chatgpt':
      default:
        return `You are an expert assistant. ${baseTone} ${baseLength} Answer the following: ${cleanTopic}. ${extras}`
    }
  }

  const handleGenerate = () => {
    setOutput(buildPrompt())
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <ToolWrapper
      title="AI Prompt Generator — ChatGPT, Midjourney, Bard Prompt Ideas"
      description="AI prompts jaldi generate karo — ChatGPT, Midjourney, ya social post ke liye template. Ek click mein professional prompts milte hain."
      keywords="ai prompt generator, chatgpt prompts, midjourney prompt, bard prompt, ai prompt ideas, prompt templates"
      emoji="🧠"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #6d28d9 100%)"
      toolName="AI Prompt Generator"
      tagline="ChatGPT, Midjourney, Bard — prompt ideas turant banayein" 
      guideSteps={[
        { heading: 'Tool select karo', text: 'ChatGPT, Midjourney ya Bard ke liye prompt generate kar sakte ho.' },
        { heading: 'Topic daalo', text: 'Jo idea chahiye uska short description type karo.' },
        { heading: 'Tone aur length set karo', text: 'Professional, friendly ya short / detailed prompts banao.' },
        { heading: 'Generate karo & copy karo', text: 'Ek click mein prompt banega — copy karke AI mein paste karo.' },
      ]}
      faqs={[
        { q: 'Kya prompt magar ek hi baar use kar sakta hoon?', a: 'Haan! Aap prompt ko modify kar sakte ho, tone change kar sakte ho aur alek alag inputs ke saath try kar sakte ho.' },
        { q: 'Midjourney prompt ka structure kya hona chahiye?', a: 'Clear subject + style + lighting + mood daloge toh better results milte hain. Ye tool ek strong base deta hai.' },
        { q: 'Kya output exact copy karna chahiye?', a: 'Aap output ko edit karke apni jarurat ke hisab se tailor kar sakte ho. Yeh tool sirf starting point deta hai.' },
      ]}
      affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
        { path: '/tools/image-compressor', emoji: '🖼️', name: 'Image Compressor' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🎯 Prompt Parameters</div>
        <div className="tw-input-group">
          <div className="tw-field">
            <label>🔧 Tool Type</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              {TOOL_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>
              ))}
            </select>
          </div>
          <div className="tw-field">
            <label>🧩 Topic / Goal</label>
            <input value={topic} placeholder={placeholder} onChange={e => setTopic(e.target.value)} />
          </div>
          <div className="tw-field">
            <label>🎤 Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)}>
              {TONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="tw-field">
            <label>⏱️ Length</label>
            <select value={length} onChange={e => setLength(e.target.value)}>
              {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="tw-field" style={{ flex: '1 1 100%' }}>
            <label>✍️ Extra Notes (optional)</label>
            <input value={extra} placeholder="Any specific style, keywords, or constraints" onChange={e => setExtra(e.target.value)} />
          </div>
          <button className="tw-calc-btn" onClick={handleGenerate}>⚡ Prompt Generate Karo</button>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📌 Generated Prompt</div>
        <textarea
          value={output}
          readOnly
          placeholder="Generate karne ke liye above inputs fill karo..."
          style={{ width: '100%', minHeight: 140, padding: 12, fontSize: '0.9rem', borderRadius: 12, border: '1.5px solid #e5e7eb', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <button
            className="tw-calc-btn"
            onClick={handleCopy}
            disabled={!output}
            style={{ flex: 1 }}
          >
            📋 Copy Prompt {copied ? '✔️' : ''}
          </button>
          <button
            className="tw-calc-btn"
            onClick={() => { setTopic(''); setExtra(''); setOutput(''); setCopied(false) }}
            style={{ flex: 1, background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb' }}
          >
            🧹 Clear
          </button>
        </div>
      </div>

      <div className="tp-card">
        <div className="tp-sec-title">📝 AI Prompt Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            AI tools jaise ChatGPT, Midjourney, aur Google Bard ne content creation ko revolutionize kar diya hai. Lekin inka best use karne ke liye achhe prompts likhna zaroori hota hai. Yeh guide aapko sikhaega ki kaise effective AI prompts banayein, kya mistakes avoid karein, aur kaise results ko improve karein.
          </p>

          <h3>1. Prompt ka Structure</h3>
          <p>
            Ek good prompt mein 4 main parts hote hain: Role, Task, Context, aur Format. Example: "You are a marketing expert. Write a product description for a new smartphone. Target audience is young professionals. Keep it under 200 words."
          </p>
          <p>
            Role define karta hai AI ka perspective. Task batata hai kya karna hai. Context background deta hai. Format output ka structure decide karta hai.
          </p>

          <h3>2. ChatGPT ke liye Tips</h3>
          <p>
            ChatGPT text generation mein best hai. Use "step-by-step" instructions for complex tasks. Agar code chahiye, toh specify language aur framework. For creative writing, add mood aur style hints.
          </p>
          <p>
            Example prompt: "Write a 500-word blog post about sustainable living. Include 5 practical tips. Use conversational tone. End with a call-to-action."
          </p>

          <h3>3. Midjourney Image Prompts</h3>
          <p>
            Midjourney ke liye descriptive prompts kaam karte hain. Include subject, style, lighting, composition, aur mood. Use "--ar 16:9" for aspect ratio. Avoid generic words; be specific.
          </p>
          <p>
            Example: "A futuristic city skyline at sunset, neon lights reflecting on wet streets, cyberpunk style, high detail, cinematic lighting, by Syd Mead --ar 16:9"
          </p>

          <h3>4. Google Bard ke liye</h3>
          <p>
            Bard Google ka AI hai, jo real-time data access karta hai. Use it for research aur fact-checking. Prompts mein "explain like I'm 5" for simple explanations.
          </p>
          <p>
            Example: "Explain quantum computing in simple Hindi. Use analogies. Keep it under 300 words."
          </p>

          <h3>5. Copywriting Prompts</h3>
          <p>
            Social media posts, ads, emails ke liye specific prompts. Include platform, audience, goal. Example: "Write an Instagram caption for a fitness brand. Target: 18-25 year olds. Goal: Drive website traffic. Use emojis."
          </p>

          <h3>6. Common Mistakes</h3>
          <ul>
            <li>Too vague: "Write something good" — specify what.</li>
            <li>Too long: Keep prompts concise.</li>
            <li>Ignoring AI limitations: Don't ask for real-time data from ChatGPT.</li>
            <li>Not iterating: First result perfect nahi hota; refine aur retry karo.</li>
          </ul>

          <h3>7. Advanced Techniques</h3>
          <p>
            Use "few-shot learning": Examples de kar dikhao. For example, "Write emails like this: [example]. Now write one for [topic]."
          </p>
          <p>
            Chain prompts: Pehle research karo, phir summarize. Use temperature settings in some tools for creativity vs accuracy.
          </p>

          <h3>8. Ethical Use</h3>
          <p>
            AI ko responsibly use karo. Copyright content generate mat karo. Always fact-check AI output. Use AI as a tool, not replacement for human creativity.
          </p>

          <h3>9. Future of AI Prompts</h3>
          <p>
            2026 mein multimodal AI aa raha hai — text, image, audio ek saath. Prompts bhi evolve ho rahe hain. Learn prompt engineering for better careers.
          </p>

          <h3>10. Practice aur Resources</h3>
          <p>
            Daily practice karo. Websites jaise PromptHero, LearnPrompting se examples lo. Join communities on Reddit (r/ChatGPT) for tips.
          </p>

        </div>
      </div>
    </ToolWrapper>
  )
}

import React, { useMemo, useState } from 'react'
import SEOHead from '../../components/SEOHead'
import './YouTubeDescriptionTemplate.css'

const TEMPLATE_BUILDERS = [
  (p) => `Welcome to ${p.channelName}!\n\nIn this video we talk about: ${p.videoTopic}\n\nIf you enjoyed this video don't forget to like, comment and subscribe.\n\nKeywords:\n${p.keywords}\n\nFollow us:\n${p.socialLinks}`,
  (p) => `🎬 ${p.videoTitle} - ${p.channelName}\n\nAbout this video:\n${p.videoTopic}\n\n✅ Don’t forget to hit LIKE and SUBSCRIBE for more.\n\n🔎 Keywords:\n${p.keywords}\n\n📱 Follow us:\n${p.socialLinks}`,
  (p) => `Hello from ${p.channelName}!\n\nToday we're diving into: ${p.videoTopic}\n\nIf you liked this video, please give it a thumbs up and subscribe.\n\nKeywords:\n${p.keywords}\n\nStay connected:\n${p.socialLinks}`,
  (p) => `Title: ${p.videoTitle}\n\nIn this video: ${p.videoTopic}\n\n👍 Like | 💬 Comment | 🔔 Subscribe\n\nKeywords:\n${p.keywords}\n\nConnect with us:\n${p.socialLinks}`,
  (p) => `Thanks for watching ${p.channelName}!\n\nIn this episode we cover: ${p.videoTopic}\n\nIf you enjoyed it, smash that like button and subscribe.\n\nKeywords:\n${p.keywords}\n\nFollow on socials:\n${p.socialLinks}`,
]

export default function YouTubeDescriptionTemplate() {
  const [videoTitle, setVideoTitle] = useState('')
  const [channelName, setChannelName] = useState('')
  const [videoTopic, setVideoTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [socialLinks, setSocialLinks] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(-1)

  const inputs = useMemo(() => ({
    videoTitle: videoTitle.trim() || 'Video Title',
    channelName: channelName.trim() || 'Channel Name',
    videoTopic: videoTopic.trim() || 'Video topic / subject',
    keywords: keywords.trim() || 'keyword1, keyword2, keyword3',
    socialLinks: socialLinks.trim() || 'Instagram: @you, Twitter: @you',
  }), [videoTitle, channelName, videoTopic, keywords, socialLinks])

  const descriptions = useMemo(() => {
    return TEMPLATE_BUILDERS.map((build) => build(inputs))
  }, [inputs])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const handleCopy = async (idx) => {
    const ok = await copyToClipboard(descriptions[idx])
    if (ok) {
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(-1), 2400)
    }
  }

  return (
    <div className="yt-desc-page">
      <SEOHead
        title="Free YouTube Description Template Generator – Create SEO Friendly Descriptions"
        description="Generate SEO optimized YouTube descriptions instantly with our free YouTube description template generator. Perfect for creators and channels."
      />

      <header className="yt-desc-hero">
        <h1>YouTube Description Template Generator</h1>
        <p className="yt-desc-subtitle">
          Create SEO-friendly YouTube descriptions in seconds. Fill the fields to see multiple descriptions generated instantly.
        </p>
      </header>

      <section className="yt-desc-tool">
        <div className="yt-desc-grid">
          <form className="yt-desc-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>Video Title</label>
              <input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} placeholder="My Awesome Video" />
            </div>

            <div className="form-row">
              <label>Channel Name</label>
              <input value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="Channel Name" />
            </div>

            <div className="form-row">
              <label>Video Topic</label>
              <input value={videoTopic} onChange={(e) => setVideoTopic(e.target.value)} placeholder="What is this video about?" />
            </div>

            <div className="form-row">
              <label>Keywords</label>
              <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" />
            </div>

            <div className="form-row">
              <label>Social Media Links</label>
              <textarea value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)} placeholder="Instagram: @you\nTwitter: @you" rows={3} />
            </div>
          </form>

          <div className="yt-desc-results">
            <div className="yt-desc-results-header">
              <h2>Generated Descriptions</h2>
              <p>Click copy to use any description instantly.</p>
            </div>
            <div className="yt-desc-cards">
              {descriptions.map((desc, idx) => (
                <div key={idx} className="yt-desc-card">
                  <pre className="yt-desc-text">{desc}</pre>
                  <button
                    className={`yt-desc-copy ${copiedIndex === idx ? 'copied' : ''}`}
                    onClick={() => handleCopy(idx)}
                  >
                    {copiedIndex === idx ? 'Copied!' : 'Copy Description'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="yt-desc-info">
          <h2>How to write a good YouTube description</h2>
          <p>
            A great YouTube description helps viewers know what to expect and can boost SEO. Start with a strong first sentence that clearly states what the video is about, then include a brief summary and relevant keywords. Add links and social profiles so viewers can connect with you.
          </p>

          <h2>Best YouTube SEO tips</h2>
          <p>
            Use keywords naturally within the first two lines, include hashtags at the end, and add a clear call to action like “Subscribe” or “Watch next.” Use your target keywords in the title, description, and tags for the best chance of ranking in search results.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>How long should my description be?</h3>
          <p>
            Aim for 100–200 words with relevant keywords. Add extra details below the fold for people who want more information, but keep the key message in the first couple of lines.
          </p>
          <h3>Can I update descriptions later?</h3>
          <p>
            Yes. You can edit the description anytime from your YouTube Studio to improve SEO, add new links, or update information about the video.
          </p>
          <h3>Does this save my data?</h3>
          <p>
            No. Everything stays in your browser; nothing is stored on a server. Refreshing the page resets the form.
          </p>
        </div>
      </section>
    </div>
  )
}

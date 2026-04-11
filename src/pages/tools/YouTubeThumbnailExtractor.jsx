import React, { useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const THUMBNAILS = [
  { label: 'Default', key: 'default' },
  { label: 'MQ (320x180)', key: 'mqdefault' },
  { label: 'HQ (480x360)', key: 'hqdefault' },
  { label: 'SD (640x480)', key: 'sddefault' },
  { label: 'Maxres (1280x720)', key: 'maxresdefault' },
]

function extractVideoId(url) {
  if (!url) return ''
  try {
    const u = new URL(url.trim())
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || ''
    return ''
  } catch { return '' }
}

export default function YouTubeThumbnailExtractor() {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [error, setError] = useState('')

  const handleExtract = () => {
    const id = extractVideoId(url)
    if (!id) {
      setError('Valid YouTube URL daalein (e.g. https://www.youtube.com/watch?v=xyz).')
      setVideoId('')
      return
    }
    setError('')
    setVideoId(id)
  }

  const buildUrl = (id, key) => `https://img.youtube.com/vi/${id}/${key}.jpg`

  return (
    <ToolWrapper
      title="YouTube Thumbnail Extractor — HD Thumbnail Download"
      description="YouTube video URL daalo aur HD thumbnail images download karo. Max resolution thumbnails ke direct links bhi milenge."
      keywords="youtube thumbnail extractor, youtube thumbnail downloader, maxresdefault thumbnail, yt thumbnail link"
      emoji="🎬"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #ef4444 100%)"
      toolName="YouTube Thumbnail Extractor"
      tagline="Video URL se original thumbnails nikal lo — download aur use karo social, thumbnails, presentations ke liye."
      guideSteps={[
        { heading: 'YouTube link daalo', text: 'Video URL ya share link paste karo. Chrome/Firefox se copy karein.' },
        { heading: 'Extract karo', text: 'Extract button se video ID nikalke thumbnails dikhayega.' },
        { heading: 'Thumbnail choose karo', text: 'Quality select karo aur image save karo.' },
        { heading: 'Use karo', text: 'Thumbnail presentations, social posts, ya video editing mein use karo.' },
      ]}
      faqs={[
        { q: 'Kya har video ka maxres thumbnail hota hai?', a: 'Har video ke liye maxresdefault available nahi hota. Agar file missing ho toh browser 404 show karega. Is case mein lower resolution (hqdefault) use karo.' },
        { q: 'Kya yeh copyrighted thumbnails free use kar sakte hain?', a: 'Thumbnails bhi copyright ke under aate hain. Agar thumbnail creator ka content use kar rahe ho, toh permission leni chahiye. Personal use aur reference ok hai.' },
        { q: 'Kya yeh YouTube API use karta hai?', a: 'Nahi. Yeh direct public thumbnail URLs use karta hai — koi API key ki zaroorat nahi.' },
        { q: 'Custom thumbnail upload kaise karein?', a: 'YouTube Studio mein hi thumbnail upload karo. Yeh tool sirf existing thumbnails download karta hai.' },
      ]}
      relatedBlog={{ slug: 'youtube-thumbnail-best-practices', title: 'YouTube Thumbnail Best Practices', excerpt: 'Thumbnail design tips aur size guides — click-through rate badhane ke liye.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/image-compressor', emoji: '🖼️', name: 'Image Compressor' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">🔗 Video URL</div>
        <div className="tw-input-group">
          <div className="tw-field" style={{ flex: 1 }}>
            <label>Paste YouTube Video Link</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
          </div>
          <button className="tw-calc-btn" onClick={handleExtract} style={{ alignSelf: 'flex-end' }}>🔍 Extract</button>
        </div>
        {error && <div style={{ color: '#dc2626', fontWeight: 700, marginTop: 10 }}>{error}</div>}
      </div>

      {videoId && (
        <div className="tp-card">
          <div className="tp-sec-title">📸 Download Thumbnails</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
            {THUMBNAILS.map(t => (
              <a key={t.key} href={buildUrl(videoId, t.key)} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fafafa' }}>
                  <img loading="lazy" loading="lazy" src={buildUrl(videoId, t.key)} alt={t.label} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                  <div style={{ padding: 10, fontWeight: 700, fontSize: '0.85rem', color: '#111' }}>{t.label}</div>
                </div>
              </a>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#666', marginTop: 10 }}>Right click on the image &gt; Save As to download. Max resolution thumbnails may not exist for all videos.</p>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Thumbnail Tips</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Har YouTube video ka thumbnail ek chhota hero image hota hai jo viewers ko click karne ke liye attract karta hai. Agar aap video creator ho ya social media manager, toh high quality thumbnail aapki click through rate (CTR) ko boost kar sakta hai. Is guide mein hum thumbnail design, best dimensions, aur download tips discuss karenge.
          </p>

          <h3>Why thumbnail matters</h3>
          <p>
            YouTube ke homepage aur search results mein thumbnail sabse pehla element hota hai jo user dekhta hai. Ek clean aur relevant thumbnail aapko competition se alag dikhata hai. Research kehta hai ki achhi thumbnail se 20-30% zyada CTR mil sakti hai.
          </p>

          <h3>Thumbnail size aur resolution</h3>
          <p>
            YouTube recommended thumbnail size 1280×720 pixels (minimum width 640). Aspect ratio 16:9 hona chahiye. File size 2MB se kum honi chahiye. Is tool se aap maxresdefault (1280×720) ya hqdefault (480×360) thumbnails download kar sakte ho.
          </p>

          <h3>Thumbnail content tips</h3>
          <ul>
            <li><strong>Face close-up</strong>: Agar aap presenter ho, toh face ko close-up rakho. Eyes should look at camera — engagement badhta hai.</li>
            <li><strong>Bold text</strong>: Short 2-3 word headline use karo. Reader ko turant samajh aana chahiye ki video kya hai.</li>
            <li><strong>High contrast</strong>: Background aur foreground alag colors se choose karo. Light text dark background par aur vice versa.</li>
            <li><strong>Branding</strong>: Consistent colors aur logo se viewers ko aapka content recognize hota hai.</li>
          </ul>

          <h3>How to use extracted thumbnails</h3>
          <p>
            - <strong>As a reference:</strong> Agar aap thumbnail update karna chahte ho, old thumbnail ko dekh kar style replicate karo.
            - <strong>For social posts:</strong> Thumbnail image ko download karke Instagram ya WhatsApp posts mein use karo.
            - <strong>For presentations:</strong> Agar aap video se related presentation bana rahe ho, toh thumbnail ek quick visual represent karta hai.
          </p>

          <h3>Download best quality</h3>
          <p>
            Not all videos have maxresdefault thumbnail. Agar maxresdefault 404 aata hai, use hqdefault ya sddefault try karo. Ye tool automatically provide karta hai alternate sizes, jisse aap easily check kar sakte ho.
          </p>

          <h3>Legal note</h3>
          <p>
            Thumbnails copyrighted content hoti hain. Agar aap kisi aur ka thumbnail use kar rahe hain, toh ensure aapke paas permission ho ya usage fair use ke andar ho. Personal use aur reference ke liye download theek hai; commercial reuse pe copyright owner se permission lena best practice hai.
          </p>

          <h3>Tips for thumbnail editing</h3>
          <p>
              - Use tools like Canva, Kapwing, ya Photoshop to edit thumbnails.<br />
              - Keep file size &lt; 2MB.<br />
          </p>

          <h3>Final takeaway</h3>
          <p>
            YouTube thumbnails ka good design ek simple investment hai jo aapke video performance ko lift kar sakta hai. Is extractor tool se aap existing thumbnails download karke sikho ki kya kaam karta hai, aur phir apni custom thumbnails banaya karo.
          </p>

          <h3>Long-term strategy</h3>
          <p>
            Jo thumbnails consistently achha perform karte hain, unka style note karo. Aapke channel ke top videos ke thumbnails ka ek style guide banao - colors, fonts, layout. Apne next 5-10 videos me ye style try karo aur results track karo.
          </p>

          <h3>Common mistakes</h3>
          <ul>
            <li><strong>Overcrowding:</strong> Itni details na dalen ki thumbnail cluttered lage.</li>
            <li><strong>Irrelevant images:</strong> Jo thumbnail video se match nahi karta, wo viewers ko confuse karta hai aur watch time ghatata hai.</li>
            <li><strong>Tiny text:</strong> Mobile pe text small dikhega; make sure it is legible at small sizes.</li>
          </ul>

          <p>
            Ek strong thumbnail strategy se aap YouTube algorithm ko bhi signal dete ho ki aapka content click-worthy hai. Yeh tool aapke workflow ko fast banata hai — ek click se thumbnails access karein aur apne design process ko improve karein.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

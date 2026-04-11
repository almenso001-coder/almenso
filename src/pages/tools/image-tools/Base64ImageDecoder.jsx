import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function Base64ImageDecoder() {
  const [input, setInput]   = useState('')
  const [preview, setPreview] = useState('')
  const [error, setError]   = useState('')

  const decode = () => {
    setError(''); setPreview('')
    let str = input.trim()
    if (!str) { setError('Please paste a Base64 string or Data URL.'); return }
    // If raw base64 without prefix, try adding one
    if (!str.startsWith('data:')) {
      str = 'data:image/png;base64,' + str
    }
    // Validate
    const img = new Image()
    img.onload  = () => setPreview(str)
    img.onerror = () => setError('Invalid Base64 string. Please check your input.')
    img.src = str
  }

  const download = () => {
    const ext = preview.includes('jpeg') ? 'jpg' : preview.includes('webp') ? 'webp' : 'png'
    const a = document.createElement('a'); a.href = preview; a.download = `decoded-image.${ext}`; a.click()
  }

  const reset = () => { setInput(''); setPreview(''); setError('') }

  return (
    <ToolWrapper
      title="Base64 Image Decoder — Convert Base64 to Image Online"
      description="Decode Base64 strings back to images instantly. Paste any Base64 or Data URL and preview/download the image."
      keywords="base64 image decoder, base64 to image, decode base64, data URL to image"
      emoji="🔓" heroColor="linear-gradient(135deg,#1a1a2e,#0ea5e9)"
      toolName="Base64 Image Decoder" tagline="Decode Base64 strings back to images — free & instant"
      guideSteps={[
        { heading:'Paste Base64', text:'Paste a Base64 encoded string or full Data URL.' },
        { heading:'Decode', text:'Click Decode Image to preview the result.' },
        { heading:'Download', text:'Download the decoded image as PNG or JPG.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'What formats work?', a:'Any valid Base64 image string — PNG, JPG, GIF, WebP, SVG.' },
        { q:'Does it upload my data?', a:'No — all decoding happens in your browser.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📄 Paste Base64 String</div>
        <textarea
          value={input} onChange={e => setInput(e.target.value)}
          placeholder="Paste Base64 string or Data URL here (data:image/png;base64,...)"
          style={{ width:'100%', minHeight:140, padding:'10px', border:'1.5px solid #e2e8f0', borderRadius:8, fontFamily:'monospace', fontSize:'0.75rem', background:'#f8fafc', resize:'vertical' }}
        />
        {error && <div style={{ marginTop:8, padding:'8px 12px', background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:8, color:'#dc2626', fontSize:'0.82rem', fontWeight:600 }}>⚠️ {error}</div>}
        <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
          <button onClick={decode} style={{ minHeight:44, padding:'0 20px', background:'#0ea5e9', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            🔓 Decode Image
          </button>
          {input && <button onClick={reset} style={{ minHeight:44, padding:'0 16px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:10, fontWeight:700, fontSize:'0.85rem', cursor:'pointer', fontFamily:'inherit', color:'#dc2626' }}>Reset</button>}
        </div>
      </div>

      {preview && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">🖼️ Decoded Image</div>
            <img loading="lazy" src={preview} alt="Decoded" style={{ width:'100%', maxHeight:360, objectFit:'contain', background:'repeating-conic-gradient(#e2e8f0 0% 25%,#fff 0% 50%) 0 0/20px 20px', borderRadius:10 }} />
          </div>
          <div className="tp-card" style={{ textAlign:'center' }}>
            <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
              ⬇️ Download Decoded Image
            </button>
          </div>
        </>
      )}
    </ToolWrapper>
  )
}

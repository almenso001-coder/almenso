import React, { useState, useRef } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageConverter() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [format, setFormat]   = useState('image/png')
  const [quality, setQuality] = useState(92)
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    setPreview(URL.createObjectURL(f))
  }

  const convert = () => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (format === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height) }
      ctx.drawImage(img, 0, 0)
      const q = format === 'image/png' ? undefined : quality / 100
      setResult(canvas.toDataURL(format, q))
    }
    img.src = preview
  }

  const ext = { 'image/png':'png', 'image/jpeg':'jpg', 'image/webp':'webp' }

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-converted.${ext[format]}`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setFileName('') }

  return (
    <ToolWrapper
      title="Image Format Converter — Convert JPG PNG WebP Online"
      description="Convert images between JPG, PNG, and WebP formats instantly. Free, no upload, works in browser."
      keywords="image converter, jpg to png, png to webp, image format converter online"
      emoji="🔄" heroColor="linear-gradient(135deg,#1a1a2e,#3b82f6)"
      toolName="Image Format Converter" tagline="Convert JPG ↔ PNG ↔ WebP — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Choose output format', text:'Select JPG, PNG, or WebP as the output.' },
        { heading:'Convert & Download', text:'Click Convert and download.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my image?', a:'No — all in your browser.' },
        { q:'PNG vs JPG — what to use?', a:'PNG for graphics/screenshots (no quality loss). JPG for photos (smaller file). WebP is best for web (smallest size).' },
      ]}
    >
      <canvas ref={canvasRef} style={{ display:'none' }} />
      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Image</div>
        <input type="file" accept="image/*" onChange={onFile} />
        {preview && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>
      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔄 Output Format</div>
          <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
            {[['image/png','PNG (Lossless)'],['image/jpeg','JPG (Smaller)'],['image/webp','WebP (Best for Web)']].map(([val,label]) => (
              <button key={val} onClick={() => setFormat(val)}
                style={{ padding:'10px 16px', borderRadius:10, border:`2px solid ${format===val?'#3b82f6':'#e2e8f0'}`, background:format===val?'#eff6ff':'#f8fafc', color:format===val?'#1d4ed8':'#475569', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', fontFamily:'inherit', minHeight:44 }}>
                {label}
              </button>
            ))}
          </div>
          {format !== 'image/png' && (
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:6 }}>Quality: <strong style={{ color:'#3b82f6' }}>{quality}%</strong></label>
              <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(+e.target.value)} style={{ width:'100%', accentColor:'#3b82f6' }} />
            </div>
          )}
          <button onClick={convert} style={{ width:'100%', minHeight:44, background:'#3b82f6', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            🔄 Convert to {ext[format].toUpperCase()}
          </button>
        </div>
      )}
      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 Preview</div>
          <img loading="lazy" src={result || preview} alt="Preview" style={{ width:'100%', borderRadius:10, maxHeight:300, objectFit:'contain', background:'#f1f5f9' }} />
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download as {ext[format].toUpperCase()}
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

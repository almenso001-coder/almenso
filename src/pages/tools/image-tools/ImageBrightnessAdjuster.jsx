import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageBrightnessAdjuster() {
  const [preview, setPreview]     = useState('')
  const [result, setResult]       = useState('')
  const [fileName, setFileName]   = useState('')
  const [brightness, setBrightness] = useState(0)    // -100 to +100
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult(''); setBrightness(0)
    setPreview(URL.createObjectURL(f))
  }

  const apply = useCallback(() => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imgData.data
      const val = brightness * 2.55 // convert -100/+100 to -255/+255
      for (let i = 0; i < d.length; i += 4) {
        d[i]   = Math.min(255, Math.max(0, d[i]   + val))
        d[i+1] = Math.min(255, Math.max(0, d[i+1] + val))
        d[i+2] = Math.min(255, Math.max(0, d[i+2] + val))
      }
      ctx.putImageData(imgData, 0, 0)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, brightness])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-brightness-${brightness > 0 ? '+' : ''}${brightness}.png`; a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setBrightness(0); setFileName('') }

  return (
    <ToolWrapper
      title="Image Brightness Adjuster — Brighten or Darken Photos"
      description="Adjust image brightness online for free. Brighten dark photos or darken bright ones instantly."
      keywords="image brightness, adjust brightness, brighten photo, darken image online"
      emoji="☀️" heroColor="linear-gradient(135deg,#1a1a2e,#f59e0b)"
      toolName="Brightness Adjuster" tagline="Brighten or darken images instantly — free & in-browser"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP image.' },
        { heading:'Adjust brightness', text:'Move the slider — positive values brighten, negative darken.' },
        { heading:'Apply & Download', text:'Click Apply and download the result.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my image?', a:'No — all processing in your browser.' },
        { q:'Can I adjust by how much?', a:'Range is -100 (very dark) to +100 (very bright). 0 is original.' },
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
          <div className="tp-sec-title">☀️ Brightness</div>
          <label style={{ fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:6 }}>
            Value: <strong style={{ color: brightness >= 0 ? '#f59e0b' : '#3b82f6' }}>{brightness > 0 ? `+${brightness}` : brightness}</strong>
          </label>
          <input type="range" min={-100} max={100} value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width:'100%', accentColor:'#f59e0b' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
            <span>-100 (Dark)</span><span>0 (Original)</span><span>+100 (Bright)</span>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#f59e0b', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', marginTop:14 }}>
            ☀️ Apply Brightness
          </button>
        </div>
      )}

      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 Preview</div>
          <div style={{ display:'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap:12 }}>
            <div>
              <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#94a3b8', marginBottom:6 }}>ORIGINAL</div>
              <img loading="lazy" src={preview} alt="Original" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
            </div>
            {result && (
              <div>
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#f59e0b', marginBottom:6 }}>ADJUSTED ✅</div>
                <img loading="lazy" src={result} alt="Adjusted" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Adjusted Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

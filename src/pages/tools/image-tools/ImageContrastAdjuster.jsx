import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageContrastAdjuster() {
  const [preview, setPreview]   = useState('')
  const [result, setResult]     = useState('')
  const [fileName, setFileName] = useState('')
  const [contrast, setContrast] = useState(0) // -100 to +100
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult(''); setContrast(0)
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
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
      for (let i = 0; i < d.length; i += 4) {
        d[i]   = Math.min(255, Math.max(0, factor * (d[i]   - 128) + 128))
        d[i+1] = Math.min(255, Math.max(0, factor * (d[i+1] - 128) + 128))
        d[i+2] = Math.min(255, Math.max(0, factor * (d[i+2] - 128) + 128))
      }
      ctx.putImageData(imgData, 0, 0)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, contrast])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-contrast.png`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setContrast(0); setFileName('') }

  return (
    <ToolWrapper
      title="Image Contrast Adjuster — Increase or Decrease Contrast"
      description="Adjust image contrast online for free. Make images pop or reduce harsh contrast instantly."
      keywords="image contrast, adjust contrast, increase contrast photo, image editor online"
      emoji="🌗" heroColor="linear-gradient(135deg,#1a1a2e,#6366f1)"
      toolName="Contrast Adjuster" tagline="Increase or decrease image contrast — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Adjust contrast', text:'Drag the slider — positive values increase, negative decrease contrast.' },
        { heading:'Apply & Download', text:'Click Apply and download.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[{ q:'Does it upload my image?', a:'No — all processing in your browser.' }]}
    >
      <canvas ref={canvasRef} style={{ display:'none' }} />
      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Image</div>
        <input type="file" accept="image/*" onChange={onFile} />
        {preview && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>
      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🌗 Contrast</div>
          <label style={{ fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:6 }}>
            Value: <strong style={{ color:'#6366f1' }}>{contrast > 0 ? `+${contrast}` : contrast}</strong>
          </label>
          <input type="range" min={-100} max={100} value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width:'100%', accentColor:'#6366f1' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
            <span>-100 (Low)</span><span>0 (Normal)</span><span>+100 (High)</span>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#6366f1', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', marginTop:14 }}>
            🌗 Apply Contrast
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#6366f1', marginBottom:6 }}>ADJUSTED ✅</div>
                <img loading="lazy" src={result} alt="Adjusted" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

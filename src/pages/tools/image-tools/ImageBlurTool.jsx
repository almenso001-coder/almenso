import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageBlurTool() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [blurRadius, setBlurRadius] = useState(3)
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult(''); setBlurRadius(3)
    setPreview(URL.createObjectURL(f))
  }

  const apply = useCallback(() => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.filter = `blur(${blurRadius}px)`
      ctx.drawImage(img, 0, 0)
      ctx.filter = 'none'
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, blurRadius])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-blur-${blurRadius}px.png`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setBlurRadius(3); setFileName('') }

  return (
    <ToolWrapper
      title="Image Blur Tool — Blur Photos Online Free"
      description="Apply blur effect to images instantly in your browser. Adjust blur intensity and download."
      keywords="image blur, blur photo, blur effect, gaussian blur online"
      emoji="💧" heroColor="linear-gradient(135deg,#1a1a2e,#06b6d4)"
      toolName="Image Blur" tagline="Apply blur effect to images — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Set blur radius', text:'Higher values = more blur. 1–2 is subtle, 10+ is strong.' },
        { heading:'Apply & Download', text:'Click Apply Blur and download.' },
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
          <div className="tp-sec-title">💧 Blur Radius</div>
          <label style={{ fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:6 }}>
            Radius: <strong style={{ color:'#06b6d4' }}>{blurRadius}px</strong>
          </label>
          <input type="range" min={1} max={20} value={blurRadius} onChange={e => setBlurRadius(+e.target.value)} style={{ width:'100%', accentColor:'#06b6d4' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
            <span>1px (Subtle)</span><span>10px (Medium)</span><span>20px (Strong)</span>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#06b6d4', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', marginTop:14 }}>
            💧 Apply Blur
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#06b6d4', marginBottom:6 }}>BLURRED ✅</div>
                <img loading="lazy" src={result} alt="Blurred" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Blurred Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

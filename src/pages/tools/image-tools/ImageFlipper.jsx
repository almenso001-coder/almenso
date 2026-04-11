import React, { useState, useRef } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageFlipper() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    setPreview(URL.createObjectURL(f))
  }

  const flip = (horizontal) => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width  = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.translate(horizontal ? img.width : 0, horizontal ? 0 : img.height)
      ctx.scale(horizontal ? -1 : 1, horizontal ? 1 : -1)
      ctx.drawImage(img, 0, 0)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = result || preview
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = result; a.download = `${fileName || 'image'}-flipped.png`; a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setFileName('') }

  const BtnStyle = { minHeight:44, padding:'0 18px', border:'1.5px solid #e2e8f0', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', background:'#f8fafc', color:'#0f172a' }

  return (
    <ToolWrapper
      title="Image Flipper — Flip Photos Online Free"
      description="Flip images horizontally or vertically in your browser. Free, instant, no upload."
      keywords="image flipper, flip photo, mirror image, flip horizontal vertical"
      emoji="🔁" heroColor="linear-gradient(135deg,#1a1a2e,#8b5cf6)"
      toolName="Image Flipper" tagline="Flip images horizontally or vertically — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP image.' },
        { heading:'Click flip button', text:'Flip horizontally (mirror) or vertically.' },
        { heading:'Download', text:'Download the flipped image as PNG.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my image?', a:'No — all processing in your browser.' },
        { q:'Can I flip multiple times?', a:'Yes — each flip applies to the current state.' },
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
          <div className="tp-sec-title">🔁 Flip Controls</div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button style={BtnStyle} onClick={() => flip(true)}>↔ Flip Horizontal (Mirror)</button>
            <button style={BtnStyle} onClick={() => flip(false)}>↕ Flip Vertical</button>
          </div>
        </div>
      )}

      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 Preview</div>
          <img loading="lazy" src={result || preview} alt="Preview" style={{ width:'100%', borderRadius:10, maxHeight:320, objectFit:'contain', background:'#f1f5f9' }} />
        </div>
      )}

      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Flipped Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

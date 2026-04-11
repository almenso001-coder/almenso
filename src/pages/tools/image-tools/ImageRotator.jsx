import React, { useState, useRef } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageRotator() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [angle, setAngle]     = useState(0)
  const [fileName, setFileName] = useState('')
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult(''); setAngle(0)
    setPreview(URL.createObjectURL(f))
  }

  const applyRotation = (deg) => {
    if (!preview) return
    const newAngle = (angle + deg + 360) % 360
    setAngle(newAngle)
    renderRotated(newAngle)
  }

  const renderRotated = (deg) => {
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx    = canvas.getContext('2d')
      const rad    = (deg * Math.PI) / 180
      const sin    = Math.abs(Math.sin(rad))
      const cos    = Math.abs(Math.cos(rad))
      canvas.width  = img.width * cos + img.height * sin
      canvas.height = img.width * sin + img.height * cos
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rad)
      ctx.drawImage(img, -img.width / 2, -img.height / 2)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = result || preview
    a.download = `${fileName || 'image'}-rotated-${angle}deg.png`
    a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setAngle(0); setFileName('') }

  const BtnStyle = { minHeight:44, padding:'0 18px', border:'1.5px solid #e2e8f0', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', background:'#f8fafc', color:'#0f172a' }

  return (
    <ToolWrapper
      title="Image Rotator — Rotate Photos Online Free"
      description="Rotate images 90°, 180°, 270° instantly in your browser. Free, no upload needed."
      keywords="image rotator, rotate photo, rotate image online, flip image"
      emoji="🔄" heroColor="linear-gradient(135deg,#1a1a2e,#f97316)"
      toolName="Image Rotator" tagline="Rotate images 90°/180°/270° — free, instant, no upload"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP image.' },
        { heading:'Click rotation buttons', text:'Use the rotation buttons to rotate left, right, or 180°.' },
        { heading:'Download', text:'Download the rotated image as PNG.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my image?', a:'No — everything happens in your browser.' },
        { q:'Can I rotate multiple times?', a:'Yes — click as many times as needed. The angle accumulates.' },
        { q:'What format is the output?', a:'PNG format which preserves quality without compression.' },
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
          <div className="tp-sec-title">🔄 Rotation Controls</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
            <button style={BtnStyle} onClick={() => applyRotation(-90)}>↺ Rotate Left 90°</button>
            <button style={BtnStyle} onClick={() => applyRotation(90)}>↻ Rotate Right 90°</button>
            <button style={BtnStyle} onClick={() => applyRotation(180)}>↕ Rotate 180°</button>
          </div>
          <div style={{ fontSize:'0.8rem', color:'#64748b' }}>Current angle: <strong style={{ color:'#f97316' }}>{angle}°</strong></div>
        </div>
      )}

      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 Preview</div>
          <img loading="lazy" src={result || preview} alt="Preview" style={{ width:'100%', borderRadius:10, maxHeight:320, objectFit:'contain', background:'#f1f5f9' }} />
        </div>
      )}

      {(result || preview) && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Rotated Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

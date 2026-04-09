import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageCropper() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [cropX, setCropX]     = useState(0)
  const [cropY, setCropY]     = useState(0)
  const [cropW, setCropW]     = useState(100)
  const [cropH, setCropH]     = useState(100)
  const [imgSize, setImgSize] = useState({ w:0, h:0 })
  const canvasRef = useRef(null)
  const imgRef    = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    const url = URL.createObjectURL(f)
    setPreview(url)
    const img = new Image()
    img.onload = () => {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight })
      setCropX(0); setCropY(0)
      setCropW(img.naturalWidth); setCropH(img.naturalHeight)
    }
    img.src = url
  }

  const applyCrop = useCallback(() => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width  = cropW
      canvas.height = cropH
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, cropX, cropY, cropW, cropH])

  const download = () => {
    const a = document.createElement('a')
    a.href = result; a.download = `${fileName || 'image'}-cropped.png`; a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setFileName(''); setImgSize({ w:0, h:0 }) }

  const numInput = (label, val, setter, max) => (
    <div style={{ flex:1 }}>
      <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4, color:'#475569' }}>{label}</label>
      <input
        type="number" value={val} min={0} max={max}
        onChange={e => setter(Math.min(+e.target.value, max))}
        style={{ width:'100%', padding:'8px 10px', border:'1.5px solid #e2e8f0', borderRadius:8, fontFamily:'inherit', fontSize:'0.88rem' }}
      />
    </div>
  )

  return (
    <ToolWrapper
      title="Image Cropper — Crop Photos Online Free"
      description="Crop images with pixel-perfect precision in your browser. Free, no upload needed."
      keywords="image cropper, crop photo online, crop image, trim image"
      emoji="✂️" heroColor="linear-gradient(135deg,#1a1a2e,#2563eb)"
      toolName="Image Cropper" tagline="Crop images with pixel precision — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP image.' },
        { heading:'Set crop area', text:'Enter X, Y, Width, Height values in pixels.' },
        { heading:'Crop & Download', text:'Click Crop Image and download the result.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my image?', a:'No — all processing in your browser.' },
        { q:'What units are used?', a:'All values are in pixels based on the original image dimensions.' },
      ]}
    >
      <canvas ref={canvasRef} style={{ display:'none' }} />

      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Image</div>
        <input type="file" accept="image/*" onChange={onFile} />
        {imgSize.w > 0 && <div style={{ fontSize:'0.78rem', color:'#64748b', marginTop:8 }}>Image size: <strong>{imgSize.w} × {imgSize.h} px</strong></div>}
        {preview && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>

      {preview && imgSize.w > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">✂️ Crop Settings (pixels)</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
            {numInput('Start X', cropX, setCropX, imgSize.w)}
            {numInput('Start Y', cropY, setCropY, imgSize.h)}
            {numInput('Width',  cropW, setCropW, imgSize.w - cropX)}
            {numInput('Height', cropH, setCropH, imgSize.h - cropY)}
          </div>
          <div style={{ fontSize:'0.75rem', color:'#94a3b8', marginBottom:12 }}>
            Crop area: <strong style={{ color:'#2563eb' }}>{cropW} × {cropH} px</strong> starting at ({cropX}, {cropY})
          </div>
          <button onClick={applyCrop} style={{ width:'100%', minHeight:44, background:'#2563eb', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ✂️ Crop Image
          </button>
        </div>
      )}

      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 {result ? 'Cropped Result' : 'Original Preview'}</div>
          <img src={result || preview} alt="Preview" ref={imgRef} style={{ width:'100%', borderRadius:10, maxHeight:320, objectFit:'contain', background:'#f1f5f9' }} />
        </div>
      )}

      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Cropped Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

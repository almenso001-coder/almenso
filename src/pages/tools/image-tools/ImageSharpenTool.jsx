import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

// Convolution kernel for sharpening
function applyConvolution(ctx, w, h, kernel) {
  const src  = ctx.getImageData(0, 0, w, h)
  const dst  = ctx.createImageData(w, h)
  const s = src.data, d = dst.data
  const kLen = Math.sqrt(kernel.length), half = Math.floor(kLen/2)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r=0,g=0,b=0
      for (let ky = 0; ky < kLen; ky++) {
        for (let kx = 0; kx < kLen; kx++) {
          const px = Math.min(w-1, Math.max(0, x+kx-half))
          const py = Math.min(h-1, Math.max(0, y+ky-half))
          const idx = (py*w+px)*4
          const k = kernel[ky*kLen+kx]
          r += s[idx]*k; g += s[idx+1]*k; b += s[idx+2]*k
        }
      }
      const i = (y*w+x)*4
      d[i]=Math.min(255,Math.max(0,r)); d[i+1]=Math.min(255,Math.max(0,g))
      d[i+2]=Math.min(255,Math.max(0,b)); d[i+3]=s[i+3]
    }
  }
  ctx.putImageData(dst, 0, 0)
}

export default function ImageSharpenTool() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [strength, setStrength] = useState(1)
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult(''); setStrength(1)
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
      const s = strength
      const kernel = [0,-s,0,-s,1+4*s,-s,0,-s,0]
      applyConvolution(ctx, canvas.width, canvas.height, kernel)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, strength])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-sharpened.png`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setStrength(1); setFileName('') }

  return (
    <ToolWrapper
      title="Image Sharpen Tool — Sharpen Blurry Photos Online"
      description="Sharpen blurry or soft images online for free. Adjust sharpness intensity and download."
      keywords="image sharpen, sharpen photo, unblur image, sharpen tool online"
      emoji="🔍" heroColor="linear-gradient(135deg,#1a1a2e,#14b8a6)"
      toolName="Image Sharpen" tagline="Sharpen blurry photos — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Set strength', text:'Higher values = more sharpening. Start with 1–2 for subtle effect.' },
        { heading:'Apply & Download', text:'Click Sharpen Image and download.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[{ q:'Does it upload my image?', a:'No — all processing in your browser.' }, { q:'Is over-sharpening possible?', a:'Yes — very high values (4+) can create artifacts. Use 1–2 for natural results.' }]}
    >
      <canvas ref={canvasRef} style={{ display:'none' }} />
      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Image</div>
        <input type="file" accept="image/*" onChange={onFile} />
        {preview && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>
      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔍 Sharpness Strength</div>
          <label style={{ fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:6 }}>
            Strength: <strong style={{ color:'#14b8a6' }}>{strength}</strong>
          </label>
          <input type="range" min={0.5} max={5} step={0.5} value={strength} onChange={e => setStrength(+e.target.value)} style={{ width:'100%', accentColor:'#14b8a6' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
            <span>0.5 (Subtle)</span><span>2 (Medium)</span><span>5 (Strong)</span>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#14b8a6', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', marginTop:14 }}>
            🔍 Sharpen Image
          </button>
        </div>
      )}
      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 Preview</div>
          <div style={{ display:'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap:12 }}>
            <div>
              <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#94a3b8', marginBottom:6 }}>ORIGINAL</div>
              <img src={preview} alt="Original" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
            </div>
            {result && (
              <div>
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#14b8a6', marginBottom:6 }}>SHARPENED ✅</div>
                <img src={result} alt="Sharpened" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Sharpened Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

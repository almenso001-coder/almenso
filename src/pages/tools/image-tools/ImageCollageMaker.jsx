import React, { useState, useRef } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

const LAYOUTS = [
  { id:'2h', label:'2 Side by Side', cols:2, rows:1 },
  { id:'2v', label:'2 Top/Bottom',   cols:1, rows:2 },
  { id:'3l', label:'3 Grid',         cols:3, rows:1 },
  { id:'4g', label:'4 Grid (2×2)',   cols:2, rows:2 },
]

export default function ImageCollageMaker() {
  const [images, setImages]   = useState([])
  const [layout, setLayout]   = useState('2h')
  const [gap, setGap]         = useState(4)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [result, setResult]   = useState('')
  const [processing, setProcessing] = useState(false)
  const canvasRef = useRef(null)

  const onFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4)
    setResult('')
    const loaded = []
    files.forEach((f, i) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        loaded[i] = ev.target.result
        if (loaded.filter(Boolean).length === files.length) {
          setImages(loaded.filter(Boolean))
        }
      }
      reader.readAsDataURL(f)
    })
  }

  const makeCollage = () => {
    if (images.length < 2) { alert('Please upload at least 2 images.'); return }
    setProcessing(true)
    const l = LAYOUTS.find(x => x.id === layout) || LAYOUTS[0]
    const cellW = 400, cellH = 300
    const canvas = canvasRef.current
    canvas.width  = l.cols * cellW + (l.cols - 1) * gap
    canvas.height = l.rows * cellH + (l.rows - 1) * gap
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let loaded = 0
    const total = Math.min(images.length, l.cols * l.rows)

    images.slice(0, total).forEach((src, idx) => {
      const img = new Image()
      img.onload = () => {
        const col = idx % l.cols
        const row = Math.floor(idx / l.cols)
        const x   = col * (cellW + gap)
        const y   = row * (cellH + gap)
        // Cover fit
        const scale = Math.max(cellW / img.width, cellH / img.height)
        const sw = cellW / scale, sh = cellH / scale
        const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2
        ctx.drawImage(img, sx, sy, sw, sh, x, y, cellW, cellH)
        loaded++
        if (loaded === total) { setResult(canvas.toDataURL('image/jpeg', 0.95)); setProcessing(false) }
      }
      img.src = src
    })
  }

  const download = () => {
    const a = document.createElement('a'); a.href = result; a.download = 'collage.jpg'; a.click()
  }
  const reset = () => { setImages([]); setResult('') }

  return (
    <ToolWrapper
      title="Image Collage Maker — Create Photo Collage Online Free"
      description="Create beautiful photo collages online for free. Combine 2–4 images in different grid layouts."
      keywords="image collage maker, photo collage online, combine images, collage creator free"
      emoji="🖼️" heroColor="linear-gradient(135deg,#1a1a2e,#f97316)"
      toolName="Image Collage Maker" tagline="Combine 2–4 photos into collages — free & instant"
      guideSteps={[
        { heading:'Upload images', text:'Choose 2–4 images from your device.' },
        { heading:'Choose layout', text:'Pick a layout — side by side, grid, or stack.' },
        { heading:'Create & Download', text:'Click Make Collage and download the result.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my images?', a:'No — all processing in your browser.' },
        { q:'How many images can I combine?', a:'Up to 4 images in different grid layouts.' },
      ]}
    >
      <canvas ref={canvasRef} style={{ display:'none' }} />

      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload 2–4 Images</div>
        <input type="file" accept="image/*" multiple onChange={onFiles} />
        {images.length > 0 && (
          <div style={{ marginTop:10, fontSize:'0.82rem', color:'#10b981', fontWeight:700 }}>
            ✅ {images.length} image{images.length > 1 ? 's' : ''} loaded
          </div>
        )}
        {images.length > 0 && <button onClick={reset} style={{ marginTop:8, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>

      {images.length >= 2 && (
        <div className="tp-card">
          <div className="tp-sec-title">⚙️ Collage Settings</div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:8 }}>Layout</label>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {LAYOUTS.map(l => (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  style={{ padding:'9px 14px', borderRadius:10, border:`2px solid ${layout===l.id?'#f97316':'#e2e8f0'}`, background:layout===l.id?'#fff7ed':'#f8fafc', color:layout===l.id?'#ea580c':'#475569', fontWeight:700, fontSize:'0.78rem', cursor:'pointer', fontFamily:'inherit', minHeight:40 }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
            <div>
              <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4 }}>Gap: <strong style={{ color:'#f97316' }}>{gap}px</strong></label>
              <input type="range" min={0} max={20} value={gap} onChange={e => setGap(+e.target.value)} style={{ width:'100%', accentColor:'#f97316' }} />
            </div>
            <div>
              <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4 }}>Background</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width:'100%', height:40, border:'1.5px solid #e2e8f0', borderRadius:8, cursor:'pointer', padding:2 }} />
            </div>
          </div>
          <button onClick={makeCollage} disabled={processing}
            style={{ width:'100%', minHeight:44, background:'#f97316', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            {processing ? '⏳ Creating...' : '🖼️ Make Collage'}
          </button>
        </div>
      )}

      {result && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">✅ Your Collage</div>
            <img src={result} alt="Collage" style={{ width:'100%', borderRadius:10, maxHeight:400, objectFit:'contain', background:'#f1f5f9' }} />
          </div>
          <div className="tp-card" style={{ textAlign:'center' }}>
            <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
              ⬇️ Download Collage
            </button>
          </div>
        </>
      )}
    </ToolWrapper>
  )
}

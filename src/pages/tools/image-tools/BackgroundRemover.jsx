import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function BackgroundRemover() {
  const [preview, setPreview]       = useState('')
  const [result, setResult]         = useState('')
  const [tolerance, setTolerance]   = useState(30)
  const [processing, setProcessing] = useState(false)
  const [fileName, setFileName]     = useState('')
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    setPreview(URL.createObjectURL(f))
  }

  const removeBackground = useCallback(() => {
    if (!preview) return
    setProcessing(true)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width  = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imgData.data
      // Sample top-left corner as background color
      const sr = d[0], sg = d[1], sb = d[2]
      for (let i = 0; i < d.length; i += 4) {
        const diff = Math.sqrt((d[i]-sr)**2 + (d[i+1]-sg)**2 + (d[i+2]-sb)**2)
        if (diff < tolerance) d[i+3] = 0
      }
      ctx.putImageData(imgData, 0, 0)
      setResult(canvas.toDataURL('image/png'))
      setProcessing(false)
    }
    img.src = preview
  }, [preview, tolerance])

  const download = () => {
    const a = document.createElement('a')
    a.href = result; a.download = `${fileName || 'image'}-bg-removed.png`; a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setFileName('') }

  const S = { btn: (bg) => ({ minHeight:44, padding:'0 20px', background:bg, color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }) }

  return (
    <ToolWrapper
      title="Background Remover — Remove Image Background Online"
      description="Remove white or solid color backgrounds from images instantly. Free, no upload, works in browser."
      keywords="background remover, remove white background, transparent background, image editor"
      emoji="🧼" heroColor="linear-gradient(135deg,#1a1a2e,#10b981)"
      toolName="Background Remover" tagline="Remove white/solid backgrounds — free, instant, no upload"
      guideSteps={[
        { heading:'Upload image', text:'Choose a JPG or PNG with a solid/white background.' },
        { heading:'Adjust tolerance', text:'Higher tolerance removes more background shades.' },
        { heading:'Remove & Download', text:'Click Remove Background, then download as transparent PNG.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Does it upload my image?', a:'No — all processing is done in your browser. Your image never leaves your device.' },
        { q:'Which backgrounds work best?', a:'White, solid, or near-solid color backgrounds work best. Complex backgrounds need higher tolerance.' },
        { q:'Why PNG output?', a:'PNG supports transparency so the removed areas become transparent in the downloaded file.' },
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
          <div className="tp-sec-title">⚙️ Tolerance</div>
          <label style={{ fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:6 }}>
            Value: <strong style={{ color:'#10b981' }}>{tolerance}</strong> <span style={{ color:'#94a3b8', fontWeight:400 }}>(low = precise, high = aggressive)</span>
          </label>
          <input type="range" min={5} max={100} value={tolerance} onChange={e => setTolerance(+e.target.value)} style={{ width:'100%', accentColor:'#10b981' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
            <span>5 — Precise</span><span>100 — Aggressive</span>
          </div>
          <button onClick={removeBackground} disabled={processing} style={{ ...S.btn('#10b981'), marginTop:14, width:'100%' }}>
            {processing ? '⏳ Processing...' : '✂️ Remove Background'}
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#10b981', marginBottom:6 }}>REMOVED ✅</div>
                <img src={result} alt="Result" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'repeating-conic-gradient(#e2e8f0 0% 25%,#fff 0% 50%) 0 0/20px 20px' }} />
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={S.btn('#0f8a1f')}>⬇️ Download Transparent PNG</button>
          <p style={{ fontSize:'0.75rem', color:'#94a3b8', marginTop:8 }}>Edges rough? Try lowering tolerance and removing again.</p>
        </div>
      )}
    </ToolWrapper>
  )
}

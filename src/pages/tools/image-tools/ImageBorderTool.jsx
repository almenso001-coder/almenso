import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageBorderTool() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [borderSize, setBorderSize] = useState(20)
  const [borderColor, setBorderColor] = useState('#ffffff')
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    setPreview(URL.createObjectURL(f))
  }

  const apply = useCallback(() => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      const b = borderSize
      canvas.width  = img.width  + b * 2
      canvas.height = img.height + b * 2
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = borderColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, b, b)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, borderSize, borderColor])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-bordered.png`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setFileName(''); setBorderSize(20) }

  return (
    <ToolWrapper
      title="Image Border Tool — Add Border to Photo Online"
      description="Add colored borders to images instantly in your browser. Choose border size and color."
      keywords="image border, add border photo, photo frame online, image border tool"
      emoji="🖼️" heroColor="linear-gradient(135deg,#1a1a2e,#a855f7)"
      toolName="Image Border Tool" tagline="Add colored borders to images — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Set border', text:'Choose border size in pixels and pick a color.' },
        { heading:'Apply & Download', text:'Click Add Border and download.' },
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
          <div className="tp-sec-title">🖼️ Border Settings</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
            <div>
              <label style={{ fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:6 }}>Border Size: <strong style={{ color:'#a855f7' }}>{borderSize}px</strong></label>
              <input type="range" min={1} max={100} value={borderSize} onChange={e => setBorderSize(+e.target.value)} style={{ width:'100%', accentColor:'#a855f7' }} />
            </div>
            <div>
              <label style={{ fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:6 }}>Border Color</label>
              <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} style={{ width:'100%', height:44, border:'1.5px solid #e2e8f0', borderRadius:8, cursor:'pointer', padding:2 }} />
            </div>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#a855f7', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            🖼️ Add Border
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#a855f7', marginBottom:6 }}>WITH BORDER ✅</div>
                <img src={result} alt="Result" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Image with Border
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

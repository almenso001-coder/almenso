import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageWatermark() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [text, setText]       = useState('© Almenso.com')
  const [fontSize, setFontSize] = useState(32)
  const [opacity, setOpacity] = useState(60)
  const [color, setColor]     = useState('#ffffff')
  const [position, setPosition] = useState('bottom-right')
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    setPreview(URL.createObjectURL(f))
  }

  const apply = useCallback(() => {
    if (!preview || !text.trim()) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      ctx.globalAlpha = opacity / 100
      ctx.fillStyle   = color
      ctx.font        = `bold ${fontSize}px sans-serif`
      ctx.textBaseline = 'bottom'

      const margin = 20
      const tw = ctx.measureText(text).width
      let x, y
      switch(position) {
        case 'top-left':     x = margin;              y = fontSize + margin; break
        case 'top-right':    x = canvas.width-tw-margin; y = fontSize + margin; break
        case 'bottom-left':  x = margin;              y = canvas.height - margin; break
        case 'center':       x = (canvas.width-tw)/2; y = (canvas.height+fontSize)/2; break
        default:             x = canvas.width-tw-margin; y = canvas.height - margin // bottom-right
      }
      ctx.fillText(text, x, y)
      ctx.globalAlpha = 1
      setResult(canvas.toDataURL('image/jpeg', 0.95))
    }
    img.src = preview
  }, [preview, text, fontSize, opacity, color, position])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-watermarked.jpg`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setFileName('') }

  return (
    <ToolWrapper
      title="Image Watermark Tool — Add Text Watermark to Photos"
      description="Add custom text watermarks to images online for free. Choose position, size, opacity, and color."
      keywords="image watermark, add watermark, text watermark, watermark photo online"
      emoji="💧" heroColor="linear-gradient(135deg,#1a1a2e,#0ea5e9)"
      toolName="Image Watermark" tagline="Add text watermarks to images — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Customize watermark', text:'Enter text, choose position, size, opacity, and color.' },
        { heading:'Apply & Download', text:'Click Add Watermark and download.' },
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
          <div className="tp-sec-title">💧 Watermark Settings</div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:5 }}>Watermark Text</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Your watermark text..." style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #e2e8f0', borderRadius:8, fontFamily:'inherit', fontSize:'0.88rem' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
            <div>
              <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4 }}>Font Size: <strong style={{ color:'#0ea5e9' }}>{fontSize}px</strong></label>
              <input type="range" min={12} max={120} value={fontSize} onChange={e => setFontSize(+e.target.value)} style={{ width:'100%', accentColor:'#0ea5e9' }} />
            </div>
            <div>
              <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4 }}>Opacity: <strong style={{ color:'#0ea5e9' }}>{opacity}%</strong></label>
              <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)} style={{ width:'100%', accentColor:'#0ea5e9' }} />
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
            <div>
              <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4 }}>Text Color</label>
              <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width:'100%', height:40, border:'1.5px solid #e2e8f0', borderRadius:8, cursor:'pointer', padding:2 }} />
            </div>
            <div>
              <label style={{ fontSize:'0.75rem', fontWeight:700, display:'block', marginBottom:4 }}>Position</label>
              <select value={position} onChange={e => setPosition(e.target.value)} style={{ width:'100%', padding:'10px 10px', border:'1.5px solid #e2e8f0', borderRadius:8, fontFamily:'inherit', fontSize:'0.85rem' }}>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
                <option value="center">Center</option>
              </select>
            </div>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#0ea5e9', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            💧 Add Watermark
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#0ea5e9', marginBottom:6 }}>WATERMARKED ✅</div>
                <img src={result} alt="Result" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Watermarked Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

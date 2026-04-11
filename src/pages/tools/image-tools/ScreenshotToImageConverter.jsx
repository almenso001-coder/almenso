import React, { useState, useRef } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ScreenshotToImageConverter() {
  const [preview, setPreview] = useState('')
  const [result, setResult]   = useState('')
  const [format, setFormat]   = useState('image/png')
  const [quality, setQuality] = useState(95)
  const [fileName, setFileName] = useState('screenshot')
  const canvasRef = useRef(null)
  const pasteAreaRef = useRef(null)

  // File upload method
  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult('')
    setPreview(URL.createObjectURL(f))
  }

  // Clipboard paste method
  const handlePaste = (e) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile()
        setFileName('pasted-screenshot')
        setResult('')
        setPreview(URL.createObjectURL(blob))
        break
      }
    }
  }

  const convert = () => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (format === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height) }
      ctx.drawImage(img, 0, 0)
      const q = format === 'image/png' ? undefined : quality / 100
      setResult(canvas.toDataURL(format, q))
    }
    img.src = preview
  }

  const download = () => {
    const ext = { 'image/png':'png','image/jpeg':'jpg','image/webp':'webp' }[format]
    const a = document.createElement('a'); a.href = result || preview
    a.download = `${fileName}.${ext}`; a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setFileName('screenshot') }

  return (
    <ToolWrapper
      title="Screenshot to Image Converter — Save Screenshots as PNG/JPG"
      description="Convert screenshots to PNG, JPG, or WebP. Upload a screenshot file or paste directly from clipboard."
      keywords="screenshot to image, screenshot converter, paste screenshot, save screenshot PNG JPG"
      emoji="📸" heroColor="linear-gradient(135deg,#1a1a2e,#0891b2)"
      toolName="Screenshot to Image Converter" tagline="Convert screenshots to PNG/JPG/WebP — paste or upload"
      guideSteps={[
        { heading:'Upload or Paste', text:'Upload a screenshot file OR press Ctrl+V in the paste area to paste from clipboard.' },
        { heading:'Choose format', text:'Pick PNG (lossless), JPG (smaller), or WebP (best for web).' },
        { heading:'Convert & Download', text:'Click Convert and download the image.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'Can I paste from clipboard?', a:'Yes! Press Ctrl+V (or Cmd+V on Mac) in the paste area to paste a screenshot directly.' },
        { q:'Does it upload my image?', a:'No — everything happens in your browser.' },
      ]}
    >
      <canvas ref={canvasRef} style={{ display:'none' }} />

      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Screenshot</div>
        <input type="file" accept="image/*" onChange={onFile} />

        <div style={{ margin:'14px 0 4px', fontSize:'0.8rem', fontWeight:700, color:'#475569', textAlign:'center' }}>— OR —</div>

        {/* Paste area */}
        <div
          ref={pasteAreaRef}
          tabIndex={0}
          onPaste={handlePaste}
          style={{ border:'2px dashed #cbd5e1', borderRadius:12, padding:'20px', textAlign:'center', cursor:'text', background:'#f8fafc', outline:'none', transition:'border-color 0.15s' }}
          onFocus={e => e.target.style.borderColor = '#0891b2'}
          onBlur={e => e.target.style.borderColor = '#cbd5e1'}
        >
          <div style={{ fontSize:'1.5rem', marginBottom:6 }}>📋</div>
          <div style={{ fontSize:'0.82rem', fontWeight:700, color:'#64748b' }}>Click here, then press <kbd style={{ background:'#e2e8f0', padding:'2px 6px', borderRadius:4, fontSize:'0.78rem' }}>Ctrl+V</kbd> to paste screenshot</div>
        </div>

        {preview && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>

      {preview && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">🔎 Preview</div>
            <img loading="lazy" src={preview} alt="Screenshot" style={{ width:'100%', borderRadius:10, maxHeight:320, objectFit:'contain', background:'#f1f5f9' }} />
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">⚙️ Export Settings</div>
            <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
              {[['image/png','PNG'],['image/jpeg','JPG'],['image/webp','WebP']].map(([val,label]) => (
                <button key={val} onClick={() => setFormat(val)}
                  style={{ padding:'9px 16px', borderRadius:10, border:`2px solid ${format===val?'#0891b2':'#e2e8f0'}`, background:format===val?'#ecfeff':'#f8fafc', color:format===val?'#0e7490':'#475569', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', fontFamily:'inherit', minHeight:40 }}>
                  {label}
                </button>
              ))}
            </div>
            {format !== 'image/png' && (
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:4 }}>Quality: <strong style={{ color:'#0891b2' }}>{quality}%</strong></label>
                <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(+e.target.value)} style={{ width:'100%', accentColor:'#0891b2' }} />
              </div>
            )}
            <button onClick={convert} style={{ width:'100%', minHeight:44, background:'#0891b2', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
              🔄 Convert Screenshot
            </button>
          </div>
        </>
      )}

      {(result || preview) && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

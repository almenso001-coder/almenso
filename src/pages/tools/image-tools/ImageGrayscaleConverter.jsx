import React, { useState, useRef } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageGrayscaleConverter() {
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

  const convert = () => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imgData.data
      for (let i = 0; i < d.length; i += 4) {
        const gray = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2]
        d[i] = d[i+1] = d[i+2] = gray
      }
      ctx.putImageData(imgData, 0, 0)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-grayscale.png`; a.click()
  }

  const reset = () => { setPreview(''); setResult(''); setFileName('') }

  return (
    <ToolWrapper
      title="Grayscale Converter — Convert Image to Black & White"
      description="Convert any image to grayscale/black & white instantly in your browser. Free, no upload."
      keywords="grayscale converter, black white image, convert to grayscale, image filter"
      emoji="🖤" heroColor="linear-gradient(135deg,#1a1a2e,#475569)"
      toolName="Grayscale Converter" tagline="Convert images to black & white — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Convert', text:'Click Convert to Grayscale.' },
        { heading:'Download', text:'Download the black & white image.' },
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
          <button onClick={convert} style={{ width:'100%', minHeight:44, background:'#475569', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            🖤 Convert to Grayscale
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#475569', marginBottom:6 }}>GRAYSCALE ✅</div>
                <img src={result} alt="Grayscale" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Grayscale Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

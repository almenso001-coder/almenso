import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function ImageMetadataViewer() {
  const [preview, setPreview] = useState('')
  const [meta, setMeta]       = useState(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setPreview(URL.createObjectURL(f))
    const img = new Image()
    img.onload = () => {
      setMeta({
        fileName:    f.name,
        fileSize:    (f.size / 1024).toFixed(1) + ' KB',
        fileType:    f.type || 'Unknown',
        dimensions:  `${img.naturalWidth} × ${img.naturalHeight} px`,
        megapixels:  ((img.naturalWidth * img.naturalHeight) / 1_000_000).toFixed(2) + ' MP',
        aspectRatio: gcd(img.naturalWidth, img.naturalHeight),
        lastModified: new Date(f.lastModified).toLocaleString(),
      })
    }
    img.src = URL.createObjectURL(f)
  }

  function gcd(a, b) {
    while (b) { [a, b] = [b, a % b] }
    const w = meta?.dimensions ? parseInt(meta.dimensions) : a
    return `${a/gcd2(a,b)}:${b || 1}`
  }
  function gcd2(a,b){ while(b){[a,b]=[b,a%b]}; return a }
  function ratio(w,h){ const g=gcd2(w,h); return `${w/g}:${h/g}` }

  const reset = () => { setPreview(''); setMeta(null) }

  const rows = meta ? [
    { label:'File Name',     value: meta.fileName },
    { label:'File Size',     value: meta.fileSize },
    { label:'File Type',     value: meta.fileType },
    { label:'Dimensions',    value: meta.dimensions },
    { label:'Megapixels',    value: meta.megapixels },
    { label:'Last Modified', value: meta.lastModified },
  ] : []

  return (
    <ToolWrapper
      title="Image Metadata Viewer — View Photo Info & EXIF Data"
      description="View image metadata, dimensions, file size, and type instantly. Free, no upload needed."
      keywords="image metadata, photo info, image dimensions, EXIF viewer, file size checker"
      emoji="📋" heroColor="linear-gradient(135deg,#1a1a2e,#64748b)"
      toolName="Image Metadata Viewer" tagline="View image info, dimensions & file details — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, WebP, or GIF.' },
        { heading:'View metadata', text:'File name, size, dimensions, megapixels, and more are shown instantly.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[{ q:'Does it upload my image?', a:'No — all processing in your browser.' }, { q:'Can it read EXIF data like GPS?', a:'Basic metadata is available. Full EXIF (GPS, camera model) requires a dedicated EXIF library.' }]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Image</div>
        <input type="file" accept="image/*" onChange={onFile} />
        {preview && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>

      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">🔎 Preview</div>
          <img loading="lazy" src={preview} alt="Preview" style={{ width:'100%', borderRadius:10, maxHeight:280, objectFit:'contain', background:'#f1f5f9' }} />
        </div>
      )}

      {meta && (
        <div className="tp-card">
          <div className="tp-sec-title">📋 Image Metadata</div>
          <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
            {rows.map(r => (
              <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f1f5f9' }}>
                <span style={{ fontSize:'0.82rem', fontWeight:700, color:'#475569' }}>{r.label}</span>
                <span style={{ fontSize:'0.82rem', fontWeight:600, color:'#0f172a', textAlign:'right', maxWidth:'60%', wordBreak:'break-all' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolWrapper>
  )
}

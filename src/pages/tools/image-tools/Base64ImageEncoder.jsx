import React, { useState } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

export default function Base64ImageEncoder() {
  const [result, setResult]   = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [copied, setCopied]   = useState(false)
  const [format, setFormat]   = useState('')

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name)
    setFileSize((f.size / 1024).toFixed(1) + ' KB')
    setFormat(f.type)
    setCopied(false)
    const reader = new FileReader()
    reader.onload = (ev) => setResult(ev.target.result) // full data URL
    reader.readAsDataURL(f)
  }

  const copy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }

  const copyBase64Only = () => {
    const base64 = result.split(',')[1] || result
    navigator.clipboard.writeText(base64).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }

  const reset = () => { setResult(''); setFileName(''); setFileSize(''); setFormat('') }

  const btnStyle = (bg) => ({ minHeight:44, padding:'0 18px', background:bg, color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.85rem', cursor:'pointer', fontFamily:'inherit' })

  return (
    <ToolWrapper
      title="Base64 Image Encoder — Convert Image to Base64 Online"
      description="Convert any image to Base64 string instantly. Copy data URL or raw Base64 for use in HTML, CSS, or APIs."
      keywords="base64 image encoder, image to base64, convert image base64, data URL generator"
      emoji="🔐" heroColor="linear-gradient(135deg,#1a1a2e,#7c3aed)"
      toolName="Base64 Image Encoder" tagline="Convert images to Base64 — free & instant, no upload"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, GIF, or WebP image.' },
        { heading:'Get Base64', text:'The Base64 encoded string is generated instantly.' },
        { heading:'Copy & use', text:'Copy the full data URL or just the Base64 string.' },
      ]}
            affCategory="tech"
      hasResult={true}
      faqs={[
        { q:'What is Base64?', a:'Base64 is a way to encode binary data (like images) as text. Useful for embedding images directly in HTML/CSS without a separate file.' },
        { q:'Does it upload my image?', a:'No — conversion happens entirely in your browser.' },
        { q:'What is the difference between Data URL and Base64?', a:'A Data URL includes the format prefix (data:image/png;base64,...) while raw Base64 is just the encoded string.' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📂 Upload Image</div>
        <input type="file" accept="image/*" onChange={onFile} />
        {result && <button onClick={reset} style={{ marginTop:10, padding:'8px 14px', background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:8, cursor:'pointer', fontWeight:700 }}>🗑️ Reset</button>}
      </div>

      {result && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">📋 File Info</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {[['File Name', fileName],['File Size', fileSize],['Format', format],['Base64 Length', (result.split(',')[1]?.length || 0).toLocaleString() + ' characters']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f1f5f9', fontSize:'0.83rem' }}>
                  <span style={{ fontWeight:700, color:'#475569' }}>{k}</span>
                  <span style={{ color:'#0f172a', fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">🔍 Preview</div>
            <img loading="lazy" src={result} alt="Preview" style={{ width:'100%', maxHeight:200, objectFit:'contain', background:'#f1f5f9', borderRadius:10 }} />
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">📄 Base64 Output</div>
            <textarea
              readOnly value={result}
              style={{ width:'100%', minHeight:120, padding:'10px', border:'1.5px solid #e2e8f0', borderRadius:8, fontFamily:'monospace', fontSize:'0.72rem', background:'#f8fafc', resize:'vertical', lineHeight:1.5 }}
            />
            <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
              <button onClick={copy} style={btnStyle(copied ? '#10b981' : '#7c3aed')}>
                {copied ? '✅ Copied!' : '📋 Copy Full Data URL'}
              </button>
              <button onClick={copyBase64Only} style={btnStyle('#475569')}>
                📄 Copy Base64 Only
              </button>
            </div>
            <p style={{ fontSize:'0.74rem', color:'#94a3b8', marginTop:8 }}>
              Use Data URL directly in &lt;img src="..."&gt; or CSS background-image. Use Base64 only for APIs.
            </p>
          </div>
        </>
      )}
    </ToolWrapper>
  )
}

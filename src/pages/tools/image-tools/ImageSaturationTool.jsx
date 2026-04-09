import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../../components/ToolWrapper'

function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;default:h=((r-g)/d+4)/6}}return[h,s,l]}
function hslToRgb(h,s,l){let r,g,b;if(s===0){r=g=b=l}else{const q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q;const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p};r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3)}return[Math.round(r*255),Math.round(g*255),Math.round(b*255)]}

export default function ImageSaturationTool() {
  const [preview, setPreview]       = useState('')
  const [result, setResult]         = useState('')
  const [fileName, setFileName]     = useState('')
  const [saturation, setSaturation] = useState(0) // -100 to +100
  const canvasRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setFileName(f.name.replace(/\.[^.]+$/, ''))
    setResult(''); setSaturation(0)
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
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imgData.data
      const adj = saturation / 100
      for (let i = 0; i < d.length; i += 4) {
        const [h,s,l] = rgbToHsl(d[i], d[i+1], d[i+2])
        const ns = Math.min(1, Math.max(0, s + adj * (adj > 0 ? (1-s) : s)))
        const [r,g,b] = hslToRgb(h, ns, l)
        d[i]=r; d[i+1]=g; d[i+2]=b
      }
      ctx.putImageData(imgData, 0, 0)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }, [preview, saturation])

  const download = () => {
    const a = document.createElement('a'); a.href = result
    a.download = `${fileName || 'image'}-saturation.png`; a.click()
  }
  const reset = () => { setPreview(''); setResult(''); setSaturation(0); setFileName('') }

  return (
    <ToolWrapper
      title="Image Saturation Tool — Boost or Reduce Color Saturation"
      description="Adjust image color saturation online. Make colors vibrant or desaturate for a muted look."
      keywords="image saturation, boost color, desaturate image, image color adjustment"
      emoji="🎨" heroColor="linear-gradient(135deg,#1a1a2e,#ec4899)"
      toolName="Saturation Tool" tagline="Boost or reduce image color saturation — free & instant"
      guideSteps={[
        { heading:'Upload image', text:'Choose any JPG, PNG, or WebP.' },
        { heading:'Adjust saturation', text:'Positive = more vibrant colors. Negative = more muted/gray.' },
        { heading:'Apply & Download', text:'Click Apply and download the result.' },
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
          <div className="tp-sec-title">🎨 Saturation</div>
          <label style={{ fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:6 }}>
            Value: <strong style={{ color:'#ec4899' }}>{saturation > 0 ? `+${saturation}` : saturation}</strong>
          </label>
          <input type="range" min={-100} max={100} value={saturation} onChange={e => setSaturation(+e.target.value)} style={{ width:'100%', accentColor:'#ec4899' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#94a3b8', marginTop:2 }}>
            <span>-100 (Desaturate)</span><span>0 (Normal)</span><span>+100 (Vibrant)</span>
          </div>
          <button onClick={apply} style={{ width:'100%', minHeight:44, background:'#ec4899', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', marginTop:14 }}>
            🎨 Apply Saturation
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
                <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#ec4899', marginBottom:6 }}>ADJUSTED ✅</div>
                <img src={result} alt="Result" style={{ width:'100%', borderRadius:10, maxHeight:260, objectFit:'contain', background:'#f1f5f9' }} />
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="tp-card" style={{ textAlign:'center' }}>
          <button onClick={download} style={{ minHeight:44, padding:'0 24px', background:'#0f8a1f', color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
            ⬇️ Download Image
          </button>
        </div>
      )}
    </ToolWrapper>
  )
}

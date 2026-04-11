import React, { useState, useRef, useCallback } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const RELATED_TOOLS = [
  { path:'/tools/qr-code-generator', emoji:'📱', name:'QR Code Generator' },
  { path:'/tools/word-counter',      emoji:'📝', name:'Word Counter' },
  { path:'/tools/gst-calculator',    emoji:'🧾', name:'GST Calculator' },
]

function formatBytes(bytes) {
  if (bytes < 1024)    return bytes + ' B'
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB'
  return (bytes/1048576).toFixed(2) + ' MB'
}

function compressImage(file, quality, maxWidth, outputFormat, customW, customH) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img

      if (customW && customH) {
        width = parseInt(customW); height = parseInt(customH)
      } else if (customW) {
        height = Math.round((height * parseInt(customW)) / width)
        width = parseInt(customW)
      } else if (maxWidth < 3840 && width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      canvas.width = width; canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)

      const mime = outputFormat === 'webp' ? 'image/webp' : 'image/jpeg'
      const ext  = outputFormat === 'webp' ? '.webp' : '.jpg'
      canvas.toBlob(
        blob => { URL.revokeObjectURL(url); resolve({ blob, width, height, ext }) },
        mime, quality / 100
      )
    }
    img.src = url
  })
}

export default function ImageCompressor() {
  const [files,    setFiles]    = useState([])
  const [quality,  setQuality]  = useState(80)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [outputFmt,setOutputFmt]= useState('jpg')  // jpg | webp
  const [customW,  setCustomW]  = useState('')
  const [customH,  setCustomH]  = useState('')
  const [results,  setResults]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [preview,  setPreview]  = useState(null)   // { original, compressed, saving }
  const inputRef = useRef()

  const handleFiles = useCallback((newFiles) => {
    const imgs = Array.from(newFiles).filter(f => f.type.startsWith('image/'))
    setFiles(imgs); setResults([])
  }, [])

  const compress = async () => {
    if (!files.length) return
    setLoading(true); setResults([]); setPreview(null)
    const out = []
    for (const file of files) {
      try {
        const { blob, width, height, ext } = await compressImage(file, quality, maxWidth, outputFmt, customW, customH)
        const url = URL.createObjectURL(blob)
        const origUrl = URL.createObjectURL(file)
        out.push({
          name: file.name.replace(/\.[^.]+$/, '') + '_compressed' + ext,
          originalSize: file.size,
          compressedSize: blob.size,
          saving: Math.round((1 - blob.size/file.size) * 100),
          url, original: origUrl, width, height, blob,
        })
      } catch(e) {
        out.push({ name: file.name, error: 'Compress nahi ho payi' })
      }
    }
    setResults(out)
    // Set first result as preview
    if (out.length > 0 && !out[0].error) {
      setPreview({ original: out[0].original, compressed: out[0].url, saving: out[0].saving })
    }
    setLoading(false)
  }

  const downloadAll = () => {
    results.filter(r=>!r.error).forEach(r => {
      const a = document.createElement('a'); a.href = r.url; a.download = r.name; a.click()
    })
  }

  const totalSaving = results.filter(r=>!r.error).reduce((s,r) => s + (r.originalSize - r.compressedSize), 0)

  return (
    <ToolWrapper
      title="Image Compressor — Photo Size Kam Karo Free Mein"
      description="Images compress karo — JPG ya WebP output, custom size, before/after preview. Website, WhatsApp, email ke liye. Browser mein hota hai — 100% private."
      keywords="image compressor free, webp converter, photo resize online, jpg compress, image size kam karo hindi"
      emoji="🖼️"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #4a1942 100%)"
      toolName="Image Compressor"
      tagline="Compress · WebP Convert · Custom Resize — before/after preview ke saath"
      guideSteps={[
        { heading:'Image chunen', text:'JPG, PNG, WebP — multiple files bhi ho sakti hain.' },
        { heading:'Quality aur format chunen', text:'80% JPG general ke liye. WebP output website ke liye 30% zyada compress.' },
        { heading:'Custom size optional', text:'Width × Height set karo ya sirf max width chunen.' },
        { heading:'Before/After dekho', text:'Compress ke baad original vs compressed side-by-side preview milega.' },
      ]}
      faqs={[
        { q:'Kya images upload hoti hain server pe?', a:'Bilkul nahi. Sab aapke browser ke Canvas API mein hota hai. 100% private.' },
        { q:'WebP kya hota hai?', a:'Google ka modern format — JPG se 25-35% chota hota hai same quality pe. Chrome, Firefox, Safari sab support karte hain.' },
        { q:'Custom size kaise set karein?', a:'Width aur Height dono dalo = exact crop. Sirf width dalo = aspect ratio maintain hoga.' },
        { q:'Kitni quality set karein?', a:'Website: 60-70%. WhatsApp: 80%. Print: 90%+. WebP pe 75% = JPG ke 90% jaisi quality.' },
      ]}
      relatedBlog={{ slug:'upi-qr-code-business', title:'Online Business Ke Liye Digital Tools', excerpt:'Image compression se website fast hoti hai — SEO improve.' }}
      relatedTools={RELATED_TOOLS}
      affCategory="design"
      hasResult={true}
      toolPath="/tools/image-compressor"
    >
      {/* Drop Zone */}
      <div className="tp-card"
        onDragOver={e=>{e.preventDefault();setDragOver(true)}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={e=>{e.preventDefault();setDragOver(false);handleFiles(e.dataTransfer.files)}}
        onClick={()=>inputRef.current?.click()}
        style={{ border:`2px dashed ${dragOver?'#7c3aed':'#d1d5db'}`, borderRadius:14,
          background:dragOver?'#fdf4ff':'#fafafa', cursor:'pointer',
          textAlign:'center', padding:'28px 16px', transition:'all 0.15s' }}>
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display:'none' }}
          onChange={e=>handleFiles(e.target.files)} />
        <div style={{ fontSize:'2.5rem', marginBottom:8 }}>🖼️</div>
        <div style={{ fontWeight:800, fontSize:'0.95rem', marginBottom:4 }}>
          {files.length ? `${files.length} image${files.length>1?'s':''} ready ✅` : 'Images yahan drop karein ya click karein'}
        </div>
        <div style={{ fontSize:'0.75rem', color:'#888' }}>JPG, PNG, WebP · Multiple files OK</div>
        {files.length > 0 && (
          <div style={{ marginTop:10, display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center' }}>
            {files.map((f,i)=>(
              <span key={i} style={{ background:'#f3e8ff', color:'#7c3aed', fontSize:'0.68rem', fontWeight:700, padding:'2px 10px', borderRadius:99 }}>
                {f.name.slice(0,20)} ({formatBytes(f.size)})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      {files.length > 0 && (
        <div className="tp-card">
          <div className="tp-sec-title">⚙️ Settings</div>
          <div className="tw-input-group">
            <div className="tw-field">
              <label>🎨 Quality: {quality}% {quality>=85?'(High Quality)':quality>=65?'(Balanced)':'(Maximum Compression)'}</label>
              <input type="range" min={20} max={100} step={5} value={quality} onChange={e=>setQuality(+e.target.value)} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.65rem', color:'#aaa', marginTop:2 }}>
                <span>Zyada Compress</span><span>Best Quality</span>
              </div>
            </div>

            <div className="tw-field">
              <label>📄 Output Format</label>
              <div style={{ display:'flex', gap:8 }}>
                {[['jpg','📸 JPG (Universal)'],['webp','🌐 WebP (25-35% smaller)']].map(([v,l])=>(
                  <button key={v} onClick={()=>setOutputFmt(v)}
                    style={{ flex:1, padding:'10px', border:`1.5px solid ${outputFmt===v?'#7c3aed':'#e5e7eb'}`,
                      borderRadius:8, background:outputFmt===v?'#7c3aed':'#fff', color:outputFmt===v?'#fff':'#555',
                      fontWeight:800, cursor:'pointer', fontSize:'0.78rem' }}>
                    {l}
                  </button>
                ))}
              </div>
              {outputFmt==='webp' && <p style={{ fontSize:'0.72rem', color:'#7c3aed', marginTop:6, fontWeight:700 }}>✅ WebP websites ke liye better — Chrome/Firefox/Safari sab support karte hain.</p>}
            </div>

            <div className="tw-field">
              <label>📐 Max Width (agar custom size nahi diya)</label>
              <select value={maxWidth} onChange={e=>setMaxWidth(+e.target.value)}>
                <option value={3840}>Original size rakho</option>
                <option value={1920}>1920px — Full HD Web</option>
                <option value={1280}>1280px — Mobile Web</option>
                <option value={800}>800px — Blog/Thumbnail</option>
                <option value={480}>480px — WhatsApp Status</option>
              </select>
            </div>

            <div className="tw-field">
              <label>✂️ Custom Dimensions (optional) — exact resize</label>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <input type="number" value={customW} placeholder="Width px" style={{ flex:1 }}
                  onChange={e=>{setCustomW(e.target.value);setResults([])}} />
                <span style={{ fontWeight:800, color:'#888' }}>×</span>
                <input type="number" value={customH} placeholder="Height px (optional)" style={{ flex:1 }}
                  onChange={e=>{setCustomH(e.target.value);setResults([])}} />
              </div>
              <p style={{ fontSize:'0.68rem', color:'#aaa', marginTop:4 }}>Sirf width dene se aspect ratio maintain hoga. Dono dene se exact crop hogi.</p>
            </div>

            <button className="tw-calc-btn" disabled={loading} onClick={compress}
              style={{ background:'linear-gradient(135deg,#4a1942,#7c3aed)' }}>
              {loading ? '⏳ Compressing...' : `🗜️ ${files.length} Image${files.length>1?'s':''} Compress Karo`}
            </button>
          </div>
        </div>
      )}

      {/* Before / After Preview */}
      {preview && (
        <div className="tp-card">
          <div className="tp-sec-title">👁️ Before vs After Preview</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#dc2626', marginBottom:6 }}>❌ BEFORE (Original)</div>
              <img loading="lazy" loading="lazy" src={preview.original} alt="original" style={{ width:'100%', borderRadius:8, border:'2px solid #fca5a5', objectFit:'cover', maxHeight:180 }} />
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#16a34a', marginBottom:6 }}>✅ AFTER (Compressed)</div>
              <img loading="lazy" loading="lazy" src={preview.compressed} alt="compressed" style={{ width:'100%', borderRadius:8, border:'2px solid #86efac', objectFit:'cover', maxHeight:180 }} />
            </div>
          </div>
          <div style={{ textAlign:'center', background:'#f0fdf4', borderRadius:8, padding:'8px', fontSize:'0.82rem', fontWeight:800, color:'#16a34a' }}>
            💾 {preview.saving}% space saved — quality difference hardly visible hai!
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (<>
        <div className="tw-result" style={{ background:'linear-gradient(135deg,#4a1942,#7c3aed)' }}>
          <div className="tw-result-label">Total Space Saved</div>
          <div className="tw-result-val">{formatBytes(totalSaving)}</div>
          <div className="tw-result-sub">{results.filter(r=>!r.error).length} images compressed</div>
        </div>

        {results.length > 1 && (
          <button className="tw-calc-btn" style={{ background:'#7c3aed' }} onClick={downloadAll}>
            ⬇️ Sab Download Karo ({results.filter(r=>!r.error).length} images)
          </button>
        )}

        {results.map((r,i) => r.error ? (
          <div key={i} style={{ background:'#fef2f2', border:'1.5px solid #fca5a5', borderRadius:10, padding:'12px', fontSize:'0.82rem', color:'#dc2626' }}>
            ❌ {r.name}: {r.error}
          </div>
        ) : (
          <div key={i} className="tp-card">
            <div style={{ display:'flex', gap:10, marginBottom:12 }}>
              <img loading="lazy" loading="lazy" src={r.url} alt={r.name} style={{ width:72, height:72, objectFit:'cover', borderRadius:8, border:'1.5px solid #e5e7eb', cursor:'pointer' }}
                onClick={()=>setPreview({ original: r.original, compressed: r.url, saving: r.saving })} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:'0.82rem', marginBottom:6, wordBreak:'break-all' }}>{r.name}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.7rem', background:'#fee2e2', color:'#dc2626', padding:'2px 8px', borderRadius:99, fontWeight:700 }}>
                    Before: {formatBytes(r.originalSize)}
                  </span>
                  <span style={{ fontSize:'0.7rem', background:'#dcfce7', color:'#16a34a', padding:'2px 8px', borderRadius:99, fontWeight:700 }}>
                    After: {formatBytes(r.compressedSize)}
                  </span>
                  <span style={{ fontSize:'0.7rem', background:'#e0f2fe', color:'#0369a1', padding:'2px 8px', borderRadius:99, fontWeight:800 }}>
                    💾 {r.saving}% saved
                  </span>
                </div>
                <div style={{ fontSize:'0.68rem', color:'#999', marginTop:4 }}>{r.width}×{r.height}px</div>
              </div>
            </div>
            <div style={{ background:'#f0f0f0', borderRadius:99, height:8, marginBottom:10 }}>
              <div style={{ width:`${r.saving}%`, height:'100%', borderRadius:99, background:'linear-gradient(90deg,#7c3aed,#a855f7)' }} />
            </div>
            <a href={r.url} download={r.name}>
              <button className="tw-calc-btn" style={{ background:'linear-gradient(135deg,#4a1942,#7c3aed)' }}>
                ⬇️ Download {outputFmt.toUpperCase()}
              </button>
            </a>
          </div>
        ))}
      </>)}

      <div className="tp-card">
        <div className="tp-sec-title">📝 Image Compression Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Image compression ek essential skill hai digital content creation mein. Website speed, storage space, aur loading times ko optimize karne ke liye images ko compress karna zaroori hota hai. Yeh guide aapko sikhaega ki images kaise compress karein, quality ko kaise maintain karein, aur kab kya technique use karein.
          </p>

          <h3>1. Kyun Important Hai Image Compression?</h3>
          <p>
            Uncompressed images bahut badi hoti hain aur:
          </p>
          <ul>
            <li>Website slow load karti hain</li>
            <li>Mobile data zyada use karta hai</li>
            <li>Storage space waste hota hai</li>
            <li>SEO ranking pe negative impact padta hai</li>
          </ul>

          <h3>2. Compression Types</h3>
          <ul>
            <li><strong>Lossy Compression:</strong> Quality kam hoti hai lekin size bahut kam hota hai (JPEG)</li>
            <li><strong>Lossless Compression:</strong> Quality same rahti hai, size thoda kam hota hai (PNG)</li>
            <li><strong>WebP:</strong> Modern format, best compression with good quality</li>
          </ul>

          <h3>3. Quality vs File Size Trade-off</h3>
          <p>
            Higher quality = better image lekin badi file size. Lower quality = chhoti file size lekin compressed look. Web ke liye 70-85% quality sufficient hoti hai. Social media ke liye 60-80% best.
          </p>

          <h3>4. Image Formats aur Compression</h3>
          <ul>
            <li><strong>JPEG:</strong> Photos ke liye best, lossy compression, small size</li>
            <li><strong>PNG:</strong> Graphics, logos ke liye, lossless, transparent background</li>
            <li><strong>WebP:</strong> Modern format, best compression, web ke liye ideal</li>
            <li><strong>GIF:</strong> Animations ke liye, lossless</li>
          </ul>

          <h3>5. Compression Techniques</h3>
          <ul>
            <li><strong>Color Reduction:</strong> Colors kam karne se size kam hoti hai</li>
            <li><strong>Resolution Reduction:</strong> Pixels kam karne se size kam hoti hai</li>
            <li><strong>Metadata Removal:</strong> EXIF data hatao</li>
            <li><strong>Algorithm Optimization:</strong> Better compression algorithms</li>
          </ul>

          <h3>6. Tools aur Software</h3>
          <ul>
            <li><strong>Online Tools:</strong> TinyPNG, Compressor.io, ImageOptim</li>
            <li><strong>Desktop Software:</strong> Photoshop, GIMP, ImageMagick</li>
            <li><strong>Command Line:</strong> jpegoptim, pngcrush</li>
            <li><strong>APIs:</strong> Cloudinary, Imgix for automatic compression</li>
          </ul>

          <h3>7. Web Performance Impact</h3>
          <p>
            Google PageSpeed Insights mein image optimization important hai:
          </p>
          <ul>
            <li>Largest Contentful Paint (LCP) improve karta hai</li>
            <li>First Contentful Paint (FCP) fast hota hai</li>
            <li>Core Web Vitals score badhta hai</li>
            <li>SEO ranking improve hota hai</li>
          </ul>

          <h3>8. Mobile Optimization</h3>
          <ul>
            <li>Responsive images use karo</li>
            <li>Different sizes for different devices</li>
            <li>Lazy loading implement karo</li>
            <li>CDN use karo for fast delivery</li>
          </ul>

          <h3>9. Batch Compression</h3>
          <p>
            Multiple images ek saath compress karne ke liye:
          </p>
          <ul>
            <li>Adobe Photoshop batch processing</li>
            <li>Online bulk compressors</li>
            <li>Command line scripts</li>
            <li>Build tools (Webpack, Vite)</li>
          </ul>

          <h3>10. Best Practices</h3>
          <ul>
            <li>Original images backup rakhna</li>
            <li>Quality loss ko monitor karna</li>
            <li>File naming conventions follow karna</li>
            <li>Regular optimization schedule banana</li>
          </ul>

          <h3>11. Advanced Techniques</h3>
          <ul>
            <li><strong>Progressive JPEG:</strong> Blurry to sharp loading</li>
            <li><strong>WebP with Fallback:</strong> Modern browsers ke liye WebP, old ke liye JPEG</li>
            <li><strong>AVIF Format:</strong> Next-gen compression</li>
            <li><strong>SVG Optimization:</strong> Vector graphics ke liye</li>
          </ul>

          <h3>12. Industry Standards</h3>
          <ul>
            <li><strong>Web Images:</strong> Under 100KB per image</li>
            <li><strong>Email Images:</strong> Under 50KB</li>
            <li><strong>Social Media:</strong> Platform specific limits</li>
            <li><strong>E-commerce:</strong> Product images optimized</li>
          </ul>

          <p>
            Yeh tool basic compression ke liye perfect hai. Advanced needs ke liye professional software ya APIs use karo. Practice se aap expert ban jaoge image optimization mein!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

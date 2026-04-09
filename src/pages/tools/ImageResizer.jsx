import React, { useState, useRef } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const PRESETS = [
  { name: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Instagram Post', width: 1080, height: 1350 },
  { name: 'Facebook Cover', width: 820, height: 312 },
  { name: 'Facebook Post', width: 1200, height: 630 },
  { name: 'Twitter Header', width: 1500, height: 500 },
  { name: 'Twitter Post', width: 1200, height: 675 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'LinkedIn Cover', width: 1584, height: 396 },
  { name: 'Pinterest Pin', width: 1000, height: 1500 },
]

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [quality, setQuality] = useState(0.9)
  const [format, setFormat] = useState('jpeg')
  const [resizedImage, setResizedImage] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [newSize, setNewSize] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setOriginalSize(file.size)

      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const applyPreset = (preset) => {
    setWidth(preset.width)
    setHeight(preset.height)
  }

  const resizeImage = async () => {
    if (!selectedFile || !preview) return

    setIsProcessing(true)

    try {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height

        // Calculate aspect ratio if maintaining
        let drawWidth = width
        let drawHeight = height
        let offsetX = 0
        let offsetY = 0

        if (maintainAspect) {
          const imgAspect = img.width / img.height
          const canvasAspect = width / height

          if (imgAspect > canvasAspect) {
            // Image is wider
            drawHeight = height
            drawWidth = height * imgAspect
            offsetX = (width - drawWidth) / 2
          } else {
            // Image is taller
            drawWidth = width
            drawHeight = width / imgAspect
            offsetY = (height - drawHeight) / 2
          }
        }

        // Fill background with white for transparent images
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)

        // Draw the image
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

        // Convert to blob
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          setResizedImage(url)
          setNewSize(blob.size)
          setIsProcessing(false)
        }, `image/${format}`, quality)
      }
      img.src = preview
    } catch (error) {
      console.error('Resize failed:', error)
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!resizedImage) return

    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized-image.${format}`
    link.click()
  }

  const reset = () => {
    setSelectedFile(null)
    setPreview('')
    setResizedImage('')
    setOriginalSize(0)
    setNewSize(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <ToolWrapper
      title="Image Resizer — Online Image Resize Karo"
      description="Images ko kisi bhi size mein resize karo. Social media dimensions, quality control aur instant download."
      keywords="image resizer, resize image online, image dimensions, social media image size, photo resizer"
      emoji="📐"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #7c3aed 50%, #06b6d4 100%)"
      toolName="Image Resizer"
      tagline="Resize Images · Social Media Sizes · Quality Control"
      guideSteps={[
        { heading: 'Image upload karo', text: 'JPG, PNG, WebP images support hote hain.' },
        { heading: 'Size set karo', text: 'Width aur height daalo ya preset choose karo.' },
        { heading: 'Quality adjust karo', text: 'File size control ke liye quality set karo.' },
        { heading: 'Resize aur download karo', text: 'Instant result aur free download.' },
      ]}
      faqs={[
        { q: 'Kitne badi image resize kar sakte hain?', a: 'Maximum 10MB tak ki images support hain. Large images ke liye quality kam karo.' },
        { q: 'Kaunse formats support hain?', a: 'Input: JPG, PNG, WebP. Output: JPG, PNG, WebP.' },
        { q: 'Aspect ratio maintain karega?', a: 'Haan, "Maintain Aspect Ratio" on hone pe automatic adjust hota hai.' },
        { q: 'Quality setting kya karta hai?', a: 'Lower quality = chhoti file size, higher quality = better image.' },
      ]}
      relatedBlog={{ slug: 'image-optimization-guide', title: 'Image Optimization Guide', excerpt: 'Website speed ke liye images kaise optimize karein.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/image-compressor', emoji: '🖼️', name: 'Image Compressor' },
        { path: '/tools/image-format-converter', emoji: '🔄', name: 'Image Format Converter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">📤 Upload Image</div>
        <div className="tw-input-group">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button
            className="tw-calc-btn"
            onClick={() => fileInputRef.current?.click()}
            style={{ flex: '1 1 100%' }}
          >
            📁 Choose Image
          </button>
          {selectedFile && (
            <div style={{ marginTop: 10, fontSize: '0.85rem', color: '#666' }}>
              📄 {selectedFile.name} ({formatBytes(originalSize)})
            </div>
          )}
        </div>
      </div>

      {preview && (
        <>
          <div className="tp-card">
            <div className="tp-sec-title">⚙️ Resize Settings</div>
            <div className="tw-input-group">
              <div className="tw-field">
                <label>🎯 Presets</label>
                <select onChange={e => {
                  const preset = PRESETS.find(p => p.name === e.target.value)
                  if (preset) applyPreset(preset)
                }}>
                  <option>Choose preset...</option>
                  {PRESETS.map(preset => (
                    <option key={preset.name} value={preset.name}>
                      {preset.name} ({preset.width}×{preset.height})
                    </option>
                  ))}
                </select>
              </div>
              <div className="tw-field">
                <label>📏 Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={e => setWidth(Number(e.target.value))}
                  min="1"
                  max="4000"
                />
              </div>
              <div className="tw-field">
                <label>📐 Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  min="1"
                  max="4000"
                />
              </div>
              <div className="tw-field">
                <label>🔗 Maintain Aspect Ratio</label>
                <select value={maintainAspect} onChange={e => setMaintainAspect(e.target.value === 'true')}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="tw-field">
                <label>💎 Quality ({Math.round(quality * 100)}%)</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={e => setQuality(Number(e.target.value))}
                />
              </div>
              <div className="tw-field">
                <label>📁 Output Format</label>
                <select value={format} onChange={e => setFormat(e.target.value)}>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <button
                className="tw-calc-btn"
                onClick={resizeImage}
                disabled={isProcessing}
                style={{ flex: '1 1 100%' }}
              >
                {isProcessing ? '⏳ Processing...' : '🔄 Resize Image'}
              </button>
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">🖼️ Preview</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#666' }}>Original</div>
                <img loading="lazy"
                  src={preview}
                  alt="Original"
                  style={{ width: '100%', maxHeight: 200, objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8 }}
                />
              </div>
              {resizedImage && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#666' }}>
                    Resized ({width}×{height})
                  </div>
                  <img loading="lazy"
                    src={resizedImage}
                    alt="Resized"
                    style={{ width: '100%', maxHeight: 200, objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8 }}
                  />
                  <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#666' }}>
                    Size: {formatBytes(newSize)} ({((newSize / originalSize) * 100).toFixed(1)}% of original)
                  </div>
                  <button
                    className="tw-calc-btn"
                    onClick={downloadImage}
                    style={{ marginTop: 8, width: '100%' }}
                  >
                    💾 Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="tp-card">
        <div className="tp-sec-title">📝 Image Resizing Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Image resizing ek essential skill hai digital content creation mein. Social media, websites, aur presentations ke liye images ko correct size mein resize karna zaroori hota hai. Yeh guide aapko sikhaega ki images kaise resize karein, kab kya size use karein, aur quality ko kaise maintain karein.
          </p>

          <h3>1. Kyun Important Hai Image Size?</h3>
          <p>
            Har platform ki apni image size requirements hoti hain. Wrong size ki images blur dikhti hain, load slow hoti hain, ya crop ho jaati hain. Correct size se:
          </p>
          <ul>
            <li>Faster loading times</li>
            <li>Better user experience</li>
            <li>Professional appearance</li>
            <li>SEO benefits</li>
          </ul>

          <h3>2. Social Media Dimensions</h3>
          <p>
            Har platform ke liye specific sizes recommend ki gayi hain:
          </p>
          <ul>
            <li><strong>Instagram Post:</strong> 1080×1080px (square), 1080×1350px (portrait)</li>
            <li><strong>Instagram Story:</strong> 1080×1920px (vertical)</li>
            <li><strong>Facebook Post:</strong> 1200×630px (landscape)</li>
            <li><strong>Facebook Cover:</strong> 820×312px</li>
            <li><strong>Twitter Post:</strong> 1200×675px</li>
            <li><strong>YouTube Thumbnail:</strong> 1280×720px</li>
          </ul>

          <h3>3. Aspect Ratio Kya Hai?</h3>
          <p>
            Aspect ratio width aur height ka ratio hota hai. 1:1 square, 4:5 portrait, 16:9 landscape. Maintain aspect ratio se image distort nahi hoti. Agar aspect ratio change karna hai to crop karo.
          </p>

          <h3>4. Quality vs File Size</h3>
          <p>
            Higher quality = better image lekin badi file size. Lower quality = chhoti file size lekin compressed look. Web ke liye 80-90% quality sufficient hoti hai. Social media ke liye 70-80% best.
          </p>

          <h3>5. File Formats</h3>
          <ul>
            <li><strong>JPEG:</strong> Photos ke liye best, small size, lossy compression</li>
            <li><strong>PNG:</strong> Graphics, logos ke liye, transparent background support</li>
            <li><strong>WebP:</strong> Modern format, best compression, web ke liye ideal</li>
          </ul>

          <h3>6. Resizing Techniques</h3>
          <p>
            Different situations mein different approaches:
          </p>
          <ul>
            <li><strong>Downscaling:</strong> Quality maintain rahti hai</li>
            <li><strong>Upscaling:</strong> Quality kam ho sakti hai, avoid karo</li>
            <li><strong>Cropping:</strong> Aspect ratio change karne ke liye</li>
            <li><strong>Canvas resize:</strong> Background add karne ke liye</li>
          </ul>

          <h3>7. Tools aur Software</h3>
          <p>
            Online tools ke alawa:
          </p>
          <ul>
            <li><strong>Photoshop:</strong> Professional editing</li>
            <li><strong>GIMP:</strong> Free alternative</li>
            <li><strong>Canva:</strong> Easy drag-drop</li>
            <li><strong>Lightroom:</strong> Batch processing</li>
          </ul>

          <h3>8. Mobile Apps</h3>
          <p>
            On-the-go resizing ke liye:
          </p>
          <ul>
            <li>SquareSizer (iOS)</li>
            <li>Resize Me! (Android)</li>
            <li>Image Size (both)</li>
          </ul>

          <h3>9. Batch Resizing</h3>
          <p>
            Multiple images ek saath resize karne ke liye:
          </p>
          <ul>
            <li>Adobe Lightroom</li>
            <li>FastStone Photo Resizer</li>
            <li>Online tools like BulkResizePhotos</li>
          </ul>

          <h3>10. SEO Considerations</h3>
          <p>
            Website images ke liye:
          </p>
          <ul>
            <li>Descriptive filenames</li>
            <li>Alt text add karo</li>
            <li>Appropriate dimensions</li>
            <li>Optimized file sizes</li>
          </ul>

          <p>
            Yeh tool basic resizing ke liye perfect hai. Complex editing ke liye professional software use karo. Practice se aap expert ban jaoge image resizing mein!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}
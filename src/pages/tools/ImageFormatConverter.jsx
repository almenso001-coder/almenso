import React, { useState, useRef } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

const FORMATS = [
  { value: 'jpeg', label: 'JPEG', description: 'Best for photos, smaller file size' },
  { value: 'png', label: 'PNG', description: 'Best for graphics, supports transparency' },
  { value: 'webp', label: 'WebP', description: 'Modern format, best compression' },
  { value: 'bmp', label: 'BMP', description: 'Uncompressed, large file size' },
]

export default function ImageFormatConverter() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [outputFormat, setOutputFormat] = useState('jpeg')
  const [quality, setQuality] = useState(0.9)
  const [convertedImage, setConvertedImage] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [newSize, setNewSize] = useState(0)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setOriginalSize(file.size)
      setConvertedImage('')

      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const convertImage = async () => {
    if (!selectedFile || !preview) return

    setIsConverting(true)

    try {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height

        // Fill background with white for transparent images when converting to JPEG
        if (outputFormat === 'jpeg') {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Draw the image
        ctx.drawImage(img, 0, 0)

        // Convert to blob
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          setConvertedImage(url)
          setNewSize(blob.size)
          setIsConverting(false)
        }, `image/${outputFormat}`, outputFormat === 'png' ? undefined : quality)
      }
      img.src = preview
    } catch (error) {
      console.error('Conversion failed:', error)
      setIsConverting(false)
    }
  }

  const downloadImage = () => {
    if (!convertedImage) return

    const link = document.createElement('a')
    link.href = convertedImage
    const originalName = selectedFile.name.replace(/\.[^/.]+$/, '')
    link.download = `${originalName}.${outputFormat}`
    link.click()
  }

  const reset = () => {
    setSelectedFile(null)
    setPreview('')
    setConvertedImage('')
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

  const getFormatInfo = (format) => {
    const info = FORMATS.find(f => f.value === format)
    return info || FORMATS[0]
  }

  return (
    <ToolWrapper
      title="Image Format Converter — Online Image Convert Karo"
      description="Images ko JPEG, PNG, WebP, BMP mein convert karo. Quality control aur instant download."
      keywords="image converter, convert image format, jpeg to png, png to jpg, webp converter, image format change"
      emoji="🔄"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #059669 50%, #0ea5e9 100%)"
      toolName="Image Format Converter"
      tagline="Convert Formats · Quality Control · Instant Download"
      guideSteps={[
        { heading: 'Image upload karo', text: 'Koi bhi image format (JPG, PNG, WebP, etc.) upload karo.' },
        { heading: 'Output format choose karo', text: 'JPEG, PNG, WebP, ya BMP select karo.' },
        { heading: 'Quality adjust karo', text: 'File size control ke liye quality set karo.' },
        { heading: 'Convert aur download karo', text: 'Instant conversion aur free download.' },
      ]}
      faqs={[
        { q: 'Kaunse formats convert kar sakte hain?', a: 'Input: JPG, PNG, WebP, BMP, GIF. Output: JPEG, PNG, WebP, BMP.' },
        { q: 'Quality setting kya karta hai?', a: 'JPEG/WebP ke liye quality 1-100% hoti hai. PNG lossless hota hai.' },
        { q: 'Transparent images ka kya?', a: 'PNG transparent support karta hai. JPEG mein white background add hota hai.' },
        { q: 'Maximum file size kitni hai?', a: '10MB tak ki images support hain. Large files ke liye quality kam karo.' },
      ]}
      relatedBlog={{ slug: 'image-formats-guide', title: 'Image Formats Guide', excerpt: 'Kab kaunsa format use karein — complete guide.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/image-compressor', emoji: '🖼️', name: 'Image Compressor' },
        { path: '/tools/image-resizer', emoji: '📐', name: 'Image Resizer' },
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
            <div className="tp-sec-title">⚙️ Conversion Settings</div>
            <div className="tw-input-group">
              <div className="tw-field">
                <label>🎯 Output Format</label>
                <select value={outputFormat} onChange={e => setOutputFormat(e.target.value)}>
                  {FORMATS.map(format => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>
                  {getFormatInfo(outputFormat).description}
                </div>
              </div>

              {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
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
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>
                    Higher quality = larger file size
                  </div>
                </div>
              )}

              <button
                className="tw-calc-btn"
                onClick={convertImage}
                disabled={isConverting}
                style={{ flex: '1 1 100%' }}
              >
                {isConverting ? '⏳ Converting...' : '🔄 Convert Image'}
              </button>
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-sec-title">🖼️ Preview</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#666' }}>
                  Original ({selectedFile?.type?.split('/')[1]?.toUpperCase()})
                </div>
                <img loading="lazy"
                  src={preview}
                  alt="Original"
                  style={{ width: '100%', maxHeight: 200, objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8 }}
                />
              </div>
              {convertedImage && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#666' }}>
                    Converted ({outputFormat.toUpperCase()})
                  </div>
                  <img loading="lazy"
                    src={convertedImage}
                    alt="Converted"
                    style={{ width: '100%', maxHeight: 200, objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8 }}
                  />
                  <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#666' }}>
                    Size: {formatBytes(newSize)}
                    {originalSize > 0 && (
                      <span> ({newSize > originalSize ? '+' : ''}{((newSize / originalSize - 1) * 100).toFixed(1)}%)</span>
                    )}
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
        <div className="tp-sec-title">📝 Image Format Conversion Guide</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <p>
            Different situations mein different image formats ka use karna padta hai. Har format ki apni strengths aur weaknesses hoti hain. Yeh guide aapko sikhaega ki kaunse format kab use karein aur kaise convert karein images ko.
          </p>

          <h3>1. JPEG (Joint Photographic Experts Group)</h3>
          <p>
            <strong>Best for:</strong> Photographs, complex images with many colors
          </p>
          <p>
            <strong>Pros:</strong> Small file size, widely supported, good quality-to-size ratio
          </p>
          <p>
            <strong>Cons:</strong> Lossy compression (quality loss), no transparency support
          </p>
          <p>
            <strong>Use cases:</strong> Web photos, social media posts, digital photography
          </p>

          <h3>2. PNG (Portable Network Graphics)</h3>
          <p>
            <strong>Best for:</strong> Graphics, logos, images with transparency
          </p>
          <p>
            <strong>Pros:</strong> Lossless compression, transparency support, good for text/graphics
          </p>
          <p>
            <strong>Cons:</strong> Larger file size than JPEG, not ideal for photos
          </p>
          <p>
            <strong>Use cases:</strong> Logos, icons, screenshots, graphics with transparent backgrounds
          </p>

          <h3>3. WebP (Web Picture Format)</h3>
          <p>
            <strong>Best for:</strong> Modern web usage, both photos and graphics
          </p>
          <p>
            <strong>Pros:</strong> Superior compression, supports transparency, animation support
          </p>
          <p>
            <strong>Cons:</strong> Limited browser support (but improving), newer format
          </p>
          <p>
            <strong>Use cases:</strong> Web images, modern websites, apps
          </p>

          <h3>4. BMP (Bitmap)</h3>
          <p>
            <strong>Best for:</strong> When you need uncompressed quality
          </p>
          <p>
            <strong>Pros:</strong> Uncompressed, highest quality, simple format
          </p>
          <p>
            <strong>Cons:</strong> Very large file sizes, no compression
          </p>
          <p>
            <strong>Use cases:</strong> Printing, professional editing, archival
          </p>

          <h3>5. Quality Settings</h3>
          <p>
            Lossy formats (JPEG, WebP) mein quality setting important hota hai:
          </p>
          <ul>
            <li><strong>100%:</strong> Best quality, largest file size</li>
            <li><strong>80-90%:</strong> Excellent quality, good file size (recommended for web)</li>
            <li><strong>60-70%:</strong> Good quality, small file size (social media)</li>
            <li><strong>Below 60%:</strong> Noticeable quality loss</li>
          </ul>

          <h3>6. When to Convert Formats</h3>
          <ul>
            <li><strong>JPEG to PNG:</strong> When you need transparency</li>
            <li><strong>PNG to JPEG:</strong> When file size is too large</li>
            <li><strong>Any to WebP:</strong> For modern web optimization</li>
            <li><strong>Any to BMP:</strong> For professional printing</li>
          </ul>

          <h3>7. Transparency Handling</h3>
          <p>
            Converting transparent images to JPEG/WebP:
          </p>
          <ul>
            <li>Background white ho jata hai</li>
            <li>PNG mein transparency preserve rahti hai</li>
            <li>WebP transparency support karta hai</li>
          </ul>

          <h3>8. Batch Conversion</h3>
          <p>
            Multiple images convert karne ke liye:
          </p>
          <ul>
            <li>Online tools: Convertio, CloudConvert</li>
            <li>Desktop software: IrfanView, XnConvert</li>
            <li>Command line: ImageMagick</li>
          </ul>

          <h3>9. Web Optimization</h3>
          <p>
            Web ke liye best practices:
          </p>
          <ul>
            <li>Use WebP with JPEG fallback</li>
            <li>Compress images before upload</li>
            <li>Use appropriate dimensions</li>
            <li>Lazy loading implement karo</li>
          </ul>

          <h3>10. Mobile Considerations</h3>
          <p>
            Mobile devices ke liye:
          </p>
          <ul>
            <li>JPEG for photos (smaller size)</li>
            <li>PNG for icons/logos</li>
            <li>WebP for modern apps</li>
            <li>Consider retina displays</li>
          </ul>

          <p>
            Yeh tool basic format conversion ke liye perfect hai. Advanced features ke liye professional software use karo. Practice se aap expert ban jaoge image format selection mein!
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}
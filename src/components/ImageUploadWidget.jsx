/**
 * IMAGE UPLOAD WIDGET — Admin Panel
 * Support: Cloudinary, Imgur, Firebase Storage, URL
 */

import React, { useState } from 'react'
import { uploadImage } from '../utils/imageUpload'

export default function ImageUploadWidget({ value, onChange, preview = true }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [method, setMethod] = useState('cloudinary')
  const [fileInput, setFileInput] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError('')

    try {
      const result = await uploadImage(file, method)
      onChange(result.url)
      setError('')
    } catch (err) {
      setError(err.message || 'Upload failed')
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
      setFileInput('')
    }
  }

  return (
    <div style={{ 
      border: '1.5px solid #e2e8f0', 
      borderRadius: 12, 
      padding: 16, 
      background: '#f8fafc',
      marginBottom: 12 
    }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', marginBottom: 8, color: '#334155' }}>
          📷 Cover Image
        </label>
      </div>

      {/* Upload Method Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8, marginBottom: 12 }}>
        {['cloudinary', 'imgur', 'firebase', 'url'].map(m => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: method === m ? '2px solid #10b981' : '1.5px solid #cbd5e1',
              background: method === m ? '#10b98130' : '#fff',
              color: method === m ? '#10b981' : '#475569',
              fontWeight: method === m ? 700 : 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {m === 'cloudinary' && '☁️ Cloudinary'}
            {m === 'imgur' && '🖼️ Imgur'}
            {m === 'firebase' && '🔥 Firebase'}
            {m === 'url' && '🔗 URL'}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      {method !== 'url' && (
        <div
          onClick={() => fileInput?.click()}
          style={{
            border: '2px dashed #cbd5e1',
            borderRadius: 10,
            padding: '24px',
            textAlign: 'center',
            background: '#f8f9fa',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: 12,
            opacity: loading ? 0.6 : 1
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>📤</div>
          <div style={{ fontWeight: 700, color: '#334155', marginBottom: 4 }}>
            {loading ? 'Uploading...' : 'Click to upload image'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            JPG, PNG, WebP, GIF (max 10MB)
          </div>
          <input
            ref={ref => setFileInput(ref)}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* URL Input */}
      {method === 'url' && (
        <div style={{ marginBottom: 12 }}>
          <input
            type="url"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1.5px solid #cbd5e1',
              borderRadius: 8,
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '10px 12px',
          background: '#fef2f2',
          border: '1.5px solid #fca5a5',
          borderRadius: 8,
          color: '#dc2626',
          fontSize: '0.82rem',
          marginBottom: 12,
          fontWeight: 600
        }}>
          ❌ {error}
        </div>
      )}

      {/* Preview */}
      {preview && value && (
        <div style={{
          marginTop: 12,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          <img
            src={value}
            alt="Cover"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 200,
              objectFit: 'cover',
              display: 'block'
            }}
            onError={() => setError('Image failed to load')}
          />
        </div>
      )}

      {/* Info */}
      <div style={{
        marginTop: 12,
        padding: '10px 12px',
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 8,
        fontSize: '0.75rem',
        color: '#166534'
      }}>
        💡 {method === 'cloudinary' && 'Best: Auto-optimize, fast CDN'}
        {method === 'imgur' && 'Fastest upload, no setup'}
        {method === 'firebase' && 'Already integrated with your app'}
        {method === 'url' && 'Paste direct image link (no upload)'}
      </div>
    </div>
  )
}

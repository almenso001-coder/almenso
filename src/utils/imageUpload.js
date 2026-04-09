/**
 * IMAGE UPLOAD UTILITY — 3 Methods
 * 1. Cloudinary (Best)
 * 2. Imgur (Fastest)
 * 3. Firebase Storage (Integrated)
 */

// ═══════════════════════════════════════════════════════════════
// 1. CLOUDINARY — Recommended
// ═══════════════════════════════════════════════════════════════

export async function uploadToCloudinary(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', window.__CLOUDINARY_PRESET__ || 'almenso_unsigned')
    formData.append('cloud_name', window.__CLOUDINARY_NAME__ || 'dxxxxxhxx')
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${window.__CLOUDINARY_NAME__ || 'dxxxxxhxx'}/image/upload`, {
      method: 'POST',
      body: formData
    })
    
    if (!res.ok) throw new Error('Upload failed')
    const data = await res.json()
    return { url: data.secure_url, type: 'cloudinary', size: data.bytes }
  } catch (err) {
    console.error('Cloudinary error:', err)
    throw new Error('Cloudinary upload failed: ' + err.message)
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. IMGUR — Fastest
// ═══════════════════════════════════════════════════════════════

export async function uploadToImgur(file) {
  try {
    const formData = new FormData()
    formData.append('image', file)
    
    // Using Imgur Anonymous Client ID
    const clientId = window.__IMGUR_CLIENT_ID__ || 'ea6e34ca6c7d23f'
    
    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${clientId}`
      },
      body: formData
    })
    
    if (!res.ok) throw new Error('Upload failed')
    const data = await res.json()
    return { url: data.data.link, type: 'imgur', size: data.data.size }
  } catch (err) {
    console.error('Imgur error:', err)
    throw new Error('Imgur upload failed: ' + err.message)
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. FIREBASE STORAGE
// ═══════════════════════════════════════════════════════════════

export async function uploadToFirebase(file) {
  try {
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
      throw new Error('Firebase not initialized')
    }
    
    const storage = firebase.storage()
    const timestamp = Date.now()
    const filename = `articles/${timestamp}-${file.name}`
    const ref = storage.ref(filename)
    
    const snapshot = await ref.put(file)
    const url = await snapshot.ref.getDownloadURL()
    
    return { url, type: 'firebase', size: snapshot.totalBytes }
  } catch (err) {
    console.error('Firebase error:', err)
    throw new Error('Firebase upload failed: ' + err.message)
  }
}

// ═══════════════════════════════════════════════════════════════
// Main Upload Handler
// ═══════════════════════════════════════════════════════════════

export async function uploadImage(file, method = 'cloudinary') {
  // Validate file
  if (!file) throw new Error('File required')
  if (file.size > 10 * 1024 * 1024) throw new Error('File too large (max 10MB)')
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
    throw new Error('Invalid file type (JPG, PNG, WebP, GIF only)')
  }
  
  // Choose method
  switch (method) {
    case 'imgur':
      return uploadToImgur(file)
    case 'firebase':
      return uploadToFirebase(file)
    case 'cloudinary':
    default:
      return uploadToCloudinary(file)
  }
}

// ═══════════════════════════════════════════════════════════════
// Setup Instructions (For Admin)
// ═══════════════════════════════════════════════════════════════

export const UPLOAD_SETUP = {
  cloudinary: {
    name: 'Cloudinary',
    free: true,
    setup: `
      1. Go to https://cloudinary.com/users/register/free
      2. Sign up (free account)
      3. Dashboard mein "Upload Preset" create karo
      4. Unsigned preset banao (no authentication needed)
      5. Admin Settings mein add karo:
         - Cloud Name
         - Upload Preset
    `,
    features: ['Auto-optimize', '75GB free', 'CDN speed', 'Responsive images'],
    limit: 'Unlimited (75GB/month)'
  },
  imgur: {
    name: 'Imgur',
    free: true,
    setup: `
      1. Go to https://api.imgur.com/oauth2/addclient
      2. Create application (OAuth2)
      3. Copy "Client ID"
      4. Admin Settings mein Client ID add karo
      5. Done!
    `,
    features: ['Fastest', 'No setup', 'Direct API'],
    limit: '5 uploads/hour (anonymous)'
  },
  firebase: {
    name: 'Firebase Storage',
    free: true,
    setup: `
      1. Firebase already setup hai
      2. Sirf enable karna padta hai Storage
      3. Firestore mein allow rules set karo
      4. Admin panel automatically use karega
    `,
    features: ['Integrated', 'Secure', 'Real-time'],
    limit: '5GB free'
  }
}

/**
 * CONVERSION TRACKER — Track conversions across all platforms
 * Integrates with Google Ads, Facebook, Instagram, TikTok, YouTube, Email, WhatsApp, SMS
 */

// Get saved pixel data from localStorage
function getPixelData() {
  try {
    return JSON.parse(localStorage.getItem('almenso_marketing_pixels') || '{}')
  } catch {
    return {}
  }
}

// Track conversion event
export function trackConversion(conversionType = 'product_view', conversionData = {}) {
  const pixelData = getPixelData()
  const timestamp = new Date().toISOString()

  // Log conversion locally
  logLocalConversion(conversionType, conversionData, timestamp)

  // Google Ads
  if (pixelData.google?.conversionId) {
    trackGoogleAds(pixelData.google, conversionType, conversionData)
  }

  // Facebook Pixel
  if (pixelData.facebook?.pixelId) {
    trackFacebook(pixelData.facebook, conversionType, conversionData)
  }

  // Instagram (same as Facebook)
  if (pixelData.instagram?.pixelId) {
    trackInstagram(pixelData.instagram, conversionType, conversionData)
  }

  // TikTok Pixel
  if (pixelData.tiktok?.pixelId) {
    trackTikTok(pixelData.tiktok, conversionType, conversionData)
  }

  // YouTube
  if (pixelData.youtube?.conversionId) {
    trackYouTube(pixelData.youtube, conversionType, conversionData)
  }

  // Email
  if (pixelData.email?.email) {
    trackEmail(pixelData.email, conversionType, conversionData)
  }

  // WhatsApp
  if (pixelData.whatsapp?.phone) {
    trackWhatsApp(pixelData.whatsapp, conversionType, conversionData)
  }

  // SMS
  if (pixelData.sms?.campaignId) {
    trackSMS(pixelData.sms, conversionType, conversionData)
  }
}

// Track product view
export function trackProductView(productId, productName, price) {
  trackConversion('product_view', {
    productId,
    productName,
    price,
  })
}

// Track affiliate link click
export function trackAffiliateClick(productName, affiliateLink, platform = 'amazon') {
  trackConversion('affiliate_click', {
    productName,
    affiliateLink,
    platform,
  })

  // Store in analytics
  updateAnalytics('click', 1)
}

// Track lead form submission
export function trackLead(formData) {
  trackConversion('lead_submission', formData)
  updateAnalytics('lead', 1)
}

// Track UTM parameters
export function trackUTMParameters() {
  const params = new URLSearchParams(window.location.search)
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    content: params.get('utm_content'),
    term: params.get('utm_term'),
  }

  if (Object.values(utm).some(v => v)) {
    trackConversion('utm_visit', utm)
  }

  return utm
}

// ═══════════════════════════════════════════════════════════
// Platform-specific tracking functions
// ═══════════════════════════════════════════════════════════

function trackGoogleAds(config, type, data) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'allow_custom_events': true,
        'currency': 'INR',
        'value': data.value || 1.0,
        'event_category': type,
        'event_label': data.productName || type,
      })
    }
  } catch (e) {
    console.warn('Google Ads tracking failed:', e)
  }
}

function trackFacebook(config, type, data) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: data.value || 1.0,
        currency: 'INR',
      })
    }
  } catch (e) {
    console.warn('Facebook tracking failed:', e)
  }
}

function trackInstagram(config, type, data) {
  // Instagram uses same pixel as Facebook
  trackFacebook(config, type, data)
}

function trackTikTok(config, type, data) {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('Purchase', {
        value: data.value || 1.0,
        currency: 'INR',
      })
    }
  } catch (e) {
    console.warn('TikTok tracking failed:', e)
  }
}

function trackYouTube(config, type, data) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', `AW-${config.conversionId}`)
      window.gtag('event', 'conversion', {
        'allow_custom_events': true,
        'currency': 'INR',
        'value': data.value || 1.0,
      })
    }
  } catch (e) {
    console.warn('YouTube tracking failed:', e)
  }
}

function trackEmail(config, type, data) {
  try {
    fetch('/api/track-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: config.email,
        type,
        data,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {}) // Silently fail
  } catch (e) {
    console.warn('Email tracking failed:', e)
  }
}

function trackWhatsApp(config, type, data) {
  try {
    fetch('/api/track-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: config.phone,
        type,
        data,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {})
  } catch (e) {
    console.warn('WhatsApp tracking failed:', e)
  }
}

function trackSMS(config, type, data) {
  try {
    fetch('/api/track-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaignId: config.campaignId,
        type,
        data,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {})
  } catch (e) {
    console.warn('SMS tracking failed:', e)
  }
}

// ═══════════════════════════════════════════════════════════
// Analytics & Logging
// ═══════════════════════════════════════════════════════════

function logLocalConversion(type, data, timestamp) {
  try {
    const logs = JSON.parse(localStorage.getItem('almenso_conversions') || '[]')
    logs.push({
      type,
      data,
      timestamp,
      url: window.location.href,
    })
    // Keep only last 1000 conversions
    if (logs.length > 1000) logs.shift()
    localStorage.setItem('almenso_conversions', JSON.stringify(logs))
  } catch (e) {
    console.warn('Failed to log conversion:', e)
  }
}

function updateAnalytics(metricType, value = 1) {
  try {
    const stats = JSON.parse(localStorage.getItem('almenso_marketing_stats') || '{"totalClicks":0,"totalConversions":0,"totalRevenue":0}')

    if (metricType === 'click') stats.totalClicks += value
    if (metricType === 'lead') stats.totalConversions += value
    if (metricType === 'conversion') stats.totalConversions += value

    // Calculate conversion rate
    if (stats.totalClicks > 0) {
      stats.conversionRate = ((stats.totalConversions / stats.totalClicks) * 100).toFixed(2)
    }

    localStorage.setItem('almenso_marketing_stats', JSON.stringify(stats))
  } catch (e) {
    console.warn('Failed to update analytics:', e)
  }
}

// Get all conversions
export function getAllConversions() {
  try {
    return JSON.parse(localStorage.getItem('almenso_conversions') || '[]')
  } catch {
    return []
  }
}

// Get analytics stats
export function getAnalyticsStats() {
  try {
    return JSON.parse(localStorage.getItem('almenso_marketing_stats') || '{"totalClicks":0,"totalConversions":0,"totalRevenue":0,"conversionRate":0}')
  } catch {
    return { totalClicks: 0, totalConversions: 0, totalRevenue: 0, conversionRate: 0 }
  }
}

// Export conversions as CSV
export function exportConversionsCSV() {
  const conversions = getAllConversions()
  const headers = ['Type', 'Timestamp', 'Data', 'URL']
  const rows = conversions.map(c => [
    c.type,
    c.timestamp,
    JSON.stringify(c.data),
    c.url,
  ])

  let csv = headers.join(',') + '\n'
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n'
  })

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `conversions-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
}

// Initialize tracking on page load
export function initializeTracking() {
  // Track UTM parameters
  trackUTMParameters()

  // Track page view
  trackConversion('page_view', {
    page: window.location.pathname,
    title: document.title,
  })
}

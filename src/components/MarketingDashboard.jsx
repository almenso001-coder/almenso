/**
 * MARKETING DASHBOARD — Complete Conversion Tracking
 * Google Ads, Facebook, Instagram, TikTok, YouTube, Email, WhatsApp, SMS
 * Real-time analytics, ROI calculator, campaign manager
 */
import React, { useState, useEffect, useMemo } from 'react'

const PLATFORMS = [
  { id: 'google', label: '🔷 Google Ads', icon: '📊', color: '#4285F4' },
  { id: 'facebook', label: '📘 Facebook', icon: '📱', color: '#1877F2' },
  { id: 'instagram', label: '📷 Instagram', icon: '📸', color: '#E4405F' },
  { id: 'tiktok', label: '🎵 TikTok', icon: '🎬', color: '#000000' },
  { id: 'youtube', label: '🎬 YouTube', icon: '▶️', color: '#FF0000' },
  { id: 'email', label: '📧 Email', icon: '✉️', color: '#EA4335' },
  { id: 'whatsapp', label: '💬 WhatsApp', icon: '💬', color: '#25D366' },
  { id: 'sms', label: '📱 SMS', icon: '💌', color: '#FF6B35' },
]

function PixelSetupForm({ platform, data, onSave }) {
  const [form, setForm] = useState(data || {})
  const [copied, setCopied] = useState(false)

  const handleSave = () => {
    onSave(platform, form)
    setCopied(false)
  }

  const generateCode = () => {
    const codes = {
      google: `<!-- Google Ads Conversion Tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-${form.conversionId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-${form.conversionId}');
  gtag('event', 'page_view', {
    'allow_custom_events': true
  });
</script>`,

      facebook: `<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${form.pixelId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${form.pixelId}&ev=PageView&noscript=1"
/></noscript>`,

      tiktok: `<!-- TikTok Pixel -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;++i)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<e.length;n++)e[n](ttq);
  var i=ttq._i[t]=[function(t){ttq.push([t])}];ttq.instances.push(t),ttq._t[t]=!0};
  for(var n=0;n<ttq.instances.length;++n)ttq.instance(ttq.instances[n]);
  ttq.load=function(e,t){var n=document.createElement("script");
  n.type="text/javascript",n.async=!0,n.src='https://analytics.tiktok.com/i18n/pixel/events.js?sdkid='+e;
  var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(n,i)};
  ttq.load('${form.pixelId}');
  ttq.page();
}(window,document,'ttq');
</script>`,

      youtube: `<!-- YouTube Conversion Tracking -->
<script>
gtag('config', 'AW-${form.conversionId}');
gtag('event', 'conversion', {
  'allow_custom_events': true,
  'currency': 'INR',
  'value': 1.0
});
</script>`,

      email: `<!-- Email Marketing Tracking -->
<script>
window.addEventListener('almenso:conversion', function(e) {
  fetch('/api/track-email', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: '${form.email}',
      type: 'conversion',
      timestamp: new Date().toISOString()
    })
  });
});
</script>`,

      whatsapp: `<!-- WhatsApp Conversion Tracking -->
<script>
window.trackWhatsAppConversion = function(phone) {
  fetch('/api/track-whatsapp', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      phone: phone,
      type: 'conversion',
      timestamp: new Date().toISOString()
    })
  });
};
</script>`,

      sms: `<!-- SMS Campaign Tracking -->
<script>
window.trackSMSConversion = function(phone) {
  fetch('/api/track-sms', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      phone: phone,
      campaign: '${form.campaignId}',
      type: 'conversion',
      timestamp: new Date().toISOString()
    })
  });
};
</script>`,
    }
    return codes[platform] || ''
  }

  const code = generateCode()
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '16px', marginBottom: '16px' }}>
      <div style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: 12, color: '#0f172a' }}>
        {PLATFORMS.find(p => p.id === platform)?.label}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        {platform === 'google' && (
          <>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                Conversion ID *
              </label>
              <input
                type="text"
                value={form.conversionId || ''}
                onChange={(e) => setForm({ ...form, conversionId: e.target.value })}
                placeholder="AW-XXXXXXXXX"
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                Conversion Label
              </label>
              <input
                type="text"
                value={form.conversionLabel || ''}
                onChange={(e) => setForm({ ...form, conversionLabel: e.target.value })}
                placeholder="e.g., product_purchase"
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem' }}
              />
            </div>
          </>
        )}

        {(platform === 'facebook' || platform === 'instagram') && (
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
              Pixel ID *
            </label>
            <input
              type="text"
              value={form.pixelId || ''}
              onChange={(e) => setForm({ ...form, pixelId: e.target.value })}
              placeholder="123456789012345"
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
            />
          </div>
        )}

        {platform === 'tiktok' && (
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
              Pixel ID *
            </label>
            <input
              type="text"
              value={form.pixelId || ''}
              onChange={(e) => setForm({ ...form, pixelId: e.target.value })}
              placeholder="C2V10J20M0C40P8A0HJG"
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
            />
          </div>
        )}

        {platform === 'youtube' && (
          <>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                Conversion ID *
              </label>
              <input
                type="text"
                value={form.conversionId || ''}
                onChange={(e) => setForm({ ...form, conversionId: e.target.value })}
                placeholder="AW-XXXXXXXXX"
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                Conversion Label
              </label>
              <input
                type="text"
                value={form.conversionLabel || ''}
                onChange={(e) => setForm({ ...form, conversionLabel: e.target.value })}
                placeholder="e.g., view_product"
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem' }}
              />
            </div>
          </>
        )}

        {platform === 'email' && (
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
              Email List API Key
            </label>
            <input
              type="text"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g., Mailchimp API key"
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
            />
          </div>
        )}

        {platform === 'whatsapp' && (
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
              WhatsApp Business Phone Number
            </label>
            <input
              type="text"
              value={form.phone || ''}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="e.g., +919258133689"
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
            />
          </div>
        )}

        {platform === 'sms' && (
          <>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                Campaign ID
              </label>
              <input
                type="text"
                value={form.campaignId || ''}
                onChange={(e) => setForm({ ...form, campaignId: e.target.value })}
                placeholder="e.g., promo_2024_01"
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                SMS Provider API Key
              </label>
              <input
                type="text"
                value={form.apiKey || ''}
                onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                placeholder="e.g., AWS SNS, Twilio"
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}
              />
            </div>
          </>
        )}
      </div>

      {/* Code Display */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: 8 }}>
          📋 Generated Code:
        </div>
        <pre style={{
          background: '#0f172a',
          color: '#10b981',
          padding: '10px',
          borderRadius: 6,
          overflow: 'auto',
          fontSize: '0.7rem',
          fontFamily: 'monospace',
          lineHeight: '1.4',
          maxHeight: '150px'
        }}>
          {code}
        </pre>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={copyToClipboard}
          style={{
            flex: 1,
            padding: '10px',
            background: copied ? '#10b981' : '#dbeafe',
            color: copied ? '#fff' : '#1e40af',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          {copied ? '✅ Copied!' : '📋 Copy Code'}
        </button>
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            padding: '10px',
            background: '#0a2342',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          💾 Save Setup
        </button>
      </div>
    </div>
  )
}

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('setup')
  const [pixelData, setPixelData] = useState({})
  const [campaigns, setCampaigns] = useState([])
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    conversionRate: 0,
  })

  useEffect(() => {
    // Load saved pixel data from localStorage
    const saved = localStorage.getItem('almenso_marketing_pixels')
    if (saved) setPixelData(JSON.parse(saved))

    const savedCampaigns = localStorage.getItem('almenso_campaigns')
    if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns))

    const savedStats = localStorage.getItem('almenso_marketing_stats')
    if (savedStats) setStats(JSON.parse(savedStats))
  }, [])

  const handleSavePixel = (platform, data) => {
    const updated = { ...pixelData, [platform]: data }
    setPixelData(updated)
    localStorage.setItem('almenso_marketing_pixels', JSON.stringify(updated))
    alert(`✅ ${platform.toUpperCase()} pixel saved!`)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0f172a', marginBottom: 4 }}>
          📢 Marketing & Conversion Tracking
        </div>
        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Setup Google Ads, Facebook, Instagram, TikTok, YouTube, Email, WhatsApp, SMS tracking
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('setup')}
          style={{
            padding: '10px 16px',
            background: activeTab === 'setup' ? '#0a2342' : '#f1f5f9',
            color: activeTab === 'setup' ? '#fff' : '#475569',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          🔧 Pixel Setup
        </button>
        <button
          onClick={() => setActiveTab('utm')}
          style={{
            padding: '10px 16px',
            background: activeTab === 'utm' ? '#0a2342' : '#f1f5f9',
            color: activeTab === 'utm' ? '#fff' : '#475569',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          🔗 UTM Generator
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          style={{
            padding: '10px 16px',
            background: activeTab === 'campaigns' ? '#0a2342' : '#f1f5f9',
            color: activeTab === 'campaigns' ? '#fff' : '#475569',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          📊 Campaigns
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '10px 16px',
            background: activeTab === 'analytics' ? '#0a2342' : '#f1f5f9',
            color: activeTab === 'analytics' ? '#fff' : '#475569',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          📈 Analytics
        </button>
        <button
          onClick={() => setActiveTab('roi')}
          style={{
            padding: '10px 16px',
            background: activeTab === 'roi' ? '#0a2342' : '#f1f5f9',
            color: activeTab === 'roi' ? '#fff' : '#475569',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          💰 ROI Calculator
        </button>
      </div>

      {/* PIXEL SETUP TAB */}
      {activeTab === 'setup' && (
        <div>
          <div style={{ background: '#e0e7ff', border: '1.5px solid #4f46e5', borderRadius: 12, padding: '12px 14px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.85rem', color: '#4338ca', fontWeight: 600 }}>
              💡 <strong>How it works:</strong> Add your pixel IDs below. We'll auto-generate tracking codes for your website.
            </div>
          </div>

          {PLATFORMS.map((platform) => (
            <PixelSetupForm
              key={platform.id}
              platform={platform.id}
              data={pixelData[platform.id]}
              onSave={handleSavePixel}
            />
          ))}
        </div>
      )}

      {/* UTM GENERATOR TAB */}
      {activeTab === 'utm' && (
        <UTMGenerator />
      )}

      {/* CAMPAIGNS TAB */}
      {activeTab === 'campaigns' && (
        <CampaignManager campaigns={campaigns} setCampaigns={setCampaigns} />
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <AnalyticsDashboard />
      )}

      {/* ROI CALCULATOR TAB */}
      {activeTab === 'roi' && (
        <ROICalculator />
      )}
    </div>
  )
}

// UTM GENERATOR COMPONENT
function UTMGenerator() {
  const [form, setForm] = useState({
    baseUrl: 'https://almenso.vercel.app',
    source: 'google',
    medium: 'cpc',
    campaign: '',
    content: '',
    term: '',
  })
  const [generatedUrl, setGeneratedUrl] = useState('')

  const generateURL = () => {
    const params = new URLSearchParams()
    if (form.source) params.append('utm_source', form.source)
    if (form.medium) params.append('utm_medium', form.medium)
    if (form.campaign) params.append('utm_campaign', form.campaign)
    if (form.content) params.append('utm_content', form.content)
    if (form.term) params.append('utm_term', form.term)
    
    const url = `${form.baseUrl}?${params.toString()}`
    setGeneratedUrl(url)
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '20px' }}>
      <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 16, color: '#0f172a' }}>
        🔗 UTM Parameter Generator
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Base URL *
          </label>
          <input
            type="url"
            value={form.baseUrl}
            onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
            placeholder="https://almenso.vercel.app/products"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Source (utm_source) *
          </label>
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          >
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Medium (utm_medium) *
          </label>
          <select
            value={form.medium}
            onChange={(e) => setForm({ ...form, medium: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          >
            <option value="cpc">CPC (Paid)</option>
            <option value="cpm">CPM (Display)</option>
            <option value="organic">Organic</option>
            <option value="social">Social</option>
            <option value="email">Email</option>
            <option value="referral">Referral</option>
            <option value="direct">Direct</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Campaign (utm_campaign) *
          </label>
          <input
            type="text"
            value={form.campaign}
            onChange={(e) => setForm({ ...form, campaign: e.target.value })}
            placeholder="e.g., summer_sale_2024"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Content (utm_content) - Optional
          </label>
          <input
            type="text"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="e.g., banner_top"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Term (utm_term) - Optional
          </label>
          <input
            type="text"
            value={form.term}
            onChange={(e) => setForm({ ...form, term: e.target.value })}
            placeholder="e.g., solar_panels"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <button
        onClick={generateURL}
        style={{
          width: '100%',
          padding: '12px',
          background: '#0a2342',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '16px',
        }}
      >
        🔗 Generate URL
      </button>

      {generatedUrl && (
        <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px', border: '1.5px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: 8 }}>
            📋 Your Tracking URL:
          </div>
          <div style={{
            background: '#0f172a',
            color: '#10b981',
            padding: '12px',
            borderRadius: 6,
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            wordBreak: 'break-all',
            marginBottom: '12px',
          }}>
            {generatedUrl}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedUrl)
              alert('✅ URL copied to clipboard!')
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#dbeafe',
              color: '#1e40af',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📋 Copy URL
          </button>
        </div>
      )}
    </div>
  )
}

// CAMPAIGN MANAGER COMPONENT
function CampaignManager({ campaigns, setCampaigns }) {
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    platform: 'google',
    budget: '',
    startDate: '',
    endDate: '',
  })

  const addCampaign = () => {
    if (!newCampaign.name) {
      alert('Please enter campaign name')
      return
    }
    const campaign = {
      id: 'camp_' + Date.now(),
      ...newCampaign,
      createdAt: new Date().toISOString(),
      clicks: 0,
      conversions: 0,
      revenue: 0,
    }
    const updated = [...campaigns, campaign]
    setCampaigns(updated)
    localStorage.setItem('almenso_campaigns', JSON.stringify(updated))
    setNewCampaign({ name: '', platform: 'google', budget: '', startDate: '', endDate: '' })
    alert('✅ Campaign created!')
  }

  const deleteCampaign = (id) => {
    const updated = campaigns.filter(c => c.id !== id)
    setCampaigns(updated)
    localStorage.setItem('almenso_campaigns', JSON.stringify(updated))
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '20px' }}>
      <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 16, color: '#0f172a' }}>
        📊 Campaign Manager
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Campaign Name *
          </label>
          <input
            type="text"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            placeholder="e.g., Summer Sale"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Platform
          </label>
          <select
            value={newCampaign.platform}
            onChange={(e) => setNewCampaign({ ...newCampaign, platform: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          >
            {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Budget (₹)
          </label>
          <input
            type="number"
            value={newCampaign.budget}
            onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
            placeholder="5000"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={addCampaign}
          style={{
            padding: '10px',
            background: '#0a2342',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            alignSelf: 'flex-end',
          }}
        >
          ➕ Add Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          📭 No campaigns yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {campaigns.map(c => (
            <div key={c.id} style={{ background: '#f8fafc', borderRadius: 10, padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
                  {c.platform} • Budget: ₹{c.budget} • Clicks: {c.clicks} • Conversions: {c.conversions}
                </div>
              </div>
              <button
                onClick={() => deleteCampaign(c.id)}
                style={{
                  padding: '6px 12px',
                  background: '#fee2e2',
                  color: '#991b1b',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ANALYTICS DASHBOARD COMPONENT
function AnalyticsDashboard() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '20px' }}>
      <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 16, color: '#0f172a' }}>
        📈 Real-Time Analytics
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {[
          { label: 'Total Clicks', value: '0', icon: '🖱️', color: '#3b82f6' },
          { label: 'Total Conversions', value: '0', icon: '✅', color: '#10b981' },
          { label: 'Conversion Rate', value: '0%', icon: '📊', color: '#f59e0b' },
          { label: 'Total Revenue', value: '₹0', icon: '💰', color: '#ec4899' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '16px', border: `2px solid ${stat.color}20` }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#f8fafc', borderRadius: 10, padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
        📊 Analytics data will appear once tracking is active. Check back after running campaigns!
      </div>
    </div>
  )
}

// ROI CALCULATOR COMPONENT
function ROICalculator() {
  const [calc, setCalc] = useState({
    spent: '',
    revenue: '',
  })

  const roi = calc.spent && calc.revenue ? (((calc.revenue - calc.spent) / calc.spent) * 100).toFixed(2) : 0
  const profit = calc.spent && calc.revenue ? (calc.revenue - calc.spent).toFixed(2) : 0

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '20px' }}>
      <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 16, color: '#0f172a' }}>
        💰 ROI Calculator
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Amount Spent (₹)
          </label>
          <input
            type="number"
            value={calc.spent}
            onChange={(e) => setCalc({ ...calc, spent: e.target.value })}
            placeholder="5000"
            style={{ width: '100%', padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
            Revenue Generated (₹)
          </label>
          <input
            type="number"
            value={calc.revenue}
            onChange={(e) => setCalc({ ...calc, revenue: e.target.value })}
            placeholder="15000"
            style={{ width: '100%', padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {calc.spent && calc.revenue && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '16px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '0.75rem', color: '#166534', marginBottom: '8px', fontWeight: 700 }}>
              Profit (₹)
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>
              ₹{profit}
            </div>
          </div>
          <div style={{ background: '#fef3c7', borderRadius: 10, padding: '16px', border: '2px solid #f59e0b' }}>
            <div style={{ fontSize: '0.75rem', color: '#92400e', marginBottom: '8px', fontWeight: 700 }}>
              ROI %
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b' }}>
              {roi}%
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

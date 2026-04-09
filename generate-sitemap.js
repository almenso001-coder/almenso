/**
 * sitemap.xml generator — Vercel pe deploy hone ke baad
 * /sitemap.xml route add karo ya static generate karo
 * 
 * Yeh file public/sitemap.xml generate karti hai
 * Run: node generate-sitemap.js > public/sitemap.xml
 */

const DOMAIN = 'https://almenso.com'
const TODAY  = new Date().toISOString().slice(0, 10)

const STATIC_PAGES = [
  { url: '/',               priority: '1.0', changefreq: 'daily'   },
  { url: '/shop',           priority: '0.9', changefreq: 'daily'   },
  { url: '/tools',          priority: '0.9', changefreq: 'weekly'  },
  { url: '/blog',           priority: '0.9', changefreq: 'weekly'  },
  { url: '/services',       priority: '0.7', changefreq: 'weekly'  },
  { url: '/earn',           priority: '0.6', changefreq: 'monthly' },
  { url: '/about',          priority: '0.5', changefreq: 'monthly' },
  { url: '/contact',        priority: '0.5', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.4', changefreq: 'yearly'  },
  { url: '/terms',          priority: '0.4', changefreq: 'yearly'  },
]

const TOOL_PAGES = [
  '/tools/gst-calculator',
  '/tools/emi-calculator',
  '/tools/age-calculator',
  '/tools/percentage-calculator',
  '/tools/profit-margin-calculator',
  '/tools/loan-interest-calculator',
  '/tools/word-counter',
  '/tools/qr-code-generator',
  '/tools/image-compressor',
  '/tools/bijli',
  '/tools/invoice',
  '/tools/budget',
  '/tools/profit',
].map(url => ({ url, priority: '0.8', changefreq: 'monthly' }))

const BLOG_SLUGS = [
  'bijli-bill-kaise-kam-kare',
  'gst-kya-hoti-hai-chote-business-ke-liye',
  'monthly-budget-kaise-banaye',
  'online-business-kaise-start-kare',
  'profit-margin-kaise-badhaye',
  'how-emi-is-calculated',
  'how-to-calculate-gst',
  'how-to-calculate-age-online',
  'how-to-calculate-percentage',
  'home-loan-guide-india',
  'small-business-accounting-tips',
  'upi-qr-code-business',
  'seo-blog-kaise-likhe',
  'fd-vs-sip-comparison',
  'digital-marketing-local-business',
  'savings-tips-middle-class-india',
  'income-tax-guide-salaried',
  'mutual-fund-beginners-guide',
  'freelancing-income-india',
  'adsense-approval-tips',
  'haldwani-top-places-guide',
  'jio-airtel-vi-best-recharge-2025',
  'ghar-renovation-budget-guide',
  'uttarakhand-government-yojana-2025',
  'passive-income-ideas-india-2025',
].map(slug => ({ url: `/blog/${slug}`, priority: '0.8', changefreq: 'monthly' }))

const ALL_PAGES = [...STATIC_PAGES, ...TOOL_PAGES, ...BLOG_SLUGS]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_PAGES.map(p => `  <url>
    <loc>${DOMAIN}${p.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

// Node.js mein run karo:
// node generate-sitemap.js > public/sitemap.xml
if (typeof process !== 'undefined' && process.stdout) {
  process.stdout.write(sitemap)
}

module.exports = { sitemap, ALL_PAGES }

// ============================================================
// ALMENSO — Article Generator Utility
// Generates SEO articles for tool pages
// ============================================================

const ARTICLES = [
  {
    slug: 'gst-calculator-guide',
    toolId: 'gst-calculator',
    title: 'GST Calculator — Complete Guide 2026',
    description: 'GST kaise calculate karte hain, CGST/SGST/IGST kya hai — poori guide with free calculator.',
    keywords: 'gst calculator, gst calculation india, cgst sgst calculator, gst inclusive exclusive',
    category: 'finance',
    readTime: 5,
  },
  {
    slug: 'emi-calculator-guide',
    toolId: 'emi-calculator',
    title: 'EMI Calculator — Home Loan, Car Loan Guide 2026',
    description: 'EMI kaise calculate karte hain, interest rate ka farak — complete guide with free EMI calculator.',
    keywords: 'emi calculator, home loan emi, car loan emi, emi calculation formula',
    category: 'finance',
    readTime: 4,
  },
  {
    slug: 'bijli-bill-calculator-guide',
    toolId: 'bijli-calculator',
    title: 'Bijli Bill Calculator — Uttarakhand UPCL 2026',
    description: 'UPCL ke latest rates se bijli bill kaise calculate karte hain — complete guide.',
    keywords: 'bijli bill calculator uttarakhand, upcl electricity bill, bijli bill kaise calculate kare',
    category: 'electricity',
    readTime: 4,
  },
  {
    slug: 'solar-roi-calculator-guide',
    toolId: 'solar-roi',
    title: 'Solar ROI Calculator — Payback Period Guide India',
    description: 'Solar panel lagwane ka ROI kaise calculate kare, payback period kya hota hai.',
    keywords: 'solar roi calculator, solar payback period, solar investment india, solar panel roi',
    category: 'electricity',
    readTime: 6,
  },
  {
    slug: 'image-resizer-guide',
    toolId: 'image-resizer',
    title: 'Image Resizer — Social Media ke liye Perfect Size Guide',
    description: 'Instagram, Facebook, WhatsApp ke liye image resize kaise kare — free online tool.',
    keywords: 'image resizer online, resize image free, social media image size, photo resize',
    category: 'image',
    readTime: 3,
  },
]

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug) || null
}

export function getAllArticles() {
  return ARTICLES
}

export function getArticlesByCategory(category) {
  return ARTICLES.filter(a => a.category === category)
}

export function generateArticle(toolId) {
  return ARTICLES.find(a => a.toolId === toolId) || null
}

export default ARTICLES

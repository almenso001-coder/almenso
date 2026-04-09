/**
 * SEO HELPER UTILITIES
 * Functions for generating SEO-optimized meta tags, Open Graph, Twitter Cards, etc.
 */

/**
 * Generate complete SEO meta tags for a page
 */
export function generateSEOTags({
  title,
  description,
  keywords = [],
  canonical,
  image,
  type = 'website',
  author = 'Almenso',
  siteName = 'Almenso Tools'
}) {
  const baseUrl = 'https://almenso.com'
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl
  const ogImage = image || `${baseUrl}/images/og-default.jpg`
  
  return {
    // Basic Meta Tags
    title: title,
    description: description,
    keywords: keywords.join(', '),
    author: author,
    canonical: fullUrl,
    
    // Open Graph Tags (Facebook)
    og: {
      title: title,
      description: description,
      url: fullUrl,
      type: type,
      image: ogImage,
      siteName: siteName,
      locale: 'en_IN'
    },
    
    // Twitter Card Tags
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      image: ogImage,
      site: '@almenso',
      creator: '@almenso'
    },
    
    // Additional SEO Tags
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',
    language: 'English'
  }
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url ? `https://almenso.com${item.url}` : undefined
    }))
  }
}

/**
 * Generate Article schema
 */
export function generateArticleSchema({
  title,
  description,
  author = 'Almenso Team',
  datePublished,
  dateModified,
  image,
  url
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': description,
    'author': {
      '@type': 'Organization',
      'name': author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Almenso',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://almenso.com/logo.png'
      }
    },
    'datePublished': datePublished,
    'dateModified': dateModified || datePublished,
    'image': image || 'https://almenso.com/images/default-article.jpg',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    }
  }
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
}

/**
 * Generate HowTo schema
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'totalTime': totalTime,
    'estimatedCost': estimatedCost,
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      'url': step.url
    }))
  }
}

/**
 * Generate WebApplication schema for tools
 */
export function generateWebAppSchema({
  name,
  description,
  url,
  category
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': name,
    'description': description,
    'url': url,
    'applicationCategory': category,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Any',
    'permissions': 'browser'
  }
}

/**
 * Generate SiteNavigationElement schema
 */
export function generateSiteNavigationSchema(links) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    'name': links.map(link => link.name),
    'url': links.map(link => `https://almenso.com${link.url}`)
  }
}

/**
 * Calculate reading time from word count
 */
export function calculateReadingTime(wordCount, wordsPerMinute = 200) {
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Generate slug from title
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength, suffix = '...') {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length).trim() + suffix
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text, count = 10) {
  // Remove common stop words
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'was', 'are', 'were', 'be', 'been', 'being'])
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))
  
  // Count word frequency
  const wordCount = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })
  
  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word)
}

/**
 * Generate XML sitemap entry
 */
export function generateSitemapEntry({
  url,
  lastmod = new Date().toISOString(),
  changefreq = 'weekly',
  priority = 0.8
}) {
  return `  <url>
    <loc>https://almenso.com${url}</loc>
    <lastmod>${lastmod.split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

/**
 * Generate complete XML sitemap
 */
export function generateSitemap(pages) {
  const entries = pages.map(page => generateSitemapEntry(page)).join('\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(options = {}) {
  const {
    sitemap = 'https://almenso.com/sitemap.xml',
    disallowPaths = ['/admin', '/api'],
    crawlDelay = null
  } = options
  
  let content = `User-agent: *\n`
  
  disallowPaths.forEach(path => {
    content += `Disallow: ${path}\n`
  })
  
  if (crawlDelay) {
    content += `Crawl-delay: ${crawlDelay}\n`
  }
  
  content += `\nSitemap: ${sitemap}`
  
  return content
}

/**
 * Validate meta description length
 */
export function validateMetaDescription(description) {
  const minLength = 120
  const maxLength = 160
  const length = description.length
  
  return {
    valid: length >= minLength && length <= maxLength,
    length: length,
    message: length < minLength 
      ? `Too short (${length} chars). Recommended: ${minLength}-${maxLength} chars.`
      : length > maxLength
      ? `Too long (${length} chars). Recommended: ${minLength}-${maxLength} chars.`
      : 'Perfect length!'
  }
}

/**
 * Validate meta title length
 */
export function validateMetaTitle(title) {
  const minLength = 30
  const maxLength = 60
  const length = title.length
  
  return {
    valid: length >= minLength && length <= maxLength,
    length: length,
    message: length < minLength 
      ? `Too short (${length} chars). Recommended: ${minLength}-${maxLength} chars.`
      : length > maxLength
      ? `Too long (${length} chars). Recommended: ${minLength}-${maxLength} chars.`
      : 'Perfect length!'
  }
}

/**
 * Check keyword density
 */
export function checkKeywordDensity(text, keyword) {
  const words = text.toLowerCase().split(/\s+/)
  const keywordLower = keyword.toLowerCase()
  const count = words.filter(word => word === keywordLower).length
  const density = (count / words.length) * 100
  
  return {
    count: count,
    density: density.toFixed(2) + '%',
    optimal: density >= 0.5 && density <= 2.5,
    message: density < 0.5 
      ? 'Keyword density too low. Consider adding the keyword naturally.'
      : density > 2.5
      ? 'Keyword density too high. Reduce keyword usage to avoid over-optimization.'
      : 'Keyword density is optimal.'
  }
}

export default {
  generateSEOTags,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateWebAppSchema,
  generateSiteNavigationSchema,
  calculateReadingTime,
  generateSlug,
  truncateText,
  extractKeywords,
  generateSitemap,
  generateSitemapEntry,
  generateRobotsTxt,
  validateMetaDescription,
  validateMetaTitle,
  checkKeywordDensity
}

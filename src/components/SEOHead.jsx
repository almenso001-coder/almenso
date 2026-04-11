import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const SITE      = 'Almenso'
const SITE_URL  = 'https://almenso.com'
const DEFAULT_IMG = `${SITE_URL}/preview.svg`

const DEFAULT_DESC = {
  hi: 'हल्द्वानी में 100+ फ्री ऑनलाइन टूल्स — GST, EMI, बिजली बिल कैलकुलेटर। इलेक्ट्रीशियन, सोलर, इंटीरियर सर्विस।',
  en: 'Free online tools, electrician service, solar solutions & interior design — Haldwani, Uttarakhand. 100+ tools, no login required.',
}

export default function SEOHead({
  title, description, keywords = '', image = '',
  canonical = '', type = 'website',
  schema = null,
  noindex = false,
  articlePublished = '', articleModified = '',
}) {
  const { lang } = useLanguage()

  useEffect(() => {
    const clean = title
      ? (title.includes(SITE) ? title : `${title} | ${SITE}`)
      : lang === 'hi'
        ? `${SITE} — हल्द्वानी का डिजिटल सहायक`
        : `${SITE} — Free Tools & Services Haldwani`

    document.title = clean

    const desc  = description || DEFAULT_DESC[lang] || DEFAULT_DESC.en
    const img   = image || DEFAULT_IMG
    const canon = canonical
      ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
      : `${SITE_URL}${window.location.pathname}`

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.content = content || ''
    }
    const setLink = (rel, href, hreflang) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        if (hreflang) el.hreflang = hreflang
        document.head.appendChild(el)
      }
      el.href = href
    }
    const removeEl = (sel) => { const el = document.querySelector(sel); if (el) el.remove() }
    const setJsonLd = (id, obj) => {
      removeEl(`script[data-jld="${id}"]`)
      const s = document.createElement('script')
      s.type = 'application/ld+json'; s.setAttribute('data-jld', id)
      s.textContent = JSON.stringify(obj)
      document.head.appendChild(s)
    }

    document.documentElement.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'

    setMeta('description', desc)
    if (keywords) setMeta('keywords', keywords)
    if (noindex)  setMeta('robots', 'noindex,nofollow')
    else          setMeta('robots', 'index,follow,max-snippet:-1,max-image-preview:large')

    setLink('canonical', canon)
    setLink('alternate', canon, 'hi-IN')
    setLink('alternate', canon, 'en-IN')
    setLink('alternate', canon, 'x-default')

    const locale    = lang === 'hi' ? 'hi_IN' : 'en_IN'
    const altLocale = lang === 'hi' ? 'en_IN' : 'hi_IN'
    setMeta('og:type',             type,       'property')
    setMeta('og:title',            clean,      'property')
    setMeta('og:description',      desc,       'property')
    setMeta('og:url',              canon,      'property')
    setMeta('og:image',            img,        'property')
    setMeta('og:image:width',      '1200',     'property')
    setMeta('og:image:height',     '630',      'property')
    setMeta('og:image:alt',        clean,      'property')
    setMeta('og:site_name',        SITE,       'property')
    setMeta('og:locale',           locale,     'property')
    setMeta('og:locale:alternate', altLocale,  'property')

    setMeta('twitter:card',        'summary_large_image')
    setMeta('twitter:title',       clean)
    setMeta('twitter:description', desc)
    setMeta('twitter:image',       img)
    setMeta('twitter:site',        '@almenso_com')

    if (type === 'article') {
      if (articlePublished) setMeta('article:published_time', articlePublished, 'property')
      if (articleModified)  setMeta('article:modified_time',  articleModified,  'property')
    }

    setJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE, url: SITE_URL,
      inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/tools?q={search_term_string}` },
        'query-input': 'required name=search_term_string'
      }
    })

    const path = window.location.pathname
    if (path.startsWith('/tools/')) {
      const toolName = title?.split('|')[0]?.trim() || path.split('/').pop()
      setJsonLd('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type':'ListItem', position:1, name:'Home',  item: SITE_URL },
          { '@type':'ListItem', position:2, name:'Tools', item: `${SITE_URL}/tools` },
          { '@type':'ListItem', position:3, name: toolName, item: canon },
        ]
      })
      setJsonLd('tool', {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: title?.split('|')[0]?.trim() || toolName,
        description: desc,
        url: canon,
        inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type':'Offer', price:'0', priceCurrency:'INR' },
        provider: { '@type':'Organization', name: SITE, url: SITE_URL }
      })
    }

    if (type === 'article') {
      setJsonLd('article', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: clean,
        description: desc,
        inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
        image: img, url: canon,
        datePublished: articlePublished || new Date().toISOString(),
        dateModified:  articleModified  || new Date().toISOString(),
        author:    { '@type':'Organization', name: SITE, url: SITE_URL },
        publisher: { '@type':'Organization', name: SITE, url: SITE_URL, logo: { '@type':'ImageObject', url: DEFAULT_IMG } },
        mainEntityOfPage: { '@type':'WebPage', '@id': canon }
      })
    }

    if (schema) setJsonLd('custom', schema)

    return () => {
      document.title = `${SITE} — Free Tools & Services Haldwani`
    }
  }, [title, description, keywords, image, canonical, type, schema, noindex, articlePublished, articleModified, lang])

  return null
}

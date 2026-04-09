import React, { useEffect, useState } from 'react'
import ToolWrapper from '../../components/ToolWrapper'

function fmtMs(n) {
  return n ? Math.round(n) + ' ms' : 'n/a'
}

export default function WebsitePerformanceAnalyzer() {
  const [metrics, setMetrics] = useState(null)
  const [status, setStatus] = useState('Click "Run Analysis" to see metrics for this page.')

  const run = () => {
    setStatus('Gathering performance metrics...')
    setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {}
      const paint = performance.getEntriesByType('paint')
      const lcp = performance.getEntriesByType('largest-contentful-paint')[0]
      const cls = performance.getEntriesByType('layout-shift')

      const fcp = paint.find(p => p.name === 'first-contentful-paint')
      const fid = nav?.domInteractive ? (nav.domInteractive - nav.requestStart) : null

      const clsValue = cls.reduce((sum, entry) => sum + entry.value, 0)

      setMetrics({
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.requestStart,
        load: nav.loadEventEnd - nav.requestStart,
        fcp: fcp?.startTime || null,
        lcp: lcp?.renderTime || lcp?.startTime || null,
        cls: clsValue,
        domInteractive: nav.domInteractive - nav.requestStart,
        url: window.location.href,
      })
      setStatus('Metrics gathered. Scroll down for suggestions.')
    }, 10)
  }

  const scoreLabel = (val, good, ok) => {
    if (val == null) return 'n/a'
    if (val <= good) return 'Good'
    if (val <= ok) return 'Average'
    return 'Needs Improvement'
  }

  return (
    <ToolWrapper
      title="Website Performance Analyzer — Basic Speed Audit"
      description="Current page speed metrics gather karo: TTFB, FCP, LCP, CLS, load time. Simple suggestions ke saath."
      keywords="website performance analyzer, page speed metrics, lcp cls fcp ttfb, web vitals, seo speed test"
      emoji="🚀"
      heroColor="linear-gradient(135deg, #1a1a2e 0%, #14b8a6 100%)"
      toolName="Website Performance Analyzer"
      tagline="Page load metrics aur Web Vitals inspect karo — fast site build karne ke liye guide."
      guideSteps={[
        { heading: 'Run analysis', text: 'Run Analysis button daalo aur browser apne page ki metrics dega.' },
        { heading: 'Metrics samjho', text: 'TTFB, FCP, LCP, CLS jaise metrics SEO aur user experience ke liye important hote hain.' },
        { heading: 'Suggestions dekho', text: 'Har metric ke liye simple improvements diye hue hain — apply karo aur page speed upgrade karo.' },
      ]}
      faqs={[
        { q: 'Kya yeh tool external website ko test kar sakta hai?', a: 'Nahi, browser security ke karan hum sirf current page ke metrics read kar sakte hain. Agar aap kisi aur domain ko test karna chahte ho toh WebPageTest ya PageSpeed Insights use karein.' },
        { q: 'CLS kya hota hai?', a: 'CLS (Cumulative Layout Shift) measure karta hai ki page elements kitna shift karte hain load ke dauran. Acha score < 0.1 hota hai.' },
        { q: 'LCP aur FCP mein kya farq hai?', a: 'FCP (First Contentful Paint) pehli baar koi visible content render hota hai. LCP (Largest Contentful Paint) tab hota hai jab page ka main content visible ho jata hai.' },
        { q: 'TTFB kaise improve karun?', a: 'Server response fast karo, CDN use karo, caching enable karo. TTFB 200ms se kam hona chahiye.' },
      ]}
      relatedBlog={{ slug: 'website-performance-best-practices', title: 'Website Performance Best Practices', excerpt: 'Fast website kaise banayein — mobile friendly experience aur better SEO.' }}
            affCategory="tech"
      hasResult={true}
      relatedTools={[
        { path: '/tools/image-compressor', emoji: '🖼️', name: 'Image Compressor' },
        { path: '/tools/word-counter', emoji: '📝', name: 'Word Counter' },
      ]}
    >
      <div className="tp-card">
        <div className="tp-sec-title">⚡ Run Performance Analysis</div>
        <p style={{ fontSize: '0.85rem', color: '#444' }}>This runs in your browser and measures how fast this page loads. Use it on the page you want to evaluate.</p>
        <p style={{ fontSize: '0.82rem', color: '#555', marginTop: 8 }}><strong>How to use:</strong> Open the specific page you want to test, click “Run Analysis”, then scroll down to review the metrics and improvement suggestions.</p>
        <button className="tw-calc-btn" onClick={run}>🧪 Run Analysis</button>
        <div style={{ marginTop: 10, color: '#555' }}>{status}</div>
      </div>

      {metrics && (
        <div className="tp-card">
          <div className="tp-sec-title">📊 Results</div>
          <div className="tw-breakdown">
            <div className="tw-brow"><span className="tw-brow-label">URL</span><span className="tw-brow-val" style={{ fontSize: '0.75rem' }}>{metrics.url}</span></div>
            <div className="tw-brow"><span className="tw-brow-label">TTFB</span><span className="tw-brow-val">{fmtMs(metrics.ttfb)} <em>({scoreLabel(metrics.ttfb, 200, 500)})</em></span></div>
            <div className="tw-brow"><span className="tw-brow-label">FCP</span><span className="tw-brow-val">{fmtMs(metrics.fcp)} <em>({scoreLabel(metrics.fcp, 1000, 2000)})</em></span></div>
            <div className="tw-brow"><span className="tw-brow-label">LCP</span><span className="tw-brow-val">{fmtMs(metrics.lcp)} <em>({scoreLabel(metrics.lcp, 2500, 4000)})</em></span></div>
            <div className="tw-brow"><span className="tw-brow-label">CLS</span><span className="tw-brow-val">{metrics.cls.toFixed(2)} <em>({metrics.cls < 0.1 ? 'Good' : metrics.cls < 0.25 ? 'Needs Improvement' : 'Poor'})</em></span></div>
            <div className="tw-brow"><span className="tw-brow-label">DOM Content Loaded</span><span className="tw-brow-val">{fmtMs(metrics.domContentLoaded)}</span></div>
            <div className="tw-brow total"><span className="tw-brow-label">Load Event</span><span className="tw-brow-val">{fmtMs(metrics.load)}</span></div>
          </div>
        </div>
      )}

      <div className="tp-card">
        <div className="tp-sec-title">🧠 Performance Suggestions</div>
        <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#333' }}>
          <h4>1. Reduce TTFB</h4>
          <p>Server response time zyada hone se page slow start hota hai. CDN use karo, server-side caching enable karo aur unnecessary server-side work kam karo.</p>

          <h4>2. Optimize images</h4>
          <p>Large images ko compress karo (Image Compressor tool use karo) aur modern formats (WebP) use karo. Lazy load images so that only visible images load first.</p>

          <h4>3. Minify CSS & JS</h4>
          <p>Bade JavaScript bundles aur CSS files page ko delay karte hain. Minification aur splitting se load fast hota hai. Use tree-shaking and remove unused code.</p>

          <h4>4. Preload key resources</h4>
          <p>Fonts, hero images, aur critical CSS ko <code>&lt;link rel="preload"&gt;</code> se load karo. Isse FCP aur LCP better hota hai.</p>

          <h4>5. Improve CLS</h4>
          <p>Layout shift kam karne ke liye images ko size attributes ke saath load karo, ad slots ko reserve karo, aur dynamic content ko stable container mein inject karo.</p>

          <h4>6. Use browser caching</h4>
          <p>Static assets (images, scripts, styles) ke liye caching headers set karo. Vercel jaise platforms automatically caching handle karte hain.</p>

          <h4>7. Measure periodically</h4>
          <p>Har update ke baad performance check karo. Google PageSpeed Insights use karke additional insights mil sakte hain.</p>

          <h4>8. Know your Core Web Vitals</h4>
          <p>Google Core Web Vitals ek set metrics hoti hai: LCP, FID, CLS. Inko improve karne se aapki site SEO aur user satisfaction dono better hoti hai. Acha target: LCP &lt;= 2.5s, FID &lt; 100ms, CLS &lt; 0.1.</p>

          <h4>9. Use Lighthouse and WebPageTest</h4>
          <p>Ye tools in-depth report dete hain jinme suggestions, audits aur waterfall charts hote hain. Lighthouse ko Chrome DevTools se run karo. WebPageTest se alag locations aur network speed pe test karo.</p>

          <h4>10. Optimize third-party scripts</h4>
          <p>Ads, analytics, chat widgets, aur social embeds slow karte hain. Jo scripts aap use nahi kar rahe, unko remove karo. Lazy load third-party scripts aur `defer`/`async` attributes ka use karo.</p>

          <h4>11. Mobile priority</h4>
          <p>Google mobile-first indexing use karta hai. Mobile pe speed achhi honi chahiye. Large images, heavy fonts, aur complex layouts mobile pe slow ho sakte hain. Always test mobile view.</p>

          <h4>12. Final checklist</h4>
          <ul>
            <li>Compress images (use tools like Image Compressor)</li>
            <li>Use a fast hosting / CDN</li>
            <li>Minify CSS/JS and remove unused code</li>
            <li>Enable caching and preconnect to key domains</li>
            <li>Use responsive images (srcset) and lazy loading</li>
          </ul>

          <p>
            Agar aap in steps ko follow karte ho, toh aapki site jaldi load hogi, visitors khush rahenge, aur Google se bhi aapko SEO benefit milega. Yeh tool aapko quick snapshot deta hai — use it often.
          </p>
        </div>
      </div>
    </ToolWrapper>
  )
}

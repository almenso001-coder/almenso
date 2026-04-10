/**
 * ALMENSO TOOLS PAGE — v4 Final
 * ✅ 144+ tools, 13 categories
 * ✅ Category-wise grouped display
 * ✅ Search + filter
 * ✅ Passive income affiliate section
 * ✅ AdSense slots
 * ✅ SEO optimized
 */
import React, { useState, useMemo, memo, useCallback } from 'react'
import { useSettings } from '../context/SettingsContext'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import AdSlot  from '../components/AdSlot'
import { RelatedProducts } from './ProductsPage'
import './ToolsPage.css'

/* ═══════════════════════════════════════════════════════════
   TOOL DATABASE — 144+ tools, 13 categories
═══════════════════════════════════════════════════════════ */
const TOOLS = [
  /* ── 💰 Finance & Business ─────────────────────────────── */
  { g:'💰 Finance',      ico:'🧾', name:'GST Calculator',              path:'/tools/gst-calculator',                 hot:true,  desc:'Inclusive & exclusive · CGST/SGST/IGST breakup',   color:'#2563eb' },
  { g:'💰 Finance',      ico:'🏦', name:'EMI Calculator',               path:'/tools/emi-calculator',                 hot:true,  desc:'Home · Car · Education loan breakdown + chart',     color:'#7c3aed' },
  { g:'💰 Finance',      ico:'💵', name:'Discount Calculator',          path:'/tools/discount-calculator',            hot:true,  desc:'Sale price · Savings amount instantly',             color:'#059669' },
  { g:'💰 Finance',      ico:'💰', name:'Loan Calculator',              path:'/tools/loan-calculator',                hot:true,  desc:'Total interest · Monthly EMI · Amortization',      color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Profit Margin Calculator',     path:'/tools/profit-margin-calculator',       hot:false, desc:'Cost · Selling price · Markup %',                   color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Profit Calculator',            path:'/tools/profit-calculator',              hot:false, desc:'Multi-product · GST · Break-even analysis',         color:'#2563eb' },
  { g:'💰 Finance',      ico:'📈', name:'ROI Calculator',               path:'/tools/roi-calculator',                 hot:false, desc:'Return on Investment · Percentage',                 color:'#2563eb' },
  { g:'💰 Finance',      ico:'📉', name:'Percentage Calculator',        path:'/tools/percentage-calculator',          hot:false, desc:'Discount · Marks · GST · Price change %',           color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Savings Calculator',           path:'/tools/savings-calculator',             hot:false, desc:'Monthly savings · Target amount · Goal planner',    color:'#2563eb' },
  { g:'💰 Finance',      ico:'💼', name:'Salary Calculator',            path:'/tools/salary-calculator',              hot:false, desc:'Gross · Net · TDS · HRA breakdown',                 color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Simple Interest Calculator',   path:'/tools/simple-interest-calculator',     hot:false, desc:'Principal · Rate · Time calculation',               color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Compound Interest Calc',       path:'/tools/compound-interest-calculator',   hot:false, desc:'Monthly/yearly compounding · FD returns',           color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Loan Interest Calculator',     path:'/tools/loan-interest-calculator',       hot:false, desc:'Simple & compound interest · FD calculator',        color:'#2563eb' },
  { g:'💰 Finance',      ico:'💳', name:'Credit Card Interest Calc',    path:'/tools/credit-card-interest-calculator',hot:false, desc:'Outstanding balance · APR · Min payment',          color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Interest Calculator',          path:'/tools/interest-calculator',            hot:false, desc:'All types of interest calculation',                 color:'#2563eb' },
  { g:'💰 Finance',      ico:'📈', name:'Investment Return Calculator', path:'/tools/investment-return-calculator',   hot:false, desc:'ROI · CAGR · Total return estimate',                color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Commission Calculator',        path:'/tools/commission-calculator',          hot:false, desc:'Sales commission · Rate calculation',               color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Markup Calculator',            path:'/tools/markup-calculator',              hot:false, desc:'Cost to price · Markup percentage',                 color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Margin Calculator',            path:'/tools/margin-calculator',              hot:false, desc:'Gross margin · Net margin calculation',             color:'#2563eb' },
  { g:'💰 Finance',      ico:'🔨', name:'Break Even Calculator',        path:'/tools/break-even-calculator',          hot:false, desc:'Fixed costs · Variable costs · BEP',                color:'#2563eb' },
  { g:'💰 Finance',      ico:'💡', name:'Unit Price Calculator',        path:'/tools/unit-price-calculator',          hot:false, desc:'Best deal comparison · Per unit cost',              color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Tip Calculator',               path:'/tools/tip-calculator',                 hot:false, desc:'Restaurant bill · Split tip among friends',         color:'#2563eb' },
  { g:'💰 Finance',      ico:'📈', name:'Percentage Increase Calc',     path:'/tools/percentage-increase-calculator', hot:false, desc:'% increase between two values',                    color:'#2563eb' },
  { g:'💰 Finance',      ico:'📉', name:'Percentage Decrease Calc',     path:'/tools/percentage-decrease-calculator', hot:false, desc:'% decrease between two values',                    color:'#2563eb' },
  { g:'💰 Finance',      ico:'🔄', name:'Percentage Change Calc',       path:'/tools/percentage-change-calculator',   hot:false, desc:'% change between old and new value',               color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Percentage Difference Calc',   path:'/tools/percentage-difference-calculator',hot:false,desc:'Difference between two percentages',               color:'#2563eb' },
  { g:'💰 Finance',      ico:'🏠', name:'Mortgage Calculator',          path:'/tools/mortgage-calculator',            hot:false, desc:'Home loan EMI · Amortization schedule',             color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Retirement Calculator',        path:'/tools/retirement-calculator',          hot:false, desc:'Retirement corpus · Monthly pension estimate',      color:'#2563eb' },
  { g:'💰 Finance',      ico:'💎', name:'Net Worth Calculator',         path:'/tools/net-worth-calculator',           hot:false, desc:'Assets · Liabilities · Total net worth',            color:'#2563eb' },
  { g:'💰 Finance',      ico:'📦', name:'Cost Per Unit Calculator',     path:'/tools/cost-per-unit-calculator',       hot:false, desc:'Manufacturing cost · Per unit pricing',             color:'#2563eb' },
  { g:'💰 Finance',      ico:'📊', name:'Tax Percentage Calculator',    path:'/tools/tax-percentage-calculator',      hot:false, desc:'Tax amount · Effective tax rate',                   color:'#2563eb' },
  { g:'💰 Finance',      ico:'📈', name:'Inflation Calculator',         path:'/tools/inflation-calculator',           hot:false, desc:'Purchasing power · Real value of money',            color:'#2563eb' },
  { g:'💰 Finance',      ico:'💰', name:'Savings Goal Calculator',      path:'/tools/savings-goal-calculator',        hot:false, desc:'Monthly savings needed · Goal tracker',             color:'#2563eb' },
  { g:'💰 Finance',      ico:'🔑', name:'Payback Period Calculator',    path:'/tools/payback-period-calculator',      hot:false, desc:'Investment recovery · Break-even period',           color:'#2563eb' },

  /* ── ⚡ Electricity & Solar ─────────────────────────────── */
  { g:'⚡ Electricity',  ico:'⚡', name:'Bijli Bill Calculator',        path:'/tools/bijli',                          hot:true,  desc:'7 states · 2026 latest UPCL rates · Full breakup',  color:'#d97706' },
  { g:'⚡ Electricity',  ico:'📊', name:'Electricity Bill Analyzer',   path:'/tools/electricity-bill-analyzer',      hot:true,  desc:'Meter reading · Slab breakup · Saving tips',        color:'#d97706' },
  { g:'⚡ Electricity',  ico:'☀️', name:'Solar ROI Calculator',        path:'/tools/solar-roi',                      hot:true,  desc:'Payback period · Annual savings · NPV',             color:'#059669' },
  { g:'⚡ Electricity',  ico:'🔋', name:'Inverter Load Planner',       path:'/tools/inverter-load-planner',          hot:true,  desc:'VA sizing · Battery Ah · UPS planning',             color:'#d97706' },
  { g:'⚡ Electricity',  ico:'💡', name:'Electricity Cost Calculator', path:'/tools/electricity-cost-calculator',    hot:false, desc:'Daily/monthly/yearly appliance cost',               color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🏠', name:'Power Consumption Planner',   path:'/tools/power-consumption-planner',      hot:false, desc:'Appliances · Monthly units · Bill estimate',        color:'#d97706' },
  { g:'⚡ Electricity',  ico:'⚡', name:'Power Consumption Calc',      path:'/tools/power-consumption-calculator',   hot:false, desc:'Watts to kWh · Electricity cost per month',        color:'#d97706' },
  { g:'⚡ Electricity',  ico:'☀️', name:'Solar Panel Calculator',      path:'/tools/solar-panel-calculator',         hot:false, desc:'Panel size · Battery capacity · Load matching',     color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🔋', name:'Battery Backup Calculator',   path:'/tools/battery-backup-calculator',      hot:false, desc:'Backup hours · Ah capacity needed · VA rating',    color:'#d97706' },
  { g:'⚡ Electricity',  ico:'⚡', name:'Voltage Drop Calculator',     path:'/tools/voltage-drop-calculator',        hot:false, desc:'Wire gauge · Resistance · Voltage drop %',         color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🔌', name:'Wire Size Calculator',        path:'/tools/wire-size-calculator',           hot:false, desc:'Cable size · Current load · Distance',              color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🏠', name:'Appliance Power Calculator',  path:'/tools/appliance-power-calculator',     hot:false, desc:'Home appliances power & electricity bill',          color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🔌', name:'Electrical Load Calculator',  path:'/tools/electrical-load-calculator',     hot:false, desc:'Total electrical load · Circuit planning',          color:'#d97706' },
  { g:'⚡ Electricity',  ico:'⚡', name:'Energy Consumption Calc',     path:'/tools/energy-consumption-calculator',  hot:false, desc:'kWh consumption · Monthly cost estimate',          color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🔦', name:'LED Resistor Calculator',     path:'/tools/led-resistor-calculator',        hot:false, desc:'LED circuit resistance · Voltage/current',         color:'#d97706' },
  { g:'⚡ Electricity',  ico:'🔌', name:'Ohms Law Calculator',         path:'/tools/ohms-law-calculator',            hot:false, desc:'Voltage · Current · Resistance · Power',           color:'#d97706' },
  { g:'⚡ Electricity',  ico:'⚡', name:'Power Factor Calculator',     path:'/tools/power-factor-calculator',        hot:false, desc:'Power factor · Real vs apparent power',            color:'#d97706' },
  { g:'⚡ Electricity',  ico:'💡', name:'Electricity Bill Calculator', path:'/tools/electricity-bill-calculator',    hot:false, desc:'Units consumed · Bill amount · Slab rates',        color:'#d97706' },

  /* ── 🖼️ Image Tools ─────────────────────────────────────── */
  { g:'🖼️ Image',        ico:'🗜️', name:'Image Compressor',            path:'/tools/image-compressor',               hot:true,  desc:'File size kam karo · Quality control · Bulk',      color:'#0891b2' },
  { g:'🖼️ Image',        ico:'📐', name:'Image Resizer',               path:'/tools/image-resizer',                  hot:true,  desc:'Social media · Web presets · Custom size',         color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔄', name:'Image Format Converter',      path:'/tools/image-format-converter',         hot:true,  desc:'JPG/PNG/WebP conversion · Quality control',        color:'#0891b2' },
  { g:'🖼️ Image',        ico:'✂️', name:'Background Remover',          path:'/tools/background-remover',             hot:true,  desc:'White/solid bg remove · Transparent PNG output',   color:'#0891b2' },
  { g:'🖼️ Image',        ico:'✂️', name:'Image Cropper',               path:'/tools/image-cropper',                  hot:false, desc:'Pixel-precise crop · Custom dimensions',           color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔃', name:'Image Rotator',               path:'/tools/image-rotator',                  hot:false, desc:'Rotate 90°/180°/270° · Any direction',             color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔁', name:'Image Flipper',               path:'/tools/image-flipper',                  hot:false, desc:'Horizontal & vertical flip · Mirror image',        color:'#0891b2' },
  { g:'🖼️ Image',        ico:'💧', name:'Image Watermark',             path:'/tools/image-watermark',                hot:false, desc:'Text watermark · Position · Opacity control',      color:'#0891b2' },
  { g:'🖼️ Image',        ico:'⬛', name:'Grayscale Converter',         path:'/tools/image-grayscale',                hot:false, desc:'Color to black & white · Instant preview',         color:'#0891b2' },
  { g:'🖼️ Image',        ico:'💧', name:'Image Blur Tool',             path:'/tools/image-blur',                     hot:false, desc:'Gaussian blur · Intensity slider control',         color:'#0891b2' },
  { g:'🖼️ Image',        ico:'☀️', name:'Brightness Adjuster',         path:'/tools/image-brightness',               hot:false, desc:'Brighten or darken photos · Slider control',       color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🌗', name:'Contrast Adjuster',           path:'/tools/image-contrast',                 hot:false, desc:'Increase/decrease image contrast',                 color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🎨', name:'Saturation Tool',             path:'/tools/image-saturation',               hot:false, desc:'Boost or reduce color saturation (HSL)',           color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔍', name:'Image Sharpen Tool',          path:'/tools/image-sharpen',                  hot:false, desc:'Sharpen blurry photos · Unsharp mask',             color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🖼️', name:'Image Border Tool',           path:'/tools/image-border',                   hot:false, desc:'Add colored border/frame · Size control',          color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🖼️', name:'Image Collage Maker',         path:'/tools/image-collage',                  hot:false, desc:'Combine 2–4 photos in grid layouts',               color:'#0891b2' },
  { g:'🖼️ Image',        ico:'📸', name:'Screenshot to Image',         path:'/tools/screenshot-to-image',            hot:false, desc:'Upload or paste screenshot · Convert format',      color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔐', name:'Base64 Image Encoder',        path:'/tools/base64-image-encoder',           hot:false, desc:'Image to Base64 data URL · Copy & use',            color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔓', name:'Base64 Image Decoder',        path:'/tools/base64-image-decoder',           hot:false, desc:'Base64 string back to image · Download',           color:'#0891b2' },
  { g:'🖼️ Image',        ico:'ℹ️', name:'Image Metadata Viewer',       path:'/tools/image-metadata-viewer',          hot:false, desc:'EXIF data · Dimensions · File info',                color:'#0891b2' },
  { g:'🖼️ Image',        ico:'🔄', name:'Image Converter',             path:'/tools/image-converter',                hot:false, desc:'Convert between JPG PNG WebP formats',             color:'#0891b2' },

  /* ── 📝 Text Tools ──────────────────────────────────────── */
  { g:'📝 Text',          ico:'📝', name:'Word Counter',                path:'/tools/word-counter',                   hot:true,  desc:'Words · Characters · Sentences · Reading time',    color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔢', name:'Character Counter',           path:'/tools/character-counter',              hot:false, desc:'Total chars · With/without spaces',                color:'#7c3aed' },
  { g:'📝 Text',          ico:'📋', name:'Sentence Counter',            path:'/tools/sentence-counter',               hot:false, desc:'Count sentences · Reading level check',            color:'#7c3aed' },
  { g:'📝 Text',          ico:'¶', name:'Paragraph Counter',           path:'/tools/paragraph-counter',              hot:false, desc:'Count paragraphs in text',                         color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔡', name:'Text Case Converter',         path:'/tools/text-case-converter',            hot:false, desc:'Upper/lower/title/sentence/camel case',            color:'#7c3aed' },
  { g:'📝 Text',          ico:'⬆️', name:'Uppercase Converter',         path:'/tools/uppercase-converter',            hot:false, desc:'Convert all text to UPPERCASE',                    color:'#7c3aed' },
  { g:'📝 Text',          ico:'⬇️', name:'Lowercase Converter',         path:'/tools/lowercase-converter',            hot:false, desc:'Convert all text to lowercase',                    color:'#7c3aed' },
  { g:'📝 Text',          ico:'Aa', name:'Title Case Converter',        path:'/tools/title-case-converter',           hot:false, desc:'Capitalize First Letter of Each Word',             color:'#7c3aed' },
  { g:'📝 Text',          ico:'✏️', name:'Capitalize Text',             path:'/tools/capitalize-text',                hot:false, desc:'Capitalize first letter of each sentence',         color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔄', name:'Text Reverser',               path:'/tools/text-reverser',                  hot:false, desc:'Reverse text/words/characters/lines',              color:'#7c3aed' },
  { g:'📝 Text',          ico:'🧹', name:'Remove Duplicate Lines',      path:'/tools/remove-duplicate-lines',         hot:false, desc:'Clean text lists · Remove repeated lines',         color:'#7c3aed' },
  { g:'📝 Text',          ico:'✂️', name:'Remove Extra Spaces',         path:'/tools/remove-extra-spaces',            hot:false, desc:'Clean extra spaces · Trim whitespace',             color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔀', name:'Text Sorter',                 path:'/tools/text-sorter',                    hot:false, desc:'Sort lines A-Z or Z-A alphabetically',             color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔍', name:'Text Diff Checker',           path:'/tools/text-diff-checker',              hot:false, desc:'Compare two texts · Highlight differences',        color:'#7c3aed' },
  { g:'📝 Text',          ico:'📄', name:'Text to HTML Converter',      path:'/tools/text-to-html-converter',         hot:false, desc:'Plain text to HTML tags converter',                color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔤', name:'HTML to Text Converter',      path:'/tools/html-to-text-converter',         hot:false, desc:'Strip HTML tags · Get clean text',                 color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔢', name:'Line Counter',                path:'/tools/line-counter',                   hot:false, desc:'Count lines in text · Numbered output',            color:'#7c3aed' },
  { g:'📝 Text',          ico:'📝', name:'Lorem Ipsum Generator',       path:'/tools/lorem-ipsum-generator',          hot:false, desc:'Placeholder text · Custom length/format',          color:'#7c3aed' },
  { g:'📝 Text',          ico:'🔗', name:'Text to Slug Converter',      path:'/tools/text-to-slug-converter',         hot:false, desc:'SEO-friendly URL slug generator',                  color:'#7c3aed' },
  { g:'📝 Text',          ico:'🎲', name:'Random Text Generator',       path:'/tools/random-text-generator',          hot:false, desc:'Random sentences/words/paragraphs',                color:'#7c3aed' },

  /* ── 📱 Content & Social Media ──────────────────────────── */
  { g:'📱 Content',       ico:'#️⃣', name:'Hashtag Generator',           path:'/tools/hashtag-generator',              hot:true,  desc:'Instagram/Twitter hashtags · Niche-based',        color:'#e11d48' },
  { g:'📱 Content',       ico:'📸', name:'Instagram Caption Gen',        path:'/tools/instagram-caption-generator',    hot:true,  desc:'Engaging captions · Emojis · CTAs',                color:'#e11d48' },
  { g:'📱 Content',       ico:'📲', name:'Instagram Bio Generator',      path:'/tools/instagram-bio-generator',        hot:false, desc:'Professional bio · Niche-based templates',         color:'#e11d48' },
  { g:'📱 Content',       ico:'▶️', name:'YouTube Title Generator',      path:'/tools/youtube-title-generator',        hot:false, desc:'Click-worthy titles · SEO optimized',             color:'#e11d48' },
  { g:'📱 Content',       ico:'📋', name:'YouTube Description Gen',      path:'/tools/youtube-description-generator',  hot:false, desc:'SEO description · Tags · Chapters',                color:'#e11d48' },
  { g:'📱 Content',       ico:'🖼️', name:'YouTube Thumbnail Extractor', path:'/tools/youtube-thumbnail-extractor',    hot:false, desc:'Extract thumbnails from any YouTube video',        color:'#e11d48' },
  { g:'📱 Content',       ico:'🤖', name:'AI Prompt Generator',          path:'/tools/ai-prompt-generator',            hot:false, desc:'ChatGPT/Claude prompt ideas · Category-wise',      color:'#e11d48' },
  { g:'📱 Content',       ico:'💡', name:'Content Idea Generator',       path:'/tools/content-idea-generator',         hot:false, desc:'Blog/video ideas · Niche-based topics',            color:'#e11d48' },

  /* ── 🔧 Generators & Utilities ──────────────────────────── */
  { g:'🔧 Generators',    ico:'🔐', name:'Password Generator',           path:'/tools/password-generator',             hot:true,  desc:'Strong secure passwords · Custom rules',           color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🔑', name:'Username Generator',           path:'/tools/username-generator',             hot:false, desc:'Unique usernames · Platform-based',                color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🏪', name:'Business Name Generator',      path:'/tools/business-name-generator',        hot:false, desc:'Creative business names · Industry-based',         color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🌐', name:'Domain Name Generator',        path:'/tools/domain-name-generator',          hot:false, desc:'Available domain ideas · .com/.in options',        color:'#0f172a' },
  { g:'🔧 Generators',    ico:'👤', name:'Random Name Generator',        path:'/tools/random-name-generator',          hot:false, desc:'Indian & global names · Male/female',              color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🔐', name:'Random Password Generator',    path:'/tools/random-password-generator',      hot:false, desc:'Cryptographically random passwords',               color:'#0f172a' },
  { g:'🔧 Generators',    ico:'📮', name:'Fake Address Generator',       path:'/tools/fake-address-generator',         hot:false, desc:'Test/demo addresses · India-based',                color:'#0f172a' },
  { g:'🔧 Generators',    ico:'📧', name:'Fake Email Generator',         path:'/tools/fake-email-generator',           hot:false, desc:'Temporary email addresses for testing',            color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🎨', name:'Color Palette Generator',      path:'/tools/color-palette-generator',        hot:false, desc:'Harmonious color schemes · HEX/RGB',               color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🌈', name:'Gradient Generator',           path:'/tools/gradient-generator',             hot:false, desc:'CSS gradient code · Color picker',                 color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🔗', name:'Slug Generator',               path:'/tools/slug-generator',                 hot:false, desc:'SEO-friendly URL slugs · Auto-clean',              color:'#0f172a' },
  { g:'🔧 Generators',    ico:'📱', name:'QR Code Generator',            path:'/tools/qr-code-generator',              hot:true,  desc:'URL · WiFi · UPI · Contact QR codes',              color:'#0f172a' },
  { g:'🔧 Generators',    ico:'🌐', name:'Website Performance Analyzer', path:'/tools/website-performance-analyzer',   hot:false, desc:'Speed · SEO · Mobile · Core Web Vitals',           color:'#0f172a' },

  /* ── 🧮 Math & Science ──────────────────────────────────── */
  { g:'🧮 Math',          ico:'📊', name:'Average Calculator',           path:'/tools/average-calculator',             hot:false, desc:'Mean of numbers · Sum/count/avg',                  color:'#4f46e5' },
  { g:'🧮 Math',          ico:'📊', name:'Ratio Calculator',             path:'/tools/ratio-calculator',               hot:false, desc:'Simplify ratio · Equivalent ratios',               color:'#4f46e5' },
  { g:'🧮 Math',          ico:'½',  name:'Fraction Calculator',          path:'/tools/fraction-calculator',            hot:false, desc:'Add/subtract/multiply/divide fractions',           color:'#4f46e5' },
  { g:'🧮 Math',          ico:'√',  name:'Square Root Calculator',       path:'/tools/square-root-calculator',         hot:false, desc:'Square root · Cube root · Nth root',               color:'#4f46e5' },
  { g:'🧮 Math',          ico:'³',  name:'Cube Calculator',              path:'/tools/cube-calculator',                hot:false, desc:'Cube value · Volume · Power of 3',                 color:'#4f46e5' },
  { g:'🧮 Math',          ico:'log', name:'Log Calculator',              path:'/tools/log-calculator',                 hot:false, desc:'Log base 10 · Natural log · Log2',                 color:'#4f46e5' },
  { g:'🧮 Math',          ico:'xⁿ', name:'Exponent Calculator',          path:'/tools/exponent-calculator',            hot:false, desc:'Base to the power of n',                           color:'#4f46e5' },
  { g:'🧮 Math',          ico:'!',  name:'Factorial Calculator',         path:'/tools/factorial-calculator',           hot:false, desc:'n! factorial · Large number support',              color:'#4f46e5' },
  { g:'🧮 Math',          ico:'🔢', name:'GCD Calculator',               path:'/tools/gcd-calculator',                 hot:false, desc:'Greatest Common Divisor · HCF',                    color:'#4f46e5' },
  { g:'🧮 Math',          ico:'🔢', name:'LCM Calculator',               path:'/tools/lcm-calculator',                 hot:false, desc:'Least Common Multiple · Multi-number',             color:'#4f46e5' },
  { g:'🧮 Math',          ico:'μ',  name:'Mean Calculator',              path:'/tools/mean-calculator',                hot:false, desc:'Arithmetic mean · Dataset average',                color:'#4f46e5' },
  { g:'🧮 Math',          ico:'M',  name:'Median Calculator',            path:'/tools/median-calculator',              hot:false, desc:'Middle value · Sorted data median',                color:'#4f46e5' },
  { g:'🧮 Math',          ico:'Mo', name:'Mode Calculator',              path:'/tools/mode-calculator',                hot:false, desc:'Most frequent value in dataset',                   color:'#4f46e5' },
  { g:'🧮 Math',          ico:'σ',  name:'Standard Deviation Calc',      path:'/tools/standard-deviation-calculator',  hot:false, desc:'Population & sample std deviation',                color:'#4f46e5' },
  { g:'🧮 Math',          ico:'🔢', name:'Random Number Generator',      path:'/tools/random-number-generator',        hot:false, desc:'Min-max range · Multiple numbers',                 color:'#4f46e5' },
  { g:'🧮 Math',          ico:'ⁿCr', name:'Permutation & Combination',   path:'/tools/permutation-combination-calculator', hot:false, desc:'nPr · nCr · Arrangements · Selections',      color:'#4f46e5' },
  { g:'🧮 Math',          ico:'🔢', name:'Binary Converter',             path:'/tools/binary-converter',               hot:false, desc:'Binary ↔ Decimal ↔ Hex ↔ Octal',                   color:'#4f46e5' },
  { g:'🧮 Math',          ico:'🔬', name:'Scientific Calculator',        path:'/tools/scientific-calculator',          hot:false, desc:'Advanced math · Trigonometry · Logs',              color:'#4f46e5' },

  /* ── 🏥 Health & Fitness ────────────────────────────────── */
  { g:'🏥 Health',        ico:'⚖️', name:'BMI Calculator',              path:'/tools/bmi-calculator',                 hot:true,  desc:'Body Mass Index · Healthy weight range',           color:'#16a34a' },
  { g:'🏥 Health',        ico:'🔥', name:'BMR Calculator',              path:'/tools/bmr-calculator',                 hot:false, desc:'Basal Metabolic Rate · Daily calories needed',     color:'#16a34a' },
  { g:'🏥 Health',        ico:'🥗', name:'Calorie Calculator',          path:'/tools/calorie-calculator',             hot:false, desc:'Daily calorie needs · Weight goal planning',       color:'#16a34a' },
  { g:'🏥 Health',        ico:'💪', name:'Body Fat Calculator',         path:'/tools/body-fat-calculator',            hot:false, desc:'Body fat % · Navy method · BMI method',            color:'#16a34a' },
  { g:'🏥 Health',        ico:'💧', name:'Water Intake Calculator',     path:'/tools/water-intake-calculator',        hot:false, desc:'Daily water requirement · Weight-based',           color:'#16a34a' },
  { g:'🏥 Health',        ico:'❤️', name:'Heart Rate Calculator',       path:'/tools/heart-rate-calculator',          hot:false, desc:'Target HR zones · Max heart rate by age',         color:'#16a34a' },
  { g:'🏥 Health',        ico:'⚖️', name:'Ideal Weight Calculator',     path:'/tools/ideal-weight-calculator',        hot:false, desc:'Ideal body weight · Height-based formulas',       color:'#16a34a' },
  { g:'🏥 Health',        ico:'⚖️', name:'Ideal Body Weight Calc',      path:'/tools/ideal-body-weight-calculator',   hot:false, desc:'IBW using Devine, Robinson, Miller formulas',     color:'#16a34a' },

  /* ── 🏗️ Construction & Home ─────────────────────────────── */
  { g:'🏗️ Construction',  ico:'🧱', name:'Brick Calculator',            path:'/tools/brick-calculator',               hot:false, desc:'Bricks needed · Mortar · Wall dimensions',         color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🏗️', name:'Concrete Calculator',        path:'/tools/concrete-calculator',            hot:false, desc:'Cement · Sand · Aggregate · Volume',               color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🎨', name:'Paint Calculator',            path:'/tools/paint-calculator',               hot:false, desc:'Litres needed · Room coverage area',               color:'#b45309' },
  { g:'🏗️ Construction',  ico:'⬜', name:'Tile Calculator',             path:'/tools/tile-calculator',                hot:false, desc:'Tiles needed · Grout · Room area',                 color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🏠', name:'Flooring Calculator',         path:'/tools/flooring-calculator',            hot:false, desc:'Flooring area · Material quantity',                color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🏠', name:'Roofing Calculator',          path:'/tools/roofing-calculator',             hot:false, desc:'Roof area · Material estimate',                    color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🏗️', name:'Stair Calculator',           path:'/tools/stair-calculator',               hot:false, desc:'Rise · Run · Total stairs calculation',            color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🛣️', name:'Asphalt Calculator',          path:'/tools/asphalt-calculator',             hot:false, desc:'Tons needed · Road/driveway paving',               color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🪨', name:'Gravel Calculator',           path:'/tools/gravel-calculator',              hot:false, desc:'Cubic yards/tons · Coverage area',                 color:'#b45309' },
  { g:'🏗️ Construction',  ico:'🏖️', name:'Sand Calculator',             path:'/tools/sand-calculator',                hot:false, desc:'Sand quantity · Area coverage estimate',           color:'#b45309' },

  /* ── 📐 Unit Converters ─────────────────────────────────── */
  { g:'📐 Converters',    ico:'📏', name:'Length Converter',             path:'/tools/length-converter',               hot:false, desc:'mm/cm/m/km/inch/feet/mile/yard',                   color:'#0369a1' },
  { g:'📐 Converters',    ico:'⚖️', name:'Weight Converter',             path:'/tools/weight-converter',               hot:false, desc:'kg/g/lb/oz/ton — all weight units',                color:'#0369a1' },
  { g:'📐 Converters',    ico:'🌡️', name:'Temperature Converter',       path:'/tools/temperature-converter',          hot:false, desc:'Celsius ↔ Fahrenheit ↔ Kelvin',                    color:'#0369a1' },
  { g:'📐 Converters',    ico:'📐', name:'Area Converter',               path:'/tools/area-converter',                 hot:false, desc:'m² · ft² · acre · hectare · bigha',                color:'#0369a1' },
  { g:'📐 Converters',    ico:'🧊', name:'Volume Converter',             path:'/tools/volume-converter',               hot:false, desc:'L/mL/gallon/cubic meter/cubic feet',               color:'#0369a1' },
  { g:'📐 Converters',    ico:'🚀', name:'Speed Converter',              path:'/tools/speed-converter',                hot:false, desc:'km/h · mph · m/s · knots',                         color:'#0369a1' },
  { g:'📐 Converters',    ico:'⏱️', name:'Time Converter',               path:'/tools/time-converter',                 hot:false, desc:'sec · min · hours · days · weeks · years',         color:'#0369a1' },
  { g:'📐 Converters',    ico:'💾', name:'Data Storage Converter',       path:'/tools/data-storage-converter',         hot:false, desc:'Bytes · KB · MB · GB · TB · PB',                   color:'#0369a1' },
  { g:'📐 Converters',    ico:'🔵', name:'Pressure Converter',           path:'/tools/pressure-converter',             hot:false, desc:'Pa · bar · psi · atm · mmHg',                      color:'#0369a1' },
  { g:'📐 Converters',    ico:'⚡', name:'Energy Converter',             path:'/tools/energy-converter',               hot:false, desc:'Joule · calorie · kWh · BTU',                      color:'#0369a1' },
  { g:'📐 Converters',    ico:'⚡', name:'Power Converter',              path:'/tools/power-converter',                hot:false, desc:'Watts · kW · horsepower · BTU/hr',                 color:'#0369a1' },
  { g:'📐 Converters',    ico:'🔵', name:'Angle Converter',              path:'/tools/angle-converter',                hot:false, desc:'Degrees · Radians · Gradians',                     color:'#0369a1' },
  { g:'📐 Converters',    ico:'⛽', name:'Fuel Efficiency Converter',    path:'/tools/fuel-efficiency-converter',      hot:false, desc:'L/100km · km/L · MPG conversion',                  color:'#0369a1' },
  { g:'📐 Converters',    ico:'⚗️', name:'Density Converter',           path:'/tools/density-converter',              hot:false, desc:'kg/m³ · g/cm³ · lb/ft³ conversion',                color:'#0369a1' },
  { g:'📐 Converters',    ico:'💱', name:'Currency Converter',           path:'/tools/currency-converter',             hot:true,  desc:'INR · USD · EUR · GBP · live rates',               color:'#0369a1' },
  { g:'📐 Converters',    ico:'🔄', name:'Unit Converter (All)',         path:'/tools/unit-converter',                 hot:true,  desc:'All-in-one unit conversion tool',                  color:'#0369a1' },

  /* ── ⏱️ Date & Time ─────────────────────────────────────── */
  { g:'⏱️ Date & Time',   ico:'🎂', name:'Age Calculator',              path:'/tools/age-calculator',                 hot:true,  desc:'Exact age · Days lived · Next birthday',           color:'#be185d' },
  { g:'⏱️ Date & Time',   ico:'👥', name:'Age Difference Calculator',   path:'/tools/age-difference-calculator',      hot:false, desc:'Difference between two birth dates',               color:'#be185d' },
  { g:'⏱️ Date & Time',   ico:'📅', name:'Date Duration Calculator',    path:'/tools/date-duration-calculator',       hot:false, desc:'Days between dates · Weeks/months/years',          color:'#be185d' },
  { g:'⏱️ Date & Time',   ico:'⏱️', name:'Time Duration Calculator',    path:'/tools/time-duration-calculator',       hot:false, desc:'Time difference · Hours/minutes/seconds',          color:'#be185d' },
  { g:'⏱️ Date & Time',   ico:'⏰', name:'Work Hours Calculator',       path:'/tools/work-hours-calculator',          hot:false, desc:'Daily work hours · Overtime · Total time',         color:'#be185d' },

  /* ── 🚗 Travel & Distance ───────────────────────────────── */
  { g:'🚗 Travel',        ico:'🚗', name:'Fuel Cost Calculator',        path:'/tools/fuel-cost-calculator',           hot:false, desc:'Trip fuel cost · Distance/mileage',                color:'#7e22ce' },
  { g:'🚗 Travel',        ico:'⚡', name:'Speed Calculator',            path:'/tools/speed-calculator',               hot:false, desc:'Speed · Time · Distance triangle',                 color:'#7e22ce' },
  { g:'🚗 Travel',        ico:'📍', name:'Distance Calculator',         path:'/tools/distance-calculator',            hot:false, desc:'Distance between points · km/miles',               color:'#7e22ce' },
]

/* ═══════════════════════════════════════════════════════════
   DERIVED DATA
═══════════════════════════════════════════════════════════ */
const GROUPS     = [...new Set(TOOLS.map(t => t.g))]
const HOT        = TOOLS.filter(t => t.hot)
const CAT_COLORS = {
  '💰 Finance':       '#2563eb',
  '⚡ Electricity':   '#d97706',
  '🖼️ Image':        '#0891b2',
  '📝 Text':         '#7c3aed',
  '📱 Content':      '#e11d48',
  '🔧 Generators':   '#0f172a',
  '🧮 Math':         '#4f46e5',
  '🏥 Health':       '#16a34a',
  '🏗️ Construction': '#b45309',
  '📐 Converters':   '#0369a1',
  '⏱️ Date & Time':  '#be185d',
  '🚗 Travel':       '#7e22ce',
}

/* ═══════════════════════════════════════════════════════════
   PASSIVE INCOME BANNER — Admin se controlled, settings se aata hai
═══════════════════════════════════════════════════════════ */
const DEFAULT_PASSIVE_LINKS = [
  { id:'pl1', ico:'🏦', title:'Loan Apply Karo',   sub:'BankBazaar · Best rate · 2 min', color:'#2563eb', bg:'#eff6ff', url:'https://www.bankbazaar.com/personal-loan.html', active:true },
  { id:'pl2', ico:'📈', title:'Demat Account',     sub:'AngelOne · Zero brokerage',       color:'#16a34a', bg:'#f0fdf4', url:'https://www.angelone.in', active:true },
  { id:'pl3', ico:'💳', title:'Credit Card',       sub:'Best cards · Rewards + cashback', color:'#e11d48', bg:'#fff1f2', url:'https://www.bankbazaar.com/credit-card.html', active:true },
  { id:'pl4', ico:'☀️', title:'Solar Install',     sub:'Free site visit · 40% subsidy',   color:'#d97706', bg:'#fffbeb', url:'/solar-solutions', active:true },
]

const PassiveIncomeBanner = memo(function PassiveIncomeBanner({ nav }) {
  const { settings } = useSettings()

  // Admin se passiveLinks aate hain — fallback to defaults
  let items = DEFAULT_PASSIVE_LINKS
  try {
    if (settings.passiveLinks) {
      const parsed = JSON.parse(settings.passiveLinks)
      if (Array.isArray(parsed) && parsed.length) items = parsed
    }
  } catch {}

  const activeItems = items.filter(item => item.active !== false)
  if (!activeItems.length) return null

  const handleClick = (url) => {
    if (!url) return
    if (url.startsWith('/')) nav(url)
    else window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ background:'#0f172a', borderRadius:20, padding:'24px 20px', marginBottom:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:8 }}>
        <div>
          <div style={{ fontSize:'0.7rem', fontWeight:800, color:'#10b981', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>💸 Passive Income</div>
          <div style={{ fontSize:'1rem', fontWeight:900, color:'#f1f5f9', letterSpacing:'-0.02em' }}>Tool Use Kiya? Ab Paisa Bhi Kamao</div>
          <div style={{ fontSize:'0.78rem', color:'#64748b', marginTop:2 }}>In links se apply karo — hume commission milti hai, aapko kuch extra nahi lagta</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10 }}>
        {activeItems.map(item => (
          <button key={item.id || item.title} onClick={() => handleClick(item.url)}
            style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, cursor:'pointer', fontFamily:'inherit', textAlign:'left', transition:'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.09)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
          >
            <div style={{ width:40, height:40, borderRadius:10, background:item.bg || '#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0 }}>
              {item.ico}
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:'0.82rem', fontWeight:800, color:'#e2e8f0', lineHeight:1.2 }}>{item.title}</div>
              <div style={{ fontSize:'0.68rem', color:'#64748b', marginTop:2 }}>{item.sub}</div>
            </div>
            <span style={{ color:'rgba(255,255,255,0.2)', marginLeft:'auto', fontSize:'1rem', flexShrink:0 }}>›</span>
          </button>
        ))}
      </div>
      <p style={{ fontSize:'0.65rem', color:'#334155', marginTop:10, textAlign:'center' }}>
        * Affiliate links — purchase/apply karne pe hume commission milti hai · Aapko koi extra charge nahi
      </p>
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════
   TOOL CARD
═══════════════════════════════════════════════════════════ */
const ToolCard = memo(function ToolCard({ tool, onClick }) {
  return (
    <div className="tc-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      {tool.hot && <span className="tc-hot">🔥 Popular</span>}
      <div className="tc-top">
        <div className="tc-ico-wrap" style={{ background: tool.color + '15', color: tool.color }}>
          <span style={{ fontSize:'1.2rem', lineHeight:1 }}>{tool.ico}</span>
        </div>
        <div className="tc-info">
          <div className="tc-name">{tool.name}</div>
          <div className="tc-desc">{tool.desc}</div>
        </div>
      </div>
      <button className="tc-btn" style={{ color: tool.color, borderColor: tool.color + '40', background: tool.color + '08' }}>
        Use Tool →
      </button>
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════
   CATEGORY SECTION (grouped view)
═══════════════════════════════════════════════════════════ */
const CategorySection = memo(function CategorySection({ group, tools, nav, idx }) {
  const color = CAT_COLORS[group] || '#374151'
  const goTo  = useCallback(path => () => nav(path), [nav])

  return (
    <div style={{ marginBottom:24 }}>
      {/* Category header */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12, padding:'10px 14px', background:`${color}10`, borderRadius:12, border:`1px solid ${color}25` }}>
        <span style={{ fontSize:'1.2rem' }}>{group.split(' ')[0]}</span>
        <div>
          <div style={{ fontSize:'0.88rem', fontWeight:900, color:'#0f172a', letterSpacing:'-0.01em' }}>
            {group.replace(/^\S+\s/, '')}
          </div>
          <div style={{ fontSize:'0.7rem', color:'#64748b', fontWeight:600 }}>{tools.length} tools available</div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:4 }}>
          {tools.filter(t => t.hot).slice(0,2).map(t => (
            <span key={t.path} style={{ fontSize:'0.62rem', fontWeight:700, background:'#fef3c7', color:'#b45309', border:'1px solid #fde68a', borderRadius:99, padding:'2px 8px' }}>
              🔥 {t.name.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <div className="tp2-grid">
        {tools.map(t => <ToolCard key={t.path} tool={t} onClick={goTo(t.path)} />)}
      </div>

      {/* Ad after every 2nd category */}
      {idx % 2 === 1 && <AdSlot slot="mid" style={{ marginTop:8 }} />}
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function ToolsPage() {
  const nav = useNavigate()
  const { settings } = useSettings()
  const [activeGroup, setActiveGroup] = useState('All')
  const [search, setSearch]           = useState('')
  const [viewMode, setViewMode]       = useState('category') // 'category' | 'grid'

  // Tools hidden/shown from Admin → Tools Manager
  const hiddenTools  = Array.isArray(settings.hiddenTools) ? settings.hiddenTools : []
  const customData   = settings.customToolData || {}

  // Apply admin edits (name, desc, category) on top of base TOOLS
  const MERGED_TOOLS = TOOLS.map(t => {
    const id     = t.slug || t.path?.split('/').pop()
    const custom = customData[id]
    if (!custom) return t
    return {
      ...t,
      name: custom.name || t.name,
      desc: custom.description || t.desc,
      g:    custom.cat  || t.g,
    }
  })

  const VISIBLE_TOOLS = MERGED_TOOLS.filter(t => !hiddenTools.includes(t.slug || t.path?.split('/').pop()))

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return VISIBLE_TOOLS.filter(t => {
      const matchGroup  = activeGroup === 'All' || t.g === activeGroup
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.g.toLowerCase().includes(q)
      return matchGroup && matchSearch
    })
  }, [activeGroup, search, hiddenTools])

  const groupedFiltered = useMemo(() => {
    if (search || activeGroup !== 'All') return null
    return GROUPS.map(g => ({ group: g, tools: VISIBLE_TOOLS.filter(t => t.g === g) })).filter(g => g.tools.length > 0)
  }, [search, activeGroup, hiddenTools])

  const handleSearch  = useCallback(e => { setSearch(e.target.value); setActiveGroup('All') }, [])
  const clearSearch   = useCallback(() => setSearch(''), [])
  const goTo          = useCallback(path => () => nav(path), [nav])
  const showGrouped   = !search && activeGroup === 'All' && viewMode === 'category'

  return (
    <>
      <SEOHead
        title="Free Online Tools — 144+ Calculators, Converters & Utilities | Almenso"
        description="GST Calculator, EMI Calculator, Bijli Bill, Image Compressor, Solar ROI, BMI — 144+ free tools. No login, no signup. Made for India."
        keywords="free online tools india, gst calculator online, emi calculator, bijli bill calculator, image compressor, bmi calculator, solar roi, almenso tools"
        canonical="/tools"
      />
      <div className="tp2-page">

        {/* ── HERO ──────────────────────────────────────────── */}
        <div className="tp2-hero">
          <div className="tp2-hero-blob" aria-hidden />
          <div className="tp2-hero-inner">
            <div className="tp2-eyebrow">
              <span className="tp2-dot" />
              {TOOLS.length}+ Free Tools · No Login Required
            </div>
            <h1 className="tp2-h1">
              Free Online Tools<br />
              <span>Sab Kuch Ek Jagah</span>
            </h1>
            <p className="tp2-sub">
              GST, EMI, Bijli Bill, Image Tools, Solar ROI, Health — {TOOLS.length}+ calculators.
              Bilkul free, koi login nahi!
            </p>

            {/* Search */}
            <div className="tp2-search-wrap">
              <div className="tp2-search">
                <span className="tp2-search-ico">🔍</span>
                <input
                  value={search}
                  onChange={handleSearch}
                  placeholder="Tool dhundho... e.g. GST, EMI, Image, BMI, Bijli"
                  aria-label="Search tools"
                />
                {search && <button className="tp2-search-clr" onClick={clearSearch} aria-label="Clear search">✕</button>}
              </div>
            </div>

            {/* Hot tools quick strip */}
            {!search && (
              <div className="tp2-hot-strip">
                <span className="tp2-hot-lbl">🔥 Most Used:</span>
                {HOT.slice(0, 7).map(t => (
                  <button key={t.path} className="tp2-hot-pill" onClick={goTo(t.path)}>
                    {t.ico} {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tp2-body">

          {/* ── AD TOP ────────────────────────────────────── */}
          <AdSlot slot="top" />

          {/* ── VIEW TOGGLE + CATEGORY FILTERS ───────────── */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, flexWrap:'wrap' }}>
            {/* View mode toggle */}
            {!search && activeGroup === 'All' && (
              <div style={{ display:'flex', gap:4, background:'#f1f5f9', borderRadius:10, padding:3, flexShrink:0 }}>
                <button
                  onClick={() => setViewMode('category')}
                  style={{ padding:'6px 12px', borderRadius:8, border:'none', fontWeight:700, fontSize:'0.75rem', cursor:'pointer', background: viewMode==='category' ? '#fff' : 'transparent', color: viewMode==='category' ? '#0f172a' : '#64748b', boxShadow: viewMode==='category' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', fontFamily:'inherit', minHeight:'unset' }}>
                  ☰ Category
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{ padding:'6px 12px', borderRadius:8, border:'none', fontWeight:700, fontSize:'0.75rem', cursor:'pointer', background: viewMode==='grid' ? '#fff' : 'transparent', color: viewMode==='grid' ? '#0f172a' : '#64748b', boxShadow: viewMode==='grid' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', fontFamily:'inherit', minHeight:'unset' }}>
                  ⊞ Grid
                </button>
              </div>
            )}

            {/* Category filter tabs — scrollable */}
            <div className="tp2-cats" role="tablist" style={{ flex:1, minWidth:0 }}>
              <button
                className={`tp2-cat ${activeGroup === 'All' ? 'on' : ''}`}
                onClick={() => setActiveGroup('All')}
                role="tab" aria-selected={activeGroup === 'All'}>
                🔍 All ({TOOLS.length})
              </button>
              {GROUPS.map(g => {
                const cnt = TOOLS.filter(t => t.g === g).length
                const color = CAT_COLORS[g] || '#374151'
                return (
                  <button key={g}
                    className={`tp2-cat ${activeGroup === g ? 'on' : ''}`}
                    onClick={() => setActiveGroup(g)}
                    role="tab" aria-selected={activeGroup === g}
                    style={ activeGroup === g ? { borderColor: color, color: color, background: color + '10' } : {} }>
                    {g} <span className="tp2-cat-cnt">{cnt}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── RESULT COUNT ──────────────────────────────── */}
          <div className="tp2-count">
            {search
              ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search}"`
              : activeGroup !== 'All'
              ? `${filtered.length} tools in ${activeGroup.replace(/^\S+\s/, '')}`
              : `${TOOLS.length} tools across ${GROUPS.length} categories`
            }
          </div>

          {/* ── TOOLS DISPLAY ─────────────────────────────── */}
          {filtered.length > 0 ? (
            showGrouped ? (
              /* Category-wise grouped view */
              <div>
                {groupedFiltered?.map((gd, idx) => (
                  <React.Fragment key={gd.group}>
                    <CategorySection group={gd.group} tools={gd.tools} nav={nav} idx={idx} />
                    {/* Passive income banner after 3rd category */}
                    {idx === 2 && <PassiveIncomeBanner nav={nav} />}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              /* Flat grid view (search results / single category) */
              <div className="tp2-grid" role="list">
                {filtered.map((t, i) => (
                  <React.Fragment key={t.path}>
                    <ToolCard tool={t} onClick={goTo(t.path)} />
                    {(i + 1) % 12 === 0 && i < filtered.length - 1 && (
                      <div className="tp2-grid-ad"><AdSlot slot="mid" /></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )
          ) : (
            <div className="tp2-empty">
              <div className="tp2-empty-ico">🔍</div>
              <div className="tp2-empty-title">"{search}" ke liye koi tool nahi mila</div>
              <div className="tp2-empty-sub">Try karo: "GST", "EMI", "image", "bijli", "BMI", "loan"</div>
              <button className="tp2-empty-reset" onClick={clearSearch}>✕ Clear Search</button>
            </div>
          )}

          {/* ── PASSIVE INCOME BANNER (always shown at bottom) ── */}
          {!showGrouped && <PassiveIncomeBanner nav={nav} />}

          {/* ── AFFILIATE PRODUCTS ────────────────────────── */}
          <div className="tp2-aff-section">
            <div className="tp2-aff-head">
              <div>
                <div className="tp2-aff-eye">🛒 Recommended Products</div>
                <h2 className="tp2-aff-title">Tool Use Karo, Products Bhi Dekho</h2>
                <p className="tp2-aff-sub">Expert picks — electrician, solar & home products · Fast Amazon delivery</p>
              </div>
            </div>
            <RelatedProducts category="electrical" limit={3} />
          </div>

          {/* ── AD MID ────────────────────────────────────── */}
          <AdSlot slot="mid" />

          {/* ── SEO CONTENT ───────────────────────────────── */}
          <div className="tp2-seo-card">
            <h2>🛠️ {TOOLS.length}+ Free Tools — India Ka Best Tool Hub</h2>
            <p>
              Almenso par {TOOLS.length}+ free online tools hain jo Indian users ke liye banaye gaye hain.
              GST calculation, EMI planning, bijli bill check, solar ROI, image editing, health calculators —
              sab ek jagah. Koi registration nahi, koi login nahi — seedha use karo!
            </p>
            <p>
              Haldwani, Uttarakhand se shuru hua Almenso aaj India bhar mein use ho raha hai.
              Hamare tools teachers, students, shop owners, electricians, aur families sab use karte hain.
            </p>
            <div className="tp2-seo-tags">
              {['GST Calculator','EMI Calculator','Bijli Bill Calculator','Solar ROI','Image Compressor',
                'BMI Calculator','Password Generator','Word Counter','Age Calculator','Loan Calculator',
                'Percentage Calculator','Discount Calculator'].map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* ── AD BOTTOM ─────────────────────────────────── */}
          <AdSlot slot="bottom" />

        </div>
      </div>
    </>
  )
}

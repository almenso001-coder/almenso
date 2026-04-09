/**
 * JSON-LD SCHEMA COMPONENTS
 * Add ArticleSchema, ProductSchema, ToolSchema, etc.
 */

export function ArticleSchema({ title, description, image, datePublished, dateModified, author = "Almenso" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": { "@type": "Organization", "name": author, "url": "https://almenso.vercel.app" },
    "publisher": { "@type": "Organization", "name": "Almenso", "logo": { "@type": "ImageObject", "url": "https://almenso.vercel.app/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : "https://almenso.vercel.app" }
  }
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>
}

export function ProductSchema({ name, description, price, image, url, rating = 4.5, reviewCount = 10 }) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": image,
    "description": description,
    "brand": { "@type": "Brand", "name": "Almenso" },
    "offers": { "@type": "Offer", "url": url, "priceCurrency": "INR", "price": price, "availability": "https://schema.org/InStock" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": rating, "reviewCount": reviewCount }
  }
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>
}

export function ToolSchema({ name, description, url, image }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "applicationCategory": "UtilitiesApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "author": { "@type": "Organization", "name": "Almenso", "url": "https://almenso.vercel.app" }
  }
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Almenso",
    "image": "https://almenso.vercel.app/logo.png",
    "description": "Free online tools and professional services",
    "url": "https://almenso.vercel.app",
    "telephone": "+919258133689",
    "areaServed": "Haldwani, Uttarakhand, India",
    "address": { "@type": "PostalAddress", "addressLocality": "Haldwani", "addressRegion": "Uttarakhand", "addressCountry": "India" }
  }
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>
}

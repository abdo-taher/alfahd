# 22 — Technical SEO Requirements
## مؤسسة الفهد للمقاولات | Al-Fahad Contracting Company

> **Document Purpose:** Define all enterprise-level technical SEO requirements for the bilingual Next.js site — covering crawlability, indexability, Core Web Vitals, hreflang, Arabic SEO, URL structure, Schema, and a 40+ point implementation checklist.

---

## Technical SEO Overview for the Next.js Bilingual Site

The Al-Fahad website is built on Next.js with `/[locale]/` routing supporting `ar` (default, RTL) and `en` (LTR). This architecture introduces specific technical SEO requirements that differ from a standard single-language site:

1. **Dual-language crawl management** — Googlebot must crawl and index both `/ar/` and `/en/` versions of every page
2. **Hreflang implementation** — Correct `hreflang` signals tell Google which URL serves which language/region audience
3. **Arabic-specific rendering** — RTL layout, Arabic URL slug handling, Arabic character encoding
4. **Core Web Vitals at scale** — 500+ page site with image-heavy portfolio pages must maintain LCP ≤ 2.5s across both locales
5. **Schema deployment** — 11 Schema types deployed via Next.js metadata/script injection

---

## 1. Crawlability and Indexability

### robots.txt Specification

```
User-agent: *
Allow: /

# Block admin and utility paths
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /404
Disallow: /500
Disallow: */thank-you/   # Block thank-you pages from indexing
Disallow: /staging/

# Sitemaps
Sitemap: https://alfahad.com/sitemap.xml
Sitemap: https://alfahad.com/sitemap-ar.xml
Sitemap: https://alfahad.com/sitemap-en.xml
```

### XML Sitemap Structure

**Main sitemap index:** `https://alfahad.com/sitemap.xml`
```xml
<sitemapindex>
  <sitemap><loc>https://alfahad.com/sitemap-ar.xml</loc></sitemap>
  <sitemap><loc>https://alfahad.com/sitemap-en.xml</loc></sitemap>
  <sitemap><loc>https://alfahad.com/sitemap-images.xml</loc></sitemap>
  <sitemap><loc>https://alfahad.com/sitemap-projects.xml</loc></sitemap>
  <sitemap><loc>https://alfahad.com/sitemap-blog.xml</loc></sitemap>
</sitemapindex>
```

**Sitemap generation:** Use Next.js `sitemap.ts` (Next.js 13+ App Router sitemap generation) to auto-generate dynamic sitemaps. Each sitemap entry must include:
- `<loc>` — canonical URL
- `<lastmod>` — ISO 8601 date of last content update
- `<changefreq>` — per priority table in `03-website-architecture.md`
- `<priority>` — per priority table in `03-website-architecture.md`

**Crawl budget management for 500+ pages:**
- Set high-priority `<priority>` (0.9) only for service pillar pages, RFQ, and contact
- Blog articles and project pages at 0.5 — prevents crawl budget waste on low-priority URLs
- Submit sitemap in Google Search Console and Bing Webmaster Tools
- Monitor "Discovered — currently not indexed" in GSC; investigate if count grows

---

## 2. Core Web Vitals Targets and Next.js Implementation

### Targets

| Metric | Target | Current Threshold | Measurement |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s = Good; 4s = Needs Improvement | GSC, PageSpeed Insights |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 = Good; 0.25 = Needs Improvement | GSC, PageSpeed Insights |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200ms = Good; 500ms = Needs Improvement | GSC, PageSpeed Insights |

### Next.js-Specific Implementation Notes

**Image Optimization (LCP impact):**
- Use `next/image` component for ALL images — provides automatic WebP conversion, lazy loading, and size optimization
- Set explicit `width` and `height` on all images to prevent CLS
- For above-the-fold hero images: add `priority` prop to force eager loading
- Use `placeholder="blur"` with blurDataURL for project gallery images
- Serve images from Vercel Image Optimization or a CDN (Cloudfront)

```tsx
// Hero image — priority load to optimize LCP
<Image
  src="/images/hero-project.jpg"
  alt="Aluminum facade installation Riyadh"
  width={1280}
  height={720}
  priority  // Eager load; no lazy loading for LCP element
  className="object-cover"
/>
```

**Font Loading (CLS impact):**
- IBM Plex Sans Arabic is loaded from Google Fonts — use `display=swap` to prevent layout shift
- Preload the font in `<head>`: `<link rel="preload" href="[font-url]" as="font" crossorigin="anonymous" />`
- Consider self-hosting fonts for performance (avoids Google Fonts round-trip)

**JavaScript Splitting (INP impact):**
- Next.js automatic code splitting handles this by default — verify chunks are not excessively large
- Avoid loading all Third-party scripts synchronously (analytics, chat widgets, maps)
- Use `next/script` with `strategy="lazyOnload"` for non-critical scripts

**Server-Side Rendering:**
- All service pillar, sub-service, industry, and location pages must be SSR or SSG (not CSR) for crawlability
- Use `generateStaticParams` for known slug paths
- Implement ISR (Incremental Static Regeneration) for project pages with `revalidate: 86400` (24-hour cache)

---

## 3. Bilingual / Hreflang Implementation

### URL Structure

The site uses Next.js `/[locale]/` routing:
- Arabic (default): `https://alfahad.com/ar/khadamat/aluminium/`
- English: `https://alfahad.com/en/services/aluminum/`

**Note:** The root domain `https://alfahad.com/` should 301 redirect to `https://alfahad.com/ar/` (Arabic as default locale).

### Hreflang Implementation

Implement via Next.js App Router `generateMetadata()` or via the `<head>` alternates API:

```typescript
// In layout.tsx or page.tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    alternates: {
      canonical: `https://alfahad.com/${params.locale}/services/aluminum/`,
      languages: {
        'ar': 'https://alfahad.com/ar/khadamat/aluminium/',
        'en': 'https://alfahad.com/en/services/aluminum/',
        'x-default': 'https://alfahad.com/ar/khadamat/aluminium/',
      },
    },
  };
}
```

**Rendered output in `<head>`:**
```html
<link rel="canonical" href="https://alfahad.com/ar/khadamat/aluminium/" />
<link rel="alternate" hreflang="ar" href="https://alfahad.com/ar/khadamat/aluminium/" />
<link rel="alternate" hreflang="en" href="https://alfahad.com/en/services/aluminum/" />
<link rel="alternate" hreflang="x-default" href="https://alfahad.com/ar/khadamat/aluminium/" />
```

**Critical rules:**
- `x-default` must point to the Arabic URL (primary market is Saudi Arabia)
- Every hreflang must be bidirectional — if Arabic page references English, English page must reference Arabic
- Hreflang must be consistent across all pages; missing or inconsistent signals cause both locale versions to be deprioritized
- Hreflang also appears in the XML sitemap (add `<xhtml:link>` elements to sitemap entries)

### Content-Language Headers

Set `Content-Language` HTTP response header:
- Arabic pages: `Content-Language: ar`
- English pages: `Content-Language: en`

In Next.js, set via `next.config.mjs` headers configuration:
```javascript
async headers() {
  return [
    {
      source: '/ar/:path*',
      headers: [{ key: 'Content-Language', value: 'ar' }],
    },
    {
      source: '/en/:path*',
      headers: [{ key: 'Content-Language', value: 'en' }],
    },
  ];
},
```

---

## 4. Arabic SEO Requirements

### RTL Rendering

The HTML root element must specify direction:
```html
<!-- Arabic pages -->
<html dir="rtl" lang="ar">

<!-- English pages -->
<html dir="ltr" lang="en">
```

In Next.js App Router, set per-locale in the `<html>` element in `layout.tsx`:
```tsx
export default function Layout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </html>
  );
}
```

### Arabic URL Slug Decision

**Decision: Use transliterated (Latin-character) slugs** for Arabic-locale pages.

See full rationale in [03-website-architecture.md](./03-website-architecture.md). Summary:
- Arabic Unicode slugs (`/ar/خدمات/`) display as percent-encoded in browser address bar and link sharing
- Transliterated slugs (`/ar/khadamat/`) are human-readable, shareable via WhatsApp/SMS, and work correctly in XML sitemaps and analytics tools
- Google treats transliterated slugs as fully valid for Arabic-locale pages when hreflang is set correctly

### Arabic Meta Tag Character Limits

Arabic characters are generally wider than Latin. Apply these limits for SERP display:

| Tag | Standard Limit | Arabic Recommended Limit |
|---|---|---|
| `<title>` | 50–60 characters | 50–55 Arabic characters |
| `<meta description>` | 150–160 characters | 120–140 Arabic characters |
| OG title | 60 characters | 55 Arabic characters |

### Arabic Content in Metadata

All meta titles and descriptions on Arabic pages must be in Arabic (not English). Use Next.js `generateMetadata()` with locale-conditional logic:

```typescript
const titles = {
  ar: 'أعمال الألمنيوم بالرياض | مؤسسة الفهد للمقاولات',
  en: 'Aluminum Works in Riyadh | Al-Fahad Contracting',
};

const descriptions = {
  ar: 'خبراء أعمال الألمنيوم بالرياض: واجهات وكيرتن وول ونوافذ وأبواب وكلادينج. أكثر من 25 عامًا وأكثر من 300 مشروع.',
  en: 'Expert aluminum works in Riyadh: facades, curtain walls, windows, doors & cladding. 25+ years · 300+ projects. Request a free quote.',
};
```

---

## 5. URL Structure and Canonical Requirements

**URL structure rules** (see full specification in `03-website-architecture.md`):
- Max 3 path segments after locale prefix for commercial pages
- Lowercase, hyphen-separated slugs
- Trailing slash on all URLs: `/ar/khadamat/aluminium/` not `/ar/khadamat/aluminium`
- No www (resolve `www.alfahad.com` → `alfahad.com` via 301)
- HTTPS only (HTTP → HTTPS 301)

**Canonical tag rules:**
- Every page has a self-referencing canonical
- Paginated pages (page 2+) canonical points to page 1
- Filtered/sorted URL variants canonical to base URL
- Never cross-canonicalize Arabic to English or vice versa

**Redirect requirements:**
- Old URLs (if any exist from previous site) → 301 to new canonical URL
- Trailing slash normalization: `/ar/khadamat/aluminium` → 301 → `/ar/khadamat/aluminium/`
- www redirect: `www.alfahad.com` → 301 → `alfahad.com`

---

## 6. Pagination Requirements

For paginated archive pages (blog archive, projects archive):
- Use `rel="next"` and `rel="prev"` link elements in `<head>`
- Canonical of page 2+ points to page 1 (aggregate canonical)
- All paginated pages have `noindex` if content is duplicate (thin aggregation); OR use canonical to page 1
- Preferred approach: use infinite scroll or load-more that does NOT create separate paginated URLs

---

## 7. Structured Data Implementation

All Schema types are deployed as JSON-LD in the `<head>` section via Next.js `<Script>` component or the `generateMetadata()` JSON-LD option.

**Implementation in Next.js App Router:**
```tsx
// Inject JSON-LD Schema via Script component
import Script from 'next/script';

export default function AluminumServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Aluminum Works",
    // ... full schema object
  };

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Page content */}
    </>
  );
}
```

**Schema types by page** (see full specifications in `17-schema-strategy.md`):
- Organization + LocalBusiness: Homepage, About, Contact
- Service: All 3 service pillar pages + all 20 sub-service pages
- FAQPage: All service pages (FAQ section), FAQ hub page
- Article: All blog posts, case studies, resource guides
- BreadcrumbList: All pages
- CreativeWork: All project pages
- Review/AggregateRating: Homepage, service pages (once 10+ reviews)

---

## 8. Technical Implementation Checklist (40+ Checkpoints)

### Crawlability & Indexability

- [ ] robots.txt deployed and accessible at `https://alfahad.com/robots.txt`
- [ ] robots.txt allows Googlebot and Bingbot for all public pages
- [ ] XML sitemap index deployed at `https://alfahad.com/sitemap.xml`
- [ ] Language-specific sitemaps (`sitemap-ar.xml`, `sitemap-en.xml`) deployed
- [ ] All sitemaps submitted to Google Search Console
- [ ] All sitemaps submitted to Bing Webmaster Tools
- [ ] `<lastmod>` dates accurate and updated on content change
- [ ] No important pages in `noindex` by mistake (verify in GSC)
- [ ] Internal search result pages excluded from indexing
- [ ] Thank-you/confirmation pages excluded from indexing

### Core Web Vitals

- [ ] All above-the-fold images use `next/image` with `priority` prop
- [ ] All other images use `next/image` with lazy loading
- [ ] Explicit `width` and `height` set on all images (prevents CLS)
- [ ] IBM Plex Sans Arabic font loaded with `display=swap`
- [ ] Font preloaded in `<head>` for above-the-fold font usage
- [ ] Hero video (if used) has poster image to prevent LCP from video
- [ ] Analytics and third-party scripts loaded with `strategy="lazyOnload"`
- [ ] LCP ≤ 2.5s verified on PageSpeed Insights (mobile + desktop)
- [ ] CLS ≤ 0.1 verified on all commercial pages
- [ ] INP ≤ 200ms verified with Chrome User Experience data

### Bilingual / Hreflang

- [ ] Every Arabic page has `hreflang="ar"` and `hreflang="en"` tags
- [ ] Every English page has `hreflang="en"` and `hreflang="ar"` tags
- [ ] `hreflang="x-default"` set to Arabic URL on all pages
- [ ] Hreflang tags are bidirectional (Arabic references English, English references Arabic)
- [ ] Hreflang present in XML sitemap (`<xhtml:link>` elements)
- [ ] Root domain (`alfahad.com/`) 301 redirects to Arabic locale (`/ar/`)
- [ ] `Content-Language` HTTP headers set correctly per locale
- [ ] `lang` attribute set on `<html>` element per locale
- [ ] `dir` attribute set (`rtl` for Arabic, `ltr` for English)

### URL Structure & Canonicals

- [ ] All URLs lowercase with hyphens (no underscores)
- [ ] Trailing slash consistent on all canonical URLs
- [ ] Self-referencing canonical on every page
- [ ] www redirects to non-www (301)
- [ ] HTTP redirects to HTTPS (301)
- [ ] No Arabic Unicode in URL slugs (use transliterated slugs)
- [ ] Old/legacy URLs (if any) 301 redirected to new structure

### Meta Tags

- [ ] Unique `<title>` on every page (no duplicates)
- [ ] Unique `<meta name="description">` on every page
- [ ] Title length ≤ 60 characters (EN) / ≤ 55 characters (AR)
- [ ] Description length ≤ 160 characters (EN) / ≤ 140 characters (AR)
- [ ] OG tags (`og:title`, `og:description`, `og:image`) on all pages
- [ ] Twitter Card tags on all pages

### Schema Markup

- [ ] Organization Schema deployed on Homepage
- [ ] LocalBusiness Schema (GeneralContractor) deployed on Homepage + Contact
- [ ] Service Schema on all 3 service pillar pages
- [ ] Service Schema on all 20 sub-service pages
- [ ] FAQPage Schema on all service pages with FAQ sections
- [ ] BreadcrumbList Schema on all pages
- [ ] Article Schema on all blog posts
- [ ] CreativeWork Schema on all project pages
- [ ] All Schema validated in Google Rich Results Test
- [ ] Schema errors in GSC Enhancements section = 0

### Arabic SEO

- [ ] All Arabic page titles and meta descriptions are in Arabic
- [ ] Arabic content uses correct diacritics where needed for technical terms
- [ ] Arabic terms for service names match canonical definitions in `02-keyword-research.md`
- [ ] Company name always rendered as مؤسسة الفهد للمقاولات (Arabic) and Al-Fahad Contracting Company (English)

---

## Cross-References

- URL structure → [03-website-architecture.md](./03-website-architecture.md)
- Schema type definitions → [17-schema-strategy.md](./17-schema-strategy.md)
- Hreflang and bilingual strategy → document section above
- Core Web Vitals monitoring → [24-kpi-framework.md](./24-kpi-framework.md)

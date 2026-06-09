# Enterprise SEO Strategy — Technical Design
# مؤسسة الفهد للمقاولات — alfahd-contracting.com

**Version:** 2.0  
**Based on:** requirements.md v2.0 + Full Codebase Audit (June 2026)  
**Stack:** Next.js 16.2.7 · App Router · next-intl v4 · TypeScript · Tailwind v4

---

## 1. System Architecture Overview

```
src/
├── app/
│   ├── sitemap.ts                          ← Fix slugs (REQ-001-1)
│   ├── robots.ts                           ← Already correct
│   └── [locale]/
│       ├── layout.tsx                      ← Add GA4 events, mobile CTA bar
│       ├── page.tsx                        ← Add VideoObject schema
│       ├── about/page.tsx                  ← Add Organization+AboutPage schema
│       ├── contact/page.tsx                ← Add LocalBusiness+ContactPage schema
│       ├── services/
│       │   ├── page.tsx                    ← Add ItemList schema
│       │   └── [slug]/
│       │       ├── page.tsx                ← Fix category map
│       │       └── [sub-slug]/page.tsx     ← NEW: sub-service pages
│       ├── projects/
│       │   ├── page.tsx                    ← Add ItemList schema
│       │   └── [slug]/page.tsx             ← Add CreativeWork+Breadcrumb schema
│       ├── blog/
│       │   └── [slug]/page.tsx             ← Add Person schema for authors
│       ├── industries/
│       │   └── [slug]/page.tsx             ← NEW: industry pages
│       ├── locations/
│       │   └── [slug]/page.tsx             ← NEW: location pages
│       ├── cost/
│       │   └── [slug]/page.tsx             ← NEW: cost/pricing pages
│       ├── case-studies/
│       │   └── [slug]/page.tsx             ← NEW: case study pages
│       ├── faq/page.tsx                    ← NEW: FAQ hub
│       ├── team/
│       │   └── [slug]/page.tsx             ← NEW: author profile pages
│       └── thank-you/page.tsx              ← NEW: conversion tracking
│
├── seo/
│   ├── schema/
│   │   └── organization.ts                ← Enhance with AggregateRating, foundingDate, etc.
│   ├── metadata/
│   │   ├── page-metadata.ts               ← Already correct (OG image path fix needed)
│   │   ├── service-metadata.ts            ← Add sub-service keyword maps
│   │   ├── industry-metadata.ts           ← NEW
│   │   ├── location-metadata.ts           ← NEW
│   │   └── cost-metadata.ts               ← NEW
│   └── canonical/index.ts                 ← Fix example.com fallback
│
└── content/
    ├── ar/
    │   ├── industries.json                 ← NEW: 6 industry entries
    │   ├── locations.json                  ← NEW: 6 location entries
    │   ├── cost-guides.json                ← NEW: 4 cost guide entries
    │   ├── case-studies.json               ← NEW: 4 case studies
    │   ├── team.json                       ← NEW: author profiles
    │   ├── sub-services.json               ← NEW: 15 sub-service entries
    │   ├── faq.json                        ← NEW: aggregated FAQ hub data
    │   ├── blog.json                       ← Extend with 10 new posts
    │   └── projects.json                   ← Fix category names
    └── en/
        ├── blog.json                       ← Add 8 translated posts
        └── [all new files mirrored]        ← EN versions of all new content
```

---

## 2. Phase 1 — Critical Bug Fixes

### 2.1 Sitemap Service Slug Fix

**File:** `src/app/sitemap.ts`

```typescript
// BEFORE (broken):
const serviceSlugs = ["aluminum", "glass", "steel"] as const;

// AFTER (correct):
const serviceSlugs = ["aluminum-works", "glass-works", "steel-works"] as const;
```

The rest of the sitemap function remains unchanged. This single line change eliminates 6 404 sitemap entries (3 slugs × 2 locales).

---

### 2.2 Project Category Name Standardisation

**Files affected:**
- `src/content/ar/projects.json` — change `"aluminium"` → `"aluminum"`, `"iron"` → `"steel"`
- `src/content/en/projects.json` — same changes
- `src/app/[locale]/projects/[slug]/page.tsx` — update `CATEGORY_LABELS` map key

**`projects.json` category mapping:**

| Project | Current (broken) | Correct |
|---|---|---|
| commercial-crystal-tower | `"aluminium"` | `"aluminum"` |
| industrial-innovation-complex | `"aluminium"` | `"aluminum"` |
| neom-infrastructure-hub | `"iron"` | `"steel"` |
| al-naseem-private-villa | `"iron"` | `"steel"` |
| smart-pedestrian-bridge | `"iron"` | `"steel"` |

**`page.tsx` label map update:**
```typescript
// BEFORE:
const CATEGORY_LABELS = {
  ar: { aluminium: "الألمنيوم", glass: "الزجاج", iron: "الحديد" },
  en: { aluminium: "Aluminium", glass: "Glass", iron: "Iron" },
};

// AFTER:
const CATEGORY_LABELS = {
  ar: { aluminum: "الألمنيوم", glass: "الزجاج", steel: "الحديد" },
  en: { aluminum: "Aluminium", glass: "Glass", steel: "Steel" },
};
```

---

### 2.3 Canonical Fallback Fix

**File:** `src/seo/canonical/index.ts`

Replace every occurrence of `"https://example.com"` with:
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";
```

---

### 2.4 Founding Year Standardisation

**Files affected:**
- `src/seo/schema/organization.ts` — change description from "15 عاماً" to "25+ عاماً"
- `src/content/locales/ar.json` — `meta.siteDescription`, `meta.aboutDescription`
- `src/content/locales/en.json` — same fields
- `src/app/[locale]/about/page.tsx` — timeline starting point → 1999
- `src/seo/metadata/service-metadata.ts` — description template uses "15+" → "25+"

**Standard values to use everywhere:**
```
Arabic: "تأسست عام 1999" / "خبرة تزيد على 25 عاماً"
English: "Founded in 1999" / "25+ years of experience"
```

---

### 2.5 Environment Variable Guard

**File:** `.env.example` (create if missing)
```env
NEXT_PUBLIC_SITE_URL=https://alfahd-contracting.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**File:** `src/app/layout.tsx` — add build-time assertion:
```typescript
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be set in production");
}
```

---

## 3. Phase 2 — Schema / JSON-LD Architecture

### 3.1 New Schema Functions in `organization.ts`

Add these exports to `src/seo/schema/organization.ts`:

```typescript
// About page schema
export function aboutPageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/${locale}/about`,
    url: `${BASE_URL}/${locale}/about`,
    name: locale === "ar" ? "من نحن — مؤسسة الفهد للمقاولات" : "About — Al Fahd Contracting",
    description: locale === "ar"
      ? "تأسست مؤسسة الفهد للمقاولات عام 1999 في الرياض، متخصصة في أعمال الألمنيوم والزجاج والحديد."
      : "Al Fahd Contracting was founded in 1999 in Riyadh, specialising in aluminium, glass, and steel works.",
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  };
}

// Contact page / LocalBusiness schema
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE_URL}/ar/contact`,
    url: `${BASE_URL}/ar/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: "مؤسسة الفهد للمقاولات",
      telephone: "+966114459222",
      email: "engineering@al-fahd.com.sa",
      address: {
        "@type": "PostalAddress",
        streetAddress: "أبراج العليا، برج ب، الطابق ١٤",
        addressLocality: "الرياض",
        addressRegion: "01",
        addressCountry: "SA",
        postalCode: "12211",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+966114459222",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "17:00",
        },
      },
    },
  };
}

// Project / CreativeWork schema
export function projectSchema(project: {
  title: string; description: string; url: string;
  year: number; location: string; coverImage: string; technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.url,
    dateCreated: String(project.year),
    locationCreated: { "@type": "Place", name: project.location },
    provider: { "@id": `${BASE_URL}/#organization` },
    image: project.coverImage,
    keywords: project.technologies.join(", "),
  };
}

// ItemList schema for index pages
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

// VideoObject schema for hero video
export function videoObjectSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "مؤسسة الفهد للمقاولات — نظرة عامة",
    description: "نظرة على مشاريع الفهد للمقاولات في أعمال الألمنيوم والزجاج والحديد بالمملكة العربية السعودية",
    thumbnailUrl: `${BASE_URL}/images/og-default.jpg`,
    uploadDate: "2024-01-01",
    contentUrl: `${BASE_URL}/hero.mp4`,
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

// Person schema for blog authors
export function personSchema(author: { name: string; jobTitle: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/ar/team/${author.slug}`,
    name: author.name,
    jobTitle: author.jobTitle,
    worksFor: { "@id": `${BASE_URL}/#organization` },
    url: `${BASE_URL}/ar/team/${author.slug}`,
  };
}

// AggregateRating schema (for org + services)
export function aggregateRatingSchema(ratingValue: number, reviewCount: number) {
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

// Industry / sector page schema
export function industryPageSchema(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    about: { "@id": `${BASE_URL}/#organization` },
    provider: { "@id": `${BASE_URL}/#organization` },
  };
}

// Location page schema
export function localBusinessLocationSchema(city: string, locale: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: locale === "ar"
      ? `مؤسسة الفهد للمقاولات — ${city}`
      : `Al Fahd Contracting — ${city}`,
    url,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "City", name: city },
    telephone: "+966114459222",
    email: "engineering@al-fahd.com.sa",
  };
}

// Enhanced organizationSchema — update existing function
// Add inside organizationSchema() return object:
// foundingDate: "1999",
// numberOfEmployees: { "@type": "QuantitativeValue", value: 150 },
// slogan: "رواد هندسة الواجهات في المملكة",
// priceRange: "$$$$",
// currenciesAccepted: "SAR",
// paymentAccepted: "Cash, Bank Transfer, Letter of Credit",
// aggregateRating: aggregateRatingSchema(4.9, 87),
// addressRegion field: add "01" alongside Arabic text
```

---

### 3.2 Updated `articleSchema` Function

Extend the existing `articleSchema` in `organization.ts` to include `Person` author reference:

```typescript
export function articleSchema({
  title, description, url, publishedAt, image, authorName, authorSlug,
}: {
  title: string; description: string; url: string;
  publishedAt: string; image?: string;
  authorName?: string; authorSlug?: string;
}) {
  const authorEntity = authorName && authorSlug
    ? { "@type": "Person", "@id": `${BASE_URL}/ar/team/${authorSlug}`, name: authorName }
    : { "@id": `${BASE_URL}/#organization` };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: authorEntity,
    publisher: { "@id": `${BASE_URL}/#organization` },
    image: image ?? `${BASE_URL}/images/og-default.jpg`,
  };
}
```

---

## 4. Phase 3 — New Route Architecture

### 4.1 Sub-Service Pages

**New route:** `src/app/[locale]/services/[slug]/[sub-slug]/page.tsx`

This page reuses the same data pattern as the parent service page. Sub-service content is stored in a new JSON file.

**Data file:** `src/content/{locale}/sub-services.json`

```typescript
// Type definition
interface SubService {
  id: string;
  parentSlug: string;         // "aluminum-works" | "glass-works" | "steel-works"
  slug: string;               // e.g., "curtain-wall-systems"
  title: string;
  shortDescription: string;
  description: string;        // 400+ words
  benefits: string[];
  applications: string[];
  process: ProcessStep[];
  faq: FaqItem[];
  relatedProjectCategory: string;
  keywords: {
    ar: string[];
    en: string[];
  };
}
```

**Static params generation:**
```typescript
export async function generateStaticParams() {
  const locales = ["ar", "en"];
  const subServices = await import(`@/content/ar/sub-services.json`);
  return locales.flatMap((locale) =>
    subServices.default.map((s: SubService) => ({
      locale,
      slug: s.parentSlug,
      "sub-slug": s.slug,
    }))
  );
}
```

**Page template sections:**
1. Hero (inherits parent service hero image, different H1)
2. Description + Benefits card (same as parent service template)
3. How It Works (4-step process)
4. Specifications / Technical Details (unique per sub-service)
5. Related Projects (filtered by parent service category)
6. FAQ accordion (min 5 items)
7. Back to parent service link + CTA

**Metadata function:** Add `generateSubServiceMetadata()` to `src/seo/metadata/service-metadata.ts`:
```typescript
export function generateSubServiceMetadata({
  subService, parentService, slug, parentSlug, locale, path,
}: SubServiceMetadataParams): Metadata {
  const isAr = locale === "ar";
  const company = isAr ? "مؤسسة الفهد للمقاولات" : "Al Fahd Contracting";
  const title = isAr
    ? `${subService} | ${parentService} بالرياض | ${company}`
    : `${subService} | ${parentService} Riyadh | ${company}`;
  const keywords = subService.keywords[locale] ?? [];
  return generatePageMetadata({ title, description: subService.shortDescription, path, locale, keywords });
}
```

**Sitemap update:** Add sub-service URLs to `src/app/sitemap.ts`:
```typescript
const subServiceUrls = LOCALES.flatMap((locale) =>
  subServices.map((s) => ({
    url: `${BASE_URL}/${locale}/services/${s.parentSlug}/${s.slug}`,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.85,
    alternates: buildAlternates(`/services/${s.parentSlug}/${s.slug}`),
  }))
);
```

---

### 4.2 Industry Pages

**New route:** `src/app/[locale]/industries/[slug]/page.tsx`

**Data file:** `src/content/{locale}/industries.json`

```typescript
interface Industry {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  stats: Array<{ value: string; label: string }>;
  servicesUsed: string[];       // service slugs
  relatedProjectIds: string[];  // project slugs
  testimonialId?: string;
  certifications: string[];
  faq: FaqItem[];
  keywords: { ar: string[]; en: string[] };
}
```

**Page template sections:**
1. Hero (full-viewport, H1 = industry name, eyebrow label)
2. Industry Overview (250+ word description, trust signals)
3. Stats Strip (3-4 relevant industry numbers)
4. Services We Provide in This Sector (cards linking to service pages)
5. Related Projects (filtered by `relatedProjectIds`)
6. Client Testimonial (from `testimonials.json`)
7. Certifications & Standards relevant to sector
8. FAQ (min 5 questions, `FAQPage` schema)
9. CTA (sector-specific CTA label, e.g., "طلب تأهيل مناقصة" for government)

**Schema injection:**
- `industryPageSchema()` + `BreadcrumbList` (Home → Industries → {Name})
- `FAQPage` if FAQ items exist

---

### 4.3 Location Pages

**New route:** `src/app/[locale]/locations/[slug]/page.tsx`

**Data file:** `src/content/{locale}/locations.json`

```typescript
interface Location {
  id: string;
  slug: string;               // "riyadh", "north-riyadh", "kafd-riyadh", etc.
  city: string;
  region: string;
  title: string;
  description: string;        // unique per page, 300+ words, references local context
  landmarks: string[];        // notable landmarks/districts in the area
  relatedProjectIds: string[];
  mapEmbedUrl?: string;
  keywords: { ar: string[]; en: string[] };
}
```

**Page template sections:**
1. Hero (city photo, H1 = "مقاول ألمنيوم وزجاج وحديد في {city}")
2. Services Available (condensed list linking to service pages)
3. Projects in This Location (filtered by `relatedProjectIds`)
4. Why Clients in {City} Choose Us (differentiators with local context)
5. Contact / Map Section (embedded Google Map, NAP)
6. FAQ (location-specific, min 4 questions)

**Schema injection:**
- `localBusinessLocationSchema()` + `BreadcrumbList` (Home → Locations → {City})

**Metadata:** New `src/seo/metadata/location-metadata.ts`:
```typescript
export function generateLocationMetadata({ location, locale, path }: LocationMetadataParams): Metadata {
  const isAr = locale === "ar";
  const title = isAr
    ? `${location.title} | مؤسسة الفهد للمقاولات`
    : `${location.title} | Al Fahd Contracting`;
  return generatePageMetadata({ title, description: location.description, path, locale,
    keywords: location.keywords[locale] });
}
```

---

### 4.4 Cost / Pricing Pages

**New route:** `src/app/[locale]/cost/[slug]/page.tsx`

**Data file:** `src/content/{locale}/cost-guides.json`

```typescript
interface CostGuide {
  id: string;
  slug: string;               // "aluminum-works", "glass-facades", etc.
  title: string;
  description: string;
  pricingFactors: Array<{ factor: string; impact: "high" | "medium" | "low" }>;
  systemTiers: Array<{ name: string; description: string; relativeRange: string }>;
  faq: FaqItem[];             // min 5 pricing-specific questions
  keywords: { ar: string[]; en: string[] };
  relatedServiceSlug: string; // links back to parent service
}
```

**Page template sections:**
1. Hero (dark, H1 = title, eyebrow "دليل الأسعار 2026")
2. Important Disclaimer (prices vary — get a quote for exact pricing)
3. What Affects the Price (factor cards with impact rating)
4. System / Option Tiers (comparison table: Standard / Premium / Enterprise)
5. How to Get the Best Price (tips list)
6. FAQ (FAQPage schema, min 5 Q&As)
7. CTA: "احصل على عرض سعر مجاني خلال 24 ساعة"

**Metadata:** New `src/seo/metadata/cost-metadata.ts`:
```typescript
export function generateCostMetadata({ guide, locale, path }: CostMetadataParams): Metadata {
  const isAr = locale === "ar";
  const title = isAr
    ? `${guide.title} | مؤسسة الفهد للمقاولات`
    : `${guide.title} | Al Fahd Contracting`;
  return generatePageMetadata({ title, description: guide.description, path, locale,
    keywords: guide.keywords[locale] });
}
```

---

### 4.5 Case Study Pages

**New route:** `src/app/[locale]/case-studies/[slug]/page.tsx`

**Data file:** `src/content/{locale}/case-studies.json`

```typescript
interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  year: number;
  scope: string;              // e.g., "45,000 م² من الواجهات الزجاجية"
  challenge: string;
  solution: string;
  results: Array<{ metric: string; value: string }>;  // quantified metrics
  testimonial?: { quote: string; author: string; role: string };
  technologies: string[];
  coverImage: string;
  gallery: string[];
  relatedServiceSlug: string;
  relatedBlogSlugs: string[];
  keywords: { ar: string[]; en: string[] };
}
```

**Page template sections:**
1. Hero (full-viewport image, H1 = project title, client + year pill)
2. Project Overview (scope, location, year)
3. Challenge Section (detailed problem statement)
4. Our Solution (technical approach + innovation highlights)
5. Results & Metrics (data table with before/after or target vs. achieved)
6. Client Testimonial (quote block)
7. Technologies & Materials (tag grid)
8. Gallery (3-column image grid)
9. PDF Download CTA ("تحميل ملخص المشروع")
10. Related Services + Related Blog Posts (internal linking)
11. "ابدأ مشروعاً مشابهاً" CTA → request-quote

**Schema injection:**
```typescript
// sub-type of Article used for case studies
const caseStudySchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": url,
  headline: caseStudy.title,
  articleSection: "Case Study",
  about: { "@type": "CreativeWork", name: caseStudy.title },
  author: { "@id": `${BASE_URL}/#organization` },
  publisher: { "@id": `${BASE_URL}/#organization` },
  datePublished: `${caseStudy.year}-01-01`,
  image: caseStudy.coverImage,
  keywords: caseStudy.technologies.join(", "),
};
```

---

### 4.6 FAQ Hub Page

**New route:** `src/app/[locale]/faq/page.tsx`

**Data file:** `src/content/{locale}/faq.json`

```typescript
interface FaqHub {
  categories: Array<{
    id: string;
    label: string;           // "الألمنيوم" | "الزجاج" | "الحديد" | "عام" | "التسعير"
    questions: FaqItem[];    // min 5 per category
  }>;
}
```

**Page template sections:**
1. Hero (minimal, H1, eyebrow label)
2. Category Filter Tabs (sticky on desktop, horizontal scroll on mobile)
3. Questions accordion grouped by category
4. "لم تجد إجابتك؟" section → contact form link

**Schema:** Full `FAQPage` JSON-LD covering all questions across all categories.

**Sitemap entry:** Priority 0.7, `changeFrequency: "monthly"`.

---

### 4.7 Author / Team Profile Pages

**New route:** `src/app/[locale]/team/[slug]/page.tsx`

**Data file:** `src/content/{locale}/team.json`

```typescript
interface TeamMember {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  jobTitle: string;
  jobTitleEn: string;
  bio: string;
  specialisations: string[];
  yearsExperience: number;
  photo?: string;             // optional — use placeholder if missing
  blogSlugs: string[];        // articles written by this author
}
```

**Initial authors to create (from blog.json `author` field):**
- م. أحمد الشمري → `ahmed-al-shamri`
- م. سعد العتيبي → `saad-al-otaibi`
- م. خالد الزهراني → `khalid-al-zahrani`
- م. فهد الدوسري → `fahad-al-dosari`
- م. نورة الغامدي → `noura-al-ghamdi`

**Page template:** Name + title + bio + specialisations + articles list.

**Schema:** `Person` + `BreadcrumbList`.

---

### 4.8 Thank You Page

**New route:** `src/app/[locale]/thank-you/page.tsx`

Simple server component. Marked `noindex` via metadata:
```typescript
export const metadata: Metadata = { robots: { index: false, follow: false } };
```

**Page content:**
- Confirmation headline + tick icon
- "سيتواصل معك فريقنا خلال 24 ساعة" promise
- WhatsApp CTA (faster response)
- 3 "قد يهمك أيضاً" service links

**Redirect logic in `quote-client.tsx`:**
```typescript
// After successful form submit:
router.push(`/${locale}/thank-you`);
```

---

## 5. Phase 4 — Content Data Schemas (JSON Files)

### 5.1 `src/content/ar/sub-services.json` Structure

15 entries, one per REQ-005-x. Each entry:
```json
{
  "id": "ss-001",
  "parentSlug": "aluminum-works",
  "slug": "curtain-wall-systems",
  "title": "أنظمة جدران الستائر الألمنيوم",
  "shortDescription": "...",
  "description": "... (400+ words)",
  "benefits": ["...", "..."],
  "applications": ["...", "..."],
  "process": [
    { "step": 1, "title": "...", "description": "..." }
  ],
  "faq": [
    { "question": "...", "answer": "..." }
  ],
  "relatedProjectCategory": "aluminum",
  "keywords": {
    "ar": ["جدار الستائر ألمنيوم الرياض", "..."],
    "en": ["aluminum curtain wall Riyadh", "..."]
  }
}
```

### 5.2 `src/content/ar/industries.json` Structure

6 entries per REQ-003-x.

### 5.3 `src/content/ar/locations.json` Structure

6 entries per REQ-004-x. Each must have unique description text referencing local districts, not duplicate from other location pages.

### 5.4 `src/content/ar/cost-guides.json` Structure

4 entries per REQ-006-x.

### 5.5 `src/content/ar/case-studies.json` Structure

4 entries per REQ-008-x.

### 5.6 `src/content/ar/team.json` Structure

5 author entries.

### 5.7 `src/content/ar/faq.json` Structure

5 category groups, min 5 questions each (25+ total).

---

## 6. Phase 5 — Content Repository Extension

`src/lib/content/content-repository.ts` needs new methods:

```typescript
export interface ContentRepository {
  // Existing methods (unchanged)
  getServices(locale: string): Promise<Service[]>;
  getServiceBySlug(slug: string, locale: string): Promise<Service | null>;
  getProjects(locale: string): Promise<Project[]>;
  getProjectsByCategory(category: string, locale: string): Promise<Project[]>;
  getFeaturedProjects(locale: string): Promise<Project[]>;
  getBlogPosts(locale: string): Promise<BlogPost[]>;

  // New methods to add
  getSubServices(locale: string): Promise<SubService[]>;
  getSubServiceBySlug(parentSlug: string, slug: string, locale: string): Promise<SubService | null>;
  getIndustries(locale: string): Promise<Industry[]>;
  getIndustryBySlug(slug: string, locale: string): Promise<Industry | null>;
  getLocations(locale: string): Promise<Location[]>;
  getLocationBySlug(slug: string, locale: string): Promise<Location | null>;
  getCostGuides(locale: string): Promise<CostGuide[]>;
  getCostGuideBySlug(slug: string, locale: string): Promise<CostGuide | null>;
  getCaseStudies(locale: string): Promise<CaseStudy[]>;
  getCaseStudyBySlug(slug: string, locale: string): Promise<CaseStudy | null>;
  getFaqHub(locale: string): Promise<FaqHub>;
  getTeamMembers(locale: string): Promise<TeamMember[]>;
  getTeamMemberBySlug(slug: string, locale: string): Promise<TeamMember | null>;
}
```

All new methods follow the same JSON import pattern used by existing methods in `json-provider.ts`.

---

## 7. Phase 6 — Technical SEO Improvements

### 7.1 Next.js `<Image>` Migration

**Files to update:**
- `src/app/[locale]/projects/[slug]/page.tsx` — cover image, gallery images
- `src/app/[locale]/services/[slug]/page.tsx` — hero image, related project thumbnails
- `src/app/[locale]/blog/[slug]/page.tsx` — cover image, related post thumbnails
- `src/shared/components/layout/header.tsx` — logo image (if `<img>` used)

**Pattern for external CDN images:**
```tsx
import Image from "next/image";

// Replace:
<img src={project.coverImage} alt={project.title} referrerPolicy="no-referrer"
  className="w-full h-full object-cover opacity-40" />

// With:
<Image
  src={project.coverImage}
  alt={project.title}
  fill
  className="object-cover opacity-40"
  sizes="100vw"
  priority={isAboveFold}
/>
```

`next.config.mjs` already has `lh3.googleusercontent.com` in `remotePatterns` — no change needed there.

---

### 7.2 HTTP Security Headers

**File:** `next.config.mjs`

```javascript
const nextConfig = {
  // ... existing config ...
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
```

---

### 7.3 GA4 Conversion Events

**File:** `src/app/[locale]/layout.tsx` — add gtag helper:
```typescript
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}
```

**Events to fire:**

| Location | Event Name | Trigger |
|---|---|---|
| `quote-client.tsx` | `generate_lead` | form submit success |
| `contact-client.tsx` | `contact` | form submit success |
| `whatsapp-button.tsx` | `click_whatsapp` | WhatsApp link click |
| All layout WhatsApp links | `click_whatsapp` | any `wa.me/` click |
| Any `tel:` link | `click_phone` | phone link click |
| Primary CTA buttons | `click_cta` | CTA button click (with `cta_location` param) |

---

### 7.4 Sitemap Extension

Add new URL groups to `src/app/sitemap.ts`:

```typescript
// Sub-service pages
const subServiceUrls = LOCALES.flatMap((locale) =>
  subServices.map((s) => ({
    url: `${BASE_URL}/${locale}/services/${s.parentSlug}/${s.slug}`,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.85,
    alternates: buildAlternates(`/services/${s.parentSlug}/${s.slug}`),
  }))
);

// Industry pages
const industryUrls = LOCALES.flatMap((locale) =>
  industries.map((i) => ({
    url: `${BASE_URL}/${locale}/industries/${i.slug}`,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.9,
    alternates: buildAlternates(`/industries/${i.slug}`),
  }))
);

// Location pages
const locationUrls = LOCALES.flatMap((locale) =>
  locations.map((l) => ({
    url: `${BASE_URL}/${locale}/locations/${l.slug}`,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.85,
    alternates: buildAlternates(`/locations/${l.slug}`),
  }))
);

// Cost pages
const costUrls = LOCALES.flatMap((locale) =>
  costGuides.map((c) => ({
    url: `${BASE_URL}/${locale}/cost/${c.slug}`,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.9,
    alternates: buildAlternates(`/cost/${c.slug}`),
  }))
);

// Case study pages
const caseStudyUrls = LOCALES.flatMap((locale) =>
  caseStudies.map((cs) => ({
    url: `${BASE_URL}/${locale}/case-studies/${cs.slug}`,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8,
    alternates: buildAlternates(`/case-studies/${cs.slug}`),
  }))
);

// FAQ hub
const faqUrls = LOCALES.map((locale) => ({
  url: `${BASE_URL}/${locale}/faq`,
  changeFrequency: "monthly" as ChangeFreq,
  priority: 0.7,
  alternates: buildAlternates("/faq"),
}));

return [
  ...staticUrls, ...serviceUrls, ...subServiceUrls, ...industryUrls,
  ...locationUrls, ...costUrls, ...caseStudyUrls, ...faqUrls,
  ...projectUrls, ...blogUrls,
];
```

---

## 8. Phase 7 — Internal Linking Strategy

### 8.1 Blog Post Internal Links

Add a `RelatedServices` component to `src/app/[locale]/blog/[slug]/page.tsx`:

```tsx
// After article body, before tags section:
<RelatedServices locale={locale} serviceSlug={post.relatedServiceSlug} />
```

Add `relatedServiceSlug` field to `blog.json` entries.

### 8.2 Service → Blog Links

Add to `src/app/[locale]/services/[slug]/page.tsx`, after FAQ section:

```tsx
<RelatedArticles locale={locale} serviceSlug={slug} />
```

`RelatedArticles` queries `contentRepository.getBlogPosts(locale)` filtered by `post.relatedServiceSlug === serviceSlug`, shows first 3.

### 8.3 Project → Service Links

Add to project detail page footer sidebar:
```tsx
<Link href={`/${locale}/services/${categoryToServiceSlug[project.category]}`}>
  {locale === "ar" ? "اعرف المزيد عن خدمة " + serviceName : `Learn more: ${serviceName}`}
</Link>
```

**Category to service slug mapping:**
```typescript
const categoryToServiceSlug: Record<string, string> = {
  aluminum: "aluminum-works",
  glass: "glass-works",
  steel: "steel-works",
};
```

### 8.4 Cross-Service Links

Add to each service detail page description section:
```tsx
<p className="text-sm text-[#747783] mt-4">
  {locale === "ar"
    ? `تقدم الفهد أيضاً `
    : `Al Fahd also provides `}
  <Link href={`/${locale}/services/${siblingSlug}`}>{siblingServiceName}</Link>
  {locale === "ar" ? ` ضمن منظومة خدماتنا المتكاملة.` : ` as part of our integrated service offering.`}
</p>
```

---

## 9. Phase 8 — i18n Locale File Updates

### 9.1 New Namespace Keys in `ar.json` / `en.json`

```json
{
  "industries": {
    "title": "القطاعات التي نخدمها",
    "description": "حلول متخصصة لكل قطاع",
    "learnMore": "اعرف أكثر",
    "getQuote": "طلب عرض سعر"
  },
  "locations": {
    "title": "نخدم جميع مناطق المملكة",
    "description": "فريق ميداني وموردون معتمدون في كل مدينة",
    "contact": "تواصل معنا في",
    "projects": "مشاريعنا في"
  },
  "cost": {
    "title": "دليل الأسعار",
    "disclaimer": "الأسعار تختلف حسب مواصفات المشروع — اطلب عرض سعر مجاني للحصول على تقدير دقيق",
    "factors": "العوامل المؤثرة في السعر",
    "tiers": "مستويات الأنظمة",
    "cta": "احصل على عرض سعر مجاني"
  },
  "caseStudies": {
    "title": "دراسات الحالة",
    "description": "مشاريع حقيقية، نتائج قابلة للقياس",
    "challenge": "التحدي",
    "solution": "الحل",
    "results": "النتائج والمقاييس",
    "testimonial": "رأي العميل",
    "downloadSummary": "تحميل ملخص المشروع",
    "startSimilar": "ابدأ مشروعاً مشابهاً"
  },
  "faq": {
    "title": "الأسئلة الشائعة",
    "description": "إجابات شاملة لأكثر الأسئلة التي يطرحها عملاؤنا",
    "notFound": "لم تجد إجابتك؟",
    "contactUs": "تواصل معنا مباشرة"
  },
  "team": {
    "title": "فريقنا الهندسي",
    "articles": "مقالات المهندس",
    "specialisations": "التخصصات"
  },
  "thankYou": {
    "headline": "شكراً — تم استلام طلبك",
    "subheading": "سيتواصل معك فريقنا الهندسي خلال 24 ساعة",
    "whatsapp": "تواصل عبر واتساب للرد الفوري",
    "explore": "استعرض خدماتنا أثناء الانتظار"
  }
}
```

---

## 10. Phase 9 — Navigation & Footer Updates

### 10.1 Header Navigation

Add dropdown items to the existing nav in `src/shared/components/layout/header.tsx`:

**Services dropdown** — add sub-service links grouped under each service:
```
خدماتنا
├── أعمال الألمنيوم
│   ├── جدران الستائر
│   ├── نوافذ وأبواب الألمنيوم
│   └── واجهات الألمنيوم
├── أعمال الزجاج
│   ├── الواجهات الزجاجية الإنشائية
│   └── Spider Glass
└── أعمال الحديد
    ├── الهياكل الفولاذية
    └── المستودعات الحديدية
```

**New top-level nav items** (add after "مشاريعنا"):
- القطاعات → `/industries` (links to industry index or dropdown)

### 10.2 Footer Updates

Add two new columns / links sections:
```
القطاعات:                    الموارد:
- المشاريع الحكومية          - الأسئلة الشائعة
- المطورون العقاريون         - دليل الأسعار
- المشاريع التجارية          - دراسات الحالة
- مشاريع الضيافة             - المدونة الهندسية
- الفلل السكنية
```

Add Google Maps link:
```tsx
<a href="https://g.page/alfahd-contracting" target="_blank" rel="noopener">
  موقعنا على خرائط Google
</a>
```

---

## 11. Phase 10 — Mobile CTA Bar (REQ-013-3)

**New component:** `src/shared/components/layout/mobile-cta-bar.tsx`

```tsx
"use client";
export function MobileCTABar({ locale, whatsappNumber }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex border-t border-gray-200 bg-white shadow-lg">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        onClick={() => trackEvent("click_whatsapp", { location: "mobile_bar" })}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white font-bold text-sm"
      >
        {/* WhatsApp SVG icon */}
        {locale === "ar" ? "واتساب" : "WhatsApp"}
      </a>
      <a
        href="tel:+966114459222"
        onClick={() => trackEvent("click_phone", { location: "mobile_bar" })}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#002868] text-white font-bold text-sm"
      >
        {/* Phone icon */}
        {locale === "ar" ? "اتصل الآن" : "Call Now"}
      </a>
    </div>
  );
}
```

Mount in `src/app/[locale]/layout.tsx`, hidden on pages `pathname.includes("request-quote") || pathname.includes("portal")`.

---

## 12. Correctness Properties for Property-Based Testing

The following invariants must hold across the entire implementation:

### P-001: Sitemap URL Validity
Every URL emitted by `sitemap.ts` must resolve to an HTTP 200 response. No sitemap URL may return 404, 301, or 500.

### P-002: Schema Validity
For every page that injects JSON-LD, the schema must pass Google Rich Results Test validation with zero errors. Every `@id` reference must resolve to a defined entity.

### P-003: NAP Consistency
The values `name`, `telephone`, and `address.streetAddress` in `organizationSchema()` must exactly match the corresponding values in `ar.json` `footer` namespace and `en.json` `footer` namespace.

### P-004: Category Coherence
For every service slug `S`, the `categoryMap[S]` value used in `RelatedProjects` must match at least one `category` value in `projects.json`. The set of category values across all project JSON files must equal `{"aluminum", "glass", "steel"}`.

### P-005: hreflang Symmetry
For every page URL `P` in locale `ar`, there must exist a corresponding `en` variant, and vice versa. The `hreflang="x-default"` attribute must always point to the `ar` variant.

### P-006: Internal Link Reachability
Every internal `<Link href>` value in the codebase must resolve to a route registered in `generateStaticParams()` or a static page file. No dead internal links.

### P-007: Blog Author Schema Integrity
For every blog post where `author !== "فريق الفهد الهندسي"` and `author !== "إدارة الفهد للمقاولات"`, there must exist a corresponding entry in `team.json` with a matching `name` field.

### P-008: OG Image Existence
The file at `public/images/og-default.jpg` must exist and be ≥1200px wide. Every page that does not supply a custom `ogImage` must reference this file.

### P-009: Content Uniqueness for Location Pages
No two location pages may share more than 40% of their `description` text. Each description must contain at least one unique district name or landmark reference.

### P-010: Cost Page Non-Disclosure
Cost guide pages must not contain specific numeric price values (SAR amounts). They may contain relative ranges ("أقل تكلفة", "تكلفة متوسطة", "تكلفة أعلى") but not absolute prices.

---

## 13. File Change Summary

### Files Modified (existing)
| File | Change |
|---|---|
| `src/app/sitemap.ts` | Fix service slugs; add 5 new URL groups |
| `src/app/[locale]/layout.tsx` | Add MobileCTABar; add GA4 build assertion |
| `src/app/[locale]/about/page.tsx` | Add Organization+AboutPage schema |
| `src/app/[locale]/contact/page.tsx` | Add LocalBusiness+ContactPage schema |
| `src/app/[locale]/services/page.tsx` | Add ItemList+BreadcrumbList schema |
| `src/app/[locale]/services/[slug]/page.tsx` | Fix categoryMap; add cross-service links; add RelatedArticles |
| `src/app/[locale]/projects/page.tsx` | Add ItemList+BreadcrumbList schema |
| `src/app/[locale]/projects/[slug]/page.tsx` | Fix CATEGORY_LABELS; add CreativeWork+BreadcrumbList schema; add service link |
| `src/app/[locale]/blog/[slug]/page.tsx` | Add Person schema for named authors; add RelatedServices |
| `src/app/[locale]/page.tsx` | Add VideoObject schema |
| `src/app/[locale]/request-quote/quote-client.tsx` | Redirect to thank-you; fire generate_lead event |
| `src/app/[locale]/contact/contact-client.tsx` | Fire contact event |
| `src/seo/schema/organization.ts` | Add 8 new schema functions; enhance organizationSchema |
| `src/seo/canonical/index.ts` | Fix example.com fallback |
| `src/seo/metadata/service-metadata.ts` | Fix "15+" → "25+"; add generateSubServiceMetadata |
| `src/content/ar/projects.json` | Fix category names |
| `src/content/en/projects.json` | Fix category names |
| `src/content/locales/ar.json` | Fix founding year; add new namespace keys |
| `src/content/locales/en.json` | Fix founding year; add new namespace keys |
| `src/shared/components/layout/footer.tsx` | Add new links; add GBP link |
| `src/shared/components/layout/header.tsx` | Add service sub-items dropdown; add Industries nav item |
| `src/shared/components/layout/whatsapp-button.tsx` | Replace placeholder number; fire click_whatsapp |
| `next.config.mjs` | Add security headers |
| `.env.example` | Document NEXT_PUBLIC_SITE_URL |

### Files Created (new)
| File | Purpose |
|---|---|
| `src/app/[locale]/services/[slug]/[sub-slug]/page.tsx` | Sub-service pages (15 pages) |
| `src/app/[locale]/industries/[slug]/page.tsx` | Industry pages (6 pages) |
| `src/app/[locale]/locations/[slug]/page.tsx` | Location pages (6 pages) |
| `src/app/[locale]/cost/[slug]/page.tsx` | Cost guide pages (4 pages) |
| `src/app/[locale]/case-studies/[slug]/page.tsx` | Case study pages (4 pages) |
| `src/app/[locale]/faq/page.tsx` | FAQ hub |
| `src/app/[locale]/team/[slug]/page.tsx` | Author profile pages |
| `src/app/[locale]/thank-you/page.tsx` | Conversion tracking page |
| `src/seo/metadata/industry-metadata.ts` | Industry page metadata generator |
| `src/seo/metadata/location-metadata.ts` | Location page metadata generator |
| `src/seo/metadata/cost-metadata.ts` | Cost page metadata generator |
| `src/seo/metadata/case-study-metadata.ts` | Case study metadata generator |
| `src/shared/components/layout/mobile-cta-bar.tsx` | Mobile sticky CTA bar |
| `src/shared/components/ui/author-bio.tsx` | Author bio box for blog posts |
| `src/shared/components/ui/related-services.tsx` | Blog post → service links |
| `src/shared/components/ui/related-articles.tsx` | Service → blog links |
| `src/content/ar/sub-services.json` | 15 sub-service data entries |
| `src/content/ar/industries.json` | 6 industry data entries |
| `src/content/ar/locations.json` | 6 location data entries |
| `src/content/ar/cost-guides.json` | 4 cost guide data entries |
| `src/content/ar/case-studies.json` | 4 case study data entries |
| `src/content/ar/team.json` | 5 author profiles |
| `src/content/ar/faq.json` | FAQ hub data (25+ Q&As) |
| `src/content/en/sub-services.json` | EN versions |
| `src/content/en/industries.json` | EN versions |
| `src/content/en/locations.json` | EN versions |
| `src/content/en/cost-guides.json` | EN versions |
| `src/content/en/case-studies.json` | EN versions |
| `src/content/en/team.json` | EN versions |
| `src/content/en/faq.json` | EN versions |
| `src/content/en/blog.json` | 8 translated blog posts (extend existing) |
| `public/images/og-default.jpg` | OG fallback image (1200×630px) |
| `.env.example` | Environment variable documentation |

---

## 14. Implementation Sequence

```
Phase 1 (Week 1) — Critical Bugs: REQ-001-x
  ├── Fix sitemap slugs
  ├── Fix category names in JSON + page
  ├── Fix canonical fallback
  ├── Fix founding year across all files
  ├── Create og-default.jpg
  ├── Update WhatsApp number
  └── Add .env.example + build guard

Phase 2 (Week 1-2) — Schema: REQ-002-x
  ├── Add all new schema functions to organization.ts
  ├── Inject schemas on About, Contact, Projects pages
  ├── Add VideoObject to home page
  └── Update articleSchema with Person support

Phase 3 (Week 2-3) — New Routes: REQ-003 to REQ-008
  ├── Create content JSON files (AR + EN)
  ├── Create page templates
  ├── Add metadata generators
  └── Update sitemap

Phase 4 (Week 3-4) — Content: REQ-009
  ├── Write/translate blog content
  ├── Write pillar pages
  └── Write comparison + local content

Phase 5 (Week 4-5) — Local SEO + Technical: REQ-010, REQ-011
  ├── NAP consistency fixes
  ├── Security headers
  ├── Image component migration
  ├── GA4 events
  ├── Thank You page
  └── Mobile CTA bar

Phase 6 (Week 5-6) — Internal Linking + CRO: REQ-012, REQ-013
  ├── RelatedServices + RelatedArticles components
  ├── Cross-service links
  ├── Author bio components
  └── Social proof on quote page
```

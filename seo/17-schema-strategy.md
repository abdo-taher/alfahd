# 17 — Schema Strategy
## مؤسسة الفهد للمقاولات | Al-Fahad Contracting Company

> **Document Purpose:** Define all Schema.org structured data implementations for the Al-Fahad website — which types to use, which pages they apply to, required/recommended properties, JSON-LD examples, and bilingual (Arabic/English) handling.

---

## Overview: Why Schema Matters for AI Search Citations

Schema markup in 2025 serves a dual purpose: it helps Google generate rich results (star ratings, FAQ boxes, breadcrumbs) AND it helps AI systems (Google AI Overviews, ChatGPT, Gemini, Perplexity) recognize and cite Al-Fahad as a named entity with verified attributes.

When an AI system is asked "أفضل شركة ألمنيوم في الرياض" (best aluminum company in Riyadh), it draws on structured data, entity recognition, and factual content. A site with complete Organization, LocalBusiness, and Service Schema is dramatically more likely to be cited than an identical site without it.

**Implementation principle:** All Schema on the Al-Fahad site is implemented as JSON-LD (not microdata or RDFa), injected in the `<head>` section via Next.js metadata API or `<Script>` component in the layout.

---

## Schema Type 1: Organization

**Pages:** Homepage, About page (also referenced in all page footers via sitelinks)

**Purpose:** Establishes Al-Fahad as a named entity in Google's Knowledge Graph. This is the foundation for AI search recognition.

**Required Properties:**
- `@type`: Organization
- `name`: Arabic + English (see bilingual section below)
- `url`: Canonical homepage URL
- `logo`: ImageObject URL
- `contactPoint`: Phone + email
- `address`: Full Saudi postal address

**Recommended Properties:**
- `foundingDate`: 1999
- `numberOfEmployees`: approximate range
- `areaServed`: Saudi Arabia + GCC
- `sameAs`: LinkedIn, Wikidata (if established), Saudi Council of Engineers profile URL
- `description`: Bilingual description

**JSON-LD Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Al-Fahad Contracting Company",
  "alternateName": "مؤسسة الفهد للمقاولات",
  "url": "https://alfahad.com/en/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://alfahad.com/images/logo.png",
    "width": 200,
    "height": 60
  },
  "description": "Al-Fahad Contracting Company is a Riyadh-based specialty contractor with 25+ years of experience in aluminum works, glass facade engineering, and steel structures. Serving real estate developers, government projects, and commercial clients across Saudi Arabia.",
  "foundingDate": "1999",
  "areaServed": ["Saudi Arabia", "GCC"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966-XX-XXX-XXXX",
    "contactType": "sales",
    "availableLanguage": ["Arabic", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/al-fahad-contracting",
    "https://www.google.com/maps?cid=[GBP_CID]"
  ]
}
```

**Expected SEO Benefit:** Knowledge Panel appearance for branded searches; AI search entity recognition; E-E-A-T signal.

---

## Schema Type 2: LocalBusiness

**Pages:** Homepage, Contact page, all Location pages

**Purpose:** Activates local SEO rich results; feeds Google Local Pack ranking signals; signals physical Saudi presence to AI systems.

**Required Properties:**
- `@type`: LocalBusiness (use the most specific subtype: `GeneralContractor`)
- `name`, `alternateName`
- `address`: PostalAddress with full Saudi fields
- `telephone`
- `geo`: GeoCoordinates (latitude/longitude of Riyadh office)
- `openingHours`
- `priceRange`: `$$` (mid-premium indicator)

**Recommended Properties:**
- `hasMap`: Google Maps link
- `aggregateRating`: Once sufficient reviews are collected (min. 10 reviews)
- `image`: Array of project photos
- `serviceArea`: GeoCircle or named regions

**JSON-LD Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Al-Fahad Contracting Company",
  "alternateName": "مؤسسة الفهد للمقاولات",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Riyadh",
    "addressRegion": "Riyadh Province",
    "postalCode": "[Postal Code]",
    "addressCountry": "SA"
  },
  "telephone": "+966-XX-XXX-XXXX",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 24.7136,
    "longitude": 46.6753
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "hasMap": "https://maps.google.com/?cid=[GBP_CID]",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "geoRadius": "100000"
  }
}
```

**Expected SEO Benefit:** Local Pack eligibility; rich result local business panel; geo-ranking signals.

---

## Schema Type 3: Service

**Pages:** Each Core_Service pillar page (3) and each sub-service page (20)

**Purpose:** Tells Google precisely what services Al-Fahad offers, for whom, and where. Critical for commercial-intent query alignment.

**Required Properties:**
- `@type`: Service
- `name`: Service name (Arabic + English via `alternateName`)
- `provider`: Organization reference
- `areaServed`: City/region

**Recommended Properties:**
- `description`: 50–150 word service description
- `serviceType`: Category label (e.g., "Aluminum Contractor")
- `hasOfferCatalog`: For hub pages, list of sub-services
- `aggregateRating`: When reviews available

**JSON-LD Example (Glass Works pillar page):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Glass Facade Engineering",
  "alternateName": "هندسة الواجهات الزجاجية",
  "serviceType": "Glass Facade Contractor",
  "provider": {
    "@type": "Organization",
    "name": "Al-Fahad Contracting Company",
    "alternateName": "مؤسسة الفهد للمقاولات"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Saudi Arabia"
  },
  "description": "Professional glass facade engineering services in Riyadh and Saudi Arabia, including tempered glass, laminated glass, curtain wall systems, spider glass, structural glass, and glass partitions for commercial, government, and hospitality projects.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Glass Works Sub-Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Tempered Glass"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Laminated Glass"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Glass Facades"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Curtain Wall Systems"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Spider Glass"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Structural Glass"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Glass Partitions"}}
    ]
  }
}
```

**Expected SEO Benefit:** Service-level entity recognition; commercial query alignment; eligibility for rich service results.

---

## Schema Type 4: FAQPage

**Pages:** Service pillar pages (FAQ section), dedicated FAQ hub page, FAQ-heavy blog articles

**Purpose:** Enables FAQ rich results in Google Search; feeds PAA boxes; provides structured Q&A for AI citation.

**Required Properties:**
- `@type`: FAQPage
- `mainEntity`: Array of Question/Answer pairs

**Recommended Properties:**
- Minimum 3 questions per page; maximum 10 for best rendering
- Answers should be 40–200 words: long enough to be comprehensive, short enough to render as featured snippet

**JSON-LD Example (see full examples in 12-faq-seo-strategy.md):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a curtain wall system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A curtain wall is a non-structural outer covering of a building, consisting of aluminum framing and glass panels that do not carry the building's structural loads. It provides weather protection, thermal insulation, and aesthetic finish while being supported by the building's primary structure. Al-Fahad installs stick, unitized, and semi-unitized curtain wall systems across Saudi Arabia."
      }
    }
  ]
}
```

**Expected SEO Benefit:** FAQ rich results; PAA box appearances; AI Overview citations.

---

## Schema Type 5: Article

**Pages:** All blog articles, all case study pages, all resource guides

**Purpose:** Signals editorial content; enables article rich results; provides author/publisher attribution for E-E-A-T.

**Required Properties:**
- `@type`: Article (or TechArticle for highly technical content)
- `headline`: Article title
- `author`: Person or Organization
- `publisher`: Organization with logo
- `datePublished`: ISO date
- `image`: Featured image URL

**Recommended Properties:**
- `dateModified`: Last update date (important for ranking freshness)
- `description`: 2–3 sentence summary
- `keywords`: Primary keywords
- `inLanguage`: "ar" or "en"
- `about`: Service or topic (links to entity)

**Expected SEO Benefit:** Article rich results; News-style discovery; author credibility for E-E-A-T scoring.

---

## Schema Type 6: BreadcrumbList

**Pages:** All pages (implemented site-wide via Next.js layout)

**Purpose:** Breadcrumb rich results in SERPs; Google shows the page hierarchy in the URL display.

**JSON-LD Example (Aluminum Windows sub-service page):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://alfahad.com/en/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://alfahad.com/en/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Aluminum Works",
      "item": "https://alfahad.com/en/services/aluminum/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Aluminum Windows",
      "item": "https://alfahad.com/en/services/aluminum/windows/"
    }
  ]
}
```

**Expected SEO Benefit:** Breadcrumb display in SERP URLs; improved click-through rate; hierarchy clarity for Google.

---

## Schema Type 7: CreativeWork (Project Pages)

**Pages:** All individual project pages

**Purpose:** Categorizes project portfolio pages as professional creative work; signals construction expertise.

**Full JSON-LD example:** See [08-project-seo-strategy.md](./08-project-seo-strategy.md)

**Expected SEO Benefit:** Portfolio page indexing and ranking for project + location + year queries.

---

## Schema Type 8: Review / AggregateRating

**Pages:** Homepage, service pillar pages, About page

**Purpose:** Star ratings in search results increase click-through rates by 15–30%.

**Implementation note:** Only add AggregateRating Schema once there are 10+ genuine Google reviews. Using Schema with fake or insufficient review counts violates Google guidelines.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Al-Fahad Contracting Company",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47",
    "bestRating": "5"
  }
}
```

---

## Schema Type 9: VideoObject

**Pages:** Any page with an embedded video (project showcase, testimonials, process explainers)

**Purpose:** Video rich results in Google Search; YouTube optimization sync.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Aluminum Curtain Wall Installation — North Riyadh Commercial Tower",
  "description": "Time-lapse of Al-Fahad Contracting installing 3,200 sqm of aluminum curtain wall on a 14-floor commercial tower in North Riyadh.",
  "thumbnailUrl": "https://alfahad.com/videos/curtain-wall-riyadh-thumbnail.jpg",
  "uploadDate": "2024-03-15",
  "duration": "PT2M30S",
  "contentUrl": "https://alfahad.com/videos/curtain-wall-riyadh.mp4",
  "embedUrl": "https://www.youtube.com/embed/[VIDEO_ID]"
}
```

---

## Schema Type 10: ImageObject

**Pages:** Project gallery pages, service pages with significant images

**Purpose:** Image search visibility; AI image citation; enhanced indexing.

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "Aluminum facade installation North Riyadh 2023",
  "contentUrl": "https://alfahad.com/projects/aluminum-facade-north-riyadh-2023/hero.jpg",
  "description": "Completed aluminum curtain wall facade on a 14-floor commercial tower in North Riyadh, installed by Al-Fahad Contracting Company in 2023.",
  "license": "https://alfahad.com/copyright/",
  "creator": {
    "@type": "Organization",
    "name": "Al-Fahad Contracting Company"
  }
}
```

---

## Schema Type 11: Person

**Pages:** About page (team section), Author bylines on blog articles

**Purpose:** Author credibility for E-E-A-T; Google author entity recognition; AI citation of named experts.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Engineer Name]",
  "jobTitle": "Facade Engineering Manager",
  "worksFor": {
    "@type": "Organization",
    "name": "Al-Fahad Contracting Company"
  },
  "knowsAbout": ["Aluminum Facades", "Glass Curtain Walls", "Facade Engineering", "Saudi Construction"]
}
```

---

## Bilingual Schema: Arabic/English Handling

For all Schema types, handle bilingual content using these properties:

| Property | Arabic | English | How to Implement |
|---|---|---|---|
| Primary `name` | Arabic form | — | Use Arabic for ar-locale pages, English for en-locale pages |
| `alternateName` | — | English form on Arabic pages | `"alternateName": "Al-Fahad Contracting Company"` on Arabic pages; `"alternateName": "مؤسسة الفهد للمقاولات"` on English pages |
| `description` | Arabic text | English text | Match the page locale |
| `inLanguage` | "ar" | "en" | Add to all Article, FAQPage, and content Schema |

**Example for Arabic page:**
```json
{
  "@type": "Organization",
  "name": "مؤسسة الفهد للمقاولات",
  "alternateName": "Al-Fahad Contracting Company",
  "inLanguage": "ar"
}
```

**Example for English page:**
```json
{
  "@type": "Organization",
  "name": "Al-Fahad Contracting Company",
  "alternateName": "مؤسسة الفهد للمقاولات",
  "inLanguage": "en"
}
```

---

## Validation

Before deploying any Schema to production:

1. **Google Rich Results Test** — `search.google.com/test/rich-results` — Validate JSON-LD for rich result eligibility
2. **Schema.org Validator** — `validator.schema.org` — Check for property errors and warnings
3. **Google Search Console** — Monitor "Enhancements" section after deployment for error reports
4. **Manual SERP check** — After 2–4 weeks, search for the page in Google and confirm rich results are displaying

---

## Cross-References

- FAQ Schema implementation details → [12-faq-seo-strategy.md](./12-faq-seo-strategy.md)
- Technical SEO implementation in Next.js → [22-technical-seo-requirements.md](./22-technical-seo-requirements.md)
- AI search entity establishment → [20-ai-search-optimization.md](./20-ai-search-optimization.md)

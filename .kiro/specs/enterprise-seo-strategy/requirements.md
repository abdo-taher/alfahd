# Enterprise SEO Requirements
# مؤسسة الفهد للمقاولات — alfahd-contracting.com

**Version:** 2.0  
**Based on:** Full Enterprise SEO Audit (June 2026)  
**Scope:** All fixes, enhancements, and new pages required to achieve Google dominance in Riyadh & Saudi Arabia

---

## REQ-001 — Critical Bug Fixes (Pre-Launch Blockers)

### REQ-001-1: Fix Sitemap Service Slug Mismatch
**Priority:** CRITICAL  
**Problem:** `src/app/sitemap.ts` generates service URLs as `/ar/services/aluminum`, `/ar/services/glass`, `/ar/services/steel` — but the actual Next.js routes are `/ar/services/aluminum-works`, `/ar/services/glass-works`, `/ar/services/steel-works`. All service entries in the sitemap resolve to 404s.  
**Requirement:** Update `sitemap.ts` to use the correct slugs: `aluminum-works`, `glass-works`, `steel-works`.  
**Acceptance Criteria:**
- `GET /ar/services/aluminum-works` returns 200
- `GET /ar/services/glass` returns 404 (not indexed)
- Sitemap XML shows correct URLs for all 3 services × 2 locales

---

### REQ-001-2: Create Missing OG Default Image
**Priority:** CRITICAL  
**Problem:** `src/seo/metadata/page-metadata.ts` falls back to `/images/og-default.jpg` for all pages without a custom OG image. This file does not exist in `/public/images/`. Every shared link across all social platforms shows a broken image preview.  
**Requirement:** Create and place a 1200×630px branded OG image at `/public/images/og-default.jpg`.  
**Acceptance Criteria:**
- File exists at `/public/images/og-default.jpg`
- Image dimensions: 1200×630px minimum
- Includes company logo, name, tagline in Arabic
- File size under 300KB (WebP or optimised JPEG)

---

### REQ-001-3: Fix Project Category Name Mismatch
**Priority:** CRITICAL  
**Problem:** Three separate mismatches cause the "Related Projects" section to be permanently empty for two services:
- `src/content/ar/projects.json` uses `"aluminium"` (British) but `contentRepository.getProjectsByCategory()` is called with `"aluminum"` (American)
- `projects.json` uses `"iron"` for steel projects but the service-to-category map in `services/[slug]/page.tsx` maps `"steel-works" → "steel"`  
**Requirement:** Standardise all category names to: `"aluminum"`, `"glass"`, `"steel"` across all JSON files, content repository, and page components.  
**Acceptance Criteria:**
- `/ar/services/aluminum-works` Related Projects section shows ≥1 project
- `/ar/services/steel-works` Related Projects section shows ≥1 project
- All category filters on `/projects` page work correctly

---

### REQ-001-4: Fix WhatsApp Placeholder Phone Number
**Priority:** CRITICAL  
**Problem:** Service pages and layout contain `href="https://wa.me/966500000000"` — a placeholder number. All WhatsApp CTAs are non-functional.  
**Requirement:** Replace all instances of `966500000000` with the real business WhatsApp number.  
**Acceptance Criteria:**
- All `wa.me/` links use the verified business number
- WhatsApp click opens correct contact in WhatsApp

---

### REQ-001-5: Fix Founding Year Inconsistency
**Priority:** HIGH  
**Problem:** The company's founding year/experience is stated inconsistently:
- Steering docs: "~1999", "25+ years"
- `ar.json` locale: "25+ عاماً" and "500+ مشروع"
- `organization.ts` schema: "15 عاماً" in description
- About page timeline: starts from 2008  
**Requirement:** Standardise to "تأسست عام 1999" / "25+ عاماً من الخبرة" across all pages, JSON-LD, locale files, and components.  
**Acceptance Criteria:**
- `organization.ts` description uses 25+ years
- `ar.json` stats block uses 25+
- About page timeline starts at 1999 milestone
- No page states "15 years"

---

### REQ-001-6: Fix NEXT_PUBLIC_SITE_URL Environment Variable
**Priority:** HIGH  
**Problem:** The base URL defaults to `"https://alfahd-contracting.com"` via `process.env.NEXT_PUBLIC_SITE_URL || "..."` hardcode. If the env var is missing in production, canonical URLs, sitemap, and OG tags all still work — but any staging/preview deployment will emit wrong canonical URLs pointing to production.  
**Requirement:** Ensure `.env.example` documents `NEXT_PUBLIC_SITE_URL`. Add a build-time assertion that throws if it is missing in non-development environments.  
**Acceptance Criteria:**
- `.env.example` contains `NEXT_PUBLIC_SITE_URL=https://alfahd-contracting.com`
- Build fails with clear error if `NEXT_PUBLIC_SITE_URL` is unset in production

---

### REQ-001-7: Fix Canonical Fallback in `src/seo/canonical/index.ts`
**Priority:** MEDIUM  
**Problem:** File uses `https://example.com` as fallback URL instead of the correct base domain.  
**Requirement:** Replace `https://example.com` with `process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com"`.  
**Acceptance Criteria:**
- No reference to `example.com` in any SEO utility file

---

## REQ-002 — Schema / JSON-LD Enhancements

### REQ-002-1: Add JSON-LD to About Page
**Priority:** HIGH  
**Problem:** `/about` page has no structured data. Google cannot identify this as an authoritative company profile page.  
**Requirement:** Inject `Organization` + `AboutPage` + `BreadcrumbList` JSON-LD into `/[locale]/about/page.tsx`.  
**Acceptance Criteria:**
- `Organization` schema references `@id: BASE_URL/#organization`
- `BreadcrumbList` has 2 items: Home → About
- Passes Google Rich Results Test with no errors

---

### REQ-002-2: Add JSON-LD to Contact Page
**Priority:** HIGH  
**Problem:** `/contact` page has no structured data. Local SEO signal is missing.  
**Requirement:** Inject `LocalBusiness` + `ContactPage` + `BreadcrumbList` JSON-LD into `/[locale]/contact/page.tsx`.  
**Schema must include:**
- `telephone`, `email`, `address`, `openingHoursSpecification`, `geo`
- `contactPoint` with `contactType: "customer service"`  
**Acceptance Criteria:**
- Schema passes Google Rich Results Test
- NAP (Name, Address, Phone) in schema exactly matches footer text

---

### REQ-002-3: Add JSON-LD to Projects Index Page
**Priority:** HIGH  
**Requirement:** Inject `ItemList` + `BreadcrumbList` JSON-LD into `/[locale]/projects/page.tsx`.  
**ItemList must include:** Each project as a `ListItem` with `url`, `name`, `position`.  
**Acceptance Criteria:**
- Schema validates without errors
- All 9 projects appear in ItemList

---

### REQ-002-4: Add JSON-LD to Project Detail Pages
**Priority:** HIGH  
**Problem:** `/projects/[slug]` pages have no structured data at all — no breadcrumb, no project schema.  
**Requirement:** Inject `CreativeWork` (or `ConstructionProject`) + `BreadcrumbList` JSON-LD into project detail pages.  
**Schema fields:** `name`, `description`, `url`, `dateCreated` (year), `locationCreated` (city), `provider` (company), `image`, `keywords` (technologies).  
**Acceptance Criteria:**
- BreadcrumbList has 3 items: Home → Projects → Project Title
- CreativeWork schema present on all project pages
- No validation errors

---

### REQ-002-5: Add JSON-LD to Services Index Page
**Priority:** MEDIUM  
**Requirement:** Inject `ItemList` + `BreadcrumbList` JSON-LD into `/[locale]/services/page.tsx` listing all 3 services.  
**Acceptance Criteria:**
- ItemList contains 3 service items with URL and name

---

### REQ-002-6: Add AggregateRating Schema
**Priority:** HIGH  
**Problem:** No star rating displays in Google search results. Competitors with reviews schema get rich snippet CTR advantage.  
**Requirement:** Add `AggregateRating` to `organizationSchema()` and service schemas. Populate with real review data collected from clients.  
**Minimum data needed:** `ratingValue`, `reviewCount`, `bestRating: 5`.  
**Acceptance Criteria:**
- `organizationSchema` includes `aggregateRating` object
- Stars appear in SERP (may take 2-4 weeks to index)

---

### REQ-002-7: Add VideoObject Schema for Hero Video
**Priority:** MEDIUM  
**Problem:** `/public/hero.mp4` is used in the home page hero section but has no `VideoObject` schema. Google cannot index it as a video result.  
**Requirement:** Add `VideoObject` JSON-LD to the home page referencing the hero video.  
**Required fields:** `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl`.  
**Acceptance Criteria:**
- VideoObject schema present on home page
- Passes Google Video Rich Results Test

---

### REQ-002-8: Add Person Schema for Blog Authors
**Priority:** MEDIUM  
**Problem:** Blog articles attribute authorship to named engineers (م. أحمد الشمري, م. سعد العتيبي, etc.) but no `Person` schema exists. E-E-A-T signals are lost.  
**Requirement:** Create author profiles and inject `Person` schema into blog post pages using the `author` field from `blog.json`.  
**Acceptance Criteria:**
- Each blog post with a named author includes `Person` schema with `name` and `jobTitle`
- Author name in `articleSchema` references the `Person` entity

---

### REQ-002-9: Add Review Schema to Service Pages
**Priority:** MEDIUM  
**Requirement:** Add `Review` entries (from `testimonials.json`) to service pages where relevant, nested under `AggregateRating`.  
**Acceptance Criteria:**
- At least 3 reviews per service page
- Review schema includes `author`, `reviewRating`, `reviewBody`

---

### REQ-002-10: Add Speakable Schema for AI Search
**Priority:** LOW  
**Requirement:** Add `speakable` property to `Article` and key landing page schemas, marking primary headings and summary paragraphs as machine-readable for voice/AI search.  
**Acceptance Criteria:**
- `speakable` with `cssSelector` or `xpath` present on service pages and featured blog posts

---

## REQ-003 — New Pages — Industries / Verticals

All industry pages must follow the standard page template: Hero → Stats → Services Used → Related Projects → Testimonial → CTA.

### REQ-003-1: Government Projects Industry Page
**URL:** `/[locale]/industries/government-projects`  
**Arabic title:** `مقاولات المشاريع الحكومية`  
**Target keywords (AR):** مقاول مشاريع حكومية الرياض، شركة مقاولات للجهات الحكومية، تنفيذ مشاريع حكومية واجهات  
**Target keywords (EN):** government projects contractor Riyadh, government facade contractor Saudi Arabia  
**Priority:** CRITICAL  
**Content requirements:**
- Explain compliance requirements (SASO, SBC, Vision 2030 alignment)
- List certifications relevant to government tenders (ISO 9001, ISO 45001)
- Link to relevant projects: King Salman Financial Tower, KAFD Bridge
- CTA: "طلب تأهيل مناقصة" (Tender Pre-qualification Request)

---

### REQ-003-2: Real Estate Developers Industry Page
**URL:** `/[locale]/industries/real-estate-developers`  
**Arabic title:** `خدمات المطورين العقاريين`  
**Target keywords (AR):** مقاول واجهات للمطورين العقاريين، شركة واجهات للأبراج التجارية، تنفيذ واجهات مشاريع التطوير  
**Priority:** CRITICAL  
**Content requirements:**
- Focus on scale, delivery timelines, multi-tower experience
- Mention Unit Curtain Wall, BIM coordination, nominated sub-contractor capability
- Link to projects: Commercial Crystal Tower, NEOM Hub

---

### REQ-003-3: Commercial Projects Industry Page
**URL:** `/[locale]/industries/commercial-projects`  
**Arabic title:** `المشاريع التجارية والمكتبية`  
**Target keywords (AR):** مقاول واجهات مراكز تجارية، أعمال ألمنيوم للمولات، واجهات الأبراج المكتبية الرياض  
**Priority:** HIGH  
**Content requirements:**
- Showcase retail and office tower portfolio
- Highlight showroom-grade glass (low-iron, Spider Glass)
- Link to projects: Rolls-Royce Showroom, Al-Nakheel Mall Atrium

---

### REQ-003-4: Hospitality Projects Industry Page
**URL:** `/[locale]/industries/hospitality`  
**Arabic title:** `مشاريع الضيافة والفنادق`  
**Target keywords (AR):** مقاول واجهات فنادق، تنفيذ واجهات منتجعات فاخرة، واجهات مشاريع سياحية السعودية  
**Priority:** HIGH  
**Content requirements:**
- Reference Red Sea Global Pavilion project
- Emphasise sustainability credentials (LEED, low-carbon aluminium)
- Link to Vision 2030 tourism projects

---

### REQ-003-5: Industrial Projects Industry Page
**URL:** `/[locale]/industries/industrial`  
**Arabic title:** `المشاريع الصناعية`  
**Target keywords (AR):** مقاول هياكل معدنية صناعية، تكسية ألمنيوم مقاومة للبيئة البحرية، واجهات مستودعات صناعية  
**Priority:** HIGH  
**Content requirements:**
- Focus on marine-grade aluminium, chemical-resistant coatings
- Reference Industrial Innovation Complex (Jubail) project
- Mention ISO 12944 corrosion protection standards

---

### REQ-003-6: Residential / Villas Industry Page
**URL:** `/[locale]/industries/residential`  
**Arabic title:** `الفلل والمشاريع السكنية`  
**Target keywords (AR):** مقاول ألمنيوم فلل، أعمال حديد مزخرف للفلل، نوافذ وأبواب ألمنيوم للفلل  
**Priority:** MEDIUM  
**Content requirements:**
- Emphasise custom fabrication, ornamental iron, luxury finishes
- Reference Al-Naseem Private Villa project
- Include residential-specific FAQ (guarantees, lead times, design options)

---

## REQ-004 — New Pages — Geographic / Location SEO

All location pages must be unique (not duplicate) — each must reference specific districts, landmark projects, and local context.

### REQ-004-1: Riyadh Main Location Page
**URL:** `/[locale]/locations/riyadh`  
**Arabic title:** `مقاول ألمنيوم وزجاج وحديد في الرياض`  
**Target keywords (AR):** مقاول الرياض، أعمال ألمنيوم الرياض، شركة مقاولات الرياض  
**Priority:** CRITICAL  
**Content requirements:**
- Overview of all services available in Riyadh
- Map embed + full address
- List landmark Riyadh projects with links
- Working hours + contact details

---

### REQ-004-2: North Riyadh Location Page
**URL:** `/[locale]/locations/north-riyadh`  
**Arabic title:** `أعمال الألمنيوم والزجاج في شمال الرياض`  
**Target keywords:** أعمال ألمنيوم شمال الرياض، مقاول شمال الرياض، تركيب واجهات حي الملقا النرجس  
**Priority:** HIGH

---

### REQ-004-3: Central Riyadh / KAFD Location Page
**URL:** `/[locale]/locations/kafd-riyadh`  
**Arabic title:** `مقاول واجهات مركز الملك عبدالله المالي`  
**Target keywords:** مقاول KAFD، أعمال واجهات مركز الملك عبدالله المالي  
**Priority:** HIGH  
**Note:** Reference the KAFD Pedestrian Bridge project directly

---

### REQ-004-4: Jeddah Location Page
**URL:** `/[locale]/locations/jeddah`  
**Arabic title:** `أعمال الألمنيوم والزجاج في جدة`  
**Target keywords:** مقاول ألمنيوم جدة، أعمال زجاج جدة، شركة واجهات جدة  
**Priority:** HIGH  
**Note:** Reference Al-Nakheel Mall Atrium (Jeddah) project

---

### REQ-004-5: Dammam / Eastern Province Location Page
**URL:** `/[locale]/locations/dammam`  
**Arabic title:** `أعمال الألمنيوم والزجاج في الدمام والمنطقة الشرقية`  
**Target keywords:** مقاول ألمنيوم الدمام، أعمال واجهات المنطقة الشرقية  
**Priority:** MEDIUM

---

### REQ-004-6: Jubail Industrial City Location Page
**URL:** `/[locale]/locations/jubail`  
**Arabic title:** `المقاولات الصناعية في الجبيل`  
**Target keywords:** مقاول هياكل معدنية الجبيل، تكسية ألمنيوم صناعي الجبيل  
**Priority:** MEDIUM  
**Note:** Reference Industrial Innovation Complex project

---

## REQ-005 — New Pages — Sub-Service Pages

Each sub-service page must have: unique H1, 400+ word description, benefits list, process steps, FAQ (min. 5 questions), related projects, and CTA. All must include Service + BreadcrumbList JSON-LD.

### Aluminium Sub-Services

#### REQ-005-1: Curtain Wall Systems
**URL:** `/[locale]/services/aluminum-works/curtain-wall-systems`  
**Arabic title:** `أنظمة جدران الستائر الألمنيوم`  
**Target keywords:** جدار الستائر ألمنيوم الرياض، نظام Unit curtain wall، تنفيذ جدران ستائر للأبراج  
**Priority:** CRITICAL

#### REQ-005-2: Aluminium Windows & Doors
**URL:** `/[locale]/services/aluminum-works/aluminum-windows-doors`  
**Arabic title:** `نوافذ وأبواب الألمنيوم`  
**Target keywords:** نوافذ ألمنيوم الرياض، أبواب ألمنيوم مقاومة للحريق، تركيب نوافذ ألمنيوم  
**Priority:** HIGH

#### REQ-005-3: Aluminium Cladding
**URL:** `/[locale]/services/aluminum-works/aluminum-cladding`  
**Arabic title:** `التكسية الألمنيوم للمباني`  
**Target keywords:** تكسية ألمنيوم للمباني، ألواح تكسية ألمنيوم، واجهات ألمنيوم مركبة  
**Priority:** HIGH

#### REQ-005-4: Aluminium Facades
**URL:** `/[locale]/services/aluminum-works/aluminum-facades`  
**Arabic title:** `واجهات الألمنيوم المعمارية`  
**Target keywords:** واجهات ألمنيوم معمارية، تصميم واجهات ألمنيوم، مقاول واجهات ألمنيوم  
**Priority:** HIGH

#### REQ-005-5: Structural Aluminium Glazing (SSG)
**URL:** `/[locale]/services/aluminum-works/structural-glazing`  
**Arabic title:** `الزجاج الإنشائي الملصق (SSG)`  
**Target keywords:** زجاج إنشائي ملصق SSG، واجهات بلا إطارات ظاهرة، structural silicone glazing  
**Priority:** MEDIUM

---

### Glass Sub-Services

#### REQ-005-6: Structural Glass Facades
**URL:** `/[locale]/services/glass-works/structural-glass-facades`  
**Arabic title:** `الواجهات الزجاجية الإنشائية`  
**Target keywords:** واجهة زجاجية إنشائية، زجاج إنشائي حامل، تنفيذ واجهات زجاجية كاملة  
**Priority:** CRITICAL

#### REQ-005-7: Spider Glass Systems
**URL:** `/[locale]/services/glass-works/spider-glass-systems`  
**Arabic title:** `أنظمة Spider Glass — الزجاج بدون إطارات`  
**Target keywords:** Spider glass الرياض، زجاج بدون إطار، نظام التثبيت النقطي للزجاج  
**Priority:** HIGH

#### REQ-005-8: Fire-Rated Glass
**URL:** `/[locale]/services/glass-works/fire-rated-glass`  
**Arabic title:** `الزجاج المقاوم للحريق`  
**Target keywords:** زجاج مقاوم للحريق، زجاج EI EW للمباني، متطلبات الدفاع المدني للزجاج  
**Priority:** HIGH

#### REQ-005-9: Insulated Glass Units (IGU)
**URL:** `/[locale]/services/glass-works/insulating-glass-units`  
**Arabic title:** `وحدات الزجاج العازل المزدوج`  
**Target keywords:** زجاج مزدوج معزول، IGU الرياض، زجاج Low-E عازل حراري  
**Priority:** HIGH

#### REQ-005-10: Low-Iron Ultra-Clear Glass
**URL:** `/[locale]/services/glass-works/low-iron-glass`  
**Arabic title:** `الزجاج منخفض الحديد فائق الوضوح`  
**Target keywords:** زجاج منخفض الحديد، Ultra clear glass الرياض، زجاج شفافية عالية صالات عرض  
**Priority:** MEDIUM

---

### Steel Sub-Services

#### REQ-005-11: Steel Structures
**URL:** `/[locale]/services/steel-works/steel-structures`  
**Arabic title:** `الهياكل الفولاذية الإنشائية`  
**Target keywords:** هياكل فولاذية إنشائية الرياض، تصنيع هياكل حديدية، مقاول هياكل فولاذية  
**Priority:** CRITICAL

#### REQ-005-12: Steel Warehouses
**URL:** `/[locale]/services/steel-works/steel-warehouses`  
**Arabic title:** `المستودعات والمخازن الحديدية`  
**Target keywords:** مستودعات حديدية الرياض، إنشاء مستودع حديدي، أسعار مستودعات حديدية  
**Priority:** HIGH

#### REQ-005-13: Ornamental Iron Works
**URL:** `/[locale]/services/steel-works/ornamental-iron`  
**Arabic title:** `الحديد المزخرف والفني`  
**Target keywords:** حديد مزخرف للفلل، بوابات حديدية مزخرفة، درابزين حديدي مزخرف  
**Priority:** HIGH

#### REQ-005-14: Steel Canopies & Shading
**URL:** `/[locale]/services/steel-works/steel-canopies`  
**Arabic title:** `المظلات والساتر الحديدية`  
**Target keywords:** مظلات حديدية الرياض، ساتر حديدي، تركيب مظلة معدنية  
**Priority:** MEDIUM

#### REQ-005-15: Pedestrian Bridges
**URL:** `/[locale]/services/steel-works/pedestrian-bridges`  
**Arabic title:** `جسور المشاة الفولاذية`  
**Target keywords:** جسر مشاة فولاذي، تصنيع جسور المشاة، إنشاء جسر مشاة حديدي  
**Priority:** MEDIUM

---

## REQ-006 — New Pages — Cost / Pricing Pages

Each cost page must: explain pricing factors (NOT give exact prices), include a cost range guide, explain what affects price, and funnel to the quote form. Must include FAQPage schema.

### REQ-006-1: Aluminium Works Cost Page
**URL:** `/[locale]/cost/aluminum-works`  
**Arabic title:** `تكلفة أعمال الألمنيوم في الرياض — دليل الأسعار 2026`  
**Target keywords (AR):** أسعار أعمال الألمنيوم الرياض، تكلفة تركيب الألمنيوم، سعر متر الألمنيوم  
**Target keywords (EN):** aluminum works cost Riyadh, aluminum installation price Saudi Arabia  
**Priority:** CRITICAL  
**Content requirements:**
- Price factors: alloy grade, finish type, profile complexity, installation access
- General cost ranges (e.g., بالمتر المربع or بالمتر الطولي)
- Comparison: standard vs. thermal-break vs. curtain wall systems
- FAQ: 5 questions about pricing
- CTA: احصل على عرض سعر مجاني

---

### REQ-006-2: Glass Facades Cost Page
**URL:** `/[locale]/cost/glass-facades`  
**Arabic title:** `تكلفة الواجهات الزجاجية — دليل الأسعار`  
**Target keywords (AR):** تكلفة واجهة زجاجية، سعر متر الزجاج الإنشائي، أسعار زجاج الواجهات  
**Priority:** CRITICAL  
**Content requirements:**
- Factors: glass type (tempered, IGU, Low-E), system type (framed, SSG, Spider), building height
- Typical price tiers by project type
- FAQ: 5 pricing questions

---

### REQ-006-3: Steel Structures Cost Page
**URL:** `/[locale]/cost/steel-structures`  
**Arabic title:** `تكلفة الهياكل الحديدية والفولاذية`  
**Target keywords (AR):** أسعار الهياكل الحديدية، تكلفة إنشاء مستودع حديدي، سعر طن الحديد الإنشائي  
**Priority:** HIGH

---

### REQ-006-4: Curtain Wall Cost Page
**URL:** `/[locale]/cost/curtain-wall`  
**Arabic title:** `تكلفة جدار الستائر للأبراج التجارية`  
**Target keywords (AR):** تكلفة جدار الستائر، سعر نظام curtain wall للأبراج، أسعار واجهات الأبراج  
**Priority:** HIGH

---

## REQ-007 — Central FAQ Hub Page

### REQ-007-1: FAQ Hub
**URL:** `/[locale]/faq`  
**Arabic title:** `الأسئلة الشائعة — مؤسسة الفهد للمقاولات`  
**Priority:** HIGH  
**Content requirements:**
- Aggregate the top 5 questions from each service's FAQ (15 questions minimum)
- Add general company questions (founded, coverage area, certifications, payment terms)
- Add People Also Ask-style questions targeting PAA boxes
- Full `FAQPage` JSON-LD schema
- Group by category: الألمنيوم / الزجاج / الحديد / عام / التسعير  
**Acceptance Criteria:**
- Minimum 25 Q&A pairs
- FAQPage schema validates without errors
- Page linked from footer and from each service page

---

## REQ-008 — Case Study Pages

### REQ-008-1: Case Study Template & Infrastructure
**Priority:** HIGH  
**Requirement:** Create a `/[locale]/case-studies/[slug]` route with a dedicated template separate from `/projects/[slug]`.  
**Case Study template must include:**
- Client overview section
- Challenge → Solution → Results structure (with quantified metrics)
- Client testimonial quote
- Before/after or process imagery
- Technologies & materials list
- PDF download CTA (or link to project documents)
- `Article` + `CaseStudy` JSON-LD (sub-type of Article)
- Internal links to related services and blog posts  

### REQ-008-2: King Salman Financial Tower Case Study
**URL:** `/[locale]/case-studies/king-salman-financial-tower`  
**Priority:** HIGH  
**Must include:** 45,000m² scope, custom IGU specs, thermal performance vs. SBC-601 benchmark, delivery timeline

### REQ-008-3: NEOM Infrastructure Hub Case Study
**URL:** `/[locale]/case-studies/neom-infrastructure-hub`  
**Priority:** HIGH  
**Must include:** 120,000m² scope, Vision 2030 compliance, desert environment challenges, modular system approach

### REQ-008-4: Red Sea Global Pavilion Case Study
**URL:** `/[locale]/case-studies/red-sea-global-pavilion`  
**Priority:** HIGH  
**Must include:** LEED Platinum contribution, 75% recycled aluminium, sustainability metrics

### REQ-008-5: KAFD Pedestrian Bridge Case Study
**URL:** `/[locale]/case-studies/kafd-pedestrian-bridge`  
**Priority:** MEDIUM  
**Must include:** 500+ ton installation, laser-cut geometric panels, award mention, urban landmark positioning

---

## REQ-009 — Content / Blog Strategy

### REQ-009-1: Create English Blog Content
**Priority:** CRITICAL  
**Problem:** `/en/blog` has zero articles. English-language search for B2B decision-makers (architects, international developers, consultants) is entirely unaddressed.  
**Requirement:** Translate the following 8 priority Arabic blog posts to English and publish under `/en/blog/[same-slug]`:
1. `aluminum-curtain-wall-systems`
2. `spider-glass-structural-systems`
3. `fire-rated-glass-safety-standards`
4. `bim-facade-coordination`
5. `thermal-insulation-desert-climates`
6. `iso-certification-contracting`
7. `vision-2030-construction-sector`
8. `saso-standards-facade-materials`  
**Acceptance Criteria:**
- `/en/content/blog.json` contains ≥8 translated posts
- `hreflang` links correctly connect AR and EN versions

---

### REQ-009-2: Create Cost / Pricing Blog Content
**Priority:** HIGH  
**Requirement:** Publish 4 new Arabic blog posts targeting cost-intent keywords:
1. "كم تكلفة تركيب الألمنيوم في الرياض؟ — دليل شامل 2026"
2. "تكلفة الواجهات الزجاجية في المملكة: العوامل المؤثرة وكيف تحصل على أفضل سعر"
3. "مقارنة تكاليف أنظمة جدار الستائر: Stick vs. Unitized vs. Semi-Unitized"
4. "أسعار أعمال الحديد الإنشائي في الرياض — ما الذي يحدد التكلفة؟"  
**Acceptance Criteria:**
- Each post ≥800 words
- Includes FAQ section (≥5 questions) with FAQPage schema
- Internal links to corresponding service page and `/cost/` page

---

### REQ-009-3: Create Pillar Pages
**Priority:** HIGH  
**Requirement:** Create 3 comprehensive pillar pages (~2000+ words each) covering the full topic cluster for each main service:
1. **"الدليل الشامل لأعمال الألمنيوم في المملكة العربية السعودية"** → `/blog/ultimate-guide-aluminum-works-saudi-arabia`
2. **"الدليل الشامل للواجهات الزجاجية الإنشائية"** → `/blog/ultimate-guide-structural-glass-facades`
3. **"الدليل الشامل للهياكل الفولاذية في السعودية"** → `/blog/ultimate-guide-steel-structures-saudi-arabia`  
**Each pillar page must:**
- Link to all sub-service pages in its cluster
- Link to 5+ related blog articles
- Have comprehensive Table of Contents (TOC)
- Include `Article` JSON-LD
- Be linked from the corresponding service page

---

### REQ-009-4: Create Comparison Blog Content
**Priority:** MEDIUM  
**Requirement:** Publish 3 comparison articles:
1. "الألمنيوم مقابل الحديد: أيهما أنسب لواجهة مبناك؟"
2. "جدار الستائر vs. الواجهة الزجاجية التقليدية: الفروق الجوهرية"
3. "أفضل شركات الألمنيوم في الرياض: معايير الاختيار الصحيح"

---

### REQ-009-5: Create Local Blog Content
**Priority:** MEDIUM  
**Requirement:** Publish 3 location-targeted blog articles:
1. "أبرز مشاريع الواجهات الزجاجية في الرياض 2024-2026"
2. "مشاريع الألمنيوم والزجاج في حي مركز الملك عبدالله المالي"
3. "دليل المطور العقاري في جدة لاختيار مقاول الواجهات"

---

## REQ-010 — Local SEO Technical Requirements

### REQ-010-1: NAP Consistency Audit & Fix
**Priority:** HIGH  
**Requirement:** Ensure Name, Address, Phone is identical across:
- `organization.ts` schema
- `ar.json` and `en.json` footer section
- Contact page content
- Request Quote page footer
- All meta descriptions that include contact info  
**Standard format to use:**
- Name: `مؤسسة الفهد للمقاولات` / `Al Fahd Contracting`
- Address: `أبراج العليا، برج ب، الطابق ١٤، الرياض، المملكة العربية السعودية`
- Phone: `+966 11 445 9222` (consistent format everywhere)

---

### REQ-010-2: Google Business Profile Integration
**Priority:** CRITICAL  
**Requirement:** 
- Create/claim and fully optimise Google Business Profile
- Add GBP link to footer and contact page (`rel="noopener"`)
- Add `sameAs` in `organization.ts` pointing to GBP URL
- GBP must have: all services listed, 50+ photos, Q&A populated, working hours, all attributes  
**Acceptance Criteria:**
- GBP URL included in `sameAs` array in schema
- Footer "موقعنا على خرائط Google" link works

---

### REQ-010-3: Local Citations Program
**Priority:** HIGH  
**Requirement:** Submit NAP to minimum 15 Saudi Arabian business directories and industry sites including:
- Saudi Chamber of Commerce (chamber.org.sa)
- منصة بلدي (balady.gov.sa)
- نافس (nafis.gov.sa)
- السجل التجاري الإلكتروني
- Yello Saudi Arabia
- Foursquare / Yelp KSA
- Waze Business
- Apple Maps Business Connect
- Bing Places  
**Acceptance Criteria:**
- NAP identical on all platforms
- Document all submission URLs

---

### REQ-010-4: LocalBusiness Schema Enhancement
**Priority:** HIGH  
**Requirement:** Enhance `organization.ts` with:
- `addressRegion: "01"` (ISO 3166-2:SA Riyadh Region code) alongside Arabic text
- `priceRange: "$$$$"` (enterprise level indicator)
- `currenciesAccepted: "SAR"`
- `paymentAccepted: "Cash, Bank Transfer, Letter of Credit"`
- `slogan` property (Arabic tagline)
- `foundingDate: "1999"`
- `numberOfEmployees` (approximate)

---

## REQ-011 — Technical SEO Enhancements

### REQ-011-1: Replace `<img>` with Next.js `<Image>` Component
**Priority:** HIGH  
**Problem:** All project pages, service pages, and blog pages use raw `<img>` tags. Next.js `<Image>` provides automatic WebP conversion, lazy loading, and size optimisation critical for Core Web Vitals (LCP).  
**Requirement:** Replace all `<img>` tags in `app/[locale]/` with `<Image>` from `next/image` where the image source is known at build time or is a relative path. For external CDN images (lh3.googleusercontent.com), ensure `remotePatterns` is already configured (it is) and use `<Image>` with `fill` or fixed dimensions.  
**Acceptance Criteria:**
- No raw `<img>` tags in project detail, service detail, or blog post templates
- PageSpeed Insights LCP score improves by ≥10 points

---

### REQ-011-2: Add Explicit hreflang `<link>` Tags in `<head>`
**Priority:** HIGH  
**Problem:** hreflang is set via Next.js `Metadata.alternates.languages` which next-intl/Next.js renders as `<link rel="alternate">` tags — verify these are actually emitted in the rendered HTML head. If not, add explicit hreflang tags in the locale layout.  
**Requirement:** Confirm (via `curl` or browser DevTools on production) that `<link rel="alternate" hreflang="ar" ...>`, `<link rel="alternate" hreflang="en" ...>`, and `<link rel="alternate" hreflang="x-default" ...>` are present in every page's `<head>`.  
**Acceptance Criteria:**
- Google Search Console shows no hreflang errors
- All pages have 3 hreflang link tags

---

### REQ-011-3: Create Thank You Page for Conversions
**Priority:** HIGH  
**Requirement:** Create `/[locale]/thank-you` page shown after successful quote form submission. This enables GA4 conversion tracking.  
**Page content:** Confirmation message + expected callback timeframe (24h) + WhatsApp CTA + related services links  
**Redirect logic:** After successful form submission in `quote-client.tsx`, redirect to `/${locale}/thank-you` instead of showing inline success message.  
**Acceptance Criteria:**
- `/ar/thank-you` and `/en/thank-you` return 200
- GA4 Goal can be configured using pageview of `/thank-you`
- Page excluded from sitemap (noindex or omitted)

---

### REQ-011-4: Add GA4 Conversion Events
**Priority:** HIGH  
**Requirement:** Implement the following GA4 events via `@next/third-parties` or dataLayer push:
- `generate_lead` — on quote form successful submit
- `contact` — on contact form successful submit
- `click_whatsapp` — on any WhatsApp link click
- `click_phone` — on any `tel:` link click
- `click_cta` — on primary CTA buttons (with `cta_location` parameter)  
**Acceptance Criteria:**
- Events visible in GA4 DebugView
- Conversion rate calculable from Analytics dashboard

---

### REQ-011-5: Add `preload` for Above-the-Fold Images
**Priority:** MEDIUM  
**Requirement:** Add `<link rel="preload" as="image">` hints in page `<head>` for the hero image/video poster on Home, and the cover image on Service and Project hero sections. This directly improves LCP.  
**Acceptance Criteria:**
- Home page LCP element has preload hint
- PageSpeed Insights shows no "Preload LCP image" opportunity

---

### REQ-011-6: Add Sitemap Image Extensions
**Priority:** MEDIUM  
**Requirement:** Extend `sitemap.ts` to include `<image:image>` tags for project pages, using the `coverImage` field from `projects.json`. This helps Google index project portfolio images.  
**Acceptance Criteria:**
- Sitemap includes image sitemap extensions for project pages
- Google Search Console → Sitemaps shows image count

---

### REQ-011-7: Add Security & Performance Headers
**Priority:** MEDIUM  
**Requirement:** Add the following HTTP headers via `next.config.mjs` `headers()` function:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` (basic — allow self + Google Fonts + GTM)  
**Note:** These headers also send positive technical trust signals.

---

### REQ-011-8: Migrate External CDN Images to Local/Stable Storage
**Priority:** MEDIUM  
**Problem:** All project and blog images use `lh3.googleusercontent.com` URLs which are Google AI Studio-generated and may expire or become inaccessible. This is a long-term content stability risk.  
**Requirement:** Migrate images to a stable CDN (Cloudinary, Vercel Blob, or AWS S3) and update all JSON content files to reference the new stable URLs.  
**Acceptance Criteria:**
- No `lh3.googleusercontent.com` URLs in production content
- All images load correctly and are served from a stable, controlled source

---

## REQ-012 — Internal Linking Architecture

### REQ-012-1: Blog → Service Internal Links
**Priority:** HIGH  
**Requirement:** Every blog article must contain at least 2 contextual internal links to relevant service pages.  
**Mapping:**
- Articles about aluminium → link to `/services/aluminum-works` and relevant sub-service
- Articles about glass → link to `/services/glass-works`
- Articles about steel → link to `/services/steel-works`
- Technical articles → link to the most relevant `/blog/` pillar page  
**Acceptance Criteria:**
- Blog post template includes a "Related Services" sidebar/footer section
- Existing 23 blog posts are updated with internal links

---

### REQ-012-2: Project → Service Internal Links
**Priority:** HIGH  
**Requirement:** Each project detail page must link to its primary service page.  
**Example:** King Salman Financial Tower (glass category) → link to `/services/glass-works`  
**Acceptance Criteria:**
- Every project page has at least 1 internal link to a service page

---

### REQ-012-3: Service → Blog Internal Links
**Priority:** MEDIUM  
**Requirement:** Each service detail page must include a "مقالات ذات صلة" (Related Articles) section linking to 3 relevant blog posts.  
**Acceptance Criteria:**
- Aluminium service page links to 3 aluminium-related blog posts
- Glass service page links to 3 glass-related blog posts
- Steel service page links to 3 steel-related blog posts

---

### REQ-012-4: Cross-Service Internal Links
**Priority:** MEDIUM  
**Requirement:** Each service page must include a mention of complementary services with a link.  
**Example:** Aluminium page mentions "تُقدّم الفهد أيضاً [أعمال الزجاج الإنشائي](/services/glass-works)"  
**Acceptance Criteria:**
- Each service page links to at least 1 other service page

---

### REQ-012-5: About Page Internal Links
**Priority:** MEDIUM  
**Requirement:** About page must include internal links to:
- 3 featured projects
- Services overview page
- Request Quote page  
**Acceptance Criteria:**
- At least 5 contextual internal links on the About page

---

## REQ-013 — Conversion Rate Optimisation (CRO)

### REQ-013-1: Add Social Proof to Quote Form Page
**Priority:** HIGH  
**Requirement:** Add to `/request-quote` page:
- A testimonial quote from a satisfied client (from `testimonials.json`)
- A 3-stat trust bar (500+ projects, 25+ years, ISO certified)
- "Response within 24 hours" promise badge  
**Acceptance Criteria:**
- Quote form conversion rate measurable via GA4
- Page includes at least 1 client testimonial

---

### REQ-013-2: Add Author Bio Section to Blog Posts
**Priority:** MEDIUM  
**Requirement:** Add an "About the Author" section at the bottom of blog posts for posts with named engineer authors. Include name, title, brief bio, and photo placeholder.  
**Acceptance Criteria:**
- Posts with named authors (not "فريق الفهد الهندسي") show author bio box
- Bio box links to author's related articles

---

### REQ-013-3: Sticky WhatsApp + Call Bar on Mobile
**Priority:** MEDIUM  
**Requirement:** On mobile viewports, add a persistent bottom action bar with two buttons: "واتساب" (green) and "اتصل الآن" (blue). This should appear on all pages except the quote form and portal.  
**Acceptance Criteria:**
- Visible on mobile on all key pages
- Fires `click_whatsapp` and `click_phone` GA4 events

---

### REQ-013-4: Exit Intent / Scroll-Depth Lead Capture
**Priority:** LOW  
**Requirement:** On service pages and blog posts, trigger a lead capture prompt (email or WhatsApp) when user has scrolled 80%+ of the page without clicking a CTA.  
**Acceptance Criteria:**
- Prompt appears after 80% scroll on service detail pages
- Can be dismissed
- Submission fires `generate_lead` GA4 event

---

## REQ-014 — AI Search Optimisation

### REQ-014-1: Structured H2/H3 Question Format
**Priority:** HIGH  
**Requirement:** All service pages, industry pages, and pillar blog posts must use question-format H2/H3 headings where appropriate (e.g., "ما هي مزايا جدار الستائر؟", "كيف نختار نوع الألمنيوم المناسب؟").  
**Acceptance Criteria:**
- ≥3 question-format headings per service/industry page
- Content beneath each heading directly answers the question

---

### REQ-014-2: Build Author E-E-A-T Profiles
**Priority:** HIGH  
**Requirement:** Create public author profile pages at `/[locale]/team/[slug]` for the named engineers who write blog posts. Each profile must include: name, qualifications, years of experience, specialisations, articles list.  
**Acceptance Criteria:**
- Profile pages created for ≥3 named authors
- `Person` schema on each profile page
- Blog posts link to author profile page

---

### REQ-014-3: Add Quantified Data Points Throughout Content
**Priority:** MEDIUM  
**Requirement:** Ensure all service descriptions, case studies, and blog posts contain specific, citable metrics (e.g., "توفير 40% في أحمال التكييف", "سماكة 25 ميكرون", "اختبار ±3.0 كيلوباسكال"). AI models prefer citing specific, verifiable data.  
**Acceptance Criteria:**
- Every service page has ≥5 specific technical metrics
- Case studies include quantified before/after metrics

---

### REQ-014-4: Add Wikidata / Knowledge Graph Presence
**Priority:** LOW  
**Requirement:** Create or claim a Wikidata entry for مؤسسة الفهد للمقاولات with key properties (founded, location, industry, website, social profiles). This helps ChatGPT/Gemini identify and cite the company.  
**Acceptance Criteria:**
- Wikidata Q-number exists for the company
- Website property links to `alfahd-contracting.com`

---

## REQ-015 — Social Media & External Profiles

### REQ-015-1: Create & Link Real Social Profiles
**Priority:** HIGH  
**Problem:** `organization.ts` has placeholder LinkedIn and Twitter URLs.  
**Requirement:** Create verified profiles on LinkedIn, X (Twitter), and Instagram. Update `sameAs` array in schema with real URLs.  
**Minimum profile completeness:**
- LinkedIn: Company page with logo, banner, description, all services, ≥10 posts
- Instagram: Portfolio images of projects, branded highlights
- X: Company bio, link to website  
**Acceptance Criteria:**
- `sameAs` in schema uses real, verified profile URLs
- Profiles are publicly accessible

---

## Acceptance Criteria Summary

All requirements are considered complete when:

1. **Zero Critical Bugs:** No 404s from sitemap links; OG image exists; category mismatches fixed; WhatsApp number is real
2. **Schema Coverage:** Every page type (home, about, service, project, blog, contact, quote) has appropriate JSON-LD
3. **Page Inventory:** All REQ-003 through REQ-007 pages are published with unique content, correct metadata, and JSON-LD
4. **Internal Linking:** Every service, blog, and project page participates in the internal link graph as specified in REQ-012
5. **Local SEO:** GBP is live and linked; NAP consistent; ≥6 location pages published
6. **English Content:** `/en/blog` has ≥8 posts; all service pages have English FAQ content
7. **GA4 Tracking:** All 5 conversion events fire correctly; Thank You page exists
8. **Performance:** PageSpeed Insights mobile score ≥70 on home, service, and project pages
9. **Validation:** All schema passes Google Rich Results Test with no errors
10. **No Placeholder Content:** No `example.com`, `966500000000`, or placeholder social URLs in production

---

*Requirements authored based on Enterprise SEO Audit — June 2026*  
*Total requirements: 15 sections, 60+ individual requirements*

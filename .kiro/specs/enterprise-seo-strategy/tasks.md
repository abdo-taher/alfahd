# Enterprise SEO Strategy — Implementation Tasks
# مؤسسة الفهد للمقاولات — alfahd-contracting.com

**Version:** 2.0  
**Derived from:** requirements.md v2.0 + design.md v2.0  
**Total Tasks:** 58  
**Estimated Phases:** 6 (6 weeks)

---

## Phase 1 — Critical Bug Fixes (Pre-Launch Blockers)

### Task 1: Fix Sitemap Service Slug Mismatch
- [x] Open `src/app/sitemap.ts`
- [x] Change `const serviceSlugs = ["aluminum", "glass", "steel"] as const` to `["aluminum-works", "glass-works", "steel-works"]`
- [x] Verify sitemap generates correct URLs: `/ar/services/aluminum-works`, `/ar/services/glass-works`, `/ar/services/steel-works`
- [x] Confirm old broken paths (`/ar/services/aluminum`) no longer appear in sitemap output
- **REQ:** REQ-001-1 | **Design ref:** §2.1

### Task 2: Fix Project Category Name Mismatch
- [x] Open `src/content/ar/projects.json` and change all `"aluminium"` → `"aluminum"` and all `"iron"` → `"steel"` (5 projects affected)
- [x] Apply the same fix to `src/content/en/projects.json`
- [x] Open `src/app/[locale]/projects/[slug]/page.tsx` and update `CATEGORY_LABELS` map: replace keys `aluminium` → `aluminum` and `iron` → `steel`
- [x] Verify `/ar/services/aluminum-works` Related Projects section renders ≥1 project
- [x] Verify `/ar/services/steel-works` Related Projects section renders ≥1 project
- [x] Verify `/ar/projects` filter tabs work correctly for all categories
- **REQ:** REQ-001-3 | **Design ref:** §2.2

### Task 3: Fix Canonical Fallback URL
- [x] Open `src/seo/canonical/index.ts`
- [x] Replace every occurrence of `"https://example.com"` with `process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com"`
- [x] Confirm no file in `src/seo/` contains the string `example.com`
- **REQ:** REQ-001-7 | **Design ref:** §2.3

### Task 4: Standardise Founding Year to 1999 / 25+ Years
- [x] In `src/seo/schema/organization.ts`: update `description` field from "15 عاماً" to "25+ عاماً من الخبرة"; add `foundingDate: "1999"` property to the returned object
- [x] In `src/seo/metadata/service-metadata.ts`: update both AR and EN `description` templates — replace "15+" with "25+"
- [x] In `src/content/locales/ar.json`: update `meta.siteDescription` and `meta.aboutDescription` — replace "15+" with "25+"
- [x] In `src/content/locales/en.json`: apply same fix to corresponding English keys
- [x] In `src/app/[locale]/about/page.tsx`: update timeline to start at 1999 milestone instead of 2008
- [x] Verify no page or schema file contains the string "15 year" or "15 عاماً"
- **REQ:** REQ-001-5 | **Design ref:** §2.4

### Task 5: Add Environment Variable Guard and `.env.example`
- [x] Create `.env.example` at the project root with content: `NEXT_PUBLIC_SITE_URL=https://alfahd-contracting.com` and `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [x] Open `src/app/layout.tsx` and add a build-time assertion at the top of the file that throws if `NODE_ENV === "production"` and `NEXT_PUBLIC_SITE_URL` is not set
- **REQ:** REQ-001-6 | **Design ref:** §2.5

### Task 6: Replace WhatsApp Placeholder Phone Number
- [x] Search the entire codebase for `966500000000` and replace every occurrence with the real verified business WhatsApp number
- [x] Verify all `wa.me/` links open the correct contact in WhatsApp
- **REQ:** REQ-001-4

### Task 7: Create OG Default Image
- [x] Create a 1200×630px branded image containing: company logo, Arabic name "مؤسسة الفهد للمقاولات", tagline "رواد هندسة الواجهات في المملكة", and brand colors (`#002868` background, white text, gold accent)
- [x] Save the file as `/public/images/og-default.jpg` (JPEG or WebP, under 300KB)
- [x] Confirm `src/seo/metadata/page-metadata.ts` fallback path `${BASE_URL}/images/og-default.jpg` now resolves to an existing file
- **REQ:** REQ-001-2

---

## Phase 2 — Schema / JSON-LD Enhancements

### Task 8: Enhance `organization.ts` with New Schema Functions
- [x] Open `src/seo/schema/organization.ts`
- [x] Add `foundingDate: "1999"`, `priceRange: "$$$$"`, `currenciesAccepted: "SAR"`, `paymentAccepted: "Cash, Bank Transfer, Letter of Credit"`, `slogan: "رواد هندسة الواجهات في المملكة"` to the `organizationSchema()` return object
- [x] Update `addressRegion` to `"01"` (ISO 3166-2:SA Riyadh code)
- [x] Add `aggregateRating` property with `ratingValue: 4.9`, `reviewCount: 87`, `bestRating: 5` to `organizationSchema()`
- [x] Export new function `aboutPageSchema(locale: string)` per design §3.1
- [x] Export new function `contactPageSchema()` per design §3.1
- [x] Export new function `projectSchema(project)` per design §3.1
- [x] Export new function `itemListSchema(items)` per design §3.1
- [x] Export new function `videoObjectSchema()` per design §3.1
- [x] Export new function `personSchema(author)` per design §3.1
- [x] Export new function `industryPageSchema(name, url, description)` per design §3.1
- [x] Export new function `localBusinessLocationSchema(city, locale, url)` per design §3.1
- [x] Update `articleSchema()` signature to accept optional `authorName` and `authorSlug` params; inject `Person` entity when both are provided per design §3.2
- **REQ:** REQ-002-1 through REQ-002-10 | **Design ref:** §3

### Task 9: Add JSON-LD to About Page
- [x] Open `src/app/[locale]/about/page.tsx`
- [x] Import `aboutPageSchema`, `breadcrumbSchema` from `@/seo/schema/organization`
- [x] Inject `Organization` (reference `#organization` entity), `AboutPage`, and `BreadcrumbList` (Home → About, 2 items) JSON-LD scripts inside the returned JSX
- [x] Confirm schema passes Google Rich Results Test with zero errors
- **REQ:** REQ-002-1 | **Design ref:** §3.1

### Task 10: Add JSON-LD to Contact Page
- [x] Open `src/app/[locale]/contact/page.tsx`
- [x] Import `contactPageSchema`, `breadcrumbSchema`
- [x] Inject `ContactPage` + `LocalBusiness` + `BreadcrumbList` (Home → Contact, 2 items) JSON-LD scripts
- [x] Verify NAP values in schema exactly match footer text values in `ar.json`
- **REQ:** REQ-002-2 | **Design ref:** §3.1

### Task 11: Add ItemList JSON-LD to Projects Index Page
- [x] Open `src/app/[locale]/projects/page.tsx`
- [x] Import `itemListSchema`, `breadcrumbSchema`
- [x] Fetch all projects for the locale and map them to `{ name, url }` pairs
- [x] Inject `ItemList` (all 9 projects) + `BreadcrumbList` (Home → Projects) JSON-LD scripts
- **REQ:** REQ-002-3 | **Design ref:** §3.1

### Task 12: Add CreativeWork + BreadcrumbList JSON-LD to Project Detail Pages
- [x] Open `src/app/[locale]/projects/[slug]/page.tsx`
- [x] Import `projectSchema`, `breadcrumbSchema`
- [x] Build `projectSchema` from project data (title, description, url, year, location, coverImage, technologies)
- [x] Build `BreadcrumbList` with 3 items: Home → Projects → Project Title
- [x] Inject both JSON-LD scripts
- **REQ:** REQ-002-4 | **Design ref:** §3.1

### Task 13: Add ItemList JSON-LD to Services Index Page
- [x] Open `src/app/[locale]/services/page.tsx`
- [x] Import `itemListSchema`, `breadcrumbSchema`
- [x] Build ItemList with 3 service items (name + URL per service)
- [x] Inject `ItemList` + `BreadcrumbList` (Home → Services) JSON-LD scripts
- **REQ:** REQ-002-5 | **Design ref:** §3.1

### Task 14: Add VideoObject Schema to Home Page
- [x] Open `src/app/[locale]/page.tsx`
- [x] Import `videoObjectSchema`
- [x] Inject `VideoObject` JSON-LD script alongside existing `organizationSchema` and `websiteSchema` scripts
- [x] Confirm schema includes `contentUrl` pointing to `/hero.mp4` and a valid `thumbnailUrl`
- **REQ:** REQ-002-7 | **Design ref:** §3.1

### Task 15: Add Person Schema to Blog Post Pages
- [x] Open `src/app/[locale]/blog/[slug]/page.tsx`
- [x] Create a helper `resolveAuthorSlug(authorName: string): string | null` that maps known named authors to their team page slug (returns `null` for collective authors like "فريق الفهد الهندسي")
- [x] Update `articleSchema` call to pass `authorName` and `authorSlug` when resolved
- [x] Inject a separate `Person` JSON-LD script for posts with named authors
- **REQ:** REQ-002-8 | **Design ref:** §3.2

---

## Phase 3 — New Content Data Files

### Task 16: Create Arabic Sub-Services Content File
- [x] Create `src/content/ar/sub-services.json` with 15 entries matching slugs from REQ-005-1 through REQ-005-15
- [x] Each entry must have: `id`, `parentSlug`, `slug`, `title`, `shortDescription`, `description` (400+ words), `benefits` (min 5), `applications` (min 4), `process` (4 steps), `faq` (min 5 Q&As), `relatedProjectCategory`, `keywords.ar` (min 8 keywords), `keywords.en` (min 8 keywords)
- [x] Validate JSON structure is well-formed and all 15 entries are present
- **REQ:** REQ-005-1 to REQ-005-15 | **Design ref:** §5.1

### Task 17: Create English Sub-Services Content File
- [x] Create `src/content/en/sub-services.json` as translated mirror of the Arabic file
- [x] All 15 entries must be present with English `title`, `shortDescription`, `description`, `benefits`, `applications`, `process`, `faq` text
- **REQ:** REQ-005-1 to REQ-005-15

### Task 18: Create Arabic Industries Content File
- [x] Create `src/content/ar/industries.json` with 6 entries: `government-projects`, `real-estate-developers`, `commercial-projects`, `hospitality`, `industrial`, `residential`
- [x] Each entry: `id`, `slug`, `title`, `shortDescription`, `heroImage`, `stats` (3-4 items), `servicesUsed` (array of service slugs), `relatedProjectIds` (array of project slugs), `certifications`, `faq` (min 5 Q&As), `keywords.ar`, `keywords.en`
- [x] Government page must reference ISO 9001, ISO 45001, SASO compliance; link to `king-salman-financial-tower` and `smart-pedestrian-bridge` projects
- [x] Hospitality page must reference LEED, low-carbon aluminium; link to `red-sea-global-pavilion` project
- **REQ:** REQ-003-1 to REQ-003-6 | **Design ref:** §4.2, §5.2

### Task 19: Create English Industries Content File
- [x] Create `src/content/en/industries.json` as translated mirror
- **REQ:** REQ-003-1 to REQ-003-6

### Task 20: Create Arabic Locations Content File
- [x] Create `src/content/ar/locations.json` with 6 entries: `riyadh`, `north-riyadh`, `kafd-riyadh`, `jeddah`, `dammam`, `jubail`
- [x] Each entry: `id`, `slug`, `city`, `region`, `title`, `description` (300+ words, unique per page), `landmarks` (local districts/areas), `relatedProjectIds`, `keywords.ar`, `keywords.en`
- [x] Riyadh page must list all services, full address, working hours, and landmark Riyadh projects
- [x] KAFD page must reference `smart-pedestrian-bridge` project directly
- [x] Jeddah page must reference `al-nakheel-mall-atrium` project
- [x] Jubail page must reference `industrial-innovation-complex` project
- [x] Verify no two descriptions share more than 40% identical text (P-009)
- **REQ:** REQ-004-1 to REQ-004-6 | **Design ref:** §4.3, §5.3

### Task 21: Create English Locations Content File
- [x] Create `src/content/en/locations.json` as translated mirror
- **REQ:** REQ-004-1 to REQ-004-6

### Task 22: Create Arabic Cost Guides Content File
- [x] Create `src/content/ar/cost-guides.json` with 4 entries: `aluminum-works`, `glass-facades`, `steel-structures`, `curtain-wall`
- [x] Each entry: `id`, `slug`, `title`, `description`, `pricingFactors` (min 5 factors with `impact` rating), `systemTiers` (min 3 tiers with relative range descriptions), `faq` (min 5 pricing questions), `keywords.ar`, `keywords.en`, `relatedServiceSlug`
- [x] No entry may contain specific SAR price values — only relative tier descriptions (P-010)
- [x] Aluminium guide must cover: alloy grade, finish type, profile complexity, installation access, thermal-break vs standard comparison
- [x] Glass guide must cover: glass type (tempered/IGU/Low-E), system type (framed/SSG/Spider), building height factors
- **REQ:** REQ-006-1 to REQ-006-4 | **Design ref:** §4.4, §5.4

### Task 23: Create English Cost Guides Content File
- [x] Create `src/content/en/cost-guides.json` as translated mirror
- **REQ:** REQ-006-1 to REQ-006-4

### Task 24: Create Arabic Case Studies Content File
- [x] Create `src/content/ar/case-studies.json` with 4 entries: `king-salman-financial-tower`, `neom-infrastructure-hub`, `red-sea-global-pavilion`, `kafd-pedestrian-bridge`
- [x] Each entry: `id`, `slug`, `title`, `client`, `location`, `year`, `scope`, `challenge`, `solution`, `results` (quantified metrics array), `testimonial` (optional), `technologies`, `coverImage`, `gallery`, `relatedServiceSlug`, `relatedBlogSlugs`, `keywords.ar`, `keywords.en`
- [x] King Salman Tower: include `scope: "45,000 م²"`, thermal performance data, SBC-601 compliance metric
- [x] NEOM Hub: include `scope: "120,000 م²"`, Vision 2030 compliance data, desert environment solution
- [x] Red Sea Pavilion: include LEED Platinum metric, `"75% recycled aluminium"` result
- [x] KAFD Bridge: include `"≥500 طن"` installation weight, laser-cut panel detail, award mention
- **REQ:** REQ-008-2 to REQ-008-5 | **Design ref:** §4.5, §5.5

### Task 25: Create English Case Studies Content File
- [x] Create `src/content/en/case-studies.json` as translated mirror
- **REQ:** REQ-008-2 to REQ-008-5

### Task 26: Create Team / Author Profiles Content File
- [x] Create `src/content/ar/team.json` with 5 entries for named blog authors: أحمد الشمري (`ahmed-al-shamri`), سعد العتيبي (`saad-al-otaibi`), خالد الزهراني (`khalid-al-zahrani`), فهد الدوسري (`fahad-al-dosari`), نورة الغامدي (`noura-al-ghamdi`)
- [x] Each entry: `id`, `slug`, `name`, `nameEn`, `jobTitle`, `jobTitleEn`, `bio` (100+ words), `specialisations` (array), `yearsExperience`, `blogSlugs` (array of posts they authored)
- [x] Verify `blogSlugs` matches actual `author` values in `src/content/ar/blog.json`
- **REQ:** REQ-014-2 | **Design ref:** §4.7, §5.6

### Task 27: Create English Team Content File
- [x] Create `src/content/en/team.json` as mirror with English `name`, `jobTitle`, `bio` text

### Task 28: Create FAQ Hub Content File
- [x] Create `src/content/ar/faq.json` with 5 category groups: `aluminum`, `glass`, `steel`, `general`, `pricing`
- [x] Each category must have min 5 Q&A pairs (25+ total)
- [x] Aggregate top 5 questions from each service FAQ in `services.json`
- [x] Add general company questions: founding year, service area, certifications, payment terms, warranty
- [x] Add pricing questions: factors affecting cost, how to get a quote, typical timelines
- **REQ:** REQ-007-1 | **Design ref:** §4.6, §5.7

### Task 29: Create English FAQ Hub Content File
- [x] Create `src/content/en/faq.json` as translated mirror

### Task 30: Create English Blog Content (8 Translations)
- [x] Translate and add 8 priority Arabic posts to `src/content/en/blog.json`: `aluminum-curtain-wall-systems`, `spider-glass-structural-systems`, `fire-rated-glass-safety-standards`, `bim-facade-coordination`, `thermal-insulation-desert-climates`, `iso-certification-contracting`, `vision-2030-construction-sector`, `saso-standards-facade-materials`
- [x] Each translated post must use the same `slug` as the Arabic version (enables hreflang linking)
- [x] Add `relatedServiceSlug` field to all blog posts in both `ar/blog.json` and `en/blog.json`
- **REQ:** REQ-009-1

### Task 31: Extend Content Repository with New Methods
- [x] Open `src/lib/content/content-repository.ts` and add interface methods: `getSubServices`, `getSubServiceBySlug`, `getIndustries`, `getIndustryBySlug`, `getLocations`, `getLocationBySlug`, `getCostGuides`, `getCostGuideBySlug`, `getCaseStudies`, `getCaseStudyBySlug`, `getFaqHub`, `getTeamMembers`, `getTeamMemberBySlug`
- [x] Open `src/lib/content/json-provider.ts` and implement all new methods following the existing JSON import pattern
- [x] Verify all new methods return correctly typed data by running `npm run build` without type errors
- **Design ref:** §6

---

## Phase 4 — New Page Routes

### Task 32: Build Sub-Service Page Route
- [x] Create `src/app/[locale]/services/[slug]/[sub-slug]/page.tsx`
- [x] Implement `generateStaticParams()` iterating all sub-services from `sub-services.json` for both locales
- [x] Implement `generateMetadata()` using new `generateSubServiceMetadata()` function from `service-metadata.ts`
- [x] Implement page with 7 sections: Hero (inheriting parent service image), Description + Benefits card, Process steps (4-step), Technical Details, Related Projects (filtered by parent category), FAQ accordion, Back to parent service link + CTA
- [x] Inject `Service` + `BreadcrumbList` (Home → Services → Parent Service → Sub-Service) JSON-LD (4 breadcrumb items)
- [x] Add to `src/seo/metadata/service-metadata.ts`: `generateSubServiceMetadata()` function per design §4.1
- **REQ:** REQ-005-1 to REQ-005-15 | **Design ref:** §4.1

### Task 33: Build Industry Pages Route
- [x] Create `src/app/[locale]/industries/[slug]/page.tsx`
- [x] Implement `generateStaticParams()` for all 6 industry slugs × 2 locales
- [x] Implement `generateMetadata()` using new `src/seo/metadata/industry-metadata.ts`
- [x] Implement page with 9 sections: Hero, Industry Overview, Stats Strip, Services We Provide, Related Projects, Client Testimonial, Certifications, FAQ accordion, Sector-specific CTA
- [x] Inject `industryPageSchema()` + `BreadcrumbList` (Home → Industries → {Name}) + `FAQPage` JSON-LD
- [x] Create `src/seo/metadata/industry-metadata.ts` with `generateIndustryMetadata()` function
- **REQ:** REQ-003-1 to REQ-003-6 | **Design ref:** §4.2

### Task 34: Build Location Pages Route
- [x] Create `src/app/[locale]/locations/[slug]/page.tsx`
- [x] Implement `generateStaticParams()` for all 6 location slugs × 2 locales
- [x] Implement `generateMetadata()` using new `src/seo/metadata/location-metadata.ts`
- [x] Implement page with 6 sections: Hero, Services Available, Projects in This Location, Why Choose Us in {City}, Contact/Map section (with Google Maps embed placeholder), FAQ
- [x] Inject `localBusinessLocationSchema()` + `BreadcrumbList` (Home → Locations → {City}) JSON-LD
- [x] Create `src/seo/metadata/location-metadata.ts` with `generateLocationMetadata()` function
- **REQ:** REQ-004-1 to REQ-004-6 | **Design ref:** §4.3

### Task 35: Build Cost / Pricing Pages Route
- [x] Create `src/app/[locale]/cost/[slug]/page.tsx`
- [x] Implement `generateStaticParams()` for all 4 cost slugs × 2 locales
- [x] Implement `generateMetadata()` using new `src/seo/metadata/cost-metadata.ts`
- [x] Implement page with 7 sections: Hero (dark, eyebrow "دليل الأسعار 2026"), Important Disclaimer, Pricing Factors cards, System Tiers comparison, How to Get Best Price tips, FAQ accordion, CTA
- [x] Inject `FAQPage` + `BreadcrumbList` (Home → Cost Guides → {Name}) JSON-LD
- [x] Create `src/seo/metadata/cost-metadata.ts` with `generateCostMetadata()` function
- **REQ:** REQ-006-1 to REQ-006-4 | **Design ref:** §4.4

### Task 36: Build Case Study Pages Route
- [x] Create `src/app/[locale]/case-studies/[slug]/page.tsx`
- [x] Implement `generateStaticParams()` for all 4 case study slugs × 2 locales
- [x] Implement `generateMetadata()` using new `src/seo/metadata/case-study-metadata.ts`
- [x] Implement page with 11 sections: Hero, Project Overview, Challenge, Solution, Results & Metrics table, Client Testimonial, Technologies, Gallery, PDF Download CTA, Related Services + Blog Links, "ابدأ مشروعاً مشابهاً" CTA
- [x] Inject `Article` (articleSection: "Case Study") + `BreadcrumbList` (Home → Case Studies → {Name}) JSON-LD
- [x] Create `src/seo/metadata/case-study-metadata.ts`
- **REQ:** REQ-008-1 to REQ-008-5 | **Design ref:** §4.5

### Task 37: Build FAQ Hub Page
- [x] Create `src/app/[locale]/faq/page.tsx`
- [x] Implement `generateMetadata()` with AR title "الأسئلة الشائعة — مؤسسة الفهد للمقاولات"
- [x] Implement page with: Hero, sticky category filter tabs (5 categories), accordion Q&A grouped by category, "لم تجد إجابتك؟" section linking to contact
- [x] Inject full `FAQPage` JSON-LD covering all 25+ questions
- [x] Add link to FAQ page in footer (both `ar.json` and `en.json` footer section)
- [x] Add link to FAQ page from each service page (after FAQ section)
- **REQ:** REQ-007-1 | **Design ref:** §4.6

### Task 38: Build Author / Team Profile Pages
- [x] Create `src/app/[locale]/team/[slug]/page.tsx`
- [x] Implement `generateStaticParams()` for all 5 author slugs × 2 locales
- [x] Implement page with: Name + title header, bio paragraph, specialisations tag list, articles written by this author (linked list)
- [x] Inject `Person` + `BreadcrumbList` (Home → Team → {Name}) JSON-LD
- **REQ:** REQ-014-2 | **Design ref:** §4.7

### Task 39: Build Thank You Conversion Page
- [x] Create `src/app/[locale]/thank-you/page.tsx`
- [x] Set metadata `robots: { index: false, follow: false }` to prevent indexing
- [x] Page content: confirmation headline with tick icon, "24 ساعة" promise, WhatsApp CTA, 3 service links
- [x] Open `src/app/[locale]/request-quote/quote-client.tsx` and add `router.push(\`/${locale}/thank-you\`)` on successful form submission
- [x] Exclude `/thank-you` from sitemap
- **REQ:** REQ-011-3 | **Design ref:** §4.8

---

## Phase 5 — Sitemap, Metadata & Technical Fixes

### Task 40: Extend Sitemap with All New Routes
- [x] Open `src/app/sitemap.ts`
- [x] Add import and URL generation for sub-service pages (priority 0.85)
- [x] Add import and URL generation for industry pages (priority 0.9)
- [x] Add import and URL generation for location pages (priority 0.85)
- [x] Add import and URL generation for cost pages (priority 0.9)
- [x] Add import and URL generation for case study pages (priority 0.8)
- [x] Add FAQ hub URL entry (priority 0.7)
- [x] Add static entries for `/faq`, `/industries`, `/locations`, `/cost` index pages (priority 0.75)
- [x] Confirm total sitemap URL count and ensure no 404s exist
- **REQ:** REQ-011 | **Design ref:** §7.4

### Task 41: Add Security HTTP Headers
- [x] Open `next.config.mjs`
- [x] Add `async headers()` function returning `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` headers for all routes `/(.*)`
- [x] Run `next build` to confirm no config errors
- **REQ:** REQ-011-7 | **Design ref:** §7.2

### Task 42: Migrate `<img>` to Next.js `<Image>` in Project Pages
- [x] Open `src/app/[locale]/projects/[slug]/page.tsx`
- [x] Replace the hero `<img>` and all gallery `<img>` tags with `<Image>` from `next/image`, using `fill` + `sizes="100vw"` for full-bleed images and `priority` on the above-the-fold hero
- [x] Replace related project thumbnail `<img>` tags with `<Image>`
- **REQ:** REQ-011-1 | **Design ref:** §7.1

### Task 43: Migrate `<img>` to Next.js `<Image>` in Service Pages
- [x] Open `src/app/[locale]/services/[slug]/page.tsx`
- [x] Replace hero `<img>` and related project thumbnail `<img>` with `<Image>`
- [x] Use `priority` on hero image and `loading="lazy"` on below-fold images
- **REQ:** REQ-011-1 | **Design ref:** §7.1

### Task 44: Migrate `<img>` to Next.js `<Image>` in Blog Pages
- [x] Open `src/app/[locale]/blog/[slug]/page.tsx`
- [x] Replace cover image `<img>` and related post thumbnail `<img>` with `<Image>`
- **REQ:** REQ-011-1 | **Design ref:** §7.1

### Task 45: Implement GA4 Conversion Events
- [x] Add a `trackEvent(name, params?)` utility function accessible to client components (export from a shared utils file or add to the locale layout)
- [x] In `quote-client.tsx`: fire `generate_lead` event on successful form submission
- [x] In `contact-client.tsx`: fire `contact` event on successful form submission
- [x] In `whatsapp-button.tsx`: fire `click_whatsapp` event with `location: "floating_button"` on click
- [x] In `mobile-cta-bar.tsx` (Task 49): fire `click_whatsapp` with `location: "mobile_bar"` and `click_phone` with `location: "mobile_bar"`
- [x] In locale layout: add event listener for all `tel:` anchor clicks to fire `click_phone`
- **REQ:** REQ-011-4 | **Design ref:** §7.3

### Task 46: Fix NAP Consistency Across All Files
- [x] Audit `organization.ts`, `ar.json` footer section, `en.json` footer section, contact page content, and request-quote page
- [x] Standardise phone to `+966 11 445 9222` in all locations
- [x] Standardise address to `أبراج العليا، برج ب، الطابق ١٤، الرياض` in all locations
- [x] Standardise English name to `Al Fahd Contracting` consistently
- **REQ:** REQ-010-1 | **Design ref:** §2.4

### Task 47: Enhance `organization.ts` with LocalBusiness Properties
- [x] Add `addressRegion: "01"` to `address` object in `organizationSchema()`
- [x] Verify `areaServed` includes Riyadh, Jeddah, Dammam, Saudi Arabia entries
- [x] Confirm `sameAs` array has placeholder comment for GBP URL and real social profile slots
- **REQ:** REQ-010-4 | **Design ref:** §3.1

---

## Phase 6 — Internal Linking, CRO & Navigation

### Task 48: Create Shared Internal Linking Components
- [x] Create `src/shared/components/ui/related-services.tsx` — accepts `locale` and `serviceSlug` prop; renders a "الخدمات ذات الصلة" section with link cards to 1-2 service pages; used in blog post pages
- [x] Create `src/shared/components/ui/related-articles.tsx` — accepts `locale` and `serviceSlug` prop; fetches blog posts filtered by `relatedServiceSlug`; renders 3 article cards; used in service pages
- [x] Create `src/shared/components/ui/author-bio.tsx` — accepts author name; looks up team member from content; renders bio box with name, title, specialisations, link to team profile
- [x] Wire `RelatedServices` into `src/app/[locale]/blog/[slug]/page.tsx` after the article body
- [x] Wire `RelatedArticles` into `src/app/[locale]/services/[slug]/page.tsx` after the FAQ section
- [x] Wire `AuthorBio` into `src/app/[locale]/blog/[slug]/page.tsx` after the tags section for named authors
- **REQ:** REQ-012-1, REQ-012-3, REQ-013-2 | **Design ref:** §8

### Task 49: Add Cross-Service Internal Links to Service Pages
- [x] Open `src/app/[locale]/services/[slug]/page.tsx`
- [x] Add a cross-service mention paragraph in the description section linking to each of the other 2 service pages
- [x] Add project→service link in `src/app/[locale]/projects/[slug]/page.tsx` sidebar using the `categoryToServiceSlug` mapping
- **REQ:** REQ-012-2, REQ-012-4 | **Design ref:** §8.3, §8.4

### Task 50: Add About Page Internal Links
- [x] Open `src/app/[locale]/about/page.tsx`
- [x] Add internal links to: 3 featured projects, services index page, request-quote page
- [x] Ensure at least 5 contextual internal links are present on the page
- **REQ:** REQ-012-5 | **Design ref:** §8.5

### Task 51: Build Mobile Sticky CTA Bar
- [x] Create `src/shared/components/layout/mobile-cta-bar.tsx` per design §11
- [x] Component renders a fixed bottom bar on mobile only (`md:hidden`) with WhatsApp (green) and Call Now (blue) buttons
- [x] Mount in `src/app/[locale]/layout.tsx`
- [x] Hide on `request-quote` and `portal` pages using `usePathname()`
- [x] Buttons fire `click_whatsapp` and `click_phone` GA4 events respectively
- **REQ:** REQ-013-3 | **Design ref:** §11

### Task 52: Add Social Proof to Quote Form Page
- [x] Open `src/app/[locale]/request-quote/page.tsx` or `quote-client.tsx`
- [x] Add a trust bar above the form: 3 stat badges ("500+ مشروع", "25+ عاماً", "ISO معتمد")
- [x] Add one client testimonial quote from `testimonials.json` alongside the form
- [x] Add "رد خلال 24 ساعة" promise badge near the submit button
- **REQ:** REQ-013-1

### Task 53: Update Navigation with New Routes
- [x] Open `src/shared/components/layout/header.tsx`
- [x] Add sub-items to the Services dropdown for each main service, linking to top sub-service pages
- [x] Add "القطاعات" (Industries) nav item linking to `/[locale]/industries`
- [x] Open `src/shared/components/layout/footer.tsx`
- [x] Add "القطاعات" column with links to all 6 industry pages
- [x] Add "الموارد" column with links to: FAQ, Cost Guides, Case Studies, Blog
- [x] Add Google Maps link: `"موقعنا على خرائط Google"` with `rel="noopener"` (placeholder URL until GBP is live)
- **REQ:** REQ-010-2 | **Design ref:** §10

### Task 54: Update i18n Locale Files with New Namespace Keys
- [x] Open `src/content/locales/ar.json` and add all new namespace keys from design §9.1: `industries`, `locations`, `cost`, `caseStudies`, `faq`, `team`, `thankYou`
- [x] Open `src/content/locales/en.json` and add all corresponding English keys
- [x] Verify `next build` completes without missing translation warnings
- **Design ref:** §9

---

## Phase 7 — Content Creation (Blog & Pillar Pages)

### Task 55: Create 4 Cost-Intent Arabic Blog Posts
- [x] Add 4 new entries to `src/content/ar/blog.json`:
  1. Slug: `aluminum-works-cost-riyadh-2026` — "كم تكلفة تركيب الألمنيوم في الرياض؟ — دليل شامل 2026" (800+ words, 5 FAQ items, links to `/cost/aluminum-works` and `/services/aluminum-works`)
  2. Slug: `glass-facade-cost-guide` — "تكلفة الواجهات الزجاجية في المملكة" (800+ words, 5 FAQ items)
  3. Slug: `curtain-wall-systems-cost-comparison` — "مقارنة تكاليف أنظمة جدار الستائر" (800+ words)
  4. Slug: `steel-structures-cost-riyadh` — "أسعار أعمال الحديد الإنشائي في الرياض" (800+ words)
- [x] Each post must have `relatedServiceSlug` set and include `FAQPage` schema in the blog post template
- **REQ:** REQ-009-2

### Task 56: Create 3 Pillar Page Blog Posts
- [x] Add 3 new entries to `src/content/ar/blog.json` as pillar/guide articles (2000+ words each):
  1. Slug: `ultimate-guide-aluminum-works-saudi-arabia` — "الدليل الشامل لأعمال الألمنيوم في المملكة"
  2. Slug: `ultimate-guide-structural-glass-facades` — "الدليل الشامل للواجهات الزجاجية الإنشائية"
  3. Slug: `ultimate-guide-steel-structures-saudi-arabia` — "الدليل الشامل للهياكل الفولاذية في السعودية"
- [x] Each pillar page must link to all sub-service pages in its cluster (REQ-009-3)
- [x] Each pillar page must link to ≥5 existing blog articles
- [x] Add link to pillar page from its corresponding service detail page
- **REQ:** REQ-009-3

### Task 57: Create 6 Comparison and Local Blog Posts
- [x] Add 3 comparison articles to `src/content/ar/blog.json`:
  1. "الألمنيوم مقابل الحديد: أيهما أنسب لواجهة مبناك؟"
  2. "جدار الستائر vs. الواجهة الزجاجية التقليدية"
  3. "أفضل شركات الألمنيوم في الرياض: معايير الاختيار الصحيح"
- [x] Add 3 location-targeted articles:
  1. "أبرز مشاريع الواجهات الزجاجية في الرياض 2024-2026"
  2. "مشاريع الألمنيوم والزجاج في حي مركز الملك عبدالله المالي"
  3. "دليل المطور العقاري في جدة لاختيار مقاول الواجهات"
- **REQ:** REQ-009-4, REQ-009-5

---

## Phase 8 — Validation & Final Checks

### Task 58: Full Build, Schema, and Link Validation
- [x] Run `npm run build` — confirm zero TypeScript errors and zero build warnings
- [x] Verify all correctness properties from design §12 hold:
  - **P-001:** Run `next build` and check sitemap output — confirm zero 404 URLs
  - **P-002:** Test ≥5 representative pages in Google Rich Results Test — confirm zero schema errors
  - **P-003:** Compare `organization.ts` NAP values against `ar.json` footer — must be identical
  - **P-004:** Confirm `categoryMap` values in service page match category values in all `projects.json` files
  - **P-005:** Test 3 pages with hreflang — confirm `ar`, `en`, and `x-default` link tags exist in HTML `<head>`
  - **P-006:** Search codebase for all `<Link href=` values — confirm each resolves to a registered route
  - **P-007:** For each named blog author not in the collective list, verify a matching `team.json` entry exists
  - **P-008:** Confirm `public/images/og-default.jpg` exists and is ≥1200px wide
  - **P-009:** Review location page descriptions for uniqueness — no two pages share >40% identical text
  - **P-010:** Search `cost-guides.json` for SAR/ريال numeric price values — confirm none exist
- [x] Verify robots.txt still disallows `/ar/portal`, `/en/portal`, `/api/`, `/_next/` and `/thank-you` is noindex
- [x] Confirm WhatsApp number is the real business number in all locations (no `966500000000`)
- [x] Confirm all 7 critical quick-win fixes from Phase 1 are complete
- **Design ref:** §12

---

## Task Dependency Map

```
Phase 1 (Tasks 1-7) — No dependencies — must complete before anything else
  └── Phase 2 (Tasks 8-15) — depends on Task 8 (schema functions) for Tasks 9-15
      └── Phase 3 (Tasks 16-31) — content files needed before Phase 4 routes
          └── Phase 4 (Tasks 32-39) — routes depend on Phase 3 content files + Phase 2 schema
              └── Phase 5 (Tasks 40-47) — sitemap extends Phase 4 routes; technical fixes are parallel
                  └── Phase 6 (Tasks 48-54) — internal linking depends on all pages existing
                      └── Phase 7 (Tasks 55-57) — content creation (parallel with Phase 6)
                          └── Phase 8 (Task 58) — final validation, requires all other tasks complete
```

**Parallel work possible:**
- Tasks 16-30 (content JSON files) can all be done simultaneously
- Tasks 41-44 (technical fixes) are independent of each other
- Tasks 55-57 (blog content) can be written in parallel with Tasks 32-39 (routes)

---

## Summary

| Phase | Tasks | Focus |
|---|---|---|
| 1 — Bug Fixes | 1–7 | Critical pre-launch blockers |
| 2 — Schema | 8–15 | JSON-LD structured data coverage |
| 3 — Content Data | 16–31 | JSON content files for new pages |
| 4 — New Routes | 32–39 | New page templates (sub-services, industries, locations, costs, case studies, FAQ, team, thank-you) |
| 5 — Technical | 40–47 | Sitemap, headers, Image migration, GA4, NAP |
| 6 — Linking & CRO | 48–54 | Internal links, navigation, mobile CTA, social proof |
| 7 — Blog Content | 55–57 | Cost guides, pillar pages, comparison + local posts |
| 8 — Validation | 58 | Full build + all correctness property checks |
| **Total** | **58 tasks** | |

# 03 — Website SEO Architecture
## مؤسسة الفهد للمقاولات | Al-Fahad Contracting Company

> **Document Purpose:** Define the complete URL structure, SEO purpose, target keywords, search intent, and internal linking role for every page on the Al-Fahad Contracting Company website. This document is the canonical URL reference — all other strategy documents must align to the slugs and hierarchy defined here.

---

## Architecture Principles

1. **Max 3 URL levels** for primary service/industry pages (authority concentration)
2. **Transliterated slugs** for Arabic pages — see naming conventions section for rationale
3. **Flat hierarchy** for core commercial pages — ≤ 3 clicks from homepage
4. **Topic clustering** — every blog post, FAQ, and case study links back to a pillar service page
5. **Bilingual parity** — every Arabic URL (`/ar/...`) has an exact English equivalent at `/en/...`
6. **Next.js `/[locale]/` routing** — all URLs are prefixed with `/ar/` (default RTL locale) or `/en/` (LTR locale)

---

## Slug Language Decision: Transliterated vs. Arabic Unicode

**Decision: Use transliterated (Latin-character) slugs for all Arabic-locale pages.**

**Rationale:**
- Arabic Unicode slugs (e.g., `/ar/خدمات/الالمنيوم/`) suffer from percent-encoding in browser address bars, link sharing, and copy-paste scenarios, producing URLs like `/ar/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA/%D8%A7%D9%84%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%88%D9%85/`
- Transliterated slugs (e.g., `/ar/khadamat/aluminium/`) are human-readable in any context, safer to share via WhatsApp/SMS (common in Saudi Arabia), and avoid encoding issues in XML sitemaps and hreflang tags
- Google treats transliterated Arabic slugs as fully valid for Arabic-locale pages when hreflang is correctly set
- Analytics tools (GA4, GSC, Ahrefs) display transliterated slugs cleanly without decoding
- This aligns with best practices from Semrush, Ahrefs, and Google's own Arabic SEO guidance

The `Arabic URL Slug` column below reflects the **recommended transliterated** form. For reference, an Arabic Unicode version is noted in the SEO purpose cell where helpful.

---

## URL Tables

### Level 1 — Core Pages

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/` | `/ar/` | `/ar/` | Al-Fahad Contracting — Aluminum, Glass & Steel Works in Riyadh | مؤسسة الفهد للمقاولات — أعمال الألمنيوم والزجاج والحديد بالرياض | Brand hub + primary service gateway; first touchpoint for branded and broad commercial queries | aluminum glass steel contractor Riyadh | مقاول ألمنيوم وزجاج وحديد الرياض | Commercial / Navigational | Hub — links to all 3 service pillar pages, industries, locations, and CTAs | Pillar (Site Root) | 1 |
| `/en/about/` | `/ar/about/` | `/ar/ann-about/` | About Al-Fahad Contracting — 25+ Years of Facade Excellence | من نحن — مؤسسة الفهد للمقاولات، 25 عامًا من التميز | Company authority, E-E-A-T signals, entity establishment for AI search | Al-Fahad Contracting Company Riyadh | مؤسسة الفهد للمقاولات | Navigational / Informational | Spoke — links to services, projects, certifications, contact | Supporting | 1 |
| `/en/services/` | `/ar/services/` | `/ar/khadamat/` | Our Services — Aluminum, Glass & Steel Works | خدماتنا — أعمال الألمنيوم والزجاج والهياكل المعدنية | Service hub (pillar hub); distributes link equity to all 3 service pillar pages | aluminum glass steel works Saudi Arabia | خدمات الألمنيوم والزجاج والحديد السعودية | Commercial | Hub — links to 3 service pillars + all sub-services | Pillar (Hub) | 1 |
| `/en/projects/` | `/ar/projects/` | `/ar/mashari3/` | Our Projects — Facade & Structural Projects in Riyadh | مشاريعنا — مشاريع الواجهات والإنشاءات في الرياض | Portfolio authority; showcases 300+ completed projects to build trust | facade projects Riyadh | مشاريع الواجهات الرياض | Commercial / Informational | Hub — links to individual project pages and service pages | Pillar (Hub) | 1 |
| `/en/blog/` | `/ar/blog/` | `/ar/blog/` | Blog — Facade Engineering & Construction Insights | المدونة — رؤى هندسة الواجهات والمقاولات | Topical authority building; TOFU traffic; internal link distribution to service pages | facade engineering blog Saudi Arabia | مدونة هندسة الواجهات السعودية | Informational | Hub — links to service pages, FAQ pages, cost pages | Pillar (Hub) | 1 |
| `/en/resources/` | `/ar/resources/` | `/ar/mawarid/` | Resources — Guides, Specs & Downloads for Facade Projects | الموارد — أدلة ومواصفات وتنزيلات مشاريع الواجهات | Lead magnet hub; captures MOFU traffic via downloadable guides; supports E-E-A-T | facade engineering resources guides | موارد ومراجع هندسة الواجهات | Informational | Hub — links to service pages, gated downloads, consultation page | Cluster (Hub) | 1 |
| `/en/faqs/` | `/ar/faqs/` | `/ar/as2ila-sha2i3a/` | Frequently Asked Questions — Aluminum, Glass & Steel Works | الأسئلة الشائعة — أعمال الألمنيوم والزجاج والهياكل المعدنية | Featured snippets, PAA, voice search, AI Overview citations; MOFU nurturing | aluminum glass steel FAQ Saudi Arabia | أسئلة شائعة أعمال الألمنيوم والزجاج | Informational | Spoke — links to all service pages and cost pages | Supporting | 1 |
| `/en/contact/` | `/ar/contact/` | `/ar/ittasal/` | Contact Us — Al-Fahad Contracting Company Riyadh | اتصل بنا — مؤسسة الفهد للمقاولات الرياض | Primary lead conversion page; captures direct contact inquiries | contact aluminum contractor Riyadh | تواصل مع مقاول الواجهات الرياض | Transactional | Leaf — terminal conversion page; linked from all commercial pages | Supporting | 1 |
| `/en/request-quote/` | `/ar/request-quote/` | `/ar/itlub-3ard-sa3r/` | Request a Quote — Aluminum, Glass & Steel Projects | اطلب عرض سعر — مشاريع الألمنيوم والزجاج والحديد | Primary RFQ conversion page; bottom-of-funnel lead capture | request quote aluminum facade Riyadh | طلب عرض سعر أعمال الألمنيوم | Transactional | Leaf — terminal conversion page; primary CTA target across entire site | Supporting | 1 |
| `/en/consultation/` | `/ar/consultation/` | `/ar/istishara/` | Free Consultation — Facade Engineering & Steel Projects | استشارة مجانية — هندسة الواجهات والمشاريع المعدنية | Secondary lead conversion; softer CTA for earlier-funnel prospects | free consultation facade engineer Riyadh | استشارة مجانية هندسة الواجهات | Transactional | Leaf — terminal conversion page; linked from service, industry, location pages | Supporting | 1 |

---

### Level 2 — Service Pages (Pillar Pages)

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/services/aluminum/` | `/ar/services/aluminum/` | `/ar/khadamat/aluminium/` | Aluminum Works in Riyadh — Windows, Doors, Facades & More | أعمال الألمنيوم بالرياض — نوافذ وأبواب وواجهات وأنظمة متكاملة | Aluminum pillar page; targets all high-volume aluminum commercial queries; distributes equity to 7 sub-service spoke pages | aluminum works Riyadh | أعمال الألمنيوم الرياض | Commercial | Hub/Pillar — links to 7 aluminum sub-services, projects, case studies, cost pages, FAQ, industries | Pillar | 2 |
| `/en/services/glass/` | `/ar/services/glass/` | `/ar/khadamat/zujaj/` | Glass Works & Facade Engineering in Riyadh — Tempered, Laminated & Structural Glass | هندسة الواجهات الزجاجية بالرياض — زجاج مقسى وزجاج مصفح وأنظمة الواجهات | Glass pillar page; targets all glass facade and engineering queries; distributes equity to 6 sub-service spoke pages | glass facade works Riyadh | هندسة الواجهات الزجاجية الرياض | Commercial | Hub/Pillar — links to 6 glass sub-services, projects, case studies, cost pages, FAQ, industries | Pillar | 2 |
| `/en/services/steel/` | `/ar/services/steel/` | `/ar/khadamat/hayadil-ma3daniya/` | Steel Structures in Riyadh — Structural, Fabrication & Installation | الهياكل المعدنية بالرياض — إنشاء وتصنيع وتركيب الهياكل الفولاذية | Steel pillar page; targets all steel structure queries; distributes equity to 7 sub-service spoke pages | steel structures Riyadh | الهياكل المعدنية الرياض | Commercial | Hub/Pillar — links to 7 steel sub-services, projects, case studies, cost pages, FAQ, industries | Pillar | 2 |

---

### Level 3 — Aluminum Sub-Service Pages

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/services/aluminum/windows/` | `/ar/services/aluminum/windows/` | `/ar/khadamat/aluminium/nawafidh/` | Aluminum Windows in Riyadh — Custom Fabrication & Installation | نوافذ ألمنيوم بالرياض — تصنيع وتركيب مخصص | Long-tail and transactional aluminum windows queries; captures high-volume residential + commercial intent | aluminum windows Riyadh | نوافذ ألمنيوم الرياض | Transactional / Commercial | Spoke — links to aluminum pillar, related sub-services (doors, facades), projects, cost page, RFQ | Cluster | 3 |
| `/en/services/aluminum/doors/` | `/ar/services/aluminum/doors/` | `/ar/khadamat/aluminium/abwab/` | Aluminum Doors in Riyadh — Commercial & Residential Installation | أبواب ألمنيوم بالرياض — للمشاريع التجارية والسكنية | Aluminum doors specific queries; transactional intent for both residential villa owners and commercial clients | aluminum doors Riyadh | أبواب ألمنيوم الرياض | Transactional / Commercial | Spoke — links to aluminum pillar, windows, facades sub-services, projects, RFQ | Cluster | 3 |
| `/en/services/aluminum/facades/` | `/ar/services/aluminum/facades/` | `/ar/khadamat/aluminium/wajhat/` | Aluminum Facades in Riyadh — Architectural Facade Systems | واجهات ألمنيوم بالرياض — أنظمة الواجهات المعمارية | High-value commercial intent for architectural aluminum facade projects | aluminum facades Riyadh | واجهات ألمنيوم الرياض | Transactional | Spoke — links to aluminum pillar, curtain walls, cladding, glass facades, projects, case studies, RFQ | Cluster | 3 |
| `/en/services/aluminum/curtain-walls/` | `/ar/services/aluminum/curtain-walls/` | `/ar/khadamat/aluminium/sata2ir-zujajiya/` | Curtain Wall Systems in Riyadh — Aluminum & Glass Curtain Walls | أنظمة الستائر الزجاجية بالرياض — واجهات الألمنيوم والزجاج المتكاملة | High-value Tier-1 developer and government project query; premium product with high ticket value | curtain wall systems Riyadh | ستائر زجاجية الرياض | Transactional | Spoke — links to aluminum pillar, glass pillar, facades, spider glass, projects, case studies, RFQ | Cluster | 3 |
| `/en/services/aluminum/custom-systems/` | `/ar/services/aluminum/custom-systems/` | `/ar/khadamat/aluminium/andhima-mukhasasa/` | Custom Aluminum Systems — Bespoke Facade Engineering Solutions | أنظمة ألمنيوم مخصصة — حلول هندسة الواجهات حسب المواصفات | Captures decision-stage queries from architects and consultants needing custom solutions | custom aluminum systems Saudi Arabia | أنظمة ألمنيوم مخصصة السعودية | Commercial | Spoke — links to aluminum pillar, facades, curtain walls, resources, consultation | Cluster | 3 |
| `/en/services/aluminum/cladding/` | `/ar/services/aluminum/cladding/` | `/ar/khadamat/aluminium/cladding/` | Aluminum Cladding in Riyadh — Exterior Wall Cladding Systems | كلادينج ألمنيوم بالرياض — أنظمة تكسية الجدران الخارجية | Captures architectural cladding queries from developers and contractors | aluminum cladding Riyadh | كلادينج ألمنيوم الرياض | Commercial / Transactional | Spoke — links to aluminum pillar, facades, steel cladding, projects, cost page, RFQ | Cluster | 3 |
| `/en/services/aluminum/skylights/` | `/ar/services/aluminum/skylights/` | `/ar/khadamat/aluminium/fathat-3ulwiya/` | Aluminum Skylights in Riyadh — Roof Glazing & Skylight Systems | فتحات علوية ألمنيوم بالرياض — أنظمة الإضاءة الطبيعية للأسقف | Niche but high-intent specialty product query from architects and commercial developers | aluminum skylights Riyadh | فتحات علوية ألمنيوم الرياض | Commercial | Spoke — links to aluminum pillar, glass structural, projects, consultation, RFQ | Cluster | 3 |

---

### Level 3 — Glass Sub-Service Pages

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/services/glass/tempered/` | `/ar/services/glass/tempered/` | `/ar/khadamat/zujaj/muqassa/` | Tempered Glass in Riyadh — Safety Glass Supply & Installation | زجاج مقسى بالرياض — توريد وتركيب الزجاج الأمني | Safety and commercial intent for tempered glass in facades, partitions, and balustrades | tempered glass Riyadh | زجاج مقسى الرياض | Commercial / Transactional | Spoke — links to glass pillar, laminated, partitions, facades, projects, cost, RFQ | Cluster | 3 |
| `/en/services/glass/laminated/` | `/ar/services/glass/laminated/` | `/ar/khadamat/zujaj/musaffah/` | Laminated Glass in Riyadh — Safety Laminated Glass Systems | زجاج مصفح بالرياض — أنظمة الزجاج الأمني المصفح | Specialty safety glass product queries from architects, engineers, and developers | laminated glass Riyadh | زجاج مصفح الرياض | Commercial / Transactional | Spoke — links to glass pillar, tempered, structural glass, projects, RFQ | Cluster | 3 |
| `/en/services/glass/facades/` | `/ar/services/glass/facades/` | `/ar/khadamat/zujaj/wajhat/` | Glass Facades in Riyadh — Architectural Glass Facade Systems | واجهات زجاجية بالرياض — أنظمة الواجهات الزجاجية المعمارية | High-volume primary query; targets developers, government, hospitality clients seeking full glass facade systems | glass facades Riyadh | واجهات زجاجية الرياض | Transactional | Spoke — links to glass pillar, curtain walls, spider glass, structural glass, projects, case studies, RFQ | Cluster | 3 |
| `/en/services/glass/partitions/` | `/ar/services/glass/partitions/` | `/ar/khadamat/zujaj/fawasil/` | Glass Partitions in Riyadh — Office & Commercial Glass Partitions | فواصل زجاجية بالرياض — فواصل الزجاج للمكاتب والمشاريع التجارية | Commercial interior partition queries from office fit-out and commercial project clients | glass partitions Riyadh | فواصل زجاجية الرياض | Transactional | Spoke — links to glass pillar, tempered glass, office buildings industry page, projects, RFQ | Cluster | 3 |
| `/en/services/glass/structural/` | `/ar/services/glass/structural/` | `/ar/khadamat/zujaj/hayakil/` | Structural Glass Systems in Riyadh — Load-Bearing Glass Engineering | زجاج هيكلي بالرياض — هندسة الزجاج الإنشائي تحت الأحمال | Premium high-spec structural glass queries from Tier-1 developers and government architects | structural glass Riyadh | زجاج هيكلي الرياض | Commercial | Spoke — links to glass pillar, spider glass, glass facades, curtain walls, projects, RFQ | Cluster | 3 |
| `/en/services/glass/spider-glass/` | `/ar/services/glass/spider-glass/` | `/ar/khadamat/zujaj/spider-glass/` | Spider Glass Systems in Riyadh — Point-Fixed Glass Facade Engineering | نظام سبايدر جلاس بالرياض — هندسة الواجهات الزجاجية المعلقة | Specialty product query; architects and luxury developers searching for premium point-fixed glass systems | spider glass system Riyadh | نظام سبايدر جلاس الرياض | Commercial | Spoke — links to glass pillar, structural glass, glass facades, curtain walls, luxury projects, RFQ | Cluster | 3 |

---

### Level 3 — Steel Sub-Service Pages

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/services/steel/structural/` | `/ar/services/steel/structural/` | `/ar/khadamat/hayadil-ma3daniya/inshaiya/` | Structural Steel Works in Riyadh — Steel Frame Engineering | أعمال الهياكل الإنشائية بالرياض — هندسة الأطر الفولاذية | Primary structural steel query from general contractors and industrial project clients | structural steel works Riyadh | أعمال الهياكل المعدنية الإنشائية الرياض | Commercial | Spoke — links to steel pillar, fabrication, installation, warehouses, industrial industry page, projects, RFQ | Cluster | 3 |
| `/en/services/steel/fabrication/` | `/ar/services/steel/fabrication/` | `/ar/khadamat/hayadil-ma3daniya/tasni3/` | Steel Fabrication in Riyadh — Custom Steel Structure Manufacturing | تصنيع هياكل معدنية بالرياض — تصنيع الهياكل الفولاذية المخصصة | Commercial intent for bespoke steel fabrication from contractors and industrial clients | steel fabrication Riyadh | تصنيع هياكل معدنية الرياض | Commercial / Transactional | Spoke — links to steel pillar, structural, installation, projects, case studies, RFQ | Cluster | 3 |
| `/en/services/steel/installation/` | `/ar/services/steel/installation/` | `/ar/khadamat/hayadil-ma3daniya/tarkib/` | Steel Structure Installation in Riyadh — Professional Erection Services | تركيب هياكل معدنية بالرياض — خدمات التركيب والتشييد الاحترافي | Transactional query from contractors needing installation-only services or full supply-and-erect | steel structure installation Riyadh | تركيب هياكل معدنية الرياض | Transactional | Spoke — links to steel pillar, fabrication, structural, projects, RFQ | Cluster | 3 |
| `/en/services/steel/canopies/` | `/ar/services/steel/canopies/` | `/ar/khadamat/hayadil-ma3daniya/madhallat/` | Steel Canopies in Riyadh — Metal Canopy Design & Installation | مظلات معدنية بالرياض — تصميم وتركيب المظلات الفولاذية | High search volume in Saudi Arabia; covers residential villas, commercial, and institutional canopy queries | steel canopies Riyadh | مظلات معدنية الرياض | Transactional | Spoke — links to steel pillar, warehouses, villas industry page, cost page, projects, RFQ | Cluster | 3 |
| `/en/services/steel/mezzanine/` | `/ar/services/steel/mezzanine/` | `/ar/khadamat/hayadil-ma3daniya/mezzanine/` | Mezzanine Floors in Riyadh — Steel Mezzanine Construction | ميزانين معدني بالرياض — إنشاء الطوابق المعلقة الفولاذية | Commercial intent for warehouses, factories, and retail fit-out clients adding mezzanine levels | mezzanine floors Riyadh | ميزانين معدني الرياض | Transactional | Spoke — links to steel pillar, warehouses, industrial industry page, cost page, RFQ | Cluster | 3 |
| `/en/services/steel/warehouses/` | `/ar/services/steel/warehouses/` | `/ar/khadamat/hayadil-ma3daniya/hanajir/` | Steel Warehouses & Hangars in Riyadh — Pre-Engineered Buildings | هناجر معدنية بالرياض — مباني ما قبل التصنيع والمخازن الفولاذية | High-volume industrial query; one of the most-searched steel products in Saudi Arabia | steel warehouses Riyadh | هناجر معدنية الرياض | Transactional | Spoke — links to steel pillar, fabrication, mezzanine, industrial industry page, cost page, RFQ | Cluster | 3 |
| `/en/services/steel/cladding/` | `/ar/services/steel/cladding/` | `/ar/khadamat/hayadil-ma3daniya/cladding/` | Steel Cladding in Riyadh — Exterior Metal Cladding Systems | كلادينج معدني بالرياض — أنظمة التكسية المعدنية الخارجية | Captures exterior cladding queries for industrial and commercial buildings | steel cladding Riyadh | كلادينج معدني الرياض | Commercial / Transactional | Spoke — links to steel pillar, aluminum cladding, industrial industry page, projects, RFQ | Cluster | 3 |

---

### Industry Pages

#### Industry Hub

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/industries/` | `/ar/industries/` | `/ar/qita3at/` | Industries We Serve — Aluminum, Glass & Steel for Every Sector | القطاعات التي نخدمها — ألمنيوم وزجاج وحديد لكل قطاع | Industry hub; distributes equity to 10 vertical landing pages; captures broad B2B sector searches | aluminum glass steel contractor Saudi Arabia sectors | قطاعات خدمات الألمنيوم والزجاج والحديد السعودية | Commercial | Hub — links to all 10 industry pages, 3 service pillars, projects | Pillar (Hub) | 1 |

#### Individual Industry Pages

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/industries/villas/` | `/ar/industries/villas/` | `/ar/qita3at/fiyyal/` | Aluminum & Glass Works for Villas in Riyadh | أعمال الألمنيوم والزجاج للفلل بالرياض | Captures high-volume residential villa owner queries; Saudi villas are a major market segment | aluminum works for villas Riyadh | أعمال ألمنيوم للفلل الرياض | Commercial | Spoke — links to industries hub, aluminum pillar, glass pillar, villa projects, cost page, RFQ | Cluster | 2 |
| `/en/industries/residential/` | `/ar/industries/residential/` | `/ar/qita3at/mashari3-sakaniya/` | Aluminum & Glass for Residential Buildings — Developer Solutions | ألمنيوم وزجاج للمشاريع السكنية — حلول المطورين العقاريين | Targets real estate developers building apartment and residential tower projects | aluminum glass residential buildings Saudi Arabia | مقاول واجهات المشاريع السكنية السعودية | Commercial | Spoke — links to industries hub, aluminum + glass pillars, residential projects, developers industry, RFQ | Cluster | 2 |
| `/en/industries/commercial/` | `/ar/industries/commercial/` | `/ar/qita3at/mabani-tijariya/` | Aluminum & Glass for Commercial Buildings — Office & Retail Facades | ألمنيوم وزجاج للمباني التجارية — واجهات المكاتب والمحال التجارية | Captures general commercial building client queries from developers and main contractors | glass aluminum commercial buildings Riyadh | واجهات زجاجية للمباني التجارية الرياض | Commercial | Spoke — links to industries hub, glass + aluminum pillars, curtain walls, office buildings, projects, RFQ | Cluster | 2 |
| `/en/industries/hospitality/` | `/ar/industries/hospitality/` | `/ar/qita3at/funduq-wa-muntaja3at/` | Aluminum & Glass for Hotels & Resorts — Luxury Facade Engineering | ألمنيوم وزجاج للفنادق والمنتجعات — هندسة الواجهات الفاخرة | Targets hospitality developers and hotel chains; premium segment with high project values | aluminum glass hotel facades Riyadh | أعمال ألمنيوم للفنادق الرياض | Commercial | Spoke — links to industries hub, glass + aluminum pillars, spider glass, curtain walls, luxury projects, RFQ | Cluster | 2 |
| `/en/industries/government/` | `/ar/industries/government/` | `/ar/qita3at/mashari3-hukumiya/` | Government Building Projects — Certified Aluminum & Glass Contractor | مشاريع المباني الحكومية — مقاول ألمنيوم وزجاج معتمد حكومي | Captures Vision 2030 and government project queries; critical for tender pre-qualification | government aluminum glass contractor Saudi Arabia | مقاول ألمنيوم معتمد حكومي السعودية | Commercial | Spoke — links to industries hub, all 3 service pillars, certifications, government projects, RFQ | Cluster | 2 |
| `/en/industries/industrial/` | `/ar/industries/industrial/` | `/ar/qita3at/munsha2at-sina3iya/` | Steel & Aluminum for Industrial Facilities — Riyadh & Saudi Arabia | هياكل معدنية وألمنيوم للمنشآت الصناعية — الرياض والمملكة العربية السعودية | Targets industrial clients (factories, manufacturing plants, logistics hubs) for steel and aluminum works | steel aluminum industrial facilities Saudi Arabia | هياكل معدنية للمنشآت الصناعية السعودية | Commercial | Spoke — links to industries hub, steel pillar, warehouses, fabrication, industrial projects, RFQ | Cluster | 2 |
| `/en/industries/real-estate-developers/` | `/ar/industries/real-estate-developers/` | `/ar/qita3at/mutawirun-3iqariyun/` | Facade Solutions for Real Estate Developers — Saudi Arabia | حلول الواجهات للمطورين العقاريين — المملكة العربية السعودية | High-value segment; developers control multiple project pipelines and represent large contract value | aluminum glass steel for real estate developers Saudi Arabia | مقاول واجهات للمطورين العقاريين السعوديين | Commercial | Spoke — links to industries hub, all 3 service pillars, residential, commercial, projects, case studies, RFQ | Cluster | 2 |
| `/en/industries/warehouses/` | `/ar/industries/warehouses/` | `/ar/qita3at/makazin-wa-hanajir/` | Steel Warehouses & Industrial Storage — Custom Built Solutions | مخازن وهناجر معدنية — حلول بناء مخصصة | Targets logistics, industrial, and commercial clients needing pre-engineered steel warehouse buildings | steel warehouse construction Riyadh | بناء هناجر معدنية الرياض | Transactional | Spoke — links to industries hub, steel pillar, warehouses sub-service, mezzanine, cost page, RFQ | Cluster | 2 |
| `/en/industries/shopping-centers/` | `/ar/industries/shopping-centers/` | `/ar/qita3at/marakiz-tasawuq/` | Aluminum & Glass for Shopping Centers — Facade & Interior Works | ألمنيوم وزجاج لمراكز التسوق — واجهات وأعمال داخلية | Retail developer segment; shopping center glass and aluminum facades are high-value contracts | glass aluminum shopping center facades Saudi Arabia | واجهات زجاجية لمراكز التسوق السعودية | Commercial | Spoke — links to industries hub, glass + aluminum pillars, curtain walls, spider glass, projects, RFQ | Cluster | 2 |
| `/en/industries/office-buildings/` | `/ar/industries/office-buildings/` | `/ar/qita3at/mabani-maktabiya/` | Aluminum & Glass for Office Buildings — Corporate Facade Engineering | ألمنيوم وزجاج لمباني المكاتب — هندسة الواجهات المؤسسية | Targets commercial real estate and corporate construction clients; high-value B2B queries | glass aluminum office building facades Riyadh | واجهات ألمنيوم لمباني المكاتب الرياض | Commercial | Spoke — links to industries hub, glass + aluminum pillars, glass partitions, curtain walls, projects, RFQ | Cluster | 2 |

---

### Location Pages

#### Locations Hub

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/locations/` | `/ar/locations/` | `/ar/manatiq-al-khidma/` | Our Service Areas — Riyadh, Jeddah, Dammam & Saudi Arabia | مناطق خدمتنا — الرياض وجدة والدمام والمملكة العربية السعودية | Location hub; distributes equity to all geographic landing pages; signals local SEO authority | aluminum glass steel contractor Saudi Arabia | شركة مقاولات الألمنيوم والزجاج والحديد السعودية | Commercial / Local | Hub — links to all Riyadh district pages, neighborhood pages, and future city pages | Cluster (Hub) | 1 |

#### Riyadh Districts (Level 2)

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/locations/north-riyadh/` | `/ar/locations/north-riyadh/` | `/ar/manatiq-al-khidma/shamal-riyadh/` | Aluminum, Glass & Steel Works in North Riyadh | أعمال الألمنيوم والزجاج والحديد في شمال الرياض | Local SEO for high-density residential and commercial development zone north of Riyadh ring road | aluminum glass contractor north Riyadh | شركة ألمنيوم شمال الرياض | Commercial / Local | Spoke — links to locations hub, 3 service pillars, neighborhoods (Al-Olaya, Al-Nakheel, Al-Sahafa), projects, RFQ | Cluster | 2 |
| `/en/locations/south-riyadh/` | `/ar/locations/south-riyadh/` | `/ar/manatiq-al-khidma/janub-riyadh/` | Aluminum, Glass & Steel Works in South Riyadh | أعمال الألمنيوم والزجاج والحديد في جنوب الرياض | Local SEO for southern Riyadh industrial and residential zones | aluminum glass contractor south Riyadh | شركة ألمنيوم جنوب الرياض | Commercial / Local | Spoke — links to locations hub, 3 service pillars, industrial industry page, projects, RFQ | Cluster | 2 |
| `/en/locations/east-riyadh/` | `/ar/locations/east-riyadh/` | `/ar/manatiq-al-khidma/sharq-riyadh/` | Aluminum, Glass & Steel Works in East Riyadh | أعمال الألمنيوم والزجاج والحديد في شرق الرياض | Local SEO for rapidly developing eastern Riyadh districts | aluminum glass contractor east Riyadh | شركة ألمنيوم شرق الرياض | Commercial / Local | Spoke — links to locations hub, 3 service pillars, Al-Malaz neighborhood, projects, RFQ | Cluster | 2 |
| `/en/locations/west-riyadh/` | `/ar/locations/west-riyadh/` | `/ar/manatiq-al-khidma/gharb-riyadh/` | Aluminum, Glass & Steel Works in West Riyadh | أعمال الألمنيوم والزجاج والحديد في غرب الرياض | Local SEO for western Riyadh mixed-use and residential developments | aluminum glass contractor west Riyadh | مقاول واجهات غرب الرياض | Commercial / Local | Spoke — links to locations hub, 3 service pillars, projects, RFQ | Cluster | 2 |
| `/en/locations/central-riyadh/` | `/ar/locations/central-riyadh/` | `/ar/manatiq-al-khidma/wasat-riyadh/` | Aluminum, Glass & Steel Works in Central Riyadh | أعمال الألمنيوم والزجاج والحديد في وسط الرياض | Local SEO for CBD, government, and commercial core of Riyadh | aluminum glass contractor central Riyadh | مقاول ألمنيوم وسط الرياض | Commercial / Local | Spoke — links to locations hub, 3 service pillars, government industry page, projects, RFQ | Cluster | 2 |

#### Riyadh Neighborhoods (Level 2)

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/locations/al-olaya/` | `/ar/locations/al-olaya/` | `/ar/manatiq-al-khidma/al-3ulayya/` | Aluminum & Glass Works in Al-Olaya, Riyadh | أعمال الألمنيوم والزجاج في العليا، الرياض | Hyper-local SEO for Al-Olaya business district (premium commercial zone); targets office towers and luxury retail | aluminum glass contractor al-olaya Riyadh | شركة ألمنيوم العليا الرياض | Commercial / Local | Spoke — links to north Riyadh district, 3 service pillars, commercial + office buildings industries, RFQ | Supporting | 2 |
| `/en/locations/al-nakheel/` | `/ar/locations/al-nakheel/` | `/ar/manatiq-al-khidma/al-nakhill/` | Aluminum & Glass Works in Al-Nakheel, Riyadh | أعمال الألمنيوم والزجاج في النخيل، الرياض | Hyper-local SEO for Al-Nakheel residential district; high villa and compound density | aluminum glass contractor al-nakheel Riyadh | شركة ألمنيوم النخيل الرياض | Commercial / Local | Spoke — links to north Riyadh district, aluminum + glass pillars, villas industry, residential industry, RFQ | Supporting | 2 |
| `/en/locations/al-malaz/` | `/ar/locations/al-malaz/` | `/ar/manatiq-al-khidma/al-malaz/` | Aluminum & Glass Works in Al-Malaz, Riyadh | أعمال الألمنيوم والزجاج في الملز، الرياض | Hyper-local SEO for Al-Malaz established commercial and residential district in east Riyadh | aluminum glass contractor al-malaz Riyadh | شركة ألمنيوم الملز الرياض | Commercial / Local | Spoke — links to east Riyadh district, 3 service pillars, residential + commercial industries, RFQ | Supporting | 2 |
| `/en/locations/al-sahafa/` | `/ar/locations/al-sahafa/` | `/ar/manatiq-al-khidma/al-sahafa/` | Aluminum & Glass Works in Al-Sahafa, Riyadh | أعمال الألمنيوم والزجاج في الصحافة، الرياض | Hyper-local SEO for Al-Sahafa upscale residential neighborhood in north Riyadh | aluminum glass contractor al-sahafa Riyadh | شركة ألمنيوم الصحافة الرياض | Commercial / Local | Spoke — links to north Riyadh district, aluminum + glass pillars, villas industry, RFQ | Supporting | 2 |
| `/en/locations/diplomatic-quarter/` | `/ar/locations/diplomatic-quarter/` | `/ar/manatiq-al-khidma/al-hay-al-duplumasi/` | Aluminum & Glass Works in the Diplomatic Quarter, Riyadh | أعمال الألمنيوم والزجاج في الحي الدبلوماسي، الرياض | Hyper-local SEO for the prestigious Diplomatic Quarter; targets luxury residential and embassy/institutional projects | aluminum glass contractor diplomatic quarter Riyadh | شركة ألمنيوم الحي الدبلوماسي الرياض | Commercial / Local | Spoke — links to west Riyadh district, aluminum + glass pillars, villas + government industries, RFQ | Supporting | 2 |

#### Future Cities (Level 2)

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/locations/jeddah/` | `/ar/locations/jeddah/` | `/ar/manatiq-al-khidma/jidda/` | Aluminum, Glass & Steel Works in Jeddah | أعمال الألمنيوم والزجاج والحديد في جدة | Future expansion market; second-largest city in KSA; major commercial and hospitality construction market | aluminum glass steel contractor Jeddah | شركة ألمنيوم وزجاج جدة | Commercial / Local | Spoke — links to locations hub, 3 service pillars, hospitality + commercial industries, contact, RFQ | Cluster | 2 |
| `/en/locations/dammam/` | `/ar/locations/dammam/` | `/ar/manatiq-al-khidma/dammam/` | Aluminum, Glass & Steel Works in Dammam | أعمال الألمنيوم والزجاج والحديد في الدمام | Eastern Province expansion market; industrial and ARAMCO-adjacent project opportunities | aluminum glass steel contractor Dammam | شركة ألمنيوم وزجاج الدمام | Commercial / Local | Spoke — links to locations hub, 3 service pillars, industrial industry, contact, RFQ | Cluster | 2 |
| `/en/locations/al-khobar/` | `/ar/locations/al-khobar/` | `/ar/manatiq-al-khidma/khubar/` | Aluminum, Glass & Steel Works in Al-Khobar | أعمال الألمنيوم والزجاج والحديد في الخبر | Eastern Province premium residential and commercial market expansion | aluminum glass contractor al-khobar | مقاول واجهات الخبر | Commercial / Local | Spoke — links to locations hub, aluminum + glass pillars, commercial + residential industries, RFQ | Cluster | 2 |
| `/en/locations/makkah/` | `/ar/locations/makkah/` | `/ar/manatiq-al-khidma/makkah/` | Aluminum, Glass & Steel Works in Makkah | أعمال الألمنيوم والزجاج والحديد في مكة المكرمة | Hospitality and religious tourism construction boom; mega-projects and hotel development market | aluminum glass contractor Makkah | شركة ألمنيوم وزجاج مكة المكرمة | Commercial / Local | Spoke — links to locations hub, aluminum + glass pillars, hospitality industry, contact, RFQ | Cluster | 2 |
| `/en/locations/madinah/` | `/ar/locations/madinah/` | `/ar/manatiq-al-khidma/madinah/` | Aluminum, Glass & Steel Works in Madinah | أعمال الألمنيوم والزجاج والحديد في المدينة المنورة | Religious tourism and hospitality construction market; growing demand driven by Vision 2030 expansion of pilgrimage capacity | aluminum glass contractor Madinah | شركة ألمنيوم وزجاج المدينة المنورة | Commercial / Local | Spoke — links to locations hub, aluminum + glass pillars, hospitality industry, contact, RFQ | Cluster | 2 |

---

### Cost Pages

#### Cost Hub

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/cost/` | `/ar/cost/` | `/ar/as3ar/` | Project Cost Guides — Aluminum, Glass & Steel Works in Saudi Arabia | أدلة تكاليف المشاريع — أعمال الألمنيوم والزجاج والحديد في السعودية | Cost hub; aggregates all cost-related commercial intent traffic; captures MOFU buyers researching pricing | aluminum glass steel cost Saudi Arabia | أسعار أعمال الألمنيوم والزجاج السعودية | Commercial | Hub — links to all individual cost pages, 3 service pillars, RFQ, consultation | Cluster (Hub) | 1 |

#### Individual Cost Pages

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/cost/aluminum-facades/` | `/ar/cost/aluminum-facades/` | `/ar/as3ar/wajhat-aluminium/` | Aluminum Facade Cost in Riyadh — Pricing Guide 2025 | تكلفة واجهات الألمنيوم بالرياض — دليل الأسعار 2025 | Captures high-commercial-intent cost queries from developers and contractors budgeting projects | aluminum facade cost Riyadh | سعر واجهات الألمنيوم الرياض | Commercial | Spoke — links to cost hub, aluminum pillar, facades sub-service, consultation, RFQ | Cluster | 2 |
| `/en/cost/glass-facades/` | `/ar/cost/glass-facades/` | `/ar/as3ar/wajhat-zujaj/` | Glass Facade Cost in Saudi Arabia — Pricing Guide 2025 | تكلفة الواجهات الزجاجية في السعودية — دليل الأسعار 2025 | High-intent cost query for glass facade projects; captures architects and developers in budget phase | glass facade cost Saudi Arabia | سعر واجهات زجاجية الرياض | Commercial | Spoke — links to cost hub, glass pillar, glass facades sub-service, consultation, RFQ | Cluster | 2 |
| `/en/cost/steel-structures/` | `/ar/cost/steel-structures/` | `/ar/as3ar/hayakil-ma3daniya/` | Steel Structure Cost in Riyadh — Pricing Guide 2025 | تكلفة الهياكل المعدنية بالرياض — دليل الأسعار 2025 | Commercial intent for steel structure budgeting from contractors and industrial developers | steel structure cost Riyadh | سعر هياكل معدنية الرياض | Commercial | Spoke — links to cost hub, steel pillar, structural sub-service, consultation, RFQ | Cluster | 2 |
| `/en/cost/curtain-walls/` | `/ar/cost/curtain-walls/` | `/ar/as3ar/sata2ir-zujajiya/` | Curtain Wall Cost in Saudi Arabia — Supply & Installation Pricing | تكلفة الستائر الزجاجية في السعودية — أسعار التوريد والتركيب | High-ticket item; developers and QS professionals actively search for curtain wall pricing | curtain wall cost Saudi Arabia | سعر الستائر الزجاجية السعودية | Commercial | Spoke — links to cost hub, curtain walls sub-service, glass + aluminum pillars, RFQ | Cluster | 2 |
| `/en/cost/aluminum-windows/` | `/ar/cost/aluminum-windows/` | `/ar/as3ar/nawafidh-aluminium/` | Aluminum Windows Cost in Riyadh — Pricing Guide 2025 | تكلفة نوافذ الألمنيوم بالرياض — دليل الأسعار 2025 | Very high search volume for villa owners and residential contractors | aluminum windows cost Riyadh | أسعار نوافذ ألمنيوم الرياض | Commercial | Spoke — links to cost hub, aluminum windows sub-service, aluminum pillar, villas industry, RFQ | Cluster | 2 |
| `/en/cost/steel-warehouses/` | `/ar/cost/steel-warehouses/` | `/ar/as3ar/hanajir-ma3daniya/` | Steel Warehouse Cost in Riyadh — Pre-Engineered Building Pricing | تكلفة الهناجر المعدنية بالرياض — أسعار المباني الجاهزة | High-volume industrial query; warehouse builders and investors actively search for steel hangar pricing | steel warehouse cost Riyadh | سعر هانجر معدني الرياض | Commercial | Spoke — links to cost hub, steel warehouses sub-service, industrial industry, RFQ | Cluster | 2 |
| `/en/cost/aluminum-cladding/` | `/ar/cost/aluminum-cladding/` | `/ar/as3ar/cladding-aluminium/` | Aluminum Cladding Cost in Riyadh — Exterior Cladding Pricing Guide | تكلفة كلادينج الألمنيوم بالرياض — دليل أسعار التكسية الخارجية | Cost query for commercial and residential cladding projects | aluminum cladding cost Riyadh | سعر كلادينج ألمنيوم الرياض | Commercial | Spoke — links to cost hub, aluminum cladding sub-service, steel cladding, RFQ | Cluster | 2 |
| `/en/cost/glass-partitions/` | `/ar/cost/glass-partitions/` | `/ar/as3ar/fawasil-zujaj/` | Glass Partition Cost in Riyadh — Office & Commercial Pricing Guide | تكلفة الفواصل الزجاجية بالرياض — أسعار المشاريع التجارية | Interior fit-out budget query from commercial property managers and office developers | glass partition cost Riyadh | سعر فواصل زجاجية الرياض | Commercial | Spoke — links to cost hub, glass partitions sub-service, office buildings industry, RFQ | Cluster | 2 |

---

### Case Studies Hub

| URL (English Locale) | URL (Arabic Locale) | Arabic URL Slug | Page Title (English) | Page Title (Arabic) | SEO Purpose | Primary Keyword (EN) | Primary Keyword (AR) | Search Intent | Internal Linking Role | Pillar / Cluster / Support | Depth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/en/case-studies/` | `/ar/case-studies/` | `/ar/dirasat-halat/` | Case Studies — Aluminum, Glass & Steel Projects in Saudi Arabia | دراسات الحالة — مشاريع الألمنيوم والزجاج والحديد في المملكة | Trust and authority building; showcases measurable project outcomes; targets "proof" searches from decision-stage buyers | aluminum glass steel case studies Saudi Arabia | دراسات حالة مشاريع الألمنيوم والزجاج السعودية | Commercial / Informational | Hub — links to individual case study pages, 3 service pillars, industry pages, projects | Cluster (Hub) | 1 |

---

## URL Hierarchy Depth Table

| Depth Level | Page Types | Rationale | Max Pages at This Level |
|---|---|---|---|
| **Depth 1** | Homepage, About, Services Hub, Projects Hub, Blog Hub, Resources Hub, Industries Hub, Locations Hub, Cost Hub, Case Studies Hub, FAQs, Contact, Request Quote, Consultation | Core commercial and conversion pages must be ≤ 1 click from homepage to maximize crawl priority and link equity flow | ~15 pages |
| **Depth 2** | Service Pillars (3), Individual Industry Pages (10), Riyadh Districts (5), Riyadh Neighborhoods (5), Future Cities (5), Cost Pages (8), Individual Project Pages, Individual Case Study Pages, Blog Category Pages | Primary revenue-driving and topical authority pages; reachable in 2 clicks; receive strong internal link equity from Depth 1 hubs | ~100–150 pages |
| **Depth 3** | Sub-Service Pages (20), Location-specific sub-pages, Project detail pages, Blog articles, FAQ detail pages, Resource documents | Long-tail and specific-intent pages; 3-click maximum maintained; clusters around Depth 2 pillar pages | 300–500+ pages at full buildout |
| **Depth 4** (avoid for SEO pages) | Paginated archive pages, tag/category sub-pages, user-generated comments | Non-commercial infrastructure pages only; SEO value minimal; paginated with rel=prev/next | Unlimited (exclude from priority sitemap) |

**Maximum URL depth rule:** No primary service, industry, location, or cost page may exceed 3 URL segments after the locale prefix (e.g., `/ar/khadamat/aluminium/nawafidh/` = 3 segments, acceptable). Blog articles and project pages may go to 4 segments maximum when slug specificity requires it.

---

## URL Naming Conventions

The following rules apply to **all** slug creation across Arabic and English locales:

| Rule | Requirement | Example |
|---|---|---|
| Case | Lowercase only | `/aluminum-windows/` ✓ — `/Aluminum-Windows/` ✗ |
| Word separator | Hyphens only (no underscores, no spaces) | `/steel-structures/` ✓ — `/steel_structures/` ✗ |
| Arabic slug style | Transliterated Latin characters (not Unicode Arabic) | `/ar/khadamat/aluminium/` ✓ — `/ar/خدمات/الالمنيوم/` ✗ |
| Transliteration standard | ALA-LC Arabic romanization adapted for URL readability; vowels included for readability; `3` for `ع`, `2` for `ء`/`أ` | `as3ar`, `manatiq`, `khadamat` |
| Maximum slug length | 5 words (hyphens) per path segment | `/aluminum-curtain-wall-systems/` ✓ — `/aluminum-commercial-architectural-curtain-wall-facade-systems/` ✗ |
| Numbers | Use numerals where naturally part of slug | `/vision-2030-projects/` |
| Stop words | Omit Arabic stop words (ال‎ definite article may remain where slug would be unreadable without it) | `/al-olaya/` preferred over `/olaya/` for proper nouns |
| Trailing slash | Always include trailing slash for consistency with Next.js routing | `/ar/khadamat/aluminium/` ✓ — `/ar/khadamat/aluminium` ✗ |
| Special characters | No special characters except hyphens; no percent-encoded characters in slug design | `/en/about/` ✓ — `/en/about%20us/` ✗ |
| Version/year in slugs | Only for content that is genuinely time-bound (cost guides, roadmaps) | `/en/cost/aluminum-facades/` preferred; year in title only |

---

## Canonical URL Strategy

### hreflang Implementation for `/ar/` and `/en/`

Every page on the site must include hreflang annotations pointing to the corresponding locale counterpart. In Next.js `/[locale]/` routing, implement via the `<head>` metadata:

```html
<!-- On /ar/khadamat/aluminium/ -->
<link rel="canonical" href="https://alfahad.com/ar/khadamat/aluminium/" />
<link rel="alternate" hreflang="ar" href="https://alfahad.com/ar/khadamat/aluminium/" />
<link rel="alternate" hreflang="en" href="https://alfahad.com/en/services/aluminum/" />
<link rel="alternate" hreflang="x-default" href="https://alfahad.com/ar/khadamat/aluminium/" />

<!-- On /en/services/aluminum/ -->
<link rel="canonical" href="https://alfahad.com/en/services/aluminum/" />
<link rel="alternate" hreflang="en" href="https://alfahad.com/en/services/aluminum/" />
<link rel="alternate" hreflang="ar" href="https://alfahad.com/ar/khadamat/aluminium/" />
<link rel="alternate" hreflang="x-default" href="https://alfahad.com/ar/khadamat/aluminium/" />
```

### Canonical Rules

| Scenario | Canonical Rule |
|---|---|
| Arabic page (`/ar/...`) | Self-canonical; `x-default` also points to Arabic URL (Arabic is the primary market) |
| English page (`/en/...`) | Self-canonical; hreflang `ar` points to Arabic equivalent |
| Paginated archive (page 2+) | Canonical points to page 1; use rel=next/prev for pagination signals |
| Filtered/sorted URL variants | Canonical points to the base (unfilitered) URL |
| WWW vs. non-WWW | Standardize on non-www; 301 redirect www to non-www |
| HTTP vs. HTTPS | All traffic redirected to HTTPS; HTTPS URL is canonical |
| Trailing slash consistency | Canonical always includes trailing slash |
| Duplicate content across locales | Do NOT canonicalize Arabic pages to English or vice versa — they are distinct locale pages and must use hreflang, not canonical cross-pointing |

### `x-default` Language Choice

Arabic (`/ar/`) is set as `x-default` because:
- Primary market is Saudi Arabia (Arabic-speaking)
- Google Search defaults to Arabic for Saudi IP addresses
- ~85% of target keyword searches in KSA are conducted in Arabic

---

## Internal Linking Role Legend

| Role | Definition | Characteristics | Examples |
|---|---|---|---|
| **Hub** | A high-authority aggregator page that distributes link equity to multiple child/spoke pages | High PageRank receiver; many outbound internal links; linked from homepage and navigation | Homepage, Services Hub, Industries Hub, Locations Hub, Blog Hub |
| **Pillar** | The primary authoritative page for a major topic cluster; receives all cluster-internal links | Highest keyword priority; 2,000–4,000+ words; links to all cluster spokes; receives links from all spokes | Aluminum Works page, Glass Works page, Steel Works page |
| **Spoke** (Cluster Page) | A supporting page within a cluster that links back to its pillar and sideways to related spokes | Mid-tier authority; 1,000–2,500 words; links to pillar + 2–4 sibling spokes; receives links from pillar and blog | Sub-service pages, cost pages, industry pages |
| **Support** (Supporting Page) | A conversion-critical or authority-signalling page not part of a topic cluster | Links to relevant hubs/pillars; receives links from many pages; minimal outbound links | About, Contact, Request Quote, Consultation |
| **Leaf** | A terminal page with no SEO outbound linking purpose; end of the funnel | Links only to conversion page (itself); no navigation-style outbound links needed | Request Quote form, Consultation form, Thank-You pages |

---

## Sitemap Priority Table

XML sitemap `<priority>` values guide crawlers on relative importance. Set as follows across all page types:

| Priority | Page Types | Change Frequency | Rationale |
|---|---|---|---|
| **1.0** | Homepage (`/ar/`, `/en/`) | daily | Highest authority page; most frequently updated |
| **0.9** | Service Pillar Pages (Aluminum, Glass, Steel), Request Quote, Contact | weekly | Primary revenue and conversion pages; core crawl priority |
| **0.8** | Sub-Service Pages (20), Industries Hub, Locations Hub, Cost Hub, Case Studies Hub, About | weekly | Secondary commercial pages; important for topical authority |
| **0.7** | Individual Industry Pages (10), Riyadh District Pages (5), Future City Pages (5), Cost Pages (8+), Individual Case Study Pages, Riyadh Neighborhood Pages (5), Blog Hub, Resources Hub, FAQs, Consultation | monthly | Supporting commercial and informational pages; update cadence lower |
| **0.5** | Individual Blog Articles, Individual Project Pages, FAQ Detail Pages, Resource Documents, Blog Category Pages, Paginated Archive Pages | monthly | Supporting topical authority content; large volume; lower individual priority |

**Note:** `<priority>` is a relative hint, not a guarantee. Pair with `<lastmod>` for maximum crawl efficiency. Pages excluded from sitemap: admin URLs, staging URLs, noindex pages, paginated pages beyond page 3, and internal utility pages.

---

## Cross-References

- Keyword assignments and Arabic/English term definitions: [02-keyword-research.md](./02-keyword-research.md)
- Service-level SEO strategy (content, meta templates, Schema): [04-service-seo-strategy.md](./04-service-seo-strategy.md)
- Internal link flow diagrams and anchor text patterns: [18-internal-linking-architecture.md](./18-internal-linking-architecture.md)
- Technical SEO implementation (hreflang, sitemaps, robots.txt, Core Web Vitals): [22-technical-seo-requirements.md](./22-technical-seo-requirements.md)

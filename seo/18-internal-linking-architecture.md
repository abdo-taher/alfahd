# 18 — Internal Linking Architecture
## مؤسسة الفهد للمقاولات | Al-Fahad Contracting Company

> **Document Purpose:** Define the complete internal linking rules, anchor text patterns, minimum/maximum link counts per page type, and visual architecture for the Al-Fahad website.

---

## Overview: PageRank Flow Principles

Internal links are the mechanism by which domain authority flows from high-authority hub pages to target commercial pages. Every internal link is a vote that says "this page is important." The goal is to concentrate authority on the pages that matter most for lead generation: the three Core_Service pillar pages.

**Core principle:** All roads lead to service pages. Every page on the site should have a path (within 3 clicks) to a service pillar page, and every service pillar page should receive links from the maximum number of relevant pages.

**PageRank flow model:**
```
Domain Authority (external links)
    ↓
Homepage (highest internal PageRank)
    ↓
Services Hub → Service Pillars (Aluminum, Glass, Steel)
    ↓
Sub-Service Pages → Industry Pages → Location Pages
    ↓
Project Pages → Case Studies → Cost Pages → Blog Articles
    ↓
Request Quote / Contact (conversion endpoints)
```

---

## Internal Linking Rules by Page Type

### Page Type 1: Service Pillar Pages (3 pages)

**URL examples:** `/en/services/aluminum/`, `/en/services/glass/`, `/en/services/steel/`

| Direction | Source → Target | Anchor Text Pattern (EN) | Anchor Text Pattern (AR) | SEO Rationale |
|---|---|---|---|---|
| OUT (pillar → cluster) | Aluminum → each sub-service page | "Aluminum Windows", "Curtain Wall Systems", etc. | "نوافذ الألمنيوم", "أنظمة الكيرتن وول" | Distribute authority to cluster pages |
| OUT (pillar → industry) | Aluminum → relevant industry pages | "Aluminum for Villas", "Commercial Building Aluminum" | "ألمنيوم للفلل", "ألمنيوم للمباني التجارية" | Cross-silo topical authority |
| OUT (pillar → cost) | Aluminum → aluminum facade cost page | "Aluminum Facade Cost Guide" | "دليل تكلفة واجهات الألمنيوم" | Capture MOFU intent |
| OUT (pillar → conversion) | Aluminum → Request Quote page | "Request a Quote", "اطلب عرض سعر" | "اطلب عرض سعر" | BOFU conversion |
| IN (cluster → pillar) | All 7 aluminum sub-service pages → Aluminum pillar | "Aluminum Works", "Our Full Aluminum Services" | "أعمال الألمنيوم", "خدماتنا الكاملة" | Consolidate cluster authority to pillar |
| IN (industry → pillar) | All relevant industry pages → pillar | Service name in context | Arabic service name | Reinforce topical co-occurrence |
| IN (location → pillar) | All Riyadh district pages → pillar | "[Service] in [Location]" | "[خدمة] في [موقع]" | Geographic-service co-citation |
| IN (blog → pillar) | Blog articles about that service → pillar | Natural contextual anchor | Natural Arabic anchor | Topic cluster signal |

**Minimum internal links per pillar page:** 12 outbound, 20+ inbound
**Maximum outbound internal links per pillar page:** 25 (avoid link dilution)

---

### Page Type 2: Sub-Service Pages (20 pages)

| Direction | Source → Target | Anchor Text Pattern | SEO Rationale |
|---|---|---|---|
| OUT (spoke → pillar) | Curtain Walls → Aluminum pillar | "Aluminum Works" | Required back-link to parent pillar |
| OUT (spoke → sibling) | Curtain Walls → Glass Facades | "Glass Curtain Wall Systems" | Cross-service relevance |
| OUT (spoke → cost) | Curtain Walls → curtain wall cost page | "Curtain Wall Cost Guide" | Pricing intent capture |
| OUT (spoke → industry) | Curtain Walls → Hospitality | "Glass Facades for Hotels" | Industry context |
| OUT (spoke → conversion) | → Request Quote | "Request a Quote" | Conversion |
| IN (pillar → spoke) | Aluminum pillar → Curtain Walls | "Curtain Wall Systems" | Authority distribution |
| IN (blog → spoke) | Blog on curtain walls → spoke | Natural contextual anchor | Topical reinforcement |

**Minimum internal links per sub-service page:** 5 outbound, 5+ inbound
**Maximum outbound internal links:** 8

---

### Page Type 3: Industry Pages (10 pages)

| Direction | Source → Target | Anchor Text Pattern | SEO Rationale |
|---|---|---|---|
| OUT (industry → all 3 pillars) | Hotels → Glass pillar, Aluminum pillar | "Glass Facade Works", "Aluminum Works" | Cross-service authority |
| OUT (industry → sub-service) | Hotels → Spider Glass, Curtain Walls | Specific system names | Service specificity |
| OUT (industry → project) | Hotels → hotel project pages | "View Our Hotel Projects" | Portfolio proof |
| OUT (industry → cost) | Hotels → glass facade cost page | "Glass Facade Cost for Hotels" | MOFU conversion |
| OUT (industry → conversion) | → Consultation page | "Schedule a Consultation" | Soft CTA |
| IN (location → industry) | North Riyadh → relevant industry | "Commercial Buildings in North Riyadh" | Geo-industry co-citation |
| IN (blog → industry) | Hotel facade article → industry page | Natural anchor | Topical |

**Minimum outbound links per industry page:** 6
**Maximum outbound links:** 10

---

### Page Type 4: Blog/Article Pages

| Direction | Source → Target | Anchor Text Pattern | SEO Rationale |
|---|---|---|---|
| OUT (article → pillar) | Curtain wall article → Glass pillar | "Glass Facade Engineering" | Required — every article links to at least 1 pillar |
| OUT (article → sub-service) | Curtain wall article → curtain walls sub-service | "Our Curtain Wall Systems" | Service CTA |
| OUT (article → cost) | Cost-related article → cost page | "Full Cost Guide" | Pricing intent |
| OUT (article → case study) | Project article → relevant case study | "Read the Full Case Study" | Proof |
| OUT (article → conversion) | → Request Quote or Consultation | "Request a Free Quote" | BOFU |
| IN (related articles → article) | Contextually related blog posts | Natural anchor text | Topical cluster |
| IN (FAQ page → article) | FAQ hub → detailed answer article | "Read Full Guide" | Hub → spoke |

**Minimum outbound links per article:** 3 (1 to pillar, 1 to sub-service/cost, 1 to conversion)
**Maximum outbound links per article:** 8

---

### Page Type 5: Resource Pages

| Direction | Source → Target | Anchor Text Pattern | SEO Rationale |
|---|---|---|---|
| OUT | Resource → relevant pillar | Service name | Authority to commercial page |
| OUT | Resource → lead magnet CTA | "Download the Full Guide" | Lead gen |
| OUT | Resource → consultation page | "Talk to an Expert" | Soft CTA |
| IN | Blog articles → resource | "Download Our Guide" | Resource hub |
| IN | Service pages → resource | "Download Specifications" | Lead magnet |

---

### Page Type 6: Location Pages

| Direction | Source → Target | Anchor Text Pattern | SEO Rationale |
|---|---|---|---|
| OUT | Location → all 3 pillars | "[Service] in [Location]" | Geo-service co-citation |
| OUT | Location → relevant industry | Industry name | Sector targeting |
| OUT | Location → project pages (filtered) | "View Projects in [Location]" | Portfolio proof |
| OUT | Location → Request Quote | "Request a Quote for [Location] Projects" | Geo-targeted CTA |
| IN | Locations hub → location | Location name | Hub → spoke |
| IN | District → neighborhood | Neighborhood name | Geographic hierarchy |
| IN | Blog articles → location | Natural geo anchor | Content → location |

---

## Visual Architecture: Internal Link Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        HOMEPAGE                              │
│                   (Highest PageRank)                         │
└───────────────┬──────────────┬──────────────────────────────┘
                │              │
        ┌───────▼───────┐  ┌───▼──────────────────────────┐
        │  SERVICES HUB │  │   INDUSTRIES HUB              │
        └───────┬───────┘  └───┬──────────────────────────┘
                │              │
   ┌────────────┼────────────┐ │  ┌──────────────────────┐
   │            │            │ │  │  Location Hub        │
   ▼            ▼            ▼ │  └──────┬───────────────┘
┌──────┐  ┌─────────┐  ┌──────┐ │        │
│ALUM. │  │ GLASS   │  │STEEL │◄┘  ┌─────┴──────────────┐
│PILLAR│  │ PILLAR  │  │PILLAR│    │ RIYADH DISTRICTS   │
└──┬───┘  └────┬────┘  └──┬───┘    │ (5 district pages) │
   │           │           │        └─────┬──────────────┘
   ▼           ▼           ▼              │
┌─────┐  ┌─────────┐  ┌───────┐          ▼
│7 Al.│  │6 Glass  │  │7 Steel│    ┌──────────────┐
│Sub- │  │Sub-     │  │Sub-   │    │ NEIGHBORHOODS│
│Svc  │  │Svc Pgs  │  │Svc Pgs│    │ (5 pages)    │
└──┬──┘  └────┬────┘  └───┬───┘    └──────────────┘
   │           │           │
   └───────────┼───────────┘
               │
   ┌───────────┼───────────────────────────────┐
   │           │                               │
   ▼           ▼                               ▼
┌──────┐  ┌─────────┐                    ┌──────────┐
│COST  │  │PROJECT  │                    │CASE      │
│PAGES │  │PAGES    │                    │STUDIES   │
│(16)  │  │(50+)    │                    │(15-25)   │
└──┬───┘  └────┬────┘                    └────┬─────┘
   │           │                              │
   └───────────┼──────────────────────────────┘
               │
               ▼
      ┌────────────────┐
      │  BLOG ARTICLES │
      │  (100+ total)  │
      └────────┬───────┘
               │
               ▼
      ┌────────────────────────────┐
      │  REQUEST QUOTE / CONTACT   │
      │  CONSULTATION              │
      │  (Conversion Endpoints)    │
      └────────────────────────────┘

KEY:
→  Standard internal link (passes PageRank)
◄► Bidirectional links (mutual reinforcement)
All cluster pages link BACK to their pillar page
All pages (except conversion endpoints) link to Request Quote
```

---

## Minimum/Maximum Internal Links Per Page Type

| Page Type | Min. Outbound Internal Links | Max. Outbound Internal Links | Required Destinations |
|---|---|---|---|
| Homepage | 10 | 20 | Services (3), Industries hub, Projects, Blog, Contact, RFQ |
| Services Hub | 6 | 12 | 3 service pillars, Industries hub, RFQ |
| Service Pillar | 12 | 25 | All sub-services, 3+ industries, cost page, projects, RFQ |
| Sub-Service Page | 5 | 8 | Parent pillar (required), 2+ siblings, cost page, RFQ |
| Industry Page | 6 | 10 | 2+ service pillars, 1+ sub-service, project page, RFQ |
| Location Page | 5 | 8 | 3 service pillars, 1+ industry, projects, RFQ |
| Cost Page | 4 | 6 | Parent service pillar, relevant sub-service, RFQ, consultation |
| Project Page | 4 | 6 | Parent service pillar, sub-service, location page, RFQ |
| Case Study Page | 5 | 8 | Parent service, sub-service, location, cost, RFQ |
| Blog Article | 3 | 8 | 1+ service pillar (required), sub-service, cost or RFQ |
| FAQ Page | 5 | 15 | Service pages, cost pages, RFQ, consultation |

---

## Anchor Text Policy

| Anchor Type | Usage Rate | Examples |
|---|---|---|
| **Branded** | 30% | "Al-Fahad Contracting", "مؤسسة الفهد", "Al-Fahad" |
| **Descriptive** (natural language) | 40% | "our aluminum facade services", "خدمات واجهات الألمنيوم لدينا" |
| **Partial match** | 20% | "glass facades in Riyadh", "واجهات زجاجية بالرياض" |
| **Exact match** | Max 10% | "aluminum contractor Riyadh" — use very sparingly |
| **URL anchor** | 5% | "https://alfahad.com/en/services/aluminum/" |
| **Generic** | Avoid | "click here", "read more" — no SEO value |

---

## Cross-References

- URL structure → [03-website-architecture.md](./03-website-architecture.md)
- Service strategies → [04-service-seo-strategy.md](./04-service-seo-strategy.md)
- Technical implementation → [22-technical-seo-requirements.md](./22-technical-seo-requirements.md)
- Conversion CTA placement → [19-conversion-seo-strategy.md](./19-conversion-seo-strategy.md)

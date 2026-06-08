# 19 — Conversion SEO Strategy
## مؤسسة الفهد للمقاولات | Al-Fahad Contracting Company

> **Document Purpose:** Define the complete lead generation framework — how organic traffic intent maps to conversion actions, page-type conversion goals, CTA strategy, trust signals, and the RFQ funnel.

---

## Conversion SEO Overview

Organic traffic without conversion infrastructure is wasted. Al-Fahad's SEO strategy is built to generate leads — specifically RFQs (طلبات عروض الأسعار) and consultation requests — from B2B buyers at every funnel stage. The conversion architecture must match the buyer's intent at the moment they arrive on the page.

**Key principle:** Every page on the site has exactly ONE primary conversion goal and one secondary goal. A page trying to do too many things converts poorly. The architecture below assigns specific goals to every page type.

---

## Page-Type Conversion Mapping

| Page Type | Primary Conversion Goal | Primary CTA (AR) | Primary CTA (EN) | Secondary CTA (AR) | Secondary CTA (EN) | Funnel Stage | Expected CR |
|---|---|---|---|---|---|---|---|
| Homepage | RFQ submission | اطلب عرض سعر | Request a Quote | تواصل مع مستشارينا | Talk to Our Team | MOFU/BOFU | 1.5–3% |
| About | Contact inquiry | تواصل معنا | Contact Us | تحميل قدراتنا | Download Capability Statement | MOFU | 0.5–1% |
| Services Hub | Navigate to service pillar | استكشف خدماتنا | Explore Services | اطلب عرض سعر | Request Quote | MOFU | 0.5–1.5% |
| Service Pillar (Aluminum/Glass/Steel) | RFQ form | اطلب عرض سعر | Request a Quote | استشارة مجانية | Free Consultation | MOFU/BOFU | 2–4% |
| Sub-Service Page | RFQ or consultation | اطلب عرض سعر | Request Quote | احتسب التكلفة | Estimate Cost | BOFU | 2.5–5% |
| Industry Page | Consultation request | تواصل مع مستشارينا | Talk to Our Consultant | اطلب عرض سعر | Request Quote | MOFU | 1.5–3% |
| Location Page | RFQ with location tag | اطلب عرض سعر في [منطقة] | Request a Quote in [Area] | اتصل بنا مباشرة | Call Us Directly | BOFU | 3–6% |
| Project Page | RFQ — "similar project" | لديك مشروع مشابه؟ | Have a Similar Project? | شاهد المزيد من المشاريع | View More Projects | BOFU | 3–5% |
| Case Study Page | RFQ or consultation | احصل على عرض سعر لمشروعك | Get a Quote for Your Project | استشارة مجانية | Free Consultation | BOFU | 4–7% |
| Blog Article | Email/WhatsApp inquiry or cost guide visit | اقرأ دليل التكلفة | Read Cost Guide | اطلب عرض سعر | Request Quote | TOFU/MOFU | 0.5–2% |
| FAQ Page | Navigate to relevant service or cost page | اعرف المزيد عن خدماتنا | Learn More About Our Services | اطلب استشارة | Request Consultation | MOFU | 1–2% |
| Cost Page | RFQ submission | اطلب عرض سعر دقيق | Request Accurate Quote | استشارة مجانية | Free Consultation | MOFU/BOFU | 3–6% |
| Request Quote | RFQ form completion | إرسال الطلب | Submit Request | — | — | BOFU | 40–70% (of form starters) |
| Consultation | Booking/form completion | احجز موعدك | Book Your Slot | — | — | MOFU/BOFU | 30–50% |

---

## CTA Strategy

### Primary CTA Design: اطلب عرض سعر (Request a Quote)

This is the single highest-priority CTA across the entire site. It appears:
1. In the header navigation (right-most item, gold button: `bg-[#C8A75D] text-[#001947]`)
2. In every page hero section (primary button below H1)
3. Mid-page on all service, sub-service, industry, and location pages
4. As a full-width banner CTA section at the bottom of every commercial page
5. As a floating sticky button on mobile (WhatsApp icon linking to WhatsApp inquiry)

**Button specs (from design system):**
```html
<button class="bg-[#C8A75D] text-[#001947] px-8 py-3 rounded-lg font-label-bold">
  اطلب عرض سعر
</button>
```

### Secondary CTA Design: استشارة مجانية (Free Consultation)

For buyers who are not yet ready to commit to an RFQ. Appears as a ghost button adjacent to the primary CTA:

```html
<button class="border border-primary text-primary px-8 py-3 rounded-lg font-label-bold hover:bg-primary/5">
  استشارة مجانية
</button>
```

### WhatsApp Floating CTA

WhatsApp is Saudi Arabia's primary communication channel. A sticky WhatsApp icon in the bottom-right corner of every page captures buyers who prefer direct messaging over forms:

- WhatsApp number: +966 XX XXX XXXX
- Pre-filled message (Arabic): "السلام عليكم، أود الاستفسار عن خدمات مؤسسة الفهد للمقاولات"
- Pre-filled message (English): "Hello, I'd like to inquire about Al-Fahad Contracting services"

### Phone Click-to-Call

Placed in header, footer, and contact section. In Saudi Arabia, decision makers often call directly for large project inquiries.

---

## Quote Request (RFQ) Form Strategy

The RFQ form is the primary BOFU conversion mechanism. It must collect enough information to qualify the lead without creating friction that reduces form completions.

### Recommended RFQ Form Fields

| Field | Type | Required | Purpose |
|---|---|---|---|
| Full Name (الاسم الكامل) | Text | Required | Lead identification |
| Company Name (اسم الشركة) | Text | Required | B2B qualification |
| Project Type (نوع المشروع) | Dropdown | Required | Service routing (Aluminum / Glass / Steel / Combined) |
| Project Location (موقع المشروع) | Dropdown | Required | Geo-routing; confirms service area |
| Project Scale / Size (حجم المشروع) | Dropdown | Required | Budget qualification (Small <500 sqm / Medium / Large / Mega) |
| Estimated Budget (الميزانية التقديرية) | Dropdown | Optional | Qualify against project minimums |
| Project Timeline (الجدول الزمني) | Dropdown | Required | Urgency signal |
| Project Description (وصف المشروع) | Textarea | Required | Brief for accurate quote preparation |
| Phone Number (رقم الهاتف) | Tel | Required | Primary contact method |
| Email (البريد الإلكتروني) | Email | Required | Secondary contact + lead tracking |
| How did you find us? (كيف وجدتنا؟) | Dropdown | Optional | Attribution tracking |

### Post-Submission Experience

1. **Confirmation page** (not just a message) — dedicated `/thank-you/` page with:
   - Confirmation that the request was received
   - Expected response time: "نتواصل معكم خلال 24 ساعة" (We'll contact you within 24 hours)
   - What happens next: "سيتواصل معك أحد مستشارينا لمناقشة تفاصيل مشروعك"
   - WhatsApp option for urgent inquiries
   - Related project gallery (keep the user engaged, reinforce trust)

2. **Auto-response email** (Arabic + English) — sent immediately confirming receipt, including Al-Fahad contact details for follow-up.

3. **CRM integration** — RFQ form data must push to a CRM (HubSpot, Zoho, or equivalent) with source attribution (which page the RFQ came from) for lead quality tracking.

---

## Consultation Request Strategy

Consultation is the softer MOFU CTA for buyers who are not yet at the RFQ stage. The consultation page (`/en/consultation/`) should:

- Promise: 30-minute free consultation with a senior engineer
- Delivery options: Phone call, WhatsApp video, or in-person at Riyadh office
- Form: Name, company, topic, preferred time, phone/WhatsApp
- Trust signal: "No sales pressure — just expert advice on your project"

Consultations convert to RFQs at a rate of 30–50% when delivered by a knowledgeable team member.

---

## RFQ Funnel: Buyer Journey Conversion Map

### Stage 1: Awareness (TOFU)

**Where buyer is:** Reading a blog article, e.g., "How to Choose an Aluminum Contractor in Riyadh"
**What they need:** Information, confidence to start shortlisting
**Conversion goal:** Email subscription (newsletter) OR reading a cost guide page

**In-article CTA placement:**
- Midway through article: "Want to know what this would cost for your project? → Read our Aluminum Facade Cost Guide"
- End of article: "Learned what you need? Get a free consultation with our team → استشارة مجانية"

### Stage 2: Consideration (MOFU)

**Where buyer is:** Reading a cost page, sub-service page, or industry page
**What they need:** Pricing ranges, evidence of expertise, competitive differentiation
**Conversion goal:** Start an RFQ OR book a consultation

**Page CTA placement:**
- After cost range table: "Get an accurate quote for your specific project → اطلب عرض سعر دقيق"
- After project gallery: "See a project like yours? Have a similar challenge? → تواصل معنا"
- Full-width CTA banner at page bottom: both primary and secondary CTA

### Stage 3: Decision (BOFU)

**Where buyer is:** Reading a case study, project page, or service pillar page after shortlisting
**What they need:** Final proof of capability, risk reduction (warranty, certifications), conversion mechanism
**Conversion goal:** RFQ form submission

**Page CTA placement:**
- After results section in case study: "Ready to achieve similar results? → اطلب عرض سعر لمشروعك"
- Trust block immediately before CTA: "25+ years · 300+ projects · ISO Certified · Saudi-based team"
- RFQ form embedded directly on the page (not a separate click required)

---

## Trust-Building Content Strategy

Trust is the primary conversion variable in Saudi B2B construction. Buyers are awarding SAR 100K–10M contracts to a company they found online. Trust signals must appear on every commercial page.

| Trust Signal | Implementation | Pages |
|---|---|---|
| **25+ years experience** | Badge: "منذ عام 1999" / "Since 1999" + timeline link to About | All service, industry, location pages |
| **300+ completed projects** | Stat: "أكثر من 300 مشروع مكتمل" with link to Projects | All service and industry pages |
| **ISO quality certification** | Logo in trust strip with link to certification | All service pages, Homepage |
| **SASO compliance** | Text mention + certification download | Service pages, About |
| **Saudi Council of Engineers** | Registration number + link | About page, RFQ page |
| **Named projects / clients** | Where contractually permitted, name a landmark project | Service pillar pages, Case Studies |
| **Client testimonials** | 2–3 quotes with company name + role | Homepage, Service pages, Case Studies |
| **Team credentials** | Named engineers with qualifications | About page, team section |
| **Response time commitment** | "نتواصل معكم خلال 24 ساعة" | RFQ page, Contact page |
| **Warranty statement** | "ضمان شامل على جميع أعمالنا" | Service pages, RFQ page |
| **Physical address visible** | Full Riyadh address in footer + Contact page | All pages (footer) |

---

## Cross-References

- CTA design system and button specs → `.kiro/steering/al-fahad-design-system.md`
- RFQ page structure → `.kiro/steering/al-fahad-pages-content.md`
- Internal linking to conversion pages → [18-internal-linking-architecture.md](./18-internal-linking-architecture.md)
- KPI tracking for conversions → [24-kpi-framework.md](./24-kpi-framework.md)

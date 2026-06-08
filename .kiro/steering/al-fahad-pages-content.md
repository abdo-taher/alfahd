# Al-Fahad Contracting — Page Inventory & Content Guidelines

## Site Structure

The site is bilingual (Arabic/English) with RTL-first Arabic as the primary language.

```
/[locale]/           → Home page
/[locale]/about      → من نحن (About Us)
/[locale]/services   → خدماتنا (Services)
/[locale]/projects   → مشاريعنا (Projects)
/[locale]/blog       → المدونة (Blog)
/[locale]/contact    → اتصل بنا (Contact)
/[locale]/request-quote → اطلب عرض سعر (Request Quote)
```

Locales: `ar` (default, RTL) and `en` (LTR).

---

## Company Identity

**Full name (Arabic):** مؤسسة الفهد للمقاولات  
**Full name (English):** Al-Fahad Contracting Company  
**Tagline:** رواد هندسة الواجهات والمشاريع الإنشائية في المملكة  
**HQ:** الرياض، المملكة العربية السعودية (Riyadh, Saudi Arabia)  
**Founded:** ~1999 (25+ years experience)  
**Core stats:** 25+ years · 300+ strategic projects  
**Primary CTA label:** اطلب عرض سعر  
**Contact CTA label:** تواصل مع مستشارينا  

---

## Services (Core Business)

1. **هندسة الواجهات الزجاجية** — Glass facade engineering
2. **أعمال الألمنيوم** — Aluminium works
3. **الهياكل المعدنية** — Steel structures
4. **إدارة المشاريع الإنشائية** — Construction project management

These services appear in nav dropdowns, service cards, and contact form dropdowns.

---

## Page-Level Content Notes

### Home (`/`)
Sections in order:
1. **Hero** — Full-viewport video/image background, enterprise-gradient overlay, display headline, eyebrow label, two CTAs (Primary + Ghost)
2. **Credibility Strip** — Logos of certified bodies or key clients (horizontal scroll on mobile)
3. **Services Overview** — 4 service cards, section eyebrow, gold accent line, `bg-surface-container-low`
4. **Featured Projects** — 3 project cards with 16:9 images, status chips (gold = Completed, blue = In Progress)
5. **Why Choose Us** — Stats + differentiators grid on dark `bg-on-background`
6. **Process Section** — Numbered steps (how we work), structural visual treatment
7. **Testimonials** — Client quote cards, company name + role attribution
8. **Certifications** — ISO / SASO / Vision 2030 partner logos
9. **Final CTA** — Full-width enterprise-gradient banner, headline + primary CTA

### About (`/about`)
Sections in order:
1. **Hero** — Image with overlay gradient (right-to-left), display headline
2. **History Timeline** — Sticky left column (stats + intro), right column milestones (1999 · 2010 · Today)
3. **Mission / Vision / Values** — 3-column white card group, hover → primary blue fill
4. **CSR / Community** — Dark section, gold accent line, two program cards
5. **CTA** — Centered headline + two buttons (primary + ghost download)

### Services (`/services`)
- Grid of service cards with full-bleed imagery
- Each card: icon, title, short description, ghost "اكتشف المزيد" button
- Section background alternates per service category

### Projects (`/projects`)
- Filter tabs by category (facades / aluminium / steel / all)
- Project cards: 16:9 image, title, location, status chip, year
- Status chips: `bg-[#C8A75D] text-[#001947]` for Completed, `bg-primary text-white` for In Progress

### Blog (`/blog`)
- Featured post: large hero card with gradient overlay and full-bleed image
- Article grid: date, category chip, title (headline-sm), excerpt (body-md, line-clamp-3)
- Sidebar: recent posts, category filter, newsletter widget

### Contact (`/contact`)
- Split screen: 3/5 form + 2/5 dark info panel (enterprise-gradient)
- Info panel: address, phone, email, social icons, working hours
- Map section below (dark navy background, pulsing marker)
- Post-map CTA bar

### Request Quote (`/request-quote`)
- Prominent form: name, company, project type, budget range, timeline, description
- Progress-style layout indicating multi-step feel

---

## Navigation Structure (Desktop, RTL order)

```
[Logo]  [الرئيسية] [من نحن] [خدماتنا] [مشاريعنا] [المدونة] [اتصل بنا]  [اطلب عرض سعر →]
```

Active page indicator: `text-primary` + `after:w-full after:h-0.5 after:bg-primary after:-bottom-1`

---

## Footer Structure (4-column, dark)

| Column 1 (span 2) | Column 2 | Column 3 | Column 4 |
|---|---|---|---|
| Logo + tagline + social icons | روابط سريعة (Quick Links) | خدماتنا (Services) | Contact details |

Bottom bar: copyright + privacy policy + terms links.

---

## Content Locales (i18n keys live in `src/content/locales/`)

- `ar.json` — Arabic strings (RTL default)
- `en.json` — English strings (LTR)
- Content JSON: `src/content/{locale}/projects.json`, `services.json`, `testimonials.json`

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

// ─── 8a. organizationSchema (updated) ────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${BASE_URL}/#organization`,
    name: "مؤسسة الفهد للمقاولات",
    alternateName: ["Al Fahd Contracting", "Al-Fahad Contracting Company", "الفهد للمقاولات"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/logo.png`,
      width: 200,
      height: 60,
    },
    image: `${BASE_URL}/images/og-default.svg`,
    description:
      "مؤسسة الفهد للمقاولات — متخصصون في أعمال الألمنيوم والزجاج والحديد بالمملكة العربية السعودية. خبرة تزيد على 25 عاماً في تنفيذ المشاريع السكنية والتجارية والحكومية بأعلى معايير الجودة.",
    foundingDate: "1999",
    priceRange: "$$$$",
    currenciesAccepted: "SAR",
    paymentAccepted: "Cash, Bank Transfer, Letter of Credit",
    slogan: "رواد هندسة الواجهات في المملكة",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 87,
      bestRating: 5,
      worstRating: 1,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "أبراج العليا، برج ب، الطابق ١٤",
      addressLocality: "الرياض",
      addressRegion: "01",
      addressCountry: "SA",
      postalCode: "12211",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.6877",
      longitude: "46.7219",
    },
    telephone: "+966114459222",
    email: "engineering@al-fahd.com.sa",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: [
      { "@type": "City", name: "Riyadh" },
      { "@type": "City", name: "Jeddah" },
      { "@type": "City", name: "Dammam" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Contracting Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aluminum Works — أعمال الألمنيوم" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Glass Works — أعمال الزجاج" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steel Works — أعمال الحديد" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curtain Wall Systems — جدران الستائر" } },
      ],
    },
    knowsAbout: [
      "Aluminum Works",
      "Glass Works",
      "Steel Works",
      "Curtain Wall Systems",
      "Architectural Facades",
      "Glass Facades",
      "Aluminum Contractor Riyadh",
      "Glass Contractor Riyadh",
      "Steel Contractor Riyadh",
      "أعمال الألمنيوم",
      "أعمال الزجاج",
      "الهياكل المعدنية",
      "واجهات زجاجية",
      "مقاولات الرياض",
    ],
    sameAs: [
      "https://www.linkedin.com/company/alfahd-contracting",
      "https://twitter.com/alfahdcontracting",
    ],
  };
}

// ─── websiteSchema ────────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "مؤسسة الفهد للمقاولات",
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: ["ar", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/ar/projects?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── serviceSchema ────────────────────────────────────────────────────────────

export function serviceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    serviceType: "Contracting",
  };
}

// ─── breadcrumbSchema ─────────────────────────────────────────────────────────

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── faqSchema ────────────────────────────────────────────────────────────────

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── 8j. articleSchema (updated — supports Person author) ────────────────────

export function articleSchema({
  title,
  description,
  url,
  publishedAt,
  image,
  authorName,
  authorSlug,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  image?: string;
  authorName?: string;
  authorSlug?: string;
}) {
  const authorEntity =
    authorName && authorSlug
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
    image: image ?? `${BASE_URL}/images/og-default.svg`,
  };
}

// ─── 8b. aboutPageSchema ─────────────────────────────────────────────────────

export function aboutPageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/${locale}/about`,
    url: `${BASE_URL}/${locale}/about`,
    name:
      locale === "ar"
        ? "من نحن — مؤسسة الفهد للمقاولات"
        : "About — Al Fahd Contracting",
    description:
      locale === "ar"
        ? "تأسست مؤسسة الفهد للمقاولات عام 1999 في الرياض، متخصصة في أعمال الألمنيوم والزجاج والحديد."
        : "Al Fahd Contracting was founded in 1999 in Riyadh, specialising in aluminium, glass, and steel works.",
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  };
}

// ─── 8c. contactPageSchema ───────────────────────────────────────────────────

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

// ─── 8d. projectSchema ───────────────────────────────────────────────────────

export function projectSchema(project: {
  title: string;
  description: string;
  url: string;
  year: number;
  location: string;
  coverImage: string;
  technologies: string[];
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

// ─── 8e. itemListSchema ──────────────────────────────────────────────────────

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

// ─── 8f. videoObjectSchema ───────────────────────────────────────────────────

export function videoObjectSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "مؤسسة الفهد للمقاولات — نظرة عامة",
    description:
      "نظرة على مشاريع الفهد للمقاولات في أعمال الألمنيوم والزجاج والحديد بالمملكة العربية السعودية",
    thumbnailUrl: `${BASE_URL}/images/og-default.svg`,
    uploadDate: "2024-01-01",
    contentUrl: `${BASE_URL}/hero.mp4`,
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

// ─── 8g. personSchema ────────────────────────────────────────────────────────

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

// ─── 8h. industryPageSchema ──────────────────────────────────────────────────

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

// ─── 8i. localBusinessLocationSchema ─────────────────────────────────────────

export function localBusinessLocationSchema(city: string, locale: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name:
      locale === "ar"
        ? `مؤسسة الفهد للمقاولات — ${city}`
        : `Al Fahd Contracting — ${city}`,
    url,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "City", name: city },
    telephone: "+966114459222",
    email: "engineering@al-fahd.com.sa",
  };
}

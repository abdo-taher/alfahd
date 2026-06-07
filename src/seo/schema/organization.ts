const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${BASE_URL}/#organization`,
    name: "شركة الفهد للمقاولات",
    alternateName: "Al Fahd Contracting",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/logo.png`,
      width: 200,
      height: 60,
    },
    description:
      "شركة الفهد للمقاولات — متخصصون في أعمال الألمنيوم والزجاج والحديد بالمملكة العربية السعودية",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "Riyadh",
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    knowsAbout: ["Aluminum Works", "Glass Works", "Steel Works", "Contracting"],
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "شركة الفهد للمقاولات",
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: ["ar", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/ar/projects?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

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

export function articleSchema({
  title,
  description,
  url,
  publishedAt,
  image,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    image: image ? `${BASE_URL}${image}` : undefined,
  };
}

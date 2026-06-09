import type { MetadataRoute } from "next";
import { contentRepository } from "@/lib/content/content-repository";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";
const LOCALES = ["ar", "en"] as const;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

function buildAlternates(path: string) {
  return {
    languages: {
      ar: `${BASE_URL}/ar${path}`,
      en: `${BASE_URL}/en${path}`,
      "x-default": `${BASE_URL}/ar${path}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static core pages ────────────────────────────────────────────────────
  const staticPaths: Array<{
    path: string;
    priority: number;
    changeFrequency: ChangeFreq;
  }> = [
    { path: "",                priority: 1.0, changeFrequency: "weekly" },
    { path: "/about",          priority: 0.8, changeFrequency: "monthly" },
    { path: "/services",       priority: 0.9, changeFrequency: "monthly" },
    { path: "/projects",       priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog",           priority: 0.8, changeFrequency: "weekly" },
    { path: "/contact",        priority: 0.7, changeFrequency: "monthly" },
    { path: "/request-quote",  priority: 0.9, changeFrequency: "monthly" },
    // Note: /portal is excluded from sitemap (disallowed in robots.txt)
  ];

  const staticUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    staticPaths.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: buildAlternates(path),
    }))
  );

  // ── Service pillar pages (slugs match the actual route structure) ─────────
  const serviceSlugs = ["aluminum-works", "glass-works", "steel-works"] as const;

  const serviceUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.95,
      alternates: buildAlternates(`/services/${slug}`),
    }))
  );

  // ── Dynamic project pages ─────────────────────────────────────────────────
  const projectUrls: MetadataRoute.Sitemap = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const projects = await contentRepository.getProjects(locale);
        return projects.map((p) => ({
          url: `${BASE_URL}/${locale}/projects/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as ChangeFreq,
          priority: 0.7,
          alternates: buildAlternates(`/projects/${p.slug}`),
        }));
      })
    )
  ).flat();

  // ── Dynamic blog post pages ───────────────────────────────────────────────
  const blogUrls: MetadataRoute.Sitemap = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const posts = await contentRepository.getBlogPosts(locale);
        return posts.map((p) => ({
          url: `${BASE_URL}/${locale}/blog/${p.slug}`,
          lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
          changeFrequency: "monthly" as ChangeFreq,
          priority: 0.65,
          alternates: buildAlternates(`/blog/${p.slug}`),
        }));
      })
    )
  ).flat();

  // ── New static pages added ────────────────────────────────────────────────
  const newStaticPaths: Array<{ path: string; priority: number; changeFrequency: ChangeFreq }> = [
    { path: "/faq",            priority: 0.7,  changeFrequency: "monthly" },
    { path: "/industries",     priority: 0.75, changeFrequency: "monthly" },
    { path: "/locations",      priority: 0.75, changeFrequency: "monthly" },
    { path: "/cost",           priority: 0.8,  changeFrequency: "monthly" },
    { path: "/case-studies",   priority: 0.8,  changeFrequency: "monthly" },
  ];
  const newStaticUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    newStaticPaths.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: buildAlternates(path),
    }))
  );

  // ── Sub-service pages ─────────────────────────────────────────────────────
  const subServicePaths = [
    "aluminum-works/curtain-wall-systems",
    "aluminum-works/aluminum-windows-doors",
    "aluminum-works/aluminum-cladding",
    "aluminum-works/aluminum-facades",
    "aluminum-works/structural-glazing",
    "glass-works/structural-glass-facades",
    "glass-works/spider-glass-systems",
    "glass-works/fire-rated-glass",
    "glass-works/insulating-glass-units",
    "glass-works/low-iron-glass",
    "steel-works/steel-structures",
    "steel-works/steel-warehouses",
    "steel-works/ornamental-iron",
    "steel-works/steel-canopies",
    "steel-works/pedestrian-bridges",
  ] as const;
  const subServiceUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    subServicePaths.map((path) => ({
      url: `${BASE_URL}/${locale}/services/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.85,
      alternates: buildAlternates(`/services/${path}`),
    }))
  );

  // ── Industry pages ────────────────────────────────────────────────────────
  const industrySlugs = ["government-projects", "real-estate-developers", "commercial-projects", "hospitality", "industrial", "residential"] as const;
  const industryUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    industrySlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.9,
      alternates: buildAlternates(`/industries/${slug}`),
    }))
  );

  // ── Location pages ────────────────────────────────────────────────────────
  const locationSlugs = ["riyadh", "north-riyadh", "kafd-riyadh", "jeddah", "dammam", "jubail"] as const;
  const locationUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    locationSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/locations/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.85,
      alternates: buildAlternates(`/locations/${slug}`),
    }))
  );

  // ── Cost guide pages ──────────────────────────────────────────────────────
  const costSlugs = ["aluminum-works", "glass-facades", "steel-structures", "curtain-wall"] as const;
  const costUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    costSlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/cost/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.9,
      alternates: buildAlternates(`/cost/${slug}`),
    }))
  );

  // ── Case study pages ──────────────────────────────────────────────────────
  const caseStudySlugs = ["king-salman-financial-tower", "neom-infrastructure-hub", "red-sea-global-pavilion", "kafd-pedestrian-bridge"] as const;
  const caseStudyUrls: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.8,
      alternates: buildAlternates(`/case-studies/${slug}`),
    }))
  );

  return [
    ...staticUrls, ...serviceUrls,
    ...newStaticUrls, ...subServiceUrls, ...industryUrls,
    ...locationUrls, ...costUrls, ...caseStudyUrls,
    ...projectUrls, ...blogUrls,
  ];
}

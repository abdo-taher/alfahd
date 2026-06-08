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
  const serviceSlugs = ["aluminum", "glass", "steel"] as const;

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

  return [...staticUrls, ...serviceUrls, ...projectUrls, ...blogUrls];
}

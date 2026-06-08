import type { MetadataRoute } from "next";
import { contentRepository } from "@/lib/content/content-repository";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";
const LOCALES = ["ar", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static pages ────────────────────────────────────────────────────────────
  const staticPaths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/request-quote", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const staticUrls = LOCALES.flatMap((locale) =>
    staticPaths.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ar: `${BASE_URL}/ar${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    }))
  );

  // ── Service pages (high commercial intent) ─────────────────────────────────
  const serviceUrls = LOCALES.flatMap((locale) =>
    ["aluminum-works", "glass-works", "steel-works"].map((slug) => ({
      url: `${BASE_URL}/${locale}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.95,
      alternates: {
        languages: {
          ar: `${BASE_URL}/ar/services/${slug}`,
          en: `${BASE_URL}/en/services/${slug}`,
        },
      },
    }))
  );

  // ── Dynamic project pages ──────────────────────────────────────────────────
  const projectUrls = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const projects = await contentRepository.getProjects(locale);
        return projects.map((p) => ({
          url: `${BASE_URL}/${locale}/projects/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: {
              ar: `${BASE_URL}/ar/projects/${p.slug}`,
              en: `${BASE_URL}/en/projects/${p.slug}`,
            },
          },
        }));
      })
    )
  ).flat();

  // ── Dynamic blog post pages ────────────────────────────────────────────────
  const blogUrls = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const posts = await contentRepository.getBlogPosts(locale);
        return posts.map((p) => ({
          url: `${BASE_URL}/${locale}/blog/${p.slug}`,
          lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.65,
          alternates: {
            languages: {
              ar: `${BASE_URL}/ar/blog/${p.slug}`,
              en: `${BASE_URL}/en/blog/${p.slug}`,
            },
          },
        }));
      })
    )
  ).flat();

  return [...staticUrls, ...serviceUrls, ...projectUrls, ...blogUrls];
}

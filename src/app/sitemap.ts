import type { MetadataRoute } from "next";
import { contentRepository } from "@/lib/content/content-repository";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";
const LOCALES = ["ar", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/contact",
    "/request-quote",
  ];

  const staticUrls = LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.8,
    }))
  );

  // Dynamic service pages
  const serviceUrls = LOCALES.flatMap((locale) =>
    ["aluminum-works", "glass-works", "steel-works"].map((slug) => ({
      url: `${BASE_URL}/${locale}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  // Dynamic project pages
  const projectUrls = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const projects = await contentRepository.getProjects(locale);
        return projects.map((p) => ({
          url: `${BASE_URL}/${locale}/projects/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }));
      })
    )
  ).flat();

  return [...staticUrls, ...serviceUrls, ...projectUrls];
}

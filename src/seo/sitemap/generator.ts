const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";
const LOCALES = ["ar", "en"];

export type SitemapUrl = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export function generateSitemapUrls(paths: string[]): SitemapUrl[] {
  return paths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}

export function generateLocalizedSitemapUrls(
  paths: string[],
  options: Partial<SitemapUrl> = {}
): SitemapUrl[] {
  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...options,
    }))
  );
}

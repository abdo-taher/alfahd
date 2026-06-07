export function generateSitemapUrls(paths: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
}

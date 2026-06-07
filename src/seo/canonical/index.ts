export function getCanonicalUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return `${baseUrl}${path}`;
}

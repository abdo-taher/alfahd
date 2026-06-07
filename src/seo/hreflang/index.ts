export function getHreflang(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    en: `${baseUrl}/en${path}`,
    ar: `${baseUrl}/ar${path}`
  };
}

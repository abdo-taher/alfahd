const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export function getCanonicalUrl(path: string) {
  return `${BASE_URL}${path}`;
}

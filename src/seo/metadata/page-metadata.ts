export function generatePageMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`
    }
  };
}

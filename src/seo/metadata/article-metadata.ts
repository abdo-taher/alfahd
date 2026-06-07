export function generateArticleMetadata({
  title,
  excerpt,
  path,
}: {
  title: string;
  excerpt: string;
  path: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    title,
    description: excerpt,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}

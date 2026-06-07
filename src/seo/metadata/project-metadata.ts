export function generateProjectMetadata({
  name,
  location,
  path,
}: {
  name: string;
  location: string;
  path: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    title: `${name} - ${location}`,
    description: `Project details for ${name} located in ${location}`,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}

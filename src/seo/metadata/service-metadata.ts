export function generateServiceMetadata({
  service,
  locale,
  path
}: {
  service: string;
  locale: "en" | "ar";
  path: string;
}) {
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? `${service} | شركة سكايا التينا`
      : `${service} | Sakeya Altina Contracting`,

    description: isArabic
      ? `خدمات ${service} في الرياض بأعلى جودة`
      : `${service} services in Riyadh with premium quality`,

    alternates: {
      canonical: path
    }
  };
}

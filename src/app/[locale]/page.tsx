import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { organizationSchema, websiteSchema } from "@/seo/schema/organization";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { HeroSection } from "@/features/home/components/hero-section";
import { CredibilityStrip } from "@/features/home/components/credibility-strip";
import { ServicesOverview } from "@/features/home/components/services-overview";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";
import { FeaturedProjects } from "@/features/home/components/featured-projects";
import { ProcessSection } from "@/features/home/components/process-section";
import { Testimonials } from "@/features/home/components/testimonials";
import { Certifications } from "@/features/home/components/certifications";
import { FinalCta } from "@/features/home/components/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return generatePageMetadata({
    title: t("siteTitle"),
    description: t("siteDescription"),
    path: `/${locale}`,
    locale,
  });
}

export default function HomePage() {
  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />

      <HeroSection />
      <CredibilityStrip />
      <ServicesOverview />
      <WhyChooseSection />
      <FeaturedProjects />
      <ProcessSection />
      <Testimonials />
      <Certifications />
      <FinalCta />
    </>
  );
}

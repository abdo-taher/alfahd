import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { organizationSchema, websiteSchema, videoObjectSchema } from "@/seo/schema/organization";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { HeroSection } from "@/features/home/components/hero-section";
import { CredibilityStrip } from "@/features/home/components/credibility-strip";
import { ServicesOverview } from "@/features/home/components/services-overview";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";
import { FeaturedProjects } from "@/features/home/components/featured-projects";
import { IndustriesSection } from "@/features/home/components/industries-section";
import { Certifications } from "@/features/home/components/certifications";
import { ProcessSection } from "@/features/home/components/process-section";
import { Testimonials } from "@/features/home/components/testimonials";
import { LeadGeneration } from "@/features/home/components/lead-generation";
import { FinalCta } from "@/features/home/components/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const isAr = locale === "ar";
  const keywords = isAr
    ? [
        "مؤسسة الفهد للمقاولات",
        "مقاول ألمنيوم الرياض",
        "مقاول زجاج الرياض",
        "مقاول حديد الرياض",
        "أعمال الألمنيوم الرياض",
        "أعمال الزجاج الرياض",
        "أعمال الحديد الرياض",
        "واجهات زجاجية الرياض",
        "هياكل حديدية السعودية",
        "مقاولات الرياض",
        "شركة مقاولات السعودية",
        "ألمنيوم وزجاج وحديد",
      ]
    : [
        "Al Fahd Contracting",
        "aluminum contractor Riyadh",
        "glass contractor Riyadh",
        "steel contractor Riyadh",
        "aluminum works Riyadh",
        "glass works Saudi Arabia",
        "steel structures Saudi Arabia",
        "glass facades Riyadh",
        "curtain wall contractor",
        "contracting company Saudi Arabia",
      ];

  // Use per-page richer title/description keys when available, fall back to site defaults
  const title = (t as (key: string) => string)("homeTitle") || t("siteTitle");
  const description = (t as (key: string) => string)("homeDescription") || t("siteDescription");

  return generatePageMetadata({
    title,
    description,
    path: `/${locale}`,
    locale,
    keywords,
  });
}

export default function HomePage() {
  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const videoSchema = videoObjectSchema();

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema).replace(/</g, "\\u003c") }}
      />

      {/* 1. Hero — full-viewport video bg, gradient, stats row */}
      <HeroSection />

      {/* 2. Statistics — 2-col offset card grid + text */}
      <CredibilityStrip />

      {/* 3. Services — 2×2 horizontal image+content cards */}
      <ServicesOverview />

      {/* 4. Why Choose Us — bg-primary dark, glass cards */}
      <WhyChooseSection />

      {/* 5. Featured Projects — asymmetric 12-col grid */}
      <FeaturedProjects />

      {/* 6. Industries — sector grid + image with gold floating card */}
      <IndustriesSection />

      {/* 7. Certifications — horizontal cert logos */}
      <Certifications />

      {/* 8. Process — 4-step with connector line */}
      <ProcessSection />

      {/* 9. Media Center — 3-col article grid */}
      <Testimonials />

      {/* 10. Lead Generation — split blue card with form */}
      <LeadGeneration />

      {/* 11. Final CTA — display-xl headline + phone/email links */}
      <FinalCta />
    </>
  );
}

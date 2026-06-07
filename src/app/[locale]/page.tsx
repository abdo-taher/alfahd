import { HeroSection } from "@/features/home/components/hero-section";
import { CredibilityStrip } from "@/features/home/components/credibility-strip";
import { ServicesOverview } from "@/features/home/components/services-overview";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";
import { FeaturedProjects } from "@/features/home/components/featured-projects";
import { ProcessSection } from "@/features/home/components/process-section";
import { Testimonials } from "@/features/home/components/testimonials";
import { Certifications } from "@/features/home/components/certifications";
import { FinalCta } from "@/features/home/components/final-cta";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CredibilityStrip />
      <ServicesOverview />
      <WhyChooseSection />
      <FeaturedProjects />
      <ProcessSection />
      <Testimonials />
      <Certifications />
      <FinalCta />
    </main>
  );
}

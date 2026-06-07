import Link from "next/link";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, MapPin, Calendar } from "lucide-react";
import { Container } from "@/shared/components/ui/container";
import { Section } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { contentRepository } from "@/lib/content/content-repository";

export async function FeaturedProjects() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.projects" });
  const pt = await getTranslations({ locale, namespace: "projects" });
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const projects = await contentRepository.getFeaturedProjects(locale);

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <Badge variant="default" className="mb-3">{t("title")}</Badge>
          <h2 className="heading-lg">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("subtitle")}</p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 start-4">
                  <Badge variant="accent">{project.category}</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    {project.year}
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {pt("viewProject")}
                  <ArrowIcon className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/projects`}>
              {t("viewAll")}
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

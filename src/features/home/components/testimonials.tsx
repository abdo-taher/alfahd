import { useTranslations, useLocale } from "next-intl";
import { Star } from "lucide-react";
import { Container } from "@/shared/components/ui/container";
import { Section } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";
import { contentRepository } from "@/lib/content/content-repository";
import type { Testimonial } from "@/types";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure
      className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
      aria-label={`${item.name} — ${item.company}`}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-4 ${i < item.rating ? "fill-[--color-brand-accent] text-[--color-brand-accent]" : "text-muted-foreground"}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed">
        &ldquo;{item.content}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.role} — {item.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export async function Testimonials() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale();
  const testimonials = await contentRepository.getTestimonials(locale);

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <Badge variant="default" className="mb-3">{t("title")}</Badge>
          <h2 className="heading-lg">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

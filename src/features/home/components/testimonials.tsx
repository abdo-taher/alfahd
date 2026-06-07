import { getTranslations, getLocale } from "next-intl/server";
import { Star } from "lucide-react";
import { contentRepository } from "@/lib/content/content-repository";
import type { Testimonial } from "@/types";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure
      className="flex flex-col bg-white border border-[#c4c6d3] rounded-lg p-7 luxury-shadow"
      aria-label={`${item.name} — ${item.company}`}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5" aria-label={`${item.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-4 ${i < item.rating ? "fill-[--color-brand-gold] text-[--color-brand-gold]" : "text-[#c4c6d3]"}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="flex-1 text-body-md text-[#434652] leading-relaxed mb-6">
        &ldquo;{item.content}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-[#e2e2e9] pt-5">
        <div className="flex size-10 items-center justify-center rounded-full enterprise-gradient text-white text-sm font-bold shrink-0">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="text-label-bold text-[#1a1b21]">{item.name}</p>
          <p className="text-caption text-[#747783]">{item.role} — {item.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export async function Testimonials() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.testimonials" });
  const testimonials = await contentRepository.getTestimonials(locale);

  return (
    <section className="section-py bg-[#f3f3fb]">
      <div className="container-brand">
        <div className="text-center mb-20">
          <span className="text-label-bold text-[--color-brand-primary] uppercase tracking-widest block mb-3">
            {t("title")}
          </span>
          <h2 className="text-display-mobile lg:text-headline-md text-[--color-brand-primary]">
            {t("title")}
          </h2>
          <p className="text-body-lg text-[#434652] max-w-2xl mx-auto mt-4 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="gold-bar-center mt-8" aria-hidden="true" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

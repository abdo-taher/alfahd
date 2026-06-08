import { getTranslations, getLocale } from "next-intl/server";
import { contentRepository } from "@/lib/content/content-repository";

export async function Testimonials() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.testimonials" });
  const testimonials = await contentRepository.getTestimonials(locale);

  return (
    <section className="section-padding bg-surface-container-low" aria-labelledby="testimonials-heading">
      <div className="container-brand">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="font-bold uppercase tracking-widest mb-4 block"
            style={{
              color: "#C8A75D",
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              letterSpacing: "0.1em",
            }}
          >
            {locale === "ar" ? "آراء عملائنا" : "Client Reviews"}
          </span>
          <h2
            id="testimonials-heading"
            className="text-on-surface mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.2", fontWeight: 700 }}
          >
            {t("title")}
          </h2>
          <p className="text-on-surface-variant text-body-md max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          {/* Gold accent line */}
          <div className="w-16 h-0.5 bg-[#C8A75D] mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-6 transition-all duration-300 hover:border-primary hover:shadow-[0_20px_40px_-10px_rgba(10,61,145,0.1)]"
              style={{ transitionDelay: `${index * 60}ms` }}
              aria-label={locale === "ar" ? `تقييم ${item.name}` : `Review by ${item.name}`}
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`${item.rating} ${locale === "ar" ? "نجوم" : "stars"}`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    aria-hidden="true"
                    style={{
                      fontSize: "18px",
                      color: "#C8A75D",
                      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-on-surface-variant text-body-md leading-relaxed flex-1">
                &ldquo;{item.content}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="w-full h-px bg-outline-variant" aria-hidden="true" />

              {/* Author */}
              <footer className="flex items-center gap-4">
                {/* Avatar initials */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-on-primary font-bold text-label-bold select-none"
                  style={{ background: "linear-gradient(135deg, #002868 0%, #0a3d91 100%)" }}
                  aria-hidden="true"
                >
                  {item.name.trim().charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-on-surface text-label-bold truncate">{item.name}</p>
                  <p className="text-caption text-on-surface-variant truncate">
                    {item.role}
                    {item.company ? ` · ${item.company}` : ""}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

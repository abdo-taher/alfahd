import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

// Material Symbol icon names per service id — matches reference design
const serviceIconMap: Record<string, string> = {
  aluminum:     "architecture",
  glass:        "window",
  "curtain-wall": "domain",
  steel:        "format_shapes",
};

// Placeholder hero images for each service card
const serviceImageMap: Record<string, string> = {
  aluminum:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  glass:
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&q=80",
  "curtain-wall":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  steel:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
};

export async function ServicesOverview() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.services" });
  const st = await getTranslations({ locale, namespace: "services" });
  const learnMore = st("learnMore");
  const items = t.raw("items") as Array<{
    id: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="section-py bg-[#f3f3fb]">
      <div className="container-brand">
        {/* Section header */}
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

        {/* 2-column service cards — image left, content right — matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((item, i) => {
            const icon = serviceIconMap[item.id] ?? "construction";
            const img  = serviceImageMap[item.id];
            const href = `/${locale}/services`;

            return (
              <Link
                key={item.id}
                href={href}
                className="group flex flex-col md:flex-row overflow-hidden bg-white rounded-xl luxury-shadow luxury-shadow-hover transition-all duration-500"
              >
                {/* Image — left half */}
                <div className="relative md:w-1/2 h-56 md:h-auto overflow-hidden bg-[#eeedf5] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 card-image-gradient opacity-60" aria-hidden="true" />
                </div>

                {/* Content — right half */}
                <div className="flex flex-col justify-center p-8 md:p-10 gap-4">
                  {/* Material symbol icon */}
                  <span
                    className="material-symbols-outlined text-[#C8A75D] text-4xl leading-none"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>

                  <h3 className="text-headline-sm text-[--color-brand-primary]">
                    {item.title}
                  </h3>

                  <p className="text-body-md text-[#434652] leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <span
                    className={`inline-flex items-center gap-2 text-label-bold text-[--color-brand-primary] group-hover:gap-4 transition-all duration-300 mt-2`}
                  >
                    {learnMore}
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`size-4 transition-transform ${locale === "ar" ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center border-2 border-[--color-brand-primary] text-[--color-brand-primary] px-10 py-3 text-label-bold rounded hover:bg-[--color-brand-primary]/5 transition-all duration-200"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

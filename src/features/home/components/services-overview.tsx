import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

const serviceIcons: Record<string, React.ReactNode> = {
  aluminum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018.25 20.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  glass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  steel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

export async function ServicesOverview() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.services" });
  const st = await getTranslations({ locale, namespace: "services" });
  const learnMore = st("learnMore");
  const items = t.raw("items") as Array<{ id: string; title: string; description: string }>;

  return (
    <section className="section-py bg-[#faf8ff]">
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

        {/* Service cards — full-image cards from redesign_6 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/services/${item.id}-works`}
              className="group flex flex-col overflow-hidden bg-white rounded-lg luxury-shadow luxury-shadow-hover transition-all duration-500"
            >
              {/* Image area with placeholder */}
              <div className="relative h-64 overflow-hidden bg-[#eeedf5]">
                <div className="absolute inset-0 card-image-gradient z-10" />
                {/* Icon overlay on image */}
                <div className="absolute bottom-0 z-20 p-6 w-full">
                  <div className="flex items-center gap-4 text-white">
                    <span className="p-2 bg-[#C8A75D]/20 backdrop-blur-md rounded-lg text-[#C8A75D]">
                      {serviceIcons[item.id]}
                    </span>
                    <h3 className="text-headline-sm text-white font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-8">
                <p className="text-body-lg text-[#434652] leading-relaxed flex-1">
                  {item.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 text-label-bold text-[--color-brand-primary] group-hover:gap-5 transition-all duration-300">
                  {learnMore}
                  <svg viewBox="0 0 20 20" fill="currentColor" className={`size-4 transition-transform ${locale === "ar" ? "rotate-180" : ""}`} aria-hidden="true">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
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

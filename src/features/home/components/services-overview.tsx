import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

const serviceIconMap: Record<string, string> = {
  aluminum:       "architecture",
  glass:          "window",
  "curtain-wall": "domain",
  steel:          "format_shapes",
};

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
  const items = t.raw("items") as Array<{
    id: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="section-padding bg-[#f3f3fb]">
      <div className="container-brand">
        {/* Section header — centered */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
            {locale === "ar" ? "تخصصاتنا الهندسية" : "Our Engineering Specialties"}
          </span>
          <h2
            className="text-[#002868] mb-6"
            style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
          >
            {locale === "ar"
              ? "خدمات هندسية متكاملة للواجهات الحديثة"
              : "Comprehensive Engineering Services for Modern Facades"}
          </h2>
          <p className="text-[#434652]" style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300 }}>
            {t("subtitle")}
          </p>
        </div>

        {/* 2-col service cards — horizontal split image + content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((item) => {
            const icon = serviceIconMap[item.id] ?? "construction";
            const img = serviceImageMap[item.id];
            const href = `/${locale}/services`;

            return (
              <Link
                key={item.id}
                href={href}
                className="group bg-white rounded-3xl overflow-hidden premium-shadow flex flex-col md:flex-row h-full"
              >
                {/* Image — left half */}
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content — right half */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                  <span
                    className="material-symbols-outlined text-[#C8A75D] text-4xl mb-4 leading-none"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <h3
                    className="text-[#002868] mb-4"
                    style={{ fontSize: "24px", lineHeight: "1.4", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#434652] mb-6 flex-1" style={{ fontSize: "16px", lineHeight: "1.8" }}>
                    {item.description}
                  </p>
                  <span className="text-[#002868] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    {locale === "ar" ? "اكتشف المزيد" : "Discover More"}
                    <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
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
            className="inline-flex items-center justify-center border-2 border-[#002868] text-[#002868] px-10 py-3 font-bold rounded-xl hover:bg-[#002868]/5 transition-all duration-200"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

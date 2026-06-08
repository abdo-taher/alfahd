import { getLocale } from "next-intl/server";

const sectors = [
  { icon: "account_balance",   nameAr: "الحكومي",         nameEn: "Government" },
  { icon: "storefront",        nameAr: "التجاري",         nameEn: "Commercial" },
  { icon: "villa",             nameAr: "السكني الفاخر",   nameEn: "Luxury Residential" },
  { icon: "local_hospital",    nameAr: "الرعاية الصحية",  nameEn: "Healthcare" },
  { icon: "school",            nameAr: "التعليمي",        nameEn: "Educational" },
  { icon: "factory",           nameAr: "الصناعي",         nameEn: "Industrial" },
];

export async function IndustriesSection() {
  const locale = await getLocale();

  return (
    <section className="section-padding bg-[#F4F7FA]" aria-labelledby="industries-heading">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: text + sector grid */}
          <div>
            <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
              {locale === "ar" ? "القطاعات التي نخدمها" : "Sectors We Serve"}
            </span>
            <h2
              id="industries-heading"
              className="text-[#002868] mb-8"
              style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
            >
              {locale === "ar"
                ? "خبرتنا تمتد عبر قطاعات متعددة"
                : "Our Expertise Spans Multiple Sectors"}
            </h2>
            <p
              className="text-[#434652] mb-10"
              style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300 }}
            >
              {locale === "ar"
                ? "من المشاريع الحكومية الكبرى إلى المجمعات السكنية الفاخرة، نمتلك الخبرة والكفاءة لتلبية احتياجات كل قطاع بأعلى معايير الجودة."
                : "From major government projects to luxury residential complexes, we have the expertise and capability to meet the needs of every sector with the highest quality standards."}
            </p>

            {/* 2×3 icon cards */}
            <div className="grid grid-cols-2 gap-6">
              {sectors.map((sector) => (
                <div
                  key={sector.nameEn}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <span
                    className="material-symbols-outlined text-[#002868] bg-[#002868]/5 p-3 rounded-xl shrink-0"
                    aria-hidden="true"
                  >
                    {sector.icon}
                  </span>
                  <span className="font-bold text-[#1a1b21] text-sm">
                    {locale === "ar" ? sector.nameAr : sector.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with floating gold card */}
          <div className="relative">
            <div className="relative rounded-[40px] overflow-hidden h-[560px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt={locale === "ar" ? "مشاريعنا عبر القطاعات" : "Our projects across sectors"}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,40,104,0.6) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating gold card */}
            <div
              className="absolute -bottom-10 -end-6 bg-[#C8A75D] p-8 rounded-[30px] premium-shadow"
              aria-hidden="true"
            >
              <div className="text-4xl font-bold text-[#001947] mb-2">+15</div>
              <div className="text-sm font-bold text-[#001947]/80">
                {locale === "ar" ? "سنة خبرة\nفي كل قطاع" : "Years of expertise\nacross sectors"}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

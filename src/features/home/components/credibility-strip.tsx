import { getTranslations, getLocale } from "next-intl/server";

export async function CredibilityStrip() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.stats" });

  return (
    <section className="section-padding bg-white overflow-hidden" aria-label={t("title")}>
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT: 2×2 bento grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Card 1 — primary (blue) with mt */}
            <div className="mt-12 bg-[#002868] p-12 rounded-3xl premium-shadow hover:-translate-y-4 transition-transform duration-500 flex flex-col">
              <span className="material-symbols-outlined text-[#C8A75D] text-5xl mb-4" aria-hidden="true">architecture</span>
              <h3 className="text-white text-5xl font-bold mb-2">500+</h3>
              <p className="text-white/60 text-base leading-relaxed">
                {locale === "ar"
                  ? "مشروع معماري متكامل في مختلف مناطق المملكة"
                  : "Completed architectural projects across the Kingdom"}
              </p>
            </div>

            {/* Card 2 — surface-container (light) */}
            <div className="bg-[#F4F7FA] p-12 rounded-3xl premium-shadow hover:-translate-y-4 transition-transform duration-500 flex flex-col">
              <span className="material-symbols-outlined text-[#002868] text-5xl mb-4" aria-hidden="true">history</span>
              <h3 className="text-[#002868] text-5xl font-bold mb-2">25+</h3>
              <p className="text-[#434652] text-base leading-relaxed">
                {locale === "ar"
                  ? "عام من الريادة في قطاع الواجهات والهياكل"
                  : "Years leading the facades & structures sector"}
              </p>
            </div>

            {/* Card 3 — surface-container (light) */}
            <div className="bg-[#F4F7FA] p-12 rounded-3xl premium-shadow hover:-translate-y-4 transition-transform duration-500 flex flex-col">
              <span className="material-symbols-outlined text-[#002868] text-5xl mb-4" aria-hidden="true">group</span>
              <h3 className="text-[#002868] text-5xl font-bold mb-2">100+</h3>
              <p className="text-[#434652] text-base leading-relaxed">
                {locale === "ar"
                  ? "عميل من القطاعين العام والخاص"
                  : "Clients from public and private sectors"}
              </p>
            </div>

            {/* Card 4 — gold with negative mt */}
            <div className="-mt-12 bg-[#C8A75D] p-12 rounded-3xl premium-shadow hover:-translate-y-4 transition-transform duration-500 flex flex-col">
              <span className="material-symbols-outlined text-[#001947] text-5xl mb-4" aria-hidden="true">location_on</span>
              <h3 className="text-[#001947] text-5xl font-bold mb-2">15+</h3>
              <p className="text-[#001947]/70 text-base leading-relaxed">
                {locale === "ar"
                  ? "مدينة نخدمها بأعلى معايير الدقة"
                  : "Cities served with the highest precision standards"}
              </p>
            </div>
          </div>

          {/* RIGHT: text + checklist */}
          <div>
            <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
              {locale === "ar" ? "أرقام تتحدث عن جدارتنا" : "Numbers That Speak for Themselves"}
            </span>
            <h2
              className="text-[#002868] mb-8"
              style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
            >
              {locale === "ar"
                ? "نحن لا نبني هياكل فقط، بل نؤسس للمستقبل"
                : "We Don't Just Build Structures — We Build the Future"}
            </h2>
            <p className="text-[#434652] mb-10" style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300 }}>
              {locale === "ar"
                ? "منذ انطلاقتنا في الفهد للمقاولات، وضعنا نصب أعيننا الوصول إلى قمة الهرم الإنشائي من خلال التخصص في أدق التفاصيل المعمارية لأنظمة الألمنيوم والزجاج، محققين معادلة الأمان والجمالية في كبرى مشاريع المملكة."
                : "Since our founding, Al-Fahad Contracting has set its sights on reaching the pinnacle of the construction hierarchy through specializing in the finest architectural details of aluminum and glass systems, achieving the balance of safety and aesthetics in the Kingdom's major projects."}
            </p>
            <ul className="space-y-4">
              {[
                locale === "ar" ? "التزام كامل بالجداول الزمنية" : "Full commitment to project timelines",
                locale === "ar" ? "استخدام أجود المواد العالمية المصنعة محلياً" : "World-class materials with local manufacturing",
                locale === "ar" ? "فريق هندسي متخصص لكل قطاع" : "Specialized engineering team for every sector",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1a1b21] font-semibold">
                  <span className="material-symbols-outlined text-[#C8A75D]" aria-hidden="true">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

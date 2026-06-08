import { getTranslations, getLocale } from "next-intl/server";

export async function FinalCta() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.cta" });

  return (
    <section className="section-padding bg-white text-center" aria-labelledby="final-cta-heading">
      <div className="container-brand">
        <div className="max-w-4xl mx-auto">
          <h2
            id="final-cta-heading"
            className="text-[#002868] mb-8 leading-tight"
            style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.02em", lineHeight: 1.1, fontWeight: 700 }}
          >
            {locale === "ar"
              ? "جاهز لبناء صرحك المعماري القادم؟"
              : "Ready to Build Your Next Architectural Landmark?"}
          </h2>
          <p className="text-[#434652] mb-12 max-w-2xl mx-auto" style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300 }}>
            {t("description")}
          </p>

          {/* Phone + Email links side by side */}
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="tel:920000000"
              className="flex items-center gap-4 text-2xl font-bold text-[#002868] hover:text-[#C8A75D] transition-colors"
              dir="ltr"
            >
              <span
                className="material-symbols-outlined text-4xl bg-[#002868]/5 p-4 rounded-full"
                aria-hidden="true"
              >
                phone_in_talk
              </span>
              {locale === "ar" ? "اتصل بنا: 92000XXXX" : "Call Us: 92000XXXX"}
            </a>

            <a
              href="mailto:info@alfahd-contracting.com"
              className="flex items-center gap-4 text-2xl font-bold text-[#002868] hover:text-[#C8A75D] transition-colors"
            >
              <span
                className="material-symbols-outlined text-4xl bg-[#002868]/5 p-4 rounded-full"
                aria-hidden="true"
              >
                mail
              </span>
              info@alfahd-contracting.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

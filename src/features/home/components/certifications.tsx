import { getTranslations, getLocale } from "next-intl/server";

const certs = [
  { icon: "verified_user",      name: "ISO 9001:2015",   desc: "إدارة الجودة" },
  { icon: "health_and_safety",  name: "OHSAS 18001",     desc: "الصحة والسلامة" },
  { icon: "eco",                name: "ISO 14001:2015",  desc: "الإدارة البيئية" },
  { icon: "workspace_premium",  name: "هيئة المقاولين", desc: "معتمد سعودياً" },
];

export async function Certifications() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.certifications" });

  return (
    <section className="py-24 bg-white border-y border-[#c4c6d3]/30">
      <div className="container-brand">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: headline */}
          <div className="max-w-md text-center lg:text-start">
            <span className="text-label-bold text-[--color-brand-primary] uppercase tracking-widest block mb-3">
              {t("title")}
            </span>
            <h2 className="text-headline-sm text-[--color-brand-primary] mb-3">
              {locale === "ar"
                ? "التزامنا بالجودة يتخطى المعايير"
                : "Our Quality Commitment Exceeds Standards"}
            </h2>
            <p className="text-body-md text-[#434652]">{t("subtitle")}</p>
          </div>

          {/* Right: cert logos */}
          <div className="flex flex-wrap justify-center gap-10 opacity-75 hover:opacity-100 transition-opacity duration-500">
            {certs.map(({ icon, name, desc }) => (
              <div key={name} className="flex flex-col items-center gap-3 text-center group">
                <span
                  className="material-symbols-outlined text-5xl text-[--color-brand-primary] group-hover:text-[#C8A75D] transition-colors duration-300"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <p className="text-label-bold text-[#1a1b21]">{name}</p>
                <p className="text-caption text-[#747783]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

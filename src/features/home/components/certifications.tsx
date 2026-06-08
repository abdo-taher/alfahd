import { getTranslations, getLocale } from "next-intl/server";

const certs = [
  { icon: "verified_user",     name: "ISO 9001:2015" },
  { icon: "health_and_safety", name: "OHSAS 18001" },
  { icon: "eco",               name: "ISO 14001" },
  { icon: "workspace_premium", name: "SASP Grade A" },
];

export async function Certifications() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.certifications" });

  return (
    <section
      className="py-24 bg-white dark:bg-gray-900"
      style={{ borderTop: "1px solid rgba(196,198,211,0.3)", borderBottom: "1px solid rgba(196,198,211,0.3)" }}
      aria-labelledby="certs-heading"
    >
      <div className="container-brand">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: headline */}
          <div className="max-w-md">
            <h2
              id="certs-heading"
              className="text-[#002868] dark:text-white mb-4 text-3xl font-bold"
            >
              {locale === "ar"
                ? "التزامنا بالجودة يتخطى المعايير"
                : "Our Quality Commitment Exceeds Standards"}
            </h2>
            <p className="text-[#434652] dark:text-gray-400" style={{ fontSize: "16px", lineHeight: "1.8" }}>
              {t("subtitle")}
            </p>
          </div>

          {/* Right: cert icons — opacity-60 as in master reference */}
          <div className="flex flex-wrap justify-center gap-12" style={{ opacity: 0.6 }}>
            {certs.map(({ icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-3 text-center">
                <span
                  className="material-symbols-outlined text-5xl text-[#1a1b21] dark:text-gray-200"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <p className="font-bold text-[#1a1b21] dark:text-gray-200">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

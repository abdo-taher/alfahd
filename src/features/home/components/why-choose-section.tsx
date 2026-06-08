import { getTranslations, getLocale } from "next-intl/server";

const whyIcons = [
  "verified",
  "inventory_2",
  "engineering",
  "speed",
  "health_and_safety",
  "handshake",
];

export async function WhyChooseSection() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.whyChoose" });
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section className="section-padding bg-[#002868] relative overflow-hidden" aria-labelledby="why-choose-heading">
      {/* Decorative radial gradient — replaces blur blobs for better perf */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(200,167,93,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 10% 100%, rgba(75,93,142,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
            {locale === "ar" ? "قيمنا الجوهرية" : "Our Core Values"}
          </span>
          <h2
            id="why-choose-heading"
            className="text-white"
            style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
          >
            {t("title")}
          </h2>
        </div>

        {/* 6-card grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl p-12 hover:bg-white/10 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="material-symbols-outlined text-[#C8A75D] text-5xl mb-6 block"
                aria-hidden="true"
              >
                {whyIcons[i] ?? "check_circle"}
              </span>
              <h3
                className="text-white mb-4"
                style={{ fontSize: "24px", lineHeight: "1.4", fontWeight: 600 }}
              >
                {item.title}
              </h3>
              <p className="text-white/70" style={{ fontSize: "16px", lineHeight: "1.8" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

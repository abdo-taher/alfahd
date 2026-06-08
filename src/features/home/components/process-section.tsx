import { getTranslations, getLocale } from "next-intl/server";

export async function ProcessSection() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.process" });
  const steps = t.raw("steps") as Array<{ step: number; title: string; description: string }>;

  return (
    <section className="section-padding bg-white dark:bg-gray-950" style={{}} aria-labelledby="process-heading">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
            {locale === "ar" ? "مسار العمل" : "Work Process"}
          </span>
          <h2
            id="process-heading"
            className="text-[#002868] dark:text-white"
            style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
          >
            {locale === "ar" ? "كيف ننسج النجاح؟" : t("title")}
          </h2>
        </div>

        {/* Steps — with horizontal connector line on desktop */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-[#c4c6d3] z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl premium-shadow text-center"
                style={{ border: "1px solid rgba(196,198,211,0.2)" }}
              >
                {/* Step circle — alternates primary/gold */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                  style={{
                    background: i % 2 === 0 ? "#002868" : "#C8A75D",
                    color: i % 2 === 0 ? "#ffffff" : "#001947",
                  }}
                >
                  {String(step.step).padStart(2, "0")}
                </div>
                <p className="font-bold text-[#002868] dark:text-blue-300 mb-3">{step.title}</p>
                <p className="text-sm text-[#434652] dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export function WhyChooseSection() {
  const t = useTranslations("home.whyChoose");
  const locale = useLocale();
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section className="section-py enterprise-gradient text-white overflow-hidden relative">
      {/* Decorative geometric element */}
      <div className="absolute top-0 end-0 w-1/3 h-full opacity-5 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full fill-white" viewBox="0 0 400 800">
          <path d="M400 0L0 400L400 800V0Z" />
        </svg>
      </div>

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: headline + intro */}
          <div className="lg:col-span-5">
            <span className="text-label-bold text-[#dae2ff] uppercase tracking-widest block mb-4">
              {t("title")}
            </span>
            <h2 className="text-display-mobile lg:text-headline-md font-bold text-white mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-body-lg text-[#dae2ff]/80 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Right: reasons grid */}
          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors duration-300 group"
              >
                <div
                  className="mt-0.5 shrink-0 p-2 rounded-lg bg-white/10 text-[--color-brand-gold] group-hover:bg-[--color-brand-gold] group-hover:text-[--color-brand-primary] transition-colors duration-300"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-label-bold text-white mb-1">{item.title}</h3>
                  <p className="text-body-md text-[#dae2ff]/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4 pt-16 border-t border-white/10">
          {[
            { value: "١٥+", label: locale === "ar" ? "عاماً من الخبرة" : "Years Experience" },
            { value: "٥٠٠+", label: locale === "ar" ? "مشروع منجز" : "Projects Completed" },
            { value: "٢٠٠+", label: locale === "ar" ? "عميل راضٍ" : "Satisfied Clients" },
            { value: "٩٨٪", label: locale === "ar" ? "نسبة رضا العملاء" : "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-display-mobile font-bold text-[--color-brand-gold]">{stat.value}</div>
              <div className="text-label-bold text-[#dae2ff]/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

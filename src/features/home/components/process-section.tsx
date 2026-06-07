"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ProcessSection() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Array<{ step: number; title: string; description: string }>;

  return (
    <section className="section-py bg-[#faf8ff]">
      <div className="container-brand">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center p-8 bg-white border border-[#c4c6d3] rounded-xl luxury-shadow group hover:border-[--color-brand-primary] transition-colors duration-300"
            >
              {/* Step number — alternates navy / gold like reference */}
              <span
                className={[
                  "mb-6 flex size-16 items-center justify-center rounded-full text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300",
                  i % 2 === 0
                    ? "enterprise-gradient text-white"
                    : "bg-[#C8A75D] text-[#001947]",
                ].join(" ")}
              >
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="text-headline-sm text-[#1a1b21] mb-3">{step.title}</h3>
              <p className="text-body-md text-[#434652] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

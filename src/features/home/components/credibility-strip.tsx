"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function CredibilityStrip() {
  const t = useTranslations("home.stats");
  const items = t.raw("items") as Array<{ value: string; suffix: string; label: string }>;

  return (
    <section className="enterprise-gradient py-16" aria-label={t("title")}>
      <div className="container-brand">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-display-mobile font-bold text-white leading-none">
                {item.value}
                <span className="text-[--color-brand-gold]">{item.suffix}</span>
              </span>
              <span className="mt-2 text-label-bold text-[#dae2ff]/80">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

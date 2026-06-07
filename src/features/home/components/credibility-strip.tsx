"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function CredibilityStrip() {
  const t = useTranslations("home.stats");
  const items = t.raw("items") as Array<{ value: string; suffix: string; label: string }>;

  return (
    <section
      className="enterprise-gradient py-20 overflow-hidden relative"
      aria-label={t("title")}
    >
      {/* Subtle radial blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C8A75D]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#4b5d8e]/20 blur-[120px]" />
      </div>

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Big number */}
              <div
                className="font-bold text-white leading-none mb-3"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                {item.value}
                <span className="text-[#C8A75D]">{item.suffix}</span>
              </div>
              {/* Gold divider */}
              <div className="w-8 h-[2px] bg-[#C8A75D]/60 mb-3 group-hover:w-14 transition-all duration-500" aria-hidden="true" />
              {/* Label */}
              <span className="text-label-bold text-[#dae2ff]/80 uppercase tracking-wider">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

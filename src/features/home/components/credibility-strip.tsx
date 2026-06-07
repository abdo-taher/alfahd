"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/container";

export function CredibilityStrip() {
  const t = useTranslations("home.stats");

  // Typed because next-intl raw() gives unknown[]
  const items = t.raw("items") as Array<{ value: string; suffix: string; label: string }>;

  return (
    <section
      className="bg-primary py-12"
      aria-label={t("title")}
    >
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-4xl font-bold text-white md:text-5xl">
                {item.value}
                <span className="text-[--color-brand-accent]">{item.suffix}</span>
              </span>
              <span className="mt-2 text-sm text-white/70">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/shared/components/ui/container";
import { Section } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";

export function WhyChooseSection() {
  const t = useTranslations("home.whyChoose");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <Section className="bg-[--color-brand-secondary] text-white overflow-hidden">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <Badge variant="accent" className="mb-3">
              {t("title")}
            </Badge>
            <h2 className="heading-lg text-white">{t("title")}</h2>
            <p className="mt-4 text-white/70 leading-relaxed text-base">{t("subtitle")}</p>
          </div>

          {/* Right: grid of reasons */}
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors"
              >
                <CheckCircle2 className="size-5 shrink-0 text-[--color-brand-accent] mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

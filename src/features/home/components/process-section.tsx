"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { Section } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";

export function ProcessSection() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Array<{ step: number; title: string; description: string }>;

  return (
    <Section className="bg-muted/40">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <Badge variant="default" className="mb-3">{t("title")}</Badge>
          <h2 className="heading-lg">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("subtitle")}</p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute hidden lg:block top-10 start-[calc(100%-1px)] w-8 h-px bg-primary/20"
                  aria-hidden="true"
                />
              )}
              {/* Step number */}
              <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-md">
                {step.step < 10 ? `0${step.step}` : step.step}
              </span>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

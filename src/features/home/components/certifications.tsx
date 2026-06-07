"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Award, BadgeCheck, Stamp } from "lucide-react";

const certs = [
  { Icon: ShieldCheck, name: "ISO 9001:2015",            desc: "إدارة الجودة" },
  { Icon: Award,       name: "ISO 14001:2015",           desc: "الإدارة البيئية" },
  { Icon: BadgeCheck,  name: "OHSAS 18001",              desc: "الصحة والسلامة" },
  { Icon: Stamp,       name: "هيئة المقاولين",           desc: "معتمد سعودياً" },
];

export function Certifications() {
  const t = useTranslations("home.certifications");

  return (
    <section className="py-16 bg-[#faf8ff] border-t border-[#e2e2e9]">
      <div className="container-brand">
        <div className="text-center mb-12">
          <span className="text-label-bold text-[--color-brand-primary] uppercase tracking-widest block mb-3">
            {t("title")}
          </span>
          <h2 className="text-headline-sm text-[--color-brand-primary]">{t("title")}</h2>
          <p className="text-body-md text-[#434652] mt-2">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {certs.map(({ Icon, name, desc }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-lg border border-[#c4c6d3] bg-white p-6 text-center luxury-shadow"
            >
              <Icon className="size-10 text-[--color-brand-gold]" aria-hidden="true" />
              <p className="text-label-bold text-[#1a1b21]">{name}</p>
              <p className="text-caption text-[#747783]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { ShieldCheck, Award, BadgeCheck, Stamp } from "lucide-react";
import { Container } from "@/shared/components/ui/container";
import { Section } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";

const certifications = [
  {
    icon: ShieldCheck,
    nameAr: "ISO 9001:2015",
    nameEn: "ISO 9001:2015",
    descAr: "إدارة الجودة",
    descEn: "Quality Management",
  },
  {
    icon: Award,
    nameAr: "ISO 14001:2015",
    nameEn: "ISO 14001:2015",
    descAr: "الإدارة البيئية",
    descEn: "Environmental Management",
  },
  {
    icon: BadgeCheck,
    nameAr: "OHSAS 18001",
    nameEn: "OHSAS 18001",
    descAr: "الصحة والسلامة المهنية",
    descEn: "Occupational Health & Safety",
  },
  {
    icon: Stamp,
    nameAr: "هيئة المقاولين",
    nameEn: "Saudi Contractors Authority",
    descAr: "معتمد من هيئة المقاولين السعودية",
    descEn: "Certified by Saudi Contractors Authority",
  },
];

export function Certifications() {
  const t = useTranslations("home.certifications");

  return (
    <Section className="bg-muted/40" tight>
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <Badge variant="default" className="mb-3">{t("title")}</Badge>
          <h2 className="heading-lg">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center"
              >
                <Icon className="size-10 text-[--color-brand-accent]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{cert.nameAr}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.descAr}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

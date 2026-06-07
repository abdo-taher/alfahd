"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nt = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: locale === "ar" ? "أعمال الألمنيوم" : "Aluminum Works", href: `/${locale}/services/aluminum-works` },
    { label: locale === "ar" ? "أعمال الزجاج"   : "Glass Works",    href: `/${locale}/services/glass-works` },
    { label: locale === "ar" ? "أعمال الحديد"   : "Steel Works",    href: `/${locale}/services/steel-works` },
  ];

  const quickLinks = [
    { label: nt("home"),     href: `/${locale}` },
    { label: nt("about"),    href: `/${locale}/about` },
    { label: nt("projects"), href: `/${locale}/projects` },
    { label: nt("blog"),     href: `/${locale}/blog` },
    { label: nt("contact"),  href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-[--color-brand-secondary] text-white" role="contentinfo">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">الفهد</span>
              <span className="text-sm text-white/70 block">للمقاولات</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              {t("description")}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a href="tel:+966500000000" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="size-4 shrink-0" />
                <span dir="ltr">+966 50 000 0000</span>
              </a>
              <a href="mailto:info@alfahd-contracting.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="size-4 shrink-0" />
                <span>info@alfahd-contracting.com</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>{locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">
              {t("ourServices")}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">
              {t("contactUs")}
            </h3>
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center justify-center rounded-xl bg-[--color-brand-accent] px-5 py-3 text-sm font-semibold text-white hover:bg-[--color-brand-accent]/90 transition-colors"
            >
              {nt("requestQuote")}
            </Link>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-white/50">
          <p>
            © {year} {locale === "ar" ? "شركة الفهد للمقاولات" : "Al Fahd Contracting"} —{" "}
            {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const nt = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: locale === "ar" ? "أنظمة الألمنيوم"  : "Aluminium Systems", href: `/${locale}/services` },
    { label: locale === "ar" ? "الزجاج الإنشائي"  : "Structural Glass",  href: `/${locale}/services` },
    { label: locale === "ar" ? "جدران الستائر"    : "Curtain Walls",     href: `/${locale}/services` },
    { label: locale === "ar" ? "الهياكل المعدنية" : "Steel Structures",  href: `/${locale}/services` },
  ];

  const companyLinks = [
    { label: nt("home"),     href: `/${locale}` },
    { label: nt("about"),    href: `/${locale}/about` },
    { label: nt("projects"), href: `/${locale}/projects` },
    { label: nt("blog"),     href: `/${locale}/blog` },
    { label: nt("contact"),  href: `/${locale}/contact` },
  ];

  const legalLinks = [
    { label: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy", href: `/${locale}/privacy` },
    { label: locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions", href: `/${locale}/terms` },
    { label: locale === "ar" ? "اتصل بنا" : "Contact Us", href: `/${locale}/contact` },
    { label: locale === "ar" ? "طلب عرض سعر" : "Request Quote", href: `/${locale}/request-quote` },
  ];

  return (
    <footer className="bg-primary text-on-primary pt-24 pb-12" role="contentinfo">
      <div className="container-brand">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Col 1: Logo + desc + social */}
          <div className="col-span-1">
            {/* Logo text */}
            <Link href={`/${locale}`} className="inline-block mb-8">
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-white">
                  {locale === "ar" ? "الفهد للمقاولات" : "Al-Fahad"}
                </span>
                <span className="text-xs text-on-primary/60 uppercase tracking-widest">
                  {locale === "ar" ? "Contracting" : "Contracting"}
                </span>
              </div>
            </Link>

            <p className="text-on-primary/70 mb-8 leading-relaxed text-sm">
              {t("description")}
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              {[
                { icon: "share", label: "Social" },
                { icon: "language", label: "Website" },
                { icon: "mail", label: "Email" },
              ].map(({ icon, label }) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C8A75D] hover:text-primary hover:border-transparent transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: الخدمات */}
          <div>
            <h4 className="text-[#C8A75D] font-bold mb-8 uppercase tracking-widest text-sm">
              {t("ourServices")}
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-on-primary/80 hover:text-[#C8A75D] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: الشركة */}
          <div>
            <h4 className="text-[#C8A75D] font-bold mb-8 uppercase tracking-widest text-sm">
              {locale === "ar" ? "الشركة" : "Company"}
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-primary/80 hover:text-[#C8A75D] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: قانوني */}
          <div>
            <h4 className="text-[#C8A75D] font-bold mb-8 uppercase tracking-widest text-sm">
              {locale === "ar" ? "قانوني" : "Legal"}
            </h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-on-primary/80 hover:text-[#C8A75D] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <a
                href="tel:+966500000000"
                className="flex items-center gap-2 text-on-primary/60 hover:text-[#C8A75D] transition-colors text-sm"
                dir="ltr"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">phone</span>
                +966 50 000 0000
              </a>
              <a
                href="mailto:info@alfahd-contracting.com"
                className="flex items-center gap-2 text-on-primary/60 hover:text-[#C8A75D] transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">mail</span>
                info@alfahd.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-on-primary/50 text-sm">
            © {year} {locale === "ar" ? "الفهد للمقاولات" : "Al-Fahad Contracting"} —{" "}
            {t("rights")}
          </p>
          <p className="text-on-primary/50 text-sm flex items-center gap-2">
            {locale === "ar"
              ? "صنع بفخر في المملكة العربية السعودية"
              : "Made with pride in Saudi Arabia"}
            <span className="material-symbols-outlined text-[#C8A75D] text-base" aria-hidden="true">favorite</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

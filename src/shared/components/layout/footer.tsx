"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, Check } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nt = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  const serviceLinks = [
    { label: locale === "ar" ? "أنظمة الألمنيوم"  : "Aluminum Systems",  href: `/${locale}/services` },
    { label: locale === "ar" ? "جدران الستائر"    : "Curtain Walls",     href: `/${locale}/services` },
    { label: locale === "ar" ? "الزجاج الإنشائي"  : "Structural Glass",  href: `/${locale}/services` },
    { label: locale === "ar" ? "الهياكل المعدنية" : "Steel Structures",  href: `/${locale}/services` },
  ];

  const companyLinks = [
    { label: locale === "ar" ? "تاريخنا المعماري" : "Our History",  href: `/${locale}/about` },
    { label: locale === "ar" ? "مجلس الإدارة"    : "Leadership",   href: `/${locale}/about` },
    { label: locale === "ar" ? "فرص العمل"       : "Careers",      href: `/${locale}/about` },
  ];

  return (
    <footer
      className="bg-gray-950 text-gray-300 font-sans border-t-2 pt-16 pb-8"
      style={{ borderColor: "rgba(120,53,15,0.1)" }}
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                srcSet="/images/logo.png 1x, /images/logo@2x.png 2x"
                alt="Al-Fahd Logo"
                className="h-16 w-auto brightness-200"
                width={420}
                height={180}
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
              {t("description")}
            </p>
            {/* ISO badges */}
            <div className="pt-2 flex flex-wrap gap-1 text-xs text-gray-500">
              <span
                className="inline-block px-2 py-1 bg-gray-900 border border-gray-800 rounded"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: "10px" }}
              >
                ISO 9001:2015
              </span>
              <span
                className="inline-block px-2 py-1 bg-gray-900 border border-gray-800 rounded"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: "10px" }}
              >
                Class T1 Certified
              </span>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#C5A880" }}
            >
              {t("specialties")}
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#C5A880" }}
            >
              {t("companyLinks")}
            </h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/portal`}
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  {nt("portal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#C5A880" }}
            >
              {t("newsletter")}
            </h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {t("newsletterSub")}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div
                className="flex rounded overflow-hidden border border-gray-800 focus-within:border-amber-600 transition-colors"
              >
                <input
                  type="email"
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "success"}
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="bg-amber-700 hover:bg-amber-600 text-white px-3 transition-colors flex items-center justify-center disabled:opacity-50"
                  aria-label={t("subscribeBtn")}
                >
                  {status === "loading" ? (
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                  ) : status === "success" ? (
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {status === "success" && (
                <p className="text-[10px] text-amber-500 font-sans font-medium">
                  {locale === "ar" ? "شكراً جزيلاً لتسجيلك!" : "Thank you for subscribing!"}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Contact bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 pb-8 border-t border-gray-800/80 mt-12 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 border border-gray-800 rounded text-amber-500">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-white">
                {t("hqTitle")}
              </p>
              <p className="text-[11px] text-gray-500">{t("hqAddress")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 border border-gray-800 rounded text-amber-500">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-white">{t("phoneTitle")}</p>
              <p className="text-[11px] text-gray-500" dir="ltr">{t("phoneNumber")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 border border-gray-800 rounded text-amber-500">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-white">{t("emailTitle")}</p>
              <p className="text-[11px] text-gray-500">{t("emailAddress")}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ fontSize: "11px", color: "#6b7280" }}
        >
          <p
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            className="text-center md:text-start"
          >
            {t("copyright")}
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <span aria-hidden="true">•</span>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
            <span aria-hidden="true">•</span>
            <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

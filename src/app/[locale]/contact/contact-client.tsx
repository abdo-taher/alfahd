"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ContactClient() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
    trackEvent("contact", { form: "contact" });
  }

  const ft = t.raw("form") as Record<string, string>;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="enterprise-gradient py-24 text-white">
        <div className="container-brand">
          <div className="max-w-3xl">
            <div className="gold-bar mb-6" aria-hidden="true" />
            <h1 className="text-display-mobile lg:text-display font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-body-lg text-primary-fixed-dim leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Split layout */}
      <section className="section-py bg-surface dark:bg-gray-950">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form — takes 7 cols */}
            <div className="lg:col-span-7">
              <h2 className="text-headline-md text-primary mb-8">
                {locale === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>

              {formState === "success" ? (
                <div className="bg-surface-container-low dark:bg-gray-800 border border-outline-variant dark:border-gray-700 rounded-lg p-10 text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-headline-sm text-primary">{ft.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-label-bold text-on-surface mb-2"
                      >
                        {ft.name}
                        <span className="text-error ms-1" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={ft.namePlaceholder}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-label-bold text-on-surface mb-2"
                      >
                        {ft.email}
                        <span className="text-error ms-1" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={ft.emailPlaceholder}
                        value={form.email}
                        onChange={handleChange}
                        dir="ltr"
                        className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-label-bold text-on-surface mb-2"
                    >
                      {ft.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={ft.phonePlaceholder}
                      value={form.phone}
                      onChange={handleChange}
                      dir="ltr"
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-label-bold text-on-surface mb-2"
                    >
                      {ft.message}
                      <span className="text-error ms-1" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder={ft.messagePlaceholder}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                    />
                  </div>

                  {formState === "error" && (
                    <p className="text-error text-body-md">{ft.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full bg-primary text-on-primary py-4 text-label-bold rounded hover:bg-primary-container transition-all duration-200 disabled:opacity-70"
                    aria-busy={formState === "sending"}
                  >
                    {formState === "sending" ? ft.sending : ft.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Info — takes 5 cols */}
            <div className="lg:col-span-5">
              <div className="enterprise-gradient rounded-lg p-10 text-white h-full min-h-[400px] flex flex-col justify-between">
                <div>
                  <h2 className="text-headline-md text-white mb-8">
                    {locale === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </h2>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="size-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-label-bold text-primary-fixed mb-1">{t("address")}</p>
                        <p className="text-body-md text-primary-fixed-dim">
                          {locale === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="size-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-label-bold text-primary-fixed mb-1">{t("phone")}</p>
                        <a
                          href="tel:+966114459222"
                          className="text-body-md text-primary-fixed-dim hover:text-white transition-colors"
                          dir="ltr"
                        >
                          +966 11 445 9222
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="size-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-label-bold text-primary-fixed mb-1">{t("email")}</p>
                        <a
                          href="mailto:engineering@al-fahd.com.sa"
                          className="text-body-md text-primary-fixed-dim hover:text-white transition-colors"
                        >
                          engineering@al-fahd.com.sa
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="size-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-label-bold text-primary-fixed mb-1">{t("workingHours")}</p>
                        <p className="text-body-md text-primary-fixed-dim">{t("workingHoursValue")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/966114459222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded text-label-bold hover:bg-[#20bc5a] transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

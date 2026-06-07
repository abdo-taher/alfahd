"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type ServiceKey = "aluminum" | "glass" | "steel" | "other";

export default function RequestQuotePage() {
  const t = useTranslations("quote");
  const locale = useLocale();
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "" as ServiceKey | "",
    projectLocation: "",
    projectSize: "",
    projectDescription: "",
  });

  const ft = t.raw("form") as Record<string, string>;
  const services = t.raw("form.services") as Record<ServiceKey, string>;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  }

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

      <section className="section-py bg-surface">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto">
            {formState === "success" ? (
              <div className="bg-surface-container-low border border-outline-variant rounded-lg p-16 text-center">
                <div className="w-16 h-16 rounded-full enterprise-gradient flex items-center justify-center text-white text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h2 className="text-headline-md text-primary mb-4">
                  {locale === "ar" ? "تم استلام طلبك!" : "Request Received!"}
                </h2>
                <p className="text-body-lg text-on-surface-variant">{ft.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-10 luxury-shadow" noValidate>
                <h2 className="text-headline-md text-primary">
                  {locale === "ar" ? "تفاصيل طلبك" : "Your Request Details"}
                </h2>

                {/* Personal info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-label-bold text-on-surface mb-2">
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
                    <label htmlFor="company" className="block text-label-bold text-on-surface mb-2">
                      {ft.company}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder={ft.companyPlaceholder}
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-label-bold text-on-surface mb-2">
                      {ft.phone}
                      <span className="text-error ms-1" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={ft.phonePlaceholder}
                      value={form.phone}
                      onChange={handleChange}
                      dir="ltr"
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-label-bold text-on-surface mb-2">
                      {ft.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={ft.emailPlaceholder}
                      value={form.email}
                      onChange={handleChange}
                      dir="ltr"
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Project info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-label-bold text-on-surface mb-2">
                      {ft.service}
                      <span className="text-error ms-1" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    >
                      <option value="" disabled>{ft.servicePlaceholder}</option>
                      {(Object.entries(services) as [ServiceKey, string][]).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="projectLocation" className="block text-label-bold text-on-surface mb-2">
                      {ft.projectLocation}
                    </label>
                    <input
                      id="projectLocation"
                      name="projectLocation"
                      type="text"
                      placeholder={ft.projectLocationPlaceholder}
                      value={form.projectLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectSize" className="block text-label-bold text-on-surface mb-2">
                      {ft.projectSize}
                    </label>
                    <input
                      id="projectSize"
                      name="projectSize"
                      type="text"
                      placeholder={ft.projectSizePlaceholder}
                      value={form.projectSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-body-md bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectDescription" className="block text-label-bold text-on-surface mb-2">
                    {ft.projectDescription}
                    <span className="text-error ms-1" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    required
                    rows={6}
                    placeholder={ft.projectDescriptionPlaceholder}
                    value={form.projectDescription}
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
        </div>
      </section>
    </div>
  );
}

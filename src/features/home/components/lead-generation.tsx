"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

export function LeadGeneration() {
  const locale = useLocale();
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  }

  const services = locale === "ar"
    ? ["أعمال الألمنيوم", "أعمال الزجاج", "الهياكل المعدنية", "إدارة المشاريع", "أخرى"]
    : ["Aluminium Works", "Glass Works", "Steel Structures", "Project Management", "Other"];

  return (
    <section className="section-padding bg-[#F4F7FA] dark:bg-gray-950" aria-labelledby="leadgen-heading">
      <div className="container-brand">
        <div className="bg-[#002868] rounded-[40px] overflow-hidden flex flex-col md:flex-row premium-shadow">

          {/* Left half — text + CTA */}
          <div className="md:w-1/2 p-16 text-white flex flex-col justify-center">
            <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-6 block">
              {locale === "ar" ? "ابدأ الآن" : "Get Started"}
            </span>
            <h2
              id="leadgen-heading"
              className="text-white mb-6"
              style={{ fontSize: "clamp(32px, 3vw, 40px)", lineHeight: "1.2", fontWeight: 700 }}
            >
              {locale === "ar"
                ? "ابدأ مشروعك اليوم مع خبراء الواجهات"
                : "Start Your Project Today with Facade Experts"}
            </h2>
            <p
              className="text-white/70 mb-10"
              style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300 }}
            >
              {locale === "ar"
                ? "فريقنا الهندسي جاهز لتقديم استشارة مجانية ودراسة متطلبات مشروعك بالتفصيل."
                : "Our engineering team is ready to provide a free consultation and study your project requirements in detail."}
            </p>

            {/* Trust signals */}
            <ul className="space-y-3 mb-10">
              {[
                locale === "ar" ? "استشارة مجانية بلا التزام" : "Free consultation, no commitment",
                locale === "ar" ? "رد خلال 24 ساعة" : "Response within 24 hours",
                locale === "ar" ? "خبرة أكثر من 25 عاماً" : "25+ years of experience",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <span className="material-symbols-outlined text-[#C8A75D] text-base" aria-hidden="true">check_circle</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={`/${locale}/request-quote`}
              className="inline-flex items-center justify-center bg-[#C8A75D] text-[#001947] px-12 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all duration-300 active:scale-95 self-start"
            >
              {locale === "ar" ? "اطلب عرض سعر فوراً" : "Request a Quote Now"}
            </a>
          </div>

          {/* Right half — white form */}
          <div className="md:w-1/2 bg-white dark:bg-gray-900 p-16 flex flex-col justify-center">
            {status === "success" ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[#C8A75D] text-6xl mb-4 block" aria-hidden="true">
                  task_alt
                </span>
                <p className="text-[#002868] dark:text-white text-2xl font-bold mb-3">
                  {locale === "ar" ? "تم إرسال طلبك!" : "Request Sent!"}
                </p>
                <p className="text-[#434652] dark:text-gray-400">
                  {locale === "ar"
                    ? "سيتواصل معك فريقنا خلال 24 ساعة."
                    : "Our team will contact you within 24 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <p className="text-[#002868] dark:text-white text-xl font-bold mb-6">
                  {locale === "ar" ? "أرسل استفسارك" : "Send Your Inquiry"}
                </p>

                <div>
                  <label htmlFor="lead-name" className="block text-sm font-bold text-[#1a1b21] dark:text-gray-200 mb-2">
                    {locale === "ar" ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    placeholder={locale === "ar" ? "أدخل اسمك" : "Enter your name"}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#F4F7FA] dark:bg-gray-800 dark:text-white border-none rounded-xl p-4 text-[#1a1b21] focus:outline-none focus:ring-2 focus:ring-[#002868] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-bold text-[#1a1b21] dark:text-gray-200 mb-2">
                    {locale === "ar" ? "رقم الجوال *" : "Phone Number *"}
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#F4F7FA] dark:bg-gray-800 dark:text-white border-none rounded-xl p-4 text-[#1a1b21] focus:outline-none focus:ring-2 focus:ring-[#002868] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="lead-service" className="block text-sm font-bold text-[#1a1b21] dark:text-gray-200 mb-2">
                    {locale === "ar" ? "نوع الخدمة" : "Service Type"}
                  </label>
                  <select
                    id="lead-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#F4F7FA] dark:bg-gray-800 dark:text-white border-none rounded-xl p-4 text-[#1a1b21] focus:outline-none focus:ring-2 focus:ring-[#002868] transition-all"
                  >
                    <option value="">
                      {locale === "ar" ? "اختر الخدمة" : "Select service"}
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="lead-message" className="block text-sm font-bold text-[#1a1b21] dark:text-gray-200 mb-2">
                    {locale === "ar" ? "وصف المشروع" : "Project Description"}
                  </label>
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={3}
                    placeholder={locale === "ar" ? "اكتب وصفاً مختصراً لمشروعك..." : "Brief description of your project..."}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#F4F7FA] dark:bg-gray-800 dark:text-white border-none rounded-xl p-4 text-[#1a1b21] focus:outline-none focus:ring-2 focus:ring-[#002868] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#002868] text-white py-4 rounded-xl font-bold text-base hover:bg-[#0a3d91] transition-all duration-300 disabled:opacity-70"
                  aria-busy={status === "sending"}
                >
                  {status === "sending"
                    ? (locale === "ar" ? "جارٍ الإرسال..." : "Sending...")
                    : (locale === "ar" ? "إرسال الطلب" : "Send Request")}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

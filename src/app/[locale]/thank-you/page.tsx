import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "شكراً — تم استلام طلبك | مؤسسة الفهد للمقاولات",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div className="pt-20 min-h-screen bg-[#FAF9F5] flex items-center justify-center">
      <div className="container-brand max-w-2xl text-center py-20">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-green-600" style={{ fontSize: "40px" }}>
            check_circle
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002868] mb-4">
          {isAr ? "شكراً — تم استلام طلبك" : "Thank You — Request Received"}
        </h1>
        <p className="text-[#434652] text-lg leading-relaxed mb-2">
          {isAr
            ? "سيتواصل معك فريقنا الهندسي خلال 24 ساعة من ساعات العمل."
            : "Our engineering team will contact you within 24 business hours."}
        </p>
        <p className="text-[#747783] text-sm mb-10">
          {isAr ? "الأحد – الخميس | 8 صباحاً – 5 مساءً" : "Sun–Thu | 8AM – 5PM"}
        </p>
        <a
          href="https://wa.me/966114459222"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-sm hover:brightness-110 transition-all mb-10"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {isAr ? "تواصل عبر واتساب للرد الفوري" : "Chat on WhatsApp for Faster Response"}
        </a>
        <div>
          <p className="text-sm text-[#747783] mb-4">
            {isAr ? "استعرض خدماتنا أثناء الانتظار" : "Explore our services while you wait"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              {
                href: `/${locale}/services/aluminum-works`,
                label: isAr ? "أعمال الألمنيوم" : "Aluminium Works",
              },
              {
                href: `/${locale}/services/glass-works`,
                label: isAr ? "أعمال الزجاج" : "Glass Works",
              },
              {
                href: `/${locale}/services/steel-works`,
                label: isAr ? "أعمال الحديد" : "Steel Works",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 border border-[#002868] text-[#002868] rounded-lg text-sm font-bold hover:bg-[#002868] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

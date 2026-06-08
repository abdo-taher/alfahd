"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import {
  Briefcase,
  Clock,
  FileCheck,
  ChevronRight,
  Inbox,
  Workflow,
} from "lucide-react";

interface Inquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  scope: string;
  blueprintsName?: string;
  blueprintsSize?: string;
  date: string;
  status: "Received" | "In Review" | "Technical Review" | "Proposal Issued";
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "RFQ-874291",
    fullName: "Eng. Khalid Al-Mutairi",
    companyName: "Baha Commercial Hub Ltd",
    email: "khalid@bahahub.com",
    phone: "+966 54 821 3491",
    projectType: "Curtain Walls",
    scope:
      "High-performance curtain wall system for a 12-story commercial tower including thermal break profiles and premium low-iron insulating glass units.",
    blueprintsName: "Baha_Tower_Elevation_A.pdf",
    blueprintsSize: "14.2 MB",
    date: "10 May 2026",
    status: "Proposal Issued",
  },
  {
    id: "RFQ-392104",
    fullName: "Sarah Jenkins",
    companyName: "Atelier Architecture Riyadh",
    email: "s.jenkins@atelier-sa.com",
    phone: "+966 50 119 2831",
    projectType: "Structural Glass",
    scope:
      "Minimalist spider-glass canopy and frameless glass lobby partition designs with heavy wind resistance specifications.",
    blueprintsName: "LobbyGlassSection_rev3.dwg",
    blueprintsSize: "5.8 MB",
    date: "02 May 2026",
    status: "Technical Review",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Proposal Issued":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Technical Review":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "In Review":
      return "bg-amber-50 text-amber-700 border-amber-100";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getStatusStep(status: string) {
  switch (status) {
    case "Proposal Issued":
      return 4;
    case "Technical Review":
      return 3;
    case "In Review":
      return 2;
    default:
      return 1;
  }
}

export default function PortalPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("alfahd_inquiries");
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
        return;
      } catch {
        // fall through to defaults
      }
    }
    localStorage.setItem("alfahd_inquiries", JSON.stringify(DEFAULT_INQUIRIES));
    setInquiries(DEFAULT_INQUIRIES);
  }, []);

  const milestones = [
    {
      num: 1,
      title: isAr ? "تسجيل الاستفسار" : "Inquiry Logged",
      desc: isAr
        ? "استُلم الإرسال الآمن من خوادم الرياض."
        : "Secure transmission received by Riyadh server nodes.",
    },
    {
      num: 2,
      title: isAr ? "التحليل الهندسي" : "Engineering Analysis",
      desc: isAr
        ? "يقوم المهندسون الإنشائيون بتحليل المخططات وحسابات الرياح."
        : "Structural engineers analyzing blueprints and static wind calculations.",
    },
    {
      num: 3,
      title: isAr ? "المراجعة التقنية" : "Technical Review",
      desc: isAr
        ? "تحديد طبقات التلدين وقطاعات الحواجز الحرارية."
        : "Determining exact lamination layers, thermal break profiles and extrusions.",
    },
    {
      num: 4,
      title: isAr ? "إرسال المقترح" : "Proposal Dispatched",
      desc: isAr
        ? "تم إرسال حزمة عرض الأسعار التجاري وتفاصيل المشروع."
        : "Commercial quotation pack and project breakdown sent.",
    },
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#FAF9F5" }}>
      {/* Page header */}
      <section className="bg-gray-950 py-16 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10">
          <span
            className="block mb-3 font-bold uppercase tracking-widest"
            style={{
              color: "#C5A880",
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              letterSpacing: "0.1em",
            }}
          >
            {isAr ? "بوابة العملاء" : "Client Portal"}
          </span>
          <h1
            className="font-sans font-extrabold text-white uppercase"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1 }}
          >
            {isAr ? "متابعة طلبات العروض" : "RFQ Tracking Dashboard"}
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
            {isAr
              ? "تتبع طلبات عروض الأسعار وراقب مراحل الهندسة لمشاريعك."
              : "Track your RFQ proposals and monitor engineering milestones in real time."}
          </p>
        </div>
      </section>

      <div className="container-brand py-12 space-y-8">

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: isAr ? "إجمالي المقترحات المقدمة" : "Total Proposals Filed",
              value: inquiries.length,
              icon: Briefcase,
              iconBg: "bg-gray-50 text-gray-500",
            },
            {
              label: isAr ? "في مرحلة دراسة الجدوى" : "In Feasibility Analysis",
              value: inquiries.filter((i) => i.status !== "Proposal Issued").length,
              icon: Clock,
              iconBg: "bg-amber-50 text-amber-600",
            },
            {
              label: isAr ? "معتمد / تم الإرسال" : "Approved / Dispatched",
              value: inquiries.filter((i) => i.status === "Proposal Issued").length,
              icon: FileCheck,
              iconBg: "bg-emerald-50 text-emerald-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-lg p-5 flex items-center justify-between shadow-sm"
            >
              <div>
                <p
                  className="text-gray-400 font-bold uppercase tracking-wider mb-1"
                  style={{
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                >
                  {stat.label}
                </p>
                <p className="text-2xl font-bold font-sans text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 ${stat.iconBg} rounded-lg border border-gray-100`}>
                <stat.icon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* RFQ list — 7 cols */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-lg shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2
                className="font-sans font-bold text-sm text-gray-950 uppercase tracking-wider flex items-center gap-2"
              >
                <Workflow className="w-4 h-4 text-[#C5A880]" aria-hidden="true" />
                {isAr ? "طلبات عروض الأسعار النشطة" : "Active Engineering RFQ Log"}
              </h2>
              <span
                className="bg-gray-50 text-gray-500 px-2 py-1 rounded"
                style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {isAr ? "قناة آمنة" : "Secure Channel"}
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-gray-400 space-y-2">
                  <Inbox className="w-8 h-8 mx-auto text-[#C5A880]" aria-hidden="true" />
                  <p className="font-sans text-xs">
                    {isAr
                      ? "لا توجد مقترحات تقنية نشطة."
                      : "No active technical proposals found on this system."}
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => {
                  const isActive = selected?.id === inq.id;
                  return (
                    <button
                      key={inq.id}
                      onClick={() => setSelected(isActive ? null : inq)}
                      className={[
                        "w-full text-start p-4 rounded-lg border transition-all duration-200 flex justify-between items-center group",
                        isActive
                          ? "border-gray-900 bg-gray-50/50 shadow-sm"
                          : "border-gray-100 bg-white hover:border-gray-300",
                      ].join(" ")}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-bold text-gray-400 group-hover:text-amber-800 transition-colors"
                            style={{
                              fontSize: "10px",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {inq.id}
                          </span>
                          <span
                            className="text-[#C5A880]"
                            style={{
                              fontSize: "9px",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            • {inq.date}
                          </span>
                        </div>
                        <p className="font-sans font-bold text-xs text-gray-950 group-hover:text-amber-900 transition-colors truncate">
                          {inq.companyName}
                        </p>
                        <p className="font-sans text-[11px] text-gray-500">
                          {isAr ? "النظام المقترح:" : "System Type:"}{" "}
                          <strong className="text-gray-700">{inq.projectType}</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(inq.status)}`}
                        >
                          {inq.status}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors ${isAr ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Detail panel — 5 cols */}
          <div className="lg:col-span-5">
            {selected ? (
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span
                      className="text-[#C5A880] uppercase tracking-wider block"
                      style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {isAr ? "جارٍ الفحص" : "Currently Inspecting"}
                    </span>
                    <span
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}
                    >
                      {selected.id}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-2.5 py-1 text-[10px] text-gray-400 bg-gray-50 hover:bg-gray-100 rounded transition-colors font-sans"
                  >
                    {isAr ? "مسح" : "Clear Focus"}
                  </button>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <span
                      className="text-gray-400 uppercase tracking-wide block mb-0.5"
                      style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {isAr ? "المسؤول" : "Developer Lead"}
                    </span>
                    <p className="font-bold text-gray-900">{selected.fullName}</p>
                    <p className="text-[11px] text-gray-500">{selected.companyName}</p>
                  </div>

                  <div>
                    <span
                      className="text-gray-400 uppercase tracking-wide block mb-0.5"
                      style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {isAr ? "التواصل" : "Contact"}
                    </span>
                    <span
                      className="text-gray-700"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
                    >
                      {selected.email} • {selected.phone}
                    </span>
                  </div>

                  {selected.blueprintsName && (
                    <div>
                      <span
                        className="text-gray-400 uppercase tracking-wide block mb-0.5"
                        style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {isAr ? "حزمة المخططات" : "Blueprints Package"}
                      </span>
                      <span
                        className="inline-block text-emerald-800 bg-emerald-50 px-2 py-1 rounded mt-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
                      >
                        {selected.blueprintsName} ({selected.blueprintsSize})
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <span
                      className="text-gray-400 uppercase tracking-wide block mb-1"
                      style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {isAr ? "المواصفات التفصيلية" : "Detailed Log Specifications"}
                    </span>
                    <p
                      className="text-gray-700 bg-gray-50 p-3 rounded leading-relaxed overflow-y-auto max-h-24"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
                    >
                      {selected.scope}
                    </p>
                  </div>
                </div>

                {/* Milestone stepper */}
                <div className="border-t border-gray-100 pt-4 space-y-4">
                  <span
                    className="text-gray-400 uppercase tracking-wide block"
                    style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {isAr ? "تتبع مراحل المشروع" : "Milestone Tracking Status"}
                  </span>

                  <div className="relative space-y-4">
                    <div
                      className="absolute top-2 bottom-2 w-0.5 bg-gray-100"
                      style={{ [isAr ? "right" : "left"]: "14px" }}
                      aria-hidden="true"
                    />
                    {milestones.map((m) => {
                      const done = getStatusStep(selected.status) >= m.num;
                      return (
                        <div key={m.num} className="flex gap-3 relative z-10 text-xs">
                          <div
                            className={[
                              "w-7 h-7 rounded-full flex items-center justify-center font-bold border text-[11px] shrink-0",
                              done
                                ? "bg-amber-600 text-white border-amber-600"
                                : "bg-white text-gray-300 border-gray-200",
                            ].join(" ")}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {m.num}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-sans font-bold ${done ? "text-gray-900" : "text-gray-400"}`}
                            >
                              {m.title}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                              {m.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-gray-400 space-y-3 h-full flex flex-col items-center justify-center"
                style={{ background: "#FAF9F5", minHeight: "300px" }}
              >
                <Workflow className="w-10 h-10 text-[#C5A880]" aria-hidden="true" />
                <h3 className="font-sans font-bold text-xs text-gray-700 uppercase tracking-widest">
                  {isAr ? "نافذة التتبع" : "Tracking Terminal"}
                </h3>
                <p className="font-sans text-[11px] text-gray-500 max-w-xs leading-relaxed">
                  {isAr
                    ? "اختر أي استفسار تقني نشط في السجل لعرض مراحل الهندسة التفصيلية."
                    : "Select any active technical inquiry on the left log rail to view detailed structural milestones and team status reports."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { Activity, DraftingCompass, ArrowRight } from "lucide-react";

interface PreloaderProps {
  locale: string;
  onComplete: () => void;
}

const STEPS_AR = [
  { text: "بدء تشغيل محرك الحسابات الإنشائية المطابقة...", duration: 500 },
  { text: "معايرة قيم زوايا بثق الألومنيوم للتشغيل الرقمي CNC...", duration: 700 },
  { text: "فحص مجهد متزامن لمستويات العزل الحراري...", duration: 600 },
  { text: "حساب مقاومة الانحناء تحت ضغط الرياح القصوى...", duration: 800 },
  { text: "التحقق من إحكام الزجاج المزدوج قياس (ASTM-E1300)...", duration: 700 },
  { text: "تهيئة نهائية لبوابة الفهد المتكاملة للواجهات...", duration: 500 },
];

const STEPS_EN = [
  { text: "BOOTING STRUCTURAL ALIGNED MATH ENGINE...", duration: 500 },
  { text: "CALIBRATING CNC EXTRUSION CORNER JOINT VALUES...", duration: 700 },
  { text: "SIMULTANEOUS THERMAL ISOLATION STRESS AUDIT...", duration: 600 },
  { text: "CALCULATING WIND-PRESSURE DEFLECTION TOLERANCE...", duration: 800 },
  { text: "VERIFYING DOUBLE-GLAZED GLASS SEALS (ASTM-E1300)...", duration: 700 },
  { text: "FINALIZING AL-FAHD INTEGRATED FACADE PORTAL...", duration: 500 },
];

const NODES = [
  { cx: 100, cy: 20 },
  { cx: 40, cy: 70 },
  { cx: 40, cy: 150 },
  { cx: 100, cy: 180 },
  { cx: 160, cy: 150 },
  { cx: 160, cy: 70 },
  { cx: 100, cy: 70 },
  { cx: 100, cy: 150 },
];

export function Preloader({ locale, onComplete }: PreloaderProps) {
  const isAr = locale === "ar";
  const steps = isAr ? STEPS_AR : STEPS_EN;

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [metricStress, setMetricStress] = useState(0.42);
  const [metricDeflection, setMetricDeflection] = useState(0.08);
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setExiting(true);
    // Let the exit animation play before unmounting
    setTimeout(onComplete, 700);
  }, [onComplete]);

  // Animate progress & steps
  useEffect(() => {
    let active = true;

    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (!active) break;
        setCurrentStep(i);

        const pulseInterval = setInterval(() => {
          setMetricStress((p) =>
            parseFloat(
              Math.max(0.35, Math.min(0.55, p + (Math.random() - 0.5) * 0.05)).toFixed(3)
            )
          );
          setMetricDeflection((p) =>
            parseFloat(
              Math.max(0.02, Math.min(0.18, p + (Math.random() - 0.5) * 0.02)).toFixed(3)
            )
          );
        }, 120);

        await new Promise<void>((resolve) =>
          setTimeout(resolve, steps[i].duration)
        );
        clearInterval(pulseInterval);

        setProgress(Math.floor(((i + 1) / steps.length) * 100));
      }

      if (active) {
        setProgress(100);
        setTimeout(() => {
          if (active) handleComplete();
        }, 600);
      }
    };

    runSteps();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pathLength = 500;
  const innerPathLength = 700;
  const drawn = progress / 100;

  return (
    <div
      className="preloader-root"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(-30px)" : "translateY(0)",
        filter: exiting ? "blur(10px)" : "blur(0)",
        transition: exiting
          ? "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1)"
          : "none",
      }}
    >
      {/* ── Blueprint dot grid ── */}
      <div className="preloader-dotgrid" />

      {/* ── Blueprint line grid (SVG) ── */}
      <svg className="preloader-linegrid" aria-hidden="true">
        <defs>
          <pattern id="pl-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#c5a880" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pl-grid)" />
      </svg>

      {/* ── Top status bar ── */}
      <div className="preloader-topbar" aria-hidden="true">
        <div className="preloader-topbar-left">
          <span className="preloader-ping" />
          <span>PORTAL_ACTIVE: FEED_001_A</span>
        </div>
        <div className="preloader-topbar-center">
          <span>COORDINATES: Riyadh, KSA (24.7136 / 46.6753)</span>
          <span>ASTM FRAMEWORK: DFR-2026/V2</span>
        </div>
        <div>
          <span>FACADE TOLERANCE LEVEL: ±0.01MM</span>
        </div>
      </div>

      {/* ── Bottom status bar ── */}
      <div className="preloader-bottombar" aria-hidden="true">
        <div className="preloader-bottombar-left">
          <span>[SYSTEM_OK: STABLE]</span>
          <span>[TENSION: ACTIVE]</span>
        </div>
        <div>
          <span>AL-FAHD STRUCTURAL EXTRUSIONS LTD.</span>
        </div>
      </div>

      {/* ── Main center content ── */}
      <div className="preloader-center">

        {/* Engineering drawing area */}
        <div className="preloader-drawing-area" aria-hidden="true">

          {/* Scan line */}
          <div className="preloader-scanline" />

          {/* Rotating rings */}
          <div className="preloader-ring-outer" />
          <div className="preloader-ring-inner" />

          {/* Architectural SVG */}
          <svg className="preloader-svg" viewBox="0 0 200 200" fill="none" stroke="#C5A880" aria-hidden="true">
            <path
              d="M 100 20 L 40 70 L 40 150 L 100 180 L 160 150 L 160 70 Z"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength - drawn * pathLength}
              style={{ transition: "stroke-dashoffset 0.3s linear" }}
            />
            <path
              d="M 100 20 L 100 180 M 40 70 L 160 70 M 40 150 L 160 150 M 40 70 L 100 180 L 160 70 M 40 150 L 100 20 L 160 150"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              strokeDasharray={innerPathLength}
              strokeDashoffset={innerPathLength - drawn * innerPathLength}
              style={{ transition: "stroke-dashoffset 0.3s linear" }}
            />
            {NODES.map((node, idx) => (
              <circle
                key={idx}
                cx={node.cx}
                cy={node.cy}
                r={progress > idx * 12 ? 3.5 : 0}
                fill="#C5A880"
                style={{ transition: "r 0.3s ease" }}
              />
            ))}
          </svg>

          {/* Corner labels */}
          <div className="preloader-corner-tl">FACADE: FM-90</div>
          <div className="preloader-corner-br">STRUCT-MESH: RENDERED</div>
        </div>

        {/* Brand text */}
        <div className="preloader-brand" aria-label="Al-Fahad Contracting">
          <span className="preloader-brand-eyebrow">
            HIGH-PERFORMANCE FACADE ENGINEERING
          </span>
          <h1 className="preloader-brand-title">
            <span>AL-FAHD</span>
            <span className="preloader-brand-title-gold">&nbsp;CONTRACTING</span>
          </h1>
          <span className="preloader-brand-arabic" dir="rtl">
            الفهد للمقاولات المتخصصة
          </span>
        </div>

        {/* Live metric gauges */}
        <div className="preloader-gauges" aria-live="polite" aria-label="Engineering metrics">
          <div className="preloader-gauge preloader-gauge-left">
            <span className="preloader-gauge-label">
              <Activity className="preloader-gauge-icon" aria-hidden="true" />
              Glass Tension
            </span>
            <div className="preloader-gauge-value-row">
              <span className="preloader-gauge-value">{metricStress}</span>
              <span className="preloader-gauge-unit">GPa/m²</span>
            </div>
            <span className="preloader-gauge-pass preloader-gauge-pass-green">
              ✔ WITHIN RANGE (ASTM)
            </span>
          </div>

          <div className="preloader-gauge preloader-gauge-right">
            <span className="preloader-gauge-label">
              <DraftingCompass className="preloader-gauge-icon" aria-hidden="true" />
              Max Deflection Ratio
            </span>
            <div className="preloader-gauge-value-row">
              <span className="preloader-gauge-value">
                L/{175 + Math.floor(metricDeflection * 100)}
              </span>
              <span className="preloader-gauge-unit">{metricDeflection} mm</span>
            </div>
            <span className="preloader-gauge-pass preloader-gauge-pass-gold">
              ✔ CERTIFIED PASS
            </span>
          </div>
        </div>

        {/* Progress log */}
        <div className="preloader-progress-wrap">
          <div className="preloader-progress-labels">
            <span
              className="preloader-step-text"
              dir={isAr ? "rtl" : "ltr"}
              aria-live="polite"
            >
              {steps[currentStep].text}
            </span>
            <span className="preloader-progress-pct">{progress}%</span>
          </div>
          {/* Progress bar */}
          <div className="preloader-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="preloader-bar-fill"
              style={{ width: `${progress}%`, transition: "width 0.3s ease-out" }}
            >
              <div className="preloader-bar-bead" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleComplete}
          className="preloader-skip"
          aria-label={isAr ? "تخطي مرحلة القياس" : "Skip calibration"}
        >
          <span>{isAr ? "تخطي مرحلة القياس" : "SKIP CALIBRATION"}</span>
          <ArrowRight className="preloader-skip-icon" aria-hidden="true" />
        </button>
      </div>

      <style>{`
        /* ─── Preloader Shell ─────────────────────────────────────────── */
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background: rgba(12, 10, 9, 0.70);
          color: #e7e5e4;
          overflow: hidden;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }

        /* ─── Dot grid overlay ────────────────────────────────────────── */
        .preloader-dotgrid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          background-image: radial-gradient(#c5a880 1px, transparent 1px);
          background-size: 24px 24px;
          -webkit-mask-image: radial-gradient(ellipse at center, black, transparent 80%);
          mask-image: radial-gradient(ellipse at center, black, transparent 80%);
        }

        /* ─── Line grid ───────────────────────────────────────────────── */
        .preloader-linegrid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.10;
        }

        /* ─── Status bars ─────────────────────────────────────────────── */
        .preloader-topbar,
        .preloader-bottombar {
          position: absolute;
          left: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          color: #78716c;
          letter-spacing: 0.08em;
          user-select: none;
        }
        .preloader-topbar { top: 24px; }
        .preloader-bottombar { bottom: 24px; }
        .preloader-topbar-left { display: flex; align-items: center; gap: 8px; }
        .preloader-topbar-center { display: none; gap: 24px; }
        @media (min-width: 768px) { .preloader-topbar-center { display: flex; } }
        .preloader-bottombar-left { display: flex; gap: 16px; }

        /* Pulsing dot */
        .preloader-ping {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C5A880;
          animation: pl-ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes pl-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        /* ─── Center content ──────────────────────────────────────────── */
        .preloader-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          max-width: 672px;
          margin: 0 auto;
          width: 100%;
          position: relative;
        }

        /* ─── Drawing area ────────────────────────────────────────────── */
        .preloader-drawing-area {
          position: relative;
          width: 288px;
          height: 288px;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Scan line */
        .preloader-scanline {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, #C5A880, transparent);
          z-index: 10;
          animation: pl-scan 4s ease-in-out infinite;
        }
        @keyframes pl-scan {
          0%   { top: 15%; }
          50%  { top: 85%; }
          100% { top: 15%; }
        }

        /* Rotating rings */
        .preloader-ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(41,37,36,0.6);
          animation: pl-spin-slow 40s linear infinite;
        }
        .preloader-ring-inner {
          position: absolute;
          inset: 15px;
          border-radius: 50%;
          border: 1px solid rgba(41,37,36,0.3);
          animation: pl-spin-rev 15s linear infinite reverse;
        }
        @keyframes pl-spin-slow { to { transform: rotate(360deg); } }
        @keyframes pl-spin-rev  { to { transform: rotate(360deg); } }

        /* SVG */
        .preloader-svg {
          position: relative;
          z-index: 20;
          width: 192px;
          height: 192px;
        }

        /* Corner labels */
        .preloader-corner-tl,
        .preloader-corner-br {
          position: absolute;
          font-size: 8px;
          background: #0c0a09;
          padding: 0 4px;
          user-select: none;
        }
        .preloader-corner-tl { top: 8px; left: 8px; color: #57534e; }
        .preloader-corner-br { bottom: 8px; right: 8px; color: rgba(197,168,128,0.7); }

        /* ─── Brand block ─────────────────────────────────────────────── */
        .preloader-brand {
          text-align: center;
          width: 100%;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: pl-fade-up 0.5s ease 0.1s both;
        }
        @keyframes pl-fade-up {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .preloader-brand-eyebrow {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          color: #C5A880;
          font-weight: 500;
        }
        .preloader-brand-title {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-size: clamp(22px, 5vw, 30px);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #ffffff;
          display: flex;
          align-items: center;
          margin: 0;
        }
        .preloader-brand-title-gold {
          color: #C5A880;
          font-weight: 300;
        }
        .preloader-brand-arabic {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-size: 14px;
          color: #a8a29e;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        /* ─── Gauges ──────────────────────────────────────────────────── */
        .preloader-gauges {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          max-width: 384px;
          margin-top: 32px;
          padding: 12px;
          background: rgba(28,25,23,0.4);
          border: 1px solid rgba(41,37,36,0.8);
          border-radius: 6px;
          user-select: none;
          font-size: 10px;
          color: #a8a29e;
        }
        .preloader-gauge { display: flex; flex-direction: column; gap: 4px; }
        .preloader-gauge-left  { border-right: 1px solid rgba(41,37,36,0.5); padding-right: 16px; }
        .preloader-gauge-right { padding-left: 16px; }
        .preloader-gauge-label {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #78716c;
        }
        .preloader-gauge-icon { width: 12px; height: 12px; color: #C5A880; flex-shrink: 0; }
        .preloader-gauge-value-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: 4px;
        }
        .preloader-gauge-value { color: #ffffff; font-size: 18px; font-weight: 600; }
        .preloader-gauge-unit  { color: #78716c; font-size: 9px; }
        .preloader-gauge-pass  { font-size: 9px; }
        .preloader-gauge-pass-green { color: rgba(52,211,153,0.8); }
        .preloader-gauge-pass-gold  { color: #C5A880; }

        /* ─── Progress log ────────────────────────────────────────────── */
        .preloader-progress-wrap {
          width: 100%;
          max-width: 448px;
          margin-top: 32px;
          user-select: none;
        }
        .preloader-progress-labels {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: #78716c;
          margin-bottom: 6px;
        }
        .preloader-step-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 80%;
        }
        .preloader-progress-pct {
          color: #C5A880;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }
        .preloader-bar-track {
          height: 2px;
          width: 100%;
          background: #1c1917;
          border-radius: 9999px;
          overflow: visible;
          border: 1px solid #1c1917;
          position: relative;
        }
        .preloader-bar-fill {
          height: 100%;
          background: linear-gradient(to right, rgba(197,168,128,0.5), #C5A880);
          border-radius: 9999px;
          position: relative;
        }
        .preloader-bar-bead {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 10px #C5A880;
          animation: pl-bead-pulse 1.5s ease-in-out infinite;
        }
        @keyframes pl-bead-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }

        /* ─── Skip button ─────────────────────────────────────────────── */
        .preloader-skip {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: #1c1917;
          border: 1px solid #292524;
          border-radius: 4px;
          font-size: 10px;
          color: rgba(197,168,128,0.8);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          letter-spacing: 0.04em;
        }
        .preloader-skip:hover { background: #292524; color: #ffffff; }
        .preloader-skip-icon  { width: 12px; height: 12px; flex-shrink: 0; }
        [dir="rtl"] .preloader-skip-icon { transform: scaleX(-1); }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ShieldCheck, Cpu, DraftingCompass, Activity, ArrowRight, Play } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  lang: 'en' | 'ar';
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, lang }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [metricStress, setMetricStress] = useState(0.42);
  const [metricDeflection, setMetricDeflection] = useState(0.08);

  const isRtl = lang === 'ar';

  const steps = [
    {
      en: 'BOOTING STRUCTURAL ALIGNED MATH ENGINE...',
      ar: 'بدء تشغيل محرك الحسابات الإنشائية المطابقة...',
      duration: 500,
    },
    {
      en: 'CALIBRATING CNC EXTRUSION CORNER JOINT VALUES...',
      ar: 'معايرة قيم زوايا بثق الألومنيوم للتشغيل الرقمي CNC...',
      duration: 700,
    },
    {
      en: 'SIMULTANEOUS THERMAL ISOLATION STRESS AUDIT...',
      ar: 'فحص مجهد متزامن لمستويات العزل الحراري...',
      duration: 600,
    },
    {
      en: 'CALCULATING WIND-PRESSURE DEFLECTION TOLERANCE...',
      ar: 'حساب مقاومة الانحناء تحت ضغط الرياح القصوى...',
      duration: 800,
    },
    {
      en: 'VERIFYING DOUBLE-GLAZED GLASS SEALS (ASTM-E1300)...',
      ar: 'التحقق من إحكام الزجاج المزدوج قياس (ASTM-E1300)...',
      duration: 700,
    },
    {
      en: 'FINALIZING AL-FAHD INTEGRATED FACADE PORTAL...',
      ar: 'تهيئة نهائية لبوابة الفهد المتكاملة للواجهات...',
      duration: 500,
    }
  ];

  // Animate progress bar & steps
  useEffect(() => {
    let active = true;
    let stepIndex = 0;
    
    const runSteps = async () => {
      for (const step of steps) {
        if (!active) break;
        setCurrentStep(stepIndex);
        
        // Randomly simulate physical micro-fluctuations in metrics during calculation
        const pulseInterval = setInterval(() => {
          setMetricStress(prev => +(Math.max(0.35, Math.min(0.55, prev + (Math.random() - 0.5) * 0.05))).toFixed(3));
          setMetricDeflection(prev => +(Math.max(0.02, Math.min(0.18, prev + (Math.random() - 0.5) * 0.02))).toFixed(3));
        }, 100);

        await new Promise((resolve) => setTimeout(resolve, step.duration));
        clearInterval(pulseInterval);
        
        stepIndex++;
        // Keep progress slider synced with step progression
        setProgress(Math.floor((stepIndex / steps.length) * 100));
      }

      if (active) {
        setProgress(100);
        // Give a satisfying pause at 100% for completed engineering checks
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    runSteps();

    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col bg-[#0c0a09] text-stone-200 overflow-hidden font-mono"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
      }}
      id="alfahd_premium_preloader"
    >
      {/* Blueprint Grid Overlay Background Structure */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px]"
        style={{ maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)' }}
      />
      
      {/* Subtly moving blueprint lines to give depth */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <pattern id="grid-large" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#c5a880" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-large)" />
      </svg>

      {/* Decorative Technical Borders & Engineering Logs */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] text-stone-500 tracking-wider select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-ping" />
          <span>PORTAL_ACTIVE: FEED_001_A</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>COORDINATES: Riyadh, KSA (24.7136 / 46.6753)</span>
          <span>ASTM FRAMEWORK: DFR-2026/V2</span>
        </div>
        <div>
          <span>FACADE TOLERANCE LEVEL: ±0.01MM</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-stone-500 tracking-wider select-none">
        <div className="flex gap-4">
          <span>[SYSTEM_OK: STABLE]</span>
          <span>[TENSION: ACTIVE]</span>
        </div>
        <div className="text-right">
          <span>AL-FAHD STRUCTURAL EXTRUSIONS LTD.</span>
        </div>
      </div>

      {/* Main Center Content Container */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 relative max-w-2xl mx-auto w-full">
        
        {/* Engineering ISO blueprint drawing area */}
        <div className="relative w-72 h-72 mb-10 flex items-center justify-center">
          
          {/* Scanning alignment laser line */}
          <motion.div 
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent z-10"
            animate={{
              top: ['15%', '85%', '15%']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Compass layout rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-stone-800/60 animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-[15px] rounded-full border border-stone-800/30 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-stone-900 border-dashed" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-stone-900 border-dashed" />

          {/* Majestic Interactive Architectural Silhouette Model */}
          <svg className="w-48 h-48 relative text-[#C5A880]/80 z-20" viewBox="0 0 200 200" fill="none" stroke="currentColor">
            {/* Dynamic Glass Facade Triangle Net / Geometric Truss Truss */}
            <motion.path 
              d="M 100 20 L 40 70 L 40 150 L 100 180 L 160 150 L 160 70 Z" 
              strokeWidth="1.5"
              strokeDasharray="500"
              strokeDashoffset={500 - (progress / 100) * 500}
              transition={{ ease: "linear" }}
              strokeLinejoin="round" 
            />
            {/* Inner spider joints / structural mullions */}
            <motion.path 
              d="M 100 20 L 100 180 M 40 70 L 160 70 M 40 150 L 160 150 M 40 70 L 100 180 L 160 70 M 40 150 L 100 20 L 160 150" 
              strokeWidth="0.8"
              strokeDasharray="700"
              strokeDashoffset={700 - (progress / 100) * 700}
              transition={{ ease: "linear" }}
              className="opacity-40"
            />
            {/* Focal load Nodes (Pins) representing elite connection spider fittings */}
            <motion.g initial="hidden" animate="visible" variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}>
              {[
                { cx: 100, cy: 20 }, { cx: 40, cy: 70 }, { cx: 40, cy: 150 },
                { cx: 100, cy: 180 }, { cx: 160, cy: 150 }, { cx: 160, cy: 70 },
                { cx: 100, cy: 70 }, { cx: 100, cy: 150 }
              ].map((node, idx) => (
                <circle 
                  key={idx}
                  cx={node.cx} 
                  cy={node.cy} 
                  r={progress > (idx * 12) ? "3.5" : "0"} 
                  fill="#c5a880"
                  className="transition-all duration-300"
                />
              ))}
            </motion.g>
          </svg>

          {/* Live Data Overlaid Markers */}
          <div className="absolute top-2 left-2 text-[8px] text-stone-600 bg-[#0c0a09] px-1 select-none">
            FACADE: FM-90
          </div>
          <div className="absolute bottom-2 right-2 text-[8px] text-[#C5A880]/70 bg-[#0c0a09] px-1 select-none">
            STRUCT-MESH: RENDERED
          </div>
        </div>

        {/* Brand Text Block in Luxury English & Arabic */}
        <div className="text-center w-full select-none z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#C5A880] font-sans font-medium">
              HIGH-PERFORMANCE FACADE ENGINEERING
            </span>
            <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white flex items-center gap-2">
              <span>AL-FAHD</span>
              <span className="text-[#C5A880] font-light">CONTRACTING</span>
            </h1>
            <span className="text-sm font-sans text-stone-400 font-medium tracking-wide mt-1" dir="rtl">
              الفهد للمقاولات المتخصصة
            </span>
          </motion.div>
        </div>

        {/* Live Simulation Matrix Gauges */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-8 p-3 bg-stone-900/40 border border-stone-800/80 rounded-md select-none text-[10px] text-stone-400">
          <div className="flex flex-col gap-1 border-r border-stone-800/50 pr-4">
            <span className="text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#C5A880]" /> Glass Tension
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-white text-base font-semibold">{metricStress}</span>
              <span className="text-stone-500">GPa/m²</span>
            </div>
            <span className="text-[9px] text-emerald-500/80">✔ WITHIN RANGE (ASTM)</span>
          </div>

          <div className="flex flex-col gap-1 pl-4">
            <span className="text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <DraftingCompass className="w-3 h-3 text-[#C5A880]" /> Max Deflection Ratio
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-white text-base font-semibold">L/{175 + Math.floor(metricDeflection * 100)}</span>
              <span className="text-stone-500">{metricDeflection} mm</span>
            </div>
            <span className="text-[9px] text-[#C5A880]">✔ CERTIFIED PASS</span>
          </div>
        </div>

        {/* Real-time Loader Text Log & Step Slider Progress */}
        <div className="w-full max-w-md mt-8 select-none">
          <div className="flex justify-between items-center text-[10px] text-stone-500 mb-1.5 font-sans">
            <span className="truncate max-w-[80%]" dir={isRtl ? 'rtl' : 'ltr'}>
              {isRtl ? steps[currentStep].ar : steps[currentStep].en}
            </span>
            <span className="text-[#C5A880] font-mono tracking-tighter text-sm font-medium">
              {progress}%
            </span>
          </div>
          
          {/* Architectural dotted progress slider line */}
          <div className="h-[2px] w-full bg-stone-900 rounded-full overflow-hidden relative border border-stone-900">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#C5A880]/50 to-[#C5A880] rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            >
              {/* Pulsing light bead on tip of progress bar */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#C5A880] animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Beautiful high-tech skip button */}
        <button
          onClick={onComplete}
          className="mt-8 flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[10px] text-[#C5A880]/80 hover:text-white rounded transition-colors group cursor-pointer font-sans"
        >
          <span>{isRtl ? 'تخطي مرحلة القياس' : 'SKIP CALIBRATION'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

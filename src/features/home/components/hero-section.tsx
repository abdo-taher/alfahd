"use client";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        autoPlay
        muted
        loop
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Build the future of{" "}
          <span className="text-blue-500">SaaS</span>
        </h1>

        <p className="mt-6 text-white/70 max-w-xl mx-auto">
          A premium platform with speed, scale, and design excellence — inspired by Stripe & Vercel.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-white/20 text-white">
            View Docs
          </button>
        </div>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute -bottom-40 w-[600px] h-[600px] bg-blue-500 blur-[200px] opacity-30 rounded-full" />
    </section>
  );
}
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3 shadow-lg">

          <div className="font-bold text-white tracking-wide">
            SaaS<span className="text-blue-500">X</span>
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-white/70">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-xs px-3 py-1 rounded-lg border border-white/10 text-white/80 hover:text-white"
            >
              {mounted && theme === "dark" ? "Light" : "Dark"}
            </button>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm">
              Sign In
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
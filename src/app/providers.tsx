"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Preloader } from "@/shared/components/layout/preloader";

interface ProvidersProps {
  children: React.ReactNode;
  locale?: string;
  dir?: "rtl" | "ltr";
}

export function Providers({ children, locale, dir }: ProvidersProps) {
  // Apply lang and dir to <html> from the client.
  // suppressHydrationWarning on <html> in root layout handles the mismatch.
  useEffect(() => {
    if (locale) document.documentElement.lang = locale;
    if (dir) document.documentElement.dir = dir;
  }, [locale, dir]);

  // Show the preloader only once per session (skip on repeat navigations).
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("alfahd_preloader_shown");
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("alfahd_preloader_shown", "1");
    setShowPreloader(false);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {showPreloader && (
        <Preloader
          locale={locale ?? "ar"}
          onComplete={handlePreloaderComplete}
        />
      )}
      {children}
    </ThemeProvider>
  );
}

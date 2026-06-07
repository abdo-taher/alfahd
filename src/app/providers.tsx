"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

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

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

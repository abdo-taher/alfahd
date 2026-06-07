"use client";

import { Container } from "@/shared/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="border-b">
      <Container className="flex items-center justify-between py-4">
        <div className="font-bold text-lg">Sakeya Altina</div>

        <nav className="hidden md:flex gap-6">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

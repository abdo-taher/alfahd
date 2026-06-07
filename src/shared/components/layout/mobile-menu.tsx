"use client";

import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}>Menu</button>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-white border p-4">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </div>
  );
}

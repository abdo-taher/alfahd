"use client";

import { useState } from "react";

interface ServiceImageWithFallbackProps {
  src: string | undefined;
  alt: string;
  icon: string; // Material Symbol name for this service
}

export function ServiceImageWithFallback({ src, alt, icon }: ServiceImageWithFallbackProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#f3f3fb]">
        <span
          className="material-symbols-outlined text-[#002868]"
          style={{ fontSize: "80px", fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

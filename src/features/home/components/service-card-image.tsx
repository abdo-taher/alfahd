"use client";

import { useState } from "react";

interface ServiceCardImageProps {
  src: string | undefined;
  alt: string;
  icon: string; // Material Symbol name, e.g. "architecture"
}

export function ServiceCardImage({ src, alt, icon }: ServiceCardImageProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f3f3fb]">
        <span
          className="material-symbols-outlined text-[#002868]"
          style={{ fontSize: "64px", fontVariationSettings: "'FILL' 0, 'wght' 300" }}
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
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
  );
}

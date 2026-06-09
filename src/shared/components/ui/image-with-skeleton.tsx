"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "onLoad"> & {
  /** Extra classes applied to the skeleton shimmer overlay */
  skeletonClassName?: string;
};

/**
 * Wraps Next.js <Image> with an animated shimmer skeleton that:
 * – shows instantly (no layout shift)
 * – fades out once the image finishes loading
 * – falls back to a static placeholder on error
 *
 * Usage: drop-in replacement for <Image> — all props pass through.
 */
export function ImageWithSkeleton({
  className,
  skeletonClassName,
  alt,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {/* Skeleton shimmer — sits behind the image, hidden once loaded */}
      {!loaded && !error && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
            "bg-[length:200%_100%] animate-shimmer",
            skeletonClassName
          )}
        />
      )}

      {/* Actual image */}
      <Image
        {...props}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true); // stop showing shimmer on error too
        }}
      />

      {/* Error fallback — only rendered when image fails to load */}
      {error && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <span className="material-symbols-outlined text-gray-300" style={{ fontSize: "40px" }}>
            image_not_supported
          </span>
        </span>
      )}
    </>
  );
}

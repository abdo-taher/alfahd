import type { Metadata } from "next";
import { generatePageMetadata } from "./page-metadata";

export function generateArticleMetadata({
  title,
  excerpt,
  path,
  locale,
  publishedAt,
  ogImage,
}: {
  title: string;
  excerpt: string;
  path: string;
  locale: string;
  publishedAt?: string;
  ogImage?: string;
}): Metadata {
  const base = generatePageMetadata({
    title,
    description: excerpt,
    path,
    locale,
    ogImage,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: publishedAt,
    },
  };
}

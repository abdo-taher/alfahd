// ─── Locale ───────────────────────────────────────────────────────────────────

export type Locale = "ar" | "en";

export const LOCALES: Locale[] = ["ar", "en"];
export const DEFAULT_LOCALE: Locale = "ar";

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

// ─── Service ──────────────────────────────────────────────────────────────────

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  benefits: string[];
  applications: string[];
  process: ProcessStep[];
  faq: FaqItem[];
};

// ─── Project ──────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  year: number;
  category: string;
  shortDescription: string;
  description: string;
  challenge: string;
  solution: string;
  scope: string[];
  technologies: string[];
  results: string[];
  coverImage: string;
  gallery: string[];
  testimonial?: Testimonial;
  featured: boolean;
};

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  tags: string[];
  readingTime: number;
};

export type BlogCategory =
  | "aluminum"
  | "glass"
  | "steel"
  | "construction"
  | "project-management"
  | "building-regulations"
  | "case-studies";

// ─── Shared ───────────────────────────────────────────────────────────────────

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
};

export type Statistic = {
  value: string;
  label: string;
  suffix?: string;
};

export type Certification = {
  name: string;
  logo: string;
  description: string;
};

// ─── Quote Form ───────────────────────────────────────────────────────────────

export type QuoteFormData = {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  projectLocation: string;
  projectSize: string;
  projectDescription: string;
};

// ─── Contact Form ─────────────────────────────────────────────────────────────

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// ─── Page Meta ────────────────────────────────────────────────────────────────

export type PageMeta = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
};

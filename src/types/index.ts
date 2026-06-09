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

// ─── Sub-Service ──────────────────────────────────────────────────────────────

export type SubService = {
  id: string;
  slug: string;
  parentSlug: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  applications: string[];
  process: ProcessStep[];
  faq: FaqItem[];
  keywords: { ar: string[]; en: string[] };
  relatedProjectCategory: string;
};

// ─── Industry ─────────────────────────────────────────────────────────────────

export type Industry = {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  description: string;
  shortDescription: string;
  stats: { value: string; label: string }[];
  servicesUsed: string[];
  relatedProjectIds: string[];
  certifications: string[];
  faq: FaqItem[];
  keywords: { ar: string[]; en: string[] };
};

// ─── Location ─────────────────────────────────────────────────────────────────

export type Location = {
  id: string;
  slug: string;
  city: string;
  title: string;
  description: string;
  shortDescription: string;
  heroImage: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  projectSlugs: string[];
  whyChooseUs: string[];
  keywords: { ar: string[]; en: string[] };
};

// ─── Cost Guide ───────────────────────────────────────────────────────────────

export type PricingFactor = {
  factor: string;
  description: string;
  impact: "high" | "medium" | "low";
};

export type SystemTier = {
  name: string;
  description: string;
  relativeRange: string;
};

export type CostGuide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  relatedServiceSlug: string;
  pricingFactors: PricingFactor[];
  systemTiers: SystemTier[];
  howToGetBestPrice: string[];
  faq: FaqItem[];
  keywords: { ar: string[]; en: string[] };
};

// ─── Case Study ───────────────────────────────────────────────────────────────

export type CaseStudyResult = {
  metric: string;
  value: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  location: string;
  scope: string;
  coverImage: string;
  gallery: string[];
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial: { quote: string; author: string; role: string } | null;
  technologies: string[];
  relatedServiceSlug: string;
  keywords: { ar: string[]; en: string[] };
};

// ─── FAQ Hub ──────────────────────────────────────────────────────────────────

export type FaqCategory = {
  id: string;
  label: string;
  questions: FaqItem[];
};

export type FaqHub = {
  categories: FaqCategory[];
};

// ─── Team Member ──────────────────────────────────────────────────────────────

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  jobTitle: string;
  jobTitleEn: string;
  yearsExperience: number;
  bio: string;
  specialisations: string[];
  blogSlugs: string[];
  avatar?: string;
};

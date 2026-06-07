import { ContentProvider } from "./content-provider";
import { JsonProvider } from "./json-provider";
import type { Service, Project, BlogPost, Testimonial } from "@/types";

// Singleton provider — swap to CmsProvider or ApiProvider here
const provider: ContentProvider = new JsonProvider();

/**
 * ContentRepository — the ONLY interface the UI uses to access content.
 * Never import JSON directly in UI components.
 */
export const contentRepository = {
  // ── Services ────────────────────────────────────────────────────────────

  async getServices(locale: string): Promise<Service[]> {
    return provider.get<Service[]>("services", locale);
  },

  async getServiceBySlug(slug: string, locale: string): Promise<Service | null> {
    const services = await provider.get<Service[]>("services", locale);
    return services.find((s) => s.slug === slug) ?? null;
  },

  // ── Projects ─────────────────────────────────────────────────────────────

  async getProjects(locale: string): Promise<Project[]> {
    return provider.get<Project[]>("projects", locale);
  },

  async getFeaturedProjects(locale: string): Promise<Project[]> {
    const projects = await provider.get<Project[]>("projects", locale);
    return projects.filter((p) => p.featured);
  },

  async getProjectBySlug(slug: string, locale: string): Promise<Project | null> {
    const projects = await provider.get<Project[]>("projects", locale);
    return projects.find((p) => p.slug === slug) ?? null;
  },

  async getProjectsByCategory(category: string, locale: string): Promise<Project[]> {
    const projects = await provider.get<Project[]>("projects", locale);
    return projects.filter((p) => p.category === category);
  },

  // ── Blog ──────────────────────────────────────────────────────────────────

  async getBlogPosts(locale: string): Promise<BlogPost[]> {
    try {
      return await provider.get<BlogPost[]>("blog", locale);
    } catch {
      return [];
    }
  },

  async getBlogPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts(locale);
    return posts.find((p) => p.slug === slug) ?? null;
  },

  async getBlogPostsByCategory(category: string, locale: string): Promise<BlogPost[]> {
    const posts = await this.getBlogPosts(locale);
    return posts.filter((p) => p.category === category);
  },

  // ── Testimonials ──────────────────────────────────────────────────────────

  async getTestimonials(locale: string): Promise<Testimonial[]> {
    return provider.get<Testimonial[]>("testimonials", locale);
  },
};

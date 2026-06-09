import { ContentProvider } from "./content-provider";
import { JsonProvider } from "./json-provider";
import type {
  Service, Project, BlogPost, Testimonial,
  SubService, Industry, Location, CostGuide, CaseStudy, FaqHub, TeamMember,
} from "@/types";

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

  // ── Sub-Services ──────────────────────────────────────────────────────────────

  async getSubServices(locale: string): Promise<SubService[]> {
    try {
      return await provider.get<SubService[]>("sub-services", locale);
    } catch {
      return [];
    }
  },

  async getSubServiceBySlug(parentSlug: string, subSlug: string, locale: string): Promise<SubService | null> {
    const subServices = await this.getSubServices(locale);
    return subServices.find((s) => s.parentSlug === parentSlug && s.slug === subSlug) ?? null;
  },

  async getSubServicesByParent(parentSlug: string, locale: string): Promise<SubService[]> {
    const subServices = await this.getSubServices(locale);
    return subServices.filter((s) => s.parentSlug === parentSlug);
  },

  // ── Industries ────────────────────────────────────────────────────────────────

  async getIndustries(locale: string): Promise<Industry[]> {
    try {
      return await provider.get<Industry[]>("industries", locale);
    } catch {
      return [];
    }
  },

  async getIndustryBySlug(slug: string, locale: string): Promise<Industry | null> {
    const industries = await this.getIndustries(locale);
    return industries.find((i) => i.slug === slug) ?? null;
  },

  // ── Locations ─────────────────────────────────────────────────────────────────

  async getLocations(locale: string): Promise<Location[]> {
    try {
      return await provider.get<Location[]>("locations", locale);
    } catch {
      return [];
    }
  },

  async getLocationBySlug(slug: string, locale: string): Promise<Location | null> {
    const locations = await this.getLocations(locale);
    return locations.find((l) => l.slug === slug) ?? null;
  },

  // ── Cost Guides ───────────────────────────────────────────────────────────────

  async getCostGuides(locale: string): Promise<CostGuide[]> {
    try {
      return await provider.get<CostGuide[]>("cost-guides", locale);
    } catch {
      return [];
    }
  },

  async getCostGuideBySlug(slug: string, locale: string): Promise<CostGuide | null> {
    const guides = await this.getCostGuides(locale);
    return guides.find((g) => g.slug === slug) ?? null;
  },

  // ── Case Studies ──────────────────────────────────────────────────────────────

  async getCaseStudies(locale: string): Promise<CaseStudy[]> {
    try {
      return await provider.get<CaseStudy[]>("case-studies", locale);
    } catch {
      return [];
    }
  },

  async getCaseStudyBySlug(slug: string, locale: string): Promise<CaseStudy | null> {
    const studies = await this.getCaseStudies(locale);
    return studies.find((c) => c.slug === slug) ?? null;
  },

  // ── FAQ Hub ───────────────────────────────────────────────────────────────────

  async getFaqHub(locale: string): Promise<FaqHub> {
    try {
      return await provider.get<FaqHub>("faq-hub", locale);
    } catch {
      return { categories: [] };
    }
  },

  // ── Team ──────────────────────────────────────────────────────────────────────

  async getTeamMembers(locale: string): Promise<TeamMember[]> {
    try {
      return await provider.get<TeamMember[]>("team", locale);
    } catch {
      return [];
    }
  },

  async getTeamMemberBySlug(slug: string, locale: string): Promise<TeamMember | null> {
    const members = await this.getTeamMembers(locale);
    return members.find((m) => m.slug === slug) ?? null;
  },
};

import { ContentProvider } from "./content-provider";
import { MemoryCache } from "./cache/memory-cache";

const cache = new MemoryCache();

/**
 * JsonContentProvider loads content from two sources:
 *
 * 1. Locale strings (UI copy / i18n):
 *    src/content/locales/{locale}.json
 *    Accessed via dot-separated key, e.g. "home.hero.title"
 *
 * 2. Domain content (services, projects, blog…):
 *    src/content/{locale}/{collection}.json
 *    Accessed via collection name, e.g. "services", "projects"
 *
 * Migration path: swap this for a CMS or Laravel API provider
 * without touching any UI component.
 */
export class JsonProvider implements ContentProvider {
  async get<T>(key: string, locale = "ar"): Promise<T> {
    const cacheKey = `${locale}:${key}`;

    const cached = cache.get<T>(cacheKey);
    if (cached !== null) return cached;

    let value: T;

    // Domain collections: services, projects, testimonials, blog + extended SEO collections
    const COLLECTIONS = [
      "services", "projects", "testimonials", "blog",
      "sub-services", "industries", "locations", "cost-guides",
      "case-studies", "faq-hub", "team",
    ];

    if (COLLECTIONS.includes(key)) {
      const module = await import(
        `../../content/${locale}/${key}.json`
      );
      value = module.default as T;
    } else {
      // Locale strings: dot-separated path into locales/{locale}.json
      const module = await import(
        `../../content/locales/${locale}.json`
      );
      const keys = key.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value = keys.reduce((acc: any, k: string) => acc?.[k], module.default) as T;
    }

    cache.set(cacheKey, value);
    return value;
  }
}

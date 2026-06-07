import { ContentProvider } from "./content-provider";
import { MemoryCache } from "./cache/memory-cache";

const cache = new MemoryCache();

export class JsonProvider implements ContentProvider {
  async get<T>(key: string, locale = "en"): Promise<T> {
    const cacheKey = `${locale}:${key}`;

    const cached = cache.get<T>(cacheKey);
    if (cached) return cached;

    // Locale files are flat per-locale JSON at src/content/locales/{locale}.json
    // Key is a dot-separated path into that object (e.g. "home", "home.title")
    const data = await import(`../../content/locales/${locale}.json`);

    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = keys.reduce((acc: any, k) => acc?.[k], data.default) as T;

    cache.set(cacheKey, value);

    return value;
  }
}

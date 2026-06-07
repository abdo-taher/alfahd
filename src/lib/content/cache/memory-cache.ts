type CacheEntry<T> = {
  value: T;
  expiry: number;
};

export class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, value: T, ttlMs = 5 * 60 * 1000) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttlMs
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  clear() {
    this.cache.clear();
  }
}

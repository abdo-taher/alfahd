import { ContentProvider } from "./content-provider";

export class ContentRepository {
  constructor(private provider: ContentProvider) {}

  async get<T>(key: string, locale?: string): Promise<T> {
    return this.provider.get<T>(key, locale);
  }
}

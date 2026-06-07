export interface ContentProvider {
  get<T>(key: string, locale?: string): Promise<T>;
}

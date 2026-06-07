import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  return {
    locale: locale ?? "en",
    messages: (await import(`../content/locales/${locale ?? "en"}.json`)).default
  };
});
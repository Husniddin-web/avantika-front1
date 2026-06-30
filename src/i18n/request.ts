import {hasLocale} from "next-intl";
import {getRequestConfig} from "next-intl/server";

import {routing, type Locale} from "./routing";

const messageLoaders: Record<Locale, () => Promise<Record<string, unknown>>> = {
  uz: () => import("../../messages/uz.json").then((module) => module.default),
  ru: () => import("../../messages/ru.json").then((module) => module.default),
  en: () => import("../../messages/en.json").then((module) => module.default),
};

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: await messageLoaders[locale](),
  };
});

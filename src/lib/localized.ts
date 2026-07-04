import type {Locale} from "@/i18n/routing";
import type {LocalizedText} from "@/lib/admin/api";

export const emptyLocalizedText: LocalizedText = {uz: "", ru: "", en: ""};

export function createLocalizedText(value = ""): LocalizedText {
  return {uz: value, ru: "", en: ""};
}

export function toLocalizedText(value: LocalizedText | string | undefined): LocalizedText {
  if (!value) return {...emptyLocalizedText};
  if (typeof value === "string") return createLocalizedText(value);
  return {...emptyLocalizedText, ...value};
}

export function localize(value: LocalizedText | string | undefined, locale: Locale | string) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale as keyof LocalizedText] || value.uz || value.ru || value.en || "";
}

import { ref } from "vue";
import zhCN from "./messages/zh-CN";
import en from "./messages/en";

export type MessageKey = keyof typeof zhCN;

export const messages = { "zh-CN": zhCN, en };
export type Locale = keyof typeof messages;

export const locales: { code: Locale; label: string }[] = [
  { code: "zh-CN", label: "简体中文" },
  { code: "en", label: "English" },
];

const storageKey = "sql-mother-locale";

const normalizeLocale = (value: string | null): Locale =>
  locales.find((item) => item.code === value)?.code ?? "zh-CN";

export const readStoredLocale = (): Locale => {
  try {
    return normalizeLocale(window.localStorage.getItem(storageKey));
  } catch {
    // Storage may be unavailable in private browsing or server-side tests.
    return "zh-CN";
  }
};

export const locale = ref<Locale>(readStoredLocale());

export const setLocale = (value: string) => {
  locale.value = normalizeLocale(value);
  try {
    window.localStorage.setItem(storageKey, locale.value);
  } catch {
    // Switching still works when the browser blocks storage.
  }
};

export const t = (
  key: MessageKey,
  params: Record<string, string | number> = {}
): string => {
  const message = messages[locale.value][key] || messages["zh-CN"][key];
  return message.replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match
  );
};

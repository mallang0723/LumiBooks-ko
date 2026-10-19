import { IntlMessageFormat } from "intl-messageformat";
import english from "../locales/en.json";
import korean from "../locales/ko.json";

export type Catalog = { readonly [key: string]: string | Catalog };
type LeafKeys<T> = { [K in keyof T & string]: T[K] extends string ? K : `${K}.${LeafKeys<T[K]>}` }[keyof T & string];
export type MessageKey = LeafKeys<typeof english>;
export type MessageValues = Record<string, string | number | boolean | Date | null | undefined>;
export const DEFAULT_LOCALE = "en";

function lookup(catalog: Catalog | undefined, key: string): string | undefined {
  let value: string | Catalog | undefined = catalog;
  for (const part of key.split(".")) {
    if (!value || typeof value === "string" || !Object.hasOwn(value, part)) return undefined;
    value = value[part];
  }
  return typeof value === "string" ? value : undefined;
}

/** Isolated locale instances keep backend accounts independent. Resources are
 * bundled, with no network fetch, browser language detection, or global mutation.
 * Missing/invalid translations fall back to English; missing English keys fail
 * loudly in development/build checks rather than silently hiding UI copy. */
export function createTranslator(locale = DEFAULT_LOCALE, catalogs: Readonly<Record<string, Catalog>> = {}) {
  let language: string;
  try { language = Intl.getCanonicalLocales(locale)[0] ?? DEFAULT_LOCALE; }
  catch { language = DEFAULT_LOCALE; }
  const chain = [...new Set([language, language.split("-")[0]!, DEFAULT_LOCALE])];
  const cache = new Map<string, IntlMessageFormat>();
  return (key: MessageKey, values: MessageValues = {}): string => {
    for (const candidate of chain) {
      const message = lookup(candidate === DEFAULT_LOCALE ? english : catalogs[candidate], key);
      if (message === undefined || message === "") continue;
      const cacheKey = `${candidate}:${key}`;
      try {
        let formatter = cache.get(cacheKey);
        if (!formatter) {
          formatter = new IntlMessageFormat(message, candidate, undefined, { ignoreTag: true });
          if (cache.size >= 512) cache.delete(cache.keys().next().value!);
          cache.set(cacheKey, formatter);
        }
        return String(formatter.format(values));
      } catch (error) { if (candidate === DEFAULT_LOCALE) throw error; }
    }
    throw new Error(`Missing English message: ${key}`);
  };
}

/** LumiBooks-ko: bundled language packs. `bun build --define LUMIBOOKS_LOCALE='"ko"'`
 * selects the app language at build time (see docs/ko-fork.md); sources run
 * without the define (tests, checks) stay English. Missing keys fall back to English. */
export const BUNDLED_CATALOGS: Readonly<Record<string, Catalog>> = { ko: korean };
declare const LUMIBOOKS_LOCALE: string | undefined;
export const APP_LOCALE = typeof LUMIBOOKS_LOCALE === "string" ? LUMIBOOKS_LOCALE : DEFAULT_LOCALE;

/** Module-level UI/lesson metadata is built with this translator at load time,
 * so the build-time locale applies everywhere; there is no live switching. */
export const t = createTranslator(APP_LOCALE, BUNDLED_CATALOGS);

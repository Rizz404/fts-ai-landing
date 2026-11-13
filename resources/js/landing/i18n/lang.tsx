import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { assistantStrings, type AssistantStrings } from "./assistantStrings";
import { strings, type Strings } from "./strings";

export const LANGS = ["en", "id", "ja"] as const;
export type Lang = (typeof LANGS)[number];
export type Localized<T> = Record<Lang, T>;

const STORAGE_KEY = "fts-ai-lang";

const isLang = (value: string | null | undefined): value is Lang =>
  !!value && (LANGS as readonly string[]).includes(value);

const detectLang = (): Lang => {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  const browser = window.navigator.language.slice(0, 2).toLowerCase();
  return isLang(browser) ? browser : "en";
};

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Strings; a: AssistantStrings };

const LangContext = createContext<LangContextValue | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(detectLang);
  const t = strings[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      window.FTS_PAGE === "consultation" ? `${assistantStrings[lang].booking.title} — FTS` : t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    window.localStorage.setItem(STORAGE_KEY, lang);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url);
  }, [lang, t]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, a: assistantStrings[lang] }}>{children}</LangContext.Provider>
  );
};

export const useLang = () => {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used inside LangProvider");
  return value;
};

export const format = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

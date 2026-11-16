export const links = {
  ftsHome: "https://fts-tech.co.id/",
  contact: "https://fts-tech.co.id/contact",
} as const;

export const ftsLogo = "/images/ai-landing/global/fts-logo.webp";

// Pages of this site, keeping the chosen language in the URL.
export const pageUrl = (path: "/" | "/lp" | "/consultation", lang: string, hash = "") => `${path}?lang=${lang}${hash}`;

// The interactive site with the AI Concierge character (Version 2, maintained separately).
// It has no per-industry page yet, so every industry opens its AI Solutions list.
export const interactiveUrl = (path: "" | "/solutions", lang: string) =>
  `https://fts-ai-lp.fts-tech.co.id/fts${path}?lang=${lang}`;

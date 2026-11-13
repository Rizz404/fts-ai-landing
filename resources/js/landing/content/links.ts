export const links = {
  ftsHome: "https://fts-tech.co.id/",
  contact: "https://fts-tech.co.id/contact",
} as const;

export const ftsLogo = "/images/ai-landing/global/fts-logo.webp";

// Pages of this site, keeping the chosen language in the URL.
export const pageUrl = (path: "/" | "/consultation", lang: string, hash = "") => `${path}?lang=${lang}${hash}`;

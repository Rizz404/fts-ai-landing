const FTS_SITE = "https://fts-tech.co.id";

export const links = {
  ftsHome: `${FTS_SITE}/`,
  about: `${FTS_SITE}/about`,
  services: `${FTS_SITE}/services`,
  works: `${FTS_SITE}/works`,
  contact: `${FTS_SITE}/contact`,
  aiAutomationServices: `${FTS_SITE}/ai-automation-indonesia`,
  cafeAi: "https://cafe-ai.fts-tech.co.id/cafe-ai?lang=en",
} as const;

export const navItems = [
  { name: "Home", href: links.ftsHome },
  { name: "About", href: links.about },
  { name: "Services", href: links.services },
  { name: "AI Applications", href: "#top", current: true },
  { name: "Works", href: links.works },
  { name: "Contact", href: links.contact },
] as const;

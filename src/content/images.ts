// Every image used by the page lives here.
// `placeholder: true` marks temporary SVGs that still need final artwork.
// See IMAGES-TO-GENERATE.md in the project root for prompts and swap steps.

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: boolean;
};

export const images = {
  ftsLogo: {
    src: "/images/ai-landing/global/fts-logo.webp",
    alt: "Fujiyama Technology Solutions",
    width: 64,
    height: 64,
    placeholder: false,
  },
  cafeAiBaristaCharacter: {
    src: "/images/ai-landing/apps/cafe-ai/cafe-ai-barista-character-waving.PLACEHOLDER.svg",
    alt: "Cafe AI Barista character",
    width: 600,
    height: 800,
    placeholder: true,
  },
  cafeAiInterfacePreview: {
    src: "/images/ai-landing/apps/cafe-ai/cafe-ai-homepage-and-chat-drawer-preview.PLACEHOLDER.svg",
    alt: "Cafe AI homepage and chat drawer with initial greeting",
    width: 1280,
    height: 720,
    placeholder: true,
  },
} satisfies Record<string, SiteImage>;

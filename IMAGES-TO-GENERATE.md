# Images to generate / replace

Every temporary image ends in `.PLACEHOLDER.svg` and lives in `public/images/ai-landing/`. All image paths are set in `src/content/images.ts`.

To find every placeholder:

```
rg -l "PLACEHOLDER" public src
```

## How to swap one in

1. Make the final file under the **same base name without `.PLACEHOLDER`**, for example `cafe-ai-barista-character-waving.webp`.
2. In `src/content/images.ts`, update `src` and set `placeholder: false`.
3. Delete the old `.PLACEHOLDER.svg`.

In dev mode, any image with `placeholder: true` shows a red "Placeholder image" badge. Production builds don't show the badge.

> **Rights and accuracy (from proposal v2):** you need the owner's approval before using the Cafe AI character and screenshots on the FTS site. The UI preview must stay a **real capture** of the live Cafe AI site. Don't generate fake UI or invented AI chat replies.

---

## 1. `cafe-ai-barista-character-waving`

| | |
|---|---|
| Placeholder | `public/images/ai-landing/apps/cafe-ai/cafe-ai-barista-character-waving.PLACEHOLDER.svg` |
| Final file | `public/images/ai-landing/apps/cafe-ai/cafe-ai-barista-character-waving.webp` |
| Size | 600 × 800, transparent background, WebP, ≤ 120 KB |
| Used in | `src/sections/Experiences.tsx`, left column of the Cafe AI inset |
| Alt | "Cafe AI Barista character" |

**Preferred source (no generation needed):** export the existing character from the Cafe AI project, `D:\kodingan\shared\cafe-ai\public\images\character\barista-greeting.webp`. Crop or pad it to 600 × 800 with a transparent background.

**Generation prompt (only if the original can't be used):**

> Flat vector-style illustration of a friendly cafe barista, waist-up, standing, waving with the right hand raised at shoulder height and a warm smile. Young man with long dark dreadlocks tied back loosely, round glasses, thin moustache. White long-sleeve shirt with rolled sleeves under a dark espresso-brown apron with copper buttons and a small golden coffee-bean emblem on the chest pocket. Clean outlines, soft cel shading, warm palette (cream #FFF5E8, terracotta #C8643C, espresso brown). Transparent background, no text, no props, character centred, 3:4 portrait.

## 2. `cafe-ai-homepage-and-chat-drawer-preview`

| | |
|---|---|
| Placeholder | `public/images/ai-landing/apps/cafe-ai/cafe-ai-homepage-and-chat-drawer-preview.PLACEHOLDER.svg` |
| Final file | `public/images/ai-landing/apps/cafe-ai/cafe-ai-homepage-and-chat-drawer-preview.webp` |
| Size | 1280 × 720, WebP, ≤ 200 KB |
| Used in | `src/sections/Experiences.tsx`, right column of the Cafe AI inset |
| Alt | "Cafe AI homepage and chat drawer with initial greeting" |

**Do not generate this with AI.** It has to be a real UI capture. The proposal already includes a ready composite:

- `docs/v2/assets/cafe-interface-preview.png` is the 1280 × 720 composite of two real states. Convert it to WebP.
- The source captures it was built from: `docs/v2/assets/cafe-live-home-desktop.png` and `docs/v2/assets/cafe-live-chat-desktop.png`.

The caption on the page already describes it as a composite of two real states showing the initial greeting only. Keep that caption.

---

## Not placeholders (final)

- The hero "Friction → Flow" illustration is inline SVG in `src/components/FrictionToFlowIllustration.tsx`. The proposal asks for this decoration to be rebuilt in SVG/CSS, so it's final.
- `public/images/ai-landing/global/fts-logo.webp` is copied from `Company-Profile-FE/public/Logo FTS.webp`.

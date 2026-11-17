# FTS AI Demos — "Our Solutions to Your Problems"

A showcase of the live AI staff demos built by Fujiyama Technology Solutions. Visitors pick their industry, open a demo and try it, then contact FTS to get their own. The page is available in English, Indonesian and Japanese.

It's a standalone site built with Vite, React 18, TypeScript and Tailwind 3.

```
npm install
npm run dev
npm run build
```

## Structure

| Path | Contents |
|---|---|
| `src/content/demos.ts` | The demo list: URL, category, role, and tasks in three languages |
| `src/i18n/strings.ts` | All page copy in EN, ID and JA |
| `src/i18n/lang.tsx` | Language state, picked from `?lang=` → localStorage → browser language → `en` |
| `src/sections/` | Hero, Demos (filterable grid), Features, HowItWorks, FinalCta |
| `public/images/demos/<id>.webp` | Real 1280 × 800 screenshots of each live demo, captured 13 Nov 2026 |

## Adding or updating a demo

1. Add an entry to `src/content/demos.ts`.
2. Save a 1280 × 800 WebP screenshot of the live demo as `public/images/demos/<id>.webp`.

The AI solutions section (`resources/js/landing/sections/Solutions.tsx`) sends each industry category to the interactive site with the AI character (https://fts-ai-lp.fts-tech.co.id/, maintained separately) in the same language. The direct demo links stay in "Browse the demos" below it.

The first three demos (Wedding AI, Hotel AI, Restaurant AI) are featured: they lead the list and the hero previews.

`/lp` is the landing page version for ads (`window.FTS_PAGE = "lp"`, see `resources/js/landing/page.ts`). It renders the same showcase, but every demo card, hero preview, AI category and the "AI solutions" menu opens the AI Solutions page of the interactive site (`https://fts-ai-lp.fts-tech.co.id/fts/solutions?lang=…`) instead of the individual demos. Other outbound links (footer, WhatsApp) stay off; the AI Consultant chat and the consultation page stay available. The official site shows this page at https://fts-tech.co.id/ai and /ailp.

Demo links open in a new tab with the same language (`?lang=`). Set `brokenLangs` on a demo whose live site fails in a language; that demo then opens in Indonesian instead.

## Deployment

- Live URL: https://ai-solutions.fts-tech.co.id/ (Plesk NEWEST, subscription `fts-tech.co.id`)
- Pushing to `main` sends a GitHub webhook to Plesk Git. Plesk runs `npm ci && npm run build` and serves `dist/`.
- `.github/workflows/ci.yml` only runs manually (`workflow_dispatch`) and isn't required for a deploy.

## History

`docs/v2/` holds the original proposal, which featured Cafe AI only. On 13 Nov 2026 the site was changed into a showcase of every live demo at the user's request.

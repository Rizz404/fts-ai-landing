# FTS AI Landing Page — "Our Solutions to Your Problems"

A standalone implementation of `docs/v2/FTS-AI-Landing-Page-Proposal-ID.md`, built with Vite, React 18, TypeScript and Tailwind 3 (the same stack as Company-Profile-FE).

```
npm install
npm run dev
npm run build
```

## Structure

| Path | Contents |
|---|---|
| `src/sections/` | One file per section: Hero, Problems, Experiences (task tiles + Cafe AI inset), Benefits, Steps, FinalCta |
| `src/content/links.ts` | Every CTA URL (FTS site, contact, AI automation, Cafe AI) |
| `src/content/images.ts` | Every image, including its `placeholder` status |
| `IMAGES-TO-GENERATE.md` | List of placeholder images, with specs, prompts and swap steps |

## Deployment

- Live URL: https://ai-solutions.fts-tech.co.id/ (Plesk NEWEST, subscription `fts-tech.co.id`)
- Pushing to `main` triggers a GitHub webhook to Plesk Git. Plesk pulls the branch, runs `npm ci && npm run build` on the server, and serves the `dist/` folder.
- The CI workflow in `.github/workflows/ci.yml` only runs manually (`workflow_dispatch`) and isn't required for a deploy.

## Notes from the proposal

- Cafe AI colors (cream and terracotta) are used only inside the Cafe AI inset. The rest of the page stays FTS blue.
- No simulated chat, no made-up AI replies, no metrics.
- The task tiles are page anchors, not new products.
- Cafe AI opens in a new tab, and the link says so.
- Reveal animations are disabled when `prefers-reduced-motion` is on.
- Publishing still needs owner approval for the Cafe AI relationship, visual rights and final copy (proposal priority P0).

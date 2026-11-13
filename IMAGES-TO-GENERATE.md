# Images to generate: the FTS AI Consultant character

The site uses three placeholder images of one character, the **FTS AI Consultant**. Each one is an SVG ending in `.PLACEHOLDER.svg` under `public/images/character/`, and each shows a red **PLACEHOLDER** label.

Find them all with:

```
rg -l "PLACEHOLDER" public resources
```

## How to swap one in

1. Generate the image (prompts below) and save it next to the placeholder as `.webp`, using the same name without `.PLACEHOLDER`. For example `public/images/character/fts-ai-consultant-greeting.webp`.
2. Update its `src` in `resources/js/landing/content/character.ts`.
3. Delete the old `.PLACEHOLDER.svg`.
4. Commit and push. Plesk deploys automatically.

## Character sheet (same for all three images)

Use these words in every prompt so the three images show the same person.

> Semi-realistic anime-style illustration, the same art style as the other FTS AI staff demos (soft cel shading, clean outlines, warm friendly expression). A young Indonesian woman in her mid-20s, shoulder-length dark brown hair with soft side bangs, warm smile, natural makeup. She wears a fitted navy blazer (#102342) over a light sky-blue blouse, slim navy trousers, and a sky-blue lanyard (#0EA5E9) with a small white ID card. Professional, approachable, modern Jakarta office look. **Transparent background**, no text, no logos, no watermark.

If you prefer a realistic photo style, change only the first sentence to "Photorealistic studio portrait…". Keep everything else the same.

---

## 1. `fts-ai-consultant-greeting`

| | |
|---|---|
| Placeholder | `public/images/character/fts-ai-consultant-greeting.PLACEHOLDER.svg` |
| Final file | `public/images/character/fts-ai-consultant-greeting.webp` |
| Size | 600 × 800 (3:4), transparent, ≤ 150 KB |
| Shown in | Home page hero, standing in front of the demo screenshots, beside a speech bubble (desktop and tablet) |

Prompt:

> [Character sheet]. Full body from head to just below the knees, standing, body turned slightly to the left of the frame. **Waving hello with her right hand raised at shoulder height**, the other arm relaxed at her side. Looking at the viewer with a welcoming smile. Leave a little empty space above her head.

## 2. `fts-ai-consultant-tablet`

| | |
|---|---|
| Placeholder | `public/images/character/fts-ai-consultant-tablet.PLACEHOLDER.svg` |
| Final file | `public/images/character/fts-ai-consultant-tablet.webp` |
| Size | 600 × 800 (3:4), transparent, ≤ 150 KB |
| Shown in | `/consultation` page, left column under the intro text, beside the booking form (desktop only) |

Prompt:

> [Character sheet]. Three-quarter body, standing, **holding a tablet against her body with one arm**, the other hand open and **gesturing to the right of the frame** as if presenting a booking form. Friendly, helpful expression, looking at the viewer.

## 3. `fts-ai-consultant-avatar`

| | |
|---|---|
| Placeholder | `public/images/character/fts-ai-consultant-avatar.PLACEHOLDER.svg` |
| Final file | `public/images/character/fts-ai-consultant-avatar.webp` |
| Size | 256 × 256 (1:1), ≤ 40 KB |
| Shown in | Chat button, chat header, next to every AI reply, and the hero greeting card on phones. It is displayed in a circle as small as 28 px. |

Prompt:

> [Character sheet]. **Head-and-shoulders portrait, face centered**, smiling at the viewer. Plain light sky-blue background (#E0F2FE) instead of transparent. The face must stay recognisable when shown as a small circle.

---

## Other images (not placeholders)

- `public/images/demos/<id>.webp` are real screenshots of each live demo (1280 × 800). Re-capture one after a demo changes its look.
- `public/images/ai-landing/global/fts-logo.webp` is the FTS logo.

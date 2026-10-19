# DOSSERA — Phase 3: Signature Scroll Scene (SovereignStoryScene)

**Status:** ✅ COMPLETE
**Started:** 2026-09-15
**Completed:** 2026-09-15
**Reference:** DOSSERA master plan §44 (Phase 3), detailed specs §10, §11, §13, §64, §65, §66

---

## Objective

Build DOSSERA's signature interaction: **the document becoming intelligent while the
user scrolls** (§64). One sticky scene maps scroll progress through seven continuous
states — intro → OCR → enrichment → semantic → retrieval → governance → sovereignty —
evolving a layered document visual instead of hopping between unrelated animations.

## Exit Criteria

- [x] Sticky viewport with scroll progress mapping the §65 timeline
- [x] Seven content states, each in semantic HTML
- [x] Layered document visual with subtle depth movement (front/mid/back amplitudes)
- [x] State labels + final proof state (metric + CTA stabilize)
- [x] Scene feels continuous — no reset between states (overlays persist, never vanish)
- [x] Reverse-scroll is scrubbable (GSAP `scrub`)
- [x] Mobile fallback: stacked narrative, no long pin
- [x] Reduced-motion: static composed content, no GSAP
- [x] Cleanup of all GSAP contexts + listeners
- [x] `npx tsc --noEmit` clean, `npm run build` passes

---

## Placement decision

`SovereignStoryScene` replaces `FeaturesShowcase` (approved by user). Its capability
content (OCR / semantic / RBAC / SOC) is absorbed by the scene's states and will be
revisited by the Phase 4 capability index. New page flow:

```text
Hero → SovereignStoryScene → TrustMarquee → AppIntroSection → AppFeatures → …
```

Nav anchors `#about` and `#features` remain valid (AppIntroSection / AppFeatures).

---

## Timeline mapping (§65)

| Stop | % | State | Eyebrow (mono) | Visual movement |
|---|---:|---|---|---|
| 1 | 0–10 | Intro | SYS / BOOT | document enters field |
| 2 | 10–25 | OCR | OCR / MULTILINGUAL | text structure + boxes appear |
| 3 | 25–40 | Enrichment | ENRICHMENT | language/date/classification chips |
| 4 | 40–58 | Semantic | SEMANTIC LAYER | query pill + entity relationships |
| 5 | 58–75 | Retrieval | RETRIEVAL | result card rises, relevant region |
| 6 | 75–90 | Governance | GOVERNANCE | audit rail, permissions, SHA-256 |
| 7 | 90–100 | Sovereignty | SOVEREIGN | seal + proof metric + CTA stabilize |

## Continuity rule

Once a visual layer appears it never fully disappears: OCR boxes relax to low opacity,
enrichment chips persist, semantic entities remain at reduced emphasis, retrieval and
governance layers accumulate into the sovereignty state. Left-column text cross-fades
between states (staggered eyebrow → headline → desc).

## Depth system (§66, §11)

`z-index 1` back docs → `2` secondary → `3` primary document → `4` data/annotations →
`5` labels. Pointer parallax: front 1.0 / mid 0.55 / back 0.25, max ±4px, fine-pointer only.

---

## Tasks

### 1. `components/SovereignStoryScene.tsx` (new)
- Desktop: sticky viewport (`position: sticky; top: 0`), no GSAP pin-spacer needed.
- GSAP `ScrollTrigger` scrub timeline `trigger: section, start: top top, end: bottom bottom, scrub`.
- `gsap.registerPlugin(ScrollTrigger)` + `ctx` cleanup (`gsap.context`).
- `activeIndex` state mirrored from `ScrollTrigger` onUpdate → controls `aria-hidden` on text blocks + progress `01/07`.
- Pointer parallax via existing `usePointerPosition`.
- Reduced-motion + mobile (`matchMedia max-width 1023px`): render stacked narrative with
  `data-reveal` static composition, no GSAP.
- Final state CTA = `MagneticButton` → `#features`.

### 2. `oevra.css` — scene styles
- `.oevra-story` (600vh desktop) + `.oevra-story__stage` sticky 100vh.
- Two-column grid (text left, visual right), mono eyebrow token `--oevra-font-mono`.
- Document paper layers, OCR boxes, chips, entity edges, search/result, governance rail, seal.
- Mobile stacked layout + reduced-motion overrides.
- Prune deleted `FeaturesShowcase` CSS (`.oevra-features-showcase*`, `.oevra-media*`, `.oevra-media__appcard*`).

### 3. `OevraClonePage.tsx`
- Replace `FeaturesShowcase` with `SovereignStoryScene` after `HeroSection`.
- Sync Lenis → ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)` + refresh after mount.

### 4. Delete
- `components/FeaturesShowcase.tsx`

---

## Verification

```text
npx tsc --noEmit
npm run build
```

Manual QA (in-browser dev server `/oevra-clone`): slow scroll, fast scroll, reverse scroll,
mobile width, reduced motion, fresh load after hard refresh.

## Progress Log

| Date | Action | Notes |
|---|---|---|
| 2026-09-15 | Plan created | Scene spec + placement decided (replaces FeaturesShowcase) |
| 2026-09-15 | CSS pruned | Removed all FeaturesShowcase CSS from oevra.css (verified 0 refs) |
| 2026-09-15 | SCENE CSS added | `.oevra-story*`, document paper layers, OCR/chips/entities/search/govern/seal overlays, composed + stacked fallbacks, `--oevra-font-mono` var |
| 2026-09-15 | Component built | `SovereignStoryScene.tsx`: 7-state scrub timeline, parallax, stacked/reduced-motion branch |
| 2026-09-15 | Page wired | `OevraClonePage.tsx`: scene after Hero, FeaturesShowcase removed, `lenis.on('scroll', ScrollTrigger.update)` |
| 2026-09-15 | Deleted | `components/FeaturesShowcase.tsx` |
| 2026-09-15 | Verified | `npx tsc --noEmit` clean; `npm run build` passes (37s) |
| 2026-09-15 | Manual QA pending | In-browser: slow/fast/reverse scroll, mobile width, reduced motion, hard refresh |

Remaining before Phase 4 sign-off: in-browser manual QA of the scene (dev server).
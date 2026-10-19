# DOSSERA — Phase 5: Metrics + Proof

**Status:** ✅ COMPLETE
**Started:** 2026-09-15
**Completed:** 2026-09-15
**Reference:** DOSSERA master plan §16 (Black Metrics Band), §17 (Testimonial/Proof Cards), §46; anti-pattern §53.7/§53.8

---

## Objective

Replace the hard black stats block and the drag-scroll testimonial marquee with the
reference design's **controlled proof sequence**: a black metrics band that eases in with
a soft color handoff from the light page, honest count-in only where genuinely numeric,
and a proof deck where one card is active and the rest are explicitly de-emphasized —
no automatic rotation (§53.7), no fake counters (§53.8).

## Exit Criteria

- [x] Black metrics band enters via soft color handoff (light → dark gradient), not a hard cut
- [x] Count-up only genuinely numeric values: 99.9% (availability), 98.2% (OCR accuracy), 5 (VLANs); `<100 ms` stays static
- [x] Metrics model carries `counter`, `prefix`, `suffix`, `decimals` — single source of truth
- [x] Minimal hover: label strengthens + green underline grows (scaleX), nothing else moves
- [x] Proof deck is controlled: prev/next arrows, dots, index `0X / 07`, no auto-rotation
- [x] Card states: active centered full opacity; prev/next peek at `scale(0.94)` / opacity 0.34; hidden cards opacity 0
- [x] Keyboard: ArrowLeft/ArrowRight on the focusable stage (tabIndex 0) + `aria-live` status
- [x] Hover on active proof card: translateY(−3px) + green border only
- [x] Legitimate content only — existing 7 quotes reused, no fabricated claims added
- [x] `npx tsc --noEmit` clean, `npm run build` passes
- [x] Dead code removed: old `.oevra-testimonials*` CSS (main, extra, 2 responsive refs) pruned
- [x] Reduced motion unaffected (global block zeroes transition durations)

---

## Design notes (§16, §17)

- **Handoff:** `.oevra-stats` background is a fixed gradient `--oevra-bg → black` over a
  top padding of `34vh`; a 140px `::after` fade-on-black returns the page to paper before
  the proof section. No centerline (`::before` removed), no animated gradient.
- **Metrics:** each cell is (value → label → sub). Counters use the existing `Counter`
  primitive; the threshold value is rendered statically with a mono `<` mark and `ms` unit.
- **Proof deck:** single-centered card, absolute stacking, `z-index` 1–4; active card gets
  full pointer events; reduced-motion users get instant transitions via the global block.
- Component filename and section `id="testimonials"` kept — nav + in-page anchors stay valid.

## Tasks

1. `components/StatsWall.tsx` — rewritten: `Metric` model, counter/static branch, head meta.
2. `components/TestimonialsCarousel.tsx` — rewritten as controlled proof deck (`.oevra-proof*`).
3. `oevra.css` — replace `.oevra-stats*` block; replace `.oevra-testimonials*` + "TESTIMONIALS — extra" blocks with `.oevra-proof*`; remove responsive refs for `.oevra-testimonials__card` and `__hint`.

## Verification

```text
npx tsc --noEmit
npm run build
```

Manual QA: scroll band handoff at desktop + mobile, counter vs static metrics, arrows/dots/keyboard through all 7 cards, focus-visible rings, reduced motion.

## Progress Log

| Date | Action | Notes |
|---|---|---|
| 2026-09-15 | Plan created | Metrics + Proof spec (drafted, completed same day) |
| 2026-09-15 | StatsWall rewritten | `Metric` model (counter/prefix/suffix/decimals), `<100 ms` static, head meta |
| 2026-09-15 | Carousel rewritten | Controlled proof deck: arrows, dots, index, keyboard, `aria-live`, no auto-rotation |
| 2026-09-15 | CSS built | `.oevra-stats` gradient handoff + fade; `.oevra-proof*` block |
| 2026-09-15 | CSS pruned | `.oevra-testimonials*` main + extra + 2 responsive refs removed |
| 2026-09-15 | Verified | `npx tsc --noEmit` clean; `npm run build` passes |

Remaining before Phase 6 sign-off: in-browser manual QA (handoff, hover underline, keyboard proof nav, mobile, reduced motion).
# DOSSERA — Phase 4: Capability Index

**Status:** ✅ COMPLETE
**Started:** 2026-09-15
**Completed:** 2026-09-15
**Reference:** DOSSERA master plan §15, §45; detailed §11 (interaction systems), §13 (capability content)

---

## Objective

Turn the "one platform. every document. total control." section into DOSSERA's
**interaction-led capability index** (§15, §45): five capability rows whose hover/focus
drive a linked product visual, a live description block, accent movement, and keyboard
selection — the strongest interaction section after the Phase 3 scroll scene.

Replaces the `AppFeatures` accordion (Phase 1 content absorbed into the Phase 3 scene
states + this index). Section keeps `id="features"` so nav + `#features` CTAs stay valid.

## Exit Criteria

- [x] Five interactive capability rows (01 Ingestion → 02 OCR → 03 Semantic → 04 Permissions + audit → 05 On-premise)
- [x] Linked visual response (row hover/focus updates product visual panel)
- [x] Description + accent updates in a live detail block
- [x] Row micro-interactions: text darkens, num accent greens, arrow shifts 4–6px, supporting detail appears
- [x] Keyboard: Tab / Enter / Space / ArrowUp / ArrowDown / Home / End / Escape
- [x] ARIA: tablist + roving tabindex, `aria-selected`, single tabpanel, `aria-live` status
- [x] Reuses ready primitives: `ScrambleText`, `useScrollReveal`, scene overlay CSS (`oevra-doc-*`), `data-cursor`
- [x] Mobile: single column, visual under rows; reduced-motion handled by global block
- [x] `npx tsc --noEmit` clean, `npm run build` passes
- [x] Dead code removed: `AppFeatures.tsx` deleted, `.oevra-app-features*` CSS pruned

---

## Capabilities (content sourced from existing truthful copy)

| # | Capability | Tag | Visual |
|---|---|---|---|
| 01 | Document ingestion | digitize | paper stack + scanning line |
| 02 | OCR + Arabic / French | multilingual | bilingual document + OCR brackets |
| 03 | Semantic search | semantic layer | query pill + entities + ranked result card |
| 04 | Permissions + audit | governance | role rows + SHA-256 + provenance |
| 05 | On-premise deployment | sovereign | Proxmox / pfSense rack, 0 cloud |

## Interaction spec (§15)

- Row `hover`/`focus` sets active index → visual panel, detail block, and meta update.
- Active row: num greens, title opacity → 1 + slides 6px, arrow shifts 5px, tag brightens.
- Detail block remounts per active capability (fade-up) — desc + points + meta chips.
- Roving tabindex rows; Arrows/Home/End move selection and focus; Escape returns focus
  to section heading; Enter/Space native on `<button>`.
- Visual demos reuse the Phase 3 scene overlay CSS (`.oevra-doc-search` / `.oevra-doc-ocr__bracket`
  / `.oevra-doc-entity` / `.oevra-doc-result` / `.oevra-doc-govern__row` / `.oevra-doc-hash` /
  `.oevra-doc-provenance`) + `.oevra-paper` — forced visible inside the demo stage.

## Tasks

1. `components/CapabilityIndex.tsx` (new) — tablist index + linked visual + detail block.
2. `oevra.css` — CAPABILITY INDEX block; prune `APP FEATURES (Accordion)`, `APP FEATURES — num + eyebrow`, two responsive refs.
3. `OevraClonePage.tsx` — import/swap, keep `id="features"` order.
4. Delete `components/AppFeatures.tsx`.

## Verification

```text
npx tsc --noEmit
npm run build
```

Manual QA: hover each row, keyboard through with Tab+Arrows+Escape, mobile width,
reduced motion, hard refresh.

## Progress Log

| Date | Action | Notes |
|---|---|---|
| 2026-09-15 | Plan created | Capability index spec (drafted, completed same day) |
| 2026-09-15 | Component built | `CapabilityIndex.tsx` — 5 rows, visual demos, keyboard nav, ARIA |
| 2026-09-15 | CSS built | `.oevra-cap*` block (rows, sticky lead, demo stack, rack, overrides) |
| 2026-09-15 | CSS pruned | `.oevra-app-features*` main + num/eyebrow + 2 responsive refs removed |
| 2026-09-15 | Page wired | `OevraClonePage.tsx` swaps `AppFeatures` → `CapabilityIndex` |
| 2026-09-15 | Deleted | `components/AppFeatures.tsx` |
| 2026-09-15 | Verified | `npx tsc --noEmit` clean; `npm run build` passes |

Remaining before Phase 5 sign-off: in-browser manual QA (hover, keyboard, mobile, reduced motion).
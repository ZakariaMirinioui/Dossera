# DOSSERA — OEVRA-INSPIRED MASTER IMPLEMENTATION PLAN

**Project:** DOSSERA — Sovereign Document Intelligence Platform
**Reference:** `DOSSERA_OEVRA_INSPIRED_MASTER_PLAN.md` (full 76-section spec in Downloads)
**Created:** 2026-09-15
**Purpose:** Track all 10 implementation phases for the /oevra-clone page upgrade.

---

## How to use this file

Each phase links to its own detailed plan file. When a phase is done, check its boxes and
update the status in the **Phase Status** table below. The verification commands are the
same for every phase:

```text
npx tsc --noEmit
npm run build
```

---

## Phase Status

| Phase | Name | Status | Plan |
|---:|---|---|---|
| 1 | Stabilize foundations | ✅ COMPLETE | `PHASE_1_PLAN.md` |
| 2 | Hero + Header | ✅ COMPLETE | `PHASE_2_PLAN.md` |
| 3 | Signature scroll scene (SovereignStoryScene) | ⬜ PENDING | — |
| 4 | Capability index | ⬜ PENDING | — |
| 5 | Metrics + Proof | ⬜ PENDING | — |
| 6 | Engagement + Commercial path | ⬜ PENDING | — |
| 7 | Contact + Form | ⬜ PENDING | — |
| 8 | Final CTA + Footer | ⬜ PENDING | — |
| 9 | Performance pass | ⬜ PENDING | — |
| 10 | Interaction QA / polish pass | ⬜ PENDING | — |

---

## Phase structure (from master plan §42–§51)

### Phase 1 — Stabilize foundations ✅
- [x] Audit current code against screenshot
- [x] Remove obsolete red/dark/gold design tokens
- [x] Establish final spacing/typography/color tokens
- [x] Create motion tokens (TS + CSS single source of truth)
- [x] Add reduced-motion infrastructure (`usePrefersReducedMotion`)
- [x] Add shared primitives (Reveal, Accordion, Counter, MagneticButton)
- [x] Centralize pointer logic (`usePointerPosition`)
- [x] Delete dead code (TiltCard, `.oevra-reveal`)
- [x] Exit criteria: no duplicate animation logic, no layout regressions, build passes, mobile intact

### Phase 2 — Hero + Header ✅
Implement:
- [x] Load choreography (staged entrance, blur→crisp, accent settles later)
- [x] CTA hover/press/focus
- [x] Header shrink/reveal on scroll direction
- [x] Mobile menu animation (coherent panel + staggered links)
- [x] Scroll cue (idle motion + fade on first scroll)
- [x] Hero → first section handoff

QA: fresh page load, hard refresh, slow network, keyboard only, mobile, reduced motion

### Phase 3 — Signature scroll scene (SovereignStoryScene) ✅ COMPLETE (2026-09-15)
Build:
- [x] Sticky viewport with scroll progress
- [x] Multiple content states (OCR → semantic → retrieval → governance → sovereignty)
- [x] Layered document visual with depth movement
- [x] State labels + final proof state (0 cloud dependency + CTA)
- [x] GSAP ScrollTrigger integration (deferred from Phase 1)
- [x] Mobile fallback (stacked narrative instead of long pin)
- [x] Reduced-motion fallback (static composed content, no GSAP)
- [x] Lenis → ScrollTrigger sync

Critical rule: the scene must feel continuous — no obvious reset between states.
Reference timeline: §65 (0–10% intro, 10–25% OCR, 25–40% enrichment, 40–58% semantic,
58–75% retrieval, 75–90% governance, 90–100% sovereignty).

### Phase 4 — Capability index ✅ COMPLETE (2026-09-15)
- [x] Interactive capability rows (01 Document ingestion → 02 OCR → 03 Semantic search → 04 Permissions + audit → 05 On-premise)
- [x] Linked visual response (row hover/focus updates product visual)
- [x] Description/accent updates (live detail block: desc, points, meta chips)
- [x] Keyboard: Tab, Enter, Space, Arrow keys, Escape (roving tabindex + Home/End)
- [x] ARIA tablist/tab/tabpanel + aria-live status
- [x] Reused primitives: ScrambleText, useScrollReveal, scene overlay CSS, data-cursor

This should be one of DOSSERA's strongest interaction sections.

### Phase 5 — Metrics + Proof
- [ ] Scroll entrance (soft color handoff into black band, no hard cut)
- [ ] Metric count-in only where genuinely numeric
- [ ] Proof card states + controlled carousel (no endless auto-rotation)
- [ ] Legitimate content only — never fabricate claims

### Phase 6 — Engagement + Commercial path
- [ ] Segmented decision surface (Self-discovery vs Institutional discovery)
- [ ] Selected/unselected state transitions
- [ ] CTA adaptation per selection
- [ ] Escape B2C pricing patterns → Discovery / PoC / Production

### Phase 7 — Contact + Form
- [ ] Field focus states (border, label, helper text)
- [ ] Validation (explicit border + connected error text)
- [ ] Submit loading → success / error
- [ ] Formspree integration verified independently

### Phase 8 — Final CTA + Footer
- [ ] Final narrative reveal (phrase 1 → phrase 2 → accent → CTA)
- [ ] "own your documents / run your intelligence / keep your control"
- [ ] Large quiet DOSSERA wordmark closeout
- [ ] Footer link hover states (minimal)

### Phase 9 — Performance pass
- [ ] Measure FCP, LCP, CLS, INP, JS payload, image weight
- [ ] Test on modern desktop, mid-tier laptop, mid-range Android, older iPhone
- [ ] Transform/opacity-only animations, sparse `will-change`
- [ ] Lazy-load non-critical, clean up GSAP contexts + listeners

### Phase 10 — Interaction QA / polish pass
- [ ] Manual review of every interactive element
- [ ] QA scenarios: first visit, fast scroll, reverse scroll, repeated interaction, keyboard, reduced motion
- [ ] Anti-pattern check (§53): no card-lift-everywhere, no fade-everywhere, no huge cursor blob, no auto-corousel, etc.
- [ ] "10K agency" quality test (§54)

---

## Global motion system (applies to all phases)

- Motion is state-based, not decoration-based (§6.1)
- Animation hierarchy: micro 120–240ms, UI 220–450ms, content 450–850ms, scene 700–1400ms, scroll-linked (§6.2)
- Easing: editorial `cubic-bezier(0.22,1,0.36,1)`, soft `cubic-bezier(0.4,0,0.2,1)`, linear (§6.3)
- Transform-first rule: translate3d/scale/rotate/opacity/clip-path/blur only (§6.4)
- Hover amplitudes: icon 2–5px, magnetic 4–10px, card lift 2–6px, image zoom 1.02–1.06 (§33)
- No huge cursor blobs, no glassmorphism-everywhere, no animated gradient backgrounds (§53, §39)

---

## Design language (from §30–§31)

- Background: warm near-white paper (`#efefef` current, tune to `#F7F6F3` range)
- Text: near-black (current `#000` with `#4e4e4e` for body)
- Accent: muted sage green `#778643` (strategic words, selected states, indicators, metrics)
- Mono only for technical metadata/indices (01/05, OCR, RAG, AUDIT LOG, ON-PREMISE)
- Never mono for whole paragraphs

---

## Anti-patterns to avoid (§53)

1. Every card lifts on hover
2. Every element fades in on scroll
3. Every section has parallax
4. Huge cursor blob
5. Animated gradient background
6. Excessive glassmorphism
7. Automatic testimonial carousel
8. Artificial counters for every number
9. Animation does not explain product functionality
10. Buttons look like decoration

---

## Progress Log

| Date | Phase | Action | Notes |
|---|---|---|---|
| 2026-09-15 | 1 | Complete | Tokens, hooks, Accordion, cleanup — see PHASE_1_PLAN.md |
| 2026-09-15 | 2 | Complete | Hero/header choreography — see PHASE_2_PLAN.md |
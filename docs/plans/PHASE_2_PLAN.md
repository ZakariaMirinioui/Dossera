# DOSSERA — Phase 2: Hero + Header

**Status:** ✅ COMPLETE
**Started:** 2026-09-15
**Reference:** DOSSERA master plan §43 (Phase 2), plus detailed specs §8, §9, §14

---

## Objective

Upgrade the Hero and Header into a calm, choreographed institutional entrance:
staged load sequence, premium CTA states, direction-aware header behavior, a coherent
mobile menu, an idle scroll cue that hands off to the first section, and a smooth
hero → product-section transition.

## Exit Criteria

- [x] Staged load choreography feels intentional (header → headline groups → accent → body → CTA → scroll cue)
- [x] CTA has rest / hover / press / focus-visible states
- [x] Header compacts on scroll down past hero; returns on scroll up; never blocks content
- [x] Mobile menu opens/closes as one coherent panel with staggered links
- [x] Nav link hover underline grows from the pointer's entry point
- [x] Scroll cue fades on first real scroll; hero hands off to first section (no hard cut)
- [x] All motion disabled gracefully under `prefers-reduced-motion`
- [x] `npx tsc --noEmit` clean, `npm run build` passes, dev server HTTP 200

---

## Tasks

### 1. Load choreography
- Header enters first (fade + slight settle)
- Hero eyebrow → headline groups (2-3 lines) → accent phrase settles slightly later → subcopy → CTA → scroll cue
- Entrance uses opacity + translateY(26px) + small blur→crisp (blur only on major intro, §12)
- Reduced-motion: no entrance animation, content visible immediately

### 2. CTA states (hero + shared MagneticButton)
- Rest: solid dark surface, stable label
- Hover: arrow shifts ~4-6px, background subtly changes (exists — refine)
- Press: scale 0.985, return (needs implementation in MagneticButton)
- Focus-visible: 2px accent ring, sufficient contrast (§38)
- No shimmer / no elastic bounce

### 3. Header behavior
- Direction-aware: scroll down past hero → compact (reduce vertical height) + translucent blur
- Scroll up → return
- Hidden state (slide out) only when scrolling down far past hero; reappears instantly on up-scroll
- Never hides while mobile menu is open
- Disabled under reduced motion

### 4. Nav link hover + focus
- Default: slight opacity reduction (0.75)
- Hover: opacity → 1, underline/indicator grows from the pointer's entry X position
- Indicator grows via `scaleX` + `transform-origin` set by pointer X (no center explosion)
- Focus-visible: same underline + premium ring

### 5. Mobile menu
- Backdrop + panel materialize as one composition
- Links stagger slightly upward on open; retreat together on close
- Hamburger toggles with `aria-expanded`; panel `aria-hidden` when closed
- Escape closes; focus moves into menu on open, returns to button on close
- Body scroll locked while open (exists)

### 6. Scroll cue + hero handoff (§8.5, §9)
- Scroll cue has idle looping motion (exists); fades away on first real scroll
- As user scrolls: hero content drifts/parallaxes slightly, opacity eases, whitespace compresses
- No abrupt end to hero; first section label becomes visible

---

## Files

| File | Change |
|---|---|
| `components/OevraNav.tsx` | Direction-aware scroll, aria/no-escape/focus mgmt, hover-origin links, mobile menu stagger |
| `components/HeroSection.tsx` | Staggered delays, handoff parallax, scroll-cue fade |
| `components/MagneticButton.tsx` | Press state (scale 0.985) |
| `oevra.css` | Header enter + hide, nav underline origin, mobile menu stagger, hero enter blur, CTA active/focus, scroll cue fade, mobile link stagger, focus-visible premium ring |

## Progress Log

| Date | Action | Notes |
|---|---|---|
| 2026-09-15 | Plan created | — |
| 2026-09-15 | Implemented | Hero choreography, CTA states, header hide/reveal, nav hover-origin, mobile menu stagger + a11y, scroll-cue fade + handoff. tsc clean, build ✓ (vite 25.9s), /oevra-clone HTTP 200. |
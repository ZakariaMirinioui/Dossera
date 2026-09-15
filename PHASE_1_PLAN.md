# DOSSERA — Phase 1: Stabilize Foundations

**Status:** ✅ COMPLETE
**Started:** 2026-09-15
**Reference:** DOSSERA_OEVRA_INSPIRED_MASTER_PLAN.md §42

---

## Objective

Upgrade the existing DOSSERA OevraClone page from "nice animated landing page" to a solid foundation with centralized motion tokens, shared hooks, reusable primitives, and clean code — ready for the signature scroll scene in Phase 3.

## Exit Criteria

- [ ] No duplicate animation logic
- [ ] No layout regressions
- [ ] No console errors
- [ ] Build passes (`npm run build`)
- [ ] TypeScript check passes (`npx tsc --noEmit`)
- [ ] Mobile layout intact

---

## Tasks

### 1. Motion Tokens
**File:** `src/pages/OevraClone/components/motionTokens.ts`
**Status:** PENDING

Centralize all animation values:
- `duration`: micro (180ms), ui (320ms), content (650ms), scene (1000ms)
- `ease`: editorial, soft, linear
- `distance`: micro (4px), small (12px), medium (24px), large (48px)

Then replace hardcoded values across all components.

### 2. Reduced Motion Hook
**File:** `src/pages/OevraClone/components/usePrefersReducedMotion.ts`
**Status:** PENDING

Shared hook replacing 7 inline `window.matchMedia` calls:
- [ ] `OevraClonePage.tsx`
- [ ] `Counter.tsx`
- [ ] `CustomCursor.tsx`
- [ ] `MagneticButton.tsx`
- [ ] `Marquee.tsx`
- [ ] `ScrambleText.tsx`
- [ ] Delete `TiltCard.tsx` (dead code)

### 3. Pointer Position Hook
**File:** `src/pages/OevraClone/components/usePointerPosition.ts`
**Status:** PENDING

Centralized pointer tracking with rAF + lerp smoothing.
Replace duplicated mouse tracking in:
- [ ] `CustomCursor.tsx`
- [ ] `HeroSection.tsx` (spotlight)

### 4. Dead Code Cleanup
**Status:** PENDING

- [ ] Delete `TiltCard.tsx`
- [ ] Remove unused `.oevra-reveal` CSS class
- [ ] Verify no dangling imports

### 5. Extract Reusable Accordion
**File:** `src/pages/OevraClone/components/Accordion.tsx`
**Status:** PENDING

Generic accordion with:
- Animated height (CSS grid-template-rows trick)
- ARIA: `aria-expanded`, `aria-controls`, `role="region"`
- Keyboard: Enter/Space to toggle, focus management
- Refactor `AppFeatures.tsx` to use it

### 6. Verify
**Status:** ✅ DONE

- [x] `npx tsc --noEmit` — zero errors
- [x] `npm run build` — success (19.3s)
- [x] Dev server `/oevra-clone` — HTTP 200

---

## Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| GSAP integration | Deferred to Phase 3 | Only needed for sovereign scroll scene |
| TiltCard | Delete | Master plan §53 anti-pattern 1, never imported |
| Reveal systems | Keep separate | OevraClone is isolated, avoids coupling with main site |

---

## Progress Log

| Date | Action | Notes |
|---|---|---|
| 2026-09-15 | Plan created | Full audit completed, 21 components catalogued |
| 2026-09-15 | Task 1 done | motionTokens.ts created; 19 CSS easing curves refactored to `var(--oevra-ease-*)`; TS token exports added |
| 2026-09-15 | Task 2 done | usePrefersReducedMotion.ts created; replaced inline matchMedia in 6 files |
| 2026-09-15 | Task 3 done | usePointerPosition.ts created; CustomCursor + HeroSection refactored to use it |
| 2026-09-15 | Task 4 done | TiltCard.tsx deleted; `.oevra-reveal` CSS removed; no dangling imports |
| 2026-09-15 | Task 5 done | Accordion.tsx extracted (grid-template-rows animation, inert, ARIA); AppFeatures refactored to use it |

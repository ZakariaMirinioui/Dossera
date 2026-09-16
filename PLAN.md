# DOSSERA — "OEVRA-GRADE" UI OVERHAUL · Implementation Plan

**Project:** DOSSERA — Sovereign Document Intelligence Platform (/oevra-clone landing)
**Client register:** judicial institutions · courts · public administrations (B2G/B2B)
**Reference spec:** the `MASTER IMPLEMENTATION PROMPT — DOSSERA "OEVRA-GRADE" UI OVERHAUL`
**Created:** 2026-09-16  ·  **Status:** ACTIVE

---

## 1. Mission

Clone the **interaction quality, motion system, and spatial rhythm** of
https://oevra.com — not its content, colors, or playful tone — into a serious,
sovereign, institutional register: *"Linear.app meets a Swiss federal security
audit."* Every visual decision must read as **sovereign, audited, government-grade
infrastructure** — premium, calm, engineered.

All page copy is decoupled from layout in
`src/pages/OevraClone/content/dosseraLanding.ts` (single typed content object).
Product facts (98.2% OCR, sub-100ms search, 5 isolated VLANs, AES-256,
PFSENSE/PROXMOX/DOSSERA VM topology, 2–4 week deployment, etc.) are **real claims
and must never be altered, invented, or rounded.**

---

## 2. Stack (locked)

| Concern | Choice |
|---|---|
| Bundler / router | **Vite + React 18 (App not Next)** — keep existing bundler, adapt everything |
| Styling | **Tailwind v3.4** (`tailwind.config.js` token extension) + scoped CSS design system in `src/pages/OevraClone/oevra.css` |
| Component animation | **Framer Motion 10** (`useScroll`/`useTransform`, `AnimatePresence`, variants) |
| Pinned gallery + drag carousel | **GSAP + ScrollTrigger** (CapabilityGallery, FinalCTA parallax) |
| Smooth scroll | **lenis** (studio-freight/lenis), wired to `ScrollTrigger.update` in `OevraClonePage` |
| Icons | **lucide-react** + inline SVG |
| Fonts | Self-hosted via `@fontsource-variable/*` — Space Grotesk (display), DM Sans (body), JetBrains Mono (mono). **No CDN font links — zero FOUC.** |

---

## 3. Global Design Tokens

Defined once as CSS custom properties in `.oevra-app` (oevra.css) **and** mirrored
into `tailwind.config.js` → `theme.extend`. Exact values:

- `--canvas-base: #F4F2EC` · `--canvas-raised: #FBFAF6` · `--canvas-recessed: #EAE7DD`
- `--ink-primary: #14150F` · `--ink-secondary: #5B5D4F` · `--ink-tertiary: #9A9C8C`
- `--accent-sovereign: #5C7A3A` · `--accent-sovereign-dim: #8DA36A`
- `--surface-dark: #101109` · `--surface-dark-raised: #1B1C12`
- `--line-hairline: rgba(20,21,15,0.10)` · `--line-hairline-dark: rgba(255,255,255,0.10)`
- `--glow-sovereign` (radial olive glow) · `--grain-opacity: 0.035`

No blues, purples, or SaaS-teal. Every accent traces to `--accent-sovereign`.

Fluid type scale (viewport-driven, `clamp()`): `--fs-display-xl` …down to
`--fs-eyebrow`. Headline lh ≈ 0.98–1.05; body lh 1.5–1.6; mono labels
letter-spacing 0.08–0.12em. Section spacing: `--section-y: clamp(6rem, 5rem + 6vw, 11rem)`.
Max content width 1280px (`w-screen` atmosphere wrapper, `max-w-[1280px]` column).

---

## 4. Status Dashboard

Legend: ✅ done · ⬜ pending · 🔶 in progress / partial

| # | Work item | Status | Notes |
|---|---|---|---|
| 0.1 | Extract all copy to typed content config | ✅ | `content/dosseraLanding.ts` (TS strict) |
| 0.2 | Fix hero subhead double-render | ✅ | Single `<p>` in `Hero.tsx` |
| 0.3 | Restore all CTA labels | ✅ | Book Assessment · Request Deployment Scope · Request Deployment Quote · Start Free Assessment · Request a Live Demonstration |
| 0.4 | Rebuild broken 04/07 scroll section | ✅ | New `CapabilityGallery` (GSAP pinned, 500vh) |
| 0.5 | Rebuild infinite marquee ticker | ✅ | `ComplianceMarquee` duplicate-track CSS loop + edge fade + pause-on-hover |
| 0.6 | Fix Section 01 void | ✅ | `DocumentStackSection` layered fan-out (paper → digitized) |
| 1 | Grain / noise overlay (fixed, z-999, overlay mode) | ✅ | `NoiseOverlay` SVG turbulence, 0.035 opacity |
| 2 | Ambient glow blobs (CSS keyframes, off main thread) | ✅ | `.dz-glow--*` 26s drift |
| 3 | Header (transparent→raised, blur, nav underline, magnetic CTA, demoted back-link) | ✅ | `Header.tsx` |
| 4 | Hero (live dot, accent settle, labelled CTAs, terminal band bleeding bottom, 2 glows) | ✅ | `Hero.tsx` |
| 5 | Capability pinned gallery (left crossfade + scrubbed right steps, `0n / 05` rail) | ✅ | Overlapping crossfades (frame N+1 fades in 8% before frame N fades out) — no blank window |
| 6 | Compliance band + seamless marquee | ✅ | — |
| 7 | Sovereign platform section (12-col, radial 5-node diagram, metric cards) | ✅ | `SovereignPlatformSection.tsx` |
| 8 | Capability accordion + linked terminal mockup LED | ✅ | `CapabilityList.tsx` + `TerminalVisual.tsx` |
| 9 | Measured outcomes dark band + 40s sheen | ✅ | `MeasuredOutcomes.tsx` |
| 10 | Testimonial drag-carousel (peek, snap, arrows/dots/drag + autoplay-pause) | ✅ | `TestimonialCarousel.tsx` |
| 11 | Pricing cards (featured ribbon, glow hover) | ✅ | `PricingCards.tsx` |
| 12 | Final CTA + wordmark parallax + footer | ✅ | `FinalCTA.tsx` (GSAP x-drift + watermark 0→0.06 entrance fade), `OevraFooter.tsx` |
| 13 | Interaction state layer (buttons, nav, cards, rows, inputs) | ✅ | oevra.css, 220–420ms hover / 600–900ms entrances |
| 14 | Motion timing table + `motionTokens.ts` single source | ✅ | — |
| 15 | Reduced-motion fallbacks (global block + component gates) | ✅ | `usePrefersReducedMotion`, CSS media, GSAP ctx revert |
| 16 | Responsive 375/768/1024/1440; pinned = desktop-only ≥1024 | ✅ | Breakpoints 1180/1023/767/640; pinned degrades to stacked |
| 17 | Performance: transform/opacity only, SVG/tiled grain, no layout-trigger animations | ✅ | — |
| 18 | Typecheck + production build green | ✅ | `npx tsc --noEmit` clean · `npm run build` clean |
| 19 | Lint wired (`.eslintrc.cjs`) + OevraClone lint-clean | ✅ | Config created; `npm run lint` passes with `--max-warnings 0` |
| 20 | Register token mirror in `tailwind.config.js` | ✅ | canvas/ink/accent/surface/line tokens, `dz-*` fonts, premium ease, glow-sovereign |
| 21 | Delete dead pre-overhaul components | ✅ | 15 orphan files removed; tsc + build still green |
| 22 | In-browser manual QA sweep | ⬜ | See §10 QA checklist |

---

## 5. Section-by-Section Map (Phase 1)

### 5A. Header
- Sticky; transparent → `--canvas-raised` + 1px hairline + `backdrop-filter: blur(12px)` after 80px.
- Nav (PLATFORM · CAPABILITIES · OUTCOMES · ENGAGE): draw-in underline (left origin, 320ms premium ease).
- "BOOK ASSESSMENT" filled ink pill, magnetic hover.
- "BACK TO DOSSERA" demoted to mono tertiary text (wayfinding, not a nav item).
- Mobile: full-screen panel, staggered link reveal, focus trap + Esc close.

### 5B. Hero
- Eyebrow pill "● DOSSERA" with 2s pulsing live-dot.
- H1 `intelligent document operations for` / accent `sub-100ms semantic search` (gradient clip, slow letter-spacing settle on load).
- Single sub paragraph, max 640px, `--ink-secondary`. **No duplicates.**
- CTAs: filled **"Book Assessment"** + ghost play circle **"See how it works"** → scrolls to capabilities.
- Edge-to-edge dark terminal band pulled up as the hero anchor, bleeding off the bottom edge.
- 2 ambient glows behind the mockup.

### 5C. Section 01 — "Every document becomes intelligence." (SYS/BOOT)
- 12-col grid: text cols 1–5, visual cols 6–12.
- Layered document-stack fan-out (4 layers, stagger 90ms, rotate ±2–6°, soft deep shadows).
- Mono caption `ARCHIVE → OCR → INDEX`.

### 5D. Capability Gallery (replaces broken 04/07) — desktop only
- 500vh wrapper, sticky 100vh stage, LEFT visual frame + RIGHT scrubbed step list.
- Frames crossfade + scale 0.98→1 across 5 × 20% segments.
- Right steps transition 40%→100% opacity; numerals tertiary→sovereign (scrubbed 1:1).
- Persistent `0n / 05` counter + vertical fill rail bound to total progress.
- **Mobile (<1024) & reduced-motion:** static stacked list, per-step Reveal + static visual.

### 5E. Compliance band / marquee
- Black band, pill "SOVEREIGN BY DESIGN", true duplicate-track marquee
  (`translateX(0 → -50%)`, 32s linear infinite), edge fade mask, pause on hover.

### 5F. "The Sovereign Platform…"
- Text cols 1–6; right cols 7–12 radial diagram: DOSSERA CORE node + 5 step nodes,
  dashed SVG connectors that stroke-draw on scroll-into-view (120ms stagger).
- CTA **"Request Deployment Scope"**.
- Metrics 98.2% / <100ms / 8 → hairline cards with eyebrow, mono numeral, caption, hover lift.

### 5G. Capability list + terminal mockup
- Accordion rows; open row highlights matching PFSENSE/PROXMOX/DOSSERA unit LED + green pulse.
- Animated chevron on open/hover, 2px accent left bar on active row.

### 5H. Measured outcomes + testimonials
- Dark band, very slow 40s diagonal sheen; metrics <100ms static, others count-up on view.
- Testimonial drag-carousel: active center 100%, peek cards 92%/55%, snap, arrows+dots+drag share one `goTo(n)`, autoplay 6s / 4s pause after input.

### 5I. Pricing ("Choose how you engage")
- $0 assessment card + tailored full-deployment card (featured: "RECOMMENDED FOR INSTITUTIONS", accent border, CTA **"Request Deployment Quote"**).
- Hover lift + inner glow crossfade.

### 5J. Final CTA + wordmark + footer
- Engraved `DOS / SERA` mark, eyebrow, oversized 3-line title (accent line 2), two CTAs (**"Start Free Assessment"**, **"Request a Live Demonstration"**).
- Giant `dossera` wordmark: GSAP scroll parallax x 0→-60px + entrance fade; top-edge mask.
- Footer minimal text-only.

---

## 6. Interaction State Layer (Phase 2)

- **Primary buttons:** 999px pill, ink fill / canvas text; hover lighten 6% + ambient shadow
  `0 8px 24px -6px`; magnetic follow (spring 150/15, ≤6px); press `scale(0.97)` 120ms.
- **Ghost buttons:** hairline border; hover border→ink, icon circle fills sovereign 12%, icon pulse 1.15.
- **Nav links:** `--ink-secondary`→`--ink-primary` 250ms + left-to-right 1px underline (background-size technique), 320ms premium.
- **Cards (metric/pricing/row/testimonial):** idle hairline + 20px radius + raised fill; hover `translateY(-4px) scale(1.015)` + soft shadow + accent border, 420ms premium.
- **Feature rows:** 88px idle; hover label→ink, numeral→sovereign, chevron `translateX(4px)`, recessed tint; active: 2px accent left bar (top-down), panel `grid-rows 0fr→1fr` + fade.
- **Ticker:** pause on hover (readability of compliance claims).
- **Drag cursor:** 82px ink circle + "DRAG" mono label over draggable tracks.
- **Form inputs (if present):** hairline idle → accent border + 3px sovereign ring on focus; floating labels.

---

## 7. Scroll-Triggered Motion (Phase 3)

| Device | Spec | Status |
|---|---|---|
| Global entrance | `<Reveal/>` (opacity 0→1, y 28→0, 0.9s premium, once, 25%); groups `staggerChildren: 0.09`; eyebrows arrive 100ms early, no drift | ✅ |
| Pinned gallery | GSAP ScrollTrigger scrub, 500vh, crossfading frames, scrubbed steps, progress rail | 🔶 (overlap fix) |
| Document fan-out | 4 layers stagger 90ms, rotate `[-6,-2,2,6]`, scale 0.95→1, 700ms premium | ✅ |
| Carousel | Framer `drag="x"` + snap-to-index, shared `goTo(n)`, autoplay/pause | ✅ |
| Marquee | CSS duplicate-track `translateX(-50%)` 32s linear — **sole linear exception** | ✅ |
| Radial diagram | SVG `stroke-dashoffset` 0→1 over 1.2s, 120ms stagger, premium ease | ✅ |
| Wordmark | GSAP scrub x +24→-70px, watermark opacity 0→0.06, entrance fade; top mask | ✅ |
| Reduced motion | All pinned/scrub/magnetic/marquee gates via `useReducedMotion` / media query | ✅ |

---

## 8. Timing Table (Phase 4 — reference)

| Token | Value | Use |
|---|---|---|
| `--ease-premium` | `cubic-bezier(0.16,1,0.3,1)` | default everywhere |
| `--ease-soft-out` | `cubic-bezier(0.22,1,0.36,1)` | card lifts, crossfades |
| `--ease-snap` | `cubic-bezier(0.34,1.56,0.64,1)` | icon micro-bounces only |
| `--dur-instant` | 120ms | pressed/active |
| `--dur-fast` | 220–280ms | hover color/border shifts |
| `--dur-medium` | 350–420ms | button hover, card hover |
| `--dur-slow` | 600–900ms | `whileInView` entrances |
| marquee | 32s linear | ticker (exception) |
| stagger | 60–180ms | fan-out 60-90 / groups 90-120 / nav 140-180 |

**Rule of thumb:** hovers FAST (220–420ms), scroll storytelling SLOW (600–900ms or scrubbed) — never inverted.
**Forbidden:** `ease` / `ease-in` / `linear` (except marquee), hover durations <150ms or >900ms.

---

## 9. Delivery & Engineering Checklist

- [x] Every string sourced from `content/dosseraLanding.ts` — no inline copy in components.
- [x] Product facts verbatim (98.2% / sub-100ms / 5 VLANs / AES-256 / pfSense+Proxmox / 2–4 weeks / RBAC+immutable audit).
- [x] Build order kept: Header → Hero → DocumentStack → Gallery → Marquee → Platform → List → Outcomes → Testimonials → Pricing → FinalCTA → Footer.
- [x] Responsive: 375 / 768 / 1024 / 1440+; pinned/scrub desktop-only (≥1024) with static fallback.
- [x] Performance: transform+opacity only (+ `stroke-dashoffset`); tiled SVG grain; no layout-triggering animation props.
- [x] `npx tsc --noEmit` clean · `npm run build` clean.
- [x] Grain overlay = fixed SVG turbulence, `mix-blend-mode: overlay`, `opacity: var(--grain-opacity)`, `pointer-events: none`, `z-index: 999`.
- [x] `tailwind.config.js` token mirror — canvas/ink/accent/surface/line, `dz-display`/`dz-body`/`dz-mono`, `ease-premium`, `bg-glow-sovereign` (additive; legacy tokens untouched).
- [x] `.eslintrc.cjs` created (root, TS + react-hooks + react-refresh), `npm run lint` clean under `--max-warnings 0`.
- [x] Dead pre-overhaul components removed (OevraNav, HeroSection, SovereignStoryScene, TrustMarquee, AppIntroSection, CapabilityIndex, StatsWall, TestimonialsCarousel, PricingSection, BigBrandReveal, Marquee, Accordion, ScrambleText, SpotlightCard, useScrollReveal); tsc + build re-verified.
- [ ] In-browser QA sweep (see §10).

---

## 10. Verification Commands

```text
npx tsc --noEmit
npm run build
npm run lint        (after .eslintrc.cjs is added)
npm run dev         (manual QA at http://localhost:5173/oevra-clone)
```

### Manual QA checklist (Phase 10, interaction & polish)
- [ ] Fresh load: no ghosted hero sub, no empty CTA pills, no blank scroll regions.
- [ ] Header crossfade after marker; nav underline draw; magnetic CTA.
- [ ] Hero band bleeds off bottom; next section reveals more of terminal on scroll.
- [ ] Gallery pin: each 100vh segment shows a different visual with NO blank gap between frames; rail fills and counter reaches 05/05.
- [ ] Marquee loops seamlessly at any desktop width; pauses on hover; edge fade visible.
- [ ] Accordion: open row ↔ terminal LED pulse sync (ingest→PFSENSE, ocr→NODE1, semantic→NODE2, govern/rack→DOSSERA).
- [ ] Testimonials: drag momentum + snap; arrows and dots drive same index; autoplay pauses 4s after input; keyboard arrows.
- [ ] Metrics count-up only numeric values; `<100 ms` static.
- [ ] Pricing featured card border + ribbon; hover lift + glow.
- [ ] Final wordmark parallax x-drift + top-edge fade; CTAs open mailto / demo route.
- [ ] 375px / 768px: stacked gallery, hamburger menu, full-width CTAs, no horizontal overflow.
- [ ] `prefers-reduced-motion: reduce`: no GSAP pins, marquee static, cursor native, all content visible.
- [ ] No console errors across the session.

---

## 11. Progress Log

| Date | Action |
|---|---|
| 2026-09-15 | Pre-overhaul phase plans 1–5 completed (old component build) |
| 2026-09-16 | Master-prompt overhaul: content config + full component suite + design system in `oevra.css` built; build green |
| 2026-09-16 | PLAN.md created (this file); remaining: tailwind token mirror, lint config, dead-code removal, gallery crossfade overlap fix, manual QA |
| 2026-09-16 | ✅ tailwind token mirror (sovereign tokens additive) · `.eslintrc.cjs` wired + lint green (fixed `usePointerPosition` deps warning) · 15 dead components removed · gallery crossfades overlapped (no blank frame window) · Header `lastY` removed · hero secondary CTA → Lenis anchor · final wordmark opacity corrected to watermark 0→0.06. `tsc` / `build` / `lint` all clean. Remaining: §10 manual QA |
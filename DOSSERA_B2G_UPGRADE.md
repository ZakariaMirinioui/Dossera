# DOSSERA B2G Website — Phase-by-Phase Upgrade Plan

## Mission
Transform the DOSSERA marketing site from a functional landing page into a premium B2G showcase that commands respect from Moroccan judicial procurement officers, judges, and IT directors. Institutional warmth. 3D presence. Zero AI-pattern clichés.

## Current State (v1)
- 9 sections, ~360 lines, functional but short
- Flat 2D design — institutional color palette (charcoal/parchment/gold)
- Logo at h-8/h-9 reads small
- Architecture section dense but visually flat
- Pain section is 3 small cards
- No 3D/WebGL content
- EN + AR, always dark mode

## Target State (v2)
- 14+ sections with depth, data, and narrative
- 3D architecture visualization (Three.js pipeline + physical archive room)
- AuroraHero full-viewport background on hero section
- 6-card pain section with 3D tilt
- 4 new B2G sections: Use Cases, Compliance, Tech Specs, FAQ
- Scroll progress indicator, staggered animations, micro-interactions
- Logo at h-14/h-16

---

## Phase 0 — Dependencies & Foundation

### Install
```bash
npm install three @react-three/fiber @react-three/drei react-parallax-tilt
```
Adds ~164KB gzipped (Three.js in its own rollup chunk).

### Vite config update
Add `three` to `build.rollupOptions.output.manualChunks` as its own chunk.

### Create PLAN.md
This file.

---

## Phase 1 — Logo Scaling

### Header
- `src/layouts/Website/Header/index.tsx`
- Logo `<img>`: `h-8 md:h-9` → `h-14 md:h-16`
- Adjust nav link spacing to prevent logo crowding

### Footer
- `src/layouts/Website/Footer/index.tsx`
- Logo `<img>`: `h-9 md:h-10` → `h-16 md:h-20`
- Adjust bottom padding

---

## Phase 2 — AuroraHero Component

### New file: `src/components/AuroraHero/AuroraHero.tsx`
- Place the exact code provided by user
- Replace all `green` references with `#0b2e21`
- Change animation from `60s` → `120s` for slower drift

### Integration into `DosseraPage.tsx`
- Mount `<AuroraHero />` inside the hero `<section>` as a background layer
- z-index stacking: AuroraHero behind content, content above with semi-transparent backdrop
- Semi-transparent dark overlay (`#0c0a09` at 60-70% opacity) between aurora and text for readability
- Hero text remains readable with text-shadow

### CSS additions to `index.css`
- `.aurora-bg-container` — absolute fill, z-index 0, overflow-hidden
- `.aurora-overlay` — gradient overlay for readability

---

## Phase 3 — "What We Solve" Expansion

### i18n Copy
- Expand `pain` section in both `dosseraLanding.en.ts` and `.ar.ts`:
  - Add `subtitle`, `cost_stats` (3 stat items with animated values)
  - Add 3 more pain points (total 6): document degradation, knowledge loss, cross-court lookup
  - Each pain point has `_before` and `_after` fields

### Section Restructure
- **Cost stats row:** 3 large numbers (12+ hrs/week, 3-6 months, 74%) with animated counters
- **6-card grid:** 3×2 layout (was 3×1), each with `react-parallax-tilt` 3D hover
- **Before/After format:** Red-strikethrough "before", accent-emphasized "after"
- **Staggered reveal:** framer-motion `whileInView` with staggerChildren

---

## Phase 4 — "Built for Judicial Scale" Expansion

### i18n Copy
- Add `spotlight`, `telemetry_*`, `deployment_*` fields to `architecture`

### 3D Pipeline Visualization
- `<Canvas>` from `@react-three/fiber` below section title
- Animated document particles flowing through: Upload → OCR → Semantic/Keyword split
- `TubeGeometry` paths with traveling points in gold accent
- Color palette matches brand: `#a0894b` gold, `#0c0a09` dark, `#f0ece4` light

### Physical Archive 3D Room
- Three.js scene: stylized archive shelves
- `BoxGeometry` shelves showing Blocks → Rows → Sections hierarchy
- Interactive hover highlights the digital-to-physical link
- OrbitControls for exploration

### Live Telemetry Panel
- Terminal/CLI-style card below architecture detail
- JetBrains Mono font, gold-on-dark aesthetic
- Animated counters for documents processed, searches

### Interactive arch-steps
- Each `.arch-step` gets `whileHover={{ scale: 1.02, x: 4 }}`

---

## Phase 5 — B2G Content Sections

### 5a. Use Cases by Institution Type
- 3 cards: Small Court (1-10 clerks), Large Court (10-50), Ministry (50+)
- Each has: document volume, search needs, compliance requirements
- Icons: `Building2`, `Scale`, `Landmark` from lucide-react

### 5b. Compliance & Standards Wall
- Badge grid: Moroccan Law 09-08, GDPR, ISO 27001 (in progress), CNIL-equivalent
- Honest status labels: "Compliant", "In Progress", "Architecture-aligned"
- Shield icons, hover reveals detail card

### 5c. Technical Specifications
- `<details>` / `<summary>` accordion for IT procurement officers
- Sections: Hardware, Software Stack, Network, Security, Backup
- No extra dependencies — native HTML with custom styling

### 5d. FAQ
- 6-8 B2G questions: deployment timeline, data migration, training, SLA, hardware
- `<details>` / `<summary>` styled with accent borders
- Schema.org FAQ structured data for SEO

---

## Phase 6 — Hero Overhaul

- AuroraHero renders behind the hero section content
- Add text-shadow and backdrop to hero text for readability against aurora
- Subtle parallax: hero content moves slower than scroll (framer-motion `useScroll` + `useTransform`)
- CTA buttons get subtle glow pulse on hover

---

## Phase 7 — B2G Detail & Polish

### Expand Sovereign Comparison
- Add 2 more rows (total 5): Pricing Model, Data Portability
- Animated transition between panels

### TCO Comparator
- Simple 2-column: Cloud vs DOSSERA on-premise
- Items: License, Hardware, Bandwidth, Compliance, Migration

### Footer
- Privacy Policy + Terms of Service placeholder links
- Dynamic copyright year
- "Built with JAMS v1.9.0" badge

### Header
- Scroll progress indicator (thin accent line at top)

---

## Phase 8 — Animation Layer

- Page load: staggered entry for above-fold content
- Section transitions: each section animates in with `whileInView`
- Card micro-interactions: 3D tilt on hover (react-parallax-tilt)
- Number counters animate on scroll (framer-motion or requestAnimationFrame)
- All animations respect `prefers-reduced-motion: reduce`

---

## Phase 9 — Cleanup & Build

### Remove unused
- `src/pages/Home/DosseraImageMatchPage.tsx` (not routed)
- `src/layouts/Website/index.tsx` (not imported)
- `src/i18n/copy/dosseraLanding.fr.ts` + `src/i18n/locales/fr/`
- Empty dirs: `CursorGlow/`, `ui/`
- Unused hooks: `useCursorGlow.ts`, `useMagneticHover.ts`

### Build verification
- `npm run build` — zero TS/Vite errors
- Test: EN/AR switch, RTL layout, mobile responsive, form submit
- Verify Three.js is in separate rollup chunk
- Verify all `prefers-reduced-motion` fallbacks
- Verify no broken imports or missing translations

---

## Chunk Strategy

```javascript
rollupOptions: {
    output: {
        manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            i18n: ['i18next', 'react-i18next'],
            motion: ['framer-motion'],
            three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
    },
},
```

## Design Principles
1. **No AI patterns:** No gradient blobs, glassmorphism, cursor glow, red accents, one-sided borders
2. **Institutional warmth:** Charcoal (#0c0a09) + parchment (#f0ece4) + gold (#a0894b)
3. **Content-first:** 3D enhances understanding, never distracts
4. **Honest:** Real version numbers, real deployment status, real limitations
5. **Resilient:** All animations degrade gracefully, no-jank scroll, RTL everywhere

# DOSSERA — Master Plan

> **DOSSERA** (DOSsier SERvice Automatique) deploys sovereign document intelligence inside judicial and notarial institutions. On-premise, Arabic-first, compliance-native.

---

## Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Stack](#2-architecture--stack)
3. [Phase 0 — Foundation & Fixes](#3-phase-0--foundation--fixes)
4. [Phase 1 — DOSSERA Landing Page](#4-phase-1--dossera-landing-page)
5. [Phase 2 — Component Architecture](#5-phase-2--component-architecture)
6. [Phase 3 — Archive Atmosphere & UX](#6-phase-3--archive-atmosphere--ux)
7. [Phase 4 — Internationalization (i18n)](#7-phase-4--internationalization-i18n)
8. [Phase 5 — Booking & Forms](#8-phase-5--booking--forms)
9. [Phase 6 — Deployment & Offline](#9-phase-6--deployment--offline)
10. [Critical Rules](#10-critical-rules)
11. [File Map](#11-file-map)

---

## 1. Project Overview

**Goal** — Build and ship a standalone enterprise-grade DOSSERA landing website showcasing JAMS (Judicial Archive Management System).

**Domain** — `dossera.surge.sh` (initial), possibly Vercel later.

**Languages** — Ship English & French first. Arabic in v1.1.

**Owner** — Zakaria Mirinioui (solo senior engineer / developer).

---

## 2. Architecture & Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript (strict mode) |
| Build | Vite 5 + `vite-plugin-tsconfig-paths` |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Routing | React Router DOM 6 |
| i18n | i18next + react-i18next |
| Animation | Framer Motion + CSS transitions |
| Icons | Lucide React + `@iconify/react` |
| Analytics | Firebase (optional, env-gated) |
| Forms | Formspree (fetch-based submission) |
| Fonts | Inter, Syne, JetBrains Mono, DM Serif Display, DM Sans |

### Conventions

- `noUnusedLocals: true`, `noUnusedParameters: true`, `strict: true` in tsconfig
- Named exports for components (`export const DosseraX` + `export default`)
- CSS classes use `dossera-` prefix for DOSSERA-specific styles
- Translation keys use `dosseraLanding.` namespace
- All components in `src/components/dossera/`
- Hooks in `src/hooks/` (reusable, framework-agnostic where possible)

---

## 3. Phase 0 — Foundation & Fixes

### Done
- Vite port changed from 3000 → 5173 (Windows EACCES fix)
- `.env.local` created with Formspree + Firebase config
- `index.html` favicon updated to SVG
- `vite-plugin-tsconfig-paths` moved to `devDependencies`
- DOSSERA-only Header & Footer in progress
- Portfolio route references removed

### Key Decisions
- Use `useReveal<T>()` hook (returns ref, observes intersection, adds `visible` class) instead of `useObserveOnScroll` / `useObserveElement`
- `useCursorGlow(ref)` expects `RefObject<HTMLElement | null>`
- `useMagneticHover<T>(strength)` returns `RefObject<T>`

---

## 4. Phase 1 — DOSSERA Landing Page

**File:** `src/pages/Home/DosseraPage.tsx` (main), `src/pages/Home/DosseraBookingForm.tsx`

### Sections (top to bottom)
1. **Hero** — Full-viewport with eyebrow, headline, continuation, description, CTAs
2. **Pain Points** — 3-column grid of before/after cards
3. **Services** — Asymmetric 6-card grid with animated border trace
4. **How It Works** — 4-step timeline (desktop: horizontal, mobile: vertical)
5. **Why Sovereign** — Side-by-side comparison ("others" vs "DOSSERA")
6. **Proof** — Metric panels with before/after data
7. **Who We Serve** — Morocco + Italy market cards
8. **Booking** — Premium form section with cursor glow
9. **Footer** — Contact + credit

All sections are currently defined inline in `DosseraPage.tsx` and work without importing from `src/components/dossera/`.

---

## 5. Phase 2 — Component Architecture

### Component Files (`src/components/dossera/`)

| File | Component | Status |
|---|---|---|
| `Hero.tsx` | `DosseraHero` | Fix hook usage, CSS classes, translation keys |
| `PainPoints.tsx` | `DosseraPainPoints` | Fix import paths, hook usage, CSS classes |
| `Services.tsx` | `DosseraServices` | Fix import paths, hook usage, CSS classes |
| `HowItWorks.tsx` | `DosseraHowItWorks` | Fix hook usage, CSS classes |
| `Sovereign.tsx` | `DosseraSovereign` | Fix hook usage, CSS classes |
| `Proof.tsx` | `DosseraProof` | Fix import, hook usage, CSS classes |
| `Serve.tsx` | `DosseraServe` | Fix hook usage, CSS classes |
| `Booking.tsx` | `DosseraBooking` | Fix CSS classes, translation keys |
| `ArchiveBackground.tsx` | `DosseraArchiveBackground` | Pure presentational, no changes needed |
| `MagneticDosseraCard.tsx` | `MagneticDosseraCard` | OK (used as reusable card wrapper) |

### Known Issues (all in `dosera/` files — typo directory)
1. Directory is named `dosera/` (one 's') instead of `dossera/` (two 's')
2. Import paths reference `./MagneticDoseraCard` (one 's') but file is `MagneticDosseraCard.tsx`
3. Component JSX uses `MagneticDoseraCard` instead of `MagneticDosseraCard`
4. `useObserveElement(ref)` is called with `RefObject` but expects `HTMLElement | null`
5. `useObserveOnScroll(ref)` is called with a ref argument but expects 0 args
6. CSS classes use `dosera-` prefix instead of `dossera-`
7. Translation keys use `doseraLanding.` instead of `dosseraLanding.`

### Fix Plan
```
1. Rename directory: dosera/ → dossera/
2. Fix imports:  ./MagneticDoseraCard → ./MagneticDosseraCard
3. Fix component names: MagneticDoseraCard → MagneticDosseraCard
4. Replace useObserveElement/useObserveOnScroll with useReveal
5. Replace all dosera- → dossera- in CSS classes
6. Replace all doseraLanding. → dosseraLanding. in t() calls
```

---

## 6. Phase 3 — Archive Atmosphere & UX

- `ArchiveBackground.tsx` — Ambient gradient + grid overlay
- `useCursorGlow` — Red radial spotlight following mouse on dark sections
- `useMagneticHover` — Subtle 3D tilt on glass cards
- `.glass-card` system — Backdrop blur, border, hover elevation
- `.service-card` — Animated conic border trace on hover (`@property --angle`)
- `.reveal` / `.reveal-group` — IntersectionObserver-based blur-in entrance
- Dark/light mode via `[data-theme]` attribute on `<html>`

### Priority
- [ ] Tests for reveal system on mobile/safari
- [ ] Reduced-motion query respected throughout
- [ ] Cursor glow sections: hero + sovereign + booking

---

## 7. Phase 4 — Internationalization (i18n)

### Config: `src/i18n/config.ts`
- Uses `i18next` + `react-i18next`
- Loads base translations from `locales/{en,fr}/translation.json`
- Loads DOSSERA copy from `copy/dosseraLanding.{en,fr}.ts`
- Reads `localStorage.getItem('language')` or browser language
- Falls back to English

### Translation Files
- `src/i18n/copy/dosseraLanding.en.ts` — English (142 entries)
- `src/i18n/copy/dosseraLanding.fr.ts` — French (143 entries)
- Namespace: `dosseraLanding.*`

### Future
- [ ] Arabic (v1.1) — RTL layout support
- [ ] Italian (v1.2)
- [ ] Language switcher UI component

---

## 8. Phase 5 — Booking & Forms

### Formspree Integration
- **End point:** `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne`
- **Account:** zikomirinioui@gmail.com
- **Handling:** Async fetch with idle/sending/success/error states
- **Fields:** Institution, Role, Email, Phone (optional), Message

### Form Component
Two implementations exist:
1. `DosseraBookingForm.tsx` — imported and used by `DosseraPage.tsx` (works)
2. `Booking.tsx` — standalone component in `dossera/` (needs fixes)

---

## 9. Phase 6 — Deployment & Offline

### Steps
- [ ] Fix all TypeScript errors → clean `npm run build`
- [ ] Configure `vercel.json` for SPA routing (already exists)
- [ ] Deploy to Surge: `dossera.surge.sh`
- [ ] Add Service Worker for offline support
- [ ] Verify Formspree submissions in production

### Build Command
```bash
npm run build    # runs tsc && vite build
```

### Environment Variables (`.env.local`)
```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_SITE_URL=http://localhost:5173
VITE_PORTFOLIO_URL=https://zakaria-mirinioui-portfolio.surge.sh
```

---

## 10. Critical Rules

1. **Standalone DOSSERA site** — not a portfolio page. Routes are DOSSERA-only.
2. **No AI-regenerated patterns** — use ready components (Framer Motion, Lucide).
3. **Archive styling theme** — dark, gold/red accents, frosted glass panels.
4. **RTL-ready** — prepare for Arabic in all layout decisions.
5. **Enterprise-grade UX** — offline support, accessibility, reduced motion.
6. **No comments in production code** — code is self-documenting.
7. **Firebase analytics is optional** — gated by `firebaseConfig.projectId`.

---

## 11. File Map

```
Dossera/
├── .env.local                  # Environment variables (local only)
├── index.html                  # Vite entry HTML
├── package.json                # Dependencies + scripts
├── tsconfig.json               # TypeScript config with path aliases
├── vite.config.ts              # Vite config with tsconfig-paths
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
├── vercel.json                 # Vercel deployment config
├── MASTERPLAN.md               # This file
│
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Root component (Firebase init + routes)
│   ├── index.css               # Global styles + DOSSERA design system
│   │
│   ├── routes/
│   │   └── index.tsx           # BrowserRouter + Routes (DOSSERA-only)
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── DosseraPage.tsx       # Main landing page (all sections inline)
│   │   │   └── DosseraBookingForm.tsx # Booking form component
│   │   └── NotFound.tsx               # 404 page
│   │
│   ├── components/
│   │   ├── dossera/                  # DOSSERA section components (Phase 2)
│   │   │   ├── Hero.tsx
│   │   │   ├── PainPoints.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Sovereign.tsx
│   │   │   ├── Proof.tsx
│   │   │   ├── Serve.tsx
│   │   │   ├── Booking.tsx
│   │   │   ├── ArchiveBackground.tsx
│   │   │   └── MagneticDosseraCard.tsx
│   │   ├── ui/                       # Shared UI primitives (future)
│   │   └── NProgressSuspense/        # Suspense fallback with nprogress
│   │
│   ├── hooks/
│   │   ├── useReveal.ts              # IntersectionObserver + visible class
│   │   ├── useObserveOnScroll.ts     # Legacy (useReveal preferred)
│   │   ├── useObserveElement.ts      # Legacy (useReveal preferred)
│   │   ├── useCursorGlow.ts          # Red spotlight on mouse position
│   │   ├── useMagneticHover.ts       # 3D tilt on hover
│   │   ├── useTheme.ts               # Dark/light mode
│   │   ├── useIntersectionReveal.ts  # Legacy
│   │   ├── useCountUp.ts             # Number animation
│   │   └── useActiveSection.ts       # Scroll-spy
│   │
│   ├── i18n/
│   │   ├── config.ts                 # i18next initialization
│   │   ├── locales/
│   │   │   ├── en/translation.json   # Base English translations
│   │   │   └── fr/translation.json   # Base French translations
│   │   └── copy/
│   │       ├── dosseraLanding.en.ts  # DOSSERA English copy
│   │       └── dosseraLanding.fr.ts  # DOSSERA French copy
│   │
│   ├── layouts/                      # Layout components (future)
│   ├── config/                       # App config (future)
│   ├── lib/                          # Utility functions (future)
│   └── styles/                       # Additional styles (future)
│
└── dist/                             # Build output (deployed)
```

---

## Immediate Next Steps

1. **Fix `dosera/`→`dossera/` directory and all file issues**
2. **Clean `npm run build`** — zero errors
3. **Refactor `DosseraPage.tsx`** to import section components from `dossera/`
4. **Deploy to Surge** for review
5. **Add Service Worker** for offline support
6. **Arabic translation & RTL** (v1.1)

# DOSSERA

<p align="center">
  <a href="https://dossera.surge.sh/" target="_blank" rel="noopener noreferrer">
    <img src="public/dossera-logo-LightMode.png" alt="Dossera" width="320">
  </a>
</p>

<p align="center">
  <a href="https://dossera.surge.sh/"><strong>Visit the website →</strong></a>
</p>

<hr>

**Sovereign document intelligence for judicial institutions.**

DOSSERA is a multilingual website for a judicial document and archive management
platform. It is a client-side React application built with TypeScript and Vite.

## Application

- English and French content with language selection
- Product, solutions, architecture, specifications, security, white-paper, and demo-request pages
- Responsive layouts and motion-enhanced interactions
- An alternate visual concept at `/oevra-clone`

The demo-request form currently displays a client-side confirmation; it is not
connected to a submission service.

## Technology

- React 18, TypeScript, and Vite
- React Router for client-side routes
- Tailwind CSS and page-scoped CSS
- i18next and react-i18next for translations
- Framer Motion, GSAP, and Lenis for animation and scrolling
- Firebase Analytics initialization is optional

## Getting started

**Requirements:** Node.js 18 or newer and npm.

```bash
npm ci
npm run dev
```

Vite prints the local development URL when the server starts.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run check` | Run TypeScript and ESLint checks |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Configuration

Copy `.env.example` to `.env.local` only if configuring optional Firebase
Analytics. Set `VITE_FIREBASE_PROJECT_ID` to enable initialization; provide the
remaining Firebase values for the project as needed. Environment files are
ignored by Git.

## Repository layout

```text
public/                 Static images and icons
src/
  components/           Shared UI components
  hooks/                Shared React hooks
  i18n/                 Translation setup and locale content
  layouts/              Shared page layouts
  pages/                Route-level pages and page-specific components
  routes/               Client-side route definitions
docs/
  deployment/           Current deployment instructions
  plans/                Project implementation plans
  archive/              Superseded guides and reference material
```

## Documentation

- [Deployment guide](docs/deployment/surge.md)
- [Documentation index](docs/README.md)
- [Implementation plans](docs/plans/)
- [Archived material](docs/archive/README.md)

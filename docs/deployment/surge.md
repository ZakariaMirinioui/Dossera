# Deploy to Surge

The production site is hosted at [dossera.surge.sh](https://dossera.surge.sh/).

## Requirements

- Node.js 18 or newer
- npm
- A Surge account

## Build and deploy

From the repository root:

```bash
npm ci
npm run check
npm run build
```

Surge uses `200.html` as the single-page-app fallback. Copy the generated
`dist/index.html` to `dist/200.html` before deploying:

```powershell
Copy-Item dist/index.html dist/200.html
```

Install and authenticate the Surge CLI if needed, then deploy:

```bash
npm install --global surge
surge login
surge dist dossera.surge.sh
```

For subsequent releases, repeat the checks, build, fallback copy, and deploy
commands. Confirm the home page and client-side routes load on the production
domain after deployment.

## Local production preview

To preview the Vite build locally:

```bash
npm run preview
```

This local preview does not replace verification of Surge's production fallback
behavior.

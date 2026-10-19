# Archived: DOSSERA Website Setup Guide

This setup checklist describes an earlier project bootstrap and is retained for
historical reference. Follow the current [Surge deployment guide](../../deployment/surge.md)
and root [README](../../../README.md) instead.

This is a **production-ready DOSSERA website** separated from the portfolio. Deploy to **Vercel**.

## ✅ Completed Files

- ✅ Config: `package.json`, `tsconfig.json`,`vite.config.ts`, `tailwind.config.js`, `vercel.json`
- ✅ Hooks: `useTheme`, `useMagneticHover`, `useCursorGlow`, `useReveal`, `useActiveSection`, `useCountUp`
- ✅ i18n: English & French translations, DOSSERA copy files
- ✅ Components: `LanguageSwitcher`, `NProgressSuspense`
- ✅ Core: `App.tsx`, `main.tsx`, `routes`, `NotFound` page
- ✅ Forms: `DosseraBookingForm.tsx` with environment variables

## 📋 Remaining Steps

### 1. **Copy DOSSERA Page Component**
```bash
# From: miriniouizakariaofficiel/src/pages/Dossera/index.tsx 
# To: dossera-website/src/pages/Home/DosseraPage.tsx
```

Use the existing component from the monorepo (it's fully configured and tested).

### 2. **Copy Styling & Layout Files**

**Copy exact as-is:**
```bash
# Source → Destination
miriniouizakariaofficiel/src/index.css → dossera-website/src/index.css
miriniouizakariaofficiel/src/layouts/Website/Header/index.tsx → dossera-website/src/layouts/Website/Header/index.tsx
miriniouizakariaofficiel/src/layouts/Website/Footer/index.tsx → dossera-website/src/layouts/Website/Footer/index.tsx
miriniouizakariaofficiel/src/layouts/Website/index.tsx → dossera-website/src/layouts/Website/index.tsx
```

**Update Header to remove portfolio nav:**
- Remove "Home" link (only show "← Back to Portfolio" button at top-left)
- Keep only DOSSERA section nav: Solve, Services, How, Book
- Keep language switcher and theme toggle
- Keep dark/light theme styling

### 3. **Create HTML Entry Point**

Create `dossera-website/index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOSSERA - Sovereign Document Intelligence</title>
    <meta name="description" content="DOSSERA: On-premise document intelligence for legal institutions. Arabic-first, compliance-native." />
    <meta property="og:title" content="DOSSERA - Sovereign Document Intelligence" />
    <meta property="og:description" content="Deploy sovereign document intelligence inside your institution." />
    <meta property="og:url" content="https://dossera.vercel.app" />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 4. **Environment Variables**

Create `dossera-website/.env.local`:
```bash
# Formspree form endpoint
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne

# Portfolio for linking back
VITE_PORTFOLIO_URL=https://zakaria-mirinioui-portfolio.surge.sh

# your domain
VITE_SITE_URL=https://dossera.vercel.app

# Firebase (optional - leave blank if not needed)
# VITE_FIREBASE_API_KEY=...
# etc.
```

### 5. **Install & Test Locally**

```bash
cd dossera-website
npm install
npm run dev
# Visit http://localhost:3000
```

### 6. **Deploy to Vercel**

```bash
npm run build  # Test build locally first
# Then push to GitHub and connect to Vercel
```

---

## 🔗 Cross-Linking Strategy

### From DOSSERA → Portfolio
- Footer has "Back to Portfolio" link pointing to `VITE_PORTFOLIO_URL`
- Header top-left has "← Back to Portfolio" link

### From Portfolio → DOSSERA
- Replace all `/dossera` route links with external URL: `https://dossera.vercel.app`
- Update "DOSSERA" nav link to external URL
- Keep "Book a Call" button on portfolio linking to DOSSERA

---

## 📁 File Structure

```
dossera-website/
├── public/
├── src/
│  ├── pages/
│  │  ├── Home/
│  │  │  ├── DosseraPage.tsx (← COPY FROM MONOREPO)
│  │  │  └── DosseraBookingForm.tsx ✅
│  │  └── NotFound.tsx ✅
│  ├── layouts/
│  │  └── Website/
│  │     ├── Header/index.tsx (← COPY & UPDATE)
│  │     ├── Footer/index.tsx (← COPY & UPDATE)
│  │     └── index.tsx (← COPY & UPDATE)
│  ├── components/ ✅
│  ├── hooks/ ✅
│  ├── i18n/ ✅
│  ├── routes/index.tsx ✅
│  ├── App.tsx ✅
│  ├── main.tsx ✅
│  ├── index.css (← COPY)
│  └── vite-env.d.ts ✅
├── index.html (← CREATE)
├── package.json ✅
├── vite.config.ts ✅
├── tsconfig.json ✅
├── vercel.json ✅
└── .env.local (← CREATE with secrets)
```

---

## ⚠️ Important Notes

1. **Secrets**: Never commit `.env.local` — add to `.gitignore`
2. **Formspree**: The form endpoint is configured in `.env.local` (not hardcoded)
3. **Portfolio Link**: Uses environment variable `VITE_PORTFOLIO_URL` (not hardcoded)
4. **Styling**: All DOSSERA-specific CSS is preserved from original
5. **i18n**: EN/FR translations configured and ready

---

## 🎯 Next Steps

1. Copy the DOSSERA page component
2. Copy and update layout files
3. Create `index.html`
4. Create `.env.local` with production secrets
5. Run `npm install && npm run build`
6. Deploy: `vercel`

---

**Questions?** See the current [Surge deployment guide](../../deployment/surge.md).

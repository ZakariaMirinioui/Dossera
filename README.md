# DOSSERA - Sovereign Document Intelligence Platform

Deploy sovereign document intelligence inside your institution.

**No cloud. No compromise. No data leaving your walls.**

---

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
# Opens http://localhost:3000
```

### Build

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
# Push to GitHub, then:
vercel
# Or use Vercel dashboard to auto-deploy from Git
```

---

## 📋 Environment Variables

Create `.env.local` in project root:

```bash
# Formspree contact form
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne

# Linking back to portfolio
VITE_PORTFOLIO_URL=https://zakaria-mirinioui-portfolio.surge.sh

# Your domain
VITE_SITE_URL=https://dossera.vercel.app
```

**Never commit `.env.local`** — it's in `.gitignore`

---

## 📁 Project Structure

```
src/
├── pages/
│  ├── Home/
│  │  ├── DosseraPage.tsx      # Main landing page
│  │  └── DosseraBookingForm.tsx # Discovery call form
│  └── NotFound.tsx
├── layouts/
│  └── Website/
│     ├── Header/index.tsx     # Navigation & theme toggle
│     ├── Footer/index.tsx     # Footer with links
│     └── index.tsx            # Layout wrapper
├── components/
│  ├── LanguageSwitcher/       # EN/FR toggle
│  └── NProgressSuspense/      # Page load indicator
├── hooks/                     # useTheme, useMagneticHover, etc.
├── i18n/                      # Translations (EN/FR)
├── routes/                    # Route configuration
├── App.tsx
├── main.tsx
├── index.css                  # Global styles + DOSSERA-specific
└── vite-env.d.ts
```

---

## 🌐 Languages Supported

- 🇬🇧 English
- 🇫🇷 French
- Browser language auto-detection
- Manual toggle in header

---

## 🎨 Design Features

- **Dark-first** with light mode toggle
- **Responsive** mobile/tablet/desktop  
- **Accessibility** WCAG 2.1 compliant
- **Performance** optimized images, code splitting
- **SEO** structured data, meta tags

---

## 📞 Contact Form

- Powered by **Formspree**
- Fields: Institution, Role, Email, Phone, Message
- Auto-replies enabled
- Webhook support (optional)

---

## 🔗 Cross-Linking

**From DOSSERA:**
- "← Back to Portfolio" link in header
- "Back to Portfolio" link in footer

**From Portfolio:**
- "Book a Call" external link to DOSSERA
- All internal `/dossera` routes redirect to external Vercel URL

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: React Router 6
- **i18n**: i18next + React-i18next
- **Forms**: Formspree
- **Animations**: Framer Motion
- **Deploy**: Vercel

---

##⚠️ Important Notes

1. **Secrets**: All sensitive values in `.env.local` (not versioned)
2. **Forms**:  Formspree endpoint must match form ID in config
3. **Styling**: All CSS is merged into `src/index.css`
4. **Hooks**: Reusable animation & interaction utilities
5. **Production**: minified, optimized build

---

## 📚 Documentation

- [SETUP.md](./SETUP.md) — Initial project setup
- [DOSSERA_DEPLOYMENT.md](./DOSSERA_DEPLOYMENT.md) — Deployment guide

---

## 📞 Support

**Questions?** Contact: zakmirinioui@gmail.com

**Portfolio**: https://zakaria-mirinioui-portfolio.surge.sh

---

**Built by Zakaria Mirinioui** — Khouribga, Morocco

# 🚀 DOSSERA Deployment Guide - Vercel

Deploy your DOSSERA website to **Vercel** — the optimal platform for React apps.

---

## 📋 Prerequisites

1. **Node.js** installed locally
2. **GitHub repository** (Vercel integrates with Git)
3. **Vercel account** (free - sign up at vercel.com)

---

## 🔧 Deployment Steps

### Option A: **Vercel CLI (Fastest)**

```bash
cd dossera-website
npm install

# Install Vercel CLI globally
npm install --global vercel

# Deploy
vercel
```

Follow prompts:
- Link to existing project or create new
- Name your project: `dossera`
- Select framework: Next.js (or React)
- Deploy

You're done! Vercel auto-generates a `.vercel` folder.

---

### Option B: **GitHub Integration (Recommended)**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Separate DOSSERA from portfolio"
   git push origin main
   ```

2. **Connect Vercel to GitHub**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Configure build settings:
     - **Framework**: Vite (auto-detected)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add:
     ```
     VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne
     VITE_PORTFOLIO_URL=https://zakaria-mirinioui-portfolio.surge.sh
     VITE_SITE_URL=https://dossera.vercel.app
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel auto-builds and deploys

---

## ✅ Verify Deployment

Visit: **[https://dossera.vercel.app](https://dossera.vercel.app)**

Test:
- ✅ Landing page loads
- ✅ All sections visible (Problem, Services, How, Proof, Markets, Booking)
- ✅ Navigation works
- ✅ Language toggle (EN/FR) works
- ✅ Theme toggle (dark/light) works
- ✅ Forms submit successfully
- ✅ "← Back to Portfolio" link opens portfolio site
- ✅ No console errors

---

## 🔄 Continuous Deployment (Auto-Deploy)

With GitHub integration:
- Push code to `main` branch
- Vercel automatically:
  - Installs dependencies
  - Runs `npm run build`
  - Deploys to production

You never manually deploy again! 🎉

---

## 📝 Environment Variables

Create `dossera-website/.env.local` for local development:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne
VITE_PORTFOLIO_URL=https://zakaria-mirinioui-portfolio.surge.sh
VITE_SITE_URL=https://dossera.vercel.app
```

For production, add these in Vercel Dashboard → Environment Variables (they're encrypted).

---

## 🎯 Custom Domain

### Option 1: Use Vercel Domain

Vercel assigns:
- **Primary**: `dossera.vercel.app`
- **Automatic HTTPS**: ✅ Yes
- **CDN**: ✅ Yes

### Option 2: Custom Domain

If you own `dossera.io`:

1. In Vercel Dashboard → Project Settings → Domains
2. Add custom domain: `dossera.io`
3. Update DNS records:
   - Add `A` record pointing to Vercel IP
   - Or add `CNAME` to `cname.vercel.sh`
4. Wait for DNS propagation (~5mins)

---

## 🔍 Monitoring & Analytics

In Vercel Dashboard:
- **Deployments**: View all deployments & logs
- **Performance**: Real-time metrics
- **Analytics**: Page views, bounce rate
- **Error Tracking**: Console errors and exceptions

---

## 🚀 Rollback a Deployment

If something goes wrong:

1. Vercel Dashboard → Project → Deployments
2. Find previous working deployment
3. Click "Redeploy"

Done! Site rollsback instantly.

---

## 📊 Performance Tips

Vercel automatically:
- ✅ Minifies code
- ✅ Compresses images
- ✅ Code splits React components
- ✅ Serves from CDN (200+ regions)
- ✅ Enables gzip compression

Your site will be **blazing fast**! 🚄

---

## 🚨 Troubleshooting

### **Build Fails: "Module not found"**

```bash
# Locally:
npm install
npm run build

# Push to GitHub and redeploy
git push origin main
```

### **Form Submissions Not Working**

1. Verify `VITE_FORMSPREE_ENDPOINT` env var is set
2. Check Formspree form ID is correct
3. Test locally: `npm run dev`

### **Slow Deployment**

- First deploy might take 2-3 minutes
- Subsequent deploys: ~30 seconds
- If stuck, check "Deployments" tab for logs

### **Environment Variables Not Loading**

```bash
# Make sure they're added to Vercel Dashboard (not just comment in build)
# Try redeploying after updating env vars
vercel --prod
```

---

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Build succeeds locally (`npm run build`)
- [ ] All pages load at https://dossera.vercel.app
- [ ] Forms submit successfully
- [ ] Links to portfolio work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Light/dark theme works
- [ ] EN/FR languages work

---

## 🔗 Links

- **DOSSERA**: https://dossera.vercel.app
- **Portfolio**: https://zakaria-mirinioui-portfolio.surge.sh
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: [your-repo-url]
- **Contact**: zakmirinioui@gmail.com

---

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev (localhost:3000) |
| `npm run build` | Create optimized `dist/` |
| `npm run preview` | Test production build locally |
| `vercel` | Deploy via CLI |
| `vercel --prod` | Deploy to production URL |

---

**Next:** [See Portfolio Deployment](../miriniouizakariaofficiel/PORTFOLIO_DEPLOYMENT.md)

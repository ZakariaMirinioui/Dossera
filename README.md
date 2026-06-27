# DOSSERA Website

DOSSERA - Sovereign Document Intelligence Platform

## Overview

This is a professional landing page for DOSSERA, an enterprise-grade document intelligence platform designed for judicial institutions. Built with React, TypeScript, and Vite, this site showcases DOSSERA's capabilities for on-premise document processing, Arabic/French semantic search, and compliance-native operations.

## Key Features

- **Archive-Styled Design**: Professional atmosphere with groove backgrounds and accent lines
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Multi-Language**: English and French support (Arabic coming in v1.1)
- **Smooth Animations**: Magnetic hover effects, cursor glow, and scroll reveals
- **Enterprise-Grade Performance**: Code splitting, lazy loading, optimized assets
- **Form Integration**: Built-in Formspree contact form for discovery calls

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS, custom design system
- **Animation**: Framer Motion
- **Routing**: React Router Dom
- **Internationalization**: react-i18next
- **Icons**: Lucide-react

## Project Architecture

```
src/
├── components/
│   ├── ui/                    # Primitive components
│   ├── layout/               # Layout components
│   ├── dossera/              # DOSSERA-specific components
│   │   ├── Hero/
│   │   ├── PainPoints/
│   │   ├── Services/
│   │   ├── HowItWorks/
│   │   ├── Sovereign/
│   │   ├── Proof/
│   │   ├── Serve/
│   │   ├── Booking/
│   │   └── ArchiveBackground/
│   └── common/               # Shared utilities
├── hooks/                    # Custom hooks
├── lib/                      # Utilities
├── styles/                   # Global styles
└── pages/                   # Page components
```

## Development

### Prerequisites
- Node.js 18+
- npm/yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run check
```

### Linting
```bash
npm run lint
```

## Features Showcase

### Hero Section
- Full-screen hero with scroll-reactive background atmosphere
- Animated text reveals on scroll
- Primary/secondary CTAs for booking calls

### Pain Points Section
- Archive card grid with magnetic hover effects
- Before/after comparison highlighting DOSSERA's benefits
- Coded in TypeScript with proper typing

### Services Section
- Asymmetric grid layout
- Animated border traces on hover
- Service icons with descriptions

### How It Works
- Timeline component with desktop/mobile support
- Step-by-step process visualization

### Sovereign Section
- Split comparison panel
- Archive-like presentation with left accent border

### Proof Section
- Metric cards with values and contexts
- Glassmorphic styling

### Who We Serve
- Market cards for Morocco and Italy
- Client list with accent dots

### Booking Section
- Premium form with material-inspired design
- Real-time validation states
- Formspree integration for discovery calls

## Design System

### Colors
- **Primary Red**: #e63946 (DOSSERA brand color)
- **Dark Theme**: #0a0a0a, #111111, #1a1a1a
- **Light Theme**: #f7f5f2, #efece8, #e5e1dc
- **Gold**: #c9a84c (for emphasis)

### Typography
- **Display**: Syne (for headings)
- **Body**: Inter (for readability)
- **Mono**: JetBrains Mono (for technical content)

### Components
- **Glass Cards**: Frosted glass effect with border
- **Magnetic Cards**: Cards that follow cursor on hover
- **Reveal Elements**: Blur-in materialize animations
- **Cursor Glow**: Red radial gradient spotlight

## Performance Optimizations

- **Code Splitting**: Lazy load components
- **Bundle Analysis**: ManualChunks for vendor libraries
- **Image Optimization**: WebP/AVIF formats
- **Tree Shaking**: Remove unused code
- **Preload Critical Resources**: Essential fonts and CSS

## Accessibility

- **WCAG 2.1 AA Compliant**
- **Semantic HTML5**
- **ARIA Labels**
- **Keyboard Navigation**
- **Screen Reader Support**
- **Reduced Motion Support**
- **High Contrast Mode**

## Internationalization

### Supported Languages
- **English**: en (default)
- **French**: fr
- **Arabic**: ar (planned for v1.1)

### Translation Management
- i18next with react-i18next integration
- JSON translation files
- Language switching via LanguageSwitcher component

## Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpejbne
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_SITE_URL=https://dossera.vercel.app
VITE_PORTFOLIO_URL=https://zakaria-mirinioui-portfolio.surge.sh
```

## Future Enhancements

### Version 1.1
- Arabic language support with RTL layout
- Advanced Service Worker for offline capabilities
- Enhanced analytics integration
- Performance monitoring

### Version 2.0
- Portfolio integration
- Admin dashboard
- Advanced search features
- Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code style
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with care and attention to detail
- Inspired by enterprise web design patterns
- Optimized for performance and accessibility
- Designed to showcase DOSSERA's capabilities effectively
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import NoiseOverlay from './components/NoiseOverlay';
import CustomCursor from './components/CustomCursor';
import OevraNav from './components/OevraNav';
import HeroSection from './components/HeroSection';
import TrustMarquee from './components/TrustMarquee';
import AppIntroSection from './components/AppIntroSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import AppFeatures from './components/AppFeatures';
import StatsWall from './components/StatsWall';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import PricingSection from './components/PricingSection';
import BigBrandReveal from './components/BigBrandReveal';
import FinalCTA from './components/FinalCTA';
import OevraFooter from './components/OevraFooter';
import './oevra.css';

export default function OevraClonePage() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const handleAnchor = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!target) return;
            const id = target.getAttribute('href')?.slice(1);
            if (!id) return;
            const el = document.getElementById(id);
            if (el && lenisRef.current) {
                e.preventDefault();
                lenisRef.current.scrollTo(el, { offset: -80 });
            }
        };
        document.addEventListener('click', handleAnchor);
        return () => document.removeEventListener('click', handleAnchor);
    }, []);

    return (
        <div className="oevra-app">
            <NoiseOverlay />
            <CustomCursor />
            <OevraNav />
            <main>
                <HeroSection />
                <TrustMarquee />
                <AppIntroSection />
                <FeaturesShowcase />
                <AppFeatures />
                <StatsWall />
                <TestimonialsCarousel />
                <PricingSection />
                <FinalCTA />
                <BigBrandReveal />
            </main>
            <OevraFooter />
        </div>
    );
}
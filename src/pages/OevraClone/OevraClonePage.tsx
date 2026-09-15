import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import NoiseOverlay from './components/NoiseOverlay';
import OevraNav from './components/OevraNav';
import HeroSection from './components/HeroSection';
import AppIntroSection from './components/AppIntroSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import AppFeatures from './components/AppFeatures';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import PricingSection from './components/PricingSection';
import BigBrandReveal from './components/BigBrandReveal';
import OevraFooter from './components/OevraFooter';
import './oevra.css';

export default function OevraClonePage() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
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

    return (
        <div className="oevra-app">
            <NoiseOverlay />
            <OevraNav />
            <main>
                <HeroSection />
                <AppIntroSection />
                <FeaturesShowcase />
                <AppFeatures />
                <TestimonialsCarousel />
                <PricingSection />
                <BigBrandReveal />
            </main>
            <OevraFooter />
        </div>
    );
}

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/jetbrains-mono';
import NoiseOverlay from './components/NoiseOverlay';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import DocumentStackSection from './components/DocumentStackSection';
import CapabilityGallery from './components/CapabilityGallery';
import ComplianceMarquee from './components/ComplianceMarquee';
import SovereignPlatformSection from './components/SovereignPlatformSection';
import CapabilityList from './components/CapabilityList';
import MeasuredOutcomes from './components/MeasuredOutcomes';
import TestimonialCarousel from './components/TestimonialCarousel';
import PricingCards from './components/PricingCards';
import FinalCTA from './components/FinalCTA';
import OevraFooter from './components/OevraFooter';
import usePrefersReducedMotion from './components/usePrefersReducedMotion';
import AuroraBackground from './components/AuroraBackground';
import './oevra.css';

gsap.registerPlugin(ScrollTrigger);

export default function OevraClonePage() {
    const lenisRef = useRef<Lenis | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return undefined;

        const lenis = new Lenis({
            duration: 0.7,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            wheelMultiplier: 1.05,
        });

        lenisRef.current = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            lenisRef.current = null;
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [prefersReducedMotion]);

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
            <AuroraBackground />
            <NoiseOverlay />
            <CustomCursor />
            <Header />
            <main>
                <Hero />
                <DocumentStackSection />
                <CapabilityGallery />
                <ComplianceMarquee />
                <SovereignPlatformSection />
                <CapabilityList />
                <MeasuredOutcomes />
                <TestimonialCarousel />
                <PricingCards />
                <FinalCTA />
            </main>
            <OevraFooter />
        </div>
    );
}
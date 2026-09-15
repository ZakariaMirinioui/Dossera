import { useEffect, useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

const PHRASES = [
    'sovereign document intelligence',
    'zero cloud dependency',
    'sub-100ms semantic search',
    '98%+ multilingual OCR',
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % PHRASES.length);
                setFading(false);
            }, 650);
        }, 3400);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const section = sectionRef.current;
            const glow = glowRef.current;
            if (!section || !glow) return;
            const rect = section.getBoundingClientRect();
            if (e.clientY < rect.top || e.clientY > rect.bottom) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.translate = `${x}px ${y}px`;
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <section className="oevra-hero" id="hero" ref={sectionRef}>
            <div className="oevra-hero__spotlight" ref={glowRef} aria-hidden="true" />

            <div className="oevra-hero__content">
                <p className="oevra-hero__eyebrow oevra-hero__enter" style={{ animationDelay: '0.1s' }}>
                    <span className="oevra-hero__eyebrow-dot" /> dossera
                </p>

                <h1 className="oevra-hero__headline oevra-hero__enter" style={{ animationDelay: '0.25s' }}>
                    <span className="oevra-hero__headline-top">intelligent document</span>
                    <span className="oevra-hero__headline-top">operations for</span>
                    <span
                        className={`oevra-hero__phrase ${fading ? 'oevra-hero__phrase--fade' : ''}`}
                    >
                        {PHRASES[current]}
                    </span>
                </h1>

                <p className="oevra-hero__sub oevra-hero__enter" style={{ animationDelay: '0.4s' }}>
                    DOSSERA is the sovereign, on-premise document intelligence platform for
                    judicial institutions — the full document lifecycle, from digitization to
                    certified archiving and instant semantic search, entirely inside your own datacenter.
                </p>

                <div className="oevra-hero__cta-row oevra-hero__enter" style={{ animationDelay: '0.55s' }}>
                    <MagneticButton
                        href="#pricing"
                        className="oevra-hero__cta oevra-hero__cta--primary"
                    >
                        Book your assessment
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </MagneticButton>
                    <MagneticButton
                        href="#features"
                        className="oevra-hero__cta-secondary"
                    >
                        <span className="oevra-hero__play">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                        See how it works
                    </MagneticButton>
                </div>
            </div>

            <div className="oevra-hero__scroll-hint oevra-hero__enter" style={{ animationDelay: '0.8s' }}>
                <span>scroll to explore</span>
                <div className="oevra-hero__scroll-line" />
            </div>
        </section>
    );
}
import { useEffect, useState } from 'react';

const PHRASES = [
    'realize your creative potential',
    'overcome any blocks',
    'find inspiration within',
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % PHRASES.length);
                setFading(false);
            }, 600);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="oevra-hero" id="hero">
            <div className="oevra-hero__content">
                <p className="oevra-hero__eyebrow">dossera presents</p>

                <h1 className="oevra-hero__headline">
                    <span className={`oevra-hero__phrase ${fading ? 'oevra-hero__phrase--fade' : ''}`}>
                        {PHRASES[current]}
                    </span>
                </h1>

                <p className="oevra-hero__sub">
                    The first app designed to enhance your creativity and help you get into the flow state — based on neuroscience and psychology.
                </p>

                <a href="#pricing" className="oevra-hero__cta">
                    Try it free for 7 days
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                <div className="oevra-hero__scroll-hint">
                    <span>scroll</span>
                    <div className="oevra-hero__scroll-line" />
                </div>
            </div>
        </section>
    );
}

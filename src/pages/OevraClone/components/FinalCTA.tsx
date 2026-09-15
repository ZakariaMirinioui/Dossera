import { useScrollReveal } from './useScrollReveal';
import MagneticButton from './MagneticButton';

export default function FinalCTA() {
    const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.15 });

    return (
        <section className="oevra-final-cta" id="contact" ref={ref}>
            <div className="oevra-final-cta__inner">
                <div className="oevra-final-cta__glow" aria-hidden="true" />
                <h2 className="oevra-final-cta__title" data-reveal>
                    win back your time.<br />
                    win back your budget.<br />
                    <span className="oevra-final-cta__accent">own your data.</span>
                </h2>
                <p className="oevra-final-cta__desc" data-reveal>
                    Stop losing hours to paper, errors, and compliance dread.
                    Start with a free 30-minute assessment — no pitch,
                    just a real evaluation of your document operations.
                </p>
                <div className="oevra-final-cta__actions" data-reveal>
                    <MagneticButton
                        as="a"
                        href="mailto:dossera.support@gmail.com"
                        className="oevra-final-cta__btn oevra-final-cta__btn--primary"
                    >
                        Book your assessment
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </MagneticButton>
                    <MagneticButton
                        as="a"
                        href="/demande-demo"
                        className="oevra-final-cta__btn oevra-final-cta__btn--ghost"
                    >
                        or request a live demonstration
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
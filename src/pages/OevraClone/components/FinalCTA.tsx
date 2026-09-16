import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { content } from '../content/dosseraLanding';
import MagneticButton from './MagneticButton';
import Reveal, { EyebrowReveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   FinalCTA — "ready to see it work?"

   Soft engraved outcome mark, eyebrow, oversized title,
   two CTAs, and a huge parallax "dossera" wordmark that
   drifts horizontally on scroll and fades on entrance.
   ═══════════════════════════════════════════════════ */

export default function FinalCTA() {
    const { finalCta } = content;
    const markRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();

    useLayoutEffect(() => {
        if (reduced) return undefined;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                markRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 0.06,
                    y: 0,
                    duration: 1.4,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );

            gsap.fromTo(
                wordRef.current,
                { x: 24, opacity: 0 },
                {
                    x: -70,
                    opacity: 0.06,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom 45%',
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [reduced]);

    return (
        <section className="dz-final" id="contact" ref={sectionRef}>
            <div className="dz-final__mark" ref={markRef} aria-hidden="true">
                {finalCta.mark}
            </div>

            <div className="dz-final__inner">
                <EyebrowReveal>
                    <span className="dz-final__eyebrow">{finalCta.eyebrow}</span>
                </EyebrowReveal>

                <Reveal>
                    <h2 className="dz-final__title">
                        {finalCta.titleLines.map((line, i) => (
                            <span className="dz-final__line" key={i}>
                                {i === finalCta.accentLine ? <em>{line}</em> : line}
                            </span>
                        ))}
                    </h2>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="dz-final__desc">{finalCta.desc}</p>
                </Reveal>

                <Reveal delay={0.16} className="dz-final__cta-row">
                    <MagneticButton as="a" href={finalCta.primaryHref} className="dz-btn dz-btn--primary dz-final__btn">
                        {finalCta.primaryCta}
                    </MagneticButton>
                    <MagneticButton as="a" href={finalCta.secondaryHref} className="dz-btn dz-btn--outline dz-final__btn">
                        {finalCta.secondaryCta}
                    </MagneticButton>
                </Reveal>
            </div>

            <div className="dz-final__word-wrap" aria-hidden="true">
                <div className="dz-final__word" ref={wordRef}>
                    {finalCta.wordmark}
                </div>
            </div>
        </section>
    );
}
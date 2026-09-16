import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../content/dosseraLanding';
import { CAPABILITY_VISUALS } from './CapabilityVisuals';
import Reveal, { EyebrowReveal } from './Reveal';
import usePrefersReducedMotion from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   CapabilityGallery — pinned scroll gallery.

   Desktop (≥1024px, motion allowed): a 500vh wrapper with a
   sticky 100vh stage; the left visual frame crossfades + scales
   between the 5 capability visuals while the right column's
   step text is scrubbed by scroll. Progress reads "0n / 05"
   with a vertical fill line.

   Mobile / reduced-motion: plain vertical stack, each step
   with its own <Reveal /> entrance and static visual.
   ═══════════════════════════════════════════════════ */

export default function CapabilityGallery() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
    );

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const pinned = isDesktop && !prefersReducedMotion;

    return pinned ? <PinnedGallery /> : <StackedGallery />;
}

function PinnedGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const fillRef = useRef<HTMLSpanElement>(null);
    const countRef = useRef<HTMLSpanElement>(null);

    const { gallery } = content;

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const frames = gsap.utils.toArray<HTMLElement>('.dz-gallery__frame');
            const steps = gsap.utils.toArray<HTMLElement>('.dz-gallery__step');

            gsap.set(frames[0], { opacity: 1, scale: 1 });

            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (countRef.current) {
                            const idx = Math.min(4, Math.floor(self.progress * 5));
                            countRef.current.textContent = `0${idx + 1}`;
                        }
                        if (fillRef.current) {
                            fillRef.current.style.transform = `scaleY(${self.progress})`;
                        }
                    },
                },
            });

            /* Overlapping crossfade: frame N+1 begins fading in just before
               frame N starts fading out, so the left stage never goes blank
               between the five 20% scroll segments. */
            frames.forEach((frame, i) => {
                if (i > 0) {
                    tl.fromTo(
                        frame,
                        { opacity: 0, scale: 0.98 },
                        { opacity: 1, scale: 1, duration: 0.14, ease: 'power1.out', immediateRender: false },
                        i * 0.2 - 0.08
                    );
                }
                if (i < frames.length - 1) {
                    tl.to(frame, { opacity: 0, duration: 0.12, ease: 'power1.in' }, (i + 1) * 0.2 + 0.02);
                }
            });

            steps.forEach((step, i) => {
                const num = step.querySelector('.dz-gallery__step-num');
                gsap.fromTo(
                    step,
                    { opacity: 0.4 },
                    {
                        opacity: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: step,
                            start: i === 0 ? 'top 85%' : 'top bottom',
                            end: 'center center',
                            scrub: true,
                        },
                    }
                );
                if (num) {
                    gsap.fromTo(
                        num,
                        { color: 'var(--ink-tertiary)' },
                        {
                            color: 'var(--accent-sovereign)',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: step,
                                start: 'center 72%',
                                end: 'center center',
                                scrub: true,
                            },
                        }
                    );
                }
            });
        }, section);

        const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
            cancelAnimationFrame(rafId);
            ctx.revert();
        };
    }, []);

    return (
        <section className="dz-gallery" id="capabilities" ref={sectionRef} aria-label="Capabilities">
            <div className="dz-gallery__pinned">
                <div className="dz-gallery__progress" aria-hidden="true">
                    <span className="dz-gallery__counter">
                        <span ref={countRef}>01</span>
                        <span>{gallery.counterLabel}</span>
                    </span>
                    <span className="dz-gallery__track">
                        <span className="dz-gallery__fill" ref={fillRef} />
                    </span>
                </div>

                <div className="dz-gallery__left">
                    <div className="dz-gallery__frames">
                        {CAPABILITY_VISUALS.map((visual, i) => (
                            <div className="dz-gallery__frame" key={i} aria-hidden={i !== 0}>
                                {visual}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dz-gallery__right">
                    <span className="dz-eyebrow dz-eyebrow--dim">{gallery.label}</span>
                    {gallery.steps.map((step) => (
                        <div className="dz-gallery__step" key={step.num}>
                            <span className="dz-gallery__step-num">{step.num}</span>
                            <div className="dz-gallery__step-copy">
                                <h3 className="dz-gallery__step-title">{step.title}</h3>
                                <p className="dz-gallery__step-desc">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StackedGallery() {
    const { gallery } = content;
    return (
        <section className="dz-gallery dz-gallery--stacked" id="capabilities" aria-label="Capabilities">
            <div className="dz-gallery__stacked-inner">
                <EyebrowReveal>
                    <span className="dz-eyebrow">{gallery.label}</span>
                </EyebrowReveal>
                {gallery.steps.map((step, i) => (
                    <Reveal key={step.num} className="dz-gallery__stacked-item">
                        <div className="dz-gallery__stacked-num">{step.num}</div>
                        <div className="dz-gallery__stacked-stage">
                            {CAPABILITY_VISUALS[i]}
                        </div>
                        <div className="dz-gallery__stacked-copy">
                            <h3 className="dz-gallery__stacked-title">{step.title}</h3>
                            <p className="dz-gallery__stacked-desc">{step.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
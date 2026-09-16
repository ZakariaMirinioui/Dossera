import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content/dosseraLanding';
import { EyebrowReveal } from './Reveal';
import Reveal from './Reveal';

/* ═══════════════════════════════════════════════════
   TestimonialCarousel — horizontal drag carousel.

   Cards sit in a flex row wider than the viewport; the
   active card is centered at full scale, adjacent cards peek
   at the edges at 92% scale / 55% opacity. Arrows, dots and
   the drag gesture all call the same goTo(n); autoplay
   advances every 6s and pauses 4s after any manual input.
   ═══════════════════════════════════════════════════ */

const GAP = 28;
const AUTOPLAY_MS = 6000;
const MANUAL_PAUSE_MS = 4000;

const ARROW_LEFT = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);
const ARROW_RIGHT = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default function TestimonialCarousel() {
    const { testimonials } = content;
    const { items } = testimonials;
    const count = items.length;

    const stageRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [metrics, setMetrics] = useState({ cardWidth: 640, baseX: 0, step: 668 });
    const hovered = useRef(false);
    const interactedAt = useRef(0);
    const reduced = useReducedMotion();

    useEffect(() => {
        const measure = () => {
            const stage = stageRef.current;
            if (!stage) return;
            const stageWidth = stage.getBoundingClientRect().width;
            const cardWidth = Math.min(680, stageWidth * 0.86);
            const step = cardWidth + GAP;
            const baseX = (stageWidth - cardWidth) / 2;
            setMetrics({ cardWidth, baseX, step });
        };
        measure();
        window.addEventListener('resize', measure);
        const raf = requestAnimationFrame(measure);
        return () => {
            window.removeEventListener('resize', measure);
            cancelAnimationFrame(raf);
        };
    }, []);

    const goTo = useCallback(
        (i: number) => {
            setIndex(((i % count) + count) % count);
            interactedAt.current = performance.now();
        },
        [count]
    );

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    const onDragEnd = useCallback(
        (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
            const threshold = metrics.step * 0.24;
            const vx = info.velocity.x;
            if (info.offset.x < -threshold || vx < -320) {
                next();
            } else if (info.offset.x > threshold || vx > 320) {
                prev();
            }
        },
        [metrics.step, next, prev]
    );

    useEffect(() => {
        if (reduced) return undefined;
        const id = setInterval(() => {
            const since = performance.now() - interactedAt.current;
            if (!hovered.current && since > MANUAL_PAUSE_MS) {
                setIndex((i) => (i + 1) % count);
            }
        }, AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [count, reduced]);

    const x = metrics.baseX - index * metrics.step;

    return (
        <section className="dz-testi" id="testimonials">
            <div className="dz-testi__inner">
                <header className="dz-testi__head">
                    <EyebrowReveal>
                        <span className="dz-testi__count">{testimonials.count}</span>
                        <span className="dz-testi__label">{testimonials.label}</span>
                    </EyebrowReveal>
                </header>

                <Reveal className="dz-testi__stage" amount={0.3}>
                    <div
                        className="dz-testi__viewport"
                        ref={stageRef}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Proof statements"
                        tabIndex={0}
                        onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === 'ArrowLeft') prev();
                            if (e.key === 'ArrowRight') next();
                        }}
                    >
                        <motion.div
                            className="dz-testi__track"
                            data-cursor="drag"
                            drag={reduced ? false : 'x'}
                            dragConstraints={{ left: -(count - 1) * metrics.step, right: 0 }}
                            dragElastic={0.08}
                            dragMomentum={false}
                            onDragStart={() => {
                                hovered.current = true;
                                interactedAt.current = performance.now();
                            }}
                            onDragEnd={onDragEnd}
                            onMouseEnter={() => {
                                hovered.current = true;
                            }}
                            onMouseLeave={() => {
                                hovered.current = false;
                            }}
                            animate={{ x }}
                            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                        >
                            {items.map((t, i) => {
                                const diff = (i - index + count) % count;
                                const isActive = diff === 0;
                                const isPeek = diff === 1 || diff === count - 1;
                                return (
                                    <blockquote
                                        key={i}
                                        className={`dz-testi__card${isActive ? ' is-active' : ''}${isPeek ? ' is-peek' : ''}`}
                                        style={{ width: metrics.cardWidth }}
                                        aria-hidden={!isActive}
                                        onClick={() => goTo(i)}
                                    >
                                        <span className="dz-testi__card-index">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <p className="dz-testi__card-quote">{t.quote}</p>
                                        <footer className="dz-testi__card-meta">
                                            <span className="dz-testi__card-role">— {t.role}</span>
                                            <span className="dz-testi__card-author">{t.author}</span>
                                        </footer>
                                    </blockquote>
                                );
                            })}
                        </motion.div>
                    </div>
                </Reveal>

                <Reveal className="dz-testi__controls" delay={0.1}>
                    <div className="dz-testi__dots" role="group" aria-label="Choose proof">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`dz-testi__dot${i === index ? ' is-active' : ''}`}
                                aria-label={`Show proof ${i + 1}`}
                                aria-current={i === index}
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>

                    <span className="dz-testi__index" aria-hidden="true">
                        <b>{String(index + 1).padStart(2, '0')}</b>
                        <span> / {String(count).padStart(2, '0')}</span>
                    </span>

                    <div className="dz-testi__arrows">
                        <button type="button" className="dz-testi__arrow" aria-label="Previous proof" onClick={prev}>
                            {ARROW_LEFT}
                        </button>
                        <button type="button" className="dz-testi__arrow" aria-label="Next proof" onClick={next}>
                            {ARROW_RIGHT}
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
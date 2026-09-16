import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content/dosseraLanding';
import Counter from './Counter';
import MagneticButton from './MagneticButton';
import { RevealGroup, RevealChild, EyebrowReveal } from './Reveal';
import Reveal from './Reveal';
import { FM_EASE_PREMIUM } from './motionTokens';

/* ═══════════════════════════════════════════════════
   SovereignPlatformSection — "the sovereign platform…"

   Left copy + CTA, right radial capability diagram
   (DOSSERA CORE + 5 step nodes, dashed SVG connectors
   that stroke-draw on scroll), three metric cards below.
   ═══════════════════════════════════════════════════ */

const NODE_R = 42; // % from center
const ANGLES = [-90, -18, 54, 126, 198]; // degrees, i * 72 - 90

function nodePosition(i: number) {
    const rad = (ANGLES[i] * Math.PI) / 180;
    return {
        left: 50 + NODE_R * Math.cos(rad),
        top: 50 + NODE_R * Math.sin(rad),
    };
}

function RadialDiagram() {
    const reduced = useReducedMotion();
    const { platform } = content;

    const lineVariants = (delay: number) => ({
        hidden: { strokeDashoffset: 1, opacity: 0 },
        visible: {
            strokeDashoffset: 0,
            opacity: 1,
            transition: { duration: 1.2, ease: FM_EASE_PREMIUM, delay: 0.12 * delay },
        },
    });

    return (
        <div className="dz-radial" data-cursor="hover" aria-hidden="true">
            <svg className="dz-radial__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                {platform.steps.map((step, i) => {
                    const { left, top } = nodePosition(i);
                    return (
                        <motion.line
                            key={step.num}
                            x1="50"
                            y1="50"
                            x2={left}
                            y2={top}
                            pathLength={1}
                            className="dz-radial__line"
                            variants={lineVariants(i)}
                            initial={reduced ? { opacity: 1, strokeDashoffset: 0 } : 'hidden'}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        />
                    );
                })}
            </svg>

            {platform.steps.map((step, i) => {
                const { left, top } = nodePosition(i);
                return (
                    <span
                        key={step.num}
                        className={`dz-radial__node dz-radial__node--${i}`}
                        style={{ left: `${left}%`, top: `${top}%` }}
                    >
                        <b>{step.num}</b>
                        {step.label}
                    </span>
                );
            })}

            <span className="dz-radial__core">
                <b>DOSSERA</b>
                <i>CORE</i>
            </span>
        </div>
    );
}

export default function SovereignPlatformSection() {
    const { platform } = content;

    return (
        <section className="dz-platform" id="platform">
            <div className="dz-glow dz-glow--platform" aria-hidden="true" />
            <div className="dz-platform__inner">
                <div className="dz-platform__grid">
                    <div className="dz-platform__text">
                        <EyebrowReveal>
                            <span className="dz-pill">{platform.badge}</span>
                        </EyebrowReveal>
                        <Reveal>
                            <h2 className="dz-platform__title">
                                {platform.titleLines.map((line) => (
                                    <span className="dz-platform__line" key={line}>
                                        {line}
                                    </span>
                                ))}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p className="dz-platform__desc">{platform.desc}</p>
                        </Reveal>
                        <Reveal delay={0.14}>
                            <MagneticButton
                                as="a"
                                href={platform.ctaHref}
                                className="dz-btn dz-btn--primary"
                            >
                                {platform.cta}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </MagneticButton>
                        </Reveal>
                    </div>

                    <Reveal className="dz-platform__visual">
                        <RadialDiagram />
                    </Reveal>
                </div>

                <RevealGroup className="dz-platform__metrics" stagger={0.09}>
                    {platform.metrics.map((m) => (
                        <RevealChild key={m.eyebrow} className="dz-metric-card">
                            <span className="dz-metric-card__eyebrow">{m.eyebrow}</span>
                            <span className="dz-metric-card__value">
                                {m.counter ? (
                                    <Counter
                                        value={m.value}
                                        decimals={m.decimals ?? 0}
                                        prefix={m.prefix}
                                        suffix={m.suffix}
                                    />
                                ) : (
                                    <>
                                        {m.prefix}
                                        {m.value}
                                        <small>{m.suffix?.trim()}</small>
                                    </>
                                )}
                            </span>
                            <span className="dz-metric-card__label">{m.label}</span>
                            <span className="dz-metric-card__sub">{m.sub}</span>
                        </RevealChild>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
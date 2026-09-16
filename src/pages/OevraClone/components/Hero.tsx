import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content/dosseraLanding';
import MagneticButton from './MagneticButton';
import TerminalVisual from './TerminalVisual';
import { FM_EASE_PREMIUM } from './motionTokens';

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
} as const;

const item = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: FM_EASE_PREMIUM } },
};

const accent = {
    hidden: { opacity: 0, letterSpacing: '0.02em' },
    visible: {
        opacity: 1,
        letterSpacing: '-0.01em',
        transition: { duration: 1.4, ease: FM_EASE_PREMIUM, delay: 0.5 },
    },
};

export default function Hero() {
    const { hero } = content;
    const reduced = useReducedMotion();

    return (
        <section className="dz-hero" id="hero">
            <div className="dz-glow dz-glow--top-right" aria-hidden="true" />
            <div className="dz-glow dz-glow--bottom-left" aria-hidden="true" />

            <div className="dz-hero__inner">
                <motion.div
                    className="dz-hero__content"
                    initial={reduced ? false : 'hidden'}
                    animate="visible"
                    variants={stagger}
                >
                    <motion.p className="dz-hero__eyebrow" variants={item}>
                        <span className="dz-hero__live-dot" aria-hidden="true" />
                        {hero.eyebrow}
                    </motion.p>

                    <motion.h1 className="dz-hero__headline" variants={item}>
                        <span className="dz-hero__headline-top">{hero.headlineTop}</span>
                        <motion.span className="dz-hero__headline-accent" variants={accent}>
                            {hero.headlineAccent}
                        </motion.span>
                    </motion.h1>

                    <motion.p className="dz-hero__sub" variants={item}>
                        {hero.sub}
                    </motion.p>

                    <motion.div className="dz-hero__cta-row" variants={item}>
                        <MagneticButton
                            as="a"
                            href={hero.primaryHref}
                            className="dz-btn dz-btn--primary dz-btn--lg"
                        >
                            {hero.primaryCta}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </MagneticButton>

                        <MagneticButton
                            as="a"
                            href={hero.secondaryHref}
                            className="dz-btn dz-btn--ghost dz-btn--lg"
                        >
                            <span className="dz-btn__play" aria-hidden="true">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            {hero.secondaryCta}
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="dz-hero__band"
                initial={reduced ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: FM_EASE_PREMIUM, delay: 0.7 }}
            >
                <TerminalVisual />
            </motion.div>

            <div className="dz-hero__scroll-hint" aria-hidden="true">
                <span>{hero.scrollHint}</span>
                <span className="dz-hero__scroll-line" />
            </div>
        </section>
    );
}
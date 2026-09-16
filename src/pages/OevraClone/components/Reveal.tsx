import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FM_EASE_PREMIUM, STAGGER_DEFAULT, STAGGER_LOOSE } from './motionTokens';

/* ═══════════════════════════════════════════════════
   <Reveal /> — global entrance wrapper (Phase 4)

   initial:  opacity 0, y 28
   animate:  opacity 1, y 0
   transition: 0.9s cubic-bezier(0.16, 1, 0.3, 1)

   Groups stagger their children via RevealGroup. Eyebrow /
   mono captions use EyebrowReveal (faster, no y-drift).
   ═══════════════════════════════════════════════════ */

export interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    /** Amount of viewport that must intersect to trigger. */
    amount?: number;
    as?: 'div' | 'section' | 'span' | 'header' | 'figure' | 'p' | 'li';
}

const entrance: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: FM_EASE_PREMIUM },
    },
};

const eyebrow: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Reveal({
    children,
    className,
    delay = 0,
    amount = 0.25,
    as = 'div',
}: RevealProps) {
    const reduced = useReducedMotion();
    if (reduced) {
        return (
            <motion.div
                className={className}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
            >
                {children}
            </motion.div>
        );
    }
    const Comp = motion[as];
    return (
        <Comp
            className={className}
            variants={entrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            transition={{ delay }}
        >
            {children}
        </Comp>
    );
}

export interface RevealGroupProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    amount?: number;
}

/** Parent container whose [data-reveal-child] children stagger in. */
export function RevealGroup({
    children,
    className,
    stagger = STAGGER_DEFAULT,
    delay = 0.05,
    amount = 0.2,
}: RevealGroupProps) {
    const reduced = useReducedMotion();
    const group: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
        },
    };

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
        >
            {children}
        </motion.div>
    );
}

export function RevealChild({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const reduced = useReducedMotion();
    if (reduced) return <div className={className}>{children}</div>;
    return (
        <motion.div className={className} variants={entrance}>
            {children}
        </motion.div>
    );
}

/** Eyebrow / monospace captions — arrive fast, no drift, 100ms early. */
export function EyebrowReveal({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduced = useReducedMotion();
    if (reduced) {
        return <div className={className}>{children}</div>;
    }
    return (
        <motion.div
            className={className}
            variants={eyebrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}

export { STAGGER_DEFAULT, STAGGER_LOOSE };
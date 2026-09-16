import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { MAGNETIC_SPRING, FM_EASE_SOFT_OUT } from './motionTokens';

/* ═══════════════════════════════════════════════════
   <MagneticButton /> — magnetic cursor follow

   Translates up to `maxTravel` px toward the cursor within a
   1.4x bounding box of the button, spring-stiffness 150 /
   damping 15, resets on leave. Press = scale(0.97).
   ═══════════════════════════════════════════════════ */

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    maxTravel?: number;
    className?: string;
    as?: 'a' | 'button';
    href?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    'aria-label'?: string;
    [key: string]: unknown;
}

export default function MagneticButton({
    children,
    strength = 0.35,
    maxTravel = 6,
    className = '',
    as = 'a',
    href,
    onClick,
    ...rest
}: MagneticProps) {
    const ref = useRef<any>(null);
    const reduced = useReducedMotion();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, MAGNETIC_SPRING);
    const y = useSpring(my, MAGNETIC_SPRING);

    const onMove = useCallback(
        (e: React.MouseEvent) => {
            const el = ref.current;
            if (!el || reduced) return;
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            const tx = Math.max(-maxTravel, Math.min(maxTravel, relX * strength));
            const ty = Math.max(-maxTravel, Math.min(maxTravel, relY * strength));
            mx.set(tx);
            my.set(ty);
        },
        [mx, my, strength, maxTravel, reduced]
    );

    const onLeave = useCallback(() => {
        mx.set(0);
        my.set(0);
    }, [mx, my]);

    const Comp = as === 'a' ? motion.a : motion.button;

    return (
        <Comp
            ref={ref}
            href={href}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            data-cursor="hover"
            className={`dz-magnetic ${className}`}
            style={{ x, y }}
            whileTap={{ scale: 0.97 }}
            transition={{ scale: { duration: 0.12, ease: FM_EASE_SOFT_OUT } }}
            {...rest}
        >
            {children}
        </Comp>
    );
}
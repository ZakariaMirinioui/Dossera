import { useRef, useState, useCallback } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';
import { EASE_SNAP, DURATION_CONTENT } from './motionTokens';

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
    as?: 'a' | 'button' | 'div';
    href?: string;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    strength = 0.35,
    className = '',
    as = 'a',
    href,
    onClick,
}: MagneticProps) {
    const ref = useRef<HTMLElement>(null);
    const [transform, setTransform] = useState('translate3d(0,0,0)');
    const [active, setActive] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    const onMove = useCallback(
        (e: React.MouseEvent) => {
            const el = ref.current;
            if (!el || prefersReducedMotion) return;
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            setTransform(
                `translate3d(${relX * strength}px, ${relY * strength}px, 0)`
            );
        },
        [strength, prefersReducedMotion]
    );

    const onLeave = useCallback(() => {
        setActive(false);
        setTransform('translate3d(0,0,0)');
    }, []);

    const Comp = as as React.ElementType;

    return (
        <Comp
            ref={ref}
            href={href}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onMouseEnter={() => setActive(true)}
            data-cursor="hover"
            className={`oevra-magnetic ${className}`}
            style={{
                transform: active ? 'translate3d(0,0,0) scale(1)' : transform,
                transition: `transform ${DURATION_CONTENT} ${EASE_SNAP}, background 0.3s ease, color 0.3s ease`,
                willChange: 'transform',
            }}
        >
            {children}
        </Comp>
    );
}
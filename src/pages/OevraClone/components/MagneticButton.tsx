import { useRef, useState, useCallback } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';
import { EASE_SNAP, DURATION_CONTENT, DURATION_MICRO } from './motionTokens';

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
    const [pressed, setPressed] = useState(false);
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
        setPressed(false);
        setTransform('translate3d(0,0,0)');
    }, []);

    const Comp = as as React.ElementType;

    const currentTransform = active && !pressed
        ? 'translate3d(0,0,0) scale(1)'
        : pressed
            ? 'translate3d(0,0,0) scale(0.985)'
            : transform;

    return (
        <Comp
            ref={ref}
            href={href}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onMouseEnter={() => setActive(true)}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            data-cursor="hover"
            className={`oevra-magnetic ${className}`}
            style={{
                transform: currentTransform,
                transition: `transform ${pressed ? DURATION_MICRO : DURATION_CONTENT} ${EASE_SNAP}, background 0.3s ease, color 0.3s ease`,
                willChange: 'transform',
            }}
        >
            {children}
        </Comp>
    );
}
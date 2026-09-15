import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&*+#<>';

interface ScrambleTextProps {
    text: string;
    as?: 'span' | 'h2' | 'h3' | 'p';
    className?: string;
    speed?: number;
}

export default function ScrambleText({
    text,
    as = 'span',
    className = '',
    speed = 35,
}: ScrambleTextProps) {
    const [display, setDisplay] = useState(text);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);
    const hovered = useRef(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const el = document.activeElement;
        void el;
    }, []);

    const scramble = () => {
        if (prefersReducedMotion) {
            setDisplay(text);
            return;
        }
        if (hovered.current) return;
        hovered.current = true;
        let iteration = 0;
        setDisplay(text);

        interval.current = setInterval(() => {
            setDisplay(
                text
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < iteration) return char;
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );
            iteration += 1 / 3;
            if (iteration >= text.length) {
                if (interval.current) clearInterval(interval.current);
                setDisplay(text);
                setTimeout(() => {
                    hovered.current = false;
                }, 200);
            }
        }, speed);
    };

    const reset = () => {
        if (interval.current) clearInterval(interval.current);
        if (hovered.current) {
            setDisplay(text);
            hovered.current = false;
        }
    };

    const Comp = as as React.ElementType;

    return (
        <Comp
            className={className}
            onMouseEnter={scramble}
            onMouseLeave={reset}
            data-cursor="hover"
        >
            {display}
        </Comp>
    );
}
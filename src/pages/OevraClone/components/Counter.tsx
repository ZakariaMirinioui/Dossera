import { useEffect, useRef, useState } from 'react';

interface CounterProps {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export default function Counter({
    value,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
}: CounterProps) {
    const [display, setDisplay] = useState('0');
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !started.current) {
                        started.current = true;
                        if (reduced) {
                            setDisplay(value.toFixed(decimals));
                            return;
                        }
                        const start = performance.now();
                        const tick = (now: number) => {
                            const p = Math.min((now - start) / duration, 1);
                            const eased = 1 - Math.pow(1 - p, 4);
                            setDisplay((value * eased).toFixed(decimals));
                            if (p < 1) requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value, duration, decimals]);

    return (
        <span ref={ref} className={`oevra-counter ${className}`}>
            {prefix}
            {display}
            {suffix}
        </span>
    );
}
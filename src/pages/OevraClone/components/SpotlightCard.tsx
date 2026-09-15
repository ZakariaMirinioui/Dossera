import { useRef, useCallback } from 'react';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
}

export default function SpotlightCard({
    children,
    className = '',
    color = 'rgba(119, 134, 67, 0.18)',
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = useCallback(
        (e: React.MouseEvent) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--spot-x', `${x}px`);
            el.style.setProperty('--spot-y', `${y}px`);
        },
        []
    );

    return (
        <div
            ref={ref}
            className={`oevra-spotlight ${className}`}
            onMouseMove={onMove}
            style={{ ['--spot-color' as string]: color }}
        >
            {children}
        </div>
    );
}
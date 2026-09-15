import { useRef, useCallback, useEffect } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
    glare?: boolean;
    scale?: number;
}

export default function TiltCard({
    children,
    className = '',
    maxTilt = 10,
    glare = true,
    scale = 1.02,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const raf = useRef<number>(0);

    const setTilt = useCallback(
        (rx: number, ry: number) => {
            const el = ref.current;
            if (!el) return;
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale},${scale},${scale})`;
            const glareEl = el.querySelector('.oevra-tilt__glare') as HTMLElement | null;
            if (glareEl) {
                const glareAngle = 35 + ry * 2;
                glareEl.style.transform = `rotate(${glareAngle}deg)`;
            }
        },
        [scale]
    );

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
    }, []);

    const onMove = useCallback(
        (e: React.MouseEvent) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            const rx = -py * maxTilt;
            const ry = px * maxTilt;
            cancelAnimationFrame(raf.current);
            raf.current = requestAnimationFrame(() => setTilt(rx, ry));
        },
        [maxTilt, setTilt]
    );

    const onLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        cancelAnimationFrame(raf.current);
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => {
            if (el) el.style.transition = '';
        }, 600);
    }, []);

    return (
        <div
            ref={ref}
            className={`oevra-tilt ${className}`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            data-cursor="hover"
            style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
            {children}
            {glare && (
                <div
                    className="oevra-tilt__glare"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100%',
                            left: '-100%',
                            width: '300%',
                            height: '300%',
                            background: 'linear-gradient(45deg, transparent 42%, rgba(255,255,255,0.18) 50%, transparent 58%)',
                            transition: 'transform 0.4s ease',
                        }}
                    />
                </div>
            )}
        </div>
    );
}
import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [down, setDown] = useState(false);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouch = window.matchMedia('(hover: none)').matches;
        if (prefersReduced || isTouch) return;

        let raf: number;
        let current = { x: -100, y: -100 };

        const onMove = (e: MouseEvent) => {
            const nx = e.clientX;
            const ny = e.clientY;
            setPos({ x: nx, y: ny });
            setVisible(true);

            cancelAnimationFrame(raf);
            const step = () => {
                current.x += (nx - current.x) * 0.18;
                current.y += (ny - current.y) * 0.18;
                setDotPos({ x: current.x, y: current.y });
                raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        };

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setHovering(
                !!target.closest('a, button, [data-cursor="hover"]')
            );
        };

        const onDown = () => setDown(true);
        const onUp = () => setDown(false);
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div
                className={`oevra-cursor oevra-cursor__ring ${visible ? 'is-visible' : ''} ${hovering ? 'is-hover' : ''} ${down ? 'is-down' : ''}`}
                style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
                aria-hidden="true"
            />
            <div
                className={`oevra-cursor oevra-cursor__dot ${visible ? 'is-visible' : ''} ${hovering ? 'is-hover' : ''}`}
                style={{ transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)` }}
                aria-hidden="true"
            />
        </>
    );
}
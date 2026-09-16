import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

type CursorMode = 'default' | 'hover' | 'drag';

/* ═══════════════════════════════════════════════════
   <CustomCursor /> — imperative pointer follower

   Fully imperative on the hot path: the dot is written
   straight to the DOM on `pointermove` (zero React
   re-renders while moving) and the ring chases it via a
   requestAnimationFrame lerp, so the ring lags smoothly
   behind and the dot stays exactly inside its center.

   `mode` / `visible` / `down` are ordinary React state —
   they only change on hover/enter/leave/press, never per
   frame. Reduced motion and touch just render nothing.
   ═══════════════════════════════════════════════════ */

const RING_SMOOTHING = 0.22;

export default function CustomCursor() {
    const [mode, setMode] = useState<CursorMode>('default');
    const [visible, setVisible] = useState(false);
    const [down, setDown] = useState(false);

    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    const prefersReducedMotion = usePrefersReducedMotion();
    const isTouch =
        typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

    useEffect(() => {
        if (prefersReducedMotion || isTouch) return;
        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!ring || !dot) return;

        let tx = 0;
        let ty = 0;
        let rx = 0;
        let ry = 0;
        let seeded = false;
        let rafId = 0;

        const onPointerMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!seeded) {
                seeded = true;
                rx = tx;
                ry = ty;
            }
            dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        };

        const tick = () => {
            rx += (tx - rx) * RING_SMOOTHING;
            ry += (ty - ry) * RING_SMOOTHING;
            ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
            rafId = requestAnimationFrame(tick);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            cancelAnimationFrame(rafId);
        };
    }, [prefersReducedMotion, isTouch]);

    useEffect(() => {
        const onOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('[data-cursor="drag"]')) {
                setMode('drag');
            } else if (el.closest('a, button, [data-cursor="hover"]')) {
                setMode('hover');
            } else {
                setMode('default');
            }
        };

        const onDown = () => setDown(true);
        const onUp = () => setDown(false);
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener('mouseover', onOver, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    const show = !prefersReducedMotion && !isTouch && visible;

    return (
        <>
            <div
                ref={ringRef}
                className={`oevra-cursor oevra-cursor--ring${show ? ' is-visible' : ''} is-mode-${mode}${down && mode === 'drag' ? ' is-grab' : ''}`}
                aria-hidden="true"
            >
                <span className="oevra-cursor__ring">
                    {mode === 'drag' && <span className="oevra-cursor__label">DRAG</span>}
                </span>
            </div>
            <div
                ref={dotRef}
                className={`oevra-cursor oevra-cursor--dot${show ? ' is-visible' : ''} is-mode-${mode}`}
                aria-hidden="true"
            />
        </>
    );
}
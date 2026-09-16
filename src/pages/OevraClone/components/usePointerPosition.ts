import { useEffect, useRef, useState } from 'react';

export interface PointerPosition {
    x: number;
    y: number;
}

const lerp = (current: number, target: number, factor: number) =>
    current + (target - current) * factor;

const ORIGIN: PointerPosition = { x: 0, y: 0 };

const centered = (): PointerPosition =>
    typeof window !== 'undefined'
        ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        : ORIGIN;

/**
 * Centralized pointer tracking with requestAnimationFrame + lerp smoothing.
 *
 * Returns:
 *  - `target`: the raw pointer position (updates on every pointermove)
 *  - `position`: the smoothed position (interpolated each animation frame)
 */
export function usePointerPosition(options?: {
    smoothing?: number;
    enabled?: boolean;
}): { position: PointerPosition; target: PointerPosition } {
    const { smoothing = 0.15, enabled = true } = options ?? {};

    const init = centered();

    const [target, setTarget] = useState<PointerPosition>(init);
    const [position, setPosition] = useState<PointerPosition>(init);
    const targetRef = useRef<PointerPosition>(init);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!enabled) {
            targetRef.current = ORIGIN;
            setPosition(ORIGIN);
            setTarget(ORIGIN);
            return;
        }

        const onPointerMove = (e: PointerEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
            setTarget(targetRef.current);
        };

        const tick = () => {
            const t = targetRef.current;
            setPosition((prev) => {
                const nextX = lerp(prev.x, t.x, smoothing);
                const nextY = lerp(prev.y, t.y, smoothing);
                if (Math.abs(nextX - t.x) < 0.01 && Math.abs(nextY - t.y) < 0.01) {
                    return t;
                }
                return { x: nextX, y: nextY };
            });
            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [enabled, smoothing]);

    return { position, target };
}

export default usePointerPosition;
import { useEffect, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';
import usePointerPosition from './usePointerPosition';

type CursorMode = 'default' | 'hover' | 'drag';

export default function CustomCursor() {
    const [mode, setMode] = useState<CursorMode>('default');
    const [visible, setVisible] = useState(false);
    const [down, setDown] = useState(false);

    const prefersReducedMotion = usePrefersReducedMotion();
    const isTouch =
        typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

    const { position, target } = usePointerPosition({
        smoothing: 0.18,
        enabled: !prefersReducedMotion && !isTouch,
    });

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
                className={`oevra-cursor oevra-cursor__ring ${show ? 'is-visible' : ''} is-mode-${mode} ${down && mode === 'drag' ? 'is-grab' : ''}`}
                style={{ transform: `translate3d(${target.x}px, ${target.y}px, 0)` }}
                aria-hidden="true"
            >
                {mode === 'drag' && <span className="oevra-cursor__label">DRAG</span>}
            </div>
            <div
                className={`oevra-cursor oevra-cursor__dot ${show ? 'is-visible' : ''} is-mode-${mode}`}
                style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
                aria-hidden="true"
            />
        </>
    );
}
import { useEffect, type RefObject } from "react";

/**
 * Red radial spotlight following pointer. Section needs `.cursor-glow-section` and direct children elevated with z-index.
 */
export function useCursorGlow(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) return;

        el.style.setProperty("--glow-opacity", "0");

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            el.style.setProperty("--glow-x", `${x}px`);
            el.style.setProperty("--glow-y", `${y}px`);
            el.style.setProperty("--glow-opacity", "1");
        };

        const handleMouseLeave = () => {
            el.style.setProperty("--glow-opacity", "0");
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            el.style.removeProperty("--glow-x");
            el.style.removeProperty("--glow-y");
            el.style.removeProperty("--glow-opacity");
        };
    }, [ref]);
}

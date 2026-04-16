import { useEffect, useRef, type RefObject } from "react";

/**
 * Subtle magnetic tilt toward cursor. Use with `.glass-card--magnetic` so CSS hover transform does not fight inline styles.
 */
export function useMagneticHover<T extends HTMLElement = HTMLElement>(strength = 0.15): RefObject<T> {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mq.matches) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const deltaX = (e.clientX - centerX) * strength;
			const deltaY = (e.clientY - centerY) * strength;

			el.style.transform = `translate(${deltaX}px, ${deltaY}px) translateZ(0)`;
		};

		const handleMouseLeave = () => {
			el.style.transform = "translate(0, 0) translateZ(0)";
			el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
		};

		const handleMouseEnter = () => {
			el.style.transition = "transform 0.1s linear";
		};

		el.addEventListener("mousemove", handleMouseMove);
		el.addEventListener("mouseleave", handleMouseLeave);
		el.addEventListener("mouseenter", handleMouseEnter);

		return () => {
			el.removeEventListener("mousemove", handleMouseMove);
			el.removeEventListener("mouseleave", handleMouseLeave);
			el.removeEventListener("mouseenter", handleMouseEnter);
			el.style.transform = "";
			el.style.transition = "";
		};
	}, [strength]);

	return ref;
}

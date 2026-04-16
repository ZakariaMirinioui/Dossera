import { useEffect, useRef, type RefObject } from "react";

/**
 * Adds `visible` to the element once when it enters the viewport (pairs with `.reveal` / `.reveal-group` in CSS).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(): RefObject<T> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("visible");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

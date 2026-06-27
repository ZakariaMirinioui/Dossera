import { useEffect } from "react";

/**
 * Hook to observe a given element directly and add 'visible' class when it enters viewport
 * Usage: useObserveElement(divRef);
 */
export function useObserveElement<T extends HTMLElement = HTMLElement>(element: T | null) {
    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [element]);
}
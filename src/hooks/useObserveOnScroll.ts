import { useEffect, useRef } from "react";

/**
 * Hook to observe an element and add 'visible' class when it enters viewport
 * Usage: const ref = useRef(); useObserveElement(ref);
 * Usage: const ref = useObserveOnScroll<HTMLDivElement>();
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

/**
 * Hook to create a ref and observe it when it's set
 * Usage: const ref = useObserveOnScroll<HTMLDivElement>();
 */
export function useObserveOnScroll<T extends HTMLElement = HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
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
    }, []);

    return ref;
}
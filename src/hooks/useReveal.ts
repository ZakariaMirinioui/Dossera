import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLElement>() {
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
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return ref;
}

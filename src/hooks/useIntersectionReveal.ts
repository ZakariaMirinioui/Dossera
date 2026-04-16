import { useEffect, useRef, useState, type RefObject } from "react";

type Options = {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
};

/**
 * Adds the `visible` class when the element enters the viewport (pairs with `.reveal` in CSS).
 */
export function useIntersectionReveal(options: Options = {}): {
    ref: RefObject<HTMLDivElement>;
    visible: boolean;
} {
    const { threshold = 0.12, rootMargin = "0px 0px -8% 0px", once = true } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setVisible(true);
                if (once) observer.disconnect();
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [once, rootMargin, threshold]);

    return { ref, visible };
}

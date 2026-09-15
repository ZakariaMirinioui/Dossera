import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(
    options: { threshold?: number; stagger?: number } = {}
) {
    const ref = useRef<T>(null);
    const { threshold = 0.15, stagger = 0 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets: (HTMLElement | Element)[] = Array.from(
            el.querySelectorAll('[data-reveal]')
        );

        const items = targets.length ? targets : [el];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = items.indexOf(entry.target);
                        const delay = `${idx * stagger}s`;
                        (entry.target as HTMLElement).style.transitionDelay = delay;
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -10% 0px' }
        );

        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, [threshold, stagger]);

    return ref;
}
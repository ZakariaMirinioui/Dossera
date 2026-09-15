import { useEffect, useRef } from 'react';

export default function BigBrandReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add('oevra-bigbrand--visible');
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="oevra-bigbrand" ref={ref} aria-hidden="true">
            <span className="oevra-bigbrand__text">dossera</span>
        </div>
    );
}
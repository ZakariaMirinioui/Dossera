import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(QUERY).matches;
    });

    useEffect(() => {
        const mql = window.matchMedia(QUERY);
        const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    return prefersReducedMotion;
}

export default usePrefersReducedMotion;
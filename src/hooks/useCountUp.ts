import { useState, useEffect } from "react";

/** Eased count-up for numeric stats; `trigger` when section becomes visible. */
export function useCountUp(target: number, duration = 1500, trigger: boolean): number {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;
        setCount(0);
        const start = performance.now();
        const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        const id = requestAnimationFrame(step);
        return () => cancelAnimationFrame(id);
    }, [target, duration, trigger]);

    return count;
}

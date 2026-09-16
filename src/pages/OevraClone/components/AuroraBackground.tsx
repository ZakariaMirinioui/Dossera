import usePrefersReducedMotion from './usePrefersReducedMotion';

/**
 * Sovereign Aurora background — a single drifting gradient field.
 *
 * Painted by pure CSS (no JS state, no SVG filters). One composited
 * layer is translated via `transform: translate3d` only, so the whole
 * effect costs ~one GPU layer upload and never re-rasterizes per frame.
 *
 * (The earlier "fluted-glass" SVG displacement filter was removed on
 * purpose: `filter: url(...)` on a full-viewport animated layer forces
 * the browser to re-run `feImage`/`feTile`/`feDisplacementMap` for every
 * pixel on every animation frame — the single largest cause of the slow
 * page.)
 *
 * - `prefers-reduced-motion` → static wash, no drift.
 * - <1024px (mobile) → lighter blur / opacity (cheaper raster).
 */
export default function AuroraBackground() {
    const reduced = usePrefersReducedMotion();

    return (
        <div
            className="dz-aurora"
            data-reduced={reduced ? 'true' : undefined}
            aria-hidden="true"
        >
            <div className="dz-aurora__layer" />
        </div>
    );
}
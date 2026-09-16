import usePrefersReducedMotion from './usePrefersReducedMotion';

/**
 * Sovereign Aurora background — ported from the fluted-glass AuroraHero
 * technique (linked-into the design: layers of repeating gradient fields
 * drifting via GPU-composited transforms under an SVG displacement filter).
 *
 * Recolored to the DOSSERA sovereign palette: olive bands on warm canvas.
 * Painted by pure CSS (no JS state) so first paint is instantly alive.
 * - `prefers-reduced-motion` → static wash, no drift, no displacement filter.
 * - <1024px (mobile) → displacement filter disabled; softer, lighter layers.
 */
const FLUTED_MAP =
    'data:image/svg+xml,' +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' color-interpolation-filters='sRGB'>
  <g>
    <rect width='1' height='1' fill='white' />
    <rect width='1' height='1' fill='url(#r)' style='mix-blend-mode:screen' />
    <rect width='1' height='1' fill='url(#g)' style='mix-blend-mode:screen' />
    <rect width='1' height='1' fill='url(#b)' style='mix-blend-mode:screen' />
  </g>
  <defs>
    <radialGradient id='r' cx='0' cy='0' r='1'>
      <stop stop-color='#8DA36A' />
      <stop stop-color='#8DA36A' offset='1' stop-opacity='0' />
    </radialGradient>
    <radialGradient id='g' cx='1' cy='0' r='1'>
      <stop stop-color='#5C7A3A' />
      <stop stop-color='#5C7A3A' offset='1' stop-opacity='0' />
    </radialGradient>
    <radialGradient id='b' cx='0' cy='1' r='1'>
      <stop stop-color='#EAE7DD' />
      <stop stop-color='#EAE7DD' offset='1' stop-opacity='0' />
    </radialGradient>
  </defs>
</svg>`
    );

export default function AuroraBackground() {
    const reduced = usePrefersReducedMotion();

    return (
        <div
            className="dz-aurora"
            data-reduced={reduced ? 'true' : undefined}
            aria-hidden="true"
        >
            <div className="dz-aurora__glass">
                <div className="dz-aurora__layer" />
            </div>
            {!reduced && (
                <svg
                    className="dz-aurora__filter"
                    width="0"
                    height="0"
                    aria-hidden="true"
                    focusable="false"
                >
                    <filter id="dzFlutedGlass" primitiveUnits="objectBoundingBox">
                        <feImage
                            x="0"
                            y="0"
                            result="image_0"
                            href={FLUTED_MAP}
                            preserveAspectRatio="none meet"
                            width="0.04"
                            height="1"
                        />
                        <feTile in="image_0" result="tile_0" />
                        <feGaussianBlur
                            stdDeviation="0.0002"
                            edgeMode="none"
                            in="tile_0"
                            result="bar_smoothness"
                            x="0"
                            y="0"
                        />
                        <feDisplacementMap
                            scale="0.035"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            in="SourceGraphic"
                            in2="bar_smoothness"
                            result="displacement_0"
                        />
                    </filter>
                </svg>
            )}
        </div>
    );
}
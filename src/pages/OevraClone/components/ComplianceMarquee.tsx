import { content } from '../content/dosseraLanding';
import { EyebrowReveal } from './Reveal';

/* ═══════════════════════════════════════════════════
   ComplianceMarquee — dark compliance band.

   A true duplicate-track CSS marquee: BOTH copies of the
   item list sit back-to-back in one track animated to
   translateX(-50%), giving a seamless loop that never
   clips. Linear easing by exception (constant velocity),
   edge-faded with a mask, paused on hover so the claims
   stay readable.
   ═══════════════════════════════════════════════════ */

function Star({ className = '' }: { className?: string }) {
    return (
        <span className={`dz-marquee__star ${className}`} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 0l1.7 5.3L14 7l-5.3 1.7L7 14l-1.7-5.3L0 7l5.3-1.7L7 0z" />
            </svg>
        </span>
    );
}

export default function ComplianceMarquee() {
    const { ticker } = content;

    return (
        <section className="dz-ticker" aria-label="Key platform claims">
            <div className="dz-ticker__head">
                <span className="dz-ticker__pill">
                    <Star className="dz-ticker__pill-star" />
                    {ticker.pill}
                </span>
            </div>

            <EyebrowReveal>
                <div className="dz-ticker__fade">
                    <div className="dz-marquee" data-cursor="hover">
                        <div className="dz-marquee__track">
                            {[0, 1].map((copy) => (
                                <div className="dz-marquee__group" key={copy} aria-hidden={copy === 1}>
                                    {ticker.items.map((item) => (
                                        <span className="dz-marquee__item" key={item.text}>
                                            <Star />
                                            {item.text}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </EyebrowReveal>
        </section>
    );
}
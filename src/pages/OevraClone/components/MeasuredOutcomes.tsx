import { content } from '../content/dosseraLanding';
import Counter from './Counter';
import { EyebrowReveal, RevealGroup, RevealChild } from './Reveal';

/* ═══════════════════════════════════════════════════
   MeasuredOutcomes — dark full-bleed metrics band with a
   slow diagonal sheen sweep (40s CSS loop).
   ═══════════════════════════════════════════════════ */

export default function MeasuredOutcomes() {
    const { outcomes } = content;

    return (
        <section className="dz-outcomes" id="outcomes">
            <div className="dz-outcomes__sheen" aria-hidden="true" />
            <div className="dz-outcomes__inner">
                <div className="dz-outcomes__head">
                    <EyebrowReveal>
                        <span className="dz-outcomes__label">{outcomes.label}</span>
                    </EyebrowReveal>
                    <span className="dz-outcomes__rule" aria-hidden="true" />
                    <EyebrowReveal delay={0.05}>
                        <span className="dz-outcomes__meta">{outcomes.meta}</span>
                    </EyebrowReveal>
                </div>

                <RevealGroup className="dz-outcomes__grid" stagger={0.08}>
                    {outcomes.metrics.map((m) => (
                        <RevealChild key={m.eyebrow} className="dz-outcomes__cell">
                            <span className="dz-outcomes__eyebrow">{m.eyebrow}</span>
                            <span className="dz-outcomes__value">
                                {m.counter ? (
                                    <Counter
                                        value={m.value}
                                        decimals={m.decimals ?? 0}
                                        prefix={m.prefix}
                                        suffix={m.suffix}
                                    />
                                ) : (
                                    <span className="dz-outcomes__static">
                                        <b>{m.prefix}</b>
                                        {m.value}
                                        <small>{m.suffix?.trim()}</small>
                                    </span>
                                )}
                            </span>
                            <span className="dz-outcomes__label">{m.label}</span>
                            <span className="dz-outcomes__sub">{m.sub}</span>
                        </RevealChild>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
import { useState } from 'react';
import { content } from '../content/dosseraLanding';
import TerminalVisual from './TerminalVisual';
import { RevealGroup, RevealChild, EyebrowReveal } from './Reveal';
import Reveal from './Reveal';

/* ═══════════════════════════════════════════════════
   CapabilityList — "what we provide"

   Left sticky lead. Right: accordion rows; the open row
   drives the active green pulse in the terminal visual.
   ═══════════════════════════════════════════════════ */

const UNIT_MAP = [0, 1, 2, 3, 3] as const; // ingest→pfsense, ocr→node1, semantic→node2, govern/rack→dossera

export default function CapabilityList() {
    const { capabilities } = content;
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const toggle = (i: number) => {
        setOpenIdx((prev) => (prev === i ? null : i));
    };

    const activeUnit = openIdx === null ? -1 : UNIT_MAP[openIdx];

    return (
        <section className="dz-list" id="features">
            <div className="dz-list__inner">
                <div className="dz-list__lead">
                    <div className="dz-list__lead-sticky">
                        <EyebrowReveal>
                            <span className="dz-eyebrow">{capabilities.lead}</span>
                        </EyebrowReveal>
                        <Reveal>
                            <h2 className="dz-list__title">{capabilities.title}</h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p className="dz-list__desc">{capabilities.desc}</p>
                        </Reveal>
                    </div>
                </div>

                <div className="dz-list__body">
                    <RevealGroup stagger={0.07}>
                        {capabilities.rows.map((cap, i) => {
                            const isOpen = openIdx === i;
                            return (
                                <RevealChild key={cap.id} className="dz-list__row-wrap">
                                    <div
                                        className={`dz-list__row${isOpen ? ' is-open' : ''}`}
                                    >
                                        <button
                                            type="button"
                                            className="dz-list__row-trigger"
                                            aria-expanded={isOpen}
                                            aria-controls={`cap-panel-${cap.id}`}
                                            onClick={() => toggle(i)}
                                            data-cursor="hover"
                                        >
                                            <span className="dz-list__row-num">{cap.num}</span>
                                            <span className="dz-list__row-title">{cap.title}</span>
                                            <span className="dz-list__row-tag">{cap.tag}</span>
                                            <span className="dz-list__row-chevron" aria-hidden="true">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </button>
                                        <div
                                            id={`cap-panel-${cap.id}`}
                                            role="region"
                                            aria-hidden={!isOpen}
                                            className="dz-list__row-panel"
                                        >
                                            <div className="dz-list__row-panel-inner">
                                                <p className="dz-list__row-desc">{cap.desc}</p>
                                                <ul className="dz-list__row-points">
                                                    {cap.points.map((p) => (
                                                        <li key={p}>{p}</li>
                                                    ))}
                                                </ul>
                                                <div className="dz-list__row-meta">
                                                    {cap.meta.map((m) => (
                                                        <span key={m.label}>
                                                            {m.label} — {m.value}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </RevealChild>
                            );
                        })}
                    </RevealGroup>

                    <Reveal className="dz-list__terminal" amount={0.2}>
                        <TerminalVisual activeIndex={activeUnit} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
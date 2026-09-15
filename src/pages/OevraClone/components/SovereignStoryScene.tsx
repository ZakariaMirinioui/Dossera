import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import usePrefersReducedMotion from './usePrefersReducedMotion';
import { useScrollReveal } from './useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface SceneState {
    count: string;
    eyebrow: string;
    headline: string;
    desc: string;
}

const STATES: SceneState[] = [
    {
        count: '01',
        eyebrow: 'SYS / BOOT',
        headline: 'Every document becomes intelligence.',
        desc: 'One workflow turns the paper in your archives into searchable, governed intelligence — without your data ever leaving the building.',
    },
    {
        count: '02',
        eyebrow: 'OCR / MULTILINGUAL',
        headline: 'Text structure becomes visible.',
        desc: 'Multilingual OCR recognizes Arabic and French, so every scanned file becomes searchable text inside your datacenter.',
    },
    {
        count: '03',
        eyebrow: 'ENRICHMENT',
        headline: 'Metadata resolves.',
        desc: 'Language, date, and classification are understood automatically — before the document reaches your teams.',
    },
    {
        count: '04',
        eyebrow: 'SEMANTIC LAYER',
        headline: 'Meaning emerges.',
        desc: 'Entities and relationships are linked in a semantic layer, so questions return answers — not keyword matches.',
    },
    {
        count: '05',
        eyebrow: 'RETRIEVAL',
        headline: 'The right document rises.',
        desc: 'Hybrid retrieval surfaces the exact section in under 100 milliseconds, ranked by legal relevance.',
    },
    {
        count: '06',
        eyebrow: 'GOVERNANCE',
        headline: 'Access is controlled. Every action is traced.',
        desc: 'Provenance, permissions, and an immutable audit trail resolve the moment a document is touched.',
    },
    {
        count: '07',
        eyebrow: 'SOVEREIGN',
        headline: 'Sovereign by design.',
        desc: 'Zero cloud dependency. In your datacenter, under your control.',
    },
];

const STOPS = [0.1, 0.25, 0.4, 0.58, 0.75, 0.9, 1.0];

function stateIndex(progress: number): number {
    for (let i = 0; i < STOPS.length; i += 1) {
        if (progress < STOPS[i]) return i;
    }
    return STOPS.length - 1;
}

const BACK_DOCS: Record<string, { ref: string; bars: string[] }> = {
    a: { ref: 'N° 2024-A72', bars: ['96%', '88%', '72%', '60%'] },
    b: { ref: 'N° 2023-0118', bars: ['90%', '78%', '84%', '56%'] },
    c: { ref: 'N° 2022-0154', bars: ['94%', '80%', '70%'] },
};

function BackPaper({ variant }: { variant: 'a' | 'b' | 'c' }) {
    const lines = BACK_DOCS[variant];
    return (
        <div className={`oevra-paper oevra-paper--back oevra-paper--${variant}`} aria-hidden="true">
            <div className="oevra-paper__head">
                <span className="oevra-paper__ref">{lines.ref}</span>
            </div>
            <div className="oevra-paper__bars" aria-hidden="true">
                {lines.bars.map((w) => (
                    <span key={w} style={{ width: w }} />
                ))}
            </div>
        </div>
    );
}

function PrimaryPaper() {
    return (
        <div className="oevra-paper oevra-paper--primary">
            <div className="oevra-paper__head">
                <span className="oevra-paper__mark" aria-hidden="true">◆</span>
                <span className="oevra-paper__ref">DOSSIER N° 2024-0063</span>
                <span className="oevra-paper__tag">JUDICIAL</span>
            </div>
            <div className="oevra-paper__title">Demande de révision — dossier 2024-0063</div>
            <div className="oevra-paper__body">
                <p>Objet : certificat d'existence et de non-recours.</p>
                <p>Saisine du tribunal de première instance de Rabat. Déposé le 12 mars, audience fixée au 18 avril.</p>
                <p lang="ar" dir="rtl" className="oevra-paper__ar">طلب مراجعة الملف رقم 2024-0063 الصادر عن المحكمة</p>
                <p>Pièce annexée : procès-verbal n° 2024-A72, annexe 3, sous scellé numérique.</p>
            </div>
            <div className="oevra-paper__footer">
                <span>مصادق عليه — certifié conforme</span>
                <span className="oevra-paper__date">14.06.2024 · RABAT</span>
            </div>

            <div className="oevra-doc-ocr" aria-hidden="true">
                <div className="oevra-doc-ocr__scanner" />
                <span className="oevra-doc-ocr__bracket oevra-doc-ocr__bracket--1" />
                <span className="oevra-doc-ocr__bracket oevra-doc-ocr__bracket--2" />
                <span className="oevra-doc-ocr__bracket oevra-doc-ocr__bracket--3" />
                <span className="oevra-doc-ocr__tag">OCR</span>
            </div>

            <div className="oevra-doc-search" aria-hidden="true">
                <span>recherche : révision</span>
            </div>

            <div className="oevra-doc-chips" aria-hidden="true">
                <span className="oevra-doc-chip">FR</span>
                <span className="oevra-doc-chip">AR</span>
                <span className="oevra-doc-chip">2024</span>
                <span className="oevra-doc-chip oevra-doc-chip--accent">CONFIDENTIAL</span>
                <span className="oevra-doc-note">LANG DETECTED · AR+FR</span>
            </div>

            <div className="oevra-doc-entities" aria-hidden="true">
                <span className="oevra-doc-query">? dossiers liés à la révision</span>
                <span className="oevra-doc-edge" />
                <span className="oevra-doc-entity">A. BENALI</span>
                <span className="oevra-doc-entity oevra-doc-entity--b">COUR DE RABAT</span>
            </div>

            <div className="oevra-doc-govern" aria-hidden="true">
                <span className="oevra-doc-govern__row"><i /> AUDIT LOG</span>
                <span className="oevra-doc-govern__row"><i /> MAGISTRATE — VIEW</span>
                <span className="oevra-doc-govern__row"><i /> CLERK — EDIT</span>
                <span className="oevra-doc-hash">SHA-256 9F3E…C1</span>
                <span className="oevra-doc-provenance">PROVENANCE ✓</span>
            </div>

            <div className="oevra-doc-seal" aria-hidden="true">
                <span className="oevra-doc-seal__ring">
                    <b>DOSSERA</b>
                    <i>SOVEREIGN</i>
                </span>
            </div>
        </div>
    );
}

function SceneDocument({ composed = false }: { composed?: boolean }) {
    const composedCls = composed ? ' oevra-doc--composed' : '';
    return (
        <div className={`oevra-doc-stage${composedCls}`} data-cursor="hover">
            <div className="oevra-doc-wrap oevra-doc-wrap--back">
                <div className="oevra-doc-layer oevra-doc-layer--back1">
                    <BackPaper variant="a" />
                </div>
                <div className="oevra-doc-layer oevra-doc-layer--back2">
                    <BackPaper variant="b" />
                </div>
            </div>
            <div className="oevra-doc-wrap oevra-doc-wrap--mid">
                <div className="oevra-doc-layer oevra-doc-layer--mid">
                    <BackPaper variant="c" />
                </div>
            </div>
            <div className="oevra-doc-wrap oevra-doc-wrap--front">
                <div className="oevra-doc-layer oevra-doc-layer--primary">
                    <PrimaryPaper />
                </div>
                <div className="oevra-doc-result" aria-hidden="true">
                    <span className="oevra-doc-result__title">Dossier 2024-0063 — Révision</span>
                    <span className="oevra-doc-result__snippet">…certificat de non-recours, scellé…</span>
                    <span className="oevra-doc-result__meta">RANKED · SUB-100MS</span>
                </div>
            </div>
        </div>
    );
}

const ARROW = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default function SovereignStoryScene() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const stackedRef = useScrollReveal<HTMLDivElement>({ stagger: 0.05 });

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1023px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const stacked = isMobile || prefersReducedMotion;

    useEffect(() => {
        if (stacked) return undefined;
        const section = sectionRef.current;
        if (!section) return undefined;

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(section);

            const timeline = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const idx = stateIndex(self.progress);
                        setActiveIndex((prev) => (prev === idx ? prev : idx));
                    },
                },
            });

            const q1 = (sel: string) => q(sel);
            const back1 = q1('.oevra-doc-layer--back1');
            const back2 = q1('.oevra-doc-layer--back2');
            const mid = q1('.oevra-doc-layer--mid');
            const primary = q1('.oevra-doc-layer--primary');
            const ocrBrackets = q1('.oevra-doc-ocr__bracket');
            const ocrScanner = q1('.oevra-doc-ocr__scanner');
            const ocrTag = q1('.oevra-doc-ocr__tag');
            const chips = q1('.oevra-doc-chip');
            const note = q1('.oevra-doc-note');
            const query = q1('.oevra-doc-query');
            const edge = q1('.oevra-doc-edge');
            const entities = q1('.oevra-doc-entity');
            const search = q1('.oevra-doc-search');
            const result = q1('.oevra-doc-result');
            const governRows = q1('.oevra-doc-govern__row');
            const hash = q1('.oevra-doc-hash');
            const provenance = q1('.oevra-doc-provenance');
            const seal = q1('.oevra-doc-seal');
            const progressFill = q1('.oevra-story__progress-fill');
            const stage = q1('.oevra-doc-stage');

            timeline
                .fromTo(
                    back1,
                    { opacity: 0, y: 64, scale: 0.94, filter: 'blur(6px)' },
                    { opacity: 0.68, y: 0, scale: 1, filter: 'blur(2.5px)', duration: 0.1 },
                    0
                )
                .fromTo(
                    back2,
                    { opacity: 0, y: 84, scale: 0.9, filter: 'blur(8px)' },
                    { opacity: 0.6, y: 0, scale: 1, filter: 'blur(3.5px)', duration: 0.1 },
                    0.03
                )
                .fromTo(
                    mid,
                    { opacity: 0, y: 36, scale: 0.95, filter: 'blur(4px)' },
                    { opacity: 0.85, y: 0, scale: 1, filter: 'blur(1px)', duration: 0.1 },
                    0.06
                )
                .fromTo(
                    primary,
                    { opacity: 0, y: 38, scale: 0.96, filter: 'blur(6px)' },
                    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.12 },
                    0.08
                )
                .fromTo(progressFill, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
                .fromTo(stage, { x: 0 }, { x: -10, duration: 0.5 }, 0)
                .to(stage, { x: 0, duration: 0.5 }, 0.5)

                .fromTo(
                    ocrBrackets,
                    { opacity: 0, scale: 0.8, y: 6 },
                    { opacity: 1, scale: 1, y: 0, stagger: 0.02, duration: 0.05 },
                    0.1
                )
                .fromTo(ocrTag, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.03 }, 0.12)
                .fromTo(ocrScanner, { yPercent: -110 }, { yPercent: 112, duration: 0.08 }, 0.1)
                .to(ocrScanner, { opacity: 0.25, duration: 0.02 }, 0.2)

                .fromTo(
                    chips,
                    { opacity: 0, y: 10, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, stagger: 0.025, duration: 0.05 },
                    0.25
                )
                .fromTo(note, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.04 }, 0.32)

                .fromTo(query, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.03 }, 0.4)
                .fromTo(
                    entities,
                    { opacity: 0, scale: 0.92 },
                    { opacity: 1, scale: 1, stagger: 0.02, duration: 0.05 },
                    0.46
                )
                .fromTo(edge, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.52)
                .to(chips, { opacity: 0.82, duration: 0.03 }, 0.49)

                .fromTo(
                    search,
                    { opacity: 0, y: -10, scale: 0.97 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.04 },
                    0.58
                )
                .fromTo(
                    result,
                    { opacity: 0, y: 26, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.07 },
                    0.62
                )
                .to(primary, { y: -10, scale: 1.045, duration: 0.07 }, 0.64)
                .to(ocrBrackets, { opacity: 0.32, duration: 0.05 }, 0.7)

                .fromTo(
                    governRows,
                    { opacity: 0, x: 18 },
                    { opacity: 1, x: 0, stagger: 0.025, duration: 0.06 },
                    0.75
                )
                .fromTo(hash, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.03 }, 0.82)
                .fromTo(provenance, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.03 }, 0.84)
                .to(entities, { opacity: 0.45, duration: 0.05 }, 0.78)
                .to(result, { y: -3, duration: 0.05 }, 0.84)
                .to(primary, { y: 0, scale: 1.02, duration: 0.05 }, 0.86)
                .to(chips, { opacity: 0.68, duration: 0.05 }, 0.86)

                .fromTo(
                    seal,
                    { opacity: 0, scale: 0.82, rotate: -8 },
                    { opacity: 1, scale: 1, rotate: 0, duration: 0.05 },
                    0.9
                )
                .to(q1('.oevra-doc-wrap--back'), { y: -4, duration: 0.1 }, 0.9)
                .to(mid, { y: 4, duration: 0.1 }, 0.9)
                .to(primary, { scale: 1, duration: 0.06 }, 0.9);
        }, section);

        const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            cancelAnimationFrame(rafId);
            ctx.revert();
        };
    }, [stacked]);

    useEffect(() => {
        if (stacked) return undefined;
        const section = sectionRef.current;
        if (!section) return undefined;
        const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!hover.matches) return undefined;

        const back = section.querySelector<HTMLElement>('.oevra-doc-wrap--back');
        const mid = section.querySelector<HTMLElement>('.oevra-doc-wrap--mid');
        const front = section.querySelector<HTMLElement>('.oevra-doc-wrap--front');
        const stage = section.querySelector<HTMLElement>('.oevra-doc-stage');
        if (!back || !mid || !front || !stage) return undefined;

        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let curX = tx;
        let curY = ty;
        let rafId = 0;

        const clamp = (v: number) => Math.max(-1, Math.min(1, v));

        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };

        const tick = () => {
            curX += (tx - curX) * 0.12;
            curY += (ty - curY) * 0.12;
            const rect = stage.getBoundingClientRect();
            if (rect.width > 0) {
                const dx = clamp((curX - (rect.left + rect.width / 2)) / (rect.width / 2));
                const dy = clamp((curY - (rect.top + rect.height / 2)) / (rect.height / 2));
                const amp = 8;
                back.style.translate = `${(dx * amp * 0.25).toFixed(2)}px ${(dy * amp * 0.25).toFixed(2)}px`;
                mid.style.translate = `${(dx * amp * 0.55).toFixed(2)}px ${(dy * amp * 0.55).toFixed(2)}px`;
                front.style.translate = `${(dx * amp).toFixed(2)}px ${(dy * amp).toFixed(2)}px`;
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        window.addEventListener('pointermove', onMove, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('pointermove', onMove);
        };
    }, [stacked]);

    if (stacked) {
        return (
            <section className="oevra-story--stacked" id="story" aria-label="How a document becomes intelligent">
                <div className="oevra-story--stacked__inner" ref={stackedRef}>
                    <span className="oevra-story__eyebrow" data-reveal>the dossera system</span>
                    <h2 className="oevra-story--stacked__title" data-reveal>One document. Every capability.</h2>
                    <p className="oevra-story--stacked__sub" data-reveal>
                        Follow the full journey as one scanned file becomes searchable, linked, traced, and sovereign —
                        without your data ever leaving the building.
                    </p>
                    <div data-reveal>
                        <SceneDocument composed />
                    </div>
                    <div className="oevra-story__cards">
                        {STATES.map((state) => (
                            <div key={state.eyebrow} className="oevra-story__card" data-reveal>
                                <span className="oevra-story__eyebrow">
                                    {state.count} — {state.eyebrow}
                                </span>
                                <h3 className="oevra-story__headline">{state.headline}</h3>
                                <p className="oevra-story__desc">{state.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="oevra-story__proof" data-reveal>
                        <span className="oevra-story__proof-metric">0 cloud dependency</span>
                        <span className="oevra-story__proof-label">documents stay inside your datacenter</span>
                        <MagneticButton href="#features" className="oevra-story__cta">
                            Explore the platform
                            {ARROW}
                        </MagneticButton>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className="oevra-story"
            id="story"
            ref={sectionRef}
            aria-label="How a document becomes intelligent"
        >
            <div className="oevra-story__progress" aria-hidden="true">
                <span className="oevra-story__progress-count">
                    {STATES[activeIndex].count} / 07
                </span>
                <span className="oevra-story__progress-track">
                    <span className="oevra-story__progress-fill" />
                </span>
            </div>

            <div className="oevra-story__stage">
                <div className="oevra-story__text">
                    {STATES.map((state, i) => (
                        <div
                            key={state.eyebrow}
                            className={`oevra-story__text-block${i === activeIndex ? ' is-active' : ''}`}
                            aria-hidden={i !== activeIndex}
                        >
                            <span className="oevra-story__eyebrow">
                                {state.count} — {state.eyebrow}
                            </span>
                            <h2 className="oevra-story__headline">{state.headline}</h2>
                            <p className="oevra-story__desc">{state.desc}</p>
                            {i === STATES.length - 1 && (
                                <div className="oevra-story__proof">
                                    <span className="oevra-story__proof-metric">0 cloud dependency</span>
                                    <span className="oevra-story__proof-label">
                                        documents stay inside your datacenter
                                    </span>
                                    <MagneticButton href="#features" className="oevra-story__cta">
                                        Explore the platform
                                        {ARROW}
                                    </MagneticButton>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="oevra-story__visual">
                    <SceneDocument />
                </div>
            </div>
        </section>
    );
}
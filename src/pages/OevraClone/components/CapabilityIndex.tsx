import { useRef, useState } from 'react';
import ScrambleText from './ScrambleText';
import { useScrollReveal } from './useScrollReveal';

interface CapMeta {
    label: string;
    value: string;
}

interface Capability {
    id: string;
    num: string;
    title: string;
    tag: string;
    desc: string;
    points: string[];
    meta: CapMeta[];
    visual: React.ReactNode;
}

function IngestVisual() {
    return (
        <>
            <div className="oevra-cap-ingest">
                <div className="oevra-paper oevra-cap-ingest__paper oevra-cap-ingest__paper--1">
                    <span className="oevra-cap-line" />
                    <span className="oevra-cap-line" style={{ width: '62%' }} />
                    <span className="oevra-cap-line" style={{ width: '44%' }} />
                    <span className="oevra-cap-line oevra-cap-line--warm" style={{ width: '72%' }} />
                </div>
                <div className="oevra-paper oevra-cap-ingest__paper oevra-cap-ingest__paper--2">
                    <span className="oevra-cap-line" />
                    <span className="oevra-cap-line" style={{ width: '54%' }} />
                    <span className="oevra-cap-line oevra-cap-line--warm" style={{ width: '66%' }} />
                </div>
                <div className="oevra-paper oevra-cap-ingest__paper oevra-cap-ingest__paper--3">
                    <span className="oevra-cap-line" />
                    <span className="oevra-cap-line" style={{ width: '68%' }} />
                    <span className="oevra-cap-line" style={{ width: '38%' }} />
                </div>
                <div className="oevra-cap-ingest__scanner" />
            </div>
            <span className="oevra-cap-demo__tag">BATCH + LIVE INGEST</span>
        </>
    );
}

function OcrVisual() {
    return (
        <>
            <div className="oevra-paper oevra-cap-doc">
                <span className="oevra-cap-doc__title">Arrêt n° 2024-118</span>
                <p className="oevra-cap-doc__fr">La cour confirme la décision de première instance rendue le 12 mars.</p>
                <p className="oevra-cap-doc__ar" lang="ar" dir="rtl">أكدت المحكمة قرار المحكمة الابتدائية الصادر بتاريخ 12 مارس</p>
                <p className="oevra-cap-doc__fr">Révision inscrite au rôle de l'audience du 18 avril.</p>
            </div>
            <div className="oevra-doc-ocr">
                <div className="oevra-doc-ocr__scanner" />
                <span className="oevra-doc-ocr__bracket oevra-doc-ocr__bracket--1" />
                <span className="oevra-doc-ocr__bracket oevra-doc-ocr__bracket--2" />
                <span className="oevra-doc-ocr__bracket oevra-doc-ocr__bracket--3" />
                <span className="oevra-doc-ocr__tag">OCR</span>
            </div>
            <span className="oevra-cap-demo__tag">OCR · AR + FR</span>
        </>
    );
}

function SemanticVisual() {
    return (
        <>
            <div className="oevra-paper oevra-cap-doc">
                <span className="oevra-cap-doc__title">Dossier 2024-0063 — Révision</span>
                <p className="oevra-cap-doc__fr">…certificat de non-recours, scellé le 12 mars…</p>
                <p className="oevra-cap-doc__ar" lang="ar" dir="rtl">طلب مراجعة الملف رقم 2024-0063 الصادر عن المحكمة</p>
                <p className="oevra-cap-doc__fr">Pièce 3 sous scellé — procès-verbal 2024-A72.</p>
            </div>
            <div className="oevra-doc-search">recherche : révision</div>
            <div className="oevra-doc-entities">
                <span className="oevra-doc-query">? dossiers liés à la révision</span>
                <span className="oevra-doc-edge" />
                <span className="oevra-doc-entity">A. BENALI</span>
                <span className="oevra-doc-entity oevra-doc-entity--b">COUR DE RABAT</span>
            </div>
            <div className="oevra-doc-result">
                <span className="oevra-doc-result__title">Dossier 2024-0063 — Révision</span>
                <span className="oevra-doc-result__snippet">…certificat de non-recours, scellé…</span>
                <span className="oevra-doc-result__meta">RANKED · SUB-100MS</span>
            </div>
            <span className="oevra-cap-demo__tag">SEMANTIC LAYER</span>
        </>
    );
}

function GovernVisual() {
    return (
        <>
            <div className="oevra-paper oevra-cap-doc">
                <span className="oevra-cap-doc__title">Dossier 2024-0063</span>
                <p className="oevra-cap-doc__fr">Accès contrôlé par rôle. Chaque action est tracée.</p>
                <p className="oevra-cap-doc__fr">Journal d'audit immuable et horodaté, adressable par hash.</p>
            </div>
            <div className="oevra-doc-govern">
                <span className="oevra-doc-govern__row"><i /> MAGISTRATE — VIEW</span>
                <span className="oevra-doc-govern__row"><i /> CLERK — EDIT</span>
                <span className="oevra-doc-govern__row"><i /> ARCHIVIST — EXPORT</span>
                <span className="oevra-doc-hash">SHA-256 9F3E…C1</span>
                <span className="oevra-doc-provenance">PROVENANCE ✓</span>
            </div>
            <span className="oevra-cap-demo__tag">RBAC · AUDIT TRAIL</span>
        </>
    );
}

function RackVisual() {
    return (
        <>
            <div className="oevra-cap-rack">
                <div className="oevra-cap-rack__unit">
                    <span className="oevra-cap-rack__led" />
                    <span className="oevra-cap-rack__name">PFSENSE</span>
                    <span className="oevra-cap-rack__role">FIREWALL · 5 VLANS</span>
                </div>
                <div className="oevra-cap-rack__unit">
                    <span className="oevra-cap-rack__led" />
                    <span className="oevra-cap-rack__name">PROXMOX — NODE 1</span>
                    <span className="oevra-cap-rack__role">HA · ACTIVE</span>
                </div>
                <div className="oevra-cap-rack__unit">
                    <span className="oevra-cap-rack__led" />
                    <span className="oevra-cap-rack__name">PROXMOX — NODE 2</span>
                    <span className="oevra-cap-rack__role">HA · STANDBY</span>
                </div>
                <div className="oevra-cap-rack__unit">
                    <span className="oevra-cap-rack__led" />
                    <span className="oevra-cap-rack__name">DOSSERA</span>
                    <span className="oevra-cap-rack__role">VM · ISOLATED VLAN</span>
                </div>
            </div>
            <span className="oevra-cap-demo__tag">0 CLOUD DEPENDENCY</span>
        </>
    );
}

const CAPABILITIES: Capability[] = [
    {
        id: 'ingest',
        num: '01',
        title: 'Document ingestion',
        tag: 'digitize',
        desc: 'Every format at once. Scanned files, native documents, and legacy archives enter through a single pipeline.',
        points: [
            'batch + live ingest',
            'bilingual-aware digitization',
            'docket auto-linking',
        ],
        meta: [
            { label: 'formats', value: 'PDF · TIFF · native' },
            { label: 'pipeline', value: 'batch + live' },
        ],
        visual: <IngestVisual />,
    },
    {
        id: 'ocr',
        num: '02',
        title: 'OCR + Arabic / French',
        tag: 'multilingual',
        desc: 'Arabic and French recognized in the same document with perfect RTL layout — the full archive becomes searchable text.',
        points: [
            'AR + FR in a single pass',
            'RTL rendering preserved',
            'legacy scans retro-searchable',
        ],
        meta: [
            { label: 'languages', value: 'AR + FR' },
            { label: 'output', value: 'searchable text' },
        ],
        visual: <OcrVisual />,
    },
    {
        id: 'semantic',
        num: '03',
        title: 'Semantic search',
        tag: 'semantic layer',
        desc: 'Questions return answers, not keyword matches. Entities are linked so results rank by legal relevance.',
        points: [
            'semantic entity layer',
            'ranked by legal relevance',
            'sub-100 ms responses',
        ],
        meta: [
            { label: 'latency', value: 'sub-100 ms' },
            { label: 'mode', value: 'hybrid retrieval' },
        ],
        visual: <SemanticVisual />,
    },
    {
        id: 'govern',
        num: '04',
        title: 'Permissions + audit',
        tag: 'governance',
        desc: 'Role-based access with a complete, immutable trace of every action — provenance resolved the moment a document is touched.',
        points: [
            'role-based access (RBAC)',
            'SHA-256 audit trail',
            'full provenance chain',
        ],
        meta: [
            { label: 'access', value: 'role-based' },
            { label: 'audit', value: 'SHA-256' },
        ],
        visual: <GovernVisual />,
    },
    {
        id: 'rack',
        num: '05',
        title: 'On-premise deployment',
        tag: 'sovereign',
        desc: 'Runs entirely in your datacenter on secured infrastructure — zero cloud dependency. From bare metal to production in 2–4 weeks.',
        points: [
            'Proxmox VE + pfSense',
            'five isolated VLANs',
            'high-availability nodes',
        ],
        meta: [
            { label: 'cloud', value: '0 dependency' },
            { label: 'rollout', value: '2–4 weeks' },
        ],
        visual: <RackVisual />,
    },
];

const PANEL_ID = 'cap-panel';

export default function CapabilityIndex() {
    const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 });
    const listRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [active, setActive] = useState(0);
    const count = CAPABILITIES.length;
    const current = CAPABILITIES[active];

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        let idx: number | null = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') idx = (active + 1) % count;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') idx = (active - 1 + count) % count;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = count - 1;
        else if (e.key === 'Escape') {
            e.preventDefault();
            headingRef.current?.focus();
            return;
        } else {
            return;
        }
        e.preventDefault();
        setActive(idx);
        const btn = listRef.current?.querySelector<HTMLButtonElement>(
            `[data-cap-index="${idx}"]`
        );
        btn?.focus();
    };

    return (
        <section className="oevra-cap" id="features" ref={ref}>
            <div className="oevra-cap__inner">
                <div className="oevra-cap__lead" data-reveal>
                    <h2 className="oevra-cap__title" tabIndex={-1} ref={headingRef}>
                        what we provide
                    </h2>
                    <p className="oevra-cap__subtitle">
                        one platform.
                        <br />
                        every document.
                        <br />
                        total control.
                    </p>
                    <p className="oevra-cap__desc">
                        A sovereign document OS for judicial institutions — a suite of
                        capabilities designed around science, security, and operational
                        reality.
                    </p>

                    <div className="oevra-cap__detail" key={current.id}>
                        <span className="oevra-cap__detail-tag">
                            {current.num} — {current.tag}
                        </span>
                        <p className="oevra-cap__detail-desc">{current.desc}</p>
                        <ul className="oevra-cap__detail-points">
                            {current.points.map((p) => (
                                <li key={p}>{p}</li>
                            ))}
                        </ul>
                        <div className="oevra-cap__detail-meta">
                            {current.meta.map((m) => (
                                <span key={m.label}>
                                    {m.label} — {m.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="oevra-cap__body">
                    <div data-reveal>
                        <div
                            className="oevra-cap__rows-list"
                            ref={listRef}
                            role="tablist"
                            aria-label="DOSSERA capabilities"
                            onKeyDown={onKeyDown}
                        >
                            {CAPABILITIES.map((cap, i) => (
                                <button
                                    key={cap.id}
                                    type="button"
                                    role="tab"
                                    id={`cap-tab-${cap.id}`}
                                    className={`oevra-cap__row${i === active ? ' is-active' : ''}`}
                                    aria-selected={i === active}
                                    aria-controls={PANEL_ID}
                                    tabIndex={i === active ? 0 : -1}
                                    data-cap-index={i}
                                    onClick={() => setActive(i)}
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => setActive(i)}
                                    data-cursor="hover"
                                >
                                    <span className="oevra-cap__row-num">{cap.num}</span>
                                    <span className="oevra-cap__row-title">
                                        <ScrambleText text={cap.title} />
                                    </span>
                                    <span className="oevra-cap__row-tag">{cap.tag}</span>
                                    <span className="oevra-cap__row-arrow" aria-hidden="true">→</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="oevra-cap__visual" data-reveal>
                        <div
                            id={PANEL_ID}
                            role="tabpanel"
                            aria-labelledby={`cap-tab-${current.id}`}
                            className="oevra-cap__demo-stack"
                        >
                            {CAPABILITIES.map((cap, i) => (
                                <figure
                                    key={cap.id}
                                    className={`oevra-cap__demo oevra-cap-demo--${cap.id}${i === active ? ' is-active' : ''}`}
                                    aria-hidden={i !== active}
                                >
                                    <div className="oevra-cap-demo__stage">{cap.visual}</div>
                                    <span className="oevra-cap-demo__tag">
                                        {cap.num} · {cap.tag}
                                    </span>
                                </figure>
                            ))}
                        </div>
                        <p className="oevra-cap__sr" role="status">
                            {current.num} — {current.title}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
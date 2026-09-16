/* ═══════════════════════════════════════════════════
   Shared capability visuals — used by both the pinned
   CapabilityGallery and the CapabilityList accordion.
   ═══════════════════════════════════════════════════ */

export function IngestVisual() {
    return (
        <div className="dz-cap-visual">
            <div className="dz-cap-visual__stage">
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
            </div>
            <span className="dz-cap-visual__tag">BATCH + LIVE INGEST</span>
        </div>
    );
}

export function OcrVisual() {
    return (
        <div className="dz-cap-visual">
            <div className="dz-cap-visual__stage">
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
            </div>
            <span className="dz-cap-visual__tag">OCR · AR + FR</span>
        </div>
    );
}

export function SemanticVisual() {
    return (
        <div className="dz-cap-visual">
            <div className="dz-cap-visual__stage">
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
            </div>
            <span className="dz-cap-visual__tag">SEMANTIC LAYER</span>
        </div>
    );
}

export function GovernVisual() {
    return (
        <div className="dz-cap-visual">
            <div className="dz-cap-visual__stage">
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
            </div>
            <span className="dz-cap-visual__tag">RBAC · AUDIT TRAIL</span>
        </div>
    );
}

export function RackVisual() {
    return (
        <div className="dz-cap-visual">
            <div className="dz-cap-visual__stage">
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
            </div>
            <span className="dz-cap-visual__tag">0 CLOUD DEPENDENCY</span>
        </div>
    );
}

export const CAPABILITY_VISUALS = [
    <IngestVisual key="ingest" />,
    <OcrVisual key="ocr" />,
    <SemanticVisual key="semantic" />,
    <GovernVisual key="govern" />,
    <RackVisual key="rack" />,
] as const;
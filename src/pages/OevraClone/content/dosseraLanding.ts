/* ═══════════════════════════════════════════════════
   DOSSERA LANDING — Content Inventory & Config

   Every string the page renders is sourced from this single
   typed object. Copy and layout are decoupled: changing text
   here never touches structure, and no component hardcodes a
   string inline.

   All product claims below are preserved verbatim from the
   current build and must not be invented or rounded.
   ═══════════════════════════════════════════════════ */

export interface NavLinkItem {
    label: string;
    href: string;
}

export interface MetricStat {
    value: number;
    counter: boolean;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    sub: string;
    eyebrow: string;
}

export interface StepNode {
    num: string;
    label: string;
}

export interface CapMeta {
    label: string;
    value: string;
}

export interface Capability {
    id: string;
    num: string;
    index: string;
    title: string;
    tag: string;
    desc: string;
    points: string[];
    meta: CapMeta[];
}

export interface TickerItem {
    text: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

export interface PricingCard {
    id: string;
    label: string;
    amount: string;
    period: string;
    info: string;
    cta: string;
    href: string;
    featured?: boolean;
    ribbon?: string;
}

export const content = {
    /* ── Header ── */
    header: {
        logo: 'dossera',
        navLinks: [
            { label: 'Platform', href: '#platform' },
            { label: 'Capabilities', href: '#capabilities' },
            { label: 'Outcomes', href: '#outcomes' },
            { label: 'Engage', href: '#engage' },
        ] as NavLinkItem[],
        backLink: { label: 'back to dossera', href: '/' } as NavLinkItem,
        cta: { label: 'Book Assessment', href: '#engage' } as NavLinkItem,
        menuOpenLabel: 'Open menu',
        menuCloseLabel: 'Close menu',
        ariaNav: 'Primary',
    },

    /* ── Hero ── */
    hero: {
        eyebrow: 'dossera',
        headlineTop: 'intelligent document operations for',
        headlineAccent: 'sub-100ms semantic search',
        sub: 'DOSSERA is the sovereign, on-premise document intelligence platform for judicial institutions — the full document lifecycle, from digitization to certified archiving and instant semantic search, entirely inside your own datacenter.',
        primaryCta: 'Book Assessment',
        primaryHref: '#engage',
        secondaryCta: 'See how it works',
        secondaryHref: '#capabilities',
        scrollHint: 'scroll to explore',
    },

    /* ── Terminal / product visual ── */
    terminal: {
        caption: 'ARCHIVE → OCR → INDEX',
        rackName: 'DOSSERA CORE',
        rackRole: 'VM · ISOLATED VLAN',
        units: [
            { name: 'PFSENSE', role: 'FIREWALL · 5 VLANS' },
            { name: 'PROXMOX — NODE 1', role: 'HA · ACTIVE' },
            { name: 'PROXMOX — NODE 2', role: 'HA · STANDBY' },
            { name: 'DOSSERA', role: 'VM · ISOLATED VLAN' },
        ],
        bootLines: [
            'SYS / BOOT — AES-256 OK',
            'PFSENSE — 5 ISOLATED VLANS',
            'PROXMOX NODE 1 — HA ACTIVE',
            'PROXMOX NODE 2 — HA STANDBY',
            'DOSSERA CORE — ZERO CLOUD DEPENDENCY',
        ],
    },

    /* ── Section 01 — document stack ── */
    story: {
        eyebrow: 'SYS / BOOT',
        title: 'Every document becomes intelligence.',
        desc: 'One workflow turns the paper in your archives into searchable, governed intelligence — without your data ever leaving the building.',
        caption: 'ARCHIVE → OCR → INDEX',
    },

    /* ── Capability gallery (pinned) ── */
    gallery: {
        label: 'CAPABILITIES',
        intro: 'The full document lifecycle — one capability after another, inside your own datacenter.',
        steps: [
            {
                num: '01',
                index: 'STEP 01',
                title: 'Document ingestion',
                tag: 'digitize',
                desc: 'Every format at once. Scanned files, native documents, and legacy archives enter through a single pipeline.',
            },
            {
                num: '02',
                index: 'STEP 02',
                title: 'OCR + Arabic / French',
                tag: 'multilingual',
                desc: 'Arabic and French recognized in the same document with perfect RTL layout — the full archive becomes searchable text.',
            },
            {
                num: '03',
                index: 'STEP 03',
                title: 'Semantic search',
                tag: 'semantic layer',
                desc: 'Questions return answers, not keyword matches. Entities are linked so results rank by legal relevance.',
            },
            {
                num: '04',
                index: 'STEP 04',
                title: 'Permissions + audit',
                tag: 'governance',
                desc: 'Role-based access with a complete, immutable trace of every action — provenance resolved the moment a document is touched.',
            },
            {
                num: '05',
                index: 'STEP 05',
                title: 'On-premise deployment',
                tag: 'sovereign',
                desc: 'Runs entirely in your datacenter on secured infrastructure — zero cloud dependency. From bare metal to production in 2–4 weeks.',
            },
        ],
        counterLabel: '/ 05',
    },

    /* ── Compliance ticker ── */
    ticker: {
        pill: 'SOVEREIGN BY DESIGN',
        items: [
            { text: '99.9% availability' },
            { text: 'sub-100ms search' },
            { text: '98%+ OCR accuracy' },
            { text: '8-layer defense in depth' },
            { text: 'AES-256 encryption' },
            { text: 'zero cloud dependency' },
            { text: '5 isolated VLANs' },
            { text: '2–4 week deployment' },
            { text: 'RBAC & immutable audit' },
            { text: 'fully sovereign' },
        ] as TickerItem[],
    },

    /* ── Sovereign platform section ── */
    platform: {
        badge: 'sovereign by design',
        titleLines: [
            'the sovereign platform',
            'that transforms your',
            'document operations',
        ],
        title: 'the sovereign platform that transforms your document operations',
        desc: 'Millions of paper documents. Endless manual searches. Escalating compliance risk. DOSSERA replaces fragile paper workflows with a certified, immutable, AI-assisted archive — designed to run entirely in your own datacenter, with zero cloud dependency.',
        cta: 'Request Deployment Scope',
        ctaHref: '#engage',
        coreLabel: 'DOSSERA CORE',
        steps: [
            { num: '01', label: 'DIGITIZE' },
            { num: '02', label: 'ARCHIVE' },
            { num: '03', label: 'SEARCH' },
            { num: '04', label: 'SECURE' },
            { num: '05', label: 'SCALE' },
        ] as StepNode[],
        metrics: [
            {
                value: 98.2,
                counter: true,
                decimals: 1,
                suffix: '%',
                label: 'OCR accuracy',
                sub: 'Arabic + French in a single pass',
                eyebrow: 'OCR FIDELITY',
            },
            {
                value: 100,
                counter: false,
                prefix: '<',
                suffix: ' ms',
                label: 'search response',
                sub: 'normalized sub-100 ms latency',
                eyebrow: 'RETRIEVAL',
            },
            {
                value: 8,
                counter: true,
                suffix: '',
                label: 'security layers',
                sub: 'defense in depth, default-deny',
                eyebrow: 'HARDENING',
            },
        ] as MetricStat[],
    },

    /* ── Capability list + terminal ── */
    capabilities: {
        lead: 'what we provide',
        title: 'one platform. every document. total control.',
        desc: 'A sovereign document OS for judicial institutions — a suite of capabilities designed around science, security, and operational reality.',
        rows: [
            {
                id: 'ingest',
                num: '01',
                index: '01',
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
            },
            {
                id: 'ocr',
                num: '02',
                index: '02',
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
            },
            {
                id: 'semantic',
                num: '03',
                index: '03',
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
            },
            {
                id: 'govern',
                num: '04',
                index: '04',
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
            },
            {
                id: 'rack',
                num: '05',
                index: '05',
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
            },
        ] as Capability[],
    },

    /* ── Measured outcomes (dark band) ── */
    outcomes: {
        label: 'measured outcomes',
        meta: 'in your datacenter · zero cloud',
        metrics: [
            {
                value: 99.9,
                counter: true,
                decimals: 1,
                suffix: '%',
                label: 'system availability',
                sub: 'automatic failover',
                eyebrow: 'UPTIME',
            },
            {
                value: 100,
                counter: false,
                prefix: '<',
                suffix: ' ms',
                label: 'search response',
                sub: 'normalized sub-100 ms',
                eyebrow: 'LATENCY',
            },
            {
                value: 98.2,
                counter: true,
                decimals: 1,
                suffix: '%',
                label: 'OCR accuracy',
                sub: 'Arabic + French',
                eyebrow: 'FIDELITY',
            },
            {
                value: 5,
                counter: true,
                suffix: '',
                label: 'isolated VLANs',
                sub: 'default-deny routing',
                eyebrow: 'SEGMENTATION',
            },
        ] as MetricStat[],
    },

    /* ── Testimonials ── */
    testimonials: {
        count: '(07)',
        label: 'client outcomes',
        items: [
            {
                quote: 'Hours of manual archive search became milliseconds. Our teams stopped hunting folders and started finding answers — the workflow simply vanished.',
                author: 'ARCHIVE DIRECTOR',
                role: 'Court of Appeal',
            },
            {
                quote: 'The 5-VLAN segmentation and SOC monitoring gave us something we never had: full visibility. Intrusion tests are detected and blocked in real time.',
                author: 'IT ADMINISTRATOR',
                role: 'Judicial institution',
            },
            {
                quote: 'Arabic OCR above 98% changed everything. Thousands of scanned documents became searchable text overnight — no re-keying, no typing errors.',
                author: 'DOCUMENTATION LEAD',
                role: 'Court services',
            },
            {
                quote: 'The deployment from bare metal to production took three weeks, with training included. No cloud, no third party — everything runs on-premise.',
                author: 'PROJECT SPONSOR',
                role: 'Institutional buyer',
            },
            {
                quote: 'For the first time we have a certified, immutable audit trail. Every view, edit, and export is timestamped and unalterable. Compliance is now an outcome, not a threat.',
                author: 'COMPLIANCE OFFICER',
                role: 'Regulatory oversight',
            },
            {
                quote: 'AES-256 with 90-day key rotation, 2FA on everything, and a validated DRP with sub-24h RPO. Security stopped being a worry and became a fact.',
                author: 'SECURITY MANAGER',
                role: 'Datacenter operations',
            },
            {
                quote: 'Our judges now search across decades of case history in less than 100 milliseconds. The confidence and speed this brings is transformative.',
                author: 'HEAD OF RECORDS',
                role: 'Court of First Instance',
            },
        ] as Testimonial[],
    },

    /* ── Pricing ── */
    pricing: {
        title: 'choose how you engage',
        subtitle: 'start with a free, real assessment of your document operations',
        desc: 'Every institution is different. Pick the entry point that fits — then commit with confidence. Certified, sovereign, and designed to pay for itself from the first week.',
        cards: [
            {
                id: 'assessment',
                label: '30-min assessment',
                amount: '$0',
                period: 'free',
                info: '30 minutes. No pitch. A real assessment of your archive, your constraints, and your fast wins.',
                cta: 'Book Assessment',
                href: '#contact',
            },
            {
                id: 'deployment',
                label: 'full deployment',
                amount: 'tailored',
                period: 'fixed-cost',
                info: 'From bare metal to production in 2–4 weeks. Ansible-virtualized, SOC-protected, with training and a validated disaster recovery plan included.',
                cta: 'Request Deployment Quote',
                href: '#contact',
                featured: true,
                ribbon: 'RECOMMENDED FOR INSTITUTIONS',
            },
        ] as PricingCard[],
        foot: 'Explore platform capabilities',
        footHref: '#capabilities',
    },

    /* ── Final CTA + wordmark + footer ── */
    finalCta: {
        eyebrow: 'ENGAGE',
        accentLine: 2,
        mark: 'DOS / SERA',
        titleLines: [
            'win back your time.',
            'win back your budget.',
            'own your data.',
        ],
        desc: 'Stop losing hours to paper, errors, and compliance dread. Start with a free 30-minute assessment — no pitch, just a real evaluation of your document operations.',
        primaryCta: 'Start Free Assessment',
        primaryHref: 'mailto:dossera.support@gmail.com',
        secondaryCta: 'Request a Live Demonstration',
        secondaryHref: '/demande-demo',
        wordmark: 'dossera',
    },

    footer: {
        copy: '© 2026 DOSSERA — JAMS System',
        sovereign: 'built in Khouribga · sovereign by design',
        links: [
            { label: 'Platform', href: '#platform' },
            { label: 'Contact', href: '#contact' },
            { label: 'Request demo', href: '/demande-demo' },
            { label: 'Back to site', href: '/' },
        ] as NavLinkItem[],
    },
} as const;

export type LandingContent = typeof content;
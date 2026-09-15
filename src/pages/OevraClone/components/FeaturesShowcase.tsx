import { useEffect, useRef, useState } from 'react';

const FEATURES = [
    {
        num: '01',
        title: 'INTELLIGENT OCR',
        desc: 'Multilingual optical character recognition for Arabic and French judicial documents. Over 98% accuracy, with automatic correction using a built-in legal lexicon. Every scanned file becomes instantly searchable text.',
        color: '#395d38',
        ratio: '3/4',
        width: '15rem',
        pos: 'left: 8%; top: 16%',
        metric: '>98%',
        metricLabel: 'OCR accuracy',
    },
    {
        num: '02',
        title: 'SEMANTIC SEARCH',
        desc: 'A dual-engine hybrid search pairs Meilisearch instant full-text with pgvector semantic vectors. Results are ranked by relevance with automatic term suggestion — and served in under 100 milliseconds.',
        color: '#4f663c',
        ratio: '0.8',
        width: '28rem',
        pos: 'left: 28%; top: 4%',
        metric: '<100ms',
        metricLabel: 'search response',
    },
    {
        num: '03',
        title: 'IMMUTABLE ARCHIVE',
        desc: 'S3-compatible MinIO storage with AES-256 encryption at rest, configurable retention per document type, certified retention cycles, and automatic purge. SHA-256 integrity and legal non-repudiation — guaranteed.',
        color: '#5a7340',
        ratio: '1.4',
        width: '31rem',
        pos: 'right: 4%; top: 12%',
        metric: 'AES-256',
        metricLabel: 'at rest encryption',
    },
    {
        num: '04',
        title: 'RBAC & AUDIT',
        desc: 'Granular role-based access for magistrate, clerk, administrator, and auditor profiles — every user sees only what they are authorized to see, with a timestamped, immutable audit trail of every action.',
        color: '#6b7f42',
        ratio: '1.35',
        width: '26rem',
        pos: 'left: 20%; bottom: 4%',
        metric: '4',
        metricLabel: 'role profiles',
    },
    {
        num: '05',
        title: 'SOC MONITORING',
        desc: 'A live operational dashboard paired with Wazuh SIEM, CrowdSec and Grafana. Real-time event correlation, automated alerts, and instant response playbooks across five isolated VLANs.',
        color: '#778643',
        ratio: '2/3',
        width: '19rem',
        pos: 'right: 6%; bottom: 6%',
        metric: '5',
        metricLabel: 'isolated VLANs',
    },
];

export default function FeaturesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;
            const p = Math.max(0, Math.min(1, scrolled / totalHeight));
            const index = Math.min(FEATURES.length - 1, Math.floor(p * FEATURES.length));
            setActiveIndex(index);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="oevra-features-showcase" ref={containerRef}>
            <div className="oevra-features-showcase__sticky">
                <div className="oevra-features-showcase__media oevra-media-details">
                    {FEATURES.map((feat, i) => (
                        <div
                            key={feat.num}
                            className={`oevra-media oevra-media--${i + 1} ${
                                i === activeIndex ? 'oevra-media--active' : ''
                            } ${Math.abs(i - activeIndex) === 1 ? 'oevra-media--adjacent' : ''}`}
                            style={
                                {
                                    '--card-color': feat.color,
                                    '--ratio': feat.ratio,
                                    '--media-width': feat.width,
                                    left: feat.pos.includes('left') ? feat.pos.split('left:')[1].split(';')[0].trim() : 'auto',
                                    right: feat.pos.includes('right') ? feat.pos.split('right:')[1].split(';')[0].trim() : 'auto',
                                    top: feat.pos.includes('top') ? feat.pos.split('top:')[1].split(';')[0].trim() : 'auto',
                                    bottom: feat.pos.includes('bottom') ? feat.pos.split('bottom:')[1].split(';')[0].trim() : 'auto',
                                } as React.CSSProperties
                            }
                        >
                            <div className="oevra-media__inner">
                                <div className="oevra-media__appcard">
                                    <div className="oevra-media__appcard-top">
                                        <span className="oevra-media__appcard-num">{feat.num}</span>
                                        <span className="oevra-media__appcard-status">
                                            <i />
                                            active
                                        </span>
                                    </div>
                                    <div className="oevra-media__appcard-body">
                                        <div className="oevra-media__appcard-bars">
                                            <span style={{ width: '92%' }} />
                                            <span style={{ width: '74%' }} />
                                            <span style={{ width: '86%' }} />
                                            <span style={{ width: '62%' }} />
                                        </div>
                                    </div>
                                    <div className="oevra-media__appcard-foot">
                                        <span className="oevra-media__appcard-metric">{feat.metric}</span>
                                        <span className="oevra-media__appcard-metriclabel">{feat.metricLabel}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="oevra-media__text">
                                <span className="oevra-media__text-num">{feat.num}</span>
                                <span className="oevra-media__text-title">{feat.title}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="oevra-features-showcase__info">
                    <div className="oevra-features-showcase__progress" aria-hidden="true">
                        {FEATURES.map((_, i) => (
                            <span
                                key={i}
                                className={`oevra-features-showcase__progress-dot ${
                                    i <= activeIndex ? 'is-done' : ''
                                }`}
                            />
                        ))}
                    </div>
                    {FEATURES.map((feat, i) => (
                        <div
                            key={feat.num}
                            className={`oevra-features-showcase__detail ${
                                i === activeIndex ? 'oevra-features-showcase__detail--active' : ''
                            }`}
                        >
                            <h3 className="oevra-features-showcase__detail-title">
                                <span className="oevra-features-showcase__detail-num">{feat.num}</span>
                                {feat.title}
                            </h3>
                            <p className="oevra-features-showcase__detail-desc">{feat.desc}</p>
                            <div className="oevra-features-showcase__detail-metric">
                                <span className="oevra-features-showcase__detail-metric-value">{feat.metric}</span>
                                <span className="oevra-features-showcase__detail-metric-label">{feat.metricLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
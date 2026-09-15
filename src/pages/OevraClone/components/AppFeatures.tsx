import { useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import ScrambleText from './ScrambleText';

const APP_FEATURES = [
    {
        id: 'jams',
        num: '01',
        title: 'The JAMS Platform',
        eyebrow: 'core',
        desc: 'A decoupled client-server platform handling the full lifecycle of judicial documents — from digitization and multilingual OCR, through certified immutable archiving, to instant semantic search.',
        details: [
            'Five-stage workflow: digitize, archive, search, secure, scale',
            'Bilingual UI — Arabic and French with perfect RTL rendering',
            'Version 2.4, built for institutional requirements',
            'Live dashboards with real-time monitoring (Socket.IO)',
        ],
    },
    {
        id: 'infrastructure',
        num: '02',
        title: 'Sovereign Infrastructure',
        eyebrow: 'in your datacenter',
        desc: 'Every service virtualized on Proxmox VE in your own datacenter, protected by a pfSense firewall. Zero cloud dependency — your data never leaves the institution.',
        details: [
            'Type-1 bare-metal hypervisor with complete VM isolation',
            'ZFS snapshots for instant backups and live migration',
            'Automatic failover to secondary node in high-availability mode',
            'Five isolated VLANs with Default-Deny inter-VLAN routing',
            'Geographic blocking of non-Moroccan IPs at the firewall',
        ],
    },
    {
        id: 'security',
        num: '03',
        title: 'Security in Depth',
        eyebrow: '8 layers',
        desc: 'Eight layers of defense protect sensitive judicial data — from physical firewall down to AES-256 encryption and mandatory 2FA, all correlated in real time by the SOC.',
        details: [
            'pfSense firewall with Stateful Packet Inspection',
            'Wazuh SIEM with agent-based event correlation',
            'CrowdSec dynamic blocking of suspicious behavior',
            'T-Pot honeypot captures intrusion attempts (IoCs only)',
            'AES-256 at rest, TLS 1.3 in transit, 90-day key rotation',
            '2FA on all admin access — TOTP, FIDO2, or both',
        ],
    },
    {
        id: 'deployment',
        num: '04',
        title: 'Deployment & Training',
        eyebrow: '2–4 weeks',
        desc: 'A validated, industrialized rollout — from bare metal to production in two to four weeks, with team training and a proven disaster recovery plan delivered at completion.',
        details: [
            'Ansible-driven deployment, update, and backup playbooks',
            'Week 1: Proxmox + pfSense foundation',
            'Weeks 2–4: JAMS stack, SOC integration, staff training',
            'Validated Disaster Recovery Plan (DRP) delivered',
            'RPO under 24 hours with off-site backups',
        ],
    },
    {
        id: 'evolution',
        num: '05',
        title: 'Support & Evolution',
        eyebrow: 'roadmap',
        desc: 'A clear, continuous roadmap — next-generation SIEM, ML-based behavioral anomaly detection, and a certified digital safe with key vault.',
        details: [
            '2nd-generation SIEM with cross-VLAN correlation',
            'ML-based anomaly detection on archive access patterns',
            'Digital safe with key vault and certified dematerialization',
            'External security audit by a DGSSI-accredited body',
            'Quarterly resilience testing of the DRP',
        ],
    },
];

export default function AppFeatures() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.05 });

    return (
        <section className="oevra-app-features" id="features" ref={ref}>
            <div className="oevra-app-features__inner">
                <div className="oevra-app-features__header">
                    <h2 className="oevra-app-features__title" data-reveal>
                        what we provide
                    </h2>
                    <p className="oevra-app-features__subtitle" data-reveal>
                        one platform.<br />
                        every document.<br />
                        total control.
                    </p>
                    <p className="oevra-app-features__desc" data-reveal>
                        A sovereign document OS for judicial institutions — a suite of
                        capabilities designed around science, security, and operational reality,
                        for holistic support of your archives.
                    </p>
                </div>

                <div className="oevra-app-features__list" data-reveal>
                    {APP_FEATURES.map((feat, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={feat.id}
                                className={`oevra-app-features__item ${isOpen ? 'oevra-app-features__item--open' : ''}`}
                            >
                                <button
                                    className="oevra-app-features__item-header"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    data-cursor="hover"
                                >
                                    <span className="oevra-app-features__item-title">
                                        <span className="oevra-app-features__item-num">{feat.num}</span>
                                        <ScrambleText text={feat.title} />
                                    </span>
                                    <span className="oevra-app-features__item-eyebrow">{feat.eyebrow}</span>
                                    <span className="oevra-app-features__item-toggle">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div className={`oevra-app-features__item-body ${isOpen ? 'oevra-app-features__item-body--open' : ''}`}>
                                    <p className="oevra-app-features__item-desc">{feat.desc}</p>
                                    <ul className="oevra-app-features__item-list">
                                        {feat.details.map((d, j) => (
                                            <li key={j}>{d}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
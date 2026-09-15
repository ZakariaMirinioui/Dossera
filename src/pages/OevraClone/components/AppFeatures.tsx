import { useScrollReveal } from './useScrollReveal';
import ScrambleText from './ScrambleText';
import Accordion from './Accordion';
import type { AccordionItem } from './Accordion';

const FEATURES: AccordionItem[] = [
    {
        id: 'jams',
        renderHeader: ({ isOpen: _isOpen }) => (
            <span className="oevra-app-features__item-header" data-cursor="hover">
                <span className="oevra-app-features__item-title">
                    <span className="oevra-app-features__item-num">01</span>
                    <ScrambleText text="The JAMS Platform" />
                </span>
                <span className="oevra-app-features__item-eyebrow">core</span>
                <span className="oevra-app-features__item-toggle" aria-hidden="true">
                    +
                </span>
            </span>
        ),
        content: (
            <div className="oevra-app-features__item-content">
                <p className="oevra-app-features__item-desc">
                    A decoupled client-server platform handling the full lifecycle of judicial
                    documents — from digitization and multilingual OCR, through certified immutable
                    archiving, to instant semantic search.
                </p>
                <ul className="oevra-app-features__item-list">
                    <li>Five-stage workflow: digitize, archive, search, secure, scale</li>
                    <li>Bilingual UI — Arabic and French with perfect RTL rendering</li>
                    <li>Version 2.4, built for institutional requirements</li>
                    <li>Live dashboards with real-time monitoring (Socket.IO)</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'infrastructure',
        renderHeader: ({ isOpen: _isOpen }) => (
            <span className="oevra-app-features__item-header" data-cursor="hover">
                <span className="oevra-app-features__item-title">
                    <span className="oevra-app-features__item-num">02</span>
                    <ScrambleText text="Sovereign Infrastructure" />
                </span>
                <span className="oevra-app-features__item-eyebrow">in your datacenter</span>
                <span className="oevra-app-features__item-toggle" aria-hidden="true">
                    +
                </span>
            </span>
        ),
        content: (
            <div className="oevra-app-features__item-content">
                <p className="oevra-app-features__item-desc">
                    Every service virtualized on Proxmox VE in your own datacenter, protected by a
                    pfSense firewall. Zero cloud dependency — your data never leaves the institution.
                </p>
                <ul className="oevra-app-features__item-list">
                    <li>Type-1 bare-metal hypervisor with complete VM isolation</li>
                    <li>ZFS snapshots for instant backups and live migration</li>
                    <li>Automatic failover to secondary node in high-availability mode</li>
                    <li>Five isolated VLANs with Default-Deny inter-VLAN routing</li>
                    <li>Geographic blocking of non-Moroccan IPs at the firewall</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'security',
        renderHeader: ({ isOpen: _isOpen }) => (
            <span className="oevra-app-features__item-header" data-cursor="hover">
                <span className="oevra-app-features__item-title">
                    <span className="oevra-app-features__item-num">03</span>
                    <ScrambleText text="Security in Depth" />
                </span>
                <span className="oevra-app-features__item-eyebrow">8 layers</span>
                <span className="oevra-app-features__item-toggle" aria-hidden="true">
                    +
                </span>
            </span>
        ),
        content: (
            <div className="oevra-app-features__item-content">
                <p className="oevra-app-features__item-desc">
                    Eight layers of defense protect sensitive judicial data — from physical firewall
                    down to AES-256 encryption and mandatory 2FA, all correlated in real time by the SOC.
                </p>
                <ul className="oevra-app-features__item-list">
                    <li>pfSense firewall with Stateful Packet Inspection</li>
                    <li>Wazuh SIEM with agent-based event correlation</li>
                    <li>CrowdSec dynamic blocking of suspicious behavior</li>
                    <li>T-Pot honeypot captures intrusion attempts (IoCs only)</li>
                    <li>AES-256 at rest, TLS 1.3 in transit, 90-day key rotation</li>
                    <li>2FA on all admin access — TOTP, FIDO2, or both</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'deployment',
        renderHeader: ({ isOpen: _isOpen }) => (
            <span className="oevra-app-features__item-header" data-cursor="hover">
                <span className="oevra-app-features__item-title">
                    <span className="oevra-app-features__item-num">04</span>
                    <ScrambleText text="Deployment & Training" />
                </span>
                <span className="oevra-app-features__item-eyebrow">2–4 weeks</span>
                <span className="oevra-app-features__item-toggle" aria-hidden="true">
                    +
                </span>
            </span>
        ),
        content: (
            <div className="oevra-app-features__item-content">
                <p className="oevra-app-features__item-desc">
                    A validated, industrialized rollout — from bare metal to production in two to four
                    weeks, with team training and a proven disaster recovery plan delivered at completion.
                </p>
                <ul className="oevra-app-features__item-list">
                    <li>Ansible-driven deployment, update, and backup playbooks</li>
                    <li>Week 1: Proxmox + pfSense foundation</li>
                    <li>Weeks 2–4: JAMS stack, SOC integration, staff training</li>
                    <li>Validated Disaster Recovery Plan (DRP) delivered</li>
                    <li>RPO under 24 hours with off-site backups</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'evolution',
        renderHeader: ({ isOpen: _isOpen }) => (
            <span className="oevra-app-features__item-header" data-cursor="hover">
                <span className="oevra-app-features__item-title">
                    <span className="oevra-app-features__item-num">05</span>
                    <ScrambleText text="Support & Evolution" />
                </span>
                <span className="oevra-app-features__item-eyebrow">roadmap</span>
                <span className="oevra-app-features__item-toggle" aria-hidden="true">
                    +
                </span>
            </span>
        ),
        content: (
            <div className="oevra-app-features__item-content">
                <p className="oevra-app-features__item-desc">
                    A clear, continuous roadmap — next-generation SIEM, ML-based behavioral anomaly
                    detection, and a certified digital safe with key vault.
                </p>
                <ul className="oevra-app-features__item-list">
                    <li>2nd-generation SIEM with cross-VLAN correlation</li>
                    <li>ML-based anomaly detection on archive access patterns</li>
                    <li>Digital safe with key vault and certified dematerialization</li>
                    <li>External security audit by a DGSSI-accredited body</li>
                    <li>Quarterly resilience testing of the DRP</li>
                </ul>
            </div>
        ),
    },
];

export default function AppFeatures() {
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
                    <Accordion items={FEATURES} />
                </div>
            </div>
        </section>
    );
}

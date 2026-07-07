import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

const ARCH_TIERS = [
    { icon: "memory", key: "L1", title: "dosseraLanding.architecturePage.tier1_title", desc: "dosseraLanding.architecturePage.tier1_desc", label: "dosseraLanding.architecturePage.tier1_label" },
    { icon: "dataset_linked", key: "L2", title: "dosseraLanding.architecturePage.tier2_title", desc: "dosseraLanding.architecturePage.tier2_desc", label: "dosseraLanding.architecturePage.tier2_label" },
    { icon: "storage", key: "L3", title: "dosseraLanding.architecturePage.tier3_title", desc: "dosseraLanding.architecturePage.tier3_desc", label: "dosseraLanding.architecturePage.tier3_label" },
];

const VLANS = [
    { id: "VLAN 10", name: "dosseraLanding.architecturePage.vlan1_name", desc: "dosseraLanding.architecturePage.vlan1_desc" },
    { id: "VLAN 20", name: "dosseraLanding.architecturePage.vlan2_name", desc: "dosseraLanding.architecturePage.vlan2_desc" },
    { id: "VLAN 30", name: "dosseraLanding.architecturePage.vlan3_name", desc: "dosseraLanding.architecturePage.vlan3_desc" },
    { id: "VLAN 40", name: "dosseraLanding.architecturePage.vlan4_name", desc: "dosseraLanding.architecturePage.vlan4_desc" },
    { id: "VLAN 50", name: "dosseraLanding.architecturePage.vlan5_name", desc: "dosseraLanding.architecturePage.vlan5_desc" },
];

export default function ArchitecturePage() {
    const { t } = useTranslation();
    const heroReveal = useReveal<HTMLElement>();
    const tiersReveal = useReveal<HTMLElement>();
    const hypervisorReveal = useReveal<HTMLElement>();
    const vlanReveal = useReveal<HTMLElement>();
    const ctaReveal = useReveal<HTMLElement>();

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <WebsiteHeader />

            {/* HERO */}
            <section ref={heroReveal} className="hero-gradient pt-40 pb-20 px-4 sm:px-6 lg:px-container-margin text-white relative overflow-hidden fade-in-up visible">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-block bg-secondary-container/10 text-secondary-container px-4 py-1 rounded text-label-md font-label-md mb-6 uppercase tracking-widest border border-secondary-container/20">
                        {t("dosseraLanding.architecturePage.hero_title")}
                    </div>
                    <h1 className="font-headline-xl text-headline-xl lg:text-[56px] leading-tight mb-6 text-white max-w-4xl">
                        {t("dosseraLanding.architecturePage.hero_subtitle")}
                    </h1>
                    <p className="font-body-lg text-body-lg text-emerald-50/80 mb-10 max-w-2xl leading-relaxed">
                        {t("dosseraLanding.architecturePage.hero_desc")}
                    </p>
                    <Link to="/specifications" className="border border-white/30 text-white px-8 py-4 rounded font-bold hover:bg-white/10 transition-all inline-block">
                        {t("dosseraLanding.architecturePage.cta_specs")}
                    </Link>
                </div>
            </section>

            {/* 3-TIER CACHE */}
            <section ref={tiersReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.architecturePage.tiers_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Un système à trois niveaux de cache garantissant une latence minimale et une cohérence parfaite des données.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ARCH_TIERS.map((tier) => (
                            <div key={tier.key} className="solid-panel p-8 rounded flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded bg-secondary-container flex items-center justify-center mb-6 border border-outline-variant">
                                    <span className="material-symbols-outlined text-primary text-3xl">{tier.icon}</span>
                                </div>
                                <div className="font-label-md text-label-md text-secondary font-bold mb-1 uppercase">{tier.key}</div>
                                <h3 className="font-headline-md text-headline-md mb-3 text-primary">{t(tier.title)}</h3>
                                <div className="font-label-md text-label-md text-secondary font-bold mb-3 uppercase tracking-wider">{t(tier.label)}</div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">{t(tier.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HYPERVISEUR & VIRTUALISATION */}
            <section ref={hypervisorReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.architecturePage.virt_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                            {t("dosseraLanding.architecturePage.virt_desc")}
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                                <div>
                                    <h4 className="font-headline-md text-headline-md text-primary text-[18px]">Machines Virtuelles Dédiées</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">VM pfSense (pare-feu), VM SOC (Wazuh, Loki, Grafana, CrowdSec), VM T-Pot (Honeypot). Chaque VM dispose de ressources CPU/RAM allouées strictement.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                                <div>
                                    <h4 className="font-headline-md text-headline-md text-primary text-[18px]">Commutateurs Virtuels VLAN-Aware</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Bridges Linux configurés en mode VLAN-aware pour transporter et taguer les trames 802.1Q entre le pare-feu pfSense et les machines virtuelles.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                                <div>
                                    <h4 className="font-headline-md text-headline-md text-primary text-[18px]">Automatisation Ansible</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Déploiement industrialisé de la stack SOC via playbooks Ansible. Mise à jour, durcissement (hardening) et configuration appliqués de manière idempotente.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary text-secondary-container p-10 rounded-2xl">
                        <div className="font-headline-md text-headline-md mb-6 text-white">Stack Conteneurisée</div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-emerald-300">docker</span>
                                <span className="font-body-md text-body-md">Docker & Docker-Compose</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-emerald-300">shield</span>
                                <span className="font-body-md text-body-md">Wazuh SIEM (Manager + Indexer)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-emerald-300">monitoring</span>
                                <span className="font-body-md text-body-md">Loki + Grafana (Logs & Dashboard)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-emerald-300">block</span>
                                <span className="font-body-md text-body-md">CrowdSec (Blocage Dynamique)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-emerald-300">vpn_lock</span>
                                <span className="font-body-md text-body-md">OpenVPN (Accès Administrateur)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VLAN SEGMENTATION */}
            <section ref={vlanReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.architecturePage.vlan_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Cinq VLANs étanches isolent rigoureusement les services et les données selon le principe du moindre privilège (Default Deny).</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {VLANS.map((vlan) => (
                            <div key={vlan.id} className="solid-panel p-5 rounded text-center">
                                <div className="font-label-md text-label-md text-primary font-bold mb-2">{vlan.id}</div>
                                <div className="font-headline-md text-headline-md text-primary mb-2">{t(vlan.name)}</div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">{t(vlan.desc)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-surface-container-low rounded-xl text-center md:text-left">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            <strong className="text-primary">{t("dosseraLanding.architecturePage.pfsense_label")}</strong> Inspection d'état des paquets (Stateful Inspection), règles ACL restrictives par interface, routage inter-VLAN désactivé par défaut, journalisation Syslog de toutes les règles de blocage vers la stack SOC (VLAN 40).
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin fade-in-up">
                <div className="max-w-5xl mx-auto solid-panel p-12 rounded text-center bg-secondary-container/30">
                    <h2 className="font-headline-lg text-headline-lg mb-6 text-primary">{t("dosseraLanding.architecturePage.cta_title")}</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                        {t("dosseraLanding.architecturePage.cta_desc")}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/specifications" className="bg-primary text-secondary-container px-10 py-5 rounded font-bold text-lg btn-breathe inline-block hover:bg-primary-container transition-colors">
                            {t("dosseraLanding.architecturePage.cta_specs")}
                        </Link>
                        <Link to="/securite" className="border border-primary text-primary px-10 py-5 rounded font-bold text-lg hover:bg-white transition-all inline-block">
                            {t("dosseraLanding.architecturePage.cta_security")}
                        </Link>
                    </div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}

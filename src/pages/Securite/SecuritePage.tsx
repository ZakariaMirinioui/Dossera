import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

const LAYERS = [
    { icon: "router", titleKey: "layer1_name", descKey: "layer1_desc" },
    { icon: "lan", titleKey: "layer2_name", descKey: "layer2_desc" },
    { icon: "encrypted", titleKey: "layer3_name", descKey: "layer3_desc" },
    { icon: "vpn_lock", titleKey: "layer4_name", descKey: "layer4_desc" },
    { icon: "shield", titleKey: "layer5_name", descKey: "layer5_desc" },
    { icon: "block", titleKey: "layer6_name", descKey: "layer6_desc" },
    { icon: "travel_explore", titleKey: "layer7_name", descKey: "layer7_desc" },
    { icon: "monitoring", titleKey: "layer8_name", descKey: "layer8_desc" },
];

const TEST_RESULTS = [
    { nameKey: "test1_name", method: "Ping ICMP entre VLAN 10 et VLAN 40", statusKey: "test1_status", type: "failure" },
    { nameKey: "test2_name", method: "Connexion HTTP depuis VLAN 10 vers Reverse Proxy", statusKey: "test2_status", type: "success" },
    { nameKey: "test3_name", method: "OpenVPN avec profil chiffré depuis l'externe", statusKey: "test3_status", type: "success" },
    { nameKey: "test4_name", method: "Déploiement d'un micro-service sur la VM SOC", statusKey: "test4_status", type: "success" },
    { nameKey: "test5_name", method: "Tentatives SSH infructueuses répétées", statusKey: "test5_status", type: "warning" },
    { nameKey: "test6_name", method: "iPerf entre VLAN 10 et DMZ", statusKey: "test6_status", type: "success" },
    { nameKey: "test7_name", method: "RTT connexion distante via tunnel OpenVPN", statusKey: "test7_status", type: "warning" },
];

export default function SecuritePage() {
    const { t } = useTranslation();
    const heroReveal = useReveal<HTMLElement>();
    const layersReveal = useReveal<HTMLElement>();
    const testsReveal = useReveal<HTMLElement>();
    const roadmapReveal = useReveal<HTMLElement>();
    const ctaReveal = useReveal<HTMLElement>();

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <WebsiteHeader />

            {/* HERO */}
            <section ref={heroReveal} className="hero-gradient pt-40 pb-20 px-4 sm:px-6 lg:px-container-margin text-white relative overflow-hidden fade-in-up visible">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-block bg-secondary-container/10 text-secondary-container px-4 py-1 rounded text-label-md font-label-md mb-6 uppercase tracking-widest border border-secondary-container/20">
                        {t("dosseraLanding.securitePage.hero_title")}
                    </div>
                    <h1 className="font-headline-xl text-headline-xl lg:text-[56px] leading-tight mb-6 text-white max-w-4xl">
                        {t("dosseraLanding.securitePage.hero_subtitle")}
                    </h1>
                    <p className="font-body-lg text-body-lg text-emerald-50/80 mb-10 max-w-2xl leading-relaxed">
                        {t("dosseraLanding.securitePage.hero_desc")}
                    </p>
                </div>
            </section>

            {/* COUCHES DE SÉCURITÉ */}
            <section ref={layersReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.securitePage.defense_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">{t("dosseraLanding.securitePage.defense_desc")}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {LAYERS.map((layer) => (
                            <div key={layer.icon} className="solid-panel p-6 rounded flex gap-5 items-start group hover:border-secondary transition-all">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-2xl">{layer.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-headline-md text-headline-md text-primary mb-2">{t(`dosseraLanding.securitePage.${layer.titleKey}`)}</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{t(`dosseraLanding.securitePage.${layer.descKey}`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTS DE VALIDATION */}
            <section ref={testsReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.securitePage.tests_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Résultats des tests d'intrusion, de performance et de sécurité menés sur l'infrastructure de la Cour d'Appel.</p>
                    </div>
                    <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-primary text-secondary-container">
                                <tr>
                                    <th className="p-4 font-label-md text-label-md uppercase tracking-wider">Test</th>
                                    <th className="p-4 font-label-md text-label-md uppercase tracking-wider">Méthode</th>
                                    <th className="p-4 font-label-md text-label-md uppercase tracking-wider">Résultat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TEST_RESULTS.map((tr, i) => (
                                    <tr key={i} className="border-b border-outline-variant hover:bg-secondary-container transition-colors">
                                        <td className="p-4 font-body-md text-body-md font-bold text-primary">{t(`dosseraLanding.securitePage.${tr.nameKey}`)}</td>
                                        <td className="p-4 font-body-sm text-body-sm">{tr.method}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 font-body-sm text-body-sm ${tr.type === "success" ? "text-emerald-700" : tr.type === "failure" ? "text-red-700" : "text-amber-700"}`}>
                                                <span className={`w-2 h-2 rounded-full ${tr.type === "success" ? "bg-emerald-500" : tr.type === "failure" ? "bg-red-500" : "bg-amber-500"}`} />
                                                {t(`dosseraLanding.securitePage.${tr.statusKey}`)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* PERSPECTIVES */}
            <section ref={roadmapReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.securitePage.roadmap_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                            La stratégie de sécurité de JAMS évolue en continu pour anticiper les menaces émergentes.
                        </p>
                        <div className="space-y-5">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary text-lg">looks_one</span>
                                </div>
                                <div>
                                    <h4 className="font-headline-md text-headline-md text-primary text-[18px]">Architecture Zero Trust</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t("dosseraLanding.securitePage.roadmap1")}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary text-lg">looks_two</span>
                                </div>
                                <div>
                                    <h4 className="font-headline-md text-headline-md text-primary text-[18px]">IA pour le SOC</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t("dosseraLanding.securitePage.roadmap2")}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary text-lg">looks_3</span>
                                </div>
                                <div>
                                    <h4 className="font-headline-md text-headline-md text-primary text-[18px]">Infrastructure as Code</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t("dosseraLanding.securitePage.roadmap3")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary text-secondary-container p-10 rounded-2xl">
                        <span className="material-symbols-outlined text-5xl text-emerald-300 mb-4">verified</span>
                        <h3 className="font-headline-md text-headline-md text-white mb-4">Partenaires Technologiques</h3>
                        <p className="font-body-md text-body-md text-emerald-100/80 mb-6 leading-relaxed">
                            La couche sécurité de JAMS est conçue et déployée en partenariat avec des experts en cybersécurité dans le cadre de projets d'ingénierie supervisés.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {["Proxmox VE", "pfSense", "Wazuh", "CrowdSec", "Grafana", "Loki", "T-Pot", "Ansible"].map((p) => (
                                <span key={p} className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full font-body-sm text-body-sm">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin fade-in-up">
                <div className="max-w-5xl mx-auto solid-panel p-12 rounded text-center bg-secondary-container/30">
                    <h2 className="font-headline-lg text-headline-lg mb-6 text-primary">{t("dosseraLanding.securitePage.cta_title")}</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                        Discutons de vos besoins spécifiques en matière de sécurité et de conformité réglementaire.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="bg-primary text-secondary-container px-10 py-5 rounded font-bold text-lg btn-breathe inline-block hover:bg-primary-container transition-colors">
                            {t("dosseraLanding.securitePage.cta_whitepaper")}
                        </Link>
                        <Link to="/solutions" className="border border-primary text-primary px-10 py-5 rounded font-bold text-lg hover:bg-white transition-all inline-block">
                            {t("dosseraLanding.securitePage.cta_talk")}
                        </Link>
                    </div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}

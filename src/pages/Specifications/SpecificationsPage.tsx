import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

const TTL_ROWS = [
    { prefix: "DOC_ARCHIVE", l1: "7 jours", l2: "30 jours", priority: "Haute", badge: "bg-red-100 text-red-700" },
    { prefix: "USER_SESSION", l1: "4 heures", l2: "24 heures", priority: "Moyenne", badge: "bg-amber-100 text-amber-700" },
    { prefix: "SYSTEM_STATS", l1: "1 minute", l2: "1 heure", priority: "Basse", badge: "bg-green-100 text-green-700" },
] as const;

const METRICS = [
    { valueKey: "dosseraLanding.specificationsPage.metric1_value", labelKey: "dosseraLanding.specificationsPage.metric1_label" },
    { valueKey: "dosseraLanding.specificationsPage.metric2_value", labelKey: "dosseraLanding.specificationsPage.metric2_label" },
    { valueKey: "dosseraLanding.specificationsPage.metric3_value", labelKey: "dosseraLanding.specificationsPage.metric3_label" },
    { valueKey: "dosseraLanding.specificationsPage.metric4_value", labelKey: "dosseraLanding.specificationsPage.metric4_label" },
    { valueKey: "dosseraLanding.specificationsPage.metric5_value", labelKey: "dosseraLanding.specificationsPage.metric5_label" },
    { valueKey: "dosseraLanding.specificationsPage.metric6_value", labelKey: "dosseraLanding.specificationsPage.metric6_label" },
];

const COMPLIANCE = [
    { icon: "privacy_tip", titleKey: "dosseraLanding.specificationsPage.compliance1_title", descKey: "dosseraLanding.specificationsPage.compliance1_desc" },
    { icon: "archive", titleKey: "dosseraLanding.specificationsPage.compliance2_title", descKey: "dosseraLanding.specificationsPage.compliance2_desc" },
    { icon: "public", titleKey: "dosseraLanding.specificationsPage.compliance3_title", descKey: "dosseraLanding.specificationsPage.compliance3_desc" },
    { icon: "sync", titleKey: "dosseraLanding.specificationsPage.compliance4_title", descKey: "dosseraLanding.specificationsPage.compliance4_desc" },
];

export default function SpecificationsPage() {
    const { t } = useTranslation();
    const heroReveal = useReveal<HTMLElement>();
    const metricsReveal = useReveal<HTMLElement>();
    const cacheReveal = useReveal<HTMLElement>();
    const complianceReveal = useReveal<HTMLElement>();
    const ctaReveal = useReveal<HTMLElement>();

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <WebsiteHeader />

            {/* HERO */}
            <section ref={heroReveal} className="hero-gradient pt-40 pb-20 px-4 sm:px-6 lg:px-container-margin text-white relative overflow-hidden fade-in-up visible">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-block bg-secondary-container/10 text-secondary-container px-4 py-1 rounded text-label-md font-label-md mb-6 uppercase tracking-widest border border-secondary-container/20">
                        {t("dosseraLanding.specificationsPage.hero_title")}
                    </div>
                    <h1 className="font-headline-xl text-headline-xl lg:text-[56px] leading-tight mb-6 text-white max-w-4xl">
                        {t("dosseraLanding.specificationsPage.hero_subtitle")}
                    </h1>
                    <p className="font-body-lg text-body-lg text-emerald-50/80 mb-10 max-w-2xl leading-relaxed">
                        {t("dosseraLanding.specificationsPage.hero_desc")}
                    </p>
                </div>
            </section>

            {/* KEY METRICS */}
            <section ref={metricsReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.specificationsPage.metrics_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">{t("dosseraLanding.specificationsPage.metrics_desc")}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {METRICS.map((m) => (
                            <div key={m.labelKey} className="solid-panel p-6 rounded text-center">
                                <div className="font-headline-lg text-headline-lg text-primary mb-1">{t(m.valueKey)}</div>
                                <div className="font-label-md text-label-md text-secondary font-bold uppercase mb-2">{t(m.labelKey)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CACHE TTL TABLE */}
            <section ref={cacheReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-gutter">
                        <div className="md:w-1/3">
                            <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Tables TTL du Cache</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                                Politique de gestion du Time-To-Live pour chaque niveau de cache. Garantit un taux de hit supérieur à 99.9% pour les données les plus sollicitées.
                            </p>
                            <div className="p-6 bg-primary text-secondary-container rounded">
                                <div className="font-headline-md text-headline-md mb-2">99.9%</div>
                                <div className="font-body-sm text-body-sm opacity-80">Taux de hit cache moyen</div>
                            </div>
                        </div>
                        <div className="md:w-2/3 bg-white rounded border border-outline-variant overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-primary text-secondary-container">
                                    <tr>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">Clé</th>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">L1 (Mémoire)</th>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">L2 (Redis)</th>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">Priorité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TTL_ROWS.map((row) => (
                                        <tr key={row.prefix} className="border-b border-outline-variant hover:bg-secondary-container transition-colors">
                                            <td className="p-4 font-body-md text-body-md font-bold text-primary">{row.prefix}</td>
                                            <td className="p-4 font-body-sm text-body-sm">{row.l1}</td>
                                            <td className="p-4 font-body-sm text-body-sm">{row.l2}</td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${row.badge}`}>{row.priority}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPLIANCE */}
            <section ref={complianceReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.specificationsPage.compliance_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">JAMS est aligné sur les normes et standards les plus exigeants de l'administration judiciaire.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {COMPLIANCE.map((c) => (
                            <div key={c.titleKey} className="solid-panel p-6 rounded text-center">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4">{c.icon}</span>
                                <h3 className="font-headline-md text-headline-md text-primary mb-3">{t(c.titleKey)}</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">{t(c.descKey)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-6 bg-surface-container-low rounded-xl">
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            <strong className="text-primary">{t("dosseraLanding.specificationsPage.tests_label")}</strong> L'infrastructure a été soumise à des tests d'intrusion (Nmap, Wireshark), des tests de performance (iPerf, latence VPN) et des simulations d'attaque (force brute SSH, scans de ports). Tous les tests ont été validés avec succès, confirmant l'étanchéité des VLANs et l'efficacité du SIEM Wazuh.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin fade-in-up">
                <div className="max-w-5xl mx-auto solid-panel p-12 rounded text-center bg-secondary-container/30">
                    <h2 className="font-headline-lg text-headline-lg mb-6 text-primary">{t("dosseraLanding.specificationsPage.cta_title")}</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                        Téléchargez le Livre Blanc JAMS pour une analyse détaillée de notre architecture et de nos performances.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/livre-blanc" className="bg-primary text-secondary-container px-10 py-5 rounded font-bold text-lg btn-breathe inline-block hover:bg-primary-container transition-colors">
                            {t("dosseraLanding.specificationsPage.cta_whitepaper")}
                        </Link>
                        <a href="mailto:zakmirinioui@gmail.com" className="border border-primary text-primary px-10 py-5 rounded font-bold text-lg hover:bg-white transition-all inline-block">
                            {t("dosseraLanding.specificationsPage.cta_contact")}
                        </a>
                    </div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}

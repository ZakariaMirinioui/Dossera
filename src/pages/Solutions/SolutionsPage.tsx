import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

const INTEGRATIONS = [
    { name: "Proxmox VE", role: "Hyperviseur bare-metal" },
    { name: "pfSense", role: "Pare-feu et routeur d'état" },
    { name: "Docker", role: "Conteneurisation des services" },
    { name: "Ansible", role: "Automatisation Infrastructure as Code" },
    { name: "Wazuh", role: "SIEM - Détection d'intrusions" },
    { name: "CrowdSec", role: "Blocage dynamique de menaces" },
    { name: "Grafana + Loki", role: "Monitoring et logs centralisés" },
    { name: "MinIO", role: "Stockage objet immuable S3" },
    { name: "PostgreSQL + pgvector", role: "Base de données vectorielle" },
    { name: "Meilisearch", role: "Moteur de recherche full-text" },
];

export default function SolutionsPage() {
    const { t } = useTranslation();
    const heroReveal = useReveal<HTMLElement>();
    const servicesReveal = useReveal<HTMLElement>();
    const ecosystemReveal = useReveal<HTMLElement>();
    const deploymentsReveal = useReveal<HTMLElement>();
    const ctaReveal = useReveal<HTMLElement>();

    const SERVICES = [
        {
            icon: t("dosseraLanding.solutionsPage.svc1_icon"),
            title: t("dosseraLanding.solutionsPage.svc1_title"),
            desc: t("dosseraLanding.solutionsPage.svc1_desc"),
        },
        {
            icon: t("dosseraLanding.solutionsPage.svc2_icon"),
            title: t("dosseraLanding.solutionsPage.svc2_title"),
            desc: t("dosseraLanding.solutionsPage.svc2_desc"),
        },
        {
            icon: t("dosseraLanding.solutionsPage.svc3_icon"),
            title: t("dosseraLanding.solutionsPage.svc3_title"),
            desc: t("dosseraLanding.solutionsPage.svc3_desc"),
        },
        {
            icon: t("dosseraLanding.solutionsPage.svc4_icon"),
            title: t("dosseraLanding.solutionsPage.svc4_title"),
            desc: t("dosseraLanding.solutionsPage.svc4_desc"),
        },
        {
            icon: t("dosseraLanding.solutionsPage.svc5_icon"),
            title: t("dosseraLanding.solutionsPage.svc5_title"),
            desc: t("dosseraLanding.solutionsPage.svc5_desc"),
        },
        {
            icon: t("dosseraLanding.solutionsPage.svc6_icon"),
            title: t("dosseraLanding.solutionsPage.svc6_title"),
            desc: t("dosseraLanding.solutionsPage.svc6_desc"),
        },
        {
            icon: t("dosseraLanding.solutionsPage.svc7_icon"),
            title: t("dosseraLanding.solutionsPage.svc7_title"),
            desc: t("dosseraLanding.solutionsPage.svc7_desc"),
        },
    ];

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <WebsiteHeader />

            {/* HERO */}
            <section ref={heroReveal} className="hero-gradient pt-40 pb-20 px-4 sm:px-6 lg:px-container-margin text-white relative overflow-hidden fade-in-up visible">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-block bg-secondary-container/10 text-secondary-container px-4 py-1 rounded text-label-md font-label-md mb-6 uppercase tracking-widest border border-secondary-container/20">
                        {t("dosseraLanding.solutionsPage.hero_title")}
                    </div>
                    <h1 className="font-headline-xl text-headline-xl lg:text-[56px] leading-tight mb-6 text-white max-w-4xl">
                        {t("dosseraLanding.solutionsPage.hero_subtitle")}
                    </h1>
                    <p className="font-body-lg text-body-lg text-emerald-50/80 mb-10 max-w-2xl leading-relaxed">
                        {t("dosseraLanding.solutionsPage.hero_desc")}
                    </p>
                    <Link to="/demande-demo" className="bg-secondary-container text-primary px-8 py-4 rounded font-bold hover:bg-white transition-all btn-breathe inline-block">
                        {t("dosseraLanding.solutionsPage.cta_demo")}
                    </Link>
                </div>
            </section>

            {/* SERVICES */}
            <section ref={servicesReveal} id="services" className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.solutionsPage.capabilities_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">{t("dosseraLanding.solutionsPage.capabilities_desc")}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((s) => (
                            <div key={s.icon} className="solid-panel p-6 rounded group hover:border-secondary transition-all duration-300">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-2xl">{s.icon}</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-3 text-primary">{s.title}</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ÉCOSYSTÈME ET INTÉGRATIONS */}
            <section ref={ecosystemReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.solutionsPage.ecosystem_title")}</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                {t("dosseraLanding.solutionsPage.ecosystem_desc")}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {INTEGRATIONS.slice(0, 5).map((i) => (
                                    <span key={i.name} className="inline-flex items-center gap-1.5 bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full font-body-sm text-body-sm text-primary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {i.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {INTEGRATIONS.slice(5).map((i) => (
                                <div key={i.name} className="solid-panel p-4 rounded flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-secondary" />
                                    <div>
                                        <div className="font-label-md text-label-md text-primary">{i.name}</div>
                                        <div className="font-body-sm text-body-sm text-on-surface-variant">{i.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DÉPLOIEMENTS RÉFÉRENCE */}
            <section ref={deploymentsReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">{t("dosseraLanding.solutionsPage.deployments_title")}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">{t("dosseraLanding.solutionsPage.deployments_desc")}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="solid-panel p-8 rounded">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
                                </div>
                                <div>
                                    <h3 className="font-headline-md text-headline-md text-primary">{t("dosseraLanding.solutionsPage.deployment_cour_title")}</h3>
                                    <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">{t("dosseraLanding.solutionsPage.deployment_cour_status")}</span>
                                </div>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                {t("dosseraLanding.solutionsPage.deployment_cour_desc")}
                            </p>
                        </div>
                        <div className="solid-panel p-8 rounded">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-3xl">gavel</span>
                                </div>
                                <div>
                                    <h3 className="font-headline-md text-headline-md text-primary">{t("dosseraLanding.solutionsPage.deployment_tpi_title")}</h3>
                                    <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">{t("dosseraLanding.solutionsPage.deployment_tpi_status")}</span>
                                </div>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                {t("dosseraLanding.solutionsPage.deployment_tpi_desc")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaReveal} className="py-section-gap px-4 sm:px-6 lg:px-container-margin fade-in-up">
                <div className="max-w-5xl mx-auto solid-panel p-12 rounded text-center bg-secondary-container/30">
                    <h2 className="font-headline-lg text-headline-lg mb-6 text-primary">{t("dosseraLanding.solutionsPage.cta_title")}</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                        {t("dosseraLanding.solutionsPage.cta_desc")}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/demande-demo" className="bg-primary text-secondary-container px-10 py-5 rounded font-bold text-lg btn-breathe inline-block hover:bg-primary-container transition-colors">
                            {t("dosseraLanding.solutionsPage.cta_demo")}
                        </Link>
                        <a href="mailto:zakmirinioui@gmail.com" className="border border-primary text-primary px-10 py-5 rounded font-bold text-lg hover:bg-white transition-all inline-block">
                            {t("dosseraLanding.solutionsPage.cta_contact")}
                        </a>
                    </div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}

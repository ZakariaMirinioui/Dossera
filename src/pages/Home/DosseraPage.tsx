import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";
import DosseraBookingForm from "./DosseraBookingForm";

const TTL_ROWS = [
    { prefix: "row1_prefix", l1: "row1_l1", l2: "row1_l2", priority: "row1_priority", badge: "row1_badge" },
    { prefix: "row2_prefix", l1: "row2_l1", l2: "row2_l2", priority: "row2_priority", badge: "row2_badge" },
    { prefix: "row3_prefix", l1: "row3_l1", l2: "row3_l2", priority: "row3_priority", badge: "row3_badge" },
] as const;

const ARCH_TIERS = [
    { key: "l1", icon: "memory" },
    { key: "l2", icon: "database" },
    { key: "l3", icon: "storage" },
] as const;

const SERVICES = [
    { svcKey: "svc1", iconKey: "svc1_icon", titleKey: "svc1_title", descKey: "svc1_desc" },
    { svcKey: "svc2", iconKey: "svc2_icon", titleKey: "svc2_title", descKey: "svc2_desc" },
    { svcKey: "svc3", iconKey: "svc3_icon", titleKey: "svc3_title", descKey: "svc3_desc" },
    { svcKey: "svc4", iconKey: "svc4_icon", titleKey: "svc4_title", descKey: "svc4_desc" },
    { svcKey: "svc5", iconKey: "svc5_icon", titleKey: "svc5_title", descKey: "svc5_desc" },
    { svcKey: "svc6", iconKey: "svc6_icon", titleKey: "svc6_title", descKey: "svc6_desc" },
] as const;

const FAQ_KEYS = [
    { qKey: "q1", aKey: "a1" },
    { qKey: "q2", aKey: "a2" },
    { qKey: "q3", aKey: "a3" },
    { qKey: "q4", aKey: "a4" },
    { qKey: "q5", aKey: "a5" },
] as const;

const DosseraPage: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150);
        }
    }, [location.hash]);

    const heroReveal = useReveal<HTMLElement>();
    const painsReveal = useReveal<HTMLElement>();
    const archReveal = useReveal<HTMLElement>();
    const specsReveal = useReveal<HTMLElement>();
    const servicesReveal = useReveal<HTMLElement>();
    const securityReveal = useReveal<HTMLElement>();
    const howReveal = useReveal<HTMLElement>();
    const faqReveal = useReveal<HTMLElement>();
    const ctaReveal = useReveal<HTMLElement>();
    const bookReveal = useReveal<HTMLElement>();

    return (
        <div className="min-h-screen bg-background">
            <WebsiteHeader />

            {/* ─── HERO ─── */}
            <section
                ref={heroReveal}
                id="hero"
                className="hero-gradient pt-48 pb-24 px-4 sm:px-6 lg:px-container-margin text-white relative overflow-hidden fade-in-up visible"
            >
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
                    <div>
                        <div className="inline-block bg-secondary-container/10 text-secondary-container px-4 py-1 rounded text-label-md font-label-md mb-6 uppercase tracking-widest border border-secondary-container/20">
                            {t("dosseraLanding.hero.eyebrow")}
                        </div>

                        <h1 className="font-headline-xl text-headline-xl lg:text-[56px] leading-tight mb-6 text-white">
                            {t("dosseraLanding.hero.headline")}
                        </h1>

                        <p className="font-body-lg text-body-lg text-emerald-50/80 mb-10 max-w-xl">
                            {t("dosseraLanding.hero.subtitle")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/demande-demo"
                                className="bg-secondary-container text-primary px-8 py-4 rounded font-bold hover:bg-white transition-all btn-breathe inline-block text-center"
                            >
                                {t("dosseraLanding.hero.cta_primary")}
                            </Link>
                            <Link
                                to="/livre-blanc"
                                className="border border-white/30 text-white px-8 py-4 rounded font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">menu_book</span>
                                {t("dosseraLanding.hero.cta_secondary")}
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center">
                        <div className="relative w-full max-w-md aspect-square bg-white/5 border border-white/20 flex flex-col items-center justify-center p-12 rounded-lg backdrop-blur-sm">
                            <img
                                src="/dossera-logo.png"
                                alt="DOSSERA"
                                className="w-48 h-48 mb-8 brightness-0 invert opacity-80"
                            />
                            <div className="text-center">
                                <div className="font-headline-md text-headline-md font-bold mb-4">
                                    {t("dosseraLanding.hero.jams_version")}
                                </div>
                                <div className="flex items-center justify-center gap-2 mb-4 bg-emerald-500/20 py-2 px-4 rounded-full border border-emerald-500/30 w-fit mx-auto">
                                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        check_circle
                                    </span>
                                    <span className="text-label-md font-label-md text-white uppercase tracking-wider">
                                        {t("dosseraLanding.hero.badge_status")}
                                    </span>
                                </div>
                                <p className="text-emerald-50/80 font-body-sm text-body-sm leading-relaxed">
                                    {t("dosseraLanding.hero.badge_desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PAINS ─── */}
            <section
                ref={painsReveal}
                id="defis"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">
                            {t("dosseraLanding.pains.title")}
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {t("dosseraLanding.pains.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {(["pain1", "pain2", "pain3", "pain4"] as const).map((p, i) => (
                            <div key={p} className="solid-panel p-8 rounded flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-error text-2xl">
                                        {["description", "search_off", "gpp_bad", "payments"][i]}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-headline-md text-headline-md mb-2 text-primary">
                                        {t(`dosseraLanding.pains.${p}_title`)}
                                    </h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {t(`dosseraLanding.pains.${p}_desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── ARCHITECTURE 3-TIER CACHE ─── */}
            <section
                ref={archReveal}
                id="architecture"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">
                            {t("dosseraLanding.architecture.title")}
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {t("dosseraLanding.architecture.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {ARCH_TIERS.map(({ key, icon }) => (
                            <div key={key} className="solid-panel p-8 rounded flex flex-col items-center text-center arch-card">
                                <div className="w-16 h-16 rounded bg-secondary-container flex items-center justify-center mb-6 border border-outline-variant">
                                    <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-2 text-primary">
                                    {t(`dosseraLanding.architecture.${key}_title`)}
                                </h3>
                                <div className="font-label-md text-label-md text-secondary font-bold mb-4 uppercase">
                                    {t(`dosseraLanding.architecture.${key}_label`)}
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    {t(`dosseraLanding.architecture.${key}_desc`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-surface-container-low border border-outline-variant rounded-xl p-8 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                            <span className="text-xs text-on-surface-variant uppercase tracking-widest">{t("dosseraLanding.architecture.deploy.badge")}</span>
                        </div>
                        <p className="font-body-md text-body-md text-primary font-bold">
                            {t("dosseraLanding.architecture.deploy.text")}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                            {t("dosseraLanding.architecture.deploy.subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── TECH SPECS TTL TABLE ─── */}
            <section
                ref={specsReveal}
                id="specs"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-gutter">
                        <div className="md:w-1/3">
                            <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">
                                {t("dosseraLanding.techSpecs.title")}
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                                {t("dosseraLanding.techSpecs.subtitle")}
                            </p>
                            <div className="p-6 bg-primary text-secondary-container rounded">
                                <div className="font-headline-md text-headline-md mb-2">99.9%</div>
                                <div className="font-body-sm text-body-sm opacity-80">
                                    {t("dosseraLanding.techSpecs.cache_hit")}
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3 bg-white rounded border border-outline-variant overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-primary text-secondary-container">
                                    <tr>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">
                                            {t("dosseraLanding.techSpecs.table_prefix")}
                                        </th>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">
                                            {t("dosseraLanding.techSpecs.table_l1")}
                                        </th>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">
                                            {t("dosseraLanding.techSpecs.table_l2")}
                                        </th>
                                        <th className="p-4 font-label-md text-label-md uppercase tracking-wider">
                                            {t("dosseraLanding.techSpecs.table_priority")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TTL_ROWS.map((row) => (
                                        <tr key={row.prefix} className="border-b border-outline-variant hover:bg-secondary-container transition-colors">
                                            <td className="p-4 font-body-md text-body-md font-bold text-primary">
                                                {t(`dosseraLanding.techSpecs.${row.prefix}`)}
                                            </td>
                                            <td className="p-4 font-body-sm text-body-sm">
                                                {t(`dosseraLanding.techSpecs.${row.l1}`)}
                                            </td>
                                            <td className="p-4 font-body-sm text-body-sm">
                                                {t(`dosseraLanding.techSpecs.${row.l2}`)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${t(`dosseraLanding.techSpecs.${row.badge}`)}`}>
                                                    {t(`dosseraLanding.techSpecs.${row.priority}`)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SERVICES / CAPACITÉS TECHNIQUES ─── */}
            <section
                ref={servicesReveal}
                id="services"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">
                            {t("dosseraLanding.services.title")}
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {t("dosseraLanding.services.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map(({ svcKey, iconKey, titleKey, descKey }) => (
                            <div key={svcKey} className="solid-panel p-6 rounded group hover:border-secondary transition-all duration-300">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-2xl">
                                        {t(`dosseraLanding.services.${iconKey}`)}
                                    </span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-3 text-primary">
                                    {t(`dosseraLanding.services.${titleKey}`)}
                                </h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                    {t(`dosseraLanding.services.${descKey}`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                            {t("dosseraLanding.services.ecosystem.title")}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Proxmox VE", "pfSense", "Docker", "Redis", "PostgreSQL", "MinIO", "Wazuh SIEM", "CrowdSec", "T-Pot", "Ansible", "Meilisearch", "Grafana"].map((tech) => (
                                <span key={tech} className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary-container text-primary text-[11px] font-bold uppercase tracking-wider border border-outline-variant">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SECURITY & RESILIENCE ─── */}
            <section
                ref={securityReveal}
                id="securite"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-8 solid-panel rounded hover:border-secondary transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">security</span>
                                <h4 className="font-headline-md text-headline-md mb-2 text-primary">
                                    {t("dosseraLanding.security.minio_title")}
                                </h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    {t("dosseraLanding.security.minio_desc")}
                                </p>
                            </div>
                            <div className="p-8 solid-panel rounded hover:border-secondary transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">settings_backup_restore</span>
                                <h4 className="font-headline-md text-headline-md mb-2 text-primary">
                                    {t("dosseraLanding.security.postgres_title")}
                                </h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    {t("dosseraLanding.security.postgres_desc")}
                                </p>
                            </div>
                            <div className="col-span-2 p-8 bg-primary text-secondary-container rounded flex items-center justify-between">
                                <div>
                                    <h4 className="font-headline-md text-headline-md mb-1 text-white">
                                        {t("dosseraLanding.security.circuit_title")}
                                    </h4>
                                    <p className="font-body-sm text-body-sm text-emerald-100/70">
                                        {t("dosseraLanding.security.circuit_desc")}
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-5xl text-emerald-500/20">emergency_home</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="font-headline-lg text-headline-lg mb-6 text-primary">
                            {t("dosseraLanding.security.title")}
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1 w-6 h-6 rounded bg-secondary flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        done
                                    </span>
                                </div>
                                <div>
                                    <h5 className="font-bold font-body-md text-body-md text-primary">
                                        {t("dosseraLanding.security.feature1_title")}
                                    </h5>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {t("dosseraLanding.security.feature1_desc")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 w-6 h-6 rounded bg-secondary flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        done
                                    </span>
                                </div>
                                <div>
                                    <h5 className="font-bold font-body-md text-body-md text-primary">
                                        {t("dosseraLanding.security.feature2_title")}
                                    </h5>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {t("dosseraLanding.security.feature2_desc")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 w-6 h-6 rounded bg-secondary flex-shrink-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        done
                                    </span>
                                </div>
                                <div>
                                    <h5 className="font-bold font-body-md text-body-md text-primary">
                                        {t("dosseraLanding.security.feature3_title")}
                                    </h5>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {t("dosseraLanding.security.feature3_desc")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section
                ref={howReveal}
                id="comment-ca-marche"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-surface-container-low fade-in-up"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">
                            {t("dosseraLanding.howItWorks.title")}
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {t("dosseraLanding.howItWorks.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {(["step1", "step2", "step3"] as const).map((step, idx) => (
                            <div key={step} className="relative flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary text-secondary-container flex items-center justify-center text-headline-md font-bold mb-6 relative z-10">
                                    {idx + 1}
                                </div>
                                {idx < 2 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-primary/20" />
                                )}
                                <h3 className="font-headline-md text-headline-md mb-3 text-primary">
                                    {t(`dosseraLanding.howItWorks.${step}_title`)}
                                </h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs leading-relaxed">
                                    {t(`dosseraLanding.howItWorks.${step}_desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section
                ref={faqReveal}
                id="faq"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up"
            >
                <div className="max-w-3xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">
                            {t("dosseraLanding.faq.title")}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQ_KEYS.map(({ qKey, aKey }, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={qKey}
                                    className="solid-panel rounded overflow-hidden transition-shadow duration-200"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between p-5 text-left"
                                    >
                                        <span className="font-headline-sm text-headline-sm text-primary pr-4">
                                            {t(`dosseraLanding.faq.${qKey}`)}
                                        </span>
                                        <span
                                            className={`material-symbols-outlined text-primary transition-transform duration-300 flex-shrink-0 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        >
                                            expand_more
                                        </span>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 overflow-hidden ${
                                            isOpen ? "max-h-96" : "max-h-0"
                                        }`}
                                    >
                                        <p className="px-5 pb-5 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                            {t(`dosseraLanding.faq.${aKey}`)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section
                ref={ctaReveal}
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin fade-in-up"
            >
                <div className="max-w-5xl mx-auto solid-panel p-12 rounded text-center bg-secondary-container/30">
                    <h2 className="font-headline-lg text-headline-lg mb-6 text-primary">
                        {t("dosseraLanding.cta.title")}
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                        {t("dosseraLanding.cta.subtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#contact"
                            className="bg-primary text-secondary-container px-10 py-5 rounded font-bold text-lg btn-breathe inline-block hover:bg-primary-container transition-colors"
                        >
                            {t("dosseraLanding.cta.primary")}
                        </a>
                        <a
                            href="mailto:zakmirinioui@gmail.com"
                            className="border border-primary text-primary px-10 py-5 rounded font-bold text-lg hover:bg-white transition-all inline-block"
                        >
                            {t("dosseraLanding.cta.secondary")}
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── BOOKING / CONTACT ─── */}
            <section
                ref={bookReveal}
                id="contact"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up scroll-mt-24"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
                        {t("dosseraLanding.book.title")}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-4">
                        {t("dosseraLanding.book.sub")}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {t("dosseraLanding.book.trust_row")}
                    </p>
                    <div className="max-w-[560px] mx-auto">
                        <DosseraBookingForm />
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <WebsiteFooter />
        </div>
    );
};

export default DosseraPage;

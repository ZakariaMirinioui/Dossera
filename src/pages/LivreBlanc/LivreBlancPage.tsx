import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronRight, Mail, Download, BookOpen } from "lucide-react";
import WebsiteFooter from "../../layouts/Website/Footer";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useReveal } from "../../hooks/useReveal";

interface NavLink {
    id: string;
    href: string;
    key: string;
    active?: boolean;
}

const NAV_LINKS: NavLink[] = [
    { id: "solutions", href: "/#solutions", key: "dosseraLanding.whitepaper.header.solutions" },
    { id: "archives", href: "/#architecture", key: "dosseraLanding.whitepaper.header.archives" },
    { id: "securite", href: "/#securite", key: "dosseraLanding.whitepaper.header.securite" },
    { id: "livre-blanc", href: "/livre-blanc", key: "dosseraLanding.whitepaper.header.livre_blanc", active: true },
];

const CHAPTERS = [
    {
        key: "chap1",
        icon: "layers",
        color: "from-emerald-600 to-emerald-800",
        featured: true,
    },
    {
        key: "chap2",
        icon: "shield",
        color: "from-cyan-600 to-blue-800",
        featured: false,
    },
    {
        key: "chap3",
        icon: "zap",
        color: "from-amber-500 to-orange-700",
        featured: false,
    },
    {
        key: "chap4",
        icon: "globe",
        color: "from-violet-600 to-purple-800",
        featured: false,
    },
] as const;

const staggerItem = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function LivreBlancPage() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const reduceMotion = useReducedMotion();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const heroReveal = useReveal<HTMLElement>();
    const summaryReveal = useReveal<HTMLElement>();
    const chaptersReveal = useReveal<HTMLElement>();
    const newsletterReveal = useReveal<HTMLElement>();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.8 });
    const springY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.8 });
    const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
    const glowX = useTransform(springX, [-0.5, 0.5], ["-20%", "120%"]);
    const glowY = useTransform(springY, [-0.5, 0.5], ["-20%", "120%"]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        handler();
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setNewsletterStatus("sending");
        try {
            const res = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwpejbne", {
                method: "POST",
                body: new FormData(e.currentTarget as HTMLFormElement),
                headers: { Accept: "application/json" },
            });
            if (res.ok) {
                setNewsletterStatus("success");
                setEmail("");
            } else {
                setNewsletterStatus("error");
            }
        } catch {
            setNewsletterStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* ─── HEADER ─── */}
            <header
                className={[
                    "fixed top-0 w-full z-50 transition-all duration-500",
                    scrolled
                        ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
                        : "bg-white/70 backdrop-blur-md border-b border-transparent",
                ].join(" ")}
            >
                <div className="flex justify-between items-center px-4 sm:px-6 lg:px-container-margin h-20 max-w-7xl mx-auto">
                    <Link to="/" className="shrink-0" aria-label="DOSSERA">
                        <img src="/dossera-logo.png" alt="DOSSERA" className="h-14 w-auto object-contain" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(({ id, href, key, active }) => (
                            <Link
                                key={id}
                                to={href}
                                className={[
                                    "font-body-md text-body-md transition-colors relative py-1",
                                    active
                                        ? "text-emerald-900 font-semibold after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2.5px] after:bg-emerald-700 after:rounded-full"
                                        : "text-gray-500 hover:text-emerald-700 nav-link-underline",
                                ].join(" ")}
                            >
                                {t(key)}
                            </Link>
                        ))}
                        <a
                            href="https://jams.dossera.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-800 text-white px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-emerald-700 transition-all active:scale-[0.97] inline-block"
                        >
                            {t("dosseraLanding.nav.acces_jams")}
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <button
                            type="button"
                            className="md:hidden p-2 rounded text-gray-500 hover:text-emerald-700 transition-colors"
                            aria-label={t("dosseraLanding.nav.open_menu")}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((o) => !o)}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[998] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            type="button"
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            aria-label="Close"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            className={`absolute top-0 ${i18n.language === "ar" ? "left-0" : "right-0"} h-full w-[min(100%,20rem)] bg-white/95 backdrop-blur-xl shadow-2xl pt-24 px-6 pb-8 flex flex-col gap-1`}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.28 }}
                        >
                            <div className="mb-4">
                                <LanguageSwitcher />
                            </div>
                            {NAV_LINKS.map(({ id, href, key, active }) => (
                                <Link
                                    key={id}
                                    to={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={[
                                        "py-3 border-b border-gray-100 font-body-md text-body-md transition-colors",
                                        active
                                            ? "text-emerald-900 font-semibold"
                                            : "text-gray-500 hover:text-emerald-700",
                                    ].join(" ")}
                                >
                                    {t(key)}
                                </Link>
                            ))}
                            <a
                                href="https://jams.dossera.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 py-3.5 text-center rounded-full bg-emerald-800 text-white font-label-md text-label-md hover:bg-emerald-700 transition-colors"
                            >
                                {t("dosseraLanding.nav.acces_jams")}
                            </a>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── HERO ─── */}
            <section
                ref={heroReveal}
                className="relative min-h-[100dvh] pt-32 pb-20 px-4 sm:px-6 lg:px-container-margin overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-label-md text-label-md text-emerald-100/80 uppercase tracking-widest">
                                {t("dosseraLanding.whitepaper.hero.subtitle")}
                            </span>
                        </div>

                        <h1 className="font-headline-xl text-headline-xl lg:text-[56px] leading-tight mb-4 text-white text-balance">
                            {t("dosseraLanding.whitepaper.hero.title")}
                        </h1>

                        <p className="font-body-lg text-body-lg text-emerald-50/70 mb-10 max-w-xl leading-relaxed">
                            {t("dosseraLanding.whitepaper.hero.description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                disabled
                                className="group relative bg-white/60 text-emerald-900/50 px-8 py-4 rounded-full font-bold text-[15px] cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <Download size={18} />
                                {t("dosseraLanding.whitepaper.hero.download_pdf")}
                                <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-amber-900 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Coming Soon
                                </span>
                            </button>
                            <a
                                href="#solutions"
                                className="border border-white/25 text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.97]"
                            >
                                <BookOpen size={18} />
                                {t("dosseraLanding.whitepaper.hero.read_online")}
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hidden lg:flex justify-center"
                        initial={reduceMotion ? undefined : { opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className="relative w-full max-w-[440px] perspective-1000"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <motion.div
                                className="relative w-full aspect-[3/4] rounded-[2rem] p-[2px]"
                                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            >
                                <div className="absolute inset-0 rounded-[calc(2rem-2px)] bg-gradient-to-br from-emerald-400/40 via-white/20 to-emerald-600/40" />
                                <div className="relative w-full h-full rounded-[calc(2rem-2px)] bg-gradient-to-b from-emerald-900 to-emerald-950 flex items-center justify-center border border-white/10 overflow-hidden">
                                    <div
                                        className="absolute inset-0 opacity-[0.04]"
                                        style={{
                                            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                                            backgroundSize: "24px 24px",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 w-32 h-32 rounded-full bg-white/10 blur-[60px] pointer-events-none"
                                        style={{ left: glowX, top: glowY }}
                                    />
                                    <img
                                        src="/whitepaper-mockup.svg"
                                        alt="Livre Blanc JAMS"
                                        className="w-full h-full object-contain p-6"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── STRATEGIC SUMMARY ─── */}
            <section
                ref={summaryReveal}
                id="solutions"
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="font-headline-lg text-headline-lg text-emerald-900 mb-6">
                                {t("dosseraLanding.whitepaper.summary.title")}
                            </h2>
                            <p className="font-body-md text-body-md text-gray-500 leading-relaxed">
                                {t("dosseraLanding.whitepaper.chapters.chap1_desc")}
                            </p>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="relative p-[2px] rounded-[1.5rem] bg-gradient-to-br from-emerald-200 via-white to-emerald-100">
                                <div className="relative rounded-[calc(1.5rem-2px)] bg-emerald-50/80 backdrop-blur-sm p-8 lg:p-10">
                                    <span className="text-6xl font-serif text-emerald-300 leading-none absolute top-4 left-6 select-none">
                                        &ldquo;
                                    </span>
                                    <blockquote className="font-body-lg text-body-lg text-gray-700 leading-relaxed italic pl-8 relative z-10">
                                        {t("dosseraLanding.whitepaper.summary.quote")}
                                    </blockquote>
                                    <div className="mt-6 flex items-center gap-3 pl-8">
                                        <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white text-xs font-bold">
                                            DT
                                        </div>
                                        <div>
                                            <div className="font-label-md text-label-md text-emerald-900 font-semibold">
                                                {t("dosseraLanding.whitepaper.summary.author")}
                                            </div>
                                            <div className="font-body-sm text-body-sm text-gray-400">
                                                DOSSERA — JAMS
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CHAPTERS BENTO ─── */}
            <section
                ref={chaptersReveal}
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-gray-50/80 fade-in-up"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-headline-lg text-headline-lg text-emerald-900 mb-3">
                            {t("dosseraLanding.whitepaper.chapters.title")}
                        </h2>
                        <div className="w-12 h-[3px] bg-emerald-700 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-fr">
                        {CHAPTERS.map((chap, i) => (
                            <motion.div
                                key={chap.key}
                                custom={i}
                                variants={staggerItem}
                                initial={reduceMotion ? undefined : "hidden"}
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className={[
                                    chap.featured
                                        ? "md:col-span-3 md:row-span-2"
                                        : "md:col-span-3",
                                ].join(" ")}
                            >
                                <div className="group relative h-full p-[1.5px] rounded-[1.5rem] bg-white/60 hover:bg-white transition-all duration-500">
                                    <div
                                        className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br ${chap.color} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500`}
                                    />
                                    <div className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-white p-7 lg:p-8 flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${chap.color} flex items-center justify-center text-white shadow-lg`}
                                            >
                                                <span className="material-symbols-outlined text-xl">{chap.icon}</span>
                                            </div>
                                            <h3 className="font-headline-md text-headline-md text-emerald-900">
                                                {t(`dosseraLanding.whitepaper.chapters.${chap.key}_title`)}
                                            </h3>
                                        </div>
                                        <p className="font-body-sm text-body-sm text-gray-500 leading-relaxed flex-1">
                                            {t(`dosseraLanding.whitepaper.chapters.${chap.key}_desc`)}
                                        </p>
                                        <div className="mt-5 pt-4 border-t border-gray-100">
                                            <span className="inline-flex items-center gap-1.5 text-label-md text-label-md text-emerald-700 font-semibold group-hover:gap-2.5 transition-all">
                                                {t("dosseraLanding.whitepaper.chapters.read_chapter")}
                                                <ChevronRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── NEWSLETTER ─── */}
            <section
                ref={newsletterReveal}
                className="py-section-gap px-4 sm:px-6 lg:px-container-margin bg-white fade-in-up"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <div className="p-[2px] rounded-[2rem] bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-200">
                        <div className="rounded-[calc(2rem-2px)] bg-white p-10 lg:p-14">
                            <Mail size={28} className="mx-auto mb-4 text-emerald-700" />
                            <h2 className="font-headline-lg text-headline-lg text-emerald-900 mb-2">
                                {t("dosseraLanding.whitepaper.newsletter.title")}
                            </h2>
                            <p className="font-body-md text-body-md text-gray-500 mb-8 max-w-md mx-auto">
                                Recevez les dernières actualités et mises à jour techniques de JAMS.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="hidden"
                                    name="_subject"
                                    value="DOSSERA Whitepaper Newsletter Subscription"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t("dosseraLanding.whitepaper.newsletter.placeholder")}
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 bg-gray-50/50 text-gray-900 font-body-md text-body-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={newsletterStatus === "sending"}
                                    className="px-7 py-3.5 rounded-full bg-emerald-800 text-white font-label-md text-label-md hover:bg-emerald-700 transition-all active:scale-[0.97] disabled:opacity-50 whitespace-nowrap"
                                >
                                    {newsletterStatus === "sending"
                                        ? t("dosseraLanding.book.sending")
                                        : t("dosseraLanding.whitepaper.newsletter.subscribe")}
                                </button>
                            </form>
                            {newsletterStatus === "success" && (
                                <p className="mt-4 font-body-sm text-body-sm text-emerald-600">
                                    {t("dosseraLanding.book.form_success")}
                                </p>
                            )}
                            {newsletterStatus === "error" && (
                                <p className="mt-4 font-body-sm text-body-sm text-red-600">
                                    {t("dosseraLanding.book.form_error")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}

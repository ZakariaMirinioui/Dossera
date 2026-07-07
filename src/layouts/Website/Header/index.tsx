import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

interface NavLink {
    id: string;
    key: string;
    href?: string;
}

const NAV_LINKS: NavLink[] = [
    { id: "architecture", key: "dosseraLanding.nav.architecture" },
    { id: "specs", key: "dosseraLanding.nav.specifications" },
    { id: "securite", key: "dosseraLanding.nav.securite" },
    { id: "livre-blanc", key: "dosseraLanding.nav.livre_blanc", href: "/livre-blanc" },
    { id: "contact", key: "dosseraLanding.nav.contact" },
];

const WebsiteHeader: React.FC = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        handler();
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const { scrollYProgress } = useScroll();
    const progressScaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };

    return (
        <>
            <header
                className={[
                    "fixed top-0 w-full z-50 transition-all duration-300",
                    scrolled
                        ? "bg-white/95 backdrop-blur-sm border-b border-outline-variant shadow-sm"
                        : "bg-white/80 backdrop-blur-sm border-b border-transparent",
                ].join(" ")}
            >
                <div className="flex justify-between items-center px-4 sm:px-6 lg:px-container-margin h-20 max-w-7xl mx-auto">
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="shrink-0"
                        aria-label="DOSSERA"
                    >
                        <img
                            src="/dossera-logo.png"
                            alt="DOSSERA"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(({ id, key, href }) =>
                            href ? (
                                <Link
                                    key={id}
                                    to={href}
                                    className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors nav-link-underline"
                                >
                                    {t(key)}
                                </Link>
                            ) : (
                                <a
                                    key={id}
                                    href={"#" + id}
                                    onClick={(e) => scrollToSection(e, id)}
                                    className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors nav-link-underline"
                                >
                                    {t(key)}
                                </a>
                            ),
                        )}
                        <a
                            href="https://jams.dossera.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-secondary-container px-6 py-2.5 rounded font-label-md text-label-md btn-breathe inline-block hover:bg-primary-container transition-colors"
                        >
                            {t("dosseraLanding.nav.acces_jams")}
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />

                        <button
                            type="button"
                            className="md:hidden p-2 rounded text-on-surface-variant hover:text-primary transition-colors"
                            aria-label={t("dosseraLanding.nav.open_menu")}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((o) => !o)}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-primary"
                    style={{ width: progressScaleX }}
                />
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
                            className="absolute inset-0 mobile-nav-overlay"
                            aria-label={t("dosseraLanding.nav.close_menu")}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            className={`absolute top-0 ${i18n.language === "ar" ? "left-0" : "right-0"} h-full w-[min(100%,20rem)] bg-white shadow-xl pt-24 px-6 pb-8 flex flex-col gap-1`}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.28 }}
                        >
                            <div className="mb-4">
                                <LanguageSwitcher />
                            </div>

                            {NAV_LINKS.map(({ id, key, href }) =>
                                href ? (
                                    <Link
                                        key={id}
                                        to={href}
                                        onClick={() => setMobileOpen(false)}
                                        className="py-3 text-on-surface-variant border-b border-outline-variant font-body-md text-body-md hover:text-primary transition-colors"
                                    >
                                        {t(key)}
                                    </Link>
                                ) : (
                                    <a
                                        key={id}
                                        href={"#" + id}
                                        onClick={(e) => scrollToSection(e, id)}
                                        className="py-3 text-on-surface-variant border-b border-outline-variant font-body-md text-body-md hover:text-primary transition-colors"
                                    >
                                        {t(key)}
                                    </a>
                                ),
                            )}

                            <a
                                href="https://jams.dossera.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 py-3.5 text-center rounded bg-primary text-secondary-container font-label-md text-label-md hover:bg-primary-container transition-colors"
                            >
                                {t("dosseraLanding.nav.acces_jams")}
                            </a>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WebsiteHeader;

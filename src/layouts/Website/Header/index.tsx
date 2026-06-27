import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../hooks/useTheme";
import { useActiveSection } from "../../../hooks/useActiveSection";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

const DOSSERA_SECTIONS = [
	{ id: "dossera-solve", key: "nav.dossera_solve" },
	{ id: "dossera-services", key: "nav.dossera_services" },
	{ id: "dossera-how", key: "nav.dossera_how" },
	{ id: "dossera-book", key: "nav.dossera_book" },
] as const;

const WebsiteHeader: React.FC = () => {
	const { toggleTheme, isDark } = useTheme();
const { t } = useTranslation();
const location = useLocation();
const [mobileOpen, setMobileOpen] = useState(false);
const [dosseraScrolled, setDosseraScrolled] = useState(false);
	const activeSection = useActiveSection(DOSSERA_SECTIONS.map((s) => s.id));

	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname, location.hash]);

	useEffect(() => {
		const handler = () => setDosseraScrolled(window.scrollY > 60);
		handler();
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		scrollToTop();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleTheme();
		}
	};

	const navLinkClass = (sectionId: string) => {
		const isActive = activeSection === sectionId;
		return [
			"text-sm font-medium transition-colors nav-underline font-body",
			isActive ? "nav-link-active is-active" : "text-[#a0a0a0] hover:text-[var(--accent-red)]",
		].join(" ");
	};

	return (
		<>
			<header
				className={[
					"fixed top-0 left-0 right-0 z-[999] border-b transition-[background,border-color,backdrop-filter] duration-300",
					`dossera-nav ${dosseraScrolled ? "scrolled" : ""}`,
				].join(" ")}
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.25rem] flex items-center justify-between gap-4">
					<Link
						to="/"
						onClick={handleLogoClick}
						className="logo-z text-2xl shrink-0 cursor-pointer select-none inline-block"
						aria-label={t("nav.home")}
					>
						DOSSERA
					</Link>

					<nav className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-8">
						{DOSSERA_SECTIONS.map(({ id, key }, idx) => {
							const isBook = idx === DOSSERA_SECTIONS.length - 1;
							if (isBook) {
								return (
									<a
										key={id}
										href={`#${id}`}
										className="px-5 py-3 rounded-full border border-[var(--accent-red)] text-[var(--accent-red)] text-sm font-semibold hover:bg-[var(--accent-red-dim)] transition-colors shrink-0"
									>
										{t(key)}
									</a>
								);
							}
							return (
								<a key={id} href={`#${id}`} className={navLinkClass(id)}>
									{t(key)}
								</a>
							);
						})}
					</nav>

					<div className="flex items-center gap-3 sm:gap-4">
						<LanguageSwitcher />

						<button
							type="button"
							aria-pressed={isDark}
							aria-label={t("nav.toggle_theme")}
							onClick={toggleTheme}
							onKeyDown={handleKeyDown}
							className={[
								"relative p-2.5 rounded-full border text-[var(--text-primary)] interactive-glow",
								"bg-white/5 border-white/10 hover:border-white/20",
							].join(" ")}
						>
							<AnimatePresence mode="wait" initial={false}>
								{isDark ? (
									<motion.span
										key="moon"
										initial={{ rotate: -90, scale: 0, opacity: 0 }}
										animate={{ rotate: 0, scale: 1, opacity: 1 }}
										exit={{ rotate: 90, scale: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="flex"
									>
										<Moon size={20} />
									</motion.span>
								) : (
									<motion.span
										key="sun"
										initial={{ rotate: -90, scale: 0, opacity: 0 }}
										animate={{ rotate: 0, scale: 1, opacity: 1 }}
										exit={{ rotate: 90, scale: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="flex"
									>
										<Sun size={20} />
									</motion.span>
								)}
							</AnimatePresence>
						</button>

						<button
							type="button"
							className="lg:hidden p-2.5 rounded-full border text-[var(--text-primary)] bg-white/5 border-white/10"
							aria-label={t("nav.open_menu")}
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen((o) => !o)}
						>
							{mobileOpen ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						className="fixed inset-0 z-[998] lg:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<button
							type="button"
							className="absolute inset-0 bg-black/70 backdrop-blur-sm"
							aria-label={t("nav.close_menu")}
							onClick={() => setMobileOpen(false)}
						/>
						<motion.aside
							className="absolute top-0 right-0 h-full w-[min(100%,20rem)] bg-[var(--bg-secondary)] border-l border-[var(--border)] shadow-2xl pt-20 px-6 pb-8 flex flex-col gap-1"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "tween", duration: 0.28 }}
						>
							<LanguageSwitcher />

							{DOSSERA_SECTIONS.map(({ id, key }, idx) => {
								const isBook = idx === DOSSERA_SECTIONS.length - 1;
								if (isBook) {
									return (
										<a
											key={id}
											href={`#${id}`}
											className="mt-2 py-3 text-center rounded-full border border-[var(--accent-red)] text-[var(--accent-red)] font-semibold text-sm"
											onClick={() => setMobileOpen(false)}
										>
											{t(key)}
										</a>
									);
								}
								return (
									<a
										key={id}
										href={`#${id}`}
										className="py-3 text-[var(--text-primary)] border-b border-[var(--border)] font-medium"
										onClick={() => setMobileOpen(false)}
									>
										{t(key)}
									</a>
								);
							})}
						</motion.aside>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default WebsiteHeader;
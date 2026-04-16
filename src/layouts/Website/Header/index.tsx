import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../hooks/useTheme";
import { useActiveSection } from "../../../hooks/useActiveSection";

const HOME_SECTIONS = ["about", "projects", "skills", "booking"] as const;

const DOSSERA_SECTIONS = [
	{ id: "dossera-solve", key: "nav.dossera_solve" },
	{ id: "dossera-services", key: "nav.dossera_services" },
	{ id: "dossera-how", key: "nav.dossera_how" },
	{ id: "dossera-book", key: "nav.dossera_book" },
] as const;

const WebsiteHeader: React.FC = () => {
	const { toggleTheme, isDark } = useTheme();
	const { t, i18n } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [dosseraScrolled, setDosseraScrolled] = useState(false);
	const isDossera = location.pathname === "/dossera" || location.pathname.endsWith("/dossera");
	const activeSection = useActiveSection(isDossera ? DOSSERA_SECTIONS.map((s) => s.id) : [...HOME_SECTIONS]);

	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname, location.hash]);

	useEffect(() => {
		if (!isDossera) {
			setDosseraScrolled(false);
			return;
		}
		const handler = () => setDosseraScrolled(window.scrollY > 60);
		handler();
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, [isDossera]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (isDossera) {
			navigate("/");
			return;
		}
		scrollToTop();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleTheme();
		}
	};

	const setLang = (lng: string) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("language", lng);
	};

	const navLinkClass = (sectionId: string, isRoute?: boolean) => {
		const isActive = !isRoute && activeSection === sectionId;
		return [
			"text-sm font-medium transition-colors nav-underline font-body",
			isActive ? "nav-link-active is-active" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
		].join(" ");
	};

	const portfolioHeaderBg = isDark ? "rgba(10, 10, 10, 0.80)" : "rgba(247, 245, 242, 0.85)";

	return (
		<>
			<header
				className={[
					"fixed top-0 left-0 right-0 z-[999] border-b transition-[background,border-color,backdrop-filter] duration-300",
					isDossera ? `dossera-nav ${dosseraScrolled ? "scrolled" : ""}` : "border-[var(--border)]",
				].join(" ")}
				style={
					isDossera
						? undefined
						: {
								background: portfolioHeaderBg,
								backdropFilter: "blur(16px) saturate(180%)",
								WebkitBackdropFilter: "blur(16px) saturate(180%)",
							}
				}
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.25rem] flex items-center justify-between gap-4">
					{isDossera ? (
						<Link
							to="/"
							className="font-mono-ui text-sm text-[#a0a0a0] hover:text-[var(--accent-red)] transition-colors shrink-0"
						>
							{t("nav.back_portfolio")}
						</Link>
					) : (
						<a
							href="/"
							onClick={handleLogoClick}
							className="logo-z text-2xl shrink-0 cursor-pointer select-none inline-block"
							aria-label={t("nav.home")}
						>
							Z.
						</a>
					)}

					<nav className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-8">
						{isDossera ? (
							<>
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
										<a key={id} href={`#${id}`} className={`${navLinkClass(id)} text-[#a0a0a0]`}>
											{t(key)}
										</a>
									);
								})}
							</>
						) : (
							<>
								<a href="#about" className={navLinkClass("about")}>
									{t("nav.about")}
								</a>
								<a href="#projects" className={navLinkClass("projects")}>
									{t("nav.projects")}
								</a>
								<Link to="/dossera" className={`${navLinkClass("dossera", true)} nav-underline`}>
									{t("nav.dossera")}
								</Link>
								<a href="#skills" className={navLinkClass("skills")}>
									{t("nav.skills")}
								</a>
								<a
									href="#booking"
									className="px-5 py-3 rounded-full border border-[var(--accent-red)] text-[var(--accent-red)] text-sm font-semibold hover:bg-[var(--accent-red-dim)] transition-colors"
								>
									{t("nav.book_call")}
								</a>
							</>
						)}
					</nav>

					<div className="flex items-center gap-3 sm:gap-4">
						<div className="hidden sm:flex items-center gap-2 font-mono-ui text-xs">
							<button
								type="button"
								onClick={() => setLang("en")}
								className={
									i18n.language.startsWith("en") ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
								}
							>
								EN
							</button>
							<span className="text-[var(--border-bright)] select-none">|</span>
							<button
								type="button"
								onClick={() => setLang("fr")}
								className={
									i18n.language.startsWith("fr") ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
								}
							>
								FR
							</button>
						</div>

						<button
							type="button"
							aria-pressed={isDark}
							aria-label={t("nav.toggle_theme")}
							onClick={toggleTheme}
							onKeyDown={handleKeyDown}
							className={[
								"relative p-2.5 rounded-full border text-[var(--text-primary)] interactive-glow",
								isDossera ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--border-bright)]",
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
							className={[
								"lg:hidden p-2.5 rounded-full border text-[var(--text-primary)]",
								isDossera ? "bg-white/5 border-white/10" : "bg-[var(--bg-secondary)] border-[var(--border)]",
							].join(" ")}
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
							<div className="flex items-center justify-center gap-2 mb-6 sm:hidden font-mono-ui text-xs">
								<button type="button" onClick={() => setLang("en")} className={i18n.language.startsWith("en") ? "text-[var(--accent-red)]" : "text-[var(--text-muted)]"}>
									EN
								</button>
								<span className="text-[var(--border)]">|</span>
								<button type="button" onClick={() => setLang("fr")} className={i18n.language.startsWith("fr") ? "text-[var(--accent-red)]" : "text-[var(--text-muted)]"}>
									FR
								</button>
							</div>

							{isDossera ? (
								<>
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
								</>
							) : (
								<>
									<a href="#about" className="py-3 text-[var(--text-primary)] border-b border-[var(--border)]" onClick={() => setMobileOpen(false)}>
										{t("nav.about")}
									</a>
									<a href="#projects" className="py-3 text-[var(--text-primary)] border-b border-[var(--border)]" onClick={() => setMobileOpen(false)}>
										{t("nav.projects")}
									</a>
									<Link to="/dossera" className="py-3 text-[var(--text-primary)] border-b border-[var(--border)] block" onClick={() => setMobileOpen(false)}>
										{t("nav.dossera")}
									</Link>
									<a href="#skills" className="py-3 text-[var(--text-primary)] border-b border-[var(--border)]" onClick={() => setMobileOpen(false)}>
										{t("nav.skills")}
									</a>
									<a
										href="#booking"
										className="mt-4 py-3 text-center rounded-full border border-[var(--accent-red)] text-[var(--accent-red)] font-semibold text-sm"
										onClick={() => setMobileOpen(false)}
									>
										{t("nav.book_call")}
									</a>
								</>
							)}
						</motion.aside>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default WebsiteHeader;

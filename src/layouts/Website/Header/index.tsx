import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useActiveSection } from "../../../hooks/useActiveSection";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import logo from "/dossera-logo.png";

const DOSSERA_SECTIONS = [
	{ id: "dossera-solve", key: "nav.dossera_solve" },
	{ id: "dossera-services", key: "nav.dossera_services" },
	{ id: "dossera-architecture", key: "nav.dossera_architecture" },
	{ id: "dossera-how", key: "nav.dossera_how" },
	{ id: "dossera-book", key: "nav.dossera_book" },
] as const;

const WebsiteHeader: React.FC = () => {
	const { t, i18n } = useTranslation();
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

	const navLinkClass = (sectionId: string) => {
		const isActive = activeSection === sectionId;
		return [
			"text-sm font-medium transition-colors",
			isActive
				? "text-[var(--accent)]"
				: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
		].join(" ");
	};

	const { scrollYProgress } = useScroll();
	const progressScaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	const isRtl = i18n.language === "ar";

	return (
		<>
			<header
				className={[
					"fixed top-0 left-0 right-0 z-[999] transition-[background,border-color] duration-300",
					dosseraScrolled
						? "bg-[var(--bg-primary)] border-b border-[var(--border)]"
						: "bg-[var(--bg-primary)] border-b border-transparent",
				].join(" ")}
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.25rem] flex items-center justify-between gap-4">
					<Link
						to="/"
						onClick={handleLogoClick}
						className="shrink-0 cursor-pointer select-none inline-block leading-none"
						aria-label="DOSSERA"
					>
						<img
							src={logo}
							alt="DOSSERA"
							className="h-14 w-auto"
							style={{ objectFit: "contain" }}
						/>
					</Link>

					<nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
						{DOSSERA_SECTIONS.map(({ id, key }, idx) => {
							const isBook = idx === DOSSERA_SECTIONS.length - 1;
							if (isBook) {
								return (
									<a
										key={id}
										href={"#" + id}
										className="px-5 py-2.5 rounded bg-[var(--accent)] text-[#0c0a09] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shrink-0"
									>
										{t(key)}
									</a>
								);
							}
							return (
								<a key={id} href={"#" + id} className={navLinkClass(id)}>
									{t(key)}
								</a>
							);
						})}
					</nav>

					<div className="flex items-center gap-3">
						<LanguageSwitcher />

						<button
							type="button"
							className="lg:hidden p-2 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
							aria-label={t("nav.open_menu")}
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen((o) => !o)}
						>
							{mobileOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				{/* Scroll progress bar */}
				<motion.div
					className="absolute bottom-0 left-0 h-[1px] bg-[var(--accent)]"
					style={{ width: progressScaleX }}
				/>
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
							className="absolute inset-0 bg-black/70"
							aria-label={t("nav.close_menu")}
							onClick={() => setMobileOpen(false)}
						/>
						<motion.aside
							className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} h-full w-[min(100%,20rem)] bg-[var(--bg-secondary)] pt-20 px-6 pb-8 flex flex-col gap-1`}
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
											href={"#" + id}
											className="mt-3 py-3 text-center rounded bg-[var(--accent)] text-[#0c0a09] font-semibold text-sm"
											onClick={() => setMobileOpen(false)}
										>
											{t(key)}
										</a>
									);
								}
								return (
									<a
										key={id}
										href={"#" + id}
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

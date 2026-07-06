import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import logo from "/dossera-logo.png";

const WebsiteFooter: React.FC = () => {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className="dossera-section border-t border-[var(--border)] text-sm">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
					<Link to="/" className="shrink-0 inline-block leading-none">
						<img
							src={logo}
							alt="DOSSERA"
							className="h-9 md:h-10 w-auto"
							style={{ objectFit: "contain" }}
						/>
					</Link>
					<nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium justify-center">
						<a href="#dossera-solve" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
							{t("nav.dossera_solve")}
						</a>
						<a href="#dossera-services" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
							{t("nav.dossera_services")}
						</a>
						<a href="#dossera-how" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
							{t("nav.dossera_how")}
						</a>
						<a href="#dossera-book" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
							{t("nav.dossera_book")}
						</a>
					</nav>
				</div>

				<p className="font-display text-2xl md:text-3xl max-w-3xl mx-auto leading-snug text-center mb-10 text-[var(--text-primary)]">
					{t("footer.tagline")}
				</p>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-10">
					<div>
						<p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_email")}</p>
						<a href="mailto:zakmirinioui@gmail.com" className="text-[var(--text-primary)] hover:text-[var(--accent)] break-all flex items-center gap-1 transition-colors">
							<Mail size={14} />
							zakmirinioui@gmail.com
						</a>
					</div>
					<div>
						<p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_phone")}</p>
						<a href="tel:+212626058876" className="text-[var(--text-primary)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors">
							<Phone size={14} />
							+212 6 26 05 88 76
						</a>
					</div>
					<div>
						<p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_linkedin")}</p>
						<a
							href="https://www.linkedin.com/in/zakaria-mirinioui/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
						>
							<Linkedin size={16} />
							/zakaria-mirinioui
						</a>
					</div>
					<div>
						<p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_github")}</p>
						<a
							href="https://github.com/BITIZE5776s"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
						>
							<Github size={16} />
							/BITIZE5776s
						</a>
					</div>
				</div>

				<p className="footer-credit">{t("footer.dossera_credit")}</p>

				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[var(--text-muted)]">
					<p>&copy; {year} {t("footer.copyright")}</p>
					<p>{t("footer.location_line")}</p>
				</div>
			</div>
		</footer>
	);
};

export default WebsiteFooter;

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Github, Linkedin } from "lucide-react";

const WebsiteFooter: React.FC = () => {
	const { t } = useTranslation();

	return (
		<footer className="border-t border-[var(--border)] mt-16 bg-[var(--bg-secondary)]/80">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
					<Link to="/" className="logo-z text-2xl shrink-0 inline-block" aria-label={t("nav.home")}>
						Z.
					</Link>
					<nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium font-body justify-start md:justify-end">
						<a href="/#about" className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] nav-underline">
							{t("footer.nav_about")}
						</a>
						<a href="/#projects" className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] nav-underline">
							{t("footer.nav_projects")}
						</a>
						<Link to="/dossera" className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] nav-underline">
							{t("footer.nav_dossera")}
						</Link>
						<a href="/#booking" className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] nav-underline">
							{t("footer.nav_book")}
						</a>
					</nav>
				</div>

				<p className="text-center font-display font-bold text-2xl md:text-3xl max-w-3xl mx-auto leading-snug footer-tagline-gradient px-2">
					{t("footer.tagline")}
				</p>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
					<div>
						<p className="font-mono-ui text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_email")}</p>
						<a href="mailto:zakmirinioui@gmail.com" className="text-[var(--text-primary)] hover:text-[var(--accent-red)] break-all">
							{t("footer.email")}
						</a>
					</div>
					<div>
						<p className="font-mono-ui text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_whatsapp")}</p>
						<a href="tel:+212626058876" className="text-[var(--text-primary)] hover:text-[var(--accent-red)]">
							{t("footer.whatsapp")}
						</a>
					</div>
					<div>
						<p className="font-mono-ui text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_linkedin")}</p>
						<a
							href="https://www.linkedin.com/in/zakaria-mirinioui/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent-red)]"
						>
							<Linkedin size={16} />
							/zakaria-mirinioui
						</a>
					</div>
					<div>
						<p className="font-mono-ui text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">{t("footer.column_github")}</p>
						<a
							href="https://github.com/BITIZE5776s"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent-red)]"
						>
							<Github size={16} />
							/BITIZE5776s
						</a>
					</div>
				</div>

				<p className="footer-dossera-credit">{t("footer.dossera_credit")}</p>

				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
					<p>{t("footer.copyright")}</p>
					<p>{t("footer.location_line")}</p>
				</div>
			</div>
		</footer>
	);
};

export default WebsiteFooter;

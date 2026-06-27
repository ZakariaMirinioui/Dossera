import React from "react";
import { useTranslation } from "react-i18next";
import { MagneticDosseraCard } from "./MagneticDosseraCard";
import { useReveal } from "../../hooks/useReveal";

export const DosseraServices: React.FC = () => {
	const { t } = useTranslation();
	const servicesRef = useReveal<HTMLDivElement>();

	return (
		<section id="dossera-services" className="dossera-section scroll-mt-[5.5rem] px-4 sm:px-6">
			<div className="max-w-6xl mx-auto">
				<div ref={servicesRef} className="reveal-group flex flex-col gap-5">
					<h2 className="dossera-section-title text-left mb-4 reveal-child" style={{ "--i": 0 } as React.CSSProperties}>
						{t("dosseraLanding.services.title")}
					</h2>

					<div className="dossera-services-asymmetric services-grid">
						<MagneticDosseraCard
							strength={0.08}
							className="dossera-svc-card service-card services-featured relative overflow-hidden"
							style={{ "--i": 1 } as React.CSSProperties}
						>
							<div className="flex gap-4">
								<div className="search-pulse mt-1 shrink-0" aria-hidden />
								<div className="relative flex-1">
									<span className="dossera-svc-num dossera-mono">01</span>
									<h3 className="dossera-card-heading pr-12">{t("dosseraLanding.services.s1_title")}</h3>
									<p className="dossera-body text-[length:var(--text-sm)] mt-2 leading-relaxed">{t("dosseraLanding.services.s1_desc")}</p>
									<p className="dossera-body text-[length:var(--text-sm)] text-[var(--text-muted)] mt-3 leading-relaxed">{t("dosseraLanding.services.s1_desc_long")}</p>
								</div>
							</div>
						</MagneticDosseraCard>

						<MagneticDosseraCard
							strength={0.15}
							className="dossera-svc-card service-card services-card services-s3"
							style={{ "--i": 2 } as React.CSSProperties}
						>
							<span className="dossera-svc-num dossera-mono">03</span>
							<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s3_title")}</h3>
							<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s3_desc")}</p>
						</MagneticDosseraCard>

						<MagneticDosseraCard
							strength={0.15}
							className="dossera-svc-card service-card services-card services-s2"
							style={{ "--i": 3 } as React.CSSProperties}
						>
							<span className="dossera-svc-num dossera-mono">02</span>
							<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s2_title")}</h3>
							<p className="dossera-body text-[length:var(--text-sm)] mt-2 leading-relaxed">{t("dosseraLanding.services.s2_desc")}</p>
							<p className="dossera-body text-[length:var(--text-sm)] text-[var(--text-muted)] mt-6 leading-relaxed">{t("dosseraLanding.services.s2_desc_extra")}</p>
						</MagneticDosseraCard>

						<MagneticDosseraCard
							strength={0.15}
							className="dossera-svc-card service-card services-card services-s4"
							style={{ "--i": 4 } as React.CSSProperties}
						>
							<span className="dossera-svc-num dossera-mono">04</span>
							<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s4_title")}</h3>
							<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s4_desc")}</p>
						</MagneticDosseraCard>

						<MagneticDosseraCard
							strength={0.15}
							className="dossera-svc-card service-card services-card services-s5 services-tall"
							style={{ "--i": 5 } as React.CSSProperties}
						>
							<span className="dossera-svc-num dossera-mono">05</span>
							<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s5_title")}</h3>
							<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s5_desc")}</p>
						</MagneticDosseraCard>

						<MagneticDosseraCard
							strength={0.15}
							className="dossera-svc-card service-card services-card services-s6"
							style={{ "--i": 6 } as React.CSSProperties}
						>
							<span className="dossera-svc-num dossera-mono">06</span>
							<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s6_title")}</h3>
							<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s6_desc")}</p>
						</MagneticDosseraCard>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DosseraServices;
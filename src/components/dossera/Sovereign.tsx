import React from "react";
import { useTranslation } from "react-i18next";
import { useCursorGlow } from "../../hooks/useCursorGlow";
import { useReveal } from "../../hooks/useReveal";

export const DosseraSovereign: React.FC = () => {
	const { t } = useTranslation();
	const sovereignRef = useReveal<HTMLElement>();

	useCursorGlow(sovereignRef);

	return (
		<section
			id="dossera-why"
			ref={sovereignRef}
			className="dossera-section dossera-section--sovereign reveal cursor-glow-section scroll-mt-[5.5rem] px-4 sm:px-6 text-white"
		>
			<p className="dossera-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] text-center mb-4">
				{t("dosseraLanding.sovereign.label")}
			</p>
			<h2 className="dossera-section-title text-center mb-12">{t("dosseraLanding.sovereign.title")}</h2>
			<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-0">
				<div className="p-8 md:p-10 bg-[rgba(230,57,70,0.06)] md:rounded-l-xl border border-[#222] md:border-r-0">
					<p className="dossera-mono text-[10px] uppercase tracking-widest text-[#707070] mb-8">
						{t("dosseraLanding.sovereign.panel_others")}
					</p>
					{(["others_1", "others_2", "others_3"] as const).map((k) => (
						<p
							key={k}
							className="dossera-body text-[length:var(--text-lg)] text-[#a0a0a0] leading-snug border-b border-white/10 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0"
						>
							{t(`dosseraLanding.sovereign.${k}`)}
						</p>
					))}
				</div>
				<div className="p-8 md:p-10 bg-[rgba(201,168,76,0.06)] md:rounded-r-xl border border-[rgba(201,168,76,0.25)] border-l-2 border-l-[var(--gold)]">
					<p className="dossera-mono text-[10px] uppercase tracking-widest text-[var(--gold)] mb-8">
						{t("dosseraLanding.sovereign.panel_us")}
					</p>
					{(["us_1", "us_2", "us_3"] as const).map((k) => (
						<p key={k} className="dossera-check dossera-body text-[length:var(--text-lg)] text-white leading-snug mb-6 last:mb-0">
							{t(`dosseraLanding.sovereign.${k}`)}
						</p>
					))}
				</div>
			</div>
		</section>
	);
};

export default DosseraSovereign;
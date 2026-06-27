import React from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";

export const DosseraHowItWorks: React.FC = () => {
	const { t } = useTranslation();
	const howDeskRef = useReveal<HTMLDivElement>();
	const howMobRef = useReveal<HTMLDivElement>();

	const stepKeys = [
		["step1_title", "step1_desc"],
		["step2_title", "step2_desc"],
		["step3_title", "step3_desc"],
		["step4_title", "step4_desc"],
	] as const;

	return (
		<section id="dossera-how" className="dossera-section scroll-mt-[5.5rem] max-w-6xl mx-auto px-4 sm:px-6">
			<h2 className="dossera-section-title text-center mb-16">{t("dosseraLanding.how.title")}</h2>

			<div className="hidden md:block relative pt-2 pb-10">
				<div className="absolute top-[48px] left-[10%] right-[10%] h-0 border-t border-dashed border-[rgba(230,57,70,0.45)] z-0" aria-hidden />
				<div ref={howDeskRef} className="reveal-group-stagger-15 reveal-group grid grid-cols-4 gap-4 relative z-[1]">
					{stepKeys.map(([title, desc], i) => (
						<div key={title} className="text-center px-2" style={{ "--i": i } as React.CSSProperties}>
							<div className="flex justify-center mb-6">
								<div className="step-circle">{String(i + 1).padStart(2, "0")}</div>
							</div>
							<h3 className="dossera-card-heading mb-2">{t(`dosseraLanding.how.${title}`)}</h3>
							<p className="dossera-body text-[length:var(--text-sm)] leading-relaxed">{t(`dosseraLanding.how.${desc}`)}</p>
						</div>
					))}
				</div>
			</div>

			<div ref={howMobRef} className="reveal-group md:hidden pl-3 border-l border-dashed border-[rgba(230,57,70,0.45)] space-y-10">
				{stepKeys.map(([title, desc], i) => (
					<div key={title} className="relative pl-6" style={{ "--i": i } as React.CSSProperties}>
						<div className="absolute -left-[31px] top-0 step-circle w-10 h-10 text-[10px]">{String(i + 1).padStart(2, "0")}</div>
						<h3 className="dossera-card-heading mb-2">{t(`dosseraLanding.how.${title}`)}</h3>
						<p className="dossera-body text-[length:var(--text-sm)] leading-relaxed">{t(`dosseraLanding.how.${desc}`)}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default DosseraHowItWorks;
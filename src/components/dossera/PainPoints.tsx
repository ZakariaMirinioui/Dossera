import React from "react";
import { useTranslation } from "react-i18next";
import { MagneticDosseraCard } from "./MagneticDosseraCard";
import { useReveal } from "../../hooks/useReveal";

export const DosseraPainPoints: React.FC = () => {
	const { t } = useTranslation();
	const painRef = useReveal<HTMLDivElement>();

	const painKeys = [
		["card1_title", "card1_after"],
		["card2_title", "card2_after"],
		["card3_title", "card3_after"],
	] as const;

	return (
		<section id="dossera-solve" className="dossera-section scroll-mt-[5.5rem] max-w-6xl mx-auto px-4 sm:px-6">
			<div ref={painRef} className="reveal-group grid md:grid-cols-3 gap-5 md:gap-6">
				<h2
					className="dossera-section-title text-left md:col-span-3 mb-2 reveal-child"
					style={{ "--i": 0 } as React.CSSProperties}
				>
					{t("dosseraLanding.pain.title")}
				</h2>
				{painKeys.map(([before, after], i) => (
					<MagneticDosseraCard
						key={before}
						strength={0.15}
						className="dossera-svc-card min-h-[140px]"
						style={{ "--i": i + 1 } as React.CSSProperties}
					>
						<p className="dossera-body text-[length:var(--text-sm)] mb-3">{t(`dosseraLanding.pain.${before}`)}</p>
						<p className="dossera-body text-[length:var(--text-base)] font-medium text-[var(--accent-red)]">{t(`dosseraLanding.pain.${after}`)}</p>
					</MagneticDosseraCard>
				))}
			</div>
		</section>
	);
};

export default DosseraPainPoints;
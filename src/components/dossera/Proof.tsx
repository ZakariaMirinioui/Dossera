import React from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";

export const DosseraProof: React.FC = () => {
	const { t } = useTranslation();
	const resultsRef = useReveal<HTMLElement>();

	const proofMetrics = t("dosseraLanding.results.metrics", { returnObjects: true }) as any[];

	return (
		<section id="dossera-proof" ref={resultsRef} className="dossera-section reveal scroll-mt-[5.5rem] px-4 sm:px-6">
			<div className="max-w-3xl mx-auto">
				<h2 className="dossera-section-title text-left mb-2">{t("dosseraLanding.results.title")}</h2>
				<div className="mt-10">
					{Array.isArray(proofMetrics) &&
						proofMetrics.map((m, i) => (
							<div key={`${m.label}-${i}`} className="proof-panel glass-card">
								<div className="proof-panel-copy min-w-0">
									<p className="proof-before">{m.before}</p>
									<p className="proof-after">{m.after}</p>
									<p className="proof-label">{m.label}</p>
									<p className="proof-context">{m.context}</p>
								</div>
								<div className="proof-accent-line shrink-0" aria-hidden />
							</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default DosseraProof;
import React from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";

export const DosseraServe: React.FC = () => {
	const { t } = useTranslation();
	const serveRef = useReveal<HTMLElement>();

	const marketMa = t("dosseraLanding.serve.morocco", { returnObjects: true }) as any;
	const marketIt = t("dosseraLanding.serve.italy", { returnObjects: true }) as any;

	return (
		<section ref={serveRef} className="dossera-section reveal scroll-mt-[5.5rem] max-w-6xl mx-auto px-4 sm:px-6">
			<h2 className="dossera-section-title text-left mb-10">{t("dosseraLanding.serve.title")}</h2>
			<div className="grid md:grid-cols-2 gap-6">
				{([marketMa, marketIt] as any[]).map((market) => {
					const clients = Array.isArray(market?.clients) ? market.clients : [];
					return (
						<div key={market.name} className="market-card glass-card">
							<h3 className="market-name">{market.name}</h3>
							<p className="market-subtitle">{market.subtitle}</p>
							<ul className="market-client-list">
								{clients.map((c: string) => (
									<li key={c}>{c}</li>
								))}
							</ul>
							<p className="market-note">{market.note}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default DosseraServe;
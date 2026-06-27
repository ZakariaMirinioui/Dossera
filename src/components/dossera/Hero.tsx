import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCursorGlow } from "../../hooks/useCursorGlow";

export const DosseraHero: React.FC = () => {
	const { t } = useTranslation();
	const heroGlowRef = useRef<HTMLDivElement>(null);

	useCursorGlow(heroGlowRef);

	return (
		<section ref={heroGlowRef} className="dossera-hero cursor-glow-section">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="max-w-3xl mx-auto text-center">
					<p className="dossera-hero-eyebrow animate-reveal" style={{ animationDelay: '0ms' }}>{t("dosseraLanding.hero.eyebrow")}</p>
					<h1 className="dossera-hero-headline animate-reveal" style={{ animationDelay: '200ms' }}>
						{t("dosseraLanding.hero.headline_line1")}
						<br />
						{t("dosseraLanding.hero.headline_line2")}
					</h1>
					<p className="dossera-hero-continuation animate-reveal" style={{ animationDelay: '400ms' }}>{t("dosseraLanding.hero.continuation")}</p>
					<p className="dossera-hero-description whitespace-pre-line animate-reveal" style={{ animationDelay: '600ms' }}>{t("dosseraLanding.hero.description")}</p>
					<div className="dossera-hero-ctas animate-reveal" style={{ animationDelay: '800ms' }}>
						<a href="#dossera-book" className="dossera-hero-cta dossera-hero-cta--primary">
							{t("dosseraLanding.hero.cta_primary")} →
						</a>
						<a href="#dossera-how" className="dossera-hero-cta dossera-hero-cta--secondary">
							{t("dosseraLanding.hero.cta_secondary")} ↓
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DosseraHero;
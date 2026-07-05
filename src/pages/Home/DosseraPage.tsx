import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Search, ScrollText, BarChart3, FileText, Clock } from "lucide-react";
import DosseraBookingForm from "./DosseraBookingForm";
import { useReveal } from "../../hooks/useReveal";
import { useCursorGlow } from "../../hooks/useCursorGlow";
import WebsiteHeader from "../../layouts/Website/Header";

const painKeys = [
	["card1_title", "card1_after"],
	["card2_title", "card2_after"],
	["card3_title", "card3_after"],
] as const;

const CAPABILITY_ICONS = [Shield, Search, ScrollText, BarChart3, FileText, Clock] as const;

type CapabilityItem = { title: string; desc: string };

type ProofMetric = { before: string; after: string; label: string; context: string };
type Market = { name: string; subtitle: string; note: string; clients: string[] };

const DosseraPage: React.FC = () => {
	const { t } = useTranslation();
	const proofMetrics = t("dosseraLanding.results.metrics", { returnObjects: true }) as ProofMetric[];
	const howItems = t("dosseraLanding.how.items", { returnObjects: true }) as CapabilityItem[];
	const marketMa = t("dosseraLanding.serve.morocco", { returnObjects: true }) as Market;
	const marketIt = t("dosseraLanding.serve.italy", { returnObjects: true }) as Market;
	const painRef = useReveal<HTMLDivElement>();
	const svcRef = useReveal<HTMLDivElement>();
	const howRef = useReveal<HTMLDivElement>();
	const sovereignRef = useReveal<HTMLElement>();
	const resultsRef = useReveal<HTMLElement>();
	const serveRef = useReveal<HTMLElement>();
	const heroGlowRef = useRef<HTMLElement>(null);
	const bookGlowRef = useRef<HTMLElement>(null);

	useCursorGlow(heroGlowRef);
	useCursorGlow(bookGlowRef);
	useCursorGlow(sovereignRef);

	return (
		<div className="dossera-page pb-8">
			<WebsiteHeader />
			<section ref={heroGlowRef} className="dossera-hero cursor-glow-section">
				<p className="dossera-hero-eyebrow">{t("dosseraLanding.hero.eyebrow")}</p>
				<h1 className="dossera-hero-headline">
					{t("dosseraLanding.hero.headline_line1")}
					<br />
					{t("dosseraLanding.hero.headline_line2")}
				</h1>
				<p className="dossera-hero-continuation">{t("dosseraLanding.hero.continuation")}</p>
				<p className="dossera-hero-description whitespace-pre-line">{t("dosseraLanding.hero.description")}</p>
				<div className="dossera-hero-ctas">
					<a href="#dossera-book" className="dossera-hero-cta dossera-hero-cta--primary">
						{t("dosseraLanding.hero.cta_primary")}
					</a>
					<a href="#dossera-how" className="dossera-hero-cta dossera-hero-cta--secondary">
						{t("dosseraLanding.hero.cta_secondary")}
					</a>
				</div>
			</section>
			<div className="dossera-hero-fade" aria-hidden />

			<section id="dossera-solve" className="dossera-section scroll-mt-[5.5rem] max-w-6xl mx-auto px-4 sm:px-6">
				<div ref={painRef} className="reveal-group grid md:grid-cols-3 gap-5 md:gap-6">
					<h2
						className="dossera-section-title text-left md:col-span-3 mb-2"
						style={{ "--i": 0 } as React.CSSProperties}
					>
						{t("dosseraLanding.pain.title")}
					</h2>
					{painKeys.map(([before, after], i) => (
						<div
							key={before}
							className="glass-card dossera-svc-card min-h-[140px]"
							style={{ "--i": i + 1 } as React.CSSProperties}
						>
							<p className="dossera-body text-[length:var(--text-sm)] mb-3">{t(`dosseraLanding.pain.${before}`)}</p>
							<p className="dossera-body text-[length:var(--text-base)] font-medium text-[var(--accent-red)]">{t(`dosseraLanding.pain.${after}`)}</p>
						</div>
					))}
				</div>
			</section>

			<section id="dossera-services" className="dossera-section scroll-mt-[5.5rem] px-4 sm:px-6">
				<div className="max-w-6xl mx-auto">
					<div ref={svcRef} className="reveal-group flex flex-col gap-5">
						<h2 className="dossera-section-title text-left mb-4" style={{ "--i": 0 } as React.CSSProperties}>
							{t("dosseraLanding.services.title")}
						</h2>

						<div className="dossera-services-asymmetric services-grid">
							<div
								className="glass-card dossera-svc-card service-card services-featured relative overflow-hidden"
								style={{ "--i": 1 } as React.CSSProperties}
							>
								<div className="flex gap-4">
									<div className="search-pulse mt-1 shrink-0" aria-hidden />
									<div className="relative flex-1">
										<span className="dossera-svc-num dossera-mono">01</span>
										<h3 className="dossera-card-heading pr-12">{t("dosseraLanding.services.s1_title")}</h3>
										<p className="dossera-body text-[length:var(--text-sm)] mt-2 leading-relaxed">
											{t("dosseraLanding.services.s1_desc")}
										</p>
										<p className="dossera-body text-[length:var(--text-sm)] text-[var(--text-muted)] mt-3 leading-relaxed">
											{t("dosseraLanding.services.s1_desc_long")}
										</p>
									</div>
								</div>
							</div>

							<div className="glass-card dossera-svc-card service-card services-card services-s3" style={{ "--i": 2 } as React.CSSProperties}>
								<span className="dossera-svc-num dossera-mono">03</span>
								<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s3_title")}</h3>
								<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s3_desc")}</p>
							</div>

							<div className="glass-card dossera-svc-card service-card services-card services-s2" style={{ "--i": 3 } as React.CSSProperties}>
								<span className="dossera-svc-num dossera-mono">02</span>
								<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s2_title")}</h3>
								<p className="dossera-body text-[length:var(--text-sm)] mt-2 leading-relaxed">{t("dosseraLanding.services.s2_desc")}</p>
								<p className="dossera-body text-[length:var(--text-sm)] text-[var(--text-muted)] mt-6 leading-relaxed">
									{t("dosseraLanding.services.s2_desc_extra")}
								</p>
							</div>

							<div className="glass-card dossera-svc-card service-card services-card services-s4" style={{ "--i": 4 } as React.CSSProperties}>
								<span className="dossera-svc-num dossera-mono">04</span>
								<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s4_title")}</h3>
								<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s4_desc")}</p>
							</div>

							<div
								className="glass-card dossera-svc-card service-card services-card services-s5 services-tall"
								style={{ "--i": 5 } as React.CSSProperties}
							>
								<span className="dossera-svc-num dossera-mono">05</span>
								<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s5_title")}</h3>
								<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s5_desc")}</p>
							</div>

							<div className="glass-card dossera-svc-card service-card services-card services-s6" style={{ "--i": 6 } as React.CSSProperties}>
								<span className="dossera-svc-num dossera-mono">06</span>
								<h3 className="dossera-card-heading pr-10">{t("dosseraLanding.services.s6_title")}</h3>
								<p className="dossera-body text-[length:var(--text-sm)] mt-2">{t("dosseraLanding.services.s6_desc")}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="dossera-how" className="dossera-section scroll-mt-[5.5rem] max-w-6xl mx-auto px-4 sm:px-6">
				<h2 className="dossera-section-title text-center mb-16">{t("dosseraLanding.how.title")}</h2>

				<div ref={howRef} className="reveal-group-stagger-15 reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{Array.isArray(howItems) && howItems.map((item, i) => {
						const Icon = CAPABILITY_ICONS[i] || Shield;
						return (
							<div key={item.title} className="capability-card glass-card" style={{ "--i": i } as React.CSSProperties}>
								<div className="capability-icon-wrap">
									<Icon size={22} className="capability-icon" />
								</div>
								<h3 className="dossera-card-heading mb-2">{item.title}</h3>
								<p className="dossera-body text-[length:var(--text-sm)] leading-relaxed">{item.desc}</p>
							</div>
						);
					})}
				</div>
			</section>

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

			<section id="dossera-proof" ref={resultsRef} className="dossera-section reveal scroll-mt-[5.5rem] px-4 sm:px-6">
				<div className="max-w-3xl mx-auto">
					<h2 className="dossera-section-title text-left mb-2">{t("dosseraLanding.results.title")}</h2>
					<div className="mt-10">
						{Array.isArray(proofMetrics) &&
							proofMetrics.map((m) => (
								<div key={`${m.label}-${m.after}`} className="proof-panel glass-card">
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

			<section ref={serveRef} className="dossera-section reveal scroll-mt-[5.5rem] max-w-6xl mx-auto px-4 sm:px-6">
				<h2 className="dossera-section-title text-left mb-10">{t("dosseraLanding.serve.title")}</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{[marketMa, marketIt].map((market) => {
						const clients = Array.isArray(market?.clients) ? market.clients : [];
						return (
							<div key={market.name} className="market-card glass-card">
								<h3 className="market-name">{market.name}</h3>
								<p className="market-subtitle">{market.subtitle}</p>
								<ul className="market-client-list">
									{clients.map((c) => (
										<li key={c}>{c}</li>
									))}
								</ul>
								<p className="market-note">{market.note}</p>
							</div>
						);
					})}
				</div>
			</section>

			<section
				ref={bookGlowRef}
				id="dossera-book"
				className="dossera-section dossera-section--booking cursor-glow-section scroll-mt-[5.5rem] px-4 sm:px-6 text-white"
			>
				<div className="w-[30%] min-w-[120px] max-w-[240px] h-px bg-[var(--accent-red)] mx-auto mb-12" />
				<h2 className="dossera-section-title dossera-section-title--book mb-6">{t("dosseraLanding.book.title")}</h2>
				<p className="dossera-body text-center text-[#a0a0a0] max-w-[480px] mx-auto mb-10">
					{t("dosseraLanding.book.sub")}
				</p>
				<p className="dossera-mono text-center text-[length:var(--text-xs)] text-[#707070] max-w-3xl mx-auto mb-10 leading-relaxed">
					{t("dosseraLanding.book.trust_row")}
				</p>
				<div className="w-full max-w-xl mx-auto h-px bg-[#222] mb-12" />
				<div className="max-w-[560px] mx-auto">
					<DosseraBookingForm />
				</div>
			</section>

			<footer className="dossera-section dossera-section--footer text-center text-sm text-[var(--text-muted)] space-y-3 max-w-6xl mx-auto px-4 sm:px-6">
				<p className="dossera-body text-[var(--text-secondary)]">{t("dosseraLanding.footer.line1")}</p>
				<p className="dossera-body">{t("dosseraLanding.footer.line2")}</p>
				<p className="dossera-body">
					{t("dosseraLanding.footer.contact")}:{" "}
					<a href="mailto:zakmirinioui@gmail.com" className="text-[var(--accent-red)] hover:underline">
						zakmirinioui@gmail.com
					</a>
				</p>
			</footer>
		</div>
	);
};

export default DosseraPage;
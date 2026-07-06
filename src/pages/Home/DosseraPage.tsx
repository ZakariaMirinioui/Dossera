import { useTranslation } from "react-i18next";
import {
	Shield, Search, ScrollText, FileText,
	ArrowRight, Server, Database, Zap, Layers, GitBranch, Upload
} from "lucide-react";
import DosseraBookingForm from "./DosseraBookingForm";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

const CAPABILITY_ICONS = [Search, GitBranch, Shield, Layers, FileText, ScrollText] as const;

type MetricItem = { label: string; value: string; desc: string };
type RoadmapItem = { phase: string; title: string; desc: string };

const DosseraPage: React.FC = () => {
	const { t } = useTranslation();
	const metrics = t("dosseraLanding.proof.metrics", { returnObjects: true }) as MetricItem[];
	const capItems = t("dosseraLanding.capabilities.items", { returnObjects: true }) as { title: string; desc: string }[];
	const roadmapItems = [
		t("dosseraLanding.roadmap.now", { returnObjects: true }) as RoadmapItem,
		t("dosseraLanding.roadmap.next", { returnObjects: true }) as RoadmapItem,
		t("dosseraLanding.roadmap.later", { returnObjects: true }) as RoadmapItem,
	];

	const painRef = useReveal<HTMLDivElement>();
	const capRef = useReveal<HTMLDivElement>();
	const archRef = useReveal<HTMLDivElement>();
	const sovereignRef = useReveal<HTMLElement>();
	const proofRef = useReveal<HTMLElement>();
	const roadmapRef = useReveal<HTMLDivElement>();

	const painKeys = [
		["card1_title", "card1_after"],
		["card2_title", "card2_after"],
		["card3_title", "card3_after"],
	] as const;

	return (
		<div className="dossera-page">
			<WebsiteHeader />

			{/* ─── HERO ─── */}
			<section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-24 max-w-4xl mx-auto">
				<p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--accent)] mb-6">
					{t("dosseraLanding.hero.eyebrow")}
				</p>

				<h1 className="font-display italic text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl mx-auto mb-4">
					{t("dosseraLanding.hero.headline_line1")}
					<br />
					{t("dosseraLanding.hero.headline_line2")}
				</h1>

				<p className="font-display text-[clamp(1.2rem,2.5vw,1.75rem)] font-normal text-[var(--accent)] mt-2 mb-8">
					{t("dosseraLanding.hero.continuation")}
				</p>

				<p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-12 text-base leading-relaxed whitespace-pre-line">
					{t("dosseraLanding.hero.description")}
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="#dossera-book" className="cta-primary">
						{t("dosseraLanding.hero.cta_primary")}
						<ArrowRight size={16} />
					</a>
					<a href="#dossera-architecture" className="cta-secondary">
						{t("dosseraLanding.hero.cta_secondary")}
					</a>
				</div>
			</section>

			{/* ─── PAIN POINTS ─── */}
			<section id="dossera-solve" className="dossera-section scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div ref={painRef} className="reveal-group grid md:grid-cols-3 gap-5 md:gap-6">
						<h2
							className="section-title md:col-span-3 mb-2"
							style={{ "--i": 0 } as React.CSSProperties}
						>
							{t("dosseraLanding.pain.title")}
						</h2>
						{painKeys.map(([before, after], i) => (
							<div
								key={before}
								className="card card-accent min-h-[140px] flex flex-col justify-center"
								style={{ "--i": i + 1 } as React.CSSProperties}
							>
								<p className="body-text text-sm mb-3">{t(`dosseraLanding.pain.${before}`)}</p>
								<p className="text-base font-medium text-[var(--accent)]">{t(`dosseraLanding.pain.${after}`)}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── REAL ARCHITECTURE ─── */}
			<section id="dossera-architecture" className="dossera-section dossera-section--alt scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div ref={archRef} className="reveal">
						<p className="section-label">{t("dosseraLanding.architecture.title")}</p>
						<h2 className="section-title mb-3">{t("dosseraLanding.architecture.title")}</h2>
						<p className="section-sub mb-12">{t("dosseraLanding.architecture.subtitle")}</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-8">
						{/* Ingestion & Retrieval */}
						<div className="reveal" style={{ transitionDelay: "0.1s" }}>
							<h3 className="card-title flex items-center gap-2 mb-4">
								<Server size={18} className="text-[var(--accent)]" />
								{t("dosseraLanding.architecture.ingestion_title")}
							</h3>
							<p className="body-text text-sm mb-5">{t("dosseraLanding.architecture.ingestion_desc")}</p>

							<div className="arch-flow">
								<div className="arch-step">
									<div className="arch-step-icon"><Upload className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">Bulk Upload</p>
										<p className="arch-desc">Documents enter via unified pipeline</p>
									</div>
								</div>
								<div className="arch-step">
									<div className="arch-step-icon"><FileText className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">OCR Processing</p>
										<p className="arch-desc">Tesseract.js via BullMQ workers</p>
									</div>
								</div>
								<div className="arch-branch">
									<div className="arch-step">
										<div className="arch-step-icon"><Zap className="w-4 h-4" /></div>
										<div>
											<p className="arch-label">{t("dosseraLanding.architecture.semantic_title")}</p>
											<p className="arch-desc">{t("dosseraLanding.architecture.semantic_desc")}</p>
										</div>
									</div>
									<div className="arch-step">
										<div className="arch-step-icon"><Search className="w-4 h-4" /></div>
										<div>
											<p className="arch-label">{t("dosseraLanding.architecture.keyword_title")}</p>
											<p className="arch-desc">{t("dosseraLanding.architecture.keyword_desc")}</p>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-6 card">
								<div className="flex items-start gap-3">
									<Layers size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
									<div>
										<p className="arch-label mb-1">{t("dosseraLanding.architecture.physical_title")}</p>
										<p className="arch-desc">{t("dosseraLanding.architecture.physical_desc")}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Resilience & Caching */}
						<div className="reveal" style={{ transitionDelay: "0.2s" }}>
							<h3 className="card-title flex items-center gap-2 mb-4">
								<Shield size={18} className="text-[var(--accent)]" />
								{t("dosseraLanding.architecture.resilience_title")}
							</h3>
							<p className="body-text text-sm mb-5">{t("dosseraLanding.architecture.resilience_desc")}</p>

							<div className="arch-flow mb-6">
								<div className="arch-step">
									<div className="arch-step-icon"><Database className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">L1: In-Memory LRU</p>
										<p className="arch-desc">5000 entries, stale-while-revalidate</p>
									</div>
								</div>
								<div className="arch-step">
									<div className="arch-step-icon"><Database className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">L2: Redis Cluster</p>
										<p className="arch-desc">Dedicated cache connection</p>
									</div>
								</div>
								<div className="arch-step">
									<div className="arch-step-icon"><Database className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">L3: Database</p>
										<p className="arch-desc">PostgreSQL, Meilisearch, MinIO</p>
									</div>
								</div>
							</div>

							<div className="card">
								<div className="flex items-start gap-3">
									<GitBranch size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
									<div>
										<p className="arch-label mb-1">{t("dosseraLanding.architecture.circuit_title")}</p>
										<p className="arch-desc">{t("dosseraLanding.architecture.circuit_desc")}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─── CORE CAPABILITIES ─── */}
			<section id="dossera-how" className="dossera-section scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div ref={capRef} className="reveal">
						<p className="section-label">{t("dosseraLanding.capabilities.title")}</p>
						<h2 className="section-title mb-10">{t("dosseraLanding.capabilities.title")}</h2>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{capItems.map((item, i) => {
							const Icon = CAPABILITY_ICONS[i] || Shield;
							const isFeatured = i === 3;
							return (
								<div
									key={item.title}
									className={`card ${isFeatured ? "md:col-span-2 lg:col-span-1" : ""} ${isFeatured ? "border-[var(--accent-dim)]" : ""}`}
									style={{ "--i": i } as React.CSSProperties}
								>
									<div className="flex items-center gap-3 mb-3">
										<div className="w-9 h-9 flex items-center justify-center bg-[var(--accent-dim)] rounded-lg">
											<Icon size={18} className="text-[var(--accent)]" />
										</div>
										<h3 className="card-title mb-0">{item.title}</h3>
									</div>
									<p className="body-text text-sm leading-relaxed">{item.desc}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ─── WHY SOVEREIGN ─── */}
			<section
				id="dossera-why"
				ref={sovereignRef}
				className="dossera-section dossera-section--alt reveal scroll-mt-[5.5rem]"
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<p className="section-label text-center">{t("dosseraLanding.sovereign.label")}</p>
					<h2 className="section-title text-center mb-12">{t("dosseraLanding.sovereign.title")}</h2>

					<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 md:gap-0 border border-[var(--border)] rounded-xl overflow-hidden">
						<div className="p-8 md:p-10 bg-[var(--bg-secondary)] border-b md:border-b-0 md:border-r border-[var(--border)]">
							<p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-8">
								{t("dosseraLanding.sovereign.panel_others")}
							</p>
							{(["others_1", "others_2", "others_3"] as const).map((k) => (
								<p
									key={k}
									className="body-text text-base leading-snug border-b border-[var(--border)] pb-5 mb-5 last:border-0 last:pb-0 last:mb-0"
								>
									{t(`dosseraLanding.sovereign.${k}`)}
								</p>
							))}
						</div>
						<div className="p-8 md:p-10 bg-[var(--bg-tertiary)]">
							<p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-8">
								{t("dosseraLanding.sovereign.panel_us")}
							</p>
							<ul className="check-list">
								{(["us_1", "us_2", "us_3"] as const).map((k) => (
									<li key={k} className="text-base text-[var(--text-primary)]">
										{t(`dosseraLanding.sovereign.${k}`)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* ─── ENGINEERING PROOF ─── */}
			<section ref={proofRef} className="dossera-section reveal scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<p className="section-label">{t("dosseraLanding.proof.title")}</p>
					<h2 className="section-title mb-3">{t("dosseraLanding.proof.title")}</h2>
					<p className="section-sub mb-12">{t("dosseraLanding.proof.subtitle")}</p>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{metrics.map((m) => (
							<div key={m.label} className="card text-center">
								<p className="font-display text-[clamp(2rem,4vw,3rem)] text-[var(--accent)] leading-none mb-2">
									{m.value}
								</p>
								<p className="font-medium text-sm text-[var(--text-primary)] mb-2">{m.label}</p>
								<p className="text-xs text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── SERVICES ─── */}
			<section id="dossera-services" className="dossera-section dossera-section--alt reveal scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<p className="section-label">{t("dosseraLanding.services.title")}</p>
					<h2 className="section-title mb-3">{t("dosseraLanding.services.title")}</h2>
					<p className="section-sub mb-10">{t("dosseraLanding.services.subtitle")}</p>

					<div className="grid md:grid-cols-3 gap-4">
						{(["s1", "s2", "s3"] as const).map((s) => (
							<div key={s} className="card">
								<h3 className="card-title mb-2">{t(`dosseraLanding.services.${s}_title`)}</h3>
								<p className="body-text text-sm leading-relaxed">{t(`dosseraLanding.services.${s}_desc`)}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── ROADMAP ─── */}
			<section ref={roadmapRef} className="dossera-section reveal scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<p className="section-label">{t("dosseraLanding.roadmap.title")}</p>
					<h2 className="section-title mb-3">{t("dosseraLanding.roadmap.title")}</h2>
					<p className="section-sub mb-10">{t("dosseraLanding.roadmap.subtitle")}</p>

					<div className="roadmap-strip">
						{roadmapItems.map((item, i) => (
							<div key={item.phase} className="roadmap-item">
								<p className={`roadmap-phase ${i === 0 ? "roadmap-phase--next" : ""}`}>
									{item.phase}
								</p>
								<h3 className="roadmap-title">{item.title}</h3>
								<p className="roadmap-desc">{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── BOOKING ─── */}
			<section
				id="dossera-book"
				className="dossera-section dossera-section--alt scroll-mt-[5.5rem]"
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
					<div className="accent-divider mx-auto mb-8" />
					<h2 className="section-title max-w-3xl mx-auto mb-4">{t("dosseraLanding.book.title")}</h2>
					<p className="body-text max-w-xl mx-auto mb-6">{t("dosseraLanding.book.sub")}</p>
					<p className="font-mono text-xs text-[var(--text-muted)] max-w-3xl mx-auto mb-10 leading-relaxed">
						{t("dosseraLanding.book.trust_row")}
					</p>
					<div className="max-w-[560px] mx-auto">
						<DosseraBookingForm />
					</div>
				</div>
			</section>

			{/* ─── FOOTER ─── */}
			<WebsiteFooter />
		</div>
	);
};

export default DosseraPage;

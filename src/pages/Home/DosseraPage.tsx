import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
	Shield, Search, ScrollText, FileText,
	ArrowRight, Server, Database, Zap, Layers, GitBranch, Upload, Clock, AlertTriangle, FileWarning,
	Building2, Scale, Landmark, ShieldCheck, ChevronDown
} from "lucide-react";
import DosseraBookingForm from "./DosseraBookingForm";
import { useReveal } from "../../hooks/useReveal";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";
import AuroraHero from "../../components/AuroraHero/AuroraHero";
import ArchitecturePipeline from "../../components/Dossera3D/ArchitecturePipeline";
import PhysicalArchive from "../../components/Dossera3D/PhysicalArchive";
import TelemetryPanel from "../../components/Dossera3D/TelemetryPanel";

const CAPABILITY_ICONS = [Search, GitBranch, Shield, Layers, FileText, ScrollText] as const;
const STAT_ICONS = [Clock, AlertTriangle, FileWarning] as const;

type MetricItem = { label: string; value: string; desc: string };
type RoadmapItem = { phase: string; title: string; desc: string };
type PainItem = { before: string; after: string };
type PainStat = { value: string; label: string; desc: string };
type ComplianceItem = { name: string; status: string; desc: string };
type FaqItem = { q: string; a: string };

const DosseraPage: React.FC = () => {
	const { t } = useTranslation();
	const metrics = t("dosseraLanding.proof.metrics", { returnObjects: true }) as MetricItem[];
	const capItems = t("dosseraLanding.capabilities.items", { returnObjects: true }) as { title: string; desc: string }[];
	const painItems = t("dosseraLanding.pain.items", { returnObjects: true }) as PainItem[];
	const complianceItems = t("dosseraLanding.compliance.items", { returnObjects: true }) as ComplianceItem[];
	const faqItems = t("dosseraLanding.faq.items", { returnObjects: true }) as FaqItem[];
	const painStats = t("dosseraLanding.pain.stats", { returnObjects: true }) as PainStat[];
	const { scrollY } = useScroll();
	const heroY = useTransform(scrollY, [0, 800], [0, 120]);

	const roadmapItems = [
		t("dosseraLanding.roadmap.now", { returnObjects: true }) as RoadmapItem,
		t("dosseraLanding.roadmap.next", { returnObjects: true }) as RoadmapItem,
		t("dosseraLanding.roadmap.later", { returnObjects: true }) as RoadmapItem,
	];

	const capRef = useReveal<HTMLDivElement>();
	const archRef = useReveal<HTMLDivElement>();
	const sovereignRef = useReveal<HTMLElement>();
	const proofRef = useReveal<HTMLElement>();
	const roadmapRef = useReveal<HTMLDivElement>();

	return (
		<div className="dossera-page">
			<WebsiteHeader />

			{/* ─── HERO ─── */}
			<section className="relative min-h-[100vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-24 max-w-4xl mx-auto overflow-hidden">
				<AuroraHero />
				<div
					className="absolute inset-0 z-[1]"
					style={{
						background: "linear-gradient(180deg, rgba(12,10,9,0.55) 0%, rgba(12,10,9,0.35) 50%, rgba(12,10,9,0.75) 100%)",
						pointerEvents: "none",
					}}
				/>
				<motion.div className="relative z-[2] flex flex-col items-center" style={{ y: heroY }}>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--accent)] mb-6"
					>
						{t("dosseraLanding.hero.eyebrow")}
					</motion.p>

					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
						className="font-display italic text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] max-w-3xl mx-auto mb-4"
						style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
					>
						{t("dosseraLanding.hero.headline_line1")}
						<br />
						{t("dosseraLanding.hero.headline_line2")}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
						className="font-display text-[clamp(1.2rem,2.5vw,1.75rem)] font-normal text-[var(--accent)] mt-2 mb-8"
					>
						{t("dosseraLanding.hero.continuation")}
					</motion.p>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
						className="text-[var(--text-secondary)] max-w-xl mx-auto mb-12 text-base leading-relaxed whitespace-pre-line"
					>
						{t("dosseraLanding.hero.description")}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<a href="#dossera-book" className="cta-primary">
							{t("dosseraLanding.hero.cta_primary")}
							<ArrowRight size={16} />
						</a>
						<a href="#dossera-architecture" className="cta-secondary">
							{t("dosseraLanding.hero.cta_secondary")}
						</a>
					</motion.div>
				</motion.div>
			</section>

			{/* ─── PAIN POINTS ─── */}
			<section id="dossera-solve" className="dossera-section scroll-mt-[5.5rem] relative overflow-hidden">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						className="mb-14"
					>
						<p className="section-label">{t("dosseraLanding.pain.title")}</p>
						<h2 className="section-title max-w-3xl mb-3">{t("dosseraLanding.pain.title")}</h2>
						<p className="section-sub text-base">{t("dosseraLanding.pain.subtitle")}</p>
					</motion.div>

					{/* Cost stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
						className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
					>
						{painStats.map((stat, i) => {
							const StatIcon = STAT_ICONS[i] || Clock;
							return (
								<Tilt
									key={stat.label}
									tiltMaxAngleX={4}
									tiltMaxAngleY={4}
									scale={1.02}
									glareEnable
									glareMaxOpacity={0.08}
									glareColor="#a0894b"
									style={{ transformStyle: "preserve-3d" }}
								>
									<div
										className="card flex items-start gap-4"
										style={{ transform: "translateZ(20px)" }}
									>
										<div className="w-12 h-12 rounded-full bg-[var(--accent-dim)] flex items-center justify-center shrink-0">
											<StatIcon size={20} className="text-[var(--accent)]" />
										</div>
										<div>
											<p className="font-display text-[clamp(1.8rem,3vw,2.5rem)] text-[var(--accent)] leading-none mb-1">
												{stat.value}
											</p>
											<p className="font-medium text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">{stat.label}</p>
											<p className="text-xs text-[var(--text-secondary)] leading-relaxed">{stat.desc}</p>
										</div>
									</div>
								</Tilt>
							);
						})}
					</motion.div>

					{/* Pain cards grid */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.08 } },
						}}
						className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
					>
						{painItems.map((item) => (
							<motion.div
								key={item.before}
								variants={{
									hidden: { opacity: 0, y: 24 },
									visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
								}}
							>
								<Tilt
									tiltMaxAngleX={6}
									tiltMaxAngleY={6}
									scale={1.03}
									glareEnable
									glareMaxOpacity={0.1}
									glareColor="#a0894b"
									style={{ transformStyle: "preserve-3d", height: "100%" }}
								>
									<div
										className="card card-accent flex flex-col h-full"
										style={{ transform: "translateZ(24px)" }}
									>
										<p className="text-xs font-medium text-[var(--text-muted)] mb-1.5 tracking-wider uppercase">
											<span aria-hidden className="mr-1">✕</span>
											{t("dosseraLanding.nav.before")}
										</p>
										<p className="body-text text-sm mb-4 leading-relaxed">
											{item.before}
										</p>
										<div className="w-8 h-px bg-[var(--accent)] mb-4" />
										<p className="text-xs font-medium text-[var(--accent)] mb-1 tracking-wider uppercase">
											<span aria-hidden className="mr-1">→</span>
											{t("dosseraLanding.nav.after")}
										</p>
										<p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
											{item.after}
										</p>
									</div>
								</Tilt>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ─── REAL ARCHITECTURE ─── */}
			<section id="dossera-architecture" className="dossera-section dossera-section--alt scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<motion.div
						ref={archRef}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<p className="section-label">{t("dosseraLanding.architecture.title")}</p>
						<h2 className="section-title mb-3">{t("dosseraLanding.architecture.title")}</h2>
						<p className="section-sub mb-10">{t("dosseraLanding.architecture.subtitle")}</p>
					</motion.div>

					{/* 3D Pipeline Visualization */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
						className="mb-12"
					>
						<ArchitecturePipeline />
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-8 mb-12">
						{/* Ingestion & Retrieval */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
						>
							<h3 className="card-title flex items-center gap-2 mb-4">
								<Server size={18} className="text-[var(--accent)]" />
								{t("dosseraLanding.architecture.ingestion_title")}
							</h3>
							<p className="body-text text-sm mb-5">{t("dosseraLanding.architecture.ingestion_desc")}</p>

							<motion.div
								className="arch-flow"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
							>
								<motion.div
									variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
									whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
									className="arch-step"
								>
									<div className="arch-step-icon"><Upload className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">Bulk Upload</p>
										<p className="arch-desc">Documents enter via unified pipeline</p>
									</div>
								</motion.div>
								<motion.div
									variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
									whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
									className="arch-step"
								>
									<div className="arch-step-icon"><FileText className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">OCR Processing</p>
										<p className="arch-desc">Tesseract.js via BullMQ workers</p>
									</div>
								</motion.div>
								<div className="arch-branch">
									<motion.div
										variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
										whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
										className="arch-step"
									>
										<div className="arch-step-icon"><Zap className="w-4 h-4" /></div>
										<div>
											<p className="arch-label">{t("dosseraLanding.architecture.semantic_title")}</p>
											<p className="arch-desc">{t("dosseraLanding.architecture.semantic_desc")}</p>
										</div>
									</motion.div>
									<motion.div
										variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
										whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
										className="arch-step"
									>
										<div className="arch-step-icon"><Search className="w-4 h-4" /></div>
										<div>
											<p className="arch-label">{t("dosseraLanding.architecture.keyword_title")}</p>
											<p className="arch-desc">{t("dosseraLanding.architecture.keyword_desc")}</p>
										</div>
									</motion.div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className="mt-6 card"
							>
								<div className="flex items-start gap-3">
									<Layers size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
									<div>
										<p className="arch-label mb-1">{t("dosseraLanding.architecture.physical_title")}</p>
										<p className="arch-desc">{t("dosseraLanding.architecture.physical_desc")}</p>
									</div>
								</div>
							</motion.div>
						</motion.div>

						{/* Resilience & Caching */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
						>
							<h3 className="card-title flex items-center gap-2 mb-4">
								<Shield size={18} className="text-[var(--accent)]" />
								{t("dosseraLanding.architecture.resilience_title")}
							</h3>
							<p className="body-text text-sm mb-5">{t("dosseraLanding.architecture.resilience_desc")}</p>

							<motion.div
								className="arch-flow mb-6"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
							>
								<motion.div
									variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
									whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
									className="arch-step"
								>
									<div className="arch-step-icon"><Database className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">L1: In-Memory LRU</p>
										<p className="arch-desc">5000 entries, stale-while-revalidate</p>
									</div>
								</motion.div>
								<motion.div
									variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
									whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
									className="arch-step"
								>
									<div className="arch-step-icon"><Database className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">L2: Redis Cluster</p>
										<p className="arch-desc">Dedicated cache connection</p>
									</div>
								</motion.div>
								<motion.div
									variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
									whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
									className="arch-step"
								>
									<div className="arch-step-icon"><Database className="w-4 h-4" /></div>
									<div>
										<p className="arch-label">L3: Database</p>
										<p className="arch-desc">PostgreSQL, Meilisearch, MinIO</p>
									</div>
								</motion.div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{ duration: 0.5, delay: 0.35 }}
								className="card"
							>
								<div className="flex items-start gap-3">
									<GitBranch size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
									<div>
										<p className="arch-label mb-1">{t("dosseraLanding.architecture.circuit_title")}</p>
										<p className="arch-desc">{t("dosseraLanding.architecture.circuit_desc")}</p>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</div>

					{/* Physical Archive 3D Visualization */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						className="mb-12"
					>
						<h3 className="card-title flex items-center gap-2 mb-4">
							<Layers size={18} className="text-[var(--accent)]" />
							{t("dosseraLanding.architecture.physical_title")}
						</h3>
						<PhysicalArchive />
					</motion.div>

					{/* Telemetry */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
						className="max-w-md"
					>
						<TelemetryPanel />
					</motion.div>
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

			{/* ─── USE CASES ─── */}
			<section id="dossera-use-cases" className="dossera-section scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<p className="section-label">{t("dosseraLanding.useCases.title")}</p>
						<h2 className="section-title mb-3">{t("dosseraLanding.useCases.title")}</h2>
						<p className="section-sub mb-10">{t("dosseraLanding.useCases.subtitle")}</p>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
						className="grid md:grid-cols-3 gap-5"
					>
						{(["small", "large", "ministry"] as const).map((type) => {
							const icons = { small: Building2, large: Scale, ministry: Landmark };
							const Icon = icons[type];
							return (
								<motion.div
									key={type}
									variants={{
										hidden: { opacity: 0, y: 24 },
										visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
									}}
								>
									<Tilt
										tiltMaxAngleX={5}
										tiltMaxAngleY={5}
										scale={1.02}
										glareEnable
										glareMaxOpacity={0.08}
										glareColor="#a0894b"
										style={{ transformStyle: "preserve-3d", height: "100%" }}
									>
										<div
											className="card h-full flex flex-col"
											style={{ transform: "translateZ(20px)", borderTop: "2px solid var(--accent)" }}
										>
											<div className="w-11 h-11 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center mb-4">
												<Icon size={22} className="text-[var(--accent)]" />
											</div>
											<h3 className="card-title mb-1">{t(`dosseraLanding.useCases.${type}_title`)}</h3>
											<p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-3">
												{t(`dosseraLanding.useCases.${type}_sub`)}
											</p>
											<p className="body-text text-sm leading-relaxed flex-1">
												{t(`dosseraLanding.useCases.${type}_desc`)}
											</p>
										</div>
									</Tilt>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</section>

			{/* ─── COMPLIANCE ─── */}
			<section className="dossera-section dossera-section--alt scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<p className="section-label">{t("dosseraLanding.compliance.title")}</p>
						<h2 className="section-title mb-3">{t("dosseraLanding.compliance.title")}</h2>
						<p className="section-sub mb-10">{t("dosseraLanding.compliance.subtitle")}</p>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
						className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
					>
						{complianceItems.map((item) => {
							const statusColor =
								item.status === "Compliant" || item.status === "متوافق"
									? "text-green-500 border-green-500/30"
									: item.status === "In Progress" || item.status === "قيد التطوير"
										? "text-[var(--accent)] border-[var(--accent-dim)]"
										: "text-[var(--text-muted)] border-[var(--border)]";
							return (
								<motion.div
									key={item.name}
									variants={{
										hidden: { opacity: 0, scale: 0.95 },
										visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
									}}
								>
									<div className="card flex items-start gap-4">
										<div className="w-10 h-10 rounded-full bg-[var(--accent-dim)] flex items-center justify-center shrink-0">
											<ShieldCheck size={18} className="text-[var(--accent)]" />
										</div>
										<div className="min-w-0">
											<div className="flex items-center gap-3 mb-1 flex-wrap">
												<h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</h3>
												<span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColor}`}>
													{item.status}
												</span>
											</div>
											<p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
										</div>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</section>

			{/* ─── TECH SPECS ─── */}
			<section className="dossera-section scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<p className="section-label">{t("dosseraLanding.techSpecs.title")}</p>
						<h2 className="section-title mb-3">{t("dosseraLanding.techSpecs.title")}</h2>
						<p className="section-sub mb-10">{t("dosseraLanding.techSpecs.subtitle")}</p>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
						className="max-w-3xl mx-auto space-y-2"
					>
						{(["hardware", "software", "network", "security", "backup"] as const).map((key) => (
							<motion.details
								key={key}
								variants={{
									hidden: { opacity: 0, y: 12 },
									visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
								}}
								className="group"
							>
								<summary className="card cursor-pointer list-none flex items-center justify-between gap-4 py-3 px-5 hover:bg-[var(--bg-tertiary)]">
									<span className="text-sm font-medium text-[var(--text-primary)]">
										{t(`dosseraLanding.techSpecs.${key}`)}
									</span>
									<ChevronDown size={14} className="text-[var(--text-muted)] shrink-0 transition-transform duration-300 group-open:rotate-180" />
								</summary>
								<div className="px-5 pb-4 pt-3 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] bg-[var(--bg-secondary)] rounded-b-xl">
									{t(`dosseraLanding.techSpecs.${key}_desc`)}
								</div>
							</motion.details>
						))}
					</motion.div>
				</div>
			</section>

			{/* ─── FAQ ─── */}
			<section className="dossera-section dossera-section--alt scroll-mt-[5.5rem]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<p className="section-label">{t("dosseraLanding.faq.title")}</p>
						<h2 className="section-title mb-3">{t("dosseraLanding.faq.title")}</h2>
						<p className="section-sub mb-10">{t("dosseraLanding.faq.subtitle")}</p>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
						className="max-w-3xl mx-auto space-y-2"
					>
						{faqItems.map((item) => (
							<motion.details
								key={item.q}
								variants={{
									hidden: { opacity: 0, y: 12 },
									visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
								}}
								className="group"
							>
								<summary className="card card-accent cursor-pointer list-none flex items-center justify-between gap-4 py-3.5 px-5">
									<span className="text-sm font-medium text-[var(--text-primary)] pr-4">{item.q}</span>
									<ChevronDown size={14} className="text-[var(--accent)] shrink-0 transition-transform duration-300 group-open:rotate-180" />
								</summary>
								<div className="px-5 pb-4 pt-3 text-sm text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--accent-dim)] bg-[var(--bg-secondary)] rounded-b-xl">
									{item.a}
								</div>
							</motion.details>
						))}
					</motion.div>
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

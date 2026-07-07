import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function AnimatedCounter({
	end,
	suffix = "",
	duration = 2000,
}: {
	end: number;
	suffix?: string;
	duration?: number;
}) {
	const [value, setValue] = useState(0);
	const startTime = useRef<number>(0);
	const raf = useRef<number>(0);

	useEffect(() => {
		startTime.current = performance.now();
		const animate = (now: number) => {
			const elapsed = now - startTime.current;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.round(eased * end));
			if (progress < 1) raf.current = requestAnimationFrame(animate);
		};
		raf.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf.current);
	}, [end, duration]);

	return (
		<span>
			{value}
			{suffix}
		</span>
	);
}

export default function TelemetryPanel() {
	const { t } = useTranslation();

	const rows = [
		{ label: t("dosseraLanding.architecture.telemetry_ingestion_rate"), value: 1200, suffix: "/hr", active: true },
		{ label: t("dosseraLanding.architecture.telemetry_search_p50"), value: 180, suffix: "ms", active: false },
		{ label: t("dosseraLanding.architecture.telemetry_ocr_accuracy"), value: 96.7, suffix: "%", active: false },
	];

	return (
		<div className="card font-mono text-xs overflow-hidden">
			<div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
				<span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
				<span className="text-[var(--accent)] tracking-wider uppercase text-[10px]">
					{t("dosseraLanding.architecture.telemetry_label")}
				</span>
			</div>
			<div className="space-y-3">
				{rows.map((row) => (
					<div key={row.label} className="flex items-center justify-between">
						<span className="text-[var(--text-muted)]">{row.label}</span>
						<span className="text-[var(--accent)] font-medium tabular-nums">
							{row.active ? (
								<AnimatedCounter end={row.value} suffix={row.suffix} />
							) : (
								<span>{row.value}{row.suffix}</span>
							)}
						</span>
					</div>
				))}
			</div>
			<div className="mt-4 pt-3 border-t border-[var(--border)]">
				<div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
					<span>{t("dosseraLanding.architecture.deployment_label")}</span>
					<span className="text-[var(--text-secondary)]">{t("dosseraLanding.architecture.deployment_hardware")}</span>
				</div>
				<div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-1">
					<span>{t("dosseraLanding.architecture.deployment_os")}</span>
				</div>
			</div>
		</div>
	);
}

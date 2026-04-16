import { useEffect, useState } from "react";

/**
 * Tracks which section id is most visible in the viewport for nav highlighting.
 */
export function useActiveSection(sectionIds: string[]) {
	const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

	useEffect(() => {
		const elements = sectionIds
			.map((id) => ({ id, el: document.getElementById(id) }))
			.filter((x): x is { id: string; el: HTMLElement } => Boolean(x.el));

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]?.target instanceof HTMLElement) {
					const id = visible[0].target.id;
					if (id) setActiveId(id);
				}
			},
			{ threshold: [0.15, 0.35, 0.55], rootMargin: "-64px 0px -45% 0px" }
		);

		elements.forEach(({ el }) => observer.observe(el));
		return () => observer.disconnect();
	}, [sectionIds]);

	return activeId;
}

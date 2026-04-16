import { useState, useEffect } from "react";

type Theme = "dark" | "light";

function applyDarkTheme(root: HTMLElement) {
	root.style.setProperty("--bg-primary", "#0a0a0a");
	root.style.setProperty("--bg-secondary", "#111111");
	root.style.setProperty("--bg-tertiary", "#1a1a1a");
	root.style.setProperty("--accent-red", "#e63946");
	root.style.setProperty("--text-primary", "#f5f5f5");
	root.style.setProperty("--text-secondary", "#a0a0a0");
	root.style.setProperty("--text-muted", "#606060");
	root.style.setProperty("--border", "#222222");
	root.style.setProperty("--border-bright", "#333333");
	root.style.setProperty("--gold", "#c9a84c");
	root.style.setProperty("--surface", "#0a0a0a");
	root.style.setProperty("--bg", "#0a0a0a");
	root.style.setProperty("--text", "#f5f5f5");
	root.style.setProperty("--accent", "#e63946");
	root.style.setProperty("--accent-hover", "#ff4d5d");
	root.style.setProperty("--muted", "#111111");
	root.style.setProperty("--card-border", "#222222");
	root.style.setProperty("--card-bg", "rgba(17, 17, 17, 0.94)");
}

function applyLightTheme(root: HTMLElement) {
	root.style.setProperty("--bg-primary", "#f7f5f2");
	root.style.setProperty("--bg-secondary", "#efece8");
	root.style.setProperty("--bg-tertiary", "#e5e1dc");
	root.style.setProperty("--accent-red", "#e63946");
	root.style.setProperty("--text-primary", "#0f0e0d");
	root.style.setProperty("--text-secondary", "#5c5650");
	root.style.setProperty("--text-muted", "#9c9690");
	root.style.setProperty("--border", "#d8d3ce");
	root.style.setProperty("--border-bright", "#b8b0a8");
	root.style.setProperty("--gold", "#9a7b2c");
	root.style.setProperty("--surface", "#f7f5f2");
	root.style.setProperty("--bg", "#f7f5f2");
	root.style.setProperty("--text", "#0f0e0d");
	root.style.setProperty("--accent", "#e63946");
	root.style.setProperty("--accent-hover", "#c42f3a");
	root.style.setProperty("--muted", "#efece8");
	root.style.setProperty("--card-border", "#d8d3ce");
	root.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.88)");
}

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "dark" || stored === "light") return stored;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			applyDarkTheme(root);
			root.setAttribute("data-theme", "dark");
		} else {
			applyLightTheme(root);
			root.setAttribute("data-theme", "light");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

	return {
		theme,
		setTheme,
		toggleTheme,
		isDark: theme === "dark",
	};
};

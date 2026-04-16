/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#e63946",
					light: "#ff4d5d",
					dark: "#c42f3a",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				display: ["Syne", "sans-serif"],
				mono: ["JetBrains Mono", "ui-monospace", "monospace"],
			},
		},
	},
	plugins: [],
};

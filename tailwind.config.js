/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#a0894b",
					light: "#b89e5c",
					dark: "#8a7540",
				},
			},
			fontFamily: {
				sans: ["DM Sans", "system-ui", "sans-serif"],
				display: ["DM Serif Display", "Georgia", "serif"],
				mono: ["JetBrains Mono", "ui-monospace", "monospace"],
				arabic: ["Cairo", "sans-serif"],
			},
		},
	},
	plugins: [],
};

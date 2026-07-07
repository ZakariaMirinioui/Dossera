/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#064E3B",
                    container: "#065F46",
                    light: "#047857",
                    dark: "#022C22",
                },
                secondary: {
                    DEFAULT: "#10B981",
                    container: "#ECFDF5",
                },
                surface: {
                    DEFAULT: "#F9FAFB",
                    "container-low": "#F0FDF4",
                },
                "on-surface": {
                    DEFAULT: "#064E3B",
                    variant: "#374151",
                },
                outline: {
                    DEFAULT: "#9CA3AF",
                    variant: "#D1D5DB",
                },
                background: {
                    DEFAULT: "#F9FAFB",
                },
                error: {
                    DEFAULT: "#991B1B",
                },
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
            spacing: {
                "sidebar-width": "280px",
                "container-margin": "32px",
                "base": "8px",
                "section-gap": "48px",
                "gutter": "24px",
            },
            fontFamily: {
                "label-md": ["Montserrat", "sans-serif"],
                "headline-xl": ["Cairo", "sans-serif"],
                "body-sm": ["Inter", "sans-serif"],
                "body-lg": ["Inter", "sans-serif"],
                "headline-lg-mobile": ["Cairo", "sans-serif"],
                "headline-md": ["Cairo", "sans-serif"],
                "body-md": ["Inter", "sans-serif"],
                "headline-lg": ["Cairo", "sans-serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Cairo", "sans-serif"],
                arabic: ["Cairo", "sans-serif"],
            },
            fontSize: {
                "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
                "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
                "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
                "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
            },
            keyframes: {
                breathe: {
                    "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(6, 78, 59, 0)" },
                    "50%": { transform: "scale(1.02)", boxShadow: "0 0 15px 2px rgba(6, 78, 59, 0.1)" },
                },
            },
            animation: {
                breathe: "breathe 4s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

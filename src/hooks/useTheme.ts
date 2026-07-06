export const useTheme = () => {
	return {
		theme: "dark" as const,
		isDark: true,
		toggleTheme: () => {},
		setTheme: () => {},
	};
};

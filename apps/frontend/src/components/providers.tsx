'use client';

import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;

type ThemeContextValue = {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	themes: Theme[];
	setTheme: (theme: Theme) => void;
};

const THEME_STORAGE_KEY = 'kgcentral-theme';
const themes: Theme[] = ['light', 'dark', 'system'];

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveSystemTheme(): ResolvedTheme {
	if (typeof window === 'undefined') {
		return 'light';
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeClass(resolvedTheme: ResolvedTheme) {
	const root = document.documentElement;
	root.classList.remove('light', 'dark');
	root.classList.add(resolvedTheme);
	root.style.colorScheme = resolvedTheme;
}

function ThemeProvider({ children }: PropsWithChildren) {
	const [theme, setThemeState] = useState<Theme>('system');
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

	const setTheme = useCallback((nextTheme: Theme) => {
		setThemeState(nextTheme);
	}, []);

	useEffect(() => {
		const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
		if (storedTheme && themes.includes(storedTheme)) {
			setThemeState(storedTheme);
		}
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const nextResolvedTheme = theme === 'system' ? resolveSystemTheme() : theme;

		setResolvedTheme(nextResolvedTheme);
		applyThemeClass(nextResolvedTheme);

		if (theme === 'system') {
			window.localStorage.removeItem(THEME_STORAGE_KEY);
		} else {
			window.localStorage.setItem(THEME_STORAGE_KEY, theme);
		}

		const onThemeChange = () => {
			if (theme !== 'system') {
				return;
			}

			const systemTheme = resolveSystemTheme();
			setResolvedTheme(systemTheme);
			applyThemeClass(systemTheme);
		};

		mediaQuery.addEventListener('change', onThemeChange);

		return () => {
			mediaQuery.removeEventListener('change', onThemeChange);
		};
	}, [theme]);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			resolvedTheme,
			themes,
			setTheme,
		}),
		[theme, resolvedTheme, setTheme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used inside ClientProviders');
	}

	return context;
}

export default function ClientProviders({ children }: PropsWithChildren) {
	return <ThemeProvider>{children}</ThemeProvider>;
}

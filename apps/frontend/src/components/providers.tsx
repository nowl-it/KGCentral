'use client';

import EN from '@kgcentral/i18n/locales/en';
import VI from '@kgcentral/i18n/locales/vi';
import {
	type Locale,
	type NamespaceKeys,
	type TranslationKey,
	type TranslationNamespace,
} from '@kgcentral/i18n/types';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

interface I18nContextType {
	t: (key: TranslationKey, fallback?: string) => string;
	locale: Locale;
	setLocale: (locale: Locale) => void;
}

const translations = {
	vi: VI,
	en: EN,
};

const I18nContext = createContext<I18nContextType>({
	t: (key) => key,
	locale: 'vi',
	setLocale: () => {},
});

// Overload signatures for type safety
export function useI18n(): I18nContextType;
export function useI18n<N extends TranslationNamespace>(
	namespace: N,
): Omit<I18nContextType, 't'> & {
	t: (key: NamespaceKeys<N>, fallback?: string) => string;
};

export function useI18n<N extends TranslationNamespace>(namespace?: N) {
	const context = useContext(I18nContext);

	if (!namespace) {
		return context;
	}

	// Return scoped translation function
	const scopedT = (key: string, fallback?: string): string => {
		const fullKey = `${namespace}.${key}` as TranslationKey;
		const result = context.t(fullKey);
		// If translation not found and fallback provided, use fallback
		return result === fullKey && fallback ? fallback : result;
	};

	return {
		...context,
		t: scopedT,
	};
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
	const keys = path.split('.');
	let current: unknown = obj;
	for (const key of keys) {
		if (current && typeof current === 'object' && key in current) {
			current = (current as Record<string, unknown>)[key];
		} else {
			return path;
		}
	}
	return typeof current === 'string' ? current : path;
}

function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function Providers({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>('vi');

	useEffect(() => {
		const saved = localStorage.getItem('locale') as Locale | null;
		if (saved && (saved === 'vi' || saved === 'en')) {
			setLocaleState(saved);
		}
	}, []);

	const setLocale = (newLocale: Locale) => {
		setLocaleState(newLocale);
		localStorage.setItem('locale', newLocale);
	};

	const t = (key: TranslationKey, fallback?: string): string => {
		const translationsForLocale = translations[locale];
		const result = getNestedValue(translationsForLocale, key);
		// If not found and fallback provided, use fallback
		return result === key && fallback ? fallback : result;
	};

	return (
		<I18nContext.Provider value={{ t, locale, setLocale }}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{children}
			</ThemeProvider>
		</I18nContext.Provider>
	);
}

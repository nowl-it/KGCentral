'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

type Locale = 'vi' | 'en';

const translations: Record<Locale, Record<string, Record<string, string>>> = {
	vi: {
		common: {
			appName: 'KGCentral',
			loading: 'Đang tải...',
			error: 'Đã xảy ra lỗi',
			create: 'Tạo',
		},
		nav: {
			dashboard: 'Bảng điều khiển',
		},
		auth: {
			login: 'Đăng nhập',
			email: 'Email',
			password: 'Mật khẩu',
		},
	},
	en: {
		common: {
			appName: 'KGCentral',
			loading: 'Loading...',
			error: 'An error occurred',
			create: 'Create',
		},
		nav: {
			dashboard: 'Dashboard',
		},
		auth: {
			login: 'Login',
			email: 'Email',
			password: 'Password',
		},
	},
};

interface I18nContextType {
	t: (key: string) => string;
	locale: Locale;
	setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
	t: (key) => key,
	locale: 'vi',
	setLocale: () => {},
});

export function useI18n() {
	return useContext(I18nContext);
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

	const t = (key: string): string => {
		return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
	};

	return (
		<I18nContext.Provider value={{ t, locale, setLocale }}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{children}
			</ThemeProvider>
		</I18nContext.Provider>
	);
}

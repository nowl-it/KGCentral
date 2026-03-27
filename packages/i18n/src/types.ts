import type VI from './locales/vi';

export type Locale = 'vi' | 'en';

// Extract all top-level namespace keys from translation object
export type TranslationNamespace = keyof typeof VI;

// Extract nested keys from a namespace
export type NestedKeys<T> = T extends object
	? {
			[K in keyof T]: K extends string
				? T[K] extends object
					? `${K}` | `${K}.${NestedKeys<T[K]>}`
					: `${K}`
				: never;
		}[keyof T]
	: never;

// Get all possible translation keys (dot notation)
export type TranslationKey = NestedKeys<typeof VI>;

// Get keys within a specific namespace
export type NamespaceKeys<N extends TranslationNamespace> = NestedKeys<(typeof VI)[N]>;

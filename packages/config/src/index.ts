export const appConfig = {
	name: 'KGCentral',
	version: '1.0.0',
	apiPrefix: '/api',
	defaultLocale: 'vi',
	supportedLocales: ['vi', 'en'] as const,
	corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
} as const;

export type Locale = (typeof appConfig)['supportedLocales'][number];

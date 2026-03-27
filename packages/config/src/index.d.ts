export declare const appConfig: {
	readonly name: 'KGCentral';
	readonly version: '1.0.0';
	readonly apiPrefix: '/api';
	readonly defaultLocale: 'vi';
	readonly supportedLocales: readonly ['vi', 'en'];
	readonly corsOrigins: string[];
};
export type Locale = (typeof appConfig)['supportedLocales'][number];

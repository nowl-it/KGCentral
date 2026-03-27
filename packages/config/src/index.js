Object.defineProperty(exports, '__esModule', { value: true });
exports.appConfig = void 0;
exports.appConfig = {
	name: 'KGCentral',
	version: '1.0.0',
	apiPrefix: '/api',
	defaultLocale: 'vi',
	supportedLocales: ['vi', 'en'],
	corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
};
//# sourceMappingURL=index.js.map

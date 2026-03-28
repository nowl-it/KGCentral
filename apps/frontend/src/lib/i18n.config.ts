import { type I18nConfig } from 'next-i18next/proxy';

const i18nConfig: I18nConfig = {
	supportedLngs: ['vi', 'en'],
	fallbackLng: 'vi',
	defaultNS: 'common',
	localeInPath: false,
	ns: ['common', 'breadcrumbs', 'metadata'],
	resourceLoader: (language, namespace) =>
		import(`@kgcentral/i18n/locales/${language}/${namespace}.json`),
};

export default i18nConfig;

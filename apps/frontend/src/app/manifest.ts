import { type MetadataRoute } from 'next';
import { getT, initServerI18next } from 'next-i18next/server';
import i18nConfig from '@/lib/i18n.config';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	initServerI18next(i18nConfig);
	const { t } = await getT();

	return {
		name: t('metadata:manifest.name'),
		short_name: t('metadata:manifest.shortName'),
		description: t('metadata:manifest.description'),
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#8b5cf6',
		orientation: 'portrait-primary',
		scope: '/',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '32x32',
				type: 'image/x-icon',
			},
			{
				src: '/images/logo.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/images/logo.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		screenshots: [
			{
				src: '/images/logo-full.png',
				sizes: '1920x1080',
				type: 'image/png',
				form_factor: 'wide',
			},
		],
		categories: ['games', 'entertainment', 'utilities'],
		shortcuts: [
			{
				name: t('metadata:manifest.shortcuts.wiki.name'),
				short_name: t('metadata:manifest.shortcuts.wiki.shortName'),
				description: t('metadata:manifest.shortcuts.wiki.description'),
				url: '/wiki',
				icons: [
					{
						src: '/images/icons/wiki.png',
						sizes: '96x96',
					},
				],
			},
			{
				name: t('metadata:manifest.shortcuts.teamBuilder.name'),
				short_name: t('metadata:manifest.shortcuts.teamBuilder.shortName'),
				description: t('metadata:manifest.shortcuts.teamBuilder.description'),
				url: '/team-builder',
				icons: [
					{
						src: '/images/icons/team-builder.png',
						sizes: '96x96',
					},
				],
			},
			{
				name: t('metadata:manifest.shortcuts.tierList.name'),
				short_name: t('metadata:manifest.shortcuts.tierList.shortName'),
				description: t('metadata:manifest.shortcuts.tierList.description'),
				url: '/tier-list',
				icons: [
					{
						src: '/images/icons/tierlist.png',
						sizes: '96x96',
					},
				],
			},
			{
				name: t('metadata:manifest.shortcuts.altar.name'),
				short_name: t('metadata:manifest.shortcuts.altar.shortName'),
				description: t('metadata:manifest.shortcuts.altar.description'),
				url: '/altar',
				icons: [
					{
						src: '/images/icons/altar.png',
						sizes: '96x96',
					},
				],
			},
			{
				name: t('metadata:manifest.shortcuts.relic.name'),
				short_name: t('metadata:manifest.shortcuts.relic.shortName'),
				description: t('metadata:manifest.shortcuts.relic.description'),
				url: '/relic',
				icons: [
					{
						src: '/images/icons/relic.png',
						sizes: '96x96',
					},
				],
			},
		],
	};
}

import { type Metadata } from 'next';
import { getT } from 'next-i18next/server';

export async function generateMetadata(): Promise<Metadata> {
	const { t, lng } = await getT();
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const isVietnamese = lng === 'vi';

	// Get translations from metadata namespace
	const title = t('metadata:title.default');
	const description = t('metadata:description');
	const keywords = t('metadata:keywords', { returnObjects: true }) as string[];
	const ogTitle = t('metadata:openGraph.title');
	const ogDescription = t('metadata:openGraph.description');
	const ogImageAlt = t('metadata:openGraph.imageAlt');
	const twitterTitle = t('metadata:twitter.title');
	const twitterDescription = t('metadata:twitter.description');

	return {
		title: {
			default: title,
			template: t('metadata:title.template'),
		},
		description,
		keywords,
		authors: [{ name: 'KGCentral Team', url: baseUrl }],
		creator: 'KGCentral',
		publisher: 'KGCentral',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/',
			languages: {
				vi: '/vi',
				en: '/en',
			},
		},
		manifest: '/manifest.json',
		icons: {
			icon: [
				{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
				{ url: '/images/logo.png', sizes: '512x512', type: 'image/png' },
			],
			apple: [{ url: '/images/logo.png', sizes: '512x512', type: 'image/png' }],
			shortcut: '/favicon.ico',
		},
		openGraph: {
			type: 'website',
			locale: isVietnamese ? 'vi_VN' : 'en_US',
			alternateLocale: isVietnamese ? 'en_US' : 'vi_VN',
			url: baseUrl,
			siteName: 'KGCentral',
			title: ogTitle,
			description: ogDescription,
			images: [
				{
					url: '/images/logo-full.png',
					width: 1920,
					height: 1080,
					alt: ogImageAlt,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: twitterTitle,
			description: twitterDescription,
			images: ['/images/logo-full.png'],
			creator: '@kgcentral',
			site: '@kgcentral',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		verification: {
			google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
		},
		category: 'gaming',
		appleWebApp: {
			capable: true,
			statusBarStyle: 'default',
			title,
		},
		other: {
			'mobile-web-app-capable': 'yes',
			'application-name': 'KGCentral',
		},
	};
}

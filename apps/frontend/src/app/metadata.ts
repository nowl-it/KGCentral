import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: 'KGCentral - King God Castle Community',
		template: '%s | KGCentral',
	},
	description:
		'KGCentral - Cộng đồng King God Castle. Wiki, Team Builder với đề xuất đội hình AI, Tier List voting.',
	keywords: ['King God Castle', 'KGC', 'Team Builder', 'Wiki', 'Tier List', 'Gaming'],
	authors: [{ name: 'KGCentral Team' }],
	creator: 'KGCentral',
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
			{ url: '/images/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
		],
		apple: '/images/brand/apple-touch-icon.png',
	},
	openGraph: {
		type: 'website',
		locale: 'vi_VN',
		alternateLocale: 'en_US',
		siteName: 'KGCentral',
		title: 'KGCentral - King God Castle Community',
		description:
			'Wiki, Team Builder với đề xuất đội hình AI, Tier List voting cho game King God Castle.',
		images: [
			{
				url: '/images/brand/og-banner.png',
				width: 1200,
				height: 630,
				alt: 'KGCentral - King God Castle Community Platform',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'KGCentral - King God Castle Community',
		description:
			'Wiki, Team Builder với đề xuất đội hình AI, Tier List voting cho game King God Castle.',
		images: ['/images/brand/og-banner.png'],
	},
};

import { Be_Vietnam_Pro } from 'next/font/google';
import ClientProviders from '@/components/providers';
import '@kgcentral/ui/globals.css';
import { cn } from '@kgcentral/ui/lib/utils';
import localFont from 'next/font/local';
import { I18nProvider } from 'next-i18next/client';
import { getResources, getT, initServerI18next } from 'next-i18next/server';
import { type ReactNode } from 'react';
import FooterComponent from '@/components/footer';
import HeaderComponent from '@/components/header';
import LinksHierarchyComponent from '@/components/links-hierarchy';
import NavigationComponent from '@/components/navigation';
import i18nConfig from '@/lib/i18n.config';
import { generateMetadata } from './metadata';

initServerI18next(i18nConfig);

const sans = Be_Vietnam_Pro({
	subsets: ['vietnamese'],
	variable: '--font-sans',
	weight: ['400', '500', '600', '700'],
});
const heading = localFont({
	src: 'fonts/FVF-Fernando-08.ttf',
	variable: '--font-heading',
	display: 'swap',
	weight: '400',
	declarations: [
		{ prop: 'ascent-override', value: '100%' }, // Giảm phần thừa phía trên (chỉnh % tùy ý)
		{ prop: 'descent-override', value: '0%' }, // Giảm phần thừa phía dưới
		{ prop: 'line-gap-override', value: '0%' }, // Triệt tiêu khoảng cách thừa
	],
});

export { generateMetadata };

export default async function RootLayout({ children }: { children: ReactNode }) {
	const { i18n, lng } = await getT();
	const resources = getResources(i18n);

	return (
		<I18nProvider language={lng} resources={resources}>
			<html
				lang={lng}
				suppressHydrationWarning
				className={cn(sans.variable, heading.variable)}
			>
				<body className="flex min-h-screen flex-col">
					<ClientProviders>
						<HeaderComponent />
						<NavigationComponent />
						<LinksHierarchyComponent />
						<main className="flex-1">{children}</main>
						<FooterComponent />
					</ClientProviders>
				</body>
			</html>
		</I18nProvider>
	);
}

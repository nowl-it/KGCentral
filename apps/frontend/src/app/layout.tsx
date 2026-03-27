import { Be_Vietnam_Pro } from 'next/font/google';
import { Providers } from '@/components/providers';
import '@kgcentral/ui/globals.css';
import { cn } from '@kgcentral/ui/lib/utils';
import localFont from 'next/font/local';
import HeaderComponent from '@/components/header';
import LinksHierarchyComponent from '@/components/links-hierarchy';
import NavigationComponent from '@/components/navigation';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi" suppressHydrationWarning className={cn(sans.variable, heading.variable)}>
			<body>
				<Providers>
					<HeaderComponent />
					<NavigationComponent />
					<LinksHierarchyComponent />
					{children}
				</Providers>
			</body>
		</html>
	);
}

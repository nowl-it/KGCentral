import { Outfit, Silkscreen } from 'next/font/google';
import { Providers } from '@/components/providers';
import '@kgcentral/ui/globals.css';
import { cn } from '@kgcentral/ui/lib/utils';
import HeaderComponent from '@/components/header';
import NavigationComponent from '@/components/navigation';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });
const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'], variable: '--font-heading' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="vi"
			suppressHydrationWarning
			className={cn('font-sans', outfit.variable, silkscreen.variable)}
		>
			<body>
				<Providers>
					<HeaderComponent />
					<NavigationComponent />
					{children}
				</Providers>
			</body>
		</html>
	);
}

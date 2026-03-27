import { type Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import '@kgcentral/ui/globals.css';
import { cn } from '@kgcentral/ui/lib/utils';
import HeaderComponent from '@/components/header';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
	title: 'KGCentral',
	description: 'KGCentral - AI & IoT Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="vi"
			suppressHydrationWarning
			className={cn('font-mono', jetbrainsMono.variable)}
		>
			<body>
				<Providers>
					<HeaderComponent />
					{children}
				</Providers>
			</body>
		</html>
	);
}

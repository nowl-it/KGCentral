import { Button } from '@kgcentral/ui/components/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderComponent() {
	return (
		<header className="flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md">
			<Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
				<Image
					priority
					quality={100}
					src="/images/logo-full.png"
					alt="KGCentral Logo"
					width={1251}
					height={247}
					className="h-10 w-auto select-none"
				/>
			</Link>
			<div className="flex items-center gap-4">
				<Button asChild variant="outline" size="lg" className="border-primary text-primary">
					<Link href="/auth/sign-in">Sign In</Link>
				</Button>
				<Button asChild variant="secondary" size="lg">
					<Link href="/auth/sign-up">Get Started</Link>
				</Button>
			</div>
		</header>
	);
}

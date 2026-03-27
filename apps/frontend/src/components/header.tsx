'use client';

import { Button } from '@kgcentral/ui/components/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderComponent() {
	return (
		<header className="flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/95 px-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
			{/* Logo with Royal theme */}
			<Link href="/" className="group flex items-center gap-3 transition-all hover:scale-105">
				<Image
					priority
					quality={100}
					src="/images/logo-full.png"
					alt="KGCentral Logo"
					width={1251}
					height={247}
					className="h-10 w-auto select-none transition-all group-hover:drop-shadow-[0_0_12px_oklch(0.72_0.18_85/0.3)]"
				/>
			</Link>

			{/* Action buttons with Royal theme */}
			<div className="flex items-center gap-3">
				<Button asChild variant="outline" size="lg">
					<Link href="/auth/sign-in">Sign In</Link>
				</Button>
				<Button asChild size="lg" className="gold-border text-primary" variant="outline">
					<Link href="/auth/sign-up" className="font-heading">
						Get Started
					</Link>
				</Button>
			</div>
		</header>
	);
}

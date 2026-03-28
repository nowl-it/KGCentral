'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useT } from 'next-i18next/client';

const footerLinks = {
	product: [
		{ key: 'guides' as const, href: '/guides' },
		{ key: 'tierList' as const, href: '/tier-list' },
		{ key: 'builds' as const, href: '/builds' },
		{ key: 'events' as const, href: '/events' },
	],
	resources: [
		{ key: 'news' as const, href: '/news' },
		{ key: 'wiki' as const, href: '/wiki' },
		{ key: 'api' as const, href: '/api/docs' },
	],
	community: [
		{ key: 'discord' as const, href: 'https://discord.gg/kgcentral', external: true },
		{ key: 'reddit' as const, href: 'https://reddit.com/r/kgcentral', external: true },
		{ key: 'youtube' as const, href: 'https://youtube.com/@kgcentral', external: true },
	],
	legal: [
		{ key: 'terms' as const, href: '/legal/terms' },
		{ key: 'privacy' as const, href: '/legal/privacy' },
		{ key: 'cookies' as const, href: '/legal/cookies' },
	],
};

export default function FooterComponent() {
	const { t } = useT('common');
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-border/50 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
					{/* Brand Section */}
					<div className="lg:col-span-4">
						<Link
							href="/"
							className="group inline-flex items-center transition-all hover:scale-105"
						>
							<Image
								src="/images/logo-full.png"
								alt="KGCentral Logo"
								width={1251}
								height={247}
								className="h-10 w-auto select-none transition-all group-hover:drop-shadow-[0_0_12px_oklch(0.72_0.18_85/0.3)]"
							/>
						</Link>
						<p className="mt-4 text-sm font-medium text-muted-foreground">
							{t('footer.tagline')}
						</p>
						<p className="mt-2 text-sm text-muted-foreground/80">
							{t('footer.description')}
						</p>
					</div>

					{/* Links Sections */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
						{/* Product */}
						<div>
							<h3 className="text-sm font-semibold text-foreground">
								{t('footer.sections.product')}
							</h3>
							<ul className="mt-4 space-y-3">
								{footerLinks.product.map((link) => (
									<li key={link.key}>
										<Link
											href={link.href}
											className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										>
											{t(`footer.links.${link.key}`)}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Resources */}
						<div>
							<h3 className="text-sm font-semibold text-foreground">
								{t('footer.sections.resources')}
							</h3>
							<ul className="mt-4 space-y-3">
								{footerLinks.resources.map((link) => (
									<li key={link.key}>
										<Link
											href={link.href}
											className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										>
											{t(`footer.links.${link.key}`)}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Community */}
						<div>
							<h3 className="text-sm font-semibold text-foreground">
								{t('footer.sections.community')}
							</h3>
							<ul className="mt-4 space-y-3">
								{footerLinks.community.map((link) => (
									<li key={link.key}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										>
											{t(`footer.links.${link.key}`)}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Legal */}
						<div>
							<h3 className="text-sm font-semibold text-foreground">
								{t('footer.sections.legal')}
							</h3>
							<ul className="mt-4 space-y-3">
								{footerLinks.legal.map((link) => (
									<li key={link.key}>
										<Link
											href={link.href}
											className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										>
											{t(`footer.links.${link.key}`)}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-12 border-t border-border/50 pt-8">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						{/* Disclaimer */}
						<p className="text-center text-xs text-muted-foreground/70 sm:text-left">
							{t('footer.disclaimer')}
						</p>

						{/* Copyright */}
						<p className="text-xs text-muted-foreground">
							{t('footer.copyright', { year: currentYear })}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

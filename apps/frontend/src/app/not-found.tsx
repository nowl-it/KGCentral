'use client';

import { Button } from '@kgcentral/ui/components/button';
import Link from 'next/link';
import { useI18n } from '@/components/providers';

export default function NotFound() {
	const { t } = useI18n('common');

	return (
		<div className="flex flex-col items-center justify-center px-4 min-h-full">
			<div className="text-center space-y-6 max-w-lg">
				{/* 404 Icon */}
				<div className="relative flex items-center justify-center space-x-4">
					<h1 className="text-9xl font-heading font-bold text-warning leading-none animate-castle-float">
						4
					</h1>
					<h1 className="text-9xl font-heading font-bold text-warning leading-none animate-castle-float delay-300">
						0
					</h1>
					<h1 className="text-9xl font-heading font-bold text-warning leading-none animate-castle-float delay-700">
						4
					</h1>
				</div>

				{/* Text Content */}
				<div className="space-y-2">
					<h2 className="text-2xl font-heading font-semibold tracking-tight">
						{t('notFound.title')}
					</h2>
					<p className="text-muted-foreground">{t('notFound.description')}</p>
				</div>

				{/* Action Button */}
				<Button asChild size="lg" className="mt-4">
					<Link href="/">{t('notFound.backHome')}</Link>
				</Button>
			</div>
		</div>
	);
}

'use client';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@kgcentral/ui/components/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function LinksHierarchyComponent() {
	const pathname = usePathname();
	const { t } = useTranslation('breadcrumbs');

	const segments = pathname.split('/').filter(Boolean);

	const breadcrumbs = segments.map((segment, index) => {
		// Use segment as key, fallback to formatted segment if translation not found
		const fallback = segment
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		return {
			href: `/${segments.slice(0, index + 1).join('/')}`,
			label: t(segment, { defaultValue: fallback }),
		};
	});

	if (breadcrumbs.length === 0) {
		return null;
	}

	return (
		<Breadcrumb className="sticky top-12 p-2 px-6.5 bg-background/20 backdrop-blur z-10 border-y">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/" suppressHydrationWarning>
							{t('home')}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map((item, i) => (
					<Fragment key={item.href}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{i === breadcrumbs.length - 1 ? (
								<BreadcrumbPage suppressHydrationWarning>
									{item.label}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={item.href} suppressHydrationWarning>
										{item.label}
									</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

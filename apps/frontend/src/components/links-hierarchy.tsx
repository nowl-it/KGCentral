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
import { useI18n } from './providers';

export default function LinksHierarchyComponent() {
	const pathname = usePathname();
	const { t } = useI18n('breadcrumbs');

	const segments = pathname.split('/').filter(Boolean);

	const breadcrumbs = segments.map((segment, index) => {
		// Use segment as key, fallback to formatted segment if translation not found
		const fallback = segment
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		return {
			href: `/${segments.slice(0, index + 1).join('/')}`,
			label: t(segment as any, fallback),
		};
	});

	return (
		<Breadcrumb className="sticky top-10 p-2 px-6.5 bg-background/20 backdrop-blur z-10">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">{t('home')}</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map((item, i) => (
					<Fragment key={item.href}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{i === breadcrumbs.length - 1 ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={item.href}>{item.label}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

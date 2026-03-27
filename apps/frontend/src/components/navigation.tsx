'use client';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuListItem,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@kgcentral/ui/components/navigation-menu';
import Link from 'next/link';
import ThemeToggleComponent from './theme-toggle';

export default function NavigationComponent() {
	return (
		<NavigationMenu className="px-4 w-full max-w-full flex top-0 place-content-start content-start justify-between sticky gold-border">
			<NavigationMenuList className="relative">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									{/* This is the nested menu */}

									<NavigationMenu className="flex flex-col top-0 place-content-start content-start">
										<NavigationMenuList className="relative">
											<NavigationMenuItem>
												<NavigationMenuTrigger>
													shadcn
												</NavigationMenuTrigger>
												<NavigationMenuContent>
													<div> hi</div>
												</NavigationMenuContent>
											</NavigationMenuItem>
										</NavigationMenuList>
									</NavigationMenu>
								</NavigationMenuLink>
							</li>
							<NavigationMenuListItem href="/docs" title="Introduction">
								Re-usable components built using Radix UI and Tailwind CSS.
							</NavigationMenuListItem>
							<NavigationMenuListItem href="/docs/installation" title="Installation">
								How to install dependencies and structure your app.
							</NavigationMenuListItem>
							<NavigationMenuListItem
								href="/docs/primitives/typography"
								title="Typography"
							>
								Styles for headings, paragraphs, lists...etc
							</NavigationMenuListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div> hi</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link href="/docs">Documentation</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
			<ThemeToggleComponent />
		</NavigationMenu>
	);
}

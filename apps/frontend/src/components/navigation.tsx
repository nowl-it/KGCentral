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
import {
	BookOpen,
	Bot,
	Castle,
	Lightbulb,
	Sparkles,
	Swords,
	Trophy,
	Users,
	Wand2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import LanguageSwitcher from './language-switcher';
import ThemeToggleComponent from './theme-toggle';

type NavigationChildItem = {
	href: string;
	title: string;
	description: string;
	icon: ReactNode;
	className?: string;
};

type NavigationDirectItem = {
	href: string;
	label: ReactNode;
	icon: ReactNode;
	badge?: string;
};

const WIKI_ITEMS: NavigationChildItem[] = [
	{
		href: '/wiki/heroes',
		title: 'Heroes',
		description: 'Tất cả tướng trong game - stats, skills, và tier rankings',
		icon: <Trophy className="size-5 text-primary" />,
		className: 'flex flex-col items-start',
	},
	{
		href: '/wiki/equipment',
		title: 'Equipment',
		description: 'Trang bị, vũ khí và armor - stats và tier list',
		icon: <Swords className="size-5 text-accent" />,
		className: 'flex flex-col items-start',
	},
	{
		href: '/wiki/altars',
		title: 'Altars',
		description: 'Thông tin về altars và buffs',
		icon: <Castle className="size-5 text-info" />,
		className: 'flex flex-col items-start',
	},
	{
		href: '/wiki/relics',
		title: 'Relics',
		description: 'Relics và passive effects',
		icon: <Sparkles className="size-5 text-warning" />,
		className: 'flex flex-col items-start',
	},
];

const TEAM_BUILDER_ITEMS: NavigationChildItem[] = [
	{
		href: '/team-builder',
		title: 'Build Team',
		description: 'Xây dựng đội hình với drag-and-drop interface',
		icon: <Users className="size-5 text-accent" />,
		className: 'flex flex-col items-start',
	},
	{
		href: '/team-builder/saved',
		title: 'Saved Teams',
		description: 'Xem và quản lý các đội hình đã lưu',
		icon: <BookOpen className="size-5 text-success" />,
		className: 'flex flex-col items-start',
	},
];

const DIRECT_ITEMS: NavigationDirectItem[] = [
	{
		href: '/ai-recommendations',
		icon: <Wand2 className="size-4 text-accent" />,
		label: <span className="text-purple-gradient">AI Suggest</span>,
		badge: 'NEW',
	},
	{
		href: '/chat',
		icon: <Bot className="size-4 text-success" />,
		label: <span>AI Chat</span>,
	},
	{
		href: '/tier-list',
		icon: <Trophy className="size-4 text-primary" />,
		label: <span>Tier List</span>,
	},
	{
		href: '/guides',
		icon: <Lightbulb className="size-4 text-warning" />,
		label: <span>Guides</span>,
	},
];

function isPathActive(pathname: string, href: string) {
	if (href === '/') {
		return pathname === '/';
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

function getLinkClassName(isActive: boolean) {
	return `${navigationMenuTriggerStyle()} gap-2 font-heading ${isActive ? 'bg-accent/10 text-accent' : ''}`;
}

export default function NavigationComponent() {
	const pathname = usePathname();
	const wikiActive = isPathActive(pathname, '/wiki');
	const teamBuilderActive = isPathActive(pathname, '/team-builder');

	return (
		<NavigationMenu className="sticky top-0 z-40 w-full max-w-full flex place-content-start content-start justify-between border-b border-border/30 bg-card/80 py-2 px-12 h-12 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-card/60">
			<NavigationMenuList className="relative">
				{/* Forum */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={getLinkClassName(isPathActive(pathname, '/'))}
					>
						<Link href="/">
							<Image
								src="/images/logo.png"
								alt="Forum Icon"
								className="size-6"
								width={1024}
								height={1024}
							/>
							Forum
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				{/* Wiki */}
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={`gap-2 font-heading ${wikiActive ? 'bg-accent/10 text-accent' : ''}`}
					>
						<BookOpen className="size-4 text-primary" />
						Wiki
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="w-96">
							{WIKI_ITEMS.map((item) => (
								<NavigationMenuListItem
									key={item.href}
									href={item.href}
									title={item.title}
									className={item.className}
									icon={item.icon}
								>
									{item.description}
								</NavigationMenuListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{/* Team Builder */}
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={`gap-2 font-heading ${teamBuilderActive ? 'bg-accent/10 text-accent' : ''}`}
					>
						<Users className="size-4 text-accent" />
						Team Builder
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4">
							{TEAM_BUILDER_ITEMS.map((item) => (
								<NavigationMenuListItem
									key={item.href}
									href={item.href}
									title={item.title}
									className={item.className}
									icon={item.icon}
								>
									{item.description}
								</NavigationMenuListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{DIRECT_ITEMS.map((item) => (
					<NavigationMenuItem key={item.href}>
						<NavigationMenuLink
							asChild
							className={getLinkClassName(isPathActive(pathname, item.href))}
						>
							<Link href={item.href}>
								{item.icon}
								{item.label}
								{item.badge ? (
									<span className="ml-1 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-medium text-accent">
										{item.badge}
									</span>
								) : null}
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>

			<div className="flex flex-row gap-4">
				{/* LanguageSwitcher */}
				<LanguageSwitcher />
				{/* Theme Toggle */}
				<ThemeToggleComponent />
			</div>
		</NavigationMenu>
	);
}

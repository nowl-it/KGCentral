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
import { BookOpen, Castle, Lightbulb, Sparkles, Swords, Trophy, Users, Wand2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './language-switcher';
import ThemeToggleComponent from './theme-toggle';

export default function NavigationComponent() {
	return (
		<NavigationMenu className="sticky top-0 z-40 w-full max-w-full flex place-content-start content-start justify-between border-b border-border/30 bg-card/80 p-2 h-14 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-card/60">
			<NavigationMenuList className="relative">
				{/* Forum */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={`${navigationMenuTriggerStyle()} gap-2 font-heading`}
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
					<NavigationMenuTrigger className="gap-2 font-heading">
						<BookOpen className="size-4 text-primary" />
						Wiki
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
							<NavigationMenuListItem
								href="/wiki/heroes"
								title="🏆 Heroes"
								icon={<Trophy className="size-5 text-primary" />}
							>
								Tất cả tướng trong game - stats, skills, và tier rankings
							</NavigationMenuListItem>
							<NavigationMenuListItem
								href="/wiki/equipment"
								title="⚔️ Equipment"
								icon={<Swords className="size-5 text-accent" />}
							>
								Trang bị, vũ khí và armor - stats và tier list
							</NavigationMenuListItem>
							<NavigationMenuListItem
								href="/wiki/altars"
								title="🏰 Altars"
								icon={<Castle className="size-5 text-info" />}
							>
								Thông tin về altars và buffs
							</NavigationMenuListItem>
							<NavigationMenuListItem
								href="/wiki/relics"
								title="✨ Relics"
								icon={<Sparkles className="size-5 text-warning" />}
							>
								Relics và passive effects
							</NavigationMenuListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{/* Team Builder */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="gap-2 font-heading">
						<Users className="size-4 text-accent" />
						Team Builder
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4">
							<NavigationMenuListItem
								href="/team-builder"
								title="🎯 Build Team"
								icon={<Users className="size-5 text-accent" />}
							>
								Xây dựng đội hình với drag-and-drop interface
							</NavigationMenuListItem>
							<NavigationMenuListItem
								href="/team-builder/saved"
								title="💾 Saved Teams"
								icon={<BookOpen className="size-5 text-success" />}
							>
								Xem và quản lý các đội hình đã lưu
							</NavigationMenuListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{/* AI Recommendations */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={`${navigationMenuTriggerStyle()} gap-2 font-heading`}
					>
						<Link href="/ai-recommendations">
							<Wand2 className="size-4 text-accent" />
							<span className="text-purple-gradient">AI Suggest</span>
							<span className="ml-1 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-medium text-accent">
								NEW
							</span>
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				{/* Tier List */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={`${navigationMenuTriggerStyle()} gap-2 font-heading`}
					>
						<Link href="/tier-list">
							<Trophy className="size-4 text-primary" />
							Tier List
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				{/* Guides */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={`${navigationMenuTriggerStyle()} gap-2 font-heading`}
					>
						<Link href="/guides">
							<Lightbulb className="size-4 text-warning" />
							Guides
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>

			<div>
				{/* Theme Toggle */}
				<ThemeToggleComponent />
				{/* LanguageSwitcher */}
				<LanguageSwitcher />
			</div>
		</NavigationMenu>
	);
}

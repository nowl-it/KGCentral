'use client';

import { Button } from '@kgcentral/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kgcentral/ui/components/card';
import { Input } from '@kgcentral/ui/components/input';
import {
	ArrowRight,
	CalendarDays,
	Clock3,
	Flame,
	Megaphone,
	MessageSquare,
	Pin,
	Plus,
	Search,
	Shield,
	Sparkles,
	Swords,
	TrendingUp,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ForumCategory = {
	name: string;
	threads: number;
	badge?: string;
	icon: React.ReactNode;
};

type ForumPost = {
	title: string;
	author: string;
	category: string;
	replies: number;
	views: number;
	updated: string;
	pinned?: boolean;
	hot?: boolean;
};

const categories: ForumCategory[] = [
	{
		name: 'Thông báo cộng đồng',
		threads: 42,
		badge: 'Official',
		icon: <Megaphone className="size-4 text-warning" />,
	},
	{
		name: 'Đội hình meta 167.0.01',
		threads: 138,
		badge: 'Hot',
		icon: <Swords className="size-4 text-destructive" />,
	},
	{
		name: 'Hỏi đáp tân thủ',
		threads: 216,
		icon: <Shield className="size-4 text-info" />,
	},
	{
		name: 'Showcase replay',
		threads: 74,
		icon: <Sparkles className="size-4 text-accent" />,
	},
];

const pinnedPosts: ForumPost[] = [
	{
		title: 'Patch 167.0.01: Tổng hợp thay đổi chi tiết + ảnh hưởng meta',
		author: 'Admin-KGC',
		category: 'Thông báo cộng đồng',
		replies: 58,
		views: 2490,
		updated: '14 phút trước',
		pinned: true,
		hot: true,
	},
	{
		title: 'Luật đăng bài và hướng dẫn format build để dễ review',
		author: 'Moderator-Luna',
		category: 'Thông báo cộng đồng',
		replies: 21,
		views: 1203,
		updated: '1 giờ trước',
		pinned: true,
	},
];

const latestPosts: ForumPost[] = [
	{
		title: 'Team 5 Mystique + 3 region có đủ lực leo Colosseum không?',
		author: 'KirinVN',
		category: 'Đội hình meta 167.0.01',
		replies: 17,
		views: 322,
		updated: '6 phút trước',
		hot: true,
	},
	{
		title: 'Xin tư vấn build relic cho Evan carry đầu game',
		author: 'Nox',
		category: 'Hỏi đáp tân thủ',
		replies: 9,
		views: 148,
		updated: '11 phút trước',
	},
	{
		title: 'Replay rank #42 tuần này - combo altar cực lạ nhưng hiệu quả',
		author: 'RyuSky',
		category: 'Showcase replay',
		replies: 26,
		views: 499,
		updated: '31 phút trước',
	},
	{
		title: 'Có nên ưu tiên artifact tăng tốc hay crit cho class Swiftness?',
		author: 'Bobo',
		category: 'Đội hình meta 167.0.01',
		replies: 14,
		views: 280,
		updated: '52 phút trước',
	},
];

const trendingTags = ['#meta167', '#newbie', '#relic-build', '#colosseum', '#artifact-setup'];

export default function ForumPage() {
	return (
		<main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.8_0.18_85/0.24),transparent_62%),linear-gradient(180deg,var(--background),oklch(from_var(--background)_calc(l-0.01)_c_h))] px-4 pb-14 pt-8 md:px-6 lg:px-8">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,oklch(0.64_0.18_240/0.12),transparent_40%),radial-gradient(circle_at_85%_10%,oklch(0.7_0.22_65/0.2),transparent_35%)]" />
			<section className="mx-auto flex w-full max-w-7xl flex-col gap-7 lg:gap-8">
				<div className="card-royal rounded-3xl border p-5 shadow-xl md:p-8">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-3xl space-y-3">
							<p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
								<Image
									src="/images/logo.png"
									alt="Forum Icon"
									className="size-6"
									width={1024}
									height={1024}
								/>
								Forum
							</p>
							<h1 className="font-heading text-3xl leading-tight tracking-tight text-gold-gradient md:text-5xl">
								Nơi chiến thuật được mài sắc qua từng cuộc thảo luận
							</h1>
							<p className="max-w-2xl text-sm text-muted-foreground md:text-base">
								Trao đổi đội hình, xin review build, cập nhật meta và kết nối với
								những người chơi King God Castle giàu kinh nghiệm.
							</p>
						</div>

						<div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
							<Button
								asChild
								size="lg"
								className="btn-gold-shimmer font-heading text-accent-foreground shadow-lg"
							>
								<Link href="/forum/new">
									<Plus className="size-4" />
									Tạo chủ đề mới
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="border-info/40 text-info"
							>
								<Link href="/chat">
									<Sparkles className="size-4" />
									Hỏi AI chiến thuật
								</Link>
							</Button>
						</div>
					</div>

					<div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
						<div className="relative block">
							<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								className="h-10 rounded-xl border-border/70 bg-background/75 pl-10 text-sm"
								placeholder="Tìm bài viết, người dùng, hoặc tag..."
							/>
						</div>
						<Button size="lg" variant="outline" className="h-10 rounded-xl font-medium">
							Lọc nâng cao
						</Button>
					</div>
				</div>

				<section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
					<div className="space-y-6">
						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader className="pb-3">
								<CardTitle className="flex items-center justify-between text-base md:text-lg">
									<span className="font-heading">Danh mục nổi bật</span>
									<Link
										href="/forum/categories"
										className="inline-flex items-center gap-1 text-xs text-accent transition hover:text-accent/80"
									>
										Xem tất cả
										<ArrowRight className="size-3" />
									</Link>
								</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-3 sm:grid-cols-2">
								{categories.map((category, index) => (
									<Link
										key={category.name}
										href="/forum/category/meta"
										className="group rounded-xl border border-border/60 bg-background/75 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_10px_25px_oklch(0.72_0.18_85/0.14)]"
										style={{ animationDelay: `${index * 120}ms` }}
									>
										<div className="mb-3 flex items-center justify-between">
											<span className="inline-flex items-center gap-2 rounded-lg bg-muted/60 px-2 py-1 text-[11px] font-medium text-foreground">
												{category.icon}
												{category.threads} chủ đề
											</span>
											{category.badge ? (
												<span className="rounded-full bg-warning/15 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-warning uppercase">
													{category.badge}
												</span>
											) : null}
										</div>
										<p className="text-sm font-semibold text-foreground transition group-hover:text-primary">
											{category.name}
										</p>
									</Link>
								))}
							</CardContent>
						</Card>

						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader className="pb-2">
								<CardTitle className="font-heading text-base md:text-lg">
									<div className="flex items-center gap-2">
										<Pin className="size-4 text-primary" />
										Bài ghim từ quản trị viên
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{pinnedPosts.map((post) => (
									<Link
										key={post.title}
										href="/forum/thread/patch-167"
										className="block rounded-xl border border-primary/30 bg-primary/5 p-4 transition hover:border-primary/60 hover:bg-primary/10"
									>
										<div className="mb-2 flex flex-wrap items-center gap-2">
											<span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-primary uppercase">
												Pinned
											</span>
											{post.hot ? (
												<span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
													<Flame className="size-3" />
													Hot
												</span>
											) : null}
										</div>
										<p className="text-sm font-semibold leading-snug md:text-base">
											{post.title}
										</p>
										<p className="mt-2 text-xs text-muted-foreground">
											{post.author} · {post.category}
										</p>
										<p className="mt-1 text-[11px] text-muted-foreground">
											{post.replies} phản hồi · {post.views} lượt xem · cập
											nhật {post.updated}
										</p>
									</Link>
								))}
							</CardContent>
						</Card>

						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader className="pb-2">
								<CardTitle className="font-heading text-base md:text-lg">
									Thảo luận mới nhất
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{latestPosts.map((post) => (
									<Link
										key={post.title}
										href="/forum/thread/latest"
										className="group flex items-start justify-between gap-3 rounded-xl border border-border/55 bg-background/80 p-3 transition-all hover:border-info/40 hover:bg-info/5"
									>
										<div className="min-w-0 space-y-1">
											<p className="line-clamp-2 text-sm font-medium leading-snug transition group-hover:text-info">
												{post.title}
											</p>
											<p className="text-[11px] text-muted-foreground">
												{post.author} · {post.category}
											</p>
										</div>
										<div className="shrink-0 text-right text-[11px] text-muted-foreground">
											<p className="inline-flex items-center gap-1">
												<MessageSquare className="size-3" />
												{post.replies}
											</p>
											<p className="mt-1 inline-flex items-center gap-1">
												<Clock3 className="size-3" />
												{post.updated}
											</p>
											{post.hot ? (
												<p className="mt-1 inline-flex items-center gap-1 text-destructive">
													<Flame className="size-3" />
													Hot
												</p>
											) : null}
										</div>
									</Link>
								))}
							</CardContent>
						</Card>
					</div>

					<aside className="space-y-6">
						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader>
								<CardTitle className="font-heading text-base">
									Nhịp cộng đồng hôm nay
								</CardTitle>
							</CardHeader>
							<CardContent className="grid grid-cols-3 gap-3 text-center">
								<div className="rounded-xl bg-primary/10 p-3">
									<p className="text-lg font-bold text-primary">1.8k</p>
									<p className="text-[11px] text-muted-foreground">Bài viết</p>
								</div>
								<div className="rounded-xl bg-info/10 p-3">
									<p className="text-lg font-bold text-info">412</p>
									<p className="text-[11px] text-muted-foreground">Online</p>
								</div>
								<div className="rounded-xl bg-success/10 p-3">
									<p className="text-lg font-bold text-success">92</p>
									<p className="text-[11px] text-muted-foreground">Build mới</p>
								</div>
							</CardContent>
						</Card>

						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader>
								<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
									<TrendingUp className="size-4 text-warning" />
									Trending tags
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-2">
								{trendingTags.map((tag) => (
									<Link
										key={tag}
										href="/forum/tags/meta167"
										className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-warning/45 hover:text-warning"
									>
										{tag}
									</Link>
								))}
							</CardContent>
						</Card>

						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader>
								<CardTitle className="font-heading text-base">
									Tổ đội đang online
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{['Raven', 'Mina', 'Aster', 'Jiro', 'Toki'].map((name) => (
									<div
										key={name}
										className="flex items-center justify-between rounded-lg border border-border/55 bg-background/70 px-3 py-2"
									>
										<div className="inline-flex items-center gap-2">
											<span className="inline-flex size-7 items-center justify-center rounded-full bg-success/20 text-xs font-semibold text-success">
												{name.slice(0, 2)}
											</span>
											<span className="text-xs font-medium">{name}</span>
										</div>
										<span className="text-[11px] text-muted-foreground">
											xem thread
										</span>
									</div>
								))}
							</CardContent>
						</Card>

						<Card className="card-castle rounded-2xl border-border/50 py-5">
							<CardHeader>
								<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
									<CalendarDays className="size-4 text-info" />
									Sự kiện sắp tới
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="rounded-xl border border-info/25 bg-info/5 p-3">
									<p className="text-sm font-semibold">
										Forum Night: Build Clinic
									</p>
									<p className="mt-1 text-xs text-muted-foreground">
										20:00, Thứ Bảy. Review đội hình trực tiếp cùng mod.
									</p>
								</div>
							</CardContent>
						</Card>
					</aside>
				</section>
			</section>
		</main>
	);
}

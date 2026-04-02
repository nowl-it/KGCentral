'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kgcentral/ui/components/card';
import { Activity, ArrowRight, Megaphone, Shield, Sparkles, Swords } from 'lucide-react';
import Link from 'next/link';
import ForumPageShell from '../_components/forum-page-shell';

const categories = [
	{
		slug: 'announcements',
		name: 'Thông báo cộng đồng',
		desc: 'Patch notes, rule updates, sự kiện chính thức từ admin và moderator.',
		threads: 42,
		repliesToday: 132,
		icon: <Megaphone className="size-4 text-warning" />,
		color: 'bg-warning/10 text-warning',
	},
	{
		slug: 'meta',
		name: 'Đội hình meta 167.0.01',
		desc: 'Phân tích synergy, counter team, và xu hướng rank hiện tại.',
		threads: 138,
		repliesToday: 594,
		icon: <Swords className="size-4 text-destructive" />,
		color: 'bg-destructive/10 text-destructive',
	},
	{
		slug: 'newbie',
		name: 'Hỏi đáp tân thủ',
		desc: 'Nơi bắt đầu cho người chơi mới và các câu hỏi cơ bản.',
		threads: 216,
		repliesToday: 427,
		icon: <Shield className="size-4 text-info" />,
		color: 'bg-info/10 text-info',
	},
	{
		slug: 'showcase',
		name: 'Showcase replay',
		desc: 'Kho chia sẻ replay ấn tượng và bài học chiến thuật thực chiến.',
		threads: 74,
		repliesToday: 201,
		icon: <Sparkles className="size-4 text-accent" />,
		color: 'bg-accent/10 text-accent',
	},
];

export default function ForumCategoriesPage() {
	return (
		<ForumPageShell
			title="Danh Mục Forum"
			description="Mỗi khu vực tập trung vào một loại thảo luận cụ thể để bạn tìm đúng cộng đồng nhanh hơn."
			badge="Categories"
		>
			<section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
				<div className="grid gap-4">
					{categories.map((category) => (
						<Card
							key={category.slug}
							className="card-castle rounded-2xl border-border/50 py-4"
						>
							<CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
								<div className="space-y-2">
									<p
										className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold ${category.color}`}
									>
										{category.icon}
										{category.threads} chủ đề
									</p>
									<h2 className="font-heading text-xl text-foreground">
										{category.name}
									</h2>
									<p className="max-w-xl text-sm text-muted-foreground">
										{category.desc}
									</p>
								</div>
								<div className="flex flex-col gap-2 md:items-end">
									<p className="text-xs text-muted-foreground">
										<span className="font-semibold text-foreground">
											{category.repliesToday}
										</span>{' '}
										phản hồi hôm nay
									</p>
									<Link
										href={`/forum/category/${category.slug}`}
										className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/75 px-3 py-1.5 text-xs font-medium text-accent transition hover:border-accent/40"
									>
										Vào chuyên mục
										<ArrowRight className="size-3" />
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="space-y-6">
					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
								<Activity className="size-4 text-primary" />
								Heat Map 24h
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{categories.map((category) => (
								<div key={category.slug} className="space-y-1.5">
									<div className="flex justify-between text-[11px] text-muted-foreground">
										<span>{category.name}</span>
										<span>
											{Math.min(100, Math.round(category.repliesToday / 6))}%
										</span>
									</div>
									<div className="h-1.5 overflow-hidden rounded-full bg-muted/70">
										<div
											className="h-full rounded-full bg-linear-to-r from-primary to-accent"
											style={{
												width: `${Math.min(100, Math.round(category.repliesToday / 6))}%`,
											}}
										/>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">Gợi ý khám phá</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-xs text-muted-foreground">
							<p>1. Bắt đầu từ Hỏi đáp tân thủ nếu bạn mới vào game dưới 2 tuần.</p>
							<p>2. Theo dõi Đội hình meta để bắt nhịp patch nhanh.</p>
							<p>3. Đăng replay ở Showcase để nhận review trực tiếp.</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</ForumPageShell>
	);
}

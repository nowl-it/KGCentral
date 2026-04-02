'use client';

import { Button } from '@kgcentral/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kgcentral/ui/components/card';
import { Clock3, Flame, MessageSquare, Plus, SlidersHorizontal, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ForumPageShell from '../../_components/forum-page-shell';

const categoryLabelMap: Record<string, string> = {
	announcements: 'Thông báo cộng đồng',
	meta: 'Đội hình meta 167.0.01',
	newbie: 'Hỏi đáp tân thủ',
	showcase: 'Showcase replay',
};

const threads = [
	{
		title: 'Top 5 đội hình bền vững cho rank cao tuần này',
		author: 'NightOwl',
		replies: 39,
		views: 1054,
		updated: '9 phút trước',
		hot: true,
	},
	{
		title: 'Nên ưu tiên relic crit hay attack speed cho giai đoạn mid-game?',
		author: 'Mio',
		replies: 21,
		views: 541,
		updated: '22 phút trước',
	},
	{
		title: 'Review build người chơi mới: cần sửa gì để vào top 8 ổn định?',
		author: 'Kudo',
		replies: 14,
		views: 297,
		updated: '1 giờ trước',
	},
	{
		title: 'Patch này class Tenacity có còn là frontline đáng đầu tư?',
		author: 'Rin',
		replies: 33,
		views: 803,
		updated: '2 giờ trước',
		hot: true,
	},
];

export default function ForumCategoryDetailPage() {
	const params = useParams<{ slug: string }>();
	const slug = params.slug ?? 'meta';
	const categoryName = categoryLabelMap[slug] ?? 'Chuyên mục';

	return (
		<ForumPageShell
			title={categoryName}
			description="Tổng hợp các thảo luận nổi bật, bài mới, và góc nhìn chiến thuật trong chuyên mục này."
			badge="Category"
			actions={
				<>
					<Button variant="outline" size="sm">
						<SlidersHorizontal className="size-3.5" />
						Bộ lọc
					</Button>
					<Button asChild size="sm" className="btn-gold-shimmer text-accent-foreground">
						<Link href="/forum/new">
							<Plus className="size-3.5" />
							Đăng bài
						</Link>
					</Button>
				</>
			}
		>
			<section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
				<Card className="card-castle rounded-2xl border-border/50 py-5">
					<CardHeader className="pb-2">
						<CardTitle className="font-heading text-lg">Luồng thảo luận</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{threads.map((thread) => (
							<Link
								key={thread.title}
								href="/forum/thread/latest"
								className="group flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background/80 p-3 transition-all hover:border-primary/45 hover:bg-primary/5"
							>
								<div className="min-w-0 space-y-1">
									<p className="line-clamp-2 text-sm font-medium transition group-hover:text-primary">
										{thread.title}
									</p>
									<p className="text-[11px] text-muted-foreground">
										{thread.author}
									</p>
								</div>
								<div className="shrink-0 text-right text-[11px] text-muted-foreground">
									<p className="inline-flex items-center gap-1">
										<MessageSquare className="size-3" />
										{thread.replies}
									</p>
									<p>{thread.views} views</p>
									<p className="mt-1 inline-flex items-center gap-1">
										<Clock3 className="size-3" />
										{thread.updated}
									</p>
									{thread.hot ? (
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

				<div className="space-y-6">
					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">
								Trạng thái chuyên mục
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-xs text-muted-foreground">
							<div className="rounded-lg bg-muted/30 p-3">
								<p className="font-semibold text-foreground">138 chủ đề đang mở</p>
								<p className="mt-1">Tăng 12% tương tác so với tuần trước.</p>
							</div>
							<div className="rounded-lg bg-muted/30 p-3">
								<p className="font-semibold text-foreground">Khung giờ sôi động</p>
								<p className="mt-1">19:00 - 23:00 hằng ngày.</p>
							</div>
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
								<Sparkles className="size-4 text-accent" />
								Mẹo đóng góp hiệu quả
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-xs text-muted-foreground">
							<p>1. Nêu rõ rank hiện tại để nhận phản hồi đúng trình độ.</p>
							<p>2. Chỉ ra 2-3 điểm yếu bạn muốn cải thiện trong trận.</p>
							<p>
								3. Cập nhật kết quả sau khi thử góp ý để giữ thảo luận chất lượng.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</ForumPageShell>
	);
}

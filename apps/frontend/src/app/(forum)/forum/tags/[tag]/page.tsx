'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kgcentral/ui/components/card';
import { Flame, Hash, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ForumPageShell from '../../_components/forum-page-shell';

const taggedThreads = [
	{
		title: 'Checklist build #meta167 cho người chơi mới tuần đầu',
		author: 'Sora',
		replies: 29,
		updated: '12 phút trước',
		hot: true,
	},
	{
		title: 'So sánh 3 đội hình top rank dùng cùng core relic',
		author: 'Aoi',
		replies: 41,
		updated: '40 phút trước',
		hot: true,
	},
	{
		title: 'Khi nào nên pivot sang class Courage trong patch mới?',
		author: 'Mitsu',
		replies: 17,
		updated: '1 giờ trước',
	},
	{
		title: 'Tổng hợp matchup khó và cách xử lý trong rank cao',
		author: 'Nagi',
		replies: 24,
		updated: '2 giờ trước',
	},
];

export default function ForumTagPage() {
	const params = useParams<{ tag: string }>();
	const tag = params.tag ?? 'meta167';

	return (
		<ForumPageShell
			title={`Tag: #${tag}`}
			description="Theo dõi dòng thảo luận theo tag để bắt đúng vấn đề bạn quan tâm và không bỏ lỡ update quan trọng."
			badge="Tag Explorer"
		>
			<section className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
				<Card className="card-castle rounded-2xl border-border/50 py-5">
					<CardHeader>
						<CardTitle className="inline-flex items-center gap-2 font-heading text-lg">
							<Hash className="size-4 text-primary" />
							Threads với #{tag}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{taggedThreads.map((thread) => (
							<Link
								key={thread.title}
								href="/forum/thread/latest"
								className="group flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background/80 p-3 transition-all hover:border-accent/45 hover:bg-accent/5"
							>
								<div className="min-w-0 space-y-1">
									<p className="line-clamp-2 text-sm font-medium transition group-hover:text-accent">
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
									<p className="mt-1">{thread.updated}</p>
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
							<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
								<TrendingUp className="size-4 text-warning" />
								Tag analytics
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-xs text-muted-foreground">
							<div className="rounded-lg bg-muted/30 p-3">
								<p className="font-semibold text-foreground">Tần suất xuất hiện</p>
								<p className="mt-1">+38% trong 7 ngày gần nhất.</p>
							</div>
							<div className="rounded-lg bg-muted/30 p-3">
								<p className="font-semibold text-foreground">
									Tỷ lệ phản hồi trung bình
								</p>
								<p className="mt-1">16.2 phản hồi mỗi thread.</p>
							</div>
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">Tag liên quan</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-2">
							{['#newbie', '#relic-build', '#colosseum', '#counter'].map((item) => (
								<Link
									key={item}
									href="/forum/tags/meta167"
									className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-warning/45 hover:text-warning"
								>
									{item}
								</Link>
							))}
						</CardContent>
					</Card>
				</div>
			</section>
		</ForumPageShell>
	);
}

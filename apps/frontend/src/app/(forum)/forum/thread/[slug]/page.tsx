'use client';

import { Button } from '@kgcentral/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kgcentral/ui/components/card';
import { Input } from '@kgcentral/ui/components/input';
import {
	Clock3,
	Flag,
	Heart,
	MessageCircleReply,
	Pin,
	Share2,
	Sparkles,
	ThumbsUp,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import ForumPageShell from '../../_components/forum-page-shell';

const comments = [
	{
		author: 'Aster',
		time: '8 phút trước',
		content:
			'Build này ổn ở mid-game, nhưng bạn nên đổi relic thứ 2 sang hồi năng lượng để combo mở nhanh hơn.',
		likes: 12,
	},
	{
		author: 'LunaMod',
		time: '18 phút trước',
		content:
			'Bạn thử giảm 1 hero Mystique để thêm frontline class Courage, tỷ lệ giữ top 4 sẽ ổn định hơn.',
		likes: 20,
	},
	{
		author: 'KirinVN',
		time: '35 phút trước',
		content:
			'Mình test trong Colosseum 15 trận thì thấy phương án của LunaMod hiệu quả rõ rệt khi gặp team burst.',
		likes: 8,
	},
];

export default function ForumThreadPage() {
	const params = useParams<{ slug: string }>();
	const slug = params.slug ?? 'thread';

	return (
		<ForumPageShell
			title="Patch 167.0.01: Tổng hợp thay đổi và ảnh hưởng meta"
			description={`Thread #${slug} - Thảo luận chuyên sâu từ cộng đồng về thay đổi patch và cách thích nghi đội hình.`}
			badge="Thread Detail"
			actions={
				<>
					<Button variant="outline" size="sm">
						<Share2 className="size-3.5" />
						Chia sẻ
					</Button>
					<Button variant="outline" size="sm">
						<Flag className="size-3.5" />
						Báo cáo
					</Button>
				</>
			}
		>
			<section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
				<div className="space-y-6">
					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader className="pb-2">
							<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
								<Pin className="size-4 text-primary" />
								Bài viết gốc
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<p>Đăng bởi Admin-KGC</p>
								<p className="inline-flex items-center gap-1">
									<Clock3 className="size-3" />
									14 phút trước
								</p>
							</div>
							<div className="space-y-3 text-sm text-foreground/90">
								<p>
									Patch 167.0.01 tập trung vào việc cân bằng class Swiftness và
									điều chỉnh chỉ số altar theo hướng giảm burst đầu trận.
								</p>
								<p>
									Trong bài này, mọi người có thể thảo luận build thay thế,
									matchup khó, và thứ tự ưu tiên nâng trang bị trong 3 ngày đầu
									patch.
								</p>
							</div>
							<div className="flex flex-wrap gap-2 border-t border-border/50 pt-3">
								<Button variant="outline" size="sm">
									<ThumbsUp className="size-3.5" />
									Hữu ích (54)
								</Button>
								<Button variant="outline" size="sm">
									<Heart className="size-3.5" />
									Theo dõi
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">
								Phản hồi từ cộng đồng
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{comments.map((comment) => (
								<div
									key={`${comment.author}-${comment.time}`}
									className="rounded-xl border border-border/60 bg-background/80 p-3"
								>
									<div className="mb-1 flex items-center justify-between text-xs">
										<p className="font-semibold text-foreground">
											{comment.author}
										</p>
										<p className="text-muted-foreground">{comment.time}</p>
									</div>
									<p className="text-sm text-muted-foreground">
										{comment.content}
									</p>
									<button
										type="button"
										className="mt-2 text-xs text-primary hover:text-primary/80"
									>
										Hữu ích ({comment.likes})
									</button>
								</div>
							))}
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">Viết phản hồi</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Input
								placeholder="Tiêu đề ngắn cho ý kiến của bạn"
								className="h-10 rounded-xl"
							/>
							<textarea
								className="min-h-36 w-full rounded-xl border border-border/70 bg-background/80 p-3 text-sm outline-none ring-primary/25 transition focus-visible:ring-2"
								placeholder="Chia sẻ thử nghiệm đội hình của bạn..."
							/>
							<Button className="btn-gold-shimmer text-accent-foreground">
								<MessageCircleReply className="size-3.5" />
								Gửi phản hồi
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">Tóm tắt thread</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-xs text-muted-foreground">
							<p>1. 72 phản hồi, 2.4k lượt xem, 61% phản hồi tích cực.</p>
							<p>2. Chủ đề nổi bật: thay relic hồi năng lượng cho meta mới.</p>
							<p>3. Team được đề cập nhiều nhất: Swiftness + Courage hybrid.</p>
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
								<Sparkles className="size-4 text-accent" />
								AI digest
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground">
								Cộng đồng đang nghiêng về hướng build hybrid để giữ ổn định khi gặp
								đội burst. Bạn có thể thử 3 biến thể và update kết quả tại đây.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</ForumPageShell>
	);
}

'use client';

import { Button } from '@kgcentral/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kgcentral/ui/components/card';
import { Input } from '@kgcentral/ui/components/input';
import {
	Check,
	Image,
	ListFilter,
	MessageSquareText,
	Save,
	Send,
	Sparkles,
	Tag,
} from 'lucide-react';
import Link from 'next/link';
import ForumPageShell from '../_components/forum-page-shell';

const categoryOptions = [
	'Thông báo cộng đồng',
	'Đội hình meta 167.0.01',
	'Hỏi đáp tân thủ',
	'Showcase replay',
];

const quickTips = [
	'Tiêu đề nên nêu rõ mục tiêu build hoặc câu hỏi cần hỗ trợ.',
	'Đính kèm altar/relic hiện tại để cộng đồng góp ý chính xác hơn.',
	'Kết thúc bài bằng 1 câu hỏi cụ thể để tăng tương tác.',
];

export default function NewForumThreadPage() {
	return (
		<ForumPageShell
			title="Tạo Chủ Đề Mới"
			description="Viết bài theo mẫu rõ ràng để nhận được tư vấn nhanh và chất lượng từ cộng đồng."
			badge="New Discussion"
			actions={
				<>
					<Button asChild variant="outline" size="sm">
						<Link href="/forum/categories">Chọn chuyên mục</Link>
					</Button>
					<Button asChild size="sm" className="btn-gold-shimmer text-accent-foreground">
						<Link href="/chat">
							<Sparkles className="size-3.5" />
							Gợi ý bằng AI
						</Link>
					</Button>
				</>
			}
		>
			<section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
				<Card className="card-castle rounded-2xl border-border/50 py-5">
					<CardHeader>
						<CardTitle className="font-heading text-lg">Nội dung bài viết</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
								Tiêu đề
							</p>
							<Input
								className="h-10 rounded-xl border-border/70 bg-background/80"
								placeholder="Ví dụ: Build leo Colosseum cho rank Platinum"
							/>
						</div>

						<div className="space-y-2">
							<p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
								Chuyên mục
							</p>
							<div className="flex flex-wrap gap-2">
								{categoryOptions.map((category, index) => (
									<button
										type="button"
										key={category}
										className={`rounded-full border px-3 py-1.5 text-xs transition ${
											index === 1
												? 'border-primary/50 bg-primary/10 text-primary'
												: 'border-border/70 bg-background text-muted-foreground hover:border-accent/40 hover:text-accent'
										}`}
									>
										{category}
									</button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
								Nội dung
							</p>
							<textarea
								className="min-h-60 w-full rounded-2xl border border-border/70 bg-background/80 p-4 text-sm outline-none ring-primary/25 transition focus-visible:ring-2"
								placeholder="Mô tả đội hình hiện tại, vấn đề bạn đang gặp và kỳ vọng muốn cải thiện..."
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button variant="outline" size="sm" className="rounded-lg">
								<Image className="size-3.5" />
								Thêm ảnh
							</Button>
							<Button variant="outline" size="sm" className="rounded-lg">
								<Tag className="size-3.5" />
								Thêm tags
							</Button>
							<Button variant="outline" size="sm" className="rounded-lg">
								<ListFilter className="size-3.5" />
								Mẫu format
							</Button>
						</div>

						<div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
							<p className="text-xs text-muted-foreground">
								Tự động lưu bản nháp mỗi 20 giây.
							</p>
							<div className="flex flex-wrap gap-2">
								<Button variant="outline" className="rounded-lg">
									<Save className="size-3.5" />
									Lưu nháp
								</Button>
								<Button className="btn-gold-shimmer rounded-lg text-accent-foreground">
									<Send className="size-3.5" />
									Đăng bài
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6">
					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">Preview nhanh</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<p className="text-xs text-muted-foreground">
								Đội hình meta 167 cho tân thủ
							</p>
							<p className="line-clamp-4 text-sm text-foreground/90">
								Mình đang kẹt rank Gold I với đội hình hiện tại. Mục tiêu là ổn định
								top 4 Colosseum và cần tư vấn thứ tự ưu tiên relic.
							</p>
							<div className="flex flex-wrap gap-1.5 text-[11px]">
								<span className="rounded-full bg-warning/15 px-2 py-1 text-warning">
									#meta167
								</span>
								<span className="rounded-full bg-info/15 px-2 py-1 text-info">
									#newbie
								</span>
							</div>
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="font-heading text-base">
								Checklist chất lượng
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							{quickTips.map((tip) => (
								<div
									key={tip}
									className="flex items-start gap-2 rounded-lg bg-muted/30 p-2"
								>
									<Check className="mt-0.5 size-3.5 text-success" />
									<p className="text-xs text-muted-foreground">{tip}</p>
								</div>
							))}
						</CardContent>
					</Card>

					<Card className="card-castle rounded-2xl border-border/50 py-5">
						<CardHeader>
							<CardTitle className="inline-flex items-center gap-2 font-heading text-base">
								<MessageSquareText className="size-4 text-accent" />
								Mẹo tăng tương tác
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground">
								Các bài có tiêu đề rõ vấn đề và có dữ liệu build chi tiết thường
								nhận được phản hồi nhanh hơn 2.3 lần.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</ForumPageShell>
	);
}

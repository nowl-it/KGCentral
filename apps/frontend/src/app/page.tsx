'use client';

import { Button } from '@kgcentral/ui/components/button';
import { Castle, Crown, Sparkles, Trophy, Users, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/30 px-4 py-16 md:py-24">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center space-y-6">
						{/* Crown Icon with animation */}
						<div className="flex justify-center">
							<div className="relative">
								<Crown className="size-20 text-primary animate-castle-float drop-shadow-[0_0_20px_oklch(0.72_0.18_85/0.4)]" />
								<div className="absolute inset-0 animate-royal-pulse">
									<Crown className="size-20 text-primary/20" />
								</div>
							</div>
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-6xl font-heading text-gold-gradient tracking-tight">
							Welcome to KGCentral
						</h1>

						{/* Subtitle */}
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Cộng đồng King God Castle với Wiki đầy đủ, Team Builder thông minh, và
							AI Recommendations
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
							<Button
								asChild
								size="lg"
								className="gold-border bg-primary text-primary-foreground shadow-lg hover:shadow-[0_0_30px_oklch(0.72_0.18_85/0.4)] transition-all font-heading text-base"
							>
								<Link href="/auth/sign-up" className="flex items-center gap-2">
									<Crown className="size-5" />
									Get Started Free
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="border-accent text-accent hover:bg-accent/10 font-heading text-base"
							>
								<Link href="/wiki" className="flex items-center gap-2">
									<Castle className="size-5" />
									Explore Wiki
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Decorative gradient overlay */}
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-10" />
			</section>

			{/* Features Section */}
			<section className="px-4 py-16 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl md:text-4xl font-heading text-center mb-12 text-shadow-gold">
						Tính Năng Chính
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Wiki Feature */}
						<div className="card-castle p-6 rounded-xl hover:shadow-lg transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
									<Castle className="size-6 text-primary" />
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-lg mb-2">
										Comprehensive Wiki
									</h3>
									<p className="text-sm text-muted-foreground">
										Tra cứu tất cả Heroes, Equipment, Altars, và Relics với
										stats chi tiết
									</p>
								</div>
							</div>
						</div>

						{/* Team Builder Feature */}
						<div className="card-castle p-6 rounded-xl hover:shadow-lg transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
									<Users className="size-6 text-accent" />
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-lg mb-2">Team Builder</h3>
									<p className="text-sm text-muted-foreground">
										Xây dựng và lưu đội hình với drag-and-drop interface trực
										quan
									</p>
								</div>
							</div>
						</div>

						{/* AI Recommendations */}
						<div className="card-royal p-6 rounded-xl hover:shadow-xl transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
									<Wand2 className="size-6 text-accent" />
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-lg mb-2 text-purple-gradient">
										AI Suggestions
									</h3>
									<p className="text-sm text-muted-foreground">
										Nhận đề xuất đội hình tự động dựa trên Synergy Scoring
									</p>
									<span className="inline-block mt-2 rounded bg-accent/20 px-2 py-1 text-[10px] font-medium text-accent">
										POWERED BY AI
									</span>
								</div>
							</div>
						</div>

						{/* Tier List */}
						<div className="card-castle p-6 rounded-xl hover:shadow-lg transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
									<Trophy className="size-6 text-primary" />
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-lg mb-2">Tier Rankings</h3>
									<p className="text-sm text-muted-foreground">
										Xếp hạng Heroes và Equipment với Wilson Score voting
									</p>
								</div>
							</div>
						</div>

						{/* Multilingual */}
						<div className="card-castle p-6 rounded-xl hover:shadow-lg transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-info/10 group-hover:bg-info/20 transition-colors">
									<Sparkles className="size-6 text-info" />
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-lg mb-2">Đa Ngôn Ngữ</h3>
									<p className="text-sm text-muted-foreground">
										Hỗ trợ Tiếng Việt và English, dễ dàng chuyển đổi
									</p>
								</div>
							</div>
						</div>

						{/* Community */}
						<div className="card-castle p-6 rounded-xl hover:shadow-lg transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
									<Users className="size-6 text-success" />
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-lg mb-2">Community Driven</h3>
									<p className="text-sm text-muted-foreground">
										Được xây dựng bởi và cho cộng đồng King God Castle
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 py-16 bg-linear-to-t from-background to-muted/30">
				<div className="container mx-auto max-w-4xl text-center">
					<div className="card-royal p-8 md:p-12 rounded-2xl">
						<Crown className="size-16 text-primary mx-auto mb-6 animate-royal-pulse" />
						<h2 className="text-3xl md:text-4xl font-heading mb-4 text-shadow-gold">
							Sẵn sàng xây dựng đội hình chiến thắng?
						</h2>
						<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
							Tham gia KGCentral ngay hôm nay để truy cập đầy đủ công cụ, tính năng
							AI, và kết nối với cộng đồng.
						</p>
						<Button
							asChild
							size="lg"
							className="btn-gold-shimmer bg-primary text-primary-foreground shadow-xl font-heading text-lg px-8"
						>
							<Link href="/auth/sign-up">
								<Crown className="size-5 mr-2" />
								Join the Kingdom
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}

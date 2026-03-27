import { type ReactNode } from 'react';

/**
 * Color Palette Showcase Component
 * Hiển thị tất cả màu trong color system
 * Dùng cho documentation và design reference
 */

interface ColorSwatchProps {
	name: string;
	variable: string;
	description?: string;
	children?: ReactNode;
}

function ColorSwatch({ name, variable, description, children }: ColorSwatchProps) {
	return (
		<div className="flex flex-col gap-2">
			<div
				className="h-20 rounded-lg border-2"
				style={{ backgroundColor: `var(${variable})` }}
			>
				{children}
			</div>
			<div>
				<p className="font-semibold text-sm">{name}</p>
				<p className="text-xs text-muted-foreground font-mono">{variable}</p>
				{description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
			</div>
		</div>
	);
}

export function ColorPalette() {
	return (
		<div className="container mx-auto p-8 space-y-12">
			<div>
				<h1 className="text-4xl font-heading mb-2 text-gold-gradient">KGCentral Colors</h1>
				<p className="text-muted-foreground">
					Royal Castle theme với Royal Gold, Castle Stone, và Mystical Purple
				</p>
			</div>

			{/* Main Colors */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Main Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<ColorSwatch
						name="Background"
						variable="--background"
						description="Nền chính của app"
					/>
					<ColorSwatch
						name="Foreground"
						variable="--foreground"
						description="Text màu chính"
					/>
					<ColorSwatch name="Card" variable="--card" description="Background của cards" />
					<ColorSwatch
						name="Card Foreground"
						variable="--card-foreground"
						description="Text trong cards"
					/>
				</div>
			</section>

			{/* Semantic Colors */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Semantic Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<ColorSwatch
						name="Primary (Royal Gold)"
						variable="--primary"
						description="Màu chủ đạo - vàng hoàng gia"
					/>
					<ColorSwatch
						name="Secondary (Castle Stone)"
						variable="--secondary"
						description="Màu phụ - đá castle"
					/>
					<ColorSwatch
						name="Accent (Mystical Purple)"
						variable="--accent"
						description="Accent - tím huyền bí"
					/>
					<ColorSwatch
						name="Destructive (Battle Red)"
						variable="--destructive"
						description="Nguy hiểm/xóa"
					/>
					<ColorSwatch name="Success" variable="--success" description="Thành công" />
					<ColorSwatch name="Warning" variable="--warning" description="Cảnh báo" />
					<ColorSwatch name="Info" variable="--info" description="Thông tin" />
					<ColorSwatch name="Muted" variable="--muted" description="Background nhẹ" />
				</div>
			</section>

			{/* Chart Colors */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Chart Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					<ColorSwatch name="Chart 1" variable="--chart-1" description="Gold" />
					<ColorSwatch name="Chart 2" variable="--chart-2" description="Purple" />
					<ColorSwatch name="Chart 3" variable="--chart-3" description="Blue" />
					<ColorSwatch name="Chart 4" variable="--chart-4" description="Green" />
					<ColorSwatch name="Chart 5" variable="--chart-5" description="Red" />
				</div>
			</section>

			{/* Border Effects */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Border Effects</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="gold-border p-6 rounded-lg">
						<h3 className="font-heading text-lg mb-2">Gold Border</h3>
						<p className="text-sm text-muted-foreground">
							Royal gold animated border với gradient và glow effect
						</p>
						<code className="text-xs mt-2 block">className="gold-border"</code>
					</div>
					<div className="purple-border p-6 rounded-lg">
						<h3 className="font-heading text-lg mb-2">Purple Border</h3>
						<p className="text-sm text-muted-foreground">
							Mystical purple border cho magic effects
						</p>
						<code className="text-xs mt-2 block">className="purple-border"</code>
					</div>
				</div>
			</section>

			{/* Text Effects */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Text Effects</h2>
				<div className="space-y-4">
					<div>
						<h3 className="text-3xl font-heading text-shadow-gold">Royal Gold Glow</h3>
						<code className="text-xs text-muted-foreground">
							className="text-shadow-gold"
						</code>
					</div>
					<div>
						<h3 className="text-3xl font-heading text-shadow-purple">
							Mystical Purple Glow
						</h3>
						<code className="text-xs text-muted-foreground">
							className="text-shadow-purple"
						</code>
					</div>
					<div>
						<h3 className="text-3xl font-heading text-gold-gradient">
							Gold Gradient Text
						</h3>
						<code className="text-xs text-muted-foreground">
							className="text-gold-gradient"
						</code>
					</div>
					<div>
						<h3 className="text-3xl font-heading text-purple-gradient">
							Purple Gradient Text
						</h3>
						<code className="text-xs text-muted-foreground">
							className="text-purple-gradient"
						</code>
					</div>
				</div>
			</section>

			{/* Card Styles */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Card Styles</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="card-castle p-6 rounded-lg">
						<h3 className="font-heading text-lg mb-2">Castle Card</h3>
						<p className="text-sm text-muted-foreground">
							Standard card với subtle gradient và shadow
						</p>
						<code className="text-xs mt-2 block">className="card-castle"</code>
					</div>
					<div className="card-royal p-6 rounded-lg">
						<h3 className="font-heading text-lg mb-2">Royal Card</h3>
						<p className="text-sm text-muted-foreground">
							Premium card với gold/purple gradient border
						</p>
						<code className="text-xs mt-2 block">className="card-royal"</code>
					</div>
				</div>
			</section>

			{/* Tier Colors */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Tier Rankings</h2>
				<div className="space-y-2">
					<div className="flex items-center gap-4">
						<span className="tier-s text-3xl font-heading">S</span>
						<span className="text-sm text-muted-foreground">
							className="tier-s" - Royal Gold
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="tier-a text-3xl font-heading">A</span>
						<span className="text-sm text-muted-foreground">
							className="tier-a" - Mystical Purple
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="tier-b text-3xl font-heading">B</span>
						<span className="text-sm text-muted-foreground">
							className="tier-b" - Info Blue
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="tier-c text-3xl font-heading">C</span>
						<span className="text-sm text-muted-foreground">
							className="tier-c" - Success Green
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="tier-d text-3xl font-heading">D</span>
						<span className="text-sm text-muted-foreground">
							className="tier-d" - Muted Gray
						</span>
					</div>
				</div>
			</section>

			{/* Rarity Colors */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Item Rarity</h2>
				<div className="space-y-2">
					<div>
						<span className="rarity-legendary text-xl font-heading">Legendary</span>
						<span className="text-sm text-muted-foreground ml-4">
							className="rarity-legendary"
						</span>
					</div>
					<div>
						<span className="rarity-epic text-xl font-heading">Epic</span>
						<span className="text-sm text-muted-foreground ml-4">
							className="rarity-epic"
						</span>
					</div>
					<div>
						<span className="rarity-rare text-xl font-heading">Rare</span>
						<span className="text-sm text-muted-foreground ml-4">
							className="rarity-rare"
						</span>
					</div>
					<div>
						<span className="rarity-common text-xl font-heading">Common</span>
						<span className="text-sm text-muted-foreground ml-4">
							className="rarity-common"
						</span>
					</div>
				</div>
			</section>

			{/* Animations */}
			<section>
				<h2 className="text-2xl font-heading mb-4">Animations</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="card-castle p-6 rounded-lg animate-royal-pulse">
						<h3 className="font-heading text-sm">Royal Pulse</h3>
						<code className="text-xs text-muted-foreground">animate-royal-pulse</code>
					</div>
					<div className="btn-gold-shimmer p-6 rounded-lg text-primary-foreground">
						<h3 className="font-heading text-sm">Gold Shimmer</h3>
						<code className="text-xs">btn-gold-shimmer</code>
					</div>
					<div className="card-castle p-6 rounded-lg animate-castle-float">
						<h3 className="font-heading text-sm">Castle Float</h3>
						<code className="text-xs text-muted-foreground">animate-castle-float</code>
					</div>
				</div>
			</section>
		</div>
	);
}

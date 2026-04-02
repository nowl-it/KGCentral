'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { type ReactNode } from 'react';

type ForumPageShellProps = {
	title: string;
	description: string;
	badge?: string;
	actions?: ReactNode;
	children: ReactNode;
};

export default function ForumPageShell({
	title,
	description,
	badge,
	actions,
	children,
}: ForumPageShellProps) {
	return (
		<main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(110%_75%_at_50%_-10%,oklch(0.8_0.18_85/0.18),transparent_62%),linear-gradient(180deg,var(--background),oklch(from_var(--background)_calc(l-0.01)_c_h))] px-4 pb-14 pt-8 md:px-6 lg:px-8">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_15%,oklch(0.64_0.18_240/0.12),transparent_32%),radial-gradient(circle_at_90%_12%,oklch(0.7_0.22_65/0.16),transparent_35%)]" />

			<section className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
				<div className="card-royal rounded-3xl border p-5 shadow-xl md:p-8">
					<div className="mb-4 flex items-center justify-between gap-3">
						<Link
							href="/"
							className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
						>
							<ArrowLeft className="size-3.5" />
							Forum chính
						</Link>
						{actions ? (
							<div className="flex flex-wrap items-center gap-2">{actions}</div>
						) : null}
					</div>
					{badge ? (
						<p className="mb-3 inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-accent uppercase">
							{badge}
						</p>
					) : null}
					<h1 className="font-heading text-3xl tracking-tight text-gold-gradient md:text-5xl">
						{title}
					</h1>
					<p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
						{description}
					</p>
				</div>

				{children}
			</section>
		</main>
	);
}

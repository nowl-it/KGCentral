'use client';

import { Button } from '@kgcentral/ui/components/button';
import { useEffect } from 'react';
import { useI18n } from '@/components/providers';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const { t } = useI18n('common');

	useEffect(() => {
		// Log error to error reporting service
		console.error('Route error:', error);
	}, [error]);

	return (
		<div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
			<div className="text-center space-y-6 max-w-md">
				{/* Error Icon */}
				<div className="flex justify-center">
					<div className="rounded-full bg-destructive/10 p-6">
						<svg
							className="w-16 h-16 text-destructive"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Text Content */}
				<div className="space-y-2">
					<h2 className="text-2xl font-heading font-semibold tracking-tight">{t('error')}</h2>
					<p className="text-muted-foreground">
						Có lỗi không mong muốn xảy ra. Vui lòng thử lại.
					</p>
					{error.digest && (
						<p className="text-xs text-muted-foreground font-mono">Error ID: {error.digest}</p>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 justify-center">
					<Button onClick={reset} size="lg">
						Thử lại
					</Button>
					<Button variant="outline" size="lg" asChild>
						<a href="/">Về trang chủ</a>
					</Button>
				</div>
			</div>
		</div>
	);
}

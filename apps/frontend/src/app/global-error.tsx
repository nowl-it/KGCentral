'use client';

import { Button } from '@kgcentral/ui/components/button';
import { useEffect } from 'react';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to error reporting service
		console.error('Global error:', error);
	}, [error]);

	return (
		<html lang="vi">
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center px-4">
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
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
						</div>

						{/* Text Content */}
						<div className="space-y-2">
							<h2 className="text-2xl font-heading font-semibold tracking-tight">
								Đã xảy ra lỗi
							</h2>
							<p className="text-muted-foreground">
								Có lỗi không mong muốn xảy ra. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề
								vẫn tiếp diễn.
							</p>
							{error.digest && (
								<p className="text-xs text-muted-foreground font-mono">
									Error ID: {error.digest}
								</p>
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
			</body>
		</html>
	);
}

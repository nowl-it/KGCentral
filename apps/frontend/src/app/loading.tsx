export default function Loading() {
	return (
		<div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				{/* Spinner */}
				<div className="relative w-16 h-16">
					<div className="absolute inset-0 rounded-full border-4 border-muted"></div>
					<div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
				</div>

				{/* Loading Text */}
				<div className="flex items-center space-x-1">
					<span className="text-sm font-medium text-muted-foreground">Đang tải</span>
					<span className="flex space-x-1">
						<span className="animate-bounce [animation-delay:-0.3s] text-muted-foreground">
							.
						</span>
						<span className="animate-bounce [animation-delay:-0.15s] text-muted-foreground">
							.
						</span>
						<span className="animate-bounce text-muted-foreground">.</span>
					</span>
				</div>
			</div>
		</div>
	);
}

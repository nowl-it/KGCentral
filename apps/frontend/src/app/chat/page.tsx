'use client';

import { Button } from '@kgcentral/ui/components/button';
import { cn } from '@kgcentral/ui/lib/utils';
import { Bot, Crown, Loader2, Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

interface ChatStatus {
	service: string;
	ollama_running: boolean;
	model_available: boolean;
	model_name: string;
	ready: boolean;
}

const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5000';

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<ChatStatus | null>(null);
	const [error, setError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	// Check chat status on mount
	useEffect(() => {
		const checkStatus = async () => {
			try {
				const res = await fetch(`${AI_SERVICE_URL}/api/v1/chat/status`);
				if (res.ok) {
					const data = await res.json();
					setStatus(data);
				}
			} catch {
				setStatus(null);
			}
		};
		checkStatus();
	}, []);

	// Auto-resize textarea
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
		e.target.style.height = 'auto';
		e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
	};

	// Send message
	const sendMessage = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: 'user',
			content: input.trim(),
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);
		setError(null);

		// Reset textarea height
		if (inputRef.current) {
			inputRef.current.style.height = 'auto';
		}

		try {
			const res = await fetch(`${AI_SERVICE_URL}/api/v1/chat/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: userMessage.content,
					history: messages.slice(-10).map((m) => ({
						role: m.role,
						content: m.content,
					})),
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.detail || 'Failed to send message');
			}

			const data = await res.json();

			const assistantMessage: Message = {
				id: crypto.randomUUID(),
				role: 'assistant',
				content: data.response,
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setIsLoading(false);
		}
	};

	// Handle Enter key
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	// Quick suggestions
	const suggestions = [
		'Có bao nhiêu heroes trong game?',
		'Tế đàn có mấy loại?',
		'Team cần bao nhiêu hero?',
		'Giải thích về hệ thống cấp sao',
	];

	return (
		<div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto p-4">
			{/* Header */}
			<div className="flex items-center gap-3 pb-4 border-b border-border">
				<div className="p-2 rounded-lg bg-primary/10">
					<Bot className="size-6 text-primary" />
				</div>
				<div>
					<h1 className="text-xl font-heading flex items-center gap-2">
						KGC Assistant
						<Sparkles className="size-4 text-accent" />
					</h1>
					<p className="text-sm text-muted-foreground">
						{status?.ready ? (
							<span className="text-success">● Online - {status.model_name}</span>
						) : (
							<span className="text-destructive">● Offline</span>
						)}
					</p>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto py-4 space-y-4">
				{messages.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center">
						<Crown className="size-16 text-primary/30 mb-4" />
						<h2 className="text-lg font-heading mb-2">Xin chào! 👋</h2>
						<p className="text-muted-foreground mb-6 max-w-md">
							Tôi là trợ lý AI của KGCentral. Hỏi tôi bất cứ điều gì về game King God
							Castle!
						</p>

						{/* Suggestions */}
						<div className="flex flex-wrap gap-2 justify-center max-w-lg">
							{suggestions.map((suggestion) => (
								<button
									key={suggestion}
									type="button"
									onClick={() => {
										setInput(suggestion);
										inputRef.current?.focus();
									}}
									className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
								>
									{suggestion}
								</button>
							))}
						</div>
					</div>
				) : (
					<>
						{messages.map((message) => (
							<div
								key={message.id}
								className={cn(
									'flex gap-3',
									message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
								)}
							>
								{/* Avatar */}
								<div
									className={cn(
										'shrink-0 size-8 rounded-full flex items-center justify-center',
										message.role === 'user' ? 'bg-primary' : 'bg-accent/20'
									)}
								>
									{message.role === 'user' ? (
										<User className="size-4 text-primary-foreground" />
									) : (
										<Bot className="size-4 text-accent" />
									)}
								</div>

								{/* Message */}
								<div
									className={cn(
										'max-w-[80%] rounded-2xl px-4 py-2',
										message.role === 'user'
											? 'bg-primary text-primary-foreground rounded-tr-sm'
											: 'bg-muted rounded-tl-sm'
									)}
								>
									<p className="whitespace-pre-wrap">{message.content}</p>
									<p
										className={cn(
											'text-[10px] mt-1',
											message.role === 'user'
												? 'text-primary-foreground/60'
												: 'text-muted-foreground'
										)}
									>
										{message.timestamp.toLocaleTimeString('vi-VN', {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</p>
								</div>
							</div>
						))}

						{/* Loading indicator */}
						{isLoading && (
							<div className="flex gap-3">
								<div className="shrink-0 size-8 rounded-full bg-accent/20 flex items-center justify-center">
									<Bot className="size-4 text-accent" />
								</div>
								<div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
									<div className="flex gap-1">
										<span className="size-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
										<span className="size-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
										<span className="size-2 bg-muted-foreground/40 rounded-full animate-bounce" />
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</>
				)}
			</div>

			{/* Error */}
			{error && (
				<div className="mb-2 p-2 bg-destructive/10 text-destructive text-sm rounded-lg">
					{error}
				</div>
			)}

			{/* Input */}
			{(status?.ready || isLoading) && (
				<div className="border-t border-border pt-4">
					<div className="flex gap-2 items-end">
						<textarea
							ref={inputRef}
							value={input}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							placeholder="Hỏi về King God Castle..."
							rows={1}
							className="flex-1 resize-none bg-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
						/>
						<Button
							onClick={sendMessage}
							disabled={!input.trim()}
							size="icon"
							className="size-12 rounded-xl shrink-0"
						>
							{isLoading ? (
								<Loader2 className="size-5 animate-spin" />
							) : (
								<Send className="size-5" />
							)}
						</Button>
					</div>
					<p className="text-[10px] text-muted-foreground text-center mt-2">
						Powered by Qwen2.5 • Shift+Enter để xuống dòng
					</p>
				</div>
			)}
		</div>
	);
}

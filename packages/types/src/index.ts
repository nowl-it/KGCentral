export type Locale = 'vi' | 'en';

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: {
		code: string;
		message: string;
	};
	locale: Locale;
	timestamp: string;
}

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface User {
	id: string;
	email: string;
	name: string;
	role: 'admin' | 'user';
	locale: Locale;
	createdAt: string;
	updatedAt: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

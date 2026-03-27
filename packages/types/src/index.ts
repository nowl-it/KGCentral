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

export type Role = 'ADMIN' | 'MOD' | 'USER';

export interface User {
	id: string;
	email: string;
	username: string;
	name: string | null;
	avatar: string | null;
	role: Role;
	locale: Locale;
	createdAt: string;
	updatedAt: string;
}

export interface AuthTokens {
	accessToken: string;
	expiresIn: number;
}

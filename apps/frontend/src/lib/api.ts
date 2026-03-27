const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface RequestOptions extends RequestInit {
	params?: Record<string, string>;
}

interface ApiError {
	code: string;
	message: string;
}

interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: ApiError;
}

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(
		endpoint: string,
		options: RequestOptions = {}
	): Promise<ApiResponse<T>> {
		const { params, ...fetchOptions } = options;

		let url = `${this.baseUrl}/api/v1${endpoint}`;

		if (params) {
			const searchParams = new URLSearchParams(params);
			url += `?${searchParams.toString()}`;
		}

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			...options.headers,
		};

		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (token) {
			(headers as Record<string, string>).Authorization = `Bearer ${token}`;
		}

		try {
			const response = await fetch(url, {
				...fetchOptions,
				headers,
			});

			const data = await response.json();

			if (!response.ok) {
				return {
					success: false,
					error: data.error || { code: 'UNKNOWN', message: 'An error occurred' },
				};
			}

			return data;
		} catch (error) {
			return {
				success: false,
				error: {
					code: 'NETWORK_ERROR',
					message: error instanceof Error ? error.message : 'Network error',
				},
			};
		}
	}

	async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { ...options, method: 'GET' });
	}

	async post<T>(
		endpoint: string,
		body?: unknown,
		options?: RequestOptions
	): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			...options,
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined,
		});
	}

	async put<T>(
		endpoint: string,
		body?: unknown,
		options?: RequestOptions
	): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined,
		});
	}

	async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { ...options, method: 'DELETE' });
	}
}

export const api = new ApiClient(API_URL);

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface AuthData {
	token: string;
	user: {
		id: string;
		email: string;
		name: string | null;
		role: string;
		locale: string;
	};
}

export const authApi = {
	login: (data: LoginRequest) => api.post<AuthData>('/auth/login', data),
	register: (data: RegisterRequest) => api.post<AuthData>('/auth/register', data),
};

export interface User {
	id: string;
	email: string;
	name: string | null;
	role: string;
	locale: string;
	createdAt: string;
	updatedAt: string;
}

export const usersApi = {
	list: () => api.get<{ users: User[] }>('/users'),
	get: (id: string) => api.get<{ user: User }>(`/users/${id}`),
};

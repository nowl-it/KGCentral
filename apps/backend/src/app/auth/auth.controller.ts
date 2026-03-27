import { prisma } from '@kgcentral/database';
import { Body, ConflictException, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(1),
});

interface AuthResponse {
	success: boolean;
	data: {
		token?: string;
		user: {
			id: string;
			email: string;
			name: string | null;
			role: string;
			locale: string;
			createdAt?: Date;
		};
	};
}

@Controller('auth')
export class AuthController {
	@Post('login')
	async login(@Body() body: unknown): Promise<AuthResponse> {
		const { email, password } = loginSchema.parse(body);

		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				locale: true,
				password: true,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		// TODO: Implement proper password hashing with bcrypt
		// For now, just compare plain text (NOT for production)
		if (user.password !== password) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const { password: _, ...userWithoutPassword } = user;

		return {
			success: true,
			data: {
				token: 'mock-jwt-token', // TODO: Implement JWT
				user: userWithoutPassword,
			},
		};
	}

	@Post('register')
	async register(@Body() body: unknown): Promise<AuthResponse> {
		const { email, password, name } = registerSchema.parse(body);

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new ConflictException('Email already exists');
		}

		// TODO: Hash password with bcrypt before saving
		const user = await prisma.user.create({
			data: {
				email,
				password, // Should be hashed in production
				name,
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				locale: true,
				createdAt: true,
			},
		});

		return {
			success: true,
			data: { user },
		};
	}
}

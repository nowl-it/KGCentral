import { prisma } from '@kgcentral/database';
import { Body, ConflictException, Controller, Post, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';
const JWT_EXPIRES_IN = '7d';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	username: z.string().min(3).max(30),
	name: z.string().min(1).optional(),
});

interface AuthResponse {
	success: boolean;
	data: {
		token?: string;
		user: {
			id: string;
			email: string;
			username: string;
			name: string | null;
			avatar: string | null;
			role: string;
			locale: string;
			createdAt?: Date;
		};
	};
}

function generateToken(userId: string, email: string, role: string): string {
	return jwt.sign({ sub: userId, email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
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
				username: true,
				name: true,
				avatar: true,
				role: true,
				locale: true,
				password: true,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const { password: _, ...userWithoutPassword } = user;

		return {
			success: true,
			data: {
				token: generateToken(user.id, user.email, user.role),
				user: userWithoutPassword,
			},
		};
	}

	@Post('register')
	async register(@Body() body: unknown): Promise<AuthResponse> {
		const { email, password, username, name } = registerSchema.parse(body);

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email }, { username }],
			},
		});

		if (existingUser) {
			if (existingUser.email === email) {
				throw new ConflictException('Email already exists');
			}
			throw new ConflictException('Username already exists');
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
				name: name || null,
			},
			select: {
				id: true,
				email: true,
				username: true,
				name: true,
				avatar: true,
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

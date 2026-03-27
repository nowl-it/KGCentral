import { prisma } from '@kgcentral/database';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

interface User {
	id: string;
	email: string;
	username: string;
	name: string | null;
	avatar: string | null;
	role: string;
	locale: string;
	createdAt: Date;
	updatedAt: Date;
}

interface UsersListResponse {
	success: boolean;
	data: { users: User[] };
}

interface UserResponse {
	success: boolean;
	data: { user: User };
}

@Controller('users')
export class UsersController {
	@Get()
	async list(): Promise<UsersListResponse> {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				username: true,
				name: true,
				avatar: true,
				role: true,
				locale: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		return { success: true, data: { users } };
	}

	@Get(':id')
	async get(@Param('id') id: string): Promise<UserResponse> {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				username: true,
				name: true,
				avatar: true,
				role: true,
				locale: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}

		return { success: true, data: { user } };
	}
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AuthController } from './auth/auth.controller.js';
import { UsersController } from './users/users.controller.js';

@Module({
	controllers: [AppController, AuthController, UsersController],
})
export class AppModule {}

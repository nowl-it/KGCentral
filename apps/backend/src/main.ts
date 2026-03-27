import { appConfig } from '@kgcentral/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'debug', 'verbose'],
	});

	app.enableCors({
		origin: appConfig.corsOrigins,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});

	const fullVersion = `${appConfig.version}`;
	const version = fullVersion.split('.').slice(0, 1);
	const apiPrefix = `${appConfig.apiPrefix}/v${version}`;

	app.setGlobalPrefix(apiPrefix);

	await app.listen(process.env.PORT || 4000, '0.0.0.0');
	console.log(`Backend running on http://0.0.0.0:${process.env.PORT || 4000}`);
}

bootstrap();

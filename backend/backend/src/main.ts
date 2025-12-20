import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ CorsMiddleware });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

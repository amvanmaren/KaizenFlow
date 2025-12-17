import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(CorsMiddleware)
  // app.use(CorsMiddleware);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specify allowed methods
    credentials: true, // If you need to handle cookies or authorization headers
    allowedHeaders: 'Content-Type, Authorization',
    
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

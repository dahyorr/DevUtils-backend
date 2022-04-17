import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );
  app.enableCors()
  app.setGlobalPrefix('api')
  const PORT = process.env.BACKEND_PORT || 5000
  await app.listen(PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/auth');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: 'https://gestor-utvm-inventario.vercel.app',
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  });

  await app.listen(process.env.PORT ?? 3000);
}
main();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Interceptors from './common/errors/interceptors';

const PORT = Number(process.env.PORT);

const globalInterceptors = [
  new Interceptors.ConflictInterceptor(),
  new Interceptors.DatabaseInterceptor(),
  new Interceptors.UnauthorizedInterceptor(),
  new Interceptors.NotFoundInterceptor(),
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(...globalInterceptors);
  await app.listen(PORT);
}
bootstrap();

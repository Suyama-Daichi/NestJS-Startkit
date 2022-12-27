import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.enableCors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL],
  });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(3000);
}
bootstrap();

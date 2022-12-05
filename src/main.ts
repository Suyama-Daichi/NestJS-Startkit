import { NestFactory } from '@nestjs/core';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(3000);
}
bootstrap();

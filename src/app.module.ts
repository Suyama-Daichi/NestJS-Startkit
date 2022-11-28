import { AppController } from '@controllers/app.controller';
import { Module } from '@nestjs/common';
import { AppService } from '@services/app.service';
import { PrismaService } from '@services/prisma.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}

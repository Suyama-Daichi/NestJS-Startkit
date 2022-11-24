import { AppController } from '@controllers/app.controller';
import { Module } from '@nestjs/common';
import { AppService } from '@services/app.service';
import { PrismaService } from '@services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

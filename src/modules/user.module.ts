import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}

import { PrismaService } from '@/services/prisma.service';
import { UserService } from '@/services/user.service';
import { AuthController } from '@controllers/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService, PrismaService],
})
export class AuthModule {}

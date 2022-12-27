import { AuthService } from '@/services/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ConfigService, UserService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

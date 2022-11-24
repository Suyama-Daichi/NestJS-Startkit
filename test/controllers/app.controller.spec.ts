import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@services/prisma.service';
import { AppController } from '@controllers/app.controller';
import { AppService } from '@services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(appController.getHello()).toBe('Hello World!');
    // });

    it('should return users', async () => {
      expect(await appController.getHello()).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: 1 })]),
      );
    });
  });
});

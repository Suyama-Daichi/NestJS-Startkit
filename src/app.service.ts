import { Injectable } from '@nestjs/common';
import { PrismaService } from './service/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello() {
    // TODO: 元に戻す
    return await this.prisma.user.findMany();
    return 'Hello World!';
  }
}

import { CreateUserRequestDto } from '@/dto/createUser.request.dto';
import { UpdateUserRequestDto } from '@/dto/updateUser.request.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: string) {
    return this.prisma.user.findUnique({ where: { auth_uid: id } });
  }

  async createUser(user: CreateUserRequestDto) {
    const { email, last_name, first_name, auth_uid, email_confirmed } = user;
    return this.prisma.user.upsert({
      where: { auth_uid },
      create: {
        email,
        last_name,
        first_name,
        auth_uid,
        email_confirmed,
      },
      update: { email, last_name, first_name, auth_uid },
    });
  }

  async updateUser(id: string, user: UpdateUserRequestDto) {
    const { email, last_name, first_name, auth_uid, email_confirmed } = user;
    return this.prisma.user.update({
      where: { auth_uid: id },
      data: { email, last_name, first_name, auth_uid, email_confirmed },
    });
  }
}

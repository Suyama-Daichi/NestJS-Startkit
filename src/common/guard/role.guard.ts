import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { Reflector } from '@nestjs/core';
import { Role } from '@/models/role.enum';
import { getUserNameFromIdToken } from '@/helpers/utils.helper';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const targetId = request.params?.id;
    const idToken = request.header('idToken');
    if (!idToken) throw new BadRequestException('idToken is required');
    const username = getUserNameFromIdToken(idToken);

    const user = await this.prisma.user.findUnique({
      where: { auth_uid: username },
    });

    if (!user) throw new UnauthorizedException(undefined);

    // システム管理者は全て許可
    if (user.permission === Role.SYSTEM_ADMIN) return true;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const isSelf = this.reflector.getAllAndOverride<Role[]>('self', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 自分と同一IDのリソースのみ許可
    if (isSelf && targetId !== user.auth_uid) return;
    // ロール指定がなければ拒否
    if (!requiredRoles) return;

    return requiredRoles.some((role) => role === user.permission);
  }
}

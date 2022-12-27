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

/**
 * 操作を認可するガード
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // リソースパスのIDを取得
    const targetResourceId = request.params?.id;
    // idTokenからIDaaSから払い出されたIDを取得する
    const idToken = request.header('idToken');
    if (!idToken) throw new BadRequestException('idToken is required');
    const username = getUserNameFromIdToken(idToken);

    // IDaaSのIDとDatabaseのユーザーレコードを照合する
    const user = await this.prisma.user.findUnique({
      where: { auth_uid: username },
    });

    if (!user) throw new UnauthorizedException(undefined);

    // ユーザーがシステム管理者の場合は全て許可
    if (user.permission === Role.SYSTEM_ADMIN) return true;

    // APIに付与されているロールを取得
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // APIが自身のみ更新可能か取得
    const isSelf = this.reflector.getAllAndOverride<Role[]>('self', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 自分と同一IDのリソースのみ許可
    if (isSelf && targetResourceId !== user.auth_uid) return;
    // ロール指定がなければ拒否
    if (!requiredRoles) return;

    return requiredRoles.some((role) => role === user.permission);
  }
}

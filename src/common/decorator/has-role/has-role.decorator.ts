import { Role } from '@/models/role.enum';
import { SetMetadata } from '@nestjs/common';

/** ロールを指定するデコレータ */
export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

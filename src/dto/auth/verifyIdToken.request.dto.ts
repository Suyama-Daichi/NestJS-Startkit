import { IsOptional } from 'class-validator';

/** アクセストークンを検証するためのパラメータ */
export class VerifyAccessTokenDto {
  @IsOptional()
  accessToken: string;
}

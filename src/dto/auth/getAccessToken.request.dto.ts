import { IsString } from 'class-validator';

/** トークンを更新するためのパラメータ */
export class GetAccessTokenDto {
  @IsString()
  refreshToken: string;
}

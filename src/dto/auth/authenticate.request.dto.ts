import { IsString } from 'class-validator';

/** ログインに必要なパラメータ */
export class AuthenticateRequestDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

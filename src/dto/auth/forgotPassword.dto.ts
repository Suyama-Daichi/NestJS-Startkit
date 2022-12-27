import { IsString } from 'class-validator';

/** パスワードを再設定するときのパラメータ */
export class ForgotPasswordRequestDto {
  /** name or Email */
  @IsString()
  name: string;
}

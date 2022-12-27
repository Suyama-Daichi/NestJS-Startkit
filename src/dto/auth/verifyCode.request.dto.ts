import { IsNumberString, IsString } from 'class-validator';

/** コード認証に必要なパラメータ */
export class VerifyCodeRequestDto {
  /** name or Email */
  @IsString()
  name: string;

  @IsNumberString()
  code: string;
}

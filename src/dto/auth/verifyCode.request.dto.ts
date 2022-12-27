import { IsNumberString, IsString } from 'class-validator';

export class VerifyCodeRequestDto {
  /** name or Email */
  @IsString()
  name: string;

  @IsNumberString()
  code: string;
}

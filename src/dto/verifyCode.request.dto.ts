import { IsNumber, IsString } from 'class-validator';

export class VerifyCodeRequestDto {
  /** name or Email */
  @IsString()
  name: string;

  @IsNumber()
  code: number;
}

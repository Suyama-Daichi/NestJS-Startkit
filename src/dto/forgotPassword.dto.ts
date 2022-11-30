import { IsString } from 'class-validator';

export class ForgotPasswordRequestDto {
  /** name or Email */
  @IsString()
  name: string;
}

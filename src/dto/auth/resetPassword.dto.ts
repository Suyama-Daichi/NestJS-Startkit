import { IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordRequestDto {
  /** name or Email */
  @IsString()
  name: string;

  @IsNumber()
  code: number;

  @IsString()
  @MinLength(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  password: string;
}

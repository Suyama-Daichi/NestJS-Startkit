import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordRequestDto {
  /** name or Email */
  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  old_password: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  password: string;
}

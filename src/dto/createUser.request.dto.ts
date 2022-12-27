import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  auth_uid: string;

  @IsBoolean()
  email_confirmed: boolean;
}

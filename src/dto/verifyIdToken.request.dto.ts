import { IsString } from 'class-validator';

export class VerifyIdTokenDto {
  @IsString()
  accessToken: string;
}

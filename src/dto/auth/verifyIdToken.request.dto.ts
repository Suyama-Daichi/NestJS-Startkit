import { IsOptional } from 'class-validator';

export class VerifyAccessTokenDto {
  @IsOptional()
  accessToken: string;
}

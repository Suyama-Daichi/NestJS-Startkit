import { IsString } from 'class-validator';

export class GetAccessTokenDto {
  @IsString()
  refreshToken: string;
}

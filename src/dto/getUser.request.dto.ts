import { IsDefined, IsString } from 'class-validator';

export class FindUniqueDto {
  @IsDefined()
  @IsString()
  id: string;
}

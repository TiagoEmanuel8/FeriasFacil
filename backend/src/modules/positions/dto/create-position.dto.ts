import { IsString } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  name: string;
}

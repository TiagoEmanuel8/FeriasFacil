import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVacationDto {
  @IsNotEmpty()
  @IsNumber()
  vacationPeriod: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startVacation: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endVacation: Date;

  @IsNotEmpty()
  @IsNumber()
  idUser: number;
}

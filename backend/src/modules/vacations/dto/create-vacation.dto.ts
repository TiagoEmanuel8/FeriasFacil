import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

export class SingleVacationDto {
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
}

export class CreateVacationDto {
  @IsNotEmpty()
  @IsNumber()
  idUser: number;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SingleVacationDto)
  vacations: SingleVacationDto[];
}

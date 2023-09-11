import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
  ValidateNested,
  IsString,
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

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate: Date;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SingleVacationDto)
  vacations: SingleVacationDto[];
}
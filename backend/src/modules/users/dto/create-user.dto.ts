import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate: Date;

  @IsNotEmpty()
  @IsNumber()
  idPosition: number;

  @IsNotEmpty()
  @IsString()
  type: string;
}

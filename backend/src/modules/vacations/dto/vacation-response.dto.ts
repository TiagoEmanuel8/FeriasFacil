export class SingleVacationDto {
  id: number;
  vacationPeriod: number;
  startVacation: string;
  endVacation: string;
}

export class VacationDto {
  idUser: number;
  vacations: SingleVacationDto[];
  user?: UserExistDto;
}

export class UserExistDto {
  id: number;
  email: string;
  name: string;
  hireDate: Date;
  type: string;
}

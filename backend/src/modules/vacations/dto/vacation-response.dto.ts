export class VacationDto {
  id: number;
  vacationPeriod: number;
  startVacation: string;
  endVacation: string;
  idUser: number;
  user?: UserExistDto;
}

export class UserExistDto {
  id: number;
  email: string;
  name: string;
  hireDate: Date;
  type: string;
}

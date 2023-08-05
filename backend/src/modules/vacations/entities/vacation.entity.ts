interface IUser {
  id: number;
  email: string;
  name: string;
  hireDate: Date;
  type: string;
}

interface IVacationEntityInterface {
  id?: number;
  vacationPeriod: number;
  startVacation: Date;
  endVacation: Date;
  idUser: number;
  createdAt?: Date;
}

export class VacationEntity implements IVacationEntityInterface {
  vacationPeriod: number;
  startVacation: Date;
  endVacation: Date;
  idUser: number;
  user?: IUser;
}

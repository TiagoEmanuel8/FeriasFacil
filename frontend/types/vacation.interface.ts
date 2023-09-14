import { User } from './user.interface';

export interface Vacation {
  id: number;
  vacationPeriod: number;
  startVacation: string;
  endVacation: string;
  idUser: number;
  user: User;
}
interface IUserEntityInterface {
  id?: number;
  email: string;
  password: string;
  name: string;
  idPosition: number;
  hireDate: Date;
  createdAt?: Date;
}

export class UserEntity implements IUserEntityInterface {
  email: string;
  password: string;
  name: string;
  idPosition: number;
  positionName?: string;
  hireDate: Date;
}

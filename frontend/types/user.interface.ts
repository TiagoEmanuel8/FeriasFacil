export interface User {
  id: number;
  email: string;
  name: string;
  hireDate: string;
  type: string;
}

export interface IUserFormData {
  email: string;
  password: string;
  name: string;
  hireDate: string;
  idPosition?: string;
}

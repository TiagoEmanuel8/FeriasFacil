export class UserDto {
  id: number;
  email: string;
  name: string;
  hireDate: string;
  type: string;
  idPosition: number;
  position?: PositionDto;
}

export class PositionDto {
  id: number;
  position: string;
}

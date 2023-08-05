interface IPositionEntityInterface {
  id?: number;
  position: string;
  createdAt?: Date;
}

export class PositionEntity implements IPositionEntityInterface {
  id?: number;
  position: string;
  createdAt?: Date;

  constructor(position: string) {
    this.position = position;
  }
}

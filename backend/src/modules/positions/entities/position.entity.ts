import { User } from '@prisma/client';

export class PositionEntity implements User {
  id?: number;
  name: string;
  createdAt?: Date;
}

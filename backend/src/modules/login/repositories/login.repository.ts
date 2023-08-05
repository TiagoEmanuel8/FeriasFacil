import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class LoginRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verifyExisteField(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}

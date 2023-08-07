import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto, PositionDto } from '../dto/user-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '@prisma/client';

interface IUserWithPosition extends User {
  position: PositionDto;
}

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapUserToDto(user: any): any {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      idPosition: user.idPosition,
      type: user.type,
      hireDate: user.hireDate.toISOString().split('T')[0],
      position: user.position
        ? {
            id: user.position.id,
            position: user.position.position,
          }
        : undefined,
      vacations: user.vacations?.map((vacation) => ({
        id: vacation.id,
        vacationPeriod: vacation.vacationPeriod,
        startVacation: vacation.startVacation.toISOString().split('T')[0],
        endVacation: vacation.endVacation.toISOString().split('T')[0],
      })),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.prisma.user.create({
      data: createUserDto,
      include: { position: true },
    });
    return this.mapUserToDto(newUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      include: { position: true },
    });
    return users.map(this.mapUserToDto);
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { position: true, vacations: true },
    });
    if (!user) return null;
    return this.mapUserToDto(user);
  }

  async verifyExisteField(email: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async update(id: number, updatePositionDto: UpdateUserDto): Promise<UserDto> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: updatePositionDto,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateVacationDto } from '../dto/create-vacation.dto';
import { VacationDto, UserExistDto } from '../dto/vacation-response.dto';
import { UpdateVacationDto } from '../dto/update-vacation.dto';
// import { VacationEntity } from '../entities/vacation.entity';
import { Vacation } from '@prisma/client';

interface IVacationWithPosition extends Vacation {
  user: UserExistDto;
}

@Injectable()
export class VacationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapVacationToDto(vacation: IVacationWithPosition): VacationDto {
    return {
      id: vacation.id,
      vacationPeriod: vacation.vacationPeriod,
      startVacation: vacation.startVacation.toISOString().split('T')[0],
      endVacation: vacation.endVacation.toISOString().split('T')[0],
      idUser: vacation.idUser,
      user: vacation.user
        ? {
            id: vacation.user.id,
            email: vacation.user.email,
            name: vacation.user.name,
            hireDate: new Date(
              vacation.user.hireDate.toISOString().split('T')[0],
            ),
            type: vacation.user.type,
          }
        : undefined,
    };
  }

  async create(createVacationDto: CreateVacationDto): Promise<VacationDto> {
    const newVacation = await this.prisma.vacation.create({
      data: createVacationDto,
      include: { user: true },
    });
    return this.mapVacationToDto(newVacation);
  }

  async findAll(): Promise<VacationDto[]> {
    const vacations = await this.prisma.vacation.findMany({
      include: { user: true },
    });
    return vacations.map(this.mapVacationToDto);
  }

  async findOne(id: number): Promise<VacationDto> {
    const vacation = await this.prisma.vacation.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!vacation) return null;
    return this.mapVacationToDto(vacation);
  }

  // async verifyExisteField(email: string): Promise<VacationEntity> {
  //   return this.prisma.vacation.findFirst({
  //     where: {
  //       email,
  //     },
  //   });
  // }

  async update(
    id: number,
    updateVacationDto: UpdateVacationDto,
  ): Promise<VacationDto> {
    await this.prisma.vacation.update({
      where: {
        id,
      },
      data: updateVacationDto,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.vacation.delete({
      where: {
        id,
      },
    });
  }
}

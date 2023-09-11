import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateVacationDto } from '../dto/create-vacation.dto';
import { UserExistDto } from '../dto/vacation-response.dto';
import { UpdateVacationDto } from '../dto/update-vacation.dto';
import { Vacation } from '@prisma/client';

interface IVacationWithPosition extends Vacation {
  user: UserExistDto;
}

@Injectable()
export class VacationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapVacationToDto(vacation: IVacationWithPosition) {
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

  async createMultipleVacations(createVacationDto: CreateVacationDto) {
    const { idUser, vacations } = createVacationDto;

    const vacationData = vacations.map((vacation) => ({
      ...vacation,
      idUser,
    }));

    await this.prisma.vacation.createMany({
      data: vacationData,
      skipDuplicates: true,
    });

    const startDates = vacations.map((v) => v.startVacation);
    const createdVacations = await this.prisma.vacation.findMany({
      where: {
        idUser,
        startVacation: { in: startDates },
      },
      include: { user: true },
    });

    return createdVacations.map(this.mapVacationToDto);
  }

  async findAll() {
    const vacations = await this.prisma.vacation.findMany({
      include: { user: true },
    });
    return vacations.map(this.mapVacationToDto);
  }

  async findOne(idUser: number) {
    const vacation = await this.prisma.vacation.findMany({
      where: { idUser },
      include: { user: true },
    });
    if (!vacation) return null;
    return vacation;
  }

  // async verifyExisteField(email: string): Promise<VacationEntity> {
  //   return this.prisma.vacation.findFirst({
  //     where: {
  //       email,
  //     },
  //   });
  // }

  async update(id: number, updateVacationDto: UpdateVacationDto) {
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
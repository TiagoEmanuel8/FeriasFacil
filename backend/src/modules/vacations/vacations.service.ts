import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { VacationRepository } from './repositories/vacations.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';
import { differenceInMonths } from 'date-fns';

@Injectable()
export class VacationsService {
  constructor(private readonly repository: VacationRepository) {}
  // primeiro período de férias só pode ser agendado para iniciar-se pelo menos 12 meses após a data de contratação.

  // Não deve permitir cadastro de períodos de férias que se sobreponham, para um mesmo colaborador.

  // As férias podem ser fracionadas em até três períodos, desde que um deles não seja ser inferior a 14 dias corridos e os demais não sejam inferiores a cinco dias corridos, segundo a Reforma Trabalhista (Lei 13.467/2017).

  async create(createVacationDto: CreateVacationDto) {
    const monthsSinceHire = differenceInMonths(
      new Date(createVacationDto.vacations[0].startVacation),
      new Date(createVacationDto.hireDate),
    );

    if (monthsSinceHire < 12) {
      throw new BadRequestError(
        'Não é possível registrar férias antes de 12 meses de contratação.',
      );
    }

    const totalVacationDays = createVacationDto.vacations.reduce(
      (acc, vacation) => acc + vacation.vacationPeriod,
      0,
    );

    if (totalVacationDays !== 30) {
      throw new BadRequestError(
        'O total de dias de férias deve somar 30 dias.',
      );
    }

    // for (const newVacation of createVacationDto.vacations) {
    //   const isOverlapping = await this.repository.checkOverlappingVacations(
    //     createVacationDto.idUser,
    //     new Date(newVacation.startVacation),
    //     new Date(newVacation.endVacation),
    //   );

    //   if (isOverlapping) {
    //     throw new BadRequestError(
    //       'Não é permitido cadastrar períodos de férias que se sobreponham.',
    //     );
    //   }
    // }

    const periods = createVacationDto.vacations.map(
      (vacation) => vacation.vacationPeriod,
    );

    const hasAtLeastOnePeriodOf14Days = periods.includes(14);
    if (!hasAtLeastOnePeriodOf14Days) {
      throw new BadRequestError(
        'Ao fracionar férias, um dos períodos deve ter no mínimo 14 dias.',
      );
    }

    const otherPeriods = periods.filter((period) => period !== 14);
    for (let i = 0; i < otherPeriods.length; i++) {
      if (otherPeriods[i] < 5) {
        throw new BadRequestError(
          'Os períodos fracionados subsequentes de férias devem ter no mínimo 5 dias.',
        );
      }
    }

    const vacationsToCreate = createVacationDto.vacations.map((vacation) => ({
      ...vacation,
      idUser: createVacationDto.idUser,
    }));

    return await this.repository.createMultipleVacations({
      idUser: createVacationDto.idUser,
      name: createVacationDto.name,
      hireDate: createVacationDto.hireDate,
      vacations: vacationsToCreate,
    });
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findVacationUser(id: number) {
    const user = await this.repository.findVacationUser(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return user;
  }

  async update(id: number, updateVacationDto: UpdateVacationDto, userReq: any) {
    const user = await this.repository.findOne(id);

    if (!user) throw new NotFoundError(`User ${id} is not found`);

    if (user.user.id !== userReq.id || userReq.type === 'adm') {
      throw new UnauthorizedError(
        'You are not authorized to update this vacation',
      );
    }
    return await this.repository.update(id, updateVacationDto);
  }

  async remove(id: number, userReq: any): Promise<void> {
    const vacation = await this.repository.findOne(id);

    if (!vacation) throw new NotFoundError(`Vacation ${id} is not found`);

    if (vacation.user.id !== userReq.id || userReq.type === 'adm') {
      throw new UnauthorizedError(
        'You are not authorized to exclude this vacation',
      );
    }
    await this.repository.remove(id);
  }
}

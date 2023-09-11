import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { VacationRepository } from './repositories/vacations.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';

@Injectable()
export class VacationsService {
  constructor(private readonly repository: VacationRepository) {}
  // primeiro período de férias só pode ser agendado para iniciar-se pelo menos 12 meses após a data de contratação.

  // Não deve permitir cadastro de períodos de férias que se sobreponham, para um mesmo colaborador.

  // As férias podem ser fracionadas em até três períodos, desde que um deles não seja ser inferior a 14 dias corridos e os demais não sejam inferiores a cinco dias corridos, segundo a Reforma Trabalhista (Lei 13.467/2017).

  async create(createVacationDto: CreateVacationDto) {
    console.log(createVacationDto);

    const vacationsToCreate = createVacationDto.vacations.map((vacation) => ({
      ...vacation,
      idUser: createVacationDto.idUser,
    }));

    // implementar validações para as datas .. o frontend apenas vai mandar as datas para o backend, o backend vai fazer as validações

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

  async findOne(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return user;
  }

  async update(id: number, updateVacationDto: UpdateVacationDto, userReq: any) {
    if (userReq.id !== id) {
      throw new UnauthorizedError(
        'You are not authorized to update this vacation',
      );
    }
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return await this.repository.update(id, updateVacationDto);
  }

  async remove(id: number, userReq: any): Promise<void> {
    if (userReq.id !== id) {
      throw new UnauthorizedError(
        'You are not authorized to exclude this vacation',
      );
    }
    const vacation = await this.repository.findOne(id);
    if (!vacation) throw new NotFoundError(`Vacation ${id} is not found`);
    await this.repository.remove(id);
  }
}
import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { VacationRepository } from './repositories/vacations.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class VacationsService {
  constructor(private readonly repository: VacationRepository) {}

  async create(createVacationDto: CreateVacationDto) {
    return await this.repository.create(createVacationDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return user;
  }

  update(id: number, updateVacationDto: UpdateVacationDto) {
    return `This action updates a #${id} vacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacation`;
  }
}

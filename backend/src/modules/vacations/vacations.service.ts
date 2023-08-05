import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { VacationRepository } from './repositories/vacations.repository';

@Injectable()
export class VacationsService {
  constructor(private readonly repository: VacationRepository) {}

  async create(createVacationDto: CreateVacationDto) {
    return await this.repository.create(createVacationDto);
  }

  findAll() {
    return `This action returns all vacations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacation`;
  }

  update(id: number, updateVacationDto: UpdateVacationDto) {
    return `This action updates a #${id} vacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacation`;
  }
}

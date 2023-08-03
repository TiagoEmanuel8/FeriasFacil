import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './repositories/position.repository';

@Injectable()
export class PositionsService {
  constructor(private readonly repository: PositionRepository) {}

  async create(position: CreatePositionDto) {
    return await this.repository.create(position);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    return await this.repository.update(id, updatePositionDto);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}

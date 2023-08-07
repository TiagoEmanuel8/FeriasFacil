// import { ConflictError } from 'src/common/errors/types/ConflictError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './repositories/position.repository';

@Injectable()
export class PositionsService {
  constructor(private readonly repository: PositionRepository) {}

  async create(createPositionDto: CreatePositionDto) {
    // const { position } = createPositionDto;
    // const verifyPosition = await this.repository.verifyExisteField(position);
    // if (verifyPosition) throw new ConflictError('position already exists');

    return await this.repository.create(createPositionDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const position = await this.repository.findOne(id);
    if (!position) throw new NotFoundError(`Position ${id} is not found`);
    return position;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.repository.findOne(id);
    if (!position) throw new NotFoundError(`Position ${id} is not found`);
    return await this.repository.update(id, updatePositionDto);
  }

  async remove(id: number) {
    const position = await this.repository.findOne(id);
    if (!position) throw new NotFoundError(`Position ${id} is not found`);
    await this.repository.remove(id);
  }
}

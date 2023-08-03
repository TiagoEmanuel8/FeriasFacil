import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}

  async create(position: CreatePositionDto) {
    return await this.prisma.position.create({ data: position });
  }

  async findAll() {
    return '';
  }

  async findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  async remove(id: number) {
    return `This action removes a #${id} position`;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { PositionEntity } from '../entities/position.entity';

@Injectable()
export class PositionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPositionDto: CreatePositionDto): Promise<PositionEntity> {
    return this.prisma.position.create({
      data: createPositionDto,
    });
  }

  async findAll(): Promise<PositionEntity[]> {
    return await this.prisma.position.findMany();
  }

  async findOne(id: number): Promise<PositionEntity> {
    return this.prisma.position.findUnique({
      where: {
        id,
      },
    });
  }

  async verifyExisteField(position: string): Promise<PositionEntity> {
    return this.prisma.position.findFirst({
      where: {
        position,
      },
    });
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<PositionEntity> {
    return this.prisma.position.update({
      where: {
        id,
      },
      data: updatePositionDto,
    });
  }

  async remove(id: number): Promise<PositionEntity> {
    return this.prisma.position.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { PositionEntity } from '../entities/position.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPositionDto: CreatePositionDto): Promise<PositionEntity> {
    return this.prisma.position.create({
      data: createPositionDto,
    });
  }

  async findAll(): Promise<PositionEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<PositionEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<PositionEntity> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updatePositionDto,
    });
  }

  async remove(id: number): Promise<PositionEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

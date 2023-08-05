import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PositionRepository } from './repositories/position.repository';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, PrismaService, PositionRepository],
})
export class PositionsModule {}

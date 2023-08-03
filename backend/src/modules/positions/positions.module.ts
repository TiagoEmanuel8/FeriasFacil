import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, PrismaService],
})
export class PositionsModule {}

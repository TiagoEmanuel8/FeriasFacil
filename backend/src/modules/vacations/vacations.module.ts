import { Module } from '@nestjs/common';
import { VacationsService } from './vacations.service';
import { VacationsController } from './vacations.controller';
import { PrismaService } from 'src/database/prisma.service';
import { VacationRepository } from './repositories/vacations.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [VacationsController],
  providers: [
    VacationsService,
    PrismaService,
    VacationRepository,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class VacationsModule {}

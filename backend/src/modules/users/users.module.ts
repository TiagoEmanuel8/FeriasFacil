import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './repositories/users.repository';
import { PasswordHashService } from 'src/common/encryption/password-hash';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    UserRepository,
    PasswordHashService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class UsersModule {}

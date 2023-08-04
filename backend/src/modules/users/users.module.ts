import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './repositories/users.repository';
import { PasswordHashService } from 'src/common/encryption/password-hash';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository, PasswordHashService],
})
export class UsersModule {}

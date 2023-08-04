import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/database/prisma.service';
import { LoginRepository } from './repositories/login.repository';
import { PasswordHashService } from 'src/common/encryption/password-hash';
import { JwtConfigModule } from '../auth/jwt-config.module';

@Module({
  imports: [JwtConfigModule],
  controllers: [LoginController],
  providers: [
    LoginService,
    PrismaService,
    LoginRepository,
    PasswordHashService,
  ],
})
export class LoginModule {}

import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginRepository } from './repositories/login.repository';
import { PasswordHashService } from '../../common/encryption/password-hash';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';

@Injectable()
export class LoginService {
  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createLoginDto: CreateLoginDto): Promise<string> {
    const user = await this.loginRepository.verifyExisteField(
      createLoginDto.email,
    );

    if (
      !user ||
      !(await this.passwordHashService.comparePasswords(
        createLoginDto.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const payload = { id: user.id, type: user.type };
    const token = this.jwtService.sign(payload);

    // fazer tratamento de autenticação totalmente aqui ... retirar do frontend essa parte e jogar aqui
    // deixar todas as regras de negócio aqui

    return JSON.stringify(token);
  }
}

import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';
import { Prisma } from '@prisma/client';
import { PasswordHashService } from 'src/common/encryption/password-hash';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
  ) {}
  // deixar todas as regras de negócio aqui

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const verifyEmail = await this.repository.verifyExisteField(email);
    if (verifyEmail) throw new ConflictError('email already exists');

    const hashedPassword = await this.passwordHashService.hashPassword(
      password,
    );
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.repository.create(userWithHashedPassword);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return await this.repository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    try {
      await this.repository.remove(id);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundError(`User ${id} is not found`);
      }
      throw error;
    }
  }
}
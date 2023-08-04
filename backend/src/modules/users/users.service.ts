import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const verifyEmail = await this.repository.verifyExisteField(email);
    if (verifyEmail) throw new ConflictError('email already exists');

    return await this.repository.create(createUserDto);
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

  async remove(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    return await this.repository.remove(id);
  }
}

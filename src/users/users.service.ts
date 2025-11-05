import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RandomPassword } from 'common/helpers/RandomPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //Generamos contrasena aleatoria.
    const longPassword: number = 12;
    const password: string =
      RandomPassword.generarContrasenaAleatoria(longPassword);

    const user = {
      ...createUserDto,
      password,
    };

    try {
      const userDB = this.userRepository.create(user);
      await this.userRepository.save(userDB);
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

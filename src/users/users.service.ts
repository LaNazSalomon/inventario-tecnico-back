import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RandomPassword } from 'src/common/helpers/RandomPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Puesto } from 'src/puesto/entities/puesto.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Puesto)
    private readonly puestoRepository: Repository<Puesto>,
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //Generamos contrasena aleatoria.
    //TODO: Encriptar contrasena
    const longPassword: number = 12;
    const password: string =
      RandomPassword.generarContrasenaAleatoria(longPassword);

    try {
      //Primero vamos por el departamento
      const departamento = await this.departamentoRepository.findOneBy({
        idDepartamento: createUserDto.idDepartamento,
      });

      if (!departamento) {
        throw new BadRequestException('Departamento no encontrado');
      }

      //Ahora buscaremos nuestro puesto

      const puesto = await this.puestoRepository.findOneBy({
        idPuesto: createUserDto.idPuesto,
      });

      if (!puesto) {
        throw new BadRequestException('No se pudo encontrar el puesto');
      }

      //Si se encontro todo creamos el usuario

      const user = {
        ...createUserDto,
        Departamento: departamento,
        Puesto: puesto,
        password,
      };

      const userDB = this.userRepository.create(user);
      await this.userRepository.save(userDB);

      return userDB;

    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Users');
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

  //Logica del login
  
}

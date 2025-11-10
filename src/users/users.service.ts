import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RandomPassword } from 'src/common/helpers/RandomPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Puesto } from 'src/puesto/entities/puesto.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { LoginDto } from 'src/puesto/dto/login.dto';
import { MensajePassword } from 'src/common/helpers/MensajePassword.email';
import { CONSTANTES } from 'src/common/helpers/constantes.helper';
import { CreateEmailDto } from 'src/emails/dto/create-email.dto';
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Puesto)
    private readonly puestoRepository: Repository<Puesto>,
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    private readonly emailsServices: EmailsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //Generamos contrasena aleatoria.
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

      //Creacion del correo
      const correo: CreateEmailDto = {
        to: createUserDto.email,
        subject: CONSTANTES.TITULO_PASSWORD,
        text: `Su numero de usuario es: ${createUserDto.numeroEmpleado}
            Contraseña para el sistema: ${password}`,
        html: MensajePassword.CorreoDatosHTML(
          createUserDto.nombreEmpleado,
          createUserDto.numeroEmpleado,
          password,
        ),
      };

      //Si se encontro todo creamos el usuario
      //Encriptacion de contrasena
      const passwordEncript = RandomPassword.Encriptar(password);

      const user = {
        ...createUserDto,
        puesto,
        departamento,
        password: passwordEncript,
      };

      const userDB = this.userRepository.create(user);
      await this.userRepository.save(userDB);

      

      //TODO: Implementar el envio de correos
      this.emailsServices.sendMail(correo);
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

  //--------------------------Logica del login--------------------------
  async login(loginDto: LoginDto) {
    const { numeroEmpleado, password } = loginDto;

    const userInDB = await this.userRepository.findOne({
      where: { numeroEmpleado },
      select: { idEmpleado: true, numeroEmpleado: true, password: true },
    });

    if (!userInDB) {
      throw new UnauthorizedException(
        'No se encontro ningun usuario con este numero',
      );
    }
  }
}

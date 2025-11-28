import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RandomPassword } from 'src/common/helpers/RandomPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Puesto } from 'src/puesto/entities/puesto.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { LoginDto } from 'src/users/dto/login.dto';
import { MensajePassword } from 'src/common/helpers/MensajePassword.email';
import { CONSTANTES } from 'src/common/helpers/constantes.helper';
import { CreateEmailDto } from 'src/emails/dto/create-email.dto';
import { EmailsService } from 'src/emails/emails.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

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
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  //* ------------------------------ Crear usuario ------------------------------
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

      this.emailsServices.sendMail(correo);
      return userDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Users');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 50, offset = 0 } = paginationDto;

    const users = await this.userRepository.find({ take: limit, skip: offset });

    return users;
  }

  async findByTerm(term: string) {
    let users: User | User[] | null;

    if (isUUID(term)) {
      users = await this.userRepository.findOne({
        where: { idEmpleado: term },
      });
    } else {
      const queryBuilder = this.userRepository.createQueryBuilder('user');

      users = await queryBuilder
        .leftJoinAndSelect('user.puesto', 'puesto')
        .leftJoinAndSelect('user.departamento', 'departamento')
        .where(
          `(
        CAST(user.numeroEmpleado AS TEXT) ILIKE :term OR
        user.nombreEmpleado ILIKE :term OR
        user.apellidoPaterno ILIKE :term OR
        user.apellidoMaterno ILIKE :term OR
        user.email ILIKE :term OR
        CAST(user.rol AS TEXT) ILIKE :term OR
        puesto.nombre ILIKE :term OR
        departamento.nombre ILIKE :term
      )`,
          { term: `%${term}%` },
        )
        .getMany();
    }

    if (!users) throw new NotFoundException('No se encontro ningun usuario');

    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { idPuesto, idDepartamento, ...datosActualizados } = updateUserDto;

      // Cargar el usuario existente y aplicar los cambios
      const usuario = await this.userRepository.preload({
        idEmpleado: id,
        ...datosActualizados,
      });

      if (!usuario) {
        throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
      }

      // Actualizar el puesto si se proporciona
      if (idPuesto) {
        const nuevoPuesto = await queryRunner.manager.findOne(Puesto, {
          where: { idPuesto },
        });

        if (!nuevoPuesto) {
          throw new NotFoundException(
            `No se encontró el puesto con ID ${idPuesto}`,
          );
        }

        usuario.puesto = nuevoPuesto;
      }

      // Actualizar el departamento si se proporciona
      if (idDepartamento) {
        const nuevoDepartamento = await queryRunner.manager.findOne(
          Departamento,
          {
            where: { idDepartamento },
          },
        );

        if (!nuevoDepartamento) {
          throw new NotFoundException(
            `No se encontró el departamento con ID ${idDepartamento}`,
          );
        }

        usuario.departamento = nuevoDepartamento;
      }

      // Guardar los cambios
      await queryRunner.manager.save(usuario);
      await queryRunner.commitTransaction();

      return `Usuario actualizado correctamente`;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      ManejadorErroresDB.erroresDB(err, 'UserService');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findByTerm(id);

      if (!user) {
        throw new NotFoundException(
          `No se encontró usuario con idEmpleado: ${id}`,
        );
      }

      await this.userRepository.remove(Array.isArray(user) ? user[0] : user);
      return 'Se elimino correctamente';
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Users');
    }
  }

  //--------------------------Logica del login--------------------------
  async login(loginDto: LoginDto) {
    const { numeroEmpleado, password } = loginDto;

    const userInDB = await this.userRepository.findOne({
      where: { numeroEmpleado },
      select: {
        idEmpleado: true,
        nombreEmpleado: true,
        apellidoMaterno: true,
        apellidoPaterno: true,
        numeroEmpleado: true,
        password: true,
        rol: true,
      },
    });

    if (!userInDB) {
      throw new UnauthorizedException(
        'No se encontro ningun usuario con este numero',
      );
    }

    /*
    if (!bcrypt.compareSync(password, userInDB.password)) {
      throw new UnauthorizedException('Credenciales incorrectas (contraseña)');
    }
*/
    const nombreCompleto: string = `${userInDB.nombreEmpleado} ${userInDB.apellidoPaterno} ${userInDB.apellidoMaterno}`;

    return {
      numeroEmpleado: userInDB.numeroEmpleado,
      idEmpleado: userInDB.idEmpleado,
      nombre: nombreCompleto,
      rol: userInDB.rol,
      token: this.getJwtToken({ id: userInDB.idEmpleado }),
    };
  }

  //-------------------------Generacion del JWT-------------------------
  private getJwtToken(payolad: JwtPayload) {
    const token = this.jwtService.sign(payolad);
    return token;
  }
}

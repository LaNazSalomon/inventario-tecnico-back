import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mouse } from './entities/mouse.entity';
import { CreateMouseDto } from './dto/create-mouse.dto';
import { UpdateMouseDto } from './dto/update-mouse.dto';
import { User } from 'src/users/entities/user.entity';
import { isUUID } from 'class-validator';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MouseService {
  constructor(
    @InjectRepository(Mouse)
    private readonly mouseRepository: Repository<Mouse>,

    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoRepository: Repository<EstadoFuncionamiento>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(EquiposComputo)
    private readonly equipoRepository: Repository<EquiposComputo>,

    @InjectRepository(UnidadAcademica)
    private readonly unidadAcademicaRepository: Repository<UnidadAcademica>,

    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createDto: CreateMouseDto) {
    // Validar relaciones antes de crear
    const estado = await this.estadoRepository.findOneBy({
      id: createDto.idEstado,
    });
    if (!estado) {
      throw new NotFoundException(
        `Estado con ID ${createDto.idEstado} no encontrado`,
      );
    }

    const empleado = await this.userRepository.findOneBy({
      idEmpleado: createDto.idEmpleado,
    });
    if (!empleado) {
      throw new NotFoundException(
        `Empleado con ID ${createDto.idEmpleado} no encontrado`,
      );
    }

    const equipo = await this.equipoRepository.findOneBy({
      id: createDto.idEquipo,
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo con ID ${createDto.idEquipo} no encontrado`,
      );
    }

    const unidadAcademica = await this.unidadAcademicaRepository.findOneBy({
      idUnidadAcademica: createDto.idUnidadAcademica,
    });
    if (!unidadAcademica) {
      throw new NotFoundException(
        `Unidad académica con ID ${createDto.idUnidadAcademica} no encontrada`,
      );
    }

    const departamento = await this.departamentoRepository.findOneBy({
      idDepartamento: createDto.idDepartamento,
    });
    if (!departamento) {
      throw new NotFoundException(
        `Departamento con ID ${createDto.idDepartamento} no encontrado`,
      );
    }

    // Crear el mouse con relaciones validadas
    const mouse = this.mouseRepository.create({
      numeroInventario: createDto.numeroInventario,
      marca: createDto.marca,
      modelo: createDto.modelo,
      tipoConector: createDto.tipoConector,
      mecanismo: createDto.mecanismo,
      serie: createDto.serie,
      fechaVencimientoGarantia: createDto.fechaVencimientoGarantia,
      estado,
      empleado,
      equipo,
      unidadAcademica,
      departamento,
    });

    return await this.mouseRepository.save(mouse);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { idUnidadAcademica } = paginationDto || {};

    return await this.mouseRepository.find({
      where: idUnidadAcademica
        ? { unidadAcademica: { idUnidadAcademica } }
        : {},
      relations: [
        'estado',
        'empleado',
        'equipo',
        'unidadAcademica',
        'departamento',
      ],
    });
  }

  async findByTerm(
    term: string,
    paginationDto?: PaginationDto,
  ): Promise<Mouse | Mouse[]> {
    const { idUnidadAcademica } = paginationDto || {};

    if (isUUID(term)) {
      const mouse = await this.mouseRepository.findOne({
        where: {
          idMouse: term,
          ...(idUnidadAcademica
            ? { unidadAcademica: { idUnidadAcademica } }
            : {}),
        },
        relations: [
          'estado',
          'empleado',
          'equipo',
          'unidadAcademica',
          'departamento',
        ],
      });
      if (!mouse) {
        throw new NotFoundException(
          `No se encontró ningún mouse con el ID: ${term}`,
        );
      }
      return mouse;
    } else {
      const queryBuilder = this.mouseRepository
        .createQueryBuilder('mouse')
        .leftJoinAndSelect('mouse.estado', 'estado')
        .leftJoinAndSelect('mouse.empleado', 'empleado')
        .leftJoinAndSelect('mouse.equipo', 'equipo')
        .leftJoinAndSelect('mouse.unidadAcademica', 'unidadAcademica')
        .leftJoinAndSelect('mouse.departamento', 'departamento');

      if (idUnidadAcademica) {
        queryBuilder.where('mouse.unidadAcademica = :idUnidadAcademica', {
          idUnidadAcademica,
        });
      }

      const mice = await queryBuilder
        .andWhere('mouse.marca ILIKE :term', { term: `%${term}%` })
        .orWhere('mouse.modelo ILIKE :term', { term: `%${term}%` })
        .orWhere('mouse.serie ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!mice || mice.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún mouse con el término: ${term}`,
        );
      }
      return mice;
    }
  }

  async update(id: string, updateDto: UpdateMouseDto) {
    const mouse = await this.mouseRepository.preload({
      idMouse: id,
      ...updateDto,
    });
    if (!mouse) {
      throw new NotFoundException(`Mouse con ID ${id} no encontrado`);
    }
    return await this.mouseRepository.save(mouse);
  }

  async remove(id: string) {
    const mouse = await this.mouseRepository.findOneBy({ idMouse: id });
    if (!mouse) {
      throw new NotFoundException(`Mouse con ID ${id} no encontrado`);
    }
    return await this.mouseRepository.remove(mouse);
  }
}

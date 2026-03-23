import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from './entities/monitor.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { User } from 'src/users/entities/user.entity';
import { isUUID } from 'class-validator';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(Monitor)
    private readonly monitorRepository: Repository<Monitor>,

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

  async create(createDto: CreateMonitorDto) {
    const estado = await this.estadoRepository.findOneBy({
      id: createDto.idEstado,
    });
    if (!estado)
      throw new NotFoundException(
        `Estado con ID ${createDto.idEstado} no encontrado`,
      );

    const empleado = await this.userRepository.findOneBy({
      idEmpleado: createDto.idEmpleado,
    });
    if (!empleado)
      throw new NotFoundException(
        `Empleado con ID ${createDto.idEmpleado} no encontrado`,
      );

    const equipo = await this.equipoRepository.findOneBy({
      id: createDto.idEquipo,
    });
    if (!equipo)
      throw new NotFoundException(
        `Equipo con ID ${createDto.idEquipo} no encontrado`,
      );

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

    const monitor = this.monitorRepository.create({
      numeroInventario: createDto.numeroInventario,
      marca: createDto.marca,
      modelo: createDto.modelo,
      pulgadas: createDto.pulgadas,
      resolucion: createDto.resolucion,
      tipoPantalla: createDto.tipoPantalla,
      cantidadPuertosVGA: createDto.cantidadPuertosVGA,
      cantidadPuertosDVI: createDto.cantidadPuertosDVI,
      cantidadPuertosHDMI: createDto.cantidadPuertosHDMI,
      serie: createDto.serie,
      fechaVencimientoGarantia: createDto.fechaVencimientoGarantia,
      estado,
      empleado,
      equipo,
      departamento,
      unidadAcademica,
    });

    return await this.monitorRepository.save(monitor);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { idUnidadAcademica } = paginationDto || {};

    return await this.monitorRepository.find({
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
  ): Promise<Monitor | Monitor[]> {
    const { idUnidadAcademica } = paginationDto || {};

    if (isUUID(term)) {
      const monitor = await this.monitorRepository.findOne({
        where: {
          idMonitor: term,
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
      if (!monitor) {
        throw new NotFoundException(
          `No se encontró ningún monitor con el ID: ${term}`,
        );
      }
      return monitor;
    } else {
      const queryBuilder = this.monitorRepository
        .createQueryBuilder('monitor')
        .leftJoinAndSelect('monitor.estado', 'estado')
        .leftJoinAndSelect('monitor.empleado', 'empleado')
        .leftJoinAndSelect('monitor.equipo', 'equipo')
        .leftJoinAndSelect('monitor.unidadAcademica', 'unidadAcademica')
        .leftJoinAndSelect('monitor.departamento', 'departamento');

      if (idUnidadAcademica) {
        queryBuilder.where('monitor.unidadAcademica = :idUnidadAcademica', {
          idUnidadAcademica,
        });
      }

      const monitores = await queryBuilder
        .andWhere('monitor.marca ILIKE :term', { term: `%${term}%` })
        .orWhere('monitor.modelo ILIKE :term', { term: `%${term}%` })
        .orWhere('monitor.serie ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!monitores || monitores.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún monitor con el término: ${term}`,
        );
      }
      return monitores;
    }
  }

  async update(id: string, updateDto: UpdateMonitorDto) {
    const monitor = await this.monitorRepository.findOne({
      where: { idMonitor: id },
      relations: [
        'estado',
        'empleado',
        'equipo',
        'unidadAcademica',
        'departamento',
      ],
    });
    if (!monitor) {
      throw new NotFoundException(`Monitor con ID ${id} no encontrado`);
    }

    const {
      idEstado,
      idEmpleado,
      idEquipo,
      idDepartamento,
      idUnidadAcademica,
      ...datosActualizar
    } = updateDto;

    Object.assign(monitor, datosActualizar);

    if (idEstado) {
      const estado = await this.estadoRepository.findOneBy({ id: idEstado });
      if (!estado)
        throw new NotFoundException(`Estado con ID ${idEstado} no encontrado`);
      monitor.estado = estado;
    }

    if (idEmpleado) {
      const empleado = await this.userRepository.findOneBy({ idEmpleado });
      if (!empleado)
        throw new NotFoundException(
          `Empleado con ID ${idEmpleado} no encontrado`,
        );
      monitor.empleado = empleado;
    }

    if (idEquipo) {
      const equipo = await this.equipoRepository.findOneBy({ id: idEquipo });
      if (!equipo)
        throw new NotFoundException(`Equipo con ID ${idEquipo} no encontrado`);
      monitor.equipo = equipo;
    }

    if (idDepartamento) {
      const departamento = await this.departamentoRepository.findOneBy({
        idDepartamento,
      });
      if (!departamento)
        throw new NotFoundException(
          `Departamento con ID ${idDepartamento} no encontrado`,
        );
      monitor.departamento = departamento;
    }

    if (idUnidadAcademica) {
      const unidadAcademica = await this.unidadAcademicaRepository.findOneBy({
        idUnidadAcademica,
      });
      if (!unidadAcademica)
        throw new NotFoundException(
          `Unidad académica con ID ${idUnidadAcademica} no encontrada`,
        );
      monitor.unidadAcademica = unidadAcademica;
    }

    return await this.monitorRepository.save(monitor);
  }

  async remove(id: string) {
    const monitor = await this.monitorRepository.findOneBy({ idMonitor: id });
    if (!monitor)
      throw new NotFoundException(`Monitor con ID ${id} no encontrado`);
    return await this.monitorRepository.remove(monitor);
  }
}

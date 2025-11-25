import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from './entities/monitor.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { User } from 'src/users/entities/user.entity';
import { EstadoFuncionamiento } from 'src/estados-so/entities/estados-so.entity';
import { isUUID } from 'class-validator';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';

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
    });

    return await this.monitorRepository.save(monitor);
  }

  async findAll() {
    return await this.monitorRepository.find({
      relations: ['estado', 'empleado', 'equipo'],
    });
  }

  async findByTerm(term: string) {
    let monitor: Monitor | Monitor[] | null;

    if (isUUID(term)) {
      monitor = await this.monitorRepository.findOne({
        where: { idMonitor: term },
        relations: ['estado', 'empleado', 'equipo'],
      });
    } else {
      monitor = await this.monitorRepository
        .createQueryBuilder('monitor')
        .leftJoinAndSelect('monitor.estado', 'estado')
        .leftJoinAndSelect('monitor.empleado', 'empleado')
        .leftJoinAndSelect('monitor.equipo', 'equipo')
        .where('monitor.marca ILIKE :term', { term: `%${term}%` })
        .orWhere('monitor.modelo ILIKE :term', { term: `%${term}%` })
        .orWhere('monitor.serie ILIKE :term', { term: `%${term}%` })
        .getMany();
    }

    if (!monitor || (Array.isArray(monitor) && monitor.length === 0)) {
      throw new NotFoundException(
        `No se encontró ningún monitor con el término: ${term}`,
      );
    }

    return monitor;
  }

  async update(id: string, updateDto: UpdateMonitorDto) {
    const monitor = await this.monitorRepository.preload({
      idMonitor: id,
      ...updateDto,
    });
    if (!monitor)
      throw new NotFoundException(`Monitor con ID ${id} no encontrado`);
    return await this.monitorRepository.save(monitor);
  }

  async remove(id: string) {
    const monitor = await this.monitorRepository.findOneBy({ idMonitor: id });
    if (!monitor)
      throw new NotFoundException(`Monitor con ID ${id} no encontrado`);
    return await this.monitorRepository.remove(monitor);
  }
}

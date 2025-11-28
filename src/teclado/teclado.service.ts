import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teclado } from './entities/teclado.entity';
import { CreateTecladoDto } from './dto/create-teclado.dto';
import { UpdateTecladoDto } from './dto/update-teclado.dto';
import { User } from 'src/users/entities/user.entity';
import { EquiposComputo } from 'src/equipos-computo/entities/equipos-computo.entity';
import { isUUID } from 'class-validator';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';

@Injectable()
export class TecladoService {
  constructor(
    @InjectRepository(Teclado)
    private readonly tecladoRepository: Repository<Teclado>,

    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoRepository: Repository<EstadoFuncionamiento>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(EquiposComputo)
    private readonly equipoRepository: Repository<EquiposComputo>,
  ) {}

  async create(createDto: CreateTecladoDto) {
    // Validar relaciones antes de crear
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

    // Crear el teclado con relaciones validadas
    const teclado = this.tecladoRepository.create({
      numeroInventario: createDto.numeroInventario,
      marca: createDto.marca,
      modelo: createDto.modelo,
      tipoConector: createDto.tipoConector,
      serie: createDto.serie,
      fechaVencimientoGarantia: createDto.fechaVencimientoGarantia,
      estado,
      empleado,
      equipo,
    });

    return await this.tecladoRepository.save(teclado);
  }

  async findAll() {
    return await this.tecladoRepository.find({
      relations: ['estado', 'empleado', 'equipo'],
    });
  }

  async findByTerm(term: string) {
    let teclado: Teclado | Teclado[] | null;

    if (isUUID(term)) {
      teclado = await this.tecladoRepository.findOne({
        where: { idTeclado: term },
        relations: ['estado', 'empleado', 'equipo'],
      });
    } else {
      // Buscar por texto en marca, modelo o serie
      teclado = await this.tecladoRepository
        .createQueryBuilder('teclado')
        .leftJoinAndSelect('teclado.estado', 'estado')
        .leftJoinAndSelect('teclado.empleado', 'empleado')
        .leftJoinAndSelect('teclado.equipo', 'equipo')
        .where('teclado.marca ILIKE :term', { term: `%${term}%` })
        .orWhere('teclado.modelo ILIKE :term', { term: `%${term}%` })
        .orWhere('teclado.serie ILIKE :term', { term: `%${term}%` })
        .getMany();
    }

    if (!teclado || (Array.isArray(teclado) && teclado.length === 0)) {
      throw new NotFoundException(
        `No se encontró ningún teclado con el término: ${term}`,
      );
    }

    return teclado;
  }

  async update(id: string, updateDto: UpdateTecladoDto) {
    const teclado = await this.tecladoRepository.preload({
      idTeclado: id,
      ...updateDto,
    });
    if (!teclado)
      throw new NotFoundException(`Teclado con ID ${id} no encontrado`);
    return await this.tecladoRepository.save(teclado);
  }

  async remove(id: string) {
    const teclado = await this.tecladoRepository.findOneBy({ idTeclado: id });
    if (!teclado)
      throw new NotFoundException(`Teclado con ID ${id} no encontrado`);
    return await this.tecladoRepository.remove(teclado);
  }
}

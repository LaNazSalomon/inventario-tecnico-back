import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoAlmacenamiento } from './entities/equipo-almacenamiento.entity';
import { CreateEquipoAlmacenamientoDto } from './dto/create-equipo-almacenamiento.dto';
import { UpdateEquipoAlmacenamientoDto } from './dto/update-equipo-almacenamiento.dto';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EquipoAlmacenamientoService {
  constructor(
    @InjectRepository(EquipoAlmacenamiento)
    private readonly equiposRepository: Repository<EquipoAlmacenamiento>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MarcaEquipo)
    private readonly marcaRepository: Repository<MarcaEquipo>,

    @InjectRepository(ModeloEquipo)
    private readonly modeloRepository: Repository<ModeloEquipo>,

    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoRepository: Repository<EstadoFuncionamiento>,
  ) {}

  async create(createDto: CreateEquipoAlmacenamientoDto) {
    // Validar relaciones
    const usuario = await this.userRepository.findOneBy({
      idEmpleado: createDto.usuarioId,
    });
    if (!usuario)
      throw new NotFoundException(
        `Usuario con ID ${createDto.usuarioId} no encontrado`,
      );

    const marca = await this.marcaRepository.findOneBy({
      id: createDto.marcaEquipoAlmacenamientoId,
    });
    if (!marca)
      throw new NotFoundException(
        `Marca con ID ${createDto.marcaEquipoAlmacenamientoId} no encontrada`,
      );

    const modelo = await this.modeloRepository.findOneBy({
      id: createDto.modeloEquipoAlmacenamientoId,
    });
    if (!modelo)
      throw new NotFoundException(
        `Modelo con ID ${createDto.modeloEquipoAlmacenamientoId} no encontrado`,
      );

    const estado = await this.estadoRepository.findOneBy({
      id: createDto.estadoFuncionamientoId,
    });
    if (!estado)
      throw new NotFoundException(
        `Estado con ID ${createDto.estadoFuncionamientoId} no encontrado`,
      );

    const equipo = this.equiposRepository.create({
      inventario: createDto.inventario,
      serie: createDto.serie,
      capacidadAlmacenamiento: createDto.capacidadAlmacenamiento,
      tipoEquipoAlmacenamiento: createDto.tipoEquipoAlmacenamiento,
      usuario,
      marcaEquipoAlmacenamiento: marca,
      modeloEquipoAlmacenamiento: modelo,
      estadoFuncionamiento: estado,
    });

    return await this.equiposRepository.save(equipo);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit, offset } = paginationDto || {};

    return await this.equiposRepository.find({
      take: limit,
      skip: offset,
      relations: [
        'usuario',
        'marcaEquipoAlmacenamiento',
        'modeloEquipoAlmacenamiento',
        'estadoFuncionamiento',
      ],
    });
  }

  async findByTerm(term: string) {
    if (isUUID(term)) {
      const equipo = await this.equiposRepository.findOne({
        where: { idEquipoAlmacenamiento: term },
        relations: [
          'usuario',
          'marcaEquipoAlmacenamiento',
          'modeloEquipoAlmacenamiento',
          'estadoFuncionamiento',
        ],
      });

      if (!equipo) {
        throw new NotFoundException(
          `No se encontró ningún equipo de almacenamiento con el ID: ${term}`,
        );
      }

      return equipo;
    } else {
      const equipos = await this.equiposRepository
        .createQueryBuilder('equipo')
        .leftJoinAndSelect('equipo.usuario', 'usuario')
        .leftJoinAndSelect('equipo.marcaEquipoAlmacenamiento', 'marca')
        .leftJoinAndSelect('equipo.modeloEquipoAlmacenamiento', 'modelo')
        .leftJoinAndSelect('equipo.estadoFuncionamiento', 'estado')
        .where('equipo.inventario ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.serie ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.capacidadAlmacenamiento ILIKE :term', {
          term: `%${term}%`,
        })
        .orWhere('marca.nombre ILIKE :term', { term: `%${term}%` })
        .orWhere('modelo.nombre ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!equipos || equipos.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún equipo de almacenamiento con el término: ${term}`,
        );
      }

      return equipos;
    }
  }

  async update(id: string, updateDto: UpdateEquipoAlmacenamientoDto) {
    const equipo = await this.equiposRepository.preload({
      idEquipoAlmacenamiento: id,
      ...updateDto,
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo de almacenamiento con ID ${id} no encontrado`,
      );
    }
    return await this.equiposRepository.save(equipo);
  }

  async remove(id: string) {
    const equipo = await this.equiposRepository.findOneBy({
      idEquipoAlmacenamiento: id,
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo de almacenamiento con ID ${id} no encontrado`,
      );
    }
    return await this.equiposRepository.remove(equipo);
  }
}

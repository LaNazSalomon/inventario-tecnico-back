import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoTelefonico } from './entities/equipo-telefonico.entity';
import { CreateEquipoTelefonicoDto } from './dto/create-equipo-telefonico.dto';
import { UpdateEquipoTelefonicoDto } from './dto/update-equipo-telefonico.dto';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EquipoTelefonicoService {
  constructor(
    @InjectRepository(EquipoTelefonico)
    private readonly equiposRepository: Repository<EquipoTelefonico>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MarcaEquipo)
    private readonly marcaRepository: Repository<MarcaEquipo>,

    @InjectRepository(ModeloEquipo)
    private readonly modeloRepository: Repository<ModeloEquipo>,

    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoRepository: Repository<EstadoFuncionamiento>,
  ) {}

  async create(createDto: CreateEquipoTelefonicoDto) {
    // Validar relaciones
    const usuario = await this.userRepository.findOneBy({ idEmpleado: createDto.usuarioId });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${createDto.usuarioId} no encontrado`);

    const marca = await this.marcaRepository.findOneBy({ id: createDto.marcaEquipoTelefonicoId });
    if (!marca) throw new NotFoundException(`Marca con ID ${createDto.marcaEquipoTelefonicoId} no encontrada`);

    const modelo = await this.modeloRepository.findOneBy({ id: createDto.modeloEquipoTelefonicoId });
    if (!modelo) throw new NotFoundException(`Modelo con ID ${createDto.modeloEquipoTelefonicoId} no encontrado`);

    const estado = await this.estadoRepository.findOneBy({ id: createDto.estadoFuncionamientoId });
    if (!estado) throw new NotFoundException(`Estado con ID ${createDto.estadoFuncionamientoId} no encontrado`);

    const equipo = this.equiposRepository.create({
      inventario: createDto.inventario,
      serie: createDto.serie,
      tipoEquipoTelefonico: createDto.tipoEquipoTelefonico,
      tipoConexionRed: createDto.tipoConexionRed,
      direccionIp: createDto.direccionIp,
      numeroExtension: createDto.numeroExtension,
      did: createDto.did,
      usuario,
      marcaEquipoTelefonico: marca,
      modeloEquipoTelefonico: modelo,
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
        'marcaEquipoTelefonico',
        'modeloEquipoTelefonico',
        'estadoFuncionamiento',
      ],
    });
  }

  async findByTerm(term: string) {
    if (isUUID(term)) {
      const equipo = await this.equiposRepository.findOne({
        where: { idEquipoTelefonico: term },
        relations: [
          'usuario',
          'marcaEquipoTelefonico',
          'modeloEquipoTelefonico',
          'estadoFuncionamiento',
        ],
      });

      if (!equipo) {
        throw new NotFoundException(
          `No se encontró ningún equipo telefónico con el ID: ${term}`,
        );
      }

      return equipo;
    } else {
      const equipos = await this.equiposRepository
        .createQueryBuilder('equipo')
        .leftJoinAndSelect('equipo.usuario', 'usuario')
        .leftJoinAndSelect('equipo.marcaEquipoTelefonico', 'marca')
        .leftJoinAndSelect('equipo.modeloEquipoTelefonico', 'modelo')
        .leftJoinAndSelect('equipo.estadoFuncionamiento', 'estado')
        .where('equipo.inventario ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.serie ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.numeroExtension ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.direccionIp ILIKE :term', { term: `%${term}%` })
        .orWhere('marca.nombre ILIKE :term', { term: `%${term}%` })
        .orWhere('modelo.nombre ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!equipos || equipos.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún equipo telefónico con el término: ${term}`,
        );
      }

      return equipos;
    }
  }

  async update(id: string, updateDto: UpdateEquipoTelefonicoDto) {
    const equipo = await this.equiposRepository.preload({
      idEquipoTelefonico: id,
      ...updateDto,
    });
    if (!equipo) {
      throw new NotFoundException(`Equipo telefónico con ID ${id} no encontrado`);
    }
    return await this.equiposRepository.save(equipo);
  }

  async remove(id: string) {
    const equipo = await this.equiposRepository.findOneBy({ idEquipoTelefonico: id });
    if (!equipo) {
      throw new NotFoundException(`Equipo telefónico con ID ${id} no encontrado`);
    }
    return await this.equiposRepository.remove(equipo);
  }
}
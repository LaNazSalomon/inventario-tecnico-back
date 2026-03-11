import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoEnergia } from './entities/equipo-energia.entity';
import { CreateEquipoEnergiaDto } from './dto/create-equipo-energia.dto';
import { UpdateEquipoEnergiaDto } from './dto/update-equipo-energia.dto';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EquipoEnergiaService {
  constructor(
    @InjectRepository(EquipoEnergia)
    private readonly equiposRepository: Repository<EquipoEnergia>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MarcaEquipo)
    private readonly marcaRepository: Repository<MarcaEquipo>,

    @InjectRepository(ModeloEquipo)
    private readonly modeloRepository: Repository<ModeloEquipo>,

    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoRepository: Repository<EstadoFuncionamiento>,
  ) {}

  async create(createDto: CreateEquipoEnergiaDto) {
    // Validar relaciones
    const usuario = await this.userRepository.findOneBy({ idEmpleado: createDto.usuarioId });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${createDto.usuarioId} no encontrado`);

    const marca = await this.marcaRepository.findOneBy({ id: createDto.marcaEquipoEnergiaId });
    if (!marca) throw new NotFoundException(`Marca con ID ${createDto.marcaEquipoEnergiaId} no encontrada`);

    const modelo = await this.modeloRepository.findOneBy({ id: createDto.modeloEquipoEnergiaId });
    if (!modelo) throw new NotFoundException(`Modelo con ID ${createDto.modeloEquipoEnergiaId} no encontrado`);

    const estado = await this.estadoRepository.findOneBy({ id: createDto.estadoFuncionamientoId });
    if (!estado) throw new NotFoundException(`Estado con ID ${createDto.estadoFuncionamientoId} no encontrado`);

    const equipo = this.equiposRepository.create({
      inventario: createDto.inventario,
      serie: createDto.serie,
      tipoEquipoEnergia: createDto.tipoEquipoEnergia,
      usuario,
      marcaEquipoEnergia: marca,
      modeloEquipoEnergia: modelo,
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
        'marcaEquipoEnergia',
        'modeloEquipoEnergia',
        'estadoFuncionamiento',
      ],
    });
  }

  async findByTerm(term: string) {
    if (isUUID(term)) {
      const equipo = await this.equiposRepository.findOne({
        where: { idEquipoEnergia: term },
        relations: [
          'usuario',
          'marcaEquipoEnergia',
          'modeloEquipoEnergia',
          'estadoFuncionamiento',
        ],
      });

      if (!equipo) {
        throw new NotFoundException(
          `No se encontró ningún equipo de energía con el ID: ${term}`,
        );
      }

      return equipo;
    } else {
      const equipos = await this.equiposRepository
        .createQueryBuilder('equipo')
        .leftJoinAndSelect('equipo.usuario', 'usuario')
        .leftJoinAndSelect('equipo.marcaEquipoEnergia', 'marca')
        .leftJoinAndSelect('equipo.modeloEquipoEnergia', 'modelo')
        .leftJoinAndSelect('equipo.estadoFuncionamiento', 'estado')
        .where('equipo.inventario ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.serie ILIKE :term', { term: `%${term}%` })
        .orWhere('marca.nombre ILIKE :term', { term: `%${term}%` })
        .orWhere('modelo.nombre ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!equipos || equipos.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún equipo de energía con el término: ${term}`,
        );
      }

      return equipos;
    }
  }

  async update(id: string, updateDto: UpdateEquipoEnergiaDto) {
    const equipo = await this.equiposRepository.preload({
      idEquipoEnergia: id,
      ...updateDto,
    });
    if (!equipo) {
      throw new NotFoundException(`Equipo de energía con ID ${id} no encontrado`);
    }
    return await this.equiposRepository.save(equipo);
  }

  async remove(id: string) {
    const equipo = await this.equiposRepository.findOneBy({ idEquipoEnergia: id });
    if (!equipo) {
      throw new NotFoundException(`Equipo de energía con ID ${id} no encontrado`);
    }
    return await this.equiposRepository.remove(equipo);
  }
}
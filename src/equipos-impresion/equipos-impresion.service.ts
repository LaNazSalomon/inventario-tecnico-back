import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoImpresion } from './entities/equipos-impresion.entity';
import { CreateEquiposImpresionDto } from './dto/create-equipos-impresion.dto';
import { UpdateEquiposImpresionDto } from './dto/update-equipos-impresion.dto';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { User } from 'src/users/entities/user.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EquiposImpresionService {
  constructor(
    @InjectRepository(EquipoImpresion)
    private readonly equiposImpresionRepository: Repository<EquipoImpresion>,

    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoRepository: Repository<EstadoFuncionamiento>,

    @InjectRepository(MarcaEquipo)
    private readonly marcaRepository: Repository<MarcaEquipo>,

    @InjectRepository(ModeloEquipo)
    private readonly modeloRepository: Repository<ModeloEquipo>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UnidadAcademica)
    private readonly unidadAcademicaRepository: Repository<UnidadAcademica>,

    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createDto: CreateEquiposImpresionDto) {
    // Validar relaciones
    const estado = await this.estadoRepository.findOneBy({
      id: createDto.estadoFuncionamientoId,
    });
    if (!estado) {
      throw new NotFoundException(
        `Estado con ID ${createDto.estadoFuncionamientoId} no encontrado`,
      );
    }

    const usuario = await this.userRepository.findOneBy({
      idEmpleado: createDto.usuarioId,
    });
    if (!usuario) {
      throw new NotFoundException(
        `Usuario con ID ${createDto.usuarioId} no encontrado`,
      );
    }

    const marca = await this.marcaRepository.findOneBy({
      id: createDto.marcaEquipoImpresionId,
    });
    if (!marca) {
      throw new NotFoundException(
        `Marca con ID ${createDto.marcaEquipoImpresionId} no encontrada`,
      );
    }

    const modelo = await this.modeloRepository.findOneBy({
      id: createDto.modeloEquipoImpresionId,
    });
    if (!modelo) {
      throw new NotFoundException(
        `Modelo con ID ${createDto.modeloEquipoImpresionId} no encontrado`,
      );
    }

    const unidadAcademica = await this.unidadAcademicaRepository.findOneBy({
      idUnidadAcademica: createDto.unidadAcademicaId,
    });
    if (!unidadAcademica) {
      throw new NotFoundException(
        `Unidad académica con ID ${createDto.unidadAcademicaId} no encontrada`,
      );
    }

    const departamento = await this.departamentoRepository.findOneBy({
      idDepartamento: createDto.departamentoAreaId,
    });
    if (!departamento) {
      throw new NotFoundException(
        `Departamento con ID ${createDto.departamentoAreaId} no encontrado`,
      );
    }

    // Crear equipo de impresión
    const equipo = this.equiposImpresionRepository.create({
      inventario: createDto.inventario,
      compartida: createDto.compartida,
      multifuncional: createDto.multifuncional,
      serie: createDto.serie,
      tipoEquipoImpresion: createDto.tipoEquipoImpresion,
      modoColorEquipoImpresion: createDto.modoColorEquipoImpresion,
      estadoFuncionamiento: estado,
      usuario,
      marcaEquipoImpresion: marca,
      modeloEquipoImpresion: modelo,
      unidadAcademica,
      departamentoArea: departamento,
    });

    return await this.equiposImpresionRepository.save(equipo);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit, offset, idUnidadAcademica } = paginationDto || {};

    const whereClause = idUnidadAcademica
      ? { unidadAcademica: { idUnidadAcademica } }
      : {};

    if (!limit && !offset) {
      return await this.equiposImpresionRepository.find({
        where: whereClause,
        relations: [
          'estadoFuncionamiento',
          'usuario',
          'marcaEquipoImpresion',
          'modeloEquipoImpresion',
          'unidadAcademica',
          'departamentoArea',
        ],
      });
    }

    return await this.equiposImpresionRepository.find({
      where: whereClause,
      take: limit,
      skip: offset,
      relations: [
        'estadoFuncionamiento',
        'usuario',
        'marcaEquipoImpresion',
        'modeloEquipoImpresion',
        'unidadAcademica',
        'departamentoArea',
      ],
    });
  }

  async findByTerm(
    term: string,
    paginationDto?: PaginationDto,
  ): Promise<EquipoImpresion | EquipoImpresion[]> {
    const { idUnidadAcademica } = paginationDto || {};

    if (isUUID(term)) {
      const equipo = await this.equiposImpresionRepository.findOne({
        where: {
          idEquipoImpresion: term,
          ...(idUnidadAcademica
            ? { unidadAcademica: { idUnidadAcademica } }
            : {}),
        },
        relations: [
          'estadoFuncionamiento',
          'usuario',
          'marcaEquipoImpresion',
          'modeloEquipoImpresion',
          'unidadAcademica',
          'departamentoArea',
        ],
      });
      if (!equipo) {
        throw new NotFoundException(
          `No se encontró ningún equipo de impresión con el ID: ${term}`,
        );
      }
      return equipo;
    } else {
      const queryBuilder = this.equiposImpresionRepository
        .createQueryBuilder('equipo')
        .leftJoinAndSelect(
          'equipo.estadoFuncionamiento',
          'estadoFuncionamiento',
        )
        .leftJoinAndSelect('equipo.usuario', 'usuario')
        .leftJoinAndSelect(
          'equipo.marcaEquipoImpresion',
          'marcaEquipoImpresion',
        )
        .leftJoinAndSelect(
          'equipo.modeloEquipoImpresion',
          'modeloEquipoImpresion',
        )
        .leftJoinAndSelect('equipo.unidadAcademica', 'unidadAcademica')
        .leftJoinAndSelect('equipo.departamentoArea', 'departamentoArea');

      if (idUnidadAcademica) {
        queryBuilder.where('equipo.unidadAcademica = :idUnidadAcademica', {
          idUnidadAcademica,
        });
      }

      const equipos = await queryBuilder
        .andWhere('equipo.inventario ILIKE :term', { term: `%${term}%` })
        .orWhere('equipo.serie ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!equipos || equipos.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún equipo de impresión con el término: ${term}`,
        );
      }
      return equipos;
    }
  }

  async update(id: string, updateDto: UpdateEquiposImpresionDto) {
    const equipo = await this.equiposImpresionRepository.preload({
      idEquipoImpresion: id,
      ...updateDto,
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo de impresión con ID ${id} no encontrado`,
      );
    }
    return await this.equiposImpresionRepository.save(equipo);
  }

  async remove(id: string) {
    const equipo = await this.equiposImpresionRepository.findOneBy({
      idEquipoImpresion: id,
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo de impresión con ID ${id} no encontrado`,
      );
    }
    return await this.equiposImpresionRepository.remove(equipo);
  }
}

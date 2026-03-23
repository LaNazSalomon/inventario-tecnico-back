import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoProyeccion } from './entities/equipo-proyeccion.entity';
import { CreateEquipoProyeccionDto } from './dto/create-equipo-proyeccion.dto';
import { UpdateEquipoProyeccionDto } from './dto/update-equipo-proyeccion.dto';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { User } from 'src/users/entities/user.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EquipoProyeccionService {
  constructor(
    @InjectRepository(EquipoProyeccion)
    private readonly equiposProyeccionRepository: Repository<EquipoProyeccion>,

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

  async create(createDto: CreateEquipoProyeccionDto) {
    // Validar relaciones
    const estado = await this.estadoRepository.findOneBy({
      id: createDto.estadoFuncionamientoId,
    });
    if (!estado)
      throw new NotFoundException(
        `Estado con ID ${createDto.estadoFuncionamientoId} no encontrado`,
      );

    const usuario = await this.userRepository.findOneBy({
      idEmpleado: createDto.usuarioId,
    });
    if (!usuario)
      throw new NotFoundException(
        `Usuario con ID ${createDto.usuarioId} no encontrado`,
      );

    const marca = await this.marcaRepository.findOneBy({
      id: createDto.marcaEquipoProyeccionId,
    });
    if (!marca)
      throw new NotFoundException(
        `Marca con ID ${createDto.marcaEquipoProyeccionId} no encontrada`,
      );

    const modelo = await this.modeloRepository.findOneBy({
      id: createDto.modeloEquipoProyeccionId,
    });
    if (!modelo)
      throw new NotFoundException(
        `Modelo con ID ${createDto.modeloEquipoProyeccionId} no encontrado`,
      );

    const unidadAcademica = await this.unidadAcademicaRepository.findOneBy({
      idUnidadAcademica: createDto.unidadAcademicaId,
    });
    if (!unidadAcademica)
      throw new NotFoundException(
        `Unidad académica con ID ${createDto.unidadAcademicaId} no encontrada`,
      );

    const departamento = await this.departamentoRepository.findOneBy({
      idDepartamento: createDto.departamentoAreaId,
    });
    if (!departamento)
      throw new NotFoundException(
        `Departamento con ID ${createDto.departamentoAreaId} no encontrado`,
      );

    // Crear equipo de proyección
    const equipo = this.equiposProyeccionRepository.create({
      inventario: createDto.inventario,
      serie: createDto.serie,
      pulgadas: createDto.pulgadas,
      resolucion: createDto.resolucion,
      tipoPantalla: createDto.tipoPantalla,
      cantidadPuertosUsbA: createDto.cantidadPuertosUsbA,
      cantidadPuertosUsbB: createDto.cantidadPuertosUsbB,
      cantidadPuertosVga: createDto.cantidadPuertosVga,
      cantidadPuertosDvi: createDto.cantidadPuertosDvi,
      cantidadPuertosHdmi: createDto.cantidadPuertosHdmi,
      cantidadPuertosRj45: createDto.cantidadPuertosRj45,
      cantidadPuertosRca: createDto.cantidadPuertosRca,
      cantidadPuertosSuperVideo: createDto.cantidadPuertosSuperVideo,
      fechaVencimientoGarantia: createDto.fechaVencimientoGarantia,
      tipoEquipoProyeccion: createDto.tipoEquipoProyeccion,
      estadoFuncionamiento: estado,
      usuario,
      marcaEquipoProyeccion: marca,
      modeloEquipoProyeccion: modelo,
      unidadAcademica,
      departamentoArea: departamento,
    });

    return await this.equiposProyeccionRepository.save(equipo);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit, offset, idUnidadAcademica } = paginationDto || {};

    const whereClause = idUnidadAcademica
      ? { unidadAcademica: { idUnidadAcademica } }
      : {};

    if (!limit && !offset) {
      return await this.equiposProyeccionRepository.find({
        where: whereClause,
        relations: [
          'estadoFuncionamiento',
          'usuario',
          'marcaEquipoProyeccion',
          'modeloEquipoProyeccion',
          'unidadAcademica',
          'departamentoArea',
        ],
      });
    }

    return await this.equiposProyeccionRepository.find({
      where: whereClause,
      take: limit,
      skip: offset,
      relations: [
        'estadoFuncionamiento',
        'usuario',
        'marcaEquipoProyeccion',
        'modeloEquipoProyeccion',
        'unidadAcademica',
        'departamentoArea',
      ],
    });
  }

  async findByTerm(
    term: string,
    paginationDto?: PaginationDto,
  ): Promise<EquipoProyeccion | EquipoProyeccion[]> {
    const { idUnidadAcademica } = paginationDto || {};

    if (isUUID(term)) {
      const equipo = await this.equiposProyeccionRepository.findOne({
        where: {
          idEquipoProyeccion: term,
          ...(idUnidadAcademica
            ? { unidadAcademica: { idUnidadAcademica } }
            : {}),
        },
        relations: [
          'estadoFuncionamiento',
          'usuario',
          'marcaEquipoProyeccion',
          'modeloEquipoProyeccion',
          'unidadAcademica',
          'departamentoArea',
        ],
      });
      if (!equipo) {
        throw new NotFoundException(
          `No se encontró ningún equipo de proyección con el ID: ${term}`,
        );
      }
      return equipo;
    } else {
      const queryBuilder = this.equiposProyeccionRepository
        .createQueryBuilder('equipo')
        .leftJoinAndSelect(
          'equipo.estadoFuncionamiento',
          'estadoFuncionamiento',
        )
        .leftJoinAndSelect('equipo.usuario', 'usuario')
        .leftJoinAndSelect(
          'equipo.marcaEquipoProyeccion',
          'marcaEquipoProyeccion',
        )
        .leftJoinAndSelect(
          'equipo.modeloEquipoProyeccion',
          'modeloEquipoProyeccion',
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
        .orWhere('equipo.resolucion ILIKE :term', { term: `%${term}%` })
        .getMany();

      if (!equipos || equipos.length === 0) {
        throw new NotFoundException(
          `No se encontró ningún equipo de proyección con el término: ${term}`,
        );
      }
      return equipos;
    }
  }

  async update(id: string, updateDto: UpdateEquipoProyeccionDto) {
    const equipo = await this.equiposProyeccionRepository.findOne({
      where: { idEquipoProyeccion: id },
      relations: [
        'estadoFuncionamiento',
        'usuario',
        'marcaEquipoProyeccion',
        'modeloEquipoProyeccion',
        'unidadAcademica',
        'departamentoArea',
      ],
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo de proyección con ID ${id} no encontrado`,
      );
    }

    const {
      usuarioId,
      estadoFuncionamientoId,
      marcaEquipoProyeccionId,
      modeloEquipoProyeccionId,
      unidadAcademicaId,
      departamentoAreaId,
      ...datosActualizar
    } = updateDto;

    Object.assign(equipo, datosActualizar);

    if (usuarioId) {
      const usuario = await this.userRepository.findOneBy({
        idEmpleado: usuarioId,
      });
      if (!usuario)
        throw new NotFoundException(
          `Usuario con ID ${usuarioId} no encontrado`,
        );
      equipo.usuario = usuario;
    }

    if (estadoFuncionamientoId) {
      const estado = await this.estadoRepository.findOneBy({
        id: estadoFuncionamientoId,
      });
      if (!estado)
        throw new NotFoundException(
          `Estado con ID ${estadoFuncionamientoId} no encontrado`,
        );
      equipo.estadoFuncionamiento = estado;
    }

    if (marcaEquipoProyeccionId) {
      const marca = await this.marcaRepository.findOneBy({
        id: marcaEquipoProyeccionId,
      });
      if (!marca)
        throw new NotFoundException(
          `Marca con ID ${marcaEquipoProyeccionId} no encontrada`,
        );
      equipo.marcaEquipoProyeccion = marca;
    }

    if (modeloEquipoProyeccionId) {
      const modelo = await this.modeloRepository.findOneBy({
        id: modeloEquipoProyeccionId,
      });
      if (!modelo)
        throw new NotFoundException(
          `Modelo con ID ${modeloEquipoProyeccionId} no encontrado`,
        );
      equipo.modeloEquipoProyeccion = modelo;
    }

    if (unidadAcademicaId) {
      const unidadAcademica = await this.unidadAcademicaRepository.findOneBy({
        idUnidadAcademica: unidadAcademicaId,
      });
      if (!unidadAcademica)
        throw new NotFoundException(
          `Unidad académica con ID ${unidadAcademicaId} no encontrada`,
        );
      equipo.unidadAcademica = unidadAcademica;
    }

    if (departamentoAreaId) {
      const departamento = await this.departamentoRepository.findOneBy({
        idDepartamento: departamentoAreaId,
      });
      if (!departamento)
        throw new NotFoundException(
          `Departamento con ID ${departamentoAreaId} no encontrado`,
        );
      equipo.departamentoArea = departamento;
    }

    return await this.equiposProyeccionRepository.save(equipo);
  }

  async remove(id: string) {
    const equipo = await this.equiposProyeccionRepository.findOneBy({
      idEquipoProyeccion: id,
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo de proyección con ID ${id} no encontrado`,
      );
    }
    return await this.equiposProyeccionRepository.remove(equipo);
  }
}

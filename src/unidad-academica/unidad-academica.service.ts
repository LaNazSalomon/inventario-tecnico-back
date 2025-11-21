import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadAcademicaDto } from './dto/create-unidad-academica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidad-academica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadAcademica } from './entities/unidad-academica.entity';
import { DataSource, Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UnidadAcademicaService {
  constructor(
    @InjectRepository(UnidadAcademica)
    private readonly unidadAcademicaRepository: Repository<UnidadAcademica>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUnidadAcademicaDto: CreateUnidadAcademicaDto) {
    try {
      const unidadAcademica = this.unidadAcademicaRepository.create(
        createUnidadAcademicaDto,
      );

      await this.unidadAcademicaRepository.save(unidadAcademica);
      return unidadAcademica;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Unidad Academica');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 50, offset = 0 } = paginationDto;

    const unidadAcademica = await this.unidadAcademicaRepository.find({
      take: limit,
      skip: offset,
    });

    return unidadAcademica;
  }

  async findByTerm(term: string) {
    let unidadAcademica: UnidadAcademica | UnidadAcademica[] | null;

    if (isUUID(term)) {
      unidadAcademica = await this.unidadAcademicaRepository.findOne({
        where: { idUnidadAcademica: term },
        relations: ['departamentos'], // importante si quieres traer los departamentos
      });
    } else {
      const queryBuilder =
        this.unidadAcademicaRepository.createQueryBuilder('unidad');

      unidadAcademica = await queryBuilder
        .leftJoinAndSelect('unidad.departamentos', 'departamento')
        .where(
          `(unidad.nombreUnidad ILIKE :term OR departamento.nombre ILIKE :term)`,
          { term: `%${term}%` },
        )
        .getMany();
    }

    if (
      !unidadAcademica ||
      (Array.isArray(unidadAcademica) && unidadAcademica.length === 0)
    ) {
      throw new NotFoundException('No se encontró ninguna unidad académica');
    }

    return unidadAcademica;
  }

  async update(id: string, updateDto: UpdateUnidadAcademicaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Cargar la unidad existente y aplicar los cambios
      const unidad = await this.unidadAcademicaRepository.preload({
        idUnidadAcademica: id,
        nombreUnidad: updateDto.nombreUnidad,
      });

      if (!unidad) {
        throw new NotFoundException(
          `No se encontró la unidad académica con ID ${id}`,
        );
      }

      // Guardar cambios de la unidad
      await queryRunner.manager.save(unidad);
      await queryRunner.commitTransaction();

      return `Unidad académica actualizada correctamente`;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      ManejadorErroresDB.erroresDB(err, 'UnidadAcademicaService');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    try {
      const unidadAcademica = await this.findByTerm(id);

      if (!unidadAcademica)
        throw new NotFoundException('No se encontro ninguna unidad academica.');

      await this.unidadAcademicaRepository.remove(
        Array.isArray(unidadAcademica) ? unidadAcademica[0] : unidadAcademica,
      );
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'UnidadAcademicaService');
    }
  }
}

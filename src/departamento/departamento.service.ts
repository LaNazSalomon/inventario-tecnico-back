import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { DataSource, Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(UnidadAcademica)
    private readonly unidadRepository: Repository<UnidadAcademica>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    try {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidadAcademica: createDepartamentoDto.idUnidadAcademica,
      });

      if (!unidad) throw new NotFoundException('Unidad académica no encontrada');

      const createDepartamentoDB = this.departamentoRepository.create({
        ...createDepartamentoDto,
        unidadAcademica: unidad,
      });

      await this.departamentoRepository.save(createDepartamentoDB);
      return createDepartamentoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Departamento');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.departamentoRepository.find({
        take: limit,
        skip: offset,
        relations: ['unidadAcademica', 'empleados'],
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Departamento');
    }
  }

  //* Ver lo de la paginacion aca
  async findByTerm(term: string) {
    let departamentos: Departamento | Departamento[] | null;

    if (isUUID(term)) {
      // Buscar por ID
      departamentos = await this.departamentoRepository.findOne({
        where: { idDepartamento: term },
        relations: ['unidadAcademica', 'empleados'],
      });
    } else {
      // Buscar por texto en nombreDepartamento o nombreUnidad
      const queryBuilder =
        this.departamentoRepository.createQueryBuilder('departamento');

      departamentos = await queryBuilder
        .leftJoinAndSelect('departamento.unidadAcademica', 'unidad')
        .leftJoinAndSelect('departamento.empleados', 'empleados')
        .where(
          `(departamento.nombreDepartamento ILIKE :term OR unidad.nombreUnidad ILIKE :term)`,
          { term: `%${term}%` },
        )
        .getMany();
    }

    if (
      !departamentos ||
      (Array.isArray(departamentos) && departamentos.length === 0)
    ) {
      throw new NotFoundException('No se encontró ningún departamento');
    }

    return departamentos;
  }

  async update(id: string, updateDepartamentoDto: UpdateDepartamentoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const departamento = await this.departamentoRepository.preload({
        idDepartamento: id,
        ...updateDepartamentoDto,
      });

      if (!departamento) {
        throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
      }

      if (updateDepartamentoDto.idUnidadAcademica) {
        const unidad = await this.unidadRepository.findOneBy({
          idUnidadAcademica: updateDepartamentoDto.idUnidadAcademica,
        });

        if (!unidad) {
          throw new NotFoundException(
            `Unidad académica con ID ${updateDepartamentoDto.idUnidadAcademica} no encontrada`,
          );
        }

        departamento.unidadAcademica = unidad;
      }

      await queryRunner.manager.save(departamento);
      await queryRunner.commitTransaction();

      return departamento;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      ManejadorErroresDB.erroresDB(err, 'Departamento');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    try {
      const departamento = await this.findByTerm(id);

      if (!departamento) {
        throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
      }

      await this.departamentoRepository.remove(
        Array.isArray(departamento) ? departamento[0] : departamento,
      );
      return `Departamento con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Departamento');
    }
  }
}

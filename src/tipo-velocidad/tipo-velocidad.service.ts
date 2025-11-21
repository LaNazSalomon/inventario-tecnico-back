import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoVelocidadDto } from './dto/create-tipo-velocidad.dto';
import { UpdateTipoVelocidadDto } from './dto/update-tipo-velocidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoVelocidad } from './entities/tipo-velocidad.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TipoVelocidadService {
  constructor(
    @InjectRepository(TipoVelocidad)
    private readonly tipoVelocidadRepository: Repository<TipoVelocidad>,
  ) {}

  async create(createTipoVelocidadDto: CreateTipoVelocidadDto) {
    try {
      const tipoVelocidadDB = this.tipoVelocidadRepository.create(
        createTipoVelocidadDto,
      );
      await this.tipoVelocidadRepository.save(tipoVelocidadDB);
      return tipoVelocidadDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoVelocidad');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.tipoVelocidadRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoVelocidad');
    }
  }

  async findByTerm(term: string) {
    let tipoVelocidad: TipoVelocidad | TipoVelocidad[] | null;

    try {
      if (isUUID(term)) {
        tipoVelocidad = await this.tipoVelocidadRepository.findOne({
          where: { id: term },
        });
      } else {
        const queryBuilder =
          this.tipoVelocidadRepository.createQueryBuilder('tipo');

        tipoVelocidad = await queryBuilder
          .where(`tipo.unidad ILIKE :term`, { term: `%${term}%` })
          .getMany();
      }

      if (
        !tipoVelocidad ||
        (Array.isArray(tipoVelocidad) && tipoVelocidad.length === 0)
      ) {
        throw new NotFoundException('No se encontró ningún tipo de velocidad');
      }

      return tipoVelocidad;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoVelocidad');
    }
  }

  async update(id: string, updateTipoVelocidadDto: UpdateTipoVelocidadDto) {
    try {
      const tipoVelocidad = await this.tipoVelocidadRepository.preload({
        id,
        ...updateTipoVelocidadDto,
      });

      if (!tipoVelocidad) {
        throw new NotFoundException(
          `No se encontró el tipo de velocidad con ID ${id}`,
        );
      }

      return await this.tipoVelocidadRepository.save(tipoVelocidad);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoVelocidad');
    }
  }

  async remove(id: string) {
    try {
      const tipoVelocidad = await this.tipoVelocidadRepository.findOneBy({
        id,
      });

      if (!tipoVelocidad) {
        throw new NotFoundException(
          `No se encontró el tipo de velocidad con ID ${id}`,
        );
      }

      await this.tipoVelocidadRepository.remove(tipoVelocidad);
      return `Tipo de velocidad con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoVelocidad');
    }
  }
}

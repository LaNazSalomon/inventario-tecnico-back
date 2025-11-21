import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSistemaOperativoDto } from './dto/create-sistema-operativo.dto';
import { UpdateSistemaOperativoDto } from './dto/update-sistema-operativo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SistemaOperativo } from './entities/sistema-operativo.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class SistemaOperativoService {
  constructor(
    @InjectRepository(SistemaOperativo)
    private readonly sistemaOperativoRepository: Repository<SistemaOperativo>,
  ) {}

  async create(createSistemaOperativoDto: CreateSistemaOperativoDto) {
    try {
      const sistemaOperativoDB = this.sistemaOperativoRepository.create(
        createSistemaOperativoDto,
      );
      await this.sistemaOperativoRepository.save(sistemaOperativoDB);
      return sistemaOperativoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'SistemaOperativo');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.sistemaOperativoRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'SistemaOperativo');
    }
  }

  async findByTerm(term: string) {
    let sistemas: SistemaOperativo | SistemaOperativo[] | null;

    try {
      if (isUUID(term)) {
        sistemas = await this.sistemaOperativoRepository.findOne({
          where: { id: term },
        });
      } else {
        const queryBuilder =
          this.sistemaOperativoRepository.createQueryBuilder('so');

        sistemas = await queryBuilder
          .where(`so.nombre ILIKE :term`, { term: `%${term}%` })
          .getMany();
      }

      if (!sistemas || (Array.isArray(sistemas) && sistemas.length === 0)) {
        throw new NotFoundException('No se encontró ningún sistema operativo');
      }

      return sistemas;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'SistemaOperativo');
    }
  }

  async update(
    id: string,
    updateSistemaOperativoDto: UpdateSistemaOperativoDto,
  ) {
    try {
      const sistemaOperativo = await this.sistemaOperativoRepository.preload({
        id,
        ...updateSistemaOperativoDto,
      });

      if (!sistemaOperativo) {
        throw new NotFoundException(
          `No se encontró el sistema operativo con ID ${id}`,
        );
      }

      return await this.sistemaOperativoRepository.save(sistemaOperativo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'SistemaOperativo');
    }
  }

  async remove(id: string) {
    try {
      const sistemaOperativo = await this.sistemaOperativoRepository.findOneBy({
        id,
      });

      if (!sistemaOperativo) {
        throw new NotFoundException(
          `No se encontró el sistema operativo con ID ${id}`,
        );
      }

      await this.sistemaOperativoRepository.remove(sistemaOperativo);
      return `Sistema operativo con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'SistemaOperativo');
    }
  }
}

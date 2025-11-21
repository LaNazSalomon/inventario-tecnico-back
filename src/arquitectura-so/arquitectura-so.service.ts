import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArquitecturaSoDto } from './dto/create-arquitectura-so.dto';
import { UpdateArquitecturaSoDto } from './dto/update-arquitectura-so.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquitecturaSO } from './entities/arquitectura-so.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ArquitecturaSoService {
  constructor(
    @InjectRepository(ArquitecturaSO)
    private readonly arquitecturaRepository: Repository<ArquitecturaSO>,
  ) {}

  async create(createArquitecturaSoDto: CreateArquitecturaSoDto) {
    try {
      const arquitecturaDB = this.arquitecturaRepository.create(createArquitecturaSoDto);
      await this.arquitecturaRepository.save(arquitecturaDB);
      return arquitecturaDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ArquitecturaSO');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.arquitecturaRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ArquitecturaSO');
    }
  }

  async findByTerm(term: string) {
    let arquitecturas: ArquitecturaSO | ArquitecturaSO[] | null;

    try {
      if (isUUID(term)) {
        arquitecturas = await this.arquitecturaRepository.findOne({
          where: { id: term },
        });
      } else {
        const queryBuilder = this.arquitecturaRepository.createQueryBuilder('arquitectura');

        arquitecturas = await queryBuilder
          .where(`arquitectura.arquitectura ILIKE :term`, { term: `%${term}%` })
          .getMany();
      }

      if (!arquitecturas || (Array.isArray(arquitecturas) && arquitecturas.length === 0)) {
        throw new NotFoundException('No se encontró ninguna arquitectura de sistema operativo');
      }

      return arquitecturas;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ArquitecturaSO');
    }
  }

  async update(id: string, updateArquitecturaSoDto: UpdateArquitecturaSoDto) {
    try {
      const arquitectura = await this.arquitecturaRepository.preload({
        id,
        ...updateArquitecturaSoDto,
      });

      if (!arquitectura) {
        throw new NotFoundException(`No se encontró la arquitectura con ID ${id}`);
      }

      return await this.arquitecturaRepository.save(arquitectura);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ArquitecturaSO');
    }
  }

  async remove(id: string) {
    try {
      const arquitectura = await this.arquitecturaRepository.findOneBy({ id });

      if (!arquitectura) {
        throw new NotFoundException(`No se encontró la arquitectura con ID ${id}`);
      }

      await this.arquitecturaRepository.remove(arquitectura);
      return `Arquitectura con ID ${id} eliminada correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ArquitecturaSO');
    }
  }
}
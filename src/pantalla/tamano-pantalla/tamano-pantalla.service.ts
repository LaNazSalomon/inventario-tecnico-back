import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { TamanoPantalla } from '../entities/tamano-pantalla.entity';
import { Repository } from 'typeorm';
import { CreateTamanoPantallaDto } from '../dto/create-tamano-pantalla.dto';
import { UpdateTamanoPantallaDto } from '../dto/update-tamano-pantalla.dto';

@Injectable()
export class TamanoPantallaService {
  constructor(
    @InjectRepository(TamanoPantalla)
    private readonly tamanoRepository: Repository<TamanoPantalla>,
  ) {}

  async create(createDto: CreateTamanoPantallaDto) {
    try {
      const tamano = this.tamanoRepository.create(createDto);
      return await this.tamanoRepository.save(tamano);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TamanoPantalla');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.tamanoRepository.find({ take: limit, skip: offset });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TamanoPantalla');
    }
  }

  async findByTerm(term: string, paginationDto: PaginationDto) {
    const { limit = 50, offset = 0 } = paginationDto;
    let tamanos: TamanoPantalla | TamanoPantalla[] | null;

    try {
      if (isUUID(term)) {
        tamanos = await this.tamanoRepository.findOne({ where: { id: term } });
      } else {
        tamanos = await this.tamanoRepository.createQueryBuilder('tamano')
          .where('tamano.pulgadas ILIKE :term', { term: `%${term}%` })
          .take(limit)
          .skip(offset)
          .getMany();
      }

      if (!tamanos || (Array.isArray(tamanos) && tamanos.length === 0)) {
        throw new NotFoundException('No se encontró ningún tamaño de pantalla');
      }

      return tamanos;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TamanoPantalla');
    }
  }

  async update(id: string, updateDto: UpdateTamanoPantallaDto) {
    try {
      const tamano = await this.tamanoRepository.preload({ id, ...updateDto });
      if (!tamano) throw new NotFoundException(`No se encontró el tamaño con ID ${id}`);
      return await this.tamanoRepository.save(tamano);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TamanoPantalla');
    }
  }

  async remove(id: string) {
    try {
      const tamano = await this.tamanoRepository.findOneBy({ id });
      if (!tamano) throw new NotFoundException(`No se encontró el tamaño con ID ${id}`);
      await this.tamanoRepository.remove(tamano);
      return `Tamaño de pantalla con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TamanoPantalla');
    }
  }
}
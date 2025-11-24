import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolucionPantalla } from './entities/resolucion-pantalla.entity';
import { Repository } from 'typeorm';
import { CreateResolucionPantallaDto } from './dto/create-resolucion-pantalla.dto';
import { UpdateResolucionPantallaDto } from './dto/update-resolucion-pantalla.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class ResolucionPantallaService {
  constructor(
    @InjectRepository(ResolucionPantalla)
    private readonly resolucionRepository: Repository<ResolucionPantalla>,
  ) {}

  async create(createDto: CreateResolucionPantallaDto) {
    try {
      const resolucion = this.resolucionRepository.create(createDto);
      return await this.resolucionRepository.save(resolucion);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ResolucionPantalla');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.resolucionRepository.find({ take: limit, skip: offset });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ResolucionPantalla');
    }
  }

  async findByTerm(term: string) {
    let resoluciones: ResolucionPantalla | ResolucionPantalla[] | null;

    try {
      if (isUUID(term)) {
        resoluciones = await this.resolucionRepository.findOne({ where: { id: term } });
      } else {
        resoluciones = await this.resolucionRepository.createQueryBuilder('resolucion')
          .where('resolucion.resolucion ILIKE :term', { term: `%${term}%` })
          .getMany();
      }

      if (!resoluciones || (Array.isArray(resoluciones) && resoluciones.length === 0)) {
        throw new NotFoundException('No se encontró ninguna resolución de pantalla');
      }

      return resoluciones;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ResolucionPantalla');
    }
  }

  async update(id: string, updateDto: UpdateResolucionPantallaDto) {
    try {
      const resolucion = await this.resolucionRepository.preload({ id, ...updateDto });
      if (!resolucion) throw new NotFoundException(`No se encontró la resolución con ID ${id}`);
      return await this.resolucionRepository.save(resolucion);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ResolucionPantalla');
    }
  }

  async remove(id: string) {
    try {
      const resolucion = await this.resolucionRepository.findOneBy({ id });
      if (!resolucion) throw new NotFoundException(`No se encontró la resolución con ID ${id}`);
      await this.resolucionRepository.remove(resolucion);
      return `Resolución de pantalla con ID ${id} eliminada correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'ResolucionPantalla');
    }
  }
}
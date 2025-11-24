import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoAlmacenamientoExtraible } from './entities/tipo-almacenamiento-extraible.entity';
import { Repository } from 'typeorm';
import { CreateTipoAlmacenamientoExtraibleDto } from './dto/create-tipo-almacenamiento-extraible.dto';
import { UpdateTipoAlmacenamientoExtraibleDto } from './dto/update-tipo-almacenamiento-extraible.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class TipoAlmacenamientoExtraibleService {
  constructor(
    @InjectRepository(TipoAlmacenamientoExtraible)
    private readonly almacenamientoRepository: Repository<TipoAlmacenamientoExtraible>,
  ) {}

  async create(createDto: CreateTipoAlmacenamientoExtraibleDto) {
    try {
      const almacenamiento = this.almacenamientoRepository.create(createDto);
      return await this.almacenamientoRepository.save(almacenamiento);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoAlmacenamientoExtraible');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.almacenamientoRepository.find({ take: limit, skip: offset });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoAlmacenamientoExtraible');
    }
  }

  async findByTerm(term: string) {
    let resultados: TipoAlmacenamientoExtraible | TipoAlmacenamientoExtraible[] | null;

    try {
      if (isUUID(term)) {
        resultados = await this.almacenamientoRepository.findOne({ where: { id: term } });
      } else {
        resultados = await this.almacenamientoRepository.createQueryBuilder('almacenamiento')
          .where('almacenamiento.tipo ILIKE :term', { term: `%${term}%` })
          .getMany();
      }

      if (!resultados || (Array.isArray(resultados) && resultados.length === 0)) {
        throw new NotFoundException('No se encontró ningún tipo de almacenamiento extraíble');
      }

      return resultados;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoAlmacenamientoExtraible');
    }
  }

  async update(id: string, updateDto: UpdateTipoAlmacenamientoExtraibleDto) {
    try {
      const almacenamiento = await this.almacenamientoRepository.preload({ id, ...updateDto });
      if (!almacenamiento) {
        throw new NotFoundException(`No se encontró el tipo de almacenamiento con ID ${id}`);
      }
      return await this.almacenamientoRepository.save(almacenamiento);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoAlmacenamientoExtraible');
    }
  }

  async remove(id: string) {
    try {
      const almacenamiento = await this.almacenamientoRepository.findOneBy({ id });
      if (!almacenamiento) {
        throw new NotFoundException(`No se encontró el tipo de almacenamiento con ID ${id}`);
      }
      await this.almacenamientoRepository.remove(almacenamiento);
      return `Tipo de almacenamiento extraíble con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoAlmacenamientoExtraible');
    }
  }
}
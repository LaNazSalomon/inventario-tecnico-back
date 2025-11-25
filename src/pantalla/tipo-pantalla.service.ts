import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoPantalla } from './entities/tipo-pantalla.entity';
import { Repository } from 'typeorm';
import { CreateTipoPantallaDto } from './dto/create-tipo-pantalla.dto';
import { UpdateTipoPantallaDto } from './dto/update-tipo-pantalla.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class TipoPantallaService {
  constructor(
    @InjectRepository(TipoPantalla)
    private readonly tipoPantallaRepository: Repository<TipoPantalla>,
  ) {}

  async create(createDto: CreateTipoPantallaDto) {
    try {
      const tipo = this.tipoPantallaRepository.create(createDto);
      return await this.tipoPantallaRepository.save(tipo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoPantalla');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.tipoPantallaRepository.find({ take: limit, skip: offset });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoPantalla');
    }
  }

  async findByTerm(term: string) {
    let tipos: TipoPantalla | TipoPantalla[] | null;

    try {
      if (isUUID(term)) {
        tipos = await this.tipoPantallaRepository.findOne({ where: { id: term } });
      } else {
        tipos = await this.tipoPantallaRepository.createQueryBuilder('tipo')
          .where('tipo.tipo ILIKE :term', { term: `%${term}%` })
          .getMany();
      }

      if (!tipos || (Array.isArray(tipos) && tipos.length === 0)) {
        throw new NotFoundException('No se encontró ningún tipo de pantalla');
      }

      return tipos;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoPantalla');
    }
  }

  async update(id: string, updateDto: UpdateTipoPantallaDto) {
    try {
      const tipo = await this.tipoPantallaRepository.preload({ id, ...updateDto });
      if (!tipo) throw new NotFoundException(`No se encontró el tipo de pantalla con ID ${id}`);
      return await this.tipoPantallaRepository.save(tipo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoPantalla');
    }
  }

  async remove(id: string) {
    try {
      const tipo = await this.tipoPantallaRepository.findOneBy({ id });
      if (!tipo) throw new NotFoundException(`No se encontró el tipo de pantalla con ID ${id}`);
      await this.tipoPantallaRepository.remove(tipo);
      return `Tipo de pantalla con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'TipoPantalla');
    }
  }
}
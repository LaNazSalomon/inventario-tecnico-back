import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEquipo } from './entities/tipo-equipo.entity';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class TipoEquipoService {
  constructor(
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,
  ) { }

  async create(createTipoEquipoDto: CreateTipoEquipoDto) {
    try {
      const existente = await this.tipoEquipoRepository.findOneBy({
        nombre: createTipoEquipoDto.nombre,
      });

      if (existente) {
        throw new ConflictException(
          'Ya existe un tipo de equipo con ese nombre',
        );
      }

      const tipoEquipo = this.tipoEquipoRepository.create(createTipoEquipoDto);
      return await this.tipoEquipoRepository.save(tipoEquipo);

    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Equipo');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.tipoEquipoRepository.find({ take: limit, skip: offset });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Equipo');
    }
  }

  async findByTerm(term: string) {
    let equipos: TipoEquipo | TipoEquipo[] | null;

    try {
      if (isUUID(term)) {
        equipos = await this.tipoEquipoRepository.findOne({ where: { id: term } });
      } else {
        equipos = await this.tipoEquipoRepository.createQueryBuilder('tipo')
          .where('tipo.nombre ILIKE :term', { term: `%${term}%` })
          .getMany();
      }

      if (!equipos || (Array.isArray(equipos) && equipos.length === 0)) {
        throw new NotFoundException('No se encontró ningún tipo de equipo');
      }

      return equipos;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Equipo');
    }
  }

  async update(id: string, updateDto: UpdateTipoEquipoDto) {
    try {
      const tipoEquipo = await this.tipoEquipoRepository.preload({ id, ...updateDto });
      if (!tipoEquipo) throw new NotFoundException(`No se encontró el tipo de equipo con ID ${id}`);
      return await this.tipoEquipoRepository.save(tipoEquipo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Equipo');
    }
  }

  async remove(id: string) {
    try {
      const tipoEquipo = await this.tipoEquipoRepository.findOneBy({ id });
      if (!tipoEquipo) throw new NotFoundException(`No se encontró el tipo de equipo con ID ${id}`);
      await this.tipoEquipoRepository.remove(tipoEquipo);
      return `Tipo de equipo con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Equipo');
    }
  }
}

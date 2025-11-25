import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcaEquipo } from './entities/marca-equipo.entity';
import { CreateMarcaEquipoDto } from './dto/create-marca-equipo.dto';
import { UpdateMarcaEquipoDto } from './dto/update-marca-equipo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class MarcaEquipoService {
  constructor(
    @InjectRepository(MarcaEquipo)
    private readonly marcaEquipoRepository: Repository<MarcaEquipo>,
  ) {}

  async create(createDto: CreateMarcaEquipoDto) {
    try {
      const existente = await this.marcaEquipoRepository.findOneBy({
        nombre: createDto.nombre,
      });

      if (existente) {
        throw new ConflictException('Ya existe una marca de equipo con ese nombre');
      }

      const marca = this.marcaEquipoRepository.create(createDto);
      return await this.marcaEquipoRepository.save(marca);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Marca-Equipo');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.marcaEquipoRepository.find({ take: limit, skip: offset });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Marca-Equipo');
    }
  }

  async findByTerm(term: string) {
    let marcas: MarcaEquipo | MarcaEquipo[] | null;

    try {
      if (isUUID(term)) {
        marcas = await this.marcaEquipoRepository.findOne({ where: { id: term } });
      } else {
        marcas = await this.marcaEquipoRepository.createQueryBuilder('marca')
          .where('marca.nombre ILIKE :term', { term: `%${term}%` })
          .getMany();
      }

      if (!marcas || (Array.isArray(marcas) && marcas.length === 0)) {
        throw new NotFoundException('No se encontró ninguna marca de equipo');
      }

      return marcas;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Marca-Equipo');
    }
  }

  async update(id: string, updateDto: UpdateMarcaEquipoDto) {
    try {
      const marca = await this.marcaEquipoRepository.preload({ id, ...updateDto });
      if (!marca) throw new NotFoundException(`No se encontró la marca con ID ${id}`);
      return await this.marcaEquipoRepository.save(marca);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Marca-Equipo');
    }
  }

  async remove(id: string) {
    try {
      const marca = await this.marcaEquipoRepository.findOneBy({ id });
      if (!marca) throw new NotFoundException(`No se encontró la marca con ID ${id}`);
      await this.marcaEquipoRepository.remove(marca);
      return `Marca de equipo con ID ${id} eliminada correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Marca-Equipo');
    }
  }
}

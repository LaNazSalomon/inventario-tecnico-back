import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoLicenciamientoDto } from './dto/create-estado-licenciamiento.dto';
import { UpdateEstadoLicenciamientoDto } from './dto/update-estado-licenciamiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoLicenciamiento } from './entities/estado-licenciamiento.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EstadoLicenciamientoService {
  constructor(
    @InjectRepository(EstadoLicenciamiento)
    private readonly estadoLicenciamientoRepository: Repository<EstadoLicenciamiento>,
  ) {}

  async create(createEstadoLicenciamientoDto: CreateEstadoLicenciamientoDto) {
    try {
      const estadoDB = this.estadoLicenciamientoRepository.create(createEstadoLicenciamientoDto);
      await this.estadoLicenciamientoRepository.save(estadoDB);
      return estadoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoLicenciamiento');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.estadoLicenciamientoRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoLicenciamiento');
    }
  }

  async findByTerm(term: string) {
    let estados: EstadoLicenciamiento | EstadoLicenciamiento[] | null;

    try {
      if (isUUID(term)) {
        estados = await this.estadoLicenciamientoRepository.findOne({
          where: { id: term },
        });
      } else {
        const queryBuilder = this.estadoLicenciamientoRepository.createQueryBuilder('estado');

        estados = await queryBuilder
          .where(`estado.estado ILIKE :term`, { term: `%${term}%` })
          .getMany();
      }

      if (!estados || (Array.isArray(estados) && estados.length === 0)) {
        throw new NotFoundException('No se encontró ningún estado de licenciamiento');
      }

      return estados;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoLicenciamiento');
    }
  }

  async update(id: string, updateEstadoLicenciamientoDto: UpdateEstadoLicenciamientoDto) {
    try {
      const estado = await this.estadoLicenciamientoRepository.preload({
        id,
        ...updateEstadoLicenciamientoDto,
      });

      if (!estado) {
        throw new NotFoundException(`No se encontró el estado de licenciamiento con ID ${id}`);
      }

      return await this.estadoLicenciamientoRepository.save(estado);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoLicenciamiento');
    }
  }

  async remove(id: string) {
    try {
      const estado = await this.estadoLicenciamientoRepository.findOneBy({ id });

      if (!estado) {
        throw new NotFoundException(`No se encontró el estado de licenciamiento con ID ${id}`);
      }

      await this.estadoLicenciamientoRepository.remove(estado);
      return `Estado de licenciamiento con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoLicenciamiento');
    }
  }
}
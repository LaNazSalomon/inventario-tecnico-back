import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoFuncionamientoDto } from './dto/create-estado-funcionamiento.dto';
import { UpdateEstadoFuncionamientoDto } from './dto/update-estado-funcionamiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoFuncionamiento } from './entities/estado-funcionamiento.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EstadoFuncionamientoService {
  constructor(
    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoFuncionamientoRepository: Repository<EstadoFuncionamiento>,
  ) {}

  async create(createEstadoFuncionamientoDto: CreateEstadoFuncionamientoDto) {
    try {
      const estadoDB = this.estadoFuncionamientoRepository.create(
        createEstadoFuncionamientoDto,
      );
      await this.estadoFuncionamientoRepository.save(estadoDB);
      return estadoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoFuncionamiento');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.estadoFuncionamientoRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoFuncionamiento');
    }
  }

  async findByTerm(term: string) {
    let estados: EstadoFuncionamiento | EstadoFuncionamiento[] | null;

    try {
      if (isUUID(term)) {
        estados = await this.estadoFuncionamientoRepository.findOne({
          where: { id: term },
        });
      } else {
        const queryBuilder =
          this.estadoFuncionamientoRepository.createQueryBuilder('estado');

        estados = await queryBuilder
          .where(`estado.estado ILIKE :term`, { term: `%${term}%` })
          .getMany();
      }

      if (!estados || (Array.isArray(estados) && estados.length === 0)) {
        throw new NotFoundException(
          'No se encontró ningún estado de funcionamiento',
        );
      }

      return estados;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoFuncionamiento');
    }
  }

  async update(
    id: string,
    updateEstadoFuncionamientoDto: UpdateEstadoFuncionamientoDto,
  ) {
    try {
      const estado = await this.estadoFuncionamientoRepository.preload({
        id,
        ...updateEstadoFuncionamientoDto,
      });

      if (!estado) {
        throw new NotFoundException(
          `No se encontró el estado de funcionamiento con ID ${id}`,
        );
      }

      return await this.estadoFuncionamientoRepository.save(estado);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoFuncionamiento');
    }
  }

  async remove(id: string) {
    try {
      const estado = await this.estadoFuncionamientoRepository.findOneBy({
        id,
      });

      if (!estado) {
        throw new NotFoundException(
          `No se encontró el estado de funcionamiento con ID ${id}`,
        );
      }

      await this.estadoFuncionamientoRepository.remove(estado);
      return `Estado de funcionamiento con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EstadoFuncionamiento');
    }
  }
}

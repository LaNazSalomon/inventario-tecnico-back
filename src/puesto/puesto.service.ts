import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePuestoDto } from './dto/create-puesto.dto';
import { UpdatePuestoDto } from './dto/update-puesto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Puesto } from './entities/puesto.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class PuestoService {
  constructor(
    @InjectRepository(Puesto)
    private readonly puestoRepository: Repository<Puesto>,
  ) {}

  async create(createPuestoDto: CreatePuestoDto) {
    try {
      const puestoDB = this.puestoRepository.create(createPuestoDto);
      await this.puestoRepository.save(puestoDB);
      return puestoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Puesto');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.puestoRepository.find({
        take: limit,
        skip: offset,
        relations: ['empleados'],
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Puesto');
    }
  }

  async findByTerm(term: string) {
    let puestos: Puesto | Puesto[] | null;

    try {
      if (isUUID(term)) {
        puestos = await this.puestoRepository.findOne({
          where: { idPuesto: term },
          relations: ['empleados'],
        });
      } else {
        const queryBuilder = this.puestoRepository.createQueryBuilder('puesto');

        puestos = await queryBuilder
          .leftJoinAndSelect('puesto.empleados', 'empleados')
          .where(
            `(puesto.nombrePuesto ILIKE :term OR puesto.descripcion ILIKE :term)`,
            { term: `%${term}%` },
          )
          .getMany();
      }

      if (!puestos || (Array.isArray(puestos) && puestos.length === 0)) {
        throw new NotFoundException('No se encontró ningún puesto');
      }

      return puestos;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Puesto');
    }
  }

  async update(id: string, updatePuestoDto: UpdatePuestoDto) {
    try {
      const puesto = await this.puestoRepository.preload({
        idPuesto: id,
        ...updatePuestoDto,
      });

      if (!puesto) {
        throw new NotFoundException(`No se encontró el puesto con ID ${id}`);
      }

      return await this.puestoRepository.save(puesto);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Puesto');
    }
  }

  async remove(id: string) {
    try {
      const puesto = await this.puestoRepository.findOneBy({ idPuesto: id });

      if (!puesto) {
        throw new NotFoundException(`No se encontró el puesto con ID ${id}`);
      }

      await this.puestoRepository.remove(puesto);
      return `Puesto con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Puesto');
    }
  }
}
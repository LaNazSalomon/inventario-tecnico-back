import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModeloEquipo } from './entities/modelo-equipo.entity';
import { CreateModeloEquipoDto } from './dto/create-modelo-equipo.dto';
import { UpdateModeloEquipoDto } from './dto/update-modelo-equipo.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class ModeloEquipoService {
  constructor(
    @InjectRepository(ModeloEquipo)
    private readonly modeloEquipoRepository: Repository<ModeloEquipo>,
  ) {}

  async create(createDto: CreateModeloEquipoDto) {
    try {
      const existente = await this.modeloEquipoRepository.findOne({
        where: { nombre: createDto.nombre, marca: { id: createDto.marcaId } },
        relations: ['marca'],
      });

      if (existente) {
        throw new ConflictException('Ya existe un modelo con ese nombre para esta marca');
      }

      const modelo = this.modeloEquipoRepository.create({
        nombre: createDto.nombre,
        marca: { id: createDto.marcaId } as any,
      });

      return await this.modeloEquipoRepository.save(modelo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Modelo-Equipo');
    }
  }

  async findAll() {
    try {
      return await this.modeloEquipoRepository.find({ relations: ['marca'] });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Modelo-Equipo');
    }
  }

  async findByTerm(term: string) {
    let modelos: ModeloEquipo | ModeloEquipo[] | null;

    try {
      if (isUUID(term)) {
        modelos = await this.modeloEquipoRepository.findOne({
          where: { id: term },
          relations: ['marca'],
        });
      } else {
        modelos = await this.modeloEquipoRepository.createQueryBuilder('modelo')
          .leftJoinAndSelect('modelo.marca', 'marca')
          .where('modelo.nombre ILIKE :term', { term: `%${term}%` })
          .orWhere('marca.nombre ILIKE :term', { term: `%${term}%` })
          .getMany();
      }

      if (!modelos || (Array.isArray(modelos) && modelos.length === 0)) {
        throw new NotFoundException('No se encontró ningún modelo de equipo');
      }

      return modelos;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Modelo-Equipo');
    }
  }

  async update(id: string, updateDto: UpdateModeloEquipoDto) {
    try {
      const modelo = await this.modeloEquipoRepository.preload({
        id,
        ...updateDto,
        marca: updateDto.marcaId ? { id: updateDto.marcaId } as any : undefined,
      });

      if (!modelo) throw new NotFoundException(`No se encontró el modelo con ID ${id}`);
      return await this.modeloEquipoRepository.save(modelo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Modelo-Equipo');
    }
  }

  async remove(id: string) {
    try {
      const modelo = await this.modeloEquipoRepository.findOne({
        where: { id },
        relations: ['marca'],
      });
      if (!modelo) throw new NotFoundException(`No se encontró el modelo con ID ${id}`);
      await this.modeloEquipoRepository.remove(modelo);
      return `Modelo de equipo con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Modelo-Equipo');
    }
  }
}

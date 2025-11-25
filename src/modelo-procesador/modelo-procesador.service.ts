import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModeloProcesador } from './entities/modelo-procesador.entity';
import { CreateModeloProcesadorDto } from './dto/create-modelo-procesador.dto';
import { UpdateModeloProcesadorDto } from './dto/update-modelo-procesador.dto';
import { TipoProcesador } from 'src/tipo-procesador/entities/tipo-procesador.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class ModeloProcesadorService {
  constructor(
    @InjectRepository(ModeloProcesador)
    private readonly modeloProcesadorRepository: Repository<ModeloProcesador>,

    @InjectRepository(TipoProcesador)
    private readonly tipoProcesadorRepository: Repository<TipoProcesador>,
  ) {}

  async create(createDto: CreateModeloProcesadorDto) {
    // Validar relación con TipoProcesador
    const tipo = await this.tipoProcesadorRepository.findOneBy({
      id: createDto.tipoProcesadorId,
    });
    if (!tipo) {
      throw new NotFoundException(
        `Tipo de procesador con ID ${createDto.tipoProcesadorId} no encontrado`,
      );
    }

    const modelo = this.modeloProcesadorRepository.create({
      nombre: createDto.nombre,
      tipo,
    });

    return await this.modeloProcesadorRepository.save(modelo);
  }

  async findAll() {
    return await this.modeloProcesadorRepository.find({ relations: ['tipo'] });
  }

  async findByTerm(term: string) {
    let modelo: ModeloProcesador | ModeloProcesador[] | null;

    if (isUUID(term)) {
      modelo = await this.modeloProcesadorRepository.findOne({
        where: { id: term },
        relations: ['tipo'],
      });
    } else {
      modelo = await this.modeloProcesadorRepository
        .createQueryBuilder('modelo')
        .leftJoinAndSelect('modelo.tipo', 'tipo')
        .where('modelo.nombre ILIKE :term', { term: `%${term}%` })
        .getMany();
    }

    if (!modelo || (Array.isArray(modelo) && modelo.length === 0)) {
      throw new NotFoundException(
        `No se encontró ningún modelo de procesador con el término: ${term}`,
      );
    }

    return modelo;
  }

  async update(id: string, updateDto: UpdateModeloProcesadorDto) {
    let tipo: TipoProcesador | null | undefined;
    if (updateDto.tipoProcesadorId) {
      tipo = await this.tipoProcesadorRepository.findOneBy({
        id: updateDto.tipoProcesadorId,
      });
    }

    if (!tipo) {
      throw new NotFoundException(
        `Tipo de procesador con ID ${updateDto.tipoProcesadorId} no encontrado`,
      );
    }

    const modelo = await this.modeloProcesadorRepository.preload({
      id,
      ...updateDto,
      tipo,
    });

    if (!modelo) {
      throw new NotFoundException(
        `Modelo de procesador con ID ${id} no encontrado`,
      );
    }

    return await this.modeloProcesadorRepository.save(modelo);
  }

  async remove(id: string) {
    const modelo = await this.modeloProcesadorRepository.findOneBy({ id });
    if (!modelo) {
      throw new NotFoundException(
        `Modelo de procesador con ID ${id} no encontrado`,
      );
    }
    return await this.modeloProcesadorRepository.remove(modelo);
  }
}

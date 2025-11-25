import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoProcesador } from './entities/tipo-procesador.entity';
import { CreateTipoProcesadorDto } from './dto/create-tipo-procesador.dto';
import { UpdateTipoProcesadorDto } from './dto/update-tipo-procesador.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TipoProcesadorService {
  constructor(
    @InjectRepository(TipoProcesador)
    private readonly tipoProcesadorRepository: Repository<TipoProcesador>,
  ) {}

  async create(createDto: CreateTipoProcesadorDto) {
    const tipoProcesador = this.tipoProcesadorRepository.create({
      nombre: createDto.nombre,
    });
    return await this.tipoProcesadorRepository.save(tipoProcesador);
  }

  async findAll() {
    return await this.tipoProcesadorRepository.find();
  }

  async findByTerm(term: string) {
    let tipoProcesador: TipoProcesador | TipoProcesador[] | null;

    if (isUUID(term)) {
      // Buscar directamente por UUID
      tipoProcesador = await this.tipoProcesadorRepository.findOne({
        where: { id: term },
      });
    } else {
      // Buscar por coincidencia parcial en el campo "nombre"
      tipoProcesador = await this.tipoProcesadorRepository
        .createQueryBuilder('tipoProcesador')
        .where('tipoProcesador.nombre ILIKE :term', { term: `%${term}%` })
        .getMany();
    }

    if (
      !tipoProcesador ||
      (Array.isArray(tipoProcesador) && tipoProcesador.length === 0)
    ) {
      throw new NotFoundException(
        `No se encontró ningún tipo de procesador con el término: ${term}`,
      );
    }

    return tipoProcesador;
  }

  async update(id: string, updateDto: UpdateTipoProcesadorDto) {
    const tipoProcesador = await this.tipoProcesadorRepository.preload({
      id,
      ...updateDto,
    });
    if (!tipoProcesador) {
      throw new NotFoundException(
        `Tipo de procesador con ID ${id} no encontrado`,
      );
    }
    return await this.tipoProcesadorRepository.save(tipoProcesador);
  }

  async remove(id: string) {
    const tipoProcesador = await this.tipoProcesadorRepository.findOneBy({
      id,
    });
    if (!tipoProcesador) {
      throw new NotFoundException(
        `Tipo de procesador con ID ${id} no encontrado`,
      );
    }
    return await this.tipoProcesadorRepository.remove(tipoProcesador);
  }
}

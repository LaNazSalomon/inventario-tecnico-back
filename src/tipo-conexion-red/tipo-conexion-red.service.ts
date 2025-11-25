import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoConexionRed } from './entities/tipo-conexion-red.entity';
import { CreateTipoConexionRedDto } from './dto/create-tipo-conexion-red.dto';
import { UpdateTipoConexionRedDto } from './dto/update-tipo-conexion-red.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TipoConexionRedService {
  constructor(
    @InjectRepository(TipoConexionRed)
    private readonly tipoConexionRedRepository: Repository<TipoConexionRed>,
  ) {}

  async create(createDto: CreateTipoConexionRedDto) {
    const tipoConexion = this.tipoConexionRedRepository.create({
      tipo: createDto.tipo,
    });
    return await this.tipoConexionRedRepository.save(tipoConexion);
  }

  async findAll() {
    return await this.tipoConexionRedRepository.find();
  }

  async findByTerm(term: string) {
    let tipoConexion: TipoConexionRed | TipoConexionRed[] | null;

    if (isUUID(term)) {
      // Buscar directamente por UUID
      tipoConexion = await this.tipoConexionRedRepository.findOne({
        where: { id: term },
      });
    } else {
      // Buscar por coincidencia parcial en el campo "tipo"
      tipoConexion = await this.tipoConexionRedRepository
        .createQueryBuilder('tipoConexion')
        .where('tipoConexion.tipo ILIKE :term', { term: `%${term}%` })
        .getMany();
    }

    if (
      !tipoConexion ||
      (Array.isArray(tipoConexion) && tipoConexion.length === 0)
    ) {
      throw new NotFoundException(
        `No se encontró ningún tipo de conexión con el término: ${term}`,
      );
    }

    return tipoConexion;
  }

  async update(id: string, updateDto: UpdateTipoConexionRedDto) {
    const tipoConexion = await this.tipoConexionRedRepository.preload({
      id,
      ...updateDto,
    });
    if (!tipoConexion) {
      throw new NotFoundException(
        `Tipo de conexión con ID ${id} no encontrado`,
      );
    }
    return await this.tipoConexionRedRepository.save(tipoConexion);
  }

  async remove(id: string) {
    const tipoConexion = await this.tipoConexionRedRepository.findOneBy({ id });
    if (!tipoConexion) {
      throw new NotFoundException(
        `Tipo de conexión con ID ${id} no encontrado`,
      );
    }
    return await this.tipoConexionRedRepository.remove(tipoConexion);
  }
}

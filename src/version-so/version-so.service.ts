import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVersionSoDto } from './dto/create-version-so.dto';
import { UpdateVersionSoDto } from './dto/update-version-so.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VersionSO } from './entities/version-so.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class VersionSoService {
  constructor(
    @InjectRepository(VersionSO)
    private readonly versionSoRepository: Repository<VersionSO>,
  ) {}

  async create(createVersionSoDto: CreateVersionSoDto) {
    try {
      const versionSoDB = this.versionSoRepository.create({
        version: createVersionSoDto.version,
      });

      await this.versionSoRepository.save(versionSoDB);
      return versionSoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'VersionSO');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;

      return await this.versionSoRepository.find({
        take: limit,
        skip: offset,
        relations: ['sistemaOperativo'],
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'VersionSO');
    }
  }

  async findByTerm(term: string) {
    let versiones: VersionSO | VersionSO[] | null;

    try {
      if (isUUID(term)) {
        versiones = await this.versionSoRepository.findOne({
          where: { id: term },
          relations: ['sistemaOperativo'],
        });
      } else {
        const queryBuilder =
          this.versionSoRepository.createQueryBuilder('version');

        versiones = await queryBuilder
          .leftJoinAndSelect('version.sistemaOperativo', 'so')
          .where(`(version.version ILIKE :term OR so.nombre ILIKE :term)`, {
            term: `%${term}%`,
          })
          .getMany();
      }

      if (!versiones || (Array.isArray(versiones) && versiones.length === 0)) {
        throw new NotFoundException(
          'No se encontró ninguna versión de sistema operativo',
        );
      }

      return versiones;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'VersionSO');
    }
  }

  async update(id: string, updateVersionSoDto: UpdateVersionSoDto) {
    try {
      const versionSo = await this.versionSoRepository.preload({
        id,
        ...updateVersionSoDto,
      });

      if (!versionSo) {
        throw new NotFoundException(`No se encontró la versión con ID ${id}`);
      }

      return await this.versionSoRepository.save(versionSo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'VersionSO');
    }
  }

  async remove(id: string) {
    try {
      const versionSo = await this.versionSoRepository.findOneBy({ id });

      if (!versionSo) {
        throw new NotFoundException(`No se encontró la versión con ID ${id}`);
      }

      await this.versionSoRepository.remove(versionSo);
      return `Versión de sistema operativo con ID ${id} eliminada correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'VersionSO');
    }
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { TipoEquipo } from './entities/tipo-equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class TipoEquipoService {
  constructor(
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,
  ) {}

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
      await this.tipoEquipoRepository.save(tipoEquipo);

      return 'Tipo de equipo creado exitosamente';

    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Equipo');
    }
  }

  findAll() {
    return `This action returns all tipoEquipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoEquipo`;
  }

  update(id: number, updateTipoEquipoDto: UpdateTipoEquipoDto) {
    return `This action updates a #${id} tipoEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoEquipo`;
  }
}

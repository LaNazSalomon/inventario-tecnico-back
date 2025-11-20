import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMarcaEquipoDto } from './dto/create-marca-equipo.dto';
import { UpdateMarcaEquipoDto } from './dto/update-marca-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaEquipo } from './entities/marca-equipo.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class MarcaEquipoService {
  constructor(
    @InjectRepository(MarcaEquipo)
    private readonly marcaEquipoRepository: Repository<MarcaEquipo>,
  ) {}

  async create(createMarcaEquipoDto: CreateMarcaEquipoDto) {
    try {
      const existente = await this.marcaEquipoRepository.findOneBy({
        nombre: createMarcaEquipoDto.nombre,
      });

      if (existente) {
        throw new ConflictException(
          'Ya existe una marca con ese nombre',
        );
      }


      const marcaEquipo = this.marcaEquipoRepository.create( createMarcaEquipoDto );
      await this.marcaEquipoRepository.save( marcaEquipo );

      return 'Marca registrada correctamente.';

    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Marca-Equipo');
    }
  }

  findAll() {
    return `This action returns all marcaEquipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marcaEquipo`;
  }

  update(id: number, updateMarcaEquipoDto: UpdateMarcaEquipoDto) {
    return `This action updates a #${id} marcaEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} marcaEquipo`;
  }
}

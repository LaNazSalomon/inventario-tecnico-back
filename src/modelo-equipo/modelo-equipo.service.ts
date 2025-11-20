import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModeloEquipoDto } from './dto/create-modelo-equipo.dto';
import { UpdateModeloEquipoDto } from './dto/update-modelo-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloEquipo } from './entities/modelo-equipo.entity';
import { Repository } from 'typeorm';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class ModeloEquipoService {
  constructor(
    @InjectRepository(ModeloEquipo)
    private readonly modeloEquipoRepository: Repository<ModeloEquipo>,
    @InjectRepository(MarcaEquipo)
    private readonly marcaEquipoRepository: Repository<MarcaEquipo>,
  ) {}


  //TODO: Ver si hay posibilidad que poniendo el modelo ya no tengamos que poner
  //* La marca en los equipos y que esto se cargue automaticamente
  async create(createModeloEquipoDto: CreateModeloEquipoDto) {
    try {
      const { marcaId, ...restoDatos } = createModeloEquipoDto;

      const marca = await this.marcaEquipoRepository.findOne({
        where: { id: marcaId },
      });

      if (!marca) throw new NotFoundException('No se encontro la marca.');

      const modeloEquipo = this.modeloEquipoRepository.create({
        ...restoDatos,
        marca,
      });

      await this.modeloEquipoRepository.save(modeloEquipo);

      return 'Modelo de equipo registrado exitosamente.';
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Modelo-Equipo');

    }
  }

  findAll() {
    return `This action returns all modeloEquipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modeloEquipo`;
  }

  update(id: number, updateModeloEquipoDto: UpdateModeloEquipoDto) {
    return `This action updates a #${id} modeloEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} modeloEquipo`;
  }
}

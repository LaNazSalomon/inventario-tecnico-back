import { Injectable } from '@nestjs/common';
import { CreateModeloEquipoDto } from './dto/create-modelo-equipo.dto';
import { UpdateModeloEquipoDto } from './dto/update-modelo-equipo.dto';

@Injectable()
export class ModeloEquipoService {
  create(createModeloEquipoDto: CreateModeloEquipoDto) {
    return 'This action adds a new modeloEquipo';
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

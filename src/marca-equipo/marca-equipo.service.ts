import { Injectable } from '@nestjs/common';
import { CreateMarcaEquipoDto } from './dto/create-marca-equipo.dto';
import { UpdateMarcaEquipoDto } from './dto/update-marca-equipo.dto';

@Injectable()
export class MarcaEquipoService {
  create(createMarcaEquipoDto: CreateMarcaEquipoDto) {
    return 'This action adds a new marcaEquipo';
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

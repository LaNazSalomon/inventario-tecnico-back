import { Injectable } from '@nestjs/common';
import { CreateTipoConexionRedDto } from './dto/create-tipo-conexion-red.dto';
import { UpdateTipoConexionRedDto } from './dto/update-tipo-conexion-red.dto';

@Injectable()
export class TipoConexionRedService {
  create(createTipoConexionRedDto: CreateTipoConexionRedDto) {
    return 'This action adds a new tipoConexionRed';
  }

  findAll() {
    return `This action returns all tipoConexionRed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoConexionRed`;
  }

  update(id: number, updateTipoConexionRedDto: UpdateTipoConexionRedDto) {
    return `This action updates a #${id} tipoConexionRed`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoConexionRed`;
  }
}

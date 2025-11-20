import { Injectable } from '@nestjs/common';
import { CreateTipoVelocidadDto } from './dto/create-tipo-velocidad.dto';
import { UpdateTipoVelocidadDto } from './dto/update-tipo-velocidad.dto';

@Injectable()
export class TipoVelocidadService {
  create(createTipoVelocidadDto: CreateTipoVelocidadDto) {
    return 'This action adds a new tipoVelocidad';
  }

  findAll() {
    return `This action returns all tipoVelocidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoVelocidad`;
  }

  update(id: number, updateTipoVelocidadDto: UpdateTipoVelocidadDto) {
    return `This action updates a #${id} tipoVelocidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoVelocidad`;
  }
}

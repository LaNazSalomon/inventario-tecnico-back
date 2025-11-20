import { Injectable } from '@nestjs/common';
import { CreateTipoProcesadorDto } from './dto/create-tipo-procesador.dto';
import { UpdateTipoProcesadorDto } from './dto/update-tipo-procesador.dto';

@Injectable()
export class TipoProcesadorService {
  create(createTipoProcesadorDto: CreateTipoProcesadorDto) {
    return 'This action adds a new tipoProcesador';
  }

  findAll() {
    return `This action returns all tipoProcesador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoProcesador`;
  }

  update(id: number, updateTipoProcesadorDto: UpdateTipoProcesadorDto) {
    return `This action updates a #${id} tipoProcesador`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoProcesador`;
  }
}

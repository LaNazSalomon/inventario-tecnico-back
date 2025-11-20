import { Injectable } from '@nestjs/common';
import { CreateEstadosSoDto } from './dto/create-estados-so.dto';
import { UpdateEstadosSoDto } from './dto/update-estados-so.dto';

@Injectable()
export class EstadosSoService {
  create(createEstadosSoDto: CreateEstadosSoDto) {
    return 'This action adds a new estadosSo';
  }

  findAll() {
    return `This action returns all estadosSo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadosSo`;
  }

  update(id: number, updateEstadosSoDto: UpdateEstadosSoDto) {
    return `This action updates a #${id} estadosSo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadosSo`;
  }
}

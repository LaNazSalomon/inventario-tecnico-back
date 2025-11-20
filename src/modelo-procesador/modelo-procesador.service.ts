import { Injectable } from '@nestjs/common';
import { CreateModeloProcesadorDto } from './dto/create-modelo-procesador.dto';
import { UpdateModeloProcesadorDto } from './dto/update-modelo-procesador.dto';

@Injectable()
export class ModeloProcesadorService {
  create(createModeloProcesadorDto: CreateModeloProcesadorDto) {
    return 'This action adds a new modeloProcesador';
  }

  findAll() {
    return `This action returns all modeloProcesador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modeloProcesador`;
  }

  update(id: number, updateModeloProcesadorDto: UpdateModeloProcesadorDto) {
    return `This action updates a #${id} modeloProcesador`;
  }

  remove(id: number) {
    return `This action removes a #${id} modeloProcesador`;
  }
}

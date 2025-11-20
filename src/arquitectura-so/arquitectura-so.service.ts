import { Injectable } from '@nestjs/common';
import { CreateArquitecturaSoDto } from './dto/create-arquitectura-so.dto';
import { UpdateArquitecturaSoDto } from './dto/update-arquitectura-so.dto';

@Injectable()
export class ArquitecturaSoService {
  create(createArquitecturaSoDto: CreateArquitecturaSoDto) {
    return 'This action adds a new arquitecturaSo';
  }

  findAll() {
    return `This action returns all arquitecturaSo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} arquitecturaSo`;
  }

  update(id: number, updateArquitecturaSoDto: UpdateArquitecturaSoDto) {
    return `This action updates a #${id} arquitecturaSo`;
  }

  remove(id: number) {
    return `This action removes a #${id} arquitecturaSo`;
  }
}

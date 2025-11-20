import { Injectable } from '@nestjs/common';
import { CreateSistemaOperativoDto } from './dto/create-sistema-operativo.dto';
import { UpdateSistemaOperativoDto } from './dto/update-sistema-operativo.dto';

@Injectable()
export class SistemaOperativoService {
  create(createSistemaOperativoDto: CreateSistemaOperativoDto) {
    return 'This action adds a new sistemaOperativo';
  }

  findAll() {
    return `This action returns all sistemaOperativo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sistemaOperativo`;
  }

  update(id: number, updateSistemaOperativoDto: UpdateSistemaOperativoDto) {
    return `This action updates a #${id} sistemaOperativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} sistemaOperativo`;
  }
}

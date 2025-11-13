import { Injectable } from '@nestjs/common';
import { CreateEquiposComputoDto } from './dto/create-equipos-computo.dto';
import { UpdateEquiposComputoDto } from './dto/update-equipos-computo.dto';

@Injectable()
export class EquiposComputoService {
  create(createEquiposComputoDto: CreateEquiposComputoDto) {
    return 'This action adds a new equiposComputo';
  }

  findAll() {
    return `This action returns all equiposComputo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equiposComputo`;
  }

  update(id: number, updateEquiposComputoDto: UpdateEquiposComputoDto) {
    return `This action updates a #${id} equiposComputo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equiposComputo`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUnidadAcademicaDto } from './dto/create-unidad-academica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidad-academica.dto';

@Injectable()
export class UnidadAcademicaService {
  create(createUnidadAcademicaDto: CreateUnidadAcademicaDto) {
    return 'This action adds a new unidadAcademica';
  }

  findAll() {
    return `This action returns all unidadAcademica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidadAcademica`;
  }

  update(id: number, updateUnidadAcademicaDto: UpdateUnidadAcademicaDto) {
    return `This action updates a #${id} unidadAcademica`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidadAcademica`;
  }
}

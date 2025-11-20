import { Injectable } from '@nestjs/common';
import { CreateEstadoLicenciamientoDto } from './dto/create-estado-licenciamiento.dto';
import { UpdateEstadoLicenciamientoDto } from './dto/update-estado-licenciamiento.dto';

@Injectable()
export class EstadoLicenciamientoService {
  create(createEstadoLicenciamientoDto: CreateEstadoLicenciamientoDto) {
    return 'This action adds a new estadoLicenciamiento';
  }

  findAll() {
    return `This action returns all estadoLicenciamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoLicenciamiento`;
  }

  update(id: number, updateEstadoLicenciamientoDto: UpdateEstadoLicenciamientoDto) {
    return `This action updates a #${id} estadoLicenciamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoLicenciamiento`;
  }
}

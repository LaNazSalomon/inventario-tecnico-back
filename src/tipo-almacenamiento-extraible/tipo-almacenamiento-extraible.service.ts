import { Injectable } from '@nestjs/common';
import { CreateTipoAlmacenamientoExtraibleDto } from './dto/create-tipo-almacenamiento-extraible.dto';
import { UpdateTipoAlmacenamientoExtraibleDto } from './dto/update-tipo-almacenamiento-extraible.dto';

@Injectable()
export class TipoAlmacenamientoExtraibleService {
  create(createTipoAlmacenamientoExtraibleDto: CreateTipoAlmacenamientoExtraibleDto) {
    return 'This action adds a new tipoAlmacenamientoExtraible';
  }

  findAll() {
    return `This action returns all tipoAlmacenamientoExtraible`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoAlmacenamientoExtraible`;
  }

  update(id: number, updateTipoAlmacenamientoExtraibleDto: UpdateTipoAlmacenamientoExtraibleDto) {
    return `This action updates a #${id} tipoAlmacenamientoExtraible`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoAlmacenamientoExtraible`;
  }
}

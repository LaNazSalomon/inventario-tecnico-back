import { Injectable } from '@nestjs/common';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MantenimientoService {


  constructor(
    @InjectRepository(Mantenimiento)
    private readonly mantenimientoRepository: Repository<Mantenimiento>,
  ){}

  create(createMantenimientoDto: CreateMantenimientoDto) {
    const mantenimiento = this.mantenimientoRepository.create(createMantenimientoDto);
  }

  findAll() {
    return `This action returns all mantenimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mantenimiento`;
  }

  update(id: number, updateMantenimientoDto: UpdateMantenimientoDto) {
    return `This action updates a #${id} mantenimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} mantenimiento`;
  }
}

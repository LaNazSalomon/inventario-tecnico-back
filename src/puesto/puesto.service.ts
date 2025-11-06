import { Injectable } from '@nestjs/common';
import { CreatePuestoDto } from './dto/create-puesto.dto';
import { UpdatePuestoDto } from './dto/update-puesto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Puesto } from './entities/puesto.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class PuestoService {

  constructor(
    @InjectRepository( Puesto )
    private readonly puestoRepository: Repository< Puesto >,
  ){}


  async create(createPuestoDto: CreatePuestoDto) {
    try {

      const puestoDB = this.puestoRepository.create( createPuestoDto );

      await this.puestoRepository.save( puestoDB );

      return puestoDB;


    }catch ( err ){
      ManejadorErroresDB.erroresDB( err, 'Puesto' );
    }
  }

  findAll() {
    return `This action returns all puesto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puesto`;
  }

  update(id: number, updatePuestoDto: UpdatePuestoDto) {
    return `This action updates a #${id} puesto`;
  }

  remove(id: number) {
    return `This action removes a #${id} puesto`;
  }
}

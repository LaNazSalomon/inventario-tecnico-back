import { Injectable } from '@nestjs/common';
import { CreateUnidadAcademicaDto } from './dto/create-unidad-academica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidad-academica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadAcademica } from './entities/unidad-academica.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class UnidadAcademicaService {
  constructor(
    @InjectRepository(UnidadAcademica)
    private readonly unidadRepository: Repository<UnidadAcademica>,
  ) {}

  async create(createUnidadAcademicaDto: CreateUnidadAcademicaDto) {
    try {
      const unidadAcademica = this.unidadRepository.create(
        createUnidadAcademicaDto,
      );

      await this.unidadRepository.save(unidadAcademica);
      return unidadAcademica;
      
    } catch (err) {

      ManejadorErroresDB.erroresDB( err, 'Unidad Academica' );

    }

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

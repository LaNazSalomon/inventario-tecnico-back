import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(UnidadAcademica)
    private readonly unidadRepository: Repository<UnidadAcademica>,
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    try {
      //Primero vamos por la unidad academica para poder cargarla a nuestro departamento
      const unidad = await this.unidadRepository.findOneBy({
        idUnidadAcademica: createDepartamentoDto.idUnidadAcademica,
      });

      if (!unidad) {
        throw new Error('Unidad académica no encontrada');
      }

      const createDepartamentoDB = this.departamentoRepository.create({
        ...createDepartamentoDto,
        unidadAcademica: unidad
      });
      await this.departamentoRepository.save(createDepartamentoDB);

      return createDepartamentoDB;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Departamento');
    }
  }

  findAll() {
    return `This action returns all departamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}

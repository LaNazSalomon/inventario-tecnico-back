import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModeloProcesadorDto } from './dto/create-modelo-procesador.dto';
import { UpdateModeloProcesadorDto } from './dto/update-modelo-procesador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloProcesador } from './entities/modelo-procesador.entity';
import { Repository } from 'typeorm';
import { TipoProcesador } from 'src/tipo-procesador/entities/tipo-procesador.entity';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class ModeloProcesadorService {
  constructor(
    @InjectRepository(ModeloProcesador)
    private readonly modeloProcesadorRepository: Repository<ModeloProcesador>,
    @InjectRepository(TipoProcesador)
    private readonly tipoProcesadorRepository: Repository<TipoProcesador>
  ){}

  async create(createModeloProcesadorDto: CreateModeloProcesadorDto): Promise<string> {
  try {
    const { nombre, tipoProcesadorId } = createModeloProcesadorDto;

    const tipoProcesador = await this.tipoProcesadorRepository.findOne({
      where: { id: tipoProcesadorId },
    });

    if (!tipoProcesador) {
      throw new NotFoundException('No se encontró el tipo de procesador especificado.');
    }


    const existente = await this.modeloProcesadorRepository.findOne({
      where: {
        nombre,
        tipo:  { id: tipoProcesadorId },
      },
      relations: ['tipo'],
    });

    if (existente) {
      throw new ConflictException('Ya existe un modelo con ese nombre para este tipo de procesador.');
    }

    const nuevoModelo = this.modeloProcesadorRepository.create({
      nombre,
      tipo: tipoProcesador,
    });

    await this.modeloProcesadorRepository.save(nuevoModelo);

    return 'Modelo de procesador registrado exitosamente.';
  } catch (err) {
    ManejadorErroresDB.erroresDB(err, 'Modelo-Procesador');
  }
}

  findAll() {
    return `This action returns all modeloProcesador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modeloProcesador`;
  }

  update(id: number, updateModeloProcesadorDto: UpdateModeloProcesadorDto) {
    return `This action updates a #${id} modeloProcesador`;
  }

  remove(id: number) {
    return `This action removes a #${id} modeloProcesador`;
  }
}

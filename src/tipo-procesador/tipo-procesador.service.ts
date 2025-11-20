import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTipoProcesadorDto } from './dto/create-tipo-procesador.dto';
import { UpdateTipoProcesadorDto } from './dto/update-tipo-procesador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoProcesador } from './entities/tipo-procesador.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class TipoProcesadorService {
  constructor(
    @InjectRepository(TipoProcesador)
    private readonly tipoProcesadorRepository: Repository<TipoProcesador>,
  ) {}

  async create(
    createTipoProcesadorDto: CreateTipoProcesadorDto,
  ): Promise<string> {
    try {
      const nombreProcesador = createTipoProcesadorDto.nombre;

      const existente = await this.tipoProcesadorRepository.findOne({
        where: { nombre: nombreProcesador },
      });

      if (existente) {
        throw new ConflictException(
          'Ya existe un tipo de procesador con ese nombre.',
        );
      }

      const nuevoTipo = this.tipoProcesadorRepository.create({
        nombre: createTipoProcesadorDto.nombre,
      });

      await this.tipoProcesadorRepository.save(nuevoTipo);

      return 'Tipo de procesador registrado exitosamente.';
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Procesador');
    }
  }

  findAll() {
    return `This action returns all tipoProcesador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoProcesador`;
  }

  update(id: number, updateTipoProcesadorDto: UpdateTipoProcesadorDto) {
    return `This action updates a #${id} tipoProcesador`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoProcesador`;
  }
}

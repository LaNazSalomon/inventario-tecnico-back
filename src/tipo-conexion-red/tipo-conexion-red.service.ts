import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTipoConexionRedDto } from './dto/create-tipo-conexion-red.dto';
import { UpdateTipoConexionRedDto } from './dto/update-tipo-conexion-red.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoConexionRed } from './entities/tipo-conexion-red.entity';
import { Repository } from 'typeorm';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';

@Injectable()
export class TipoConexionRedService {
  constructor(
    @InjectRepository(TipoConexionRed)
    private readonly tipoConexionRedRepository: Repository<TipoConexionRed>,
  ) {}

  async create(
    createTipoConexionRedDto: CreateTipoConexionRedDto,
  ): Promise<string> {
    try {
      const tipoExistente = await this.tipoConexionRedRepository.findOne({
        where: { tipo: createTipoConexionRedDto.tipo.trim().toUpperCase() },
      });

      if (tipoExistente) {
        throw new ConflictException(
          'Ya existe un tipo de conexión con ese nombre.',
        );
      }

      const nuevoTipo = this.tipoConexionRedRepository.create({
        tipo: createTipoConexionRedDto.tipo.trim().toUpperCase(),
      });

      await this.tipoConexionRedRepository.save(nuevoTipo);

      return 'Tipo de conexión de red registrado exitosamente.';
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'Tipo-Conexión-Red');
    }
  }

  findAll() {
    return `This action returns all tipoConexionRed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoConexionRed`;
  }

  update(id: number, updateTipoConexionRedDto: UpdateTipoConexionRedDto) {
    return `This action updates a #${id} tipoConexionRed`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoConexionRed`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servidor } from './entities/servidor.entity';
import { CreateServidorDto } from './dto/create-servidor.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ServidorService {
  constructor(
    @InjectRepository(Servidor)
    private readonly servidorRepository: Repository<Servidor>,
  ) {}

  async create(createServidorDto: CreateServidorDto): Promise<Servidor> {
    const servidor = this.servidorRepository.create({
      ...createServidorDto,
      // relaciones: asignamos solo el id
      marca: { id: createServidorDto.marcaId } as any,
      modelo: { id: createServidorDto.modeloId } as any,
      tipoProcesador: { id: createServidorDto.tipoProcesadorId } as any,
      modeloProcesador: { id: createServidorDto.modeloProcesadorId } as any,
      versionSO: { id: createServidorDto.versionSOId } as any,
      estadoFuncionamiento: {
        id: createServidorDto.estadoFuncionamientoId,
      } as any,
      empleado: { id: createServidorDto.empleadoId } as any,
    });
    return await this.servidorRepository.save(servidor);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: Servidor[]; total: number }> {
    const { limit = 50, offset = 0 } = paginationDto;

    const [data, total] = await this.servidorRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: [
        'marca',
        'modelo',
        'tipoProcesador',
        'modeloProcesador',
        'versionSO',
        'estadoFuncionamiento',
        'empleado',
      ],
    });

    return { data, total };
  }

  async findById(id: string): Promise<Servidor> {
    const servidor = await this.servidorRepository.findOne({
      where: { idServidor: id },
      relations: [
        'marca',
        'modelo',
        'tipoProcesador',
        'modeloProcesador',
        'versionSO',
        'estadoFuncionamiento',
        'empleado',
      ],
    });

    if (!servidor) {
      throw new NotFoundException(`Servidor con id ${id} no encontrado`);
    }

    return servidor;
  }

  async update(
    id: string,
    updateServidorDto: CreateServidorDto,
  ): Promise<Servidor> {
    const servidor = await this.findById(id);

    Object.assign(servidor, {
      ...updateServidorDto,
      marca: updateServidorDto.marcaId
        ? ({ id: updateServidorDto.marcaId } as any)
        : servidor.marca,
      modelo: updateServidorDto.modeloId
        ? ({ id: updateServidorDto.modeloId } as any)
        : servidor.modelo,
      tipoProcesador: updateServidorDto.tipoProcesadorId
        ? ({ id: updateServidorDto.tipoProcesadorId } as any)
        : servidor.tipoProcesador,
      modeloProcesador: updateServidorDto.modeloProcesadorId
        ? ({ id: updateServidorDto.modeloProcesadorId } as any)
        : servidor.modeloProcesador,
      versionSO: updateServidorDto.versionSOId
        ? ({ id: updateServidorDto.versionSOId } as any)
        : servidor.versionSO,
      estadoFuncionamiento: updateServidorDto.estadoFuncionamientoId
        ? ({ id: updateServidorDto.estadoFuncionamientoId } as any)
        : servidor.estadoFuncionamiento,
      empleado: updateServidorDto.empleadoId
        ? ({ id: updateServidorDto.empleadoId } as any)
        : servidor.empleado,
    });

    return await this.servidorRepository.save(servidor);
  }

  async remove(id: string): Promise<string> {
    const servidor = await this.findById(id);
    await this.servidorRepository.remove(servidor);
    return `Servidor con id ${id} eliminado correctamente`;
  }
}

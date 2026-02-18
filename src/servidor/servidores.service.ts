import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servidor } from './entities/servidor.entity';
import { CreateServidorDto } from './dto/create-servidor.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { ModeloProcesador } from 'src/modelo-procesador/entities/modelo-procesador.entity';
import { TipoProcesador } from 'src/tipo-procesador/entities/tipo-procesador.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { VersionSO } from 'src/version-so/entities/version-so.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ServidorService {
  constructor(
    @InjectRepository(Servidor)
    private readonly servidorRepository: Repository<Servidor>,
    @InjectRepository(MarcaEquipo)
    private readonly marcaRepository: Repository<MarcaEquipo>,
    @InjectRepository(ModeloEquipo)
    private readonly modeloRepository: Repository<ModeloEquipo>,
    @InjectRepository(TipoProcesador)
    private readonly tipoProcesadorRepository: Repository<TipoProcesador>,
    @InjectRepository(ModeloProcesador) 
    private readonly modeloProcesadorRepository: Repository<ModeloProcesador>,
    @InjectRepository(VersionSO)
    private readonly versionSORepository: Repository<VersionSO>,
    @InjectRepository(EstadoFuncionamiento)
    private readonly estadoFuncionamientoRepository: Repository<EstadoFuncionamiento>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 async create(createServidorDto: CreateServidorDto) {
  // Buscar entidades relacionadas
  const marca = await this.marcaRepository.findOneBy({ id: createServidorDto.marcaId });
  if (!marca) throw new NotFoundException('Marca no encontrada');

  const modelo = await this.modeloRepository.findOneBy({ id: createServidorDto.modeloId });
  if (!modelo) throw new NotFoundException('Modelo no encontrado');

  const tipoProcesador = await this.tipoProcesadorRepository.findOneBy({ id: createServidorDto.tipoProcesadorId });
  if (!tipoProcesador) throw new NotFoundException('Tipo de procesador no encontrado');

  const modeloProcesador = await this.modeloProcesadorRepository.findOneBy({ id: createServidorDto.modeloProcesadorId });
  if (!modeloProcesador) throw new NotFoundException('Modelo de procesador no encontrado');

  const versionSO = await this.versionSORepository.findOneBy({ id: createServidorDto.versionSOId });
  if (!versionSO) throw new NotFoundException('Versión de SO no encontrada');

  const estadoFuncionamiento = await this.estadoFuncionamientoRepository.findOneBy({ id: createServidorDto.estadoFuncionamientoId });
  if (!estadoFuncionamiento) throw new NotFoundException('Estado de funcionamiento no encontrado');

  const empleado = await this.userRepository.findOneBy({ idEmpleado: createServidorDto.empleadoId });
  if (!empleado) throw new NotFoundException('Empleado no encontrado');

  // Crear el servidor con las relaciones cargadas
  const servidor = this.servidorRepository.create({
    tipoServidor: createServidorDto.tipoServidor,
    velocidadProcesador: createServidorDto.velocidadProcesador,
    nucleosProcesador: createServidorDto.nucleosProcesador,
    cantidadProcesadores: createServidorDto.cantidadProcesadores,
    cantidadMaxProcesadores: createServidorDto.cantidadMaxProcesadores,
    capacidadRAM: createServidorDto.capacidadRAM,
    capacidadMaxRAM: createServidorDto.capacidadMaxRAM,
    capacidadAlmacenamiento: createServidorDto.capacidadAlmacenamiento,
    porcentajeUsoAlmacenamiento: createServidorDto.porcentajeUsoAlmacenamiento,
    sistemaOperativo: createServidorDto.sistemaOperativo,
    arquitecturaSO: createServidorDto.arquitecturaSO,
    estadoLicenciamientoSO: createServidorDto.estadoLicenciamientoSO,
    tipoConexion: createServidorDto.tipoConexion,
    direccionIPInterna: createServidorDto.direccionIPInterna,
    direccionIPExterna: createServidorDto.direccionIPExterna,
    rol: createServidorDto.rol,
    proposito: createServidorDto.proposito,
    criticidad: createServidorDto.criticidad,
    puertosAbiertos: createServidorDto.puertosAbiertos,
    aplicaBalanceoCarga: createServidorDto.aplicaBalanceoCarga,
    politicaRespaldo: createServidorDto.politicaRespaldo,
    tipoPoliticaRespaldo: createServidorDto.tipoPoliticaRespaldo,
    periodicidadRespaldo: createServidorDto.periodicidadRespaldo,
    serie: createServidorDto.serie,
    fechaVencimientoGarantia: createServidorDto.fechaVencimientoGarantia,

    // Relaciones
    marca,
    modelo,
    tipoProcesador,
    modeloProcesador,
    versionSO,
    estadoFuncionamiento,
    empleado,
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

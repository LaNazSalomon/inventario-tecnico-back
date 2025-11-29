import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ManejadorErroresDB } from 'src/common/helpers/ManejadorErroresDB';
import { UpdateEquiposComputoDto } from './dto/update-equipos-computo.dto';
import { EquiposComputo } from './entities/equipos-computo.entity';
import { CreateEquiposComputoDto } from './dto/create-equipos-computo.dto';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { MarcaEquipo } from 'src/marca-equipo/entities/marca-equipo.entity';
import { ModeloEquipo } from 'src/modelo-equipo/entities/modelo-equipo.entity';
import { ModeloProcesador } from 'src/modelo-procesador/entities/modelo-procesador.entity';
import { TipoAlmacenamientoExtraible } from 'src/tipo-almacenamiento-extraible/entities/tipo-almacenamiento-extraible.entity';
import { TipoEquipo } from 'src/tipo-equipo/entities/tipo-equipo.entity';
import { TipoProcesador } from 'src/tipo-procesador/entities/tipo-procesador.entity';
import { UnidadAcademica } from 'src/unidad-academica/entities/unidad-academica.entity';
import { User } from 'src/users/entities/user.entity';
import { VersionSO } from 'src/version-so/entities/version-so.entity';
import { EstadoFuncionamiento } from 'src/estado-funcionamiento/entities/estado-funcionamiento.entity';
import { TipoConexionRed } from './enums/tipo-conexion-red.enum';
import { TipoVelocidad } from './enums/tipo-velocidad-procesador.enum';

@Injectable()
export class EquiposComputoService {
  constructor(
    @InjectRepository(EquiposComputo)
    private readonly equiposRepository: Repository<EquiposComputo>,

    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,

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

    @InjectRepository(TipoAlmacenamientoExtraible)
    private readonly tipoAlmacenamientoExtraibleRepository: Repository<TipoAlmacenamientoExtraible>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UnidadAcademica)
    private readonly unidadAcademicaRepository: Repository<UnidadAcademica>,

    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createEquiposDto: CreateEquiposComputoDto) {
    try {
      // Buscar las entidades relacionadas
      const tipoEquipo = await this.tipoEquipoRepository.findOneBy({
        id: createEquiposDto.tipoEquipoId,
      });
      const marca = await this.marcaRepository.findOneBy({
        id: createEquiposDto.marcaId,
      });
      const modelo = await this.modeloRepository.findOneBy({
        id: createEquiposDto.modeloId,
      });

      const tipoProcesador = await this.tipoProcesadorRepository.findOneBy({
        id: createEquiposDto.tipoProcesadorId,
      });
      const modeloProcesador = await this.modeloProcesadorRepository.findOneBy({
        id: createEquiposDto.modeloProcesadorId,
      });

      const versionSO = await this.versionSORepository.findOneBy({
        id: createEquiposDto.versionSOId,
      });

      const estadoFuncionamiento =
        await this.estadoFuncionamientoRepository.findOneBy({
          id: createEquiposDto.estadoFuncionamientoId,
        });
      const tipoAlmacenamientoExtraible =
        await this.tipoAlmacenamientoExtraibleRepository.findOneBy({
          id: createEquiposDto.tipoAlmacenamientoExtraibleId,
        });
      const empleadoAsignado = await this.userRepository.findOneBy({
        idEmpleado: createEquiposDto.empleadoAsignadoId,
      });
      const unidadAcademica = await this.unidadAcademicaRepository.findOneBy({
        idUnidadAcademica: createEquiposDto.unidadAcademicaId,
      });
      const departamentoArea = await this.departamentoRepository.findOneBy({
        idDepartamento: createEquiposDto.departamentoAreaId,
      });

      // Validar relaciones críticas
      if (!tipoEquipo)
        throw new NotFoundException('Tipo de equipo no encontrado');
      if (!marca) throw new NotFoundException('Marca no encontrada');
      if (!modelo) throw new NotFoundException('Modelo no encontrado');

      if (!tipoProcesador)
        throw new NotFoundException('Tipo de procesador no encontrado');
      if (!modeloProcesador)
        throw new NotFoundException('Modelo de procesador no encontrado');

      if (!versionSO)
        throw new NotFoundException('Versión de SO no encontrada');

      if (!estadoFuncionamiento)
        throw new NotFoundException('Estado de funcionamiento no encontrado');
      if (!tipoAlmacenamientoExtraible)
        throw new NotFoundException(
          'Tipo de almacenamiento extraíble no encontrado',
        );
      if (!empleadoAsignado)
        throw new NotFoundException('Empleado asignado no encontrado');
      if (!unidadAcademica)
        throw new NotFoundException('Unidad académica no encontrada');
      if (!departamentoArea)
        throw new NotFoundException('Departamento/Área no encontrado');

      // Crear el equipo con las relaciones cargadas
      const equipo = this.equiposRepository.create({
        inventario: createEquiposDto.inventario,
        nombreEquipo: createEquiposDto.nombreEquipo,
        direccionIP: createEquiposDto.direccionIP,
        direccionServidorDNS: createEquiposDto.direccionServidorDNS,
        mascaraSubRed: createEquiposDto.mascaraSubRed,
        puertaEnlace: createEquiposDto.puertaEnlace,
        nombreDominio: createEquiposDto.nombreDominio,
        velocidadProcesador: createEquiposDto.velocidadProcesador,
        nucleos: createEquiposDto.nucleos,
        capacidadRam: createEquiposDto.capacidadRam,
        capacidadAlmacenamiento: createEquiposDto.capacidadAlmacenamiento,
        serie: createEquiposDto.serie,
        cantidadPuertosUSB: createEquiposDto.cantidadPuertosUSB,
        cantidadPuertosAudio: createEquiposDto.cantidadPuertosAudio,
        cantidadPuertosRed: createEquiposDto.cantidadPuertosRed,
        cantidadPuertosHDMI: createEquiposDto.cantidadPuertosHDMI,
        cantidadPuertosVGA: createEquiposDto.cantidadPuertosVGA,
        cantidadPuertosDVI: createEquiposDto.cantidadPuertosDVI,
        cantidadPuertosSerial: createEquiposDto.cantidadPuertosSerial,
        cantidadCamaraWeb: createEquiposDto.cantidadCamaraWeb,
        cantidadMicrofono: createEquiposDto.cantidadMicrofono,
        fechaVencimientoGarantia: createEquiposDto.fechaVencimientoGarantia,
        complemento: createEquiposDto.complemento,
        cantidadPuertosMiniHDMI: createEquiposDto.cantidadPuertosMiniHDMI,
        cantidadPuertosTarjetaMemoria:
          createEquiposDto.cantidadPuertosTarjetaMemoria,
        cantidadPuertosDIN5: createEquiposDto.cantidadPuertosDIN5,
        cantidadPuertosDIN6: createEquiposDto.cantidadPuertosDIN6,
        cantidadPuertosMiniDIN: createEquiposDto.cantidadPuertosMiniDIN,
        mac: createEquiposDto.mac,
        cantidadPuertosParalelo: createEquiposDto.cantidadPuertosParalelo,
        cantidadPuertosDisplayPort: createEquiposDto.cantidadPuertosDisplayPort,
        cantidadPuertoSerialCom1: createEquiposDto.cantidadPuertoSerialCom1,
        tipoConexionRed: createEquiposDto.tipoConexionRed,
        tipoVelocidad: createEquiposDto.tipoVelocidad,
        sistemaOperativo: createEquiposDto.sistemaOperativo,
        arquitecturaSO: createEquiposDto.arquitecturaSO,
        estadoLicencia: createEquiposDto.estadoLicencia,

        // Relaciones
        tipoEquipo: tipoEquipo,
        marca: marca,
        modelo: modelo,
        tipoProcesador: tipoProcesador,
        modeloProcesador: modeloProcesador,
        versionSO: versionSO,
        estadoFuncionamiento: estadoFuncionamiento,
        tipoAlmacenamientoExtraible: tipoAlmacenamientoExtraible,
        empleadoAsignado: empleadoAsignado,
        unidadAcademica: unidadAcademica,
        departamentoArea: departamentoArea,
      });

      return await this.equiposRepository.save(equipo);
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EquiposComputo');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 50, offset = 0 } = paginationDto;
      return await this.equiposRepository.find({
        take: limit,
        skip: offset,
        relations: [
          'tipoEquipo',
          'marca',
          'modelo',
          'tipoProcesador',
          'modeloProcesador',
          'versionSO',
          'estadoFuncionamiento',
          'tipoAlmacenamientoExtraible',
          'empleadoAsignado',
          'unidadAcademica',
          'departamentoArea',
        ],
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EquiposComputo');
    }
  }

  async findByTerm(term: string) {
    let equipos: EquiposComputo | EquiposComputo[] | null;

    try {
      const relations = [
        'tipoEquipo',
        'marca',
        'modelo',
        'tipoProcesador',
        'modeloProcesador',
        'versionSO',
        'estadoFuncionamiento',
        'tipoAlmacenamientoExtraible',
        'empleadoAsignado',
        'unidadAcademica',
        'departamentoArea',
      ];

      if (isUUID(term)) {
        equipos = await this.equiposRepository.findOne({
          where: { id: term },
          relations: relations,
        });
      } else {
        equipos = await this.equiposRepository
          .createQueryBuilder('equipo')
          .leftJoinAndSelect('equipo.tipoEquipo', 'tipoEquipo')
          .leftJoinAndSelect('equipo.marca', 'marca')
          .leftJoinAndSelect('equipo.modelo', 'modelo')
          .leftJoinAndSelect('equipo.tipoProcesador', 'tipoProcesador')
          .leftJoinAndSelect('equipo.modeloProcesador', 'modeloProcesador')
          .leftJoinAndSelect('equipo.versionSO', 'versionSO')
          .leftJoinAndSelect(
            'equipo.estadoFuncionamiento',
            'estadoFuncionamiento',
          )
          .leftJoinAndSelect(
            'equipo.tipoAlmacenamientoExtraible',
            'tipoAlmacenamientoExtraible',
          )
          .leftJoinAndSelect('equipo.empleadoAsignado', 'empleadoAsignado')
          .leftJoinAndSelect('equipo.unidadAcademica', 'unidadAcademica')
          .leftJoinAndSelect('equipo.departamentoArea', 'departamentoArea')
          .where(
            'equipo.nombreEquipo ILIKE :term OR equipo.serie ILIKE :term',
            { term: `%${term}%` },
          )
          .getMany();
      }

      if (!equipos || (Array.isArray(equipos) && equipos.length === 0)) {
        throw new NotFoundException('No se encontró ningún equipo de cómputo');
      }

      return equipos;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EquiposComputo');
    }
  }

  async update(id: string, updateDto: UpdateEquiposComputoDto) {
    try {
      const equipo = await this.equiposRepository.preload({ id, ...updateDto });
      if (!equipo)
        throw new NotFoundException(`No se encontró el equipo con ID ${id}`);

      await this.equiposRepository.save(equipo);

      // Cargar y retornar con relaciones
      const relaciones = [
        'tipoEquipo',
        'marca',
        'modelo',
        'tipoProcesador',
        'modeloProcesador',
        'versionSO',
        'estadoFuncionamiento',
        'tipoAlmacenamientoExtraible',
        'empleadoAsignado',
        'unidadAcademica',
        'departamentoArea',
      ];

      return await this.equiposRepository.findOne({
        where: { id },
        relations: relaciones,
      });
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EquiposComputo');
    }
  }

  async remove(id: string) {
    try {
      const equipo = await this.equiposRepository.findOneBy({ id });
      if (!equipo)
        throw new NotFoundException(`No se encontró el equipo con ID ${id}`);
      await this.equiposRepository.remove(equipo);
      return `Equipo de cómputo con ID ${id} eliminado correctamente`;
    } catch (err) {
      ManejadorErroresDB.erroresDB(err, 'EquiposComputo');
    }
  }
}

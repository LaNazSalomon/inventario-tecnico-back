import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoTelefonico } from '../entities/equipo-telefonico.entity';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { Response } from 'express';

@Injectable()
export class ReportesTelefonicosService {
  constructor(
    @InjectRepository(EquipoTelefonico)
    private readonly repo: Repository<EquipoTelefonico>,
    private readonly utilsReports: UtilsReportsService,
  ) {}

  async generarReportesTelefonicos(usuarioId: string, res: Response) {
    const equipos = await this.repo
      .createQueryBuilder('et')
      .innerJoin('et.usuario', 'u')
      .innerJoin('et.estadoFuncionamiento', 'ef')
      .innerJoin('et.marcaEquipoTelefonico', 'me')
      .innerJoin('et.modeloEquipoTelefonico', 'mo')
      .innerJoin('et.unidadAcademica', 'ua')
      .innerJoin('et.departamento', 'd')
      .select([
        'et."idEquipoTelefonico"',
        'et.inventario AS inventario',
        'et.serie AS serie',
        'et."tipoEquipoTelefonico"',
        'et."tipoConexionRed"',
        'et.direccionIp AS direccionIp',
        'et.numeroExtension AS numeroExtension',
        'et.did AS did',
        'u."nombreEmpleado" AS nombreEmpleado',
        'ef."estado" AS estado_funcionamiento',
        'me."nombre" AS marca',
        'mo."nombre" AS modelo',
        'ua."nombreUnidad" AS unidad_academica',
        'd."nombreDepartamento" AS departamento',
      ])
      .where('u."idEmpleado" = :usuarioId', { usuarioId })
      .getRawMany();

    const columnas = [
      'idEquipoTelefonico',
      'inventario',
      'serie',
      'tipoEquipoTelefonico',
      'tipoConexionRed',
      'direccionIp',
      'numeroExtension',
      'did',
      'nombreEmpleado',
      'estado_funcionamiento',
      'marca',
      'modelo',
      'unidad_academica',
      'departamento',
    ];

    const date = new Date().getTime();

    return this.utilsReports.generarReporteSimple(
      'Telefonicos',
      columnas,
      equipos,
      res,
      `telefonicos-${date}`,
    );
  }
}

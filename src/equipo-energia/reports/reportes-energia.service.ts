import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { EquipoEnergia } from '../entities/equipo-energia.entity';

@Injectable()
export class ReportesEnergiaService {
  constructor(
    @InjectRepository(EquipoEnergia)
    private readonly repo: Repository<EquipoEnergia>,
    private readonly utilsReports: UtilsReportsService,
  ) {}

  async generarReporteEnergia(usuarioId: string, res: Response) {
    const equipos = await this.repo
      .createQueryBuilder('ee')
      .innerJoin('ee.usuario', 'u')
      .innerJoin('ee.estadoFuncionamiento', 'ef')
      .innerJoin('ee.marcaEquipoEnergia', 'me')
      .innerJoin('ee.modeloEquipoEnergia', 'mo')
      .innerJoin('ee.unidadAcademica', 'ua')
      .innerJoin('ee.departamento', 'd')
      .select([
        'ee."idEquipoEnergia"',
        'ee.inventario AS inventario',
        'ee.serie AS serie',
        'ee."tipoEquipoEnergia"',
        'u."nombreEmpleado"',
        'ef."estado" AS estado_funcionamiento',
        'me."nombre" AS marca',
        'mo."nombre" AS modelo',
        'ua."nombreUnidad" AS unidad_academica',
        'd."nombreDepartamento" AS departamento',
      ])
      .where('u."idEmpleado" = :usuarioId', { usuarioId })
      .getRawMany();

    const columnas = [
      'idEquipoEnergia',
      'inventario',
      'serie',
      'tipoEquipoEnergia',
      'nombreEmpleado',
      'estado_funcionamiento',
      'marca',
      'modelo',
      'unidad_academica',
      'departamento',
    ];

    const date = new Date().getTime();
    return this.utilsReports.generarReporteSimple(
      'Energia',
      columnas,
      equipos,
      res,
      `energia-${date}`,
    );
  }
}

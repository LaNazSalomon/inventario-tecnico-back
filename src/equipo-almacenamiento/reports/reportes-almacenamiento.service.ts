import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { EquipoAlmacenamiento } from '../entities/equipo-almacenamiento.entity';

@Injectable()
export class ReportesAlmacenamientoService {
  constructor(
    @InjectRepository(EquipoAlmacenamiento)
    private readonly repo: Repository<EquipoAlmacenamiento>,
    private readonly utilsReports: UtilsReportsService,
  ) {}

  async generarReporteAlmacenamiento(usuarioId: string, res: Response) {
    const equipos = await this.repo
      .createQueryBuilder('ea')
      .innerJoin('ea.usuario', 'u')
      .innerJoin('ea.estadoFuncionamiento', 'ef')
      .innerJoin('ea.marcaEquipoAlmacenamiento', 'me')
      .innerJoin('ea.modeloEquipoAlmacenamiento', 'mo')
      .innerJoin('ea.unidadAcademica', 'ua')
      .innerJoin('ea.departamento', 'd')
      .select([
        'ea."idEquipoAlmacenamiento"',
        'ea.inventario AS inventario',
        'ea.serie AS serie',
        'ea."capacidadAlmacenamiento"',
        'ea."tipoEquipoAlmacenamiento"',
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
      'idEquipoAlmacenamiento',
      'inventario',
      'serie',
      'capacidadAlmacenamiento',
      'tipoEquipoAlmacenamiento',
      'nombreEmpleado',
      'estado_funcionamiento',
      'marca',
      'modelo',
      'unidad_academica',
      'departamento',
    ];

    const date = new Date().getTime();
    return this.utilsReports.generarReporteSimple(
      'Almacenamiento',
      columnas,
      equipos,
      res,
      `almacenamiento-${date}`,
    );
  }
}

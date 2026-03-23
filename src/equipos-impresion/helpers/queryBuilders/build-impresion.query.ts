import { EquipoImpresion } from 'src/equipos-impresion/entities/equipos-impresion.entity';
import { Repository } from 'typeorm';

export const buildImpresionQuery = (
  repo: Repository<EquipoImpresion>,
  usuarioId: string,
) => {
  return repo
    .createQueryBuilder('ei')
    .innerJoin('ei.usuario', 'u')
    .innerJoin('ei.estadoFuncionamiento', 'ef')
    .innerJoin('ei.marcaEquipoImpresion', 'ma')
    .innerJoin('ei.modeloEquipoImpresion', 'mo')
    .innerJoin('ei.unidadAcademica', 'ua')
    .innerJoin('ei.departamentoArea', 'd')
    .select([
      'ei."idEquipoImpresion" AS id',
      'ei.inventario AS inventario',
      'ei.compartida AS compartida',
      'ei.multifuncional AS multifuncional',
      'ei.serie AS serie',
      'u."nombreEmpleado"',
      'ef."estado" AS estado_funcionamiento',
      'ma."nombre" AS marca',
      'mo."nombre" AS modelo',
      'ua."nombreUnidad" AS unidad_academica',
      'd."nombreDepartamento" AS departamento',
      'ei."tipoEquipoImpresion" AS tipo_equipo_impresion',
      'ei."modoColorEquipoImpresion" AS modo_color_impresion',
    ])
    .where('u."idEmpleado" = :usuarioId', { usuarioId })
    .getRawMany();
};
